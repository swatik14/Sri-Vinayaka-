'use client';

import { useEffect, useState } from 'react';
import { Clock, Users, IndianRupee, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sevaApi } from '@/lib/api';
import { Seva } from '@/types';
import BookingModal from '@/components/sevas/BookingModal';

const categoryFilters = ['all', 'daily', 'special', 'monthly', 'annual'] as const;
type Filter = typeof categoryFilters[number];

const categoryColors: Record<string, string> = {
  daily: 'badge-daily',
  special: 'badge-special',
  monthly: 'badge-monthly',
  annual: 'badge-annual',
};

export default function SevasPage() {
  const { t, language } = useLanguage();
  const [sevas, setSevas] = useState<Seva[]>([]);
  const [filtered, setFiltered] = useState<Seva[]>([]);
  const [selected, setSelected] = useState<Seva | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sevaApi.getAll()
      .then((r) => { setSevas(r.data.data || []); setFiltered(r.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = sevas;
    if (activeFilter !== 'all') result = result.filter((s) => s.category === activeFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.name_en.toLowerCase().includes(q) || s.name_kn.toLowerCase().includes(q) || s.description_en?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [sevas, activeFilter, search]);

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10 reveal">
          <p className="text-temple-gold text-lg mb-2">ॐ</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('sevasTitle')}</h1>
          <p className="text-white/80 text-xl">{t('sevasSubtitle')}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`${t('search')} sevas...`}
                className="input-field pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === f
                      ? 'bg-temple-maroon text-white shadow-temple'
                      : 'bg-temple-cream-dark text-temple-brown hover:bg-temple-cream'
                  }`}
                >
                  {f === 'all' ? t('all') : t(f as 'daily' | 'special' | 'monthly' | 'annual')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-32 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4 text-temple-gold/30">ॐ</p>
              <p className="text-xl font-medium">No sevas found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((seva, i) => (
                <div key={seva.id} className="group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-temple-gold/20 bg-white reveal-scale"
                  style={{ transitionDelay: `${(i % 6) * 0.08}s` }}>

                  {/* Card Header */}
                  <div className="relative p-6 text-white overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 60%, #2C1A0E 100%)' }}>

                    {/* Decorative ॐ watermark */}
                    <span className="absolute text-[110px] font-bold text-white/[0.04] -bottom-6 -right-4 pointer-events-none select-none leading-none">ॐ</span>

                    {/* Top row: badge + price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`${categoryColors[seva.category]} text-xs px-3 py-1 rounded-full font-semibold`}>
                        {t(seva.category as 'daily' | 'special' | 'monthly' | 'annual')}
                      </span>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-temple-gold font-bold text-xl justify-end">
                          <IndianRupee size={16} strokeWidth={2.5} />
                          {seva.price.toLocaleString('en-IN')}
                        </div>
                        <p className="text-white/50 text-[10px]">{t('perDevotee')}</p>
                      </div>
                    </div>

                    {/* Seva Name — prominent */}
                    <h3 className="font-heading font-bold text-xl text-white leading-snug mb-3 group-hover:text-temple-gold transition-colors duration-200">
                      {language === 'kn' ? seva.name_kn : seva.name_en}
                    </h3>

                    {/* Gold divider */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-temple-gold/60 to-transparent" />
                      <span className="text-temple-gold/60 text-xs">✦</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col bg-white">
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {language === 'kn' ? seva.description_kn : seva.description_en}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-4 py-3 px-3 bg-temple-cream-dark rounded-xl">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-temple-brown">
                        <Clock size={13} className="text-temple-saffron" />
                        {seva.duration_minutes} {t('minutes')}
                      </span>
                      <div className="w-px h-4 bg-gray-200" />
                      <span className="flex items-center gap-1.5 text-xs font-medium text-temple-brown">
                        <Users size={13} className="text-temple-saffron" />
                        Max {seva.max_devotees}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelected(seva)}
                      className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-temple"
                      style={{ background: 'linear-gradient(135deg, #FF8C00 0%, #D4AF37 100%)' }}
                    >
                      ✦ {t('bookNow')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking info */}
      <section className="py-10 bg-temple-cream-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading font-bold text-xl text-temple-maroon mb-4">How to Book a Seva?</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: '1', en: 'Choose a Seva', icon: '1' },
              { step: '2', en: 'Fill Details', icon: '2' },
              { step: '3', en: 'Confirm Booking', icon: '3' },
              { step: '4', en: 'Get Confirmation', icon: '4' },
            ].map(({ step, en, icon }) => (
              <div key={step} className="card p-4 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="w-6 h-6 rounded-full bg-temple-maroon text-white text-xs font-bold flex items-center justify-center mx-auto mb-1">
                  {step}
                </div>
                <p className="text-sm font-medium text-temple-brown">{en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && <BookingModal seva={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
