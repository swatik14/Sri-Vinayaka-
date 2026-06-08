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
const darshanGradients = [
  'from-amber-400 to-orange-500',
  'from-yellow-400 to-amber-500',
  'from-orange-400 to-red-500',
  'from-indigo-500 to-purple-600',
  'from-amber-300 to-yellow-400',
];

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

  const timingGroups = [
    { label: t('weekdays'), items: weekday, accent: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
    { label: t('weekends'), items: weekend, accent: '#10B981', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: t('holidays'), items: holiday, accent: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
  ];

  return (
    <section id="timings" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF2E0 100%)' }}>
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <p className="text-temple-saffron text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Clock size={14} />
            Visit & Worship
          </p>
          <h2 className="section-title text-3xl md:text-4xl mx-auto inline-block">{t('templeTimings')}</h2>
          <p className="section-subtitle mt-3">{t('dailyDarshan')}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-md border border-temple-cream-dark gap-1">
            {(['timings', 'darshan'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-white shadow-sm'
                    : 'text-temple-brown hover:bg-temple-cream'
                }`}
                style={activeTab === tab ? { background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 100%)' } : {}}
              >
                {tab === 'timings'
                  ? <><Clock size={14} className="inline mr-1.5" />{t('templeTimings')}</>
                  : t('dailyDarshan')
                }
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'timings' ? (
          <div className="grid md:grid-cols-3 gap-6">
            {timingGroups.map(({ label, items, accent, bg, border }, i) => (
              <div key={label} className="rounded-2xl overflow-hidden shadow-md border-2 reveal-scale"
                style={{ borderColor: border, background: bg, transitionDelay: `${i * 0.12}s` }}>
                {/* Card header */}
                <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)` }}>
                  <h3 className="font-bold text-lg text-white">{label}</h3>
                </div>
                {/* Timings */}
                <div className="p-5 space-y-2">
                  {items.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">No data available</p>
                  ) : (
                    items.map((timing) => (
                      <div key={timing.id} className="flex items-center justify-between py-2.5 px-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                        <span className="text-temple-brown font-medium text-sm">
                          {language === 'kn' ? timing.session_name_kn : timing.session_name_en}
                        </span>
                        <span className="text-sm font-bold px-2.5 py-1 rounded-lg text-white"
                          style={{ background: accent }}>
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
              const grad = darshanGradients[i % darshanGradients.length];
              return (
                <div key={item.id} className="bg-white rounded-2xl p-5 text-center border border-temple-cream-dark hover:border-temple-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h4 className="font-bold text-temple-maroon text-sm mb-1">
                    {language === 'kn' ? item.name_kn : item.name_en}
                  </h4>
                  <p className="text-temple-saffron font-bold text-base my-1">{item.time_label}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
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
