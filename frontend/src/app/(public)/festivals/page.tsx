'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { festivalApi } from '@/lib/api';
import { Festival } from '@/types';
import { format, parseISO, isPast } from 'date-fns';

export default function FestivalsPage() {
  const { t, language } = useLanguage();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'all'>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    festivalApi.getAll()
      .then((r) => setFestivals(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = festivals.filter((f) => !isPast(parseISO(f.start_date)));
  const past = festivals.filter((f) => isPast(parseISO(f.start_date)));
  const display = activeTab === 'upcoming' ? upcoming : festivals;

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10 reveal">
          <p className="text-temple-gold text-2xl mb-2">ॐ</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('festivalsTitle')}</h1>
          <p className="text-white/80 text-xl">{t('festivalsSubtitle')}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-3 mb-8 reveal">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === 'upcoming' ? 'bg-temple-maroon text-white shadow-temple' : 'bg-temple-cream-dark text-temple-brown hover:bg-temple-cream'}`}
            >
              {t('upcomingEvents')} ({upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === 'all' ? 'bg-temple-maroon text-white shadow-temple' : 'bg-temple-cream-dark text-temple-brown hover:bg-temple-cream'}`}
            >
              {t('allFestivals')} ({festivals.length})
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map((i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : display.length === 0 ? (
            <div className="text-center py-16 text-gray-400 reveal">
              <p className="text-5xl mb-4 text-temple-gold/30">ॐ</p>
              <p className="text-xl">No festivals to show</p>
            </div>
          ) : (
            <div className="space-y-5">
              {display.map((f, i) => {
                const date = parseISO(f.start_date);
                const isUpcoming = !isPast(date);
                return (
                  <div
                    key={f.id}
                    className={`card overflow-hidden flex flex-col md:flex-row reveal transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${f.is_featured ? 'ring-2 ring-temple-gold' : ''}`}
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    {/* Date column */}
                    <div className={`${isUpcoming ? '' : 'bg-gray-400'} text-white p-6 flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] text-center flex-shrink-0`}
                      style={isUpcoming ? { background: f.is_featured
                        ? 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)'
                        : 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 100%)' } : {}}>
                      <p className={`text-3xl font-heading font-bold ${f.is_featured ? 'text-temple-maroon' : 'text-temple-gold'}`}>
                        {format(date, 'd')}
                      </p>
                      <p className="text-sm font-medium">{format(date, 'MMM')}</p>
                      <p className="text-xs text-white/70">{format(date, 'yyyy')}</p>
                      {f.is_featured && isUpcoming && (
                        <span className="mt-2 text-[10px] font-bold bg-temple-maroon text-white px-2 py-0.5 rounded-full">
                          ★ FEATURED
                        </span>
                      )}
                      {!isUpcoming && (
                        <span className="mt-2 text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-full">PAST</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-heading font-bold text-xl text-temple-maroon">
                          {language === 'kn' ? f.name_kn : f.name_en}
                        </h3>
                        {f.start_time && (
                          <span className="flex items-center gap-1 text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                            <Calendar size={13} /> {f.start_time.slice(0, 5)}
                          </span>
                        )}
                      </div>
                      {f.end_date && (
                        <p className="flex items-center gap-1 text-sm text-temple-saffron font-medium mb-2">
                          <MapPin size={13} />
                          Until {format(parseISO(f.end_date), 'dd MMMM yyyy')}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {language === 'kn' ? f.description_kn : f.description_en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && activeTab === 'upcoming' && (
        <div className="py-6 bg-temple-cream-dark text-center">
          <p className="text-gray-500 text-sm">
            {past.length} past festival{past.length > 1 ? 's' : ''} —
            <button onClick={() => setActiveTab('all')} className="text-temple-saffron ml-1 font-medium hover:underline">
              {t('viewAll')}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
