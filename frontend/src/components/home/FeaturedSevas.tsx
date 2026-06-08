'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Users, ArrowRight, IndianRupee, Sparkles } from 'lucide-react';
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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-temple-gold/10 pointer-events-none" />
      <div className="absolute top-14 right-14 w-20 h-20 rounded-full border border-temple-gold/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <p className="text-temple-saffron text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles size={14} />
              Divine Services
            </p>
            <h2 className="section-title text-3xl md:text-4xl">{t('featuredSevas')}</h2>
            <p className="section-subtitle mt-3">{t('sevasSubtitle')}</p>
          </div>
          <Link href="/sevas" className="hidden md:flex items-center gap-2 text-temple-saffron font-semibold text-sm hover:gap-3 transition-all group">
            {t('viewAllSevas')}
            <span className="w-7 h-7 rounded-full bg-temple-saffron/10 group-hover:bg-temple-saffron/20 flex items-center justify-center transition-colors">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sevas.map((seva, i) => (
            <div
              key={seva.id}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-white border border-temple-cream-dark hover:border-temple-gold/30 reveal-scale"
              style={{ boxShadow: '0 2px 12px rgba(107,26,26,0.06)', transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(107,26,26,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(107,26,26,0.06)')}
            >
              {/* Card top */}
              <div className="relative p-5 text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 55%, #2C1A0E 100%)' }}>
                <span className="absolute text-[80px] font-bold text-white/[0.04] -bottom-3 -right-3 leading-none select-none">ॐ</span>

                <div className="flex items-start justify-between mb-3">
                  <span className={categoryColors[seva.category]}>
                    {t(seva.category as 'daily' | 'special' | 'monthly' | 'annual')}
                  </span>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-temple-gold font-bold text-lg justify-end">
                      <IndianRupee size={14} strokeWidth={2.5} />
                      {seva.price.toLocaleString('en-IN')}
                    </div>
                    <p className="text-white/50 text-[10px]">{t('perDevotee')}</p>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-temple-gold transition-colors duration-200">
                  {language === 'kn' ? seva.name_kn : seva.name_en}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-temple-gold/50 to-transparent" />
                  <span className="text-temple-gold/50 text-xs">✦</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
                  {language === 'kn' ? seva.description_kn : seva.description_en}
                </p>

                <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-temple-cream-dark rounded-xl">
                  <span className="flex items-center gap-1 text-xs font-medium text-temple-brown">
                    <Clock size={11} className="text-temple-saffron" /> {seva.duration_minutes} {t('minutes')}
                  </span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span className="flex items-center gap-1 text-xs font-medium text-temple-brown">
                    <Users size={11} className="text-temple-saffron" /> Max {seva.max_devotees}
                  </span>
                </div>

                <Link
                  href="/sevas"
                  className="w-full py-2.5 text-center rounded-xl font-bold text-sm text-white transition-all duration-200 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FF8C00 0%, #D4AF37 100%)' }}
                >
                  ✦ {t('bookNow')}
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
