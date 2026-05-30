'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Users, ArrowRight, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sevaApi } from '@/lib/api';
import { Seva } from '@/types';

const categoryColors: Record<string, string> = {
  daily: 'badge-daily',
  special: 'badge-special',
  monthly: 'badge-monthly',
  annual: 'badge-annual',
};

export default function FeaturedSevas() {
  const { t, language } = useLanguage();
  const [sevas, setSevas] = useState<Seva[]>([]);

  useEffect(() => {
    sevaApi.getAll()
      .then((r) => setSevas((r.data.data || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  if (sevas.length === 0) return null;

  return (
    <section className="py-16 bg-temple-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="gold-divider mb-4 w-24"><span className="text-temple-gold text-xl px-2">🛕</span></div>
            <h2 className="section-title">{t('featuredSevas')}</h2>
            <p className="section-subtitle">{t('sevasSubtitle')}</p>
          </div>
          <Link href="/sevas" className="hidden md:flex items-center gap-1.5 text-temple-saffron font-semibold hover:gap-3 transition-all">
            {t('viewAllSevas')} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sevas.map((seva) => (
            <div key={seva.id} className="card-hover flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-br from-temple-maroon to-temple-maroon-dark p-5 text-white relative overflow-hidden">
                <span className="absolute text-6xl font-bold text-white/5 -bottom-2 -right-2 pointer-events-none">ॐ</span>
                <span className={`${categoryColors[seva.category]} mb-3 inline-block`}>
                  {t(seva.category as keyof typeof t extends (key: infer K) => string ? K : never)}
                </span>
                <h3 className="font-heading font-bold text-base leading-snug">
                  {language === 'kn' ? seva.name_kn : seva.name_en}
                </h3>
                <div className="mt-3 flex items-center gap-1 text-temple-gold text-xl font-bold">
                  <IndianRupee size={16} />
                  {seva.price.toLocaleString('en-IN')}
                  <span className="text-white/60 text-sm font-normal ml-1">{t('perDevotee')}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                  {language === 'kn' ? seva.description_kn : seva.description_en}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {seva.duration_minutes} {t('minutes')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> max {seva.max_devotees}
                  </span>
                </div>

                <Link href="/sevas" className="btn-primary w-full justify-center text-sm py-2.5">
                  🙏 {t('bookNow')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/sevas" className="btn-secondary">
            {t('viewAllSevas')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
