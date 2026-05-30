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
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-temple-gold text-lg mb-2">🙏</p>
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
              <p className="text-5xl mb-4">🙏</p>
              <p className="text-xl font-medium">No sevas found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((seva) => (
                <div key={seva.id} className="card-hover flex flex-col">
                  <div className="bg-temple-gradient p-6 text-white relative overflow-hidden">
                    <span className="absolute text-8xl font-bold text-white/5 -bottom-4 -right-4 pointer-events-none">ॐ</span>
                    <div className="flex items-start justify-between mb-3">
                      <span className={categoryColors[seva.category]}>
                        {t(seva.category as 'daily' | 'special' | 'monthly' | 'annual')}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg leading-snug mb-2">
                      {language === 'kn' ? seva.name_kn : seva.name_en}
                    </h3>
                    <div className="flex items-center gap-1 text-temple-gold text-2xl font-bold">
                      <IndianRupee size={18} />
                      {seva.price.toLocaleString('en-IN')}
                    </div>
                    <p className="text-white/60 text-xs mt-0.5">{t('perDevotee')}</p>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {language === 'kn' ? seva.description_kn : seva.description_en}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-temple-saffron" /> {seva.duration_minutes} {t('minutes')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={13} className="text-temple-saffron" /> Max {seva.max_devotees}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelected(seva)}
                      className="btn-primary w-full justify-center"
                    >
                      🙏 {t('bookNow')}
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
              { step: '1', en: 'Choose a Seva', icon: '🙏' },
              { step: '2', en: 'Fill Details', icon: '📝' },
              { step: '3', en: 'Confirm Booking', icon: '✅' },
              { step: '4', en: 'Get Confirmation', icon: '📧' },
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
