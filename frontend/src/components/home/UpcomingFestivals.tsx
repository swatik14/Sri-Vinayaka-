'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="gold-divider mb-4 w-24"><span className="text-temple-gold text-xl px-2">🎊</span></div>
            <h2 className="section-title">{t('upcomingFestivals')}</h2>
            <p className="section-subtitle">{t('festivalsSubtitle')}</p>
          </div>
          <Link href="/festivals" className="hidden md:flex items-center gap-1.5 text-temple-saffron font-semibold hover:gap-3 transition-all">
            {t('viewAll')} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {festivals.map((festival) => {
            const date = parseISO(festival.start_date);
            return (
              <div
                key={festival.id}
                className={`card-hover overflow-hidden ${festival.is_featured ? 'ring-2 ring-temple-gold' : ''}`}
              >
                {/* Date badge */}
                <div className="bg-temple-maroon text-white text-center py-4 relative">
                  {festival.is_featured && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-temple-gold text-temple-brown px-2 py-0.5 rounded-full">
                      ★ FEATURED
                    </span>
                  )}
                  <p className="text-4xl font-heading font-bold text-temple-gold">
                    {format(date, 'd')}
                  </p>
                  <p className="text-white/80 text-sm font-medium">
                    {format(date, 'MMM yyyy')}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <CalendarDays size={15} className="text-temple-saffron mt-0.5 flex-shrink-0" />
                    <h3 className="font-heading font-bold text-temple-maroon text-sm leading-snug">
                      {language === 'kn' ? festival.name_kn : festival.name_en}
                    </h3>
                  </div>
                  {festival.end_date && (
                    <p className="text-xs text-gray-400 mb-2">
                      Until {format(parseISO(festival.end_date), 'dd MMM')}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {language === 'kn' ? festival.description_kn : festival.description_en}
                  </p>
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
