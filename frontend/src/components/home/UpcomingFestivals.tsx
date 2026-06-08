'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { festivalApi } from '@/lib/api';
import { Festival } from '@/types';
import { format, parseISO } from 'date-fns';

export default function UpcomingFestivals() {
  const { t, language } = useLanguage();
  const [festivals, setFestivals] = useState<Festival[]>([]);

  useEffect(() => {
    festivalApi.getAll({ upcoming: true, limit: 4 })
      .then((r) => setFestivals(r.data.data || []))
      .catch(() => {});
  }, []);

  if (festivals.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF2E0 100%)' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <span className="absolute text-[400px] font-bold text-temple-maroon top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">ॐ</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <p className="text-temple-saffron text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-temple-saffron inline-block" />
              Sacred Celebrations
            </p>
            <h2 className="section-title text-3xl md:text-4xl">{t('upcomingFestivals')}</h2>
            <p className="section-subtitle mt-3">{t('festivalsSubtitle')}</p>
          </div>
          <Link href="/festivals" className="hidden md:flex items-center gap-2 text-temple-saffron font-semibold text-sm hover:gap-3 transition-all group">
            {t('viewAll')}
            <span className="w-7 h-7 rounded-full bg-temple-saffron/10 group-hover:bg-temple-saffron/20 flex items-center justify-center transition-colors">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivals.map((festival, i) => {
            const date = parseISO(festival.start_date);
            return (
              <div
                key={festival.id}
                className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 reveal-scale ${
                  festival.is_featured
                    ? 'shadow-[0_8px_30px_rgba(212,175,55,0.25)] border-2 border-temple-gold/40'
                    : 'shadow-md hover:shadow-[0_12px_35px_rgba(107,26,26,0.12)] border border-temple-cream-dark'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Date block */}
                <div
                  className="relative text-white text-center py-7 overflow-hidden"
                  style={{ background: festival.is_featured
                    ? 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F0D060 100%)'
                    : 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 100%)' }}
                >
                  <div className="absolute inset-0 opacity-10 select-none pointer-events-none flex items-center justify-center">
                    <span className="text-[120px] font-bold leading-none">ॐ</span>
                  </div>
                  {festival.is_featured && (
                    <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-bold bg-temple-maroon text-white px-2 py-0.5 rounded-full">
                      <Star size={8} fill="currentColor" /> FEATURED
                    </span>
                  )}
                  <p className={`text-5xl font-bold relative z-10 ${festival.is_featured ? 'text-temple-maroon' : 'text-temple-gold'}`}>
                    {format(date, 'd')}
                  </p>
                  <p className={`text-sm font-semibold tracking-wide relative z-10 mt-1 ${festival.is_featured ? 'text-temple-maroon/80' : 'text-white/80'}`}>
                    {format(date, 'MMM yyyy')}
                  </p>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-temple-maroon text-base leading-snug mb-2 group-hover:text-temple-saffron transition-colors">
                    {language === 'kn' ? festival.name_kn : festival.name_en}
                  </h3>
                  {festival.end_date && (
                    <p className="text-xs text-temple-saffron font-medium mb-2 flex items-center gap-1">
                      <CalendarDays size={11} /> Until {format(parseISO(festival.end_date), 'dd MMM')}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {language === 'kn' ? festival.description_kn : festival.description_en}
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <Link href="/festivals" className="text-xs font-semibold text-temple-saffron hover:text-temple-maroon transition-colors flex items-center gap-1 group-hover:gap-2">
                      Learn more <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/festivals" className="btn-secondary">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
