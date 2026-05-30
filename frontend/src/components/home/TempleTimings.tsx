'use client';

import { useEffect, useState } from 'react';
import { Clock, Sun, Sunset, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { templeApi } from '@/lib/api';
import { TempleTiming, DarshanItem } from '@/types';

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

const darshanIcons = [Sun, Sun, Sunset, Moon, Sun];

export default function TempleTimings() {
  const { t, language } = useLanguage();
  const [timings, setTimings] = useState<TempleTiming[]>([]);
  const [darshan, setDarshan] = useState<DarshanItem[]>([]);
  const [activeTab, setActiveTab] = useState<'timings' | 'darshan'>('timings');

  useEffect(() => {
    Promise.all([templeApi.getTimings(), templeApi.getDarshan()]).then(([t, d]) => {
      setTimings(t.data.data || []);
      setDarshan(d.data.data || []);
    }).catch(() => {});
  }, []);

  const weekday = timings.filter((t) => t.day_type === 'weekday');
  const weekend = timings.filter((t) => t.day_type === 'weekend');
  const holiday = timings.filter((t) => t.day_type === 'holiday');

  return (
    <section id="timings" className="py-16 bg-temple-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="gold-divider mb-4"><span className="text-temple-gold text-xl px-3">⏰</span></div>
          <h2 className="section-title">{t('templeTimings')}</h2>
          <p className="section-subtitle">{t('dailyDarshan')}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-card border border-temple-cream-dark gap-1">
            <button
              onClick={() => setActiveTab('timings')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'timings'
                  ? 'bg-temple-maroon text-white shadow-sm'
                  : 'text-temple-brown hover:bg-temple-cream'
              }`}
            >
              <Clock size={15} className="inline mr-1.5" />
              {t('templeTimings')}
            </button>
            <button
              onClick={() => setActiveTab('darshan')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'darshan'
                  ? 'bg-temple-maroon text-white shadow-sm'
                  : 'text-temple-brown hover:bg-temple-cream'
              }`}
            >
              🙏 {t('dailyDarshan')}
            </button>
          </div>
        </div>

        {activeTab === 'timings' ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: t('weekdays'), items: weekday, icon: '🗓️', color: 'border-blue-200 bg-blue-50' },
              { label: t('weekends'), items: weekend, icon: '🎉', color: 'border-green-200 bg-green-50' },
              { label: t('holidays'), items: holiday, icon: '✨', color: 'border-orange-200 bg-orange-50' },
            ].map(({ label, items, icon, color }) => (
              <div key={label} className={`card border-2 ${color} overflow-hidden`}>
                <div className="bg-temple-maroon text-white px-5 py-4 flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <h3 className="font-heading font-bold text-lg text-white">{label}</h3>
                </div>
                <div className="p-5 space-y-3">
                  {items.length === 0 ? (
                    <p className="text-gray-400 text-sm">No data available</p>
                  ) : (
                    items.map((timing) => (
                      <div key={timing.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-temple-brown font-medium text-sm">
                          {language === 'kn' ? timing.session_name_kn : timing.session_name_en}
                        </span>
                        <span className="text-temple-maroon font-semibold text-sm bg-white px-2 py-1 rounded-md shadow-sm">
                          {formatTime(timing.open_time)} – {formatTime(timing.close_time)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {darshan.map((item, i) => {
              const Icon = darshanIcons[i % darshanIcons.length];
              return (
                <div key={item.id} className="card text-center p-5 hover:shadow-temple hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-temple-saffron/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-temple-saffron" />
                  </div>
                  <h4 className="font-heading font-bold text-temple-maroon text-sm">
                    {language === 'kn' ? item.name_kn : item.name_en}
                  </h4>
                  <p className="text-temple-saffron font-semibold text-lg mt-1">{item.time_label}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    {language === 'kn' ? item.description_kn : item.description_en}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
