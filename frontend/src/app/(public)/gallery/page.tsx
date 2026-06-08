'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { galleryApi } from '@/lib/api';
import { GalleryItem } from '@/types';

const categories = ['all', 'temple', 'festivals', 'sevas', 'darshan', 'events'] as const;
type Cat = typeof categories[number];

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filtered, setFiltered] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Cat>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const catLabels: Record<Cat, string> = {
    all: t('all'), temple: t('temple'), festivals: t('festivalsCategory'),
    sevas: t('sevasCategory'), darshan: t('darshanCategory'), events: t('eventsCategory'),
  };

  useEffect(() => {
    galleryApi.getAll({ limit: 100 })
      .then((r) => { setItems(r.data.data || []); setFiltered(r.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(activeCategory === 'all' ? items : items.filter((i) => i.category === activeCategory));
  }, [items, activeCategory]);

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10 reveal">
          <p className="text-temple-gold text-2xl mb-2">ॐ</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('galleryTitle')}</h1>
          <p className="text-white/80 text-xl">{t('gallerySubtitle')}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 reveal">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-temple-maroon text-white shadow-temple'
                    : 'bg-temple-cream-dark text-temple-brown hover:bg-temple-cream'
                }`}
              >
                {catLabels[cat]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 reveal">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-xl">No photos in this category yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden reveal-scale"
                  style={{ transitionDelay: `${(i % 8) * 0.06}s` }}
                >
                  {(item.file_url.startsWith('http') || item.file_url.startsWith('/')) ? (
                    <Image
                      src={item.thumbnail_url || item.file_url}
                      alt={language === 'kn' ? (item.title_kn || '') : (item.title_en || '')}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-temple-cream-dark">
                      <ImageIcon size={32} className="text-temple-gold/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.title_en && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium text-left">
                        {language === 'kn' ? item.title_kn : item.title_en}
                      </p>
                    </div>
                  )}
                  {item.file_type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl ml-1">▶</span>
                      </div>
                    </div>
                  )}
                  {/* Gold corner accent */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #FF9A00)' }}>
                    <span className="text-white text-[8px] font-bold">✦</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <div className="relative max-w-3xl max-h-[80vh] w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {(lightbox.file_url.startsWith('http') || lightbox.file_url.startsWith('/')) ? (
              <Image
                src={lightbox.file_url}
                alt={language === 'kn' ? (lightbox.title_kn || '') : (lightbox.title_en || '')}
                width={900}
                height={600}
                className="rounded-xl object-contain max-h-[75vh] w-full"
                unoptimized
              />
            ) : (
              <div className="w-full h-64 bg-temple-cream-dark rounded-xl flex items-center justify-center">
                <ImageIcon size={48} className="text-temple-gold/40" />
              </div>
            )}
            {lightbox.title_en && (
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{language === 'kn' ? lightbox.title_kn : lightbox.title_en}</p>
                {lightbox.description_en && (
                  <p className="text-white/60 text-sm mt-1">
                    {language === 'kn' ? lightbox.description_kn : lightbox.description_en}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
