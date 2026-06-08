'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Images } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { galleryApi } from '@/lib/api';
import { GalleryItem } from '@/types';

const placeholderImages = [
  { url: 'https://picsum.photos/seed/temple1/600/600', title: 'Temple Sanctum',      title_kn: 'ದೇವಾಲಯ ಗರ್ಭಗುಡಿ' },
  { url: 'https://picsum.photos/seed/temple2/400/300', title: 'Festival Celebrations',title_kn: 'ಹಬ್ಬದ ಆಚರಣೆ' },
  { url: 'https://picsum.photos/seed/temple3/400/300', title: 'Morning Puja',         title_kn: 'ಬೆಳಗಿನ ಪೂಜೆ' },
  { url: 'https://picsum.photos/seed/temple4/400/300', title: 'Temple Gopura',        title_kn: 'ದೇವಾಲಯ ಗೋಪುರ' },
  { url: 'https://picsum.photos/seed/temple5/400/300', title: 'Devotees Gathering',   title_kn: 'ಭಕ್ತರ ಸಮ್ಮೇಳನ' },
  { url: 'https://picsum.photos/seed/temple6/400/300', title: 'Prasad Distribution',  title_kn: 'ಪ್ರಸಾದ ವಿತರಣೆ' },
];

export default function GalleryPreview() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    galleryApi.getAll({ featured: true, limit: 6 })
      .then((r) => setItems(r.data.data || []))
      .catch(() => {});
  }, []);

  const displayItems: GalleryItem[] = items.length > 0
    ? items
    : placeholderImages.map((p, i) => ({
        id: i, title_en: p.title, title_kn: p.title_kn,
        description_en: null, description_kn: null,
        file_url: p.url, file_type: 'image' as const,
        thumbnail_url: p.url, category: 'temple', is_featured: true,
      }));

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF2E0 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <p className="text-temple-saffron text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Camera size={14} /> Sacred Moments
            </p>
            <h2 className="section-title text-3xl md:text-4xl">{t('galleryTitle')}</h2>
            <p className="section-subtitle mt-3">{t('gallerySubtitle')}</p>
          </div>
          <Link href="/gallery" className="hidden md:flex items-center gap-2 text-temple-saffron font-semibold text-sm hover:gap-3 transition-all group">
            {t('viewAll')}
            <span className="w-7 h-7 rounded-full bg-temple-saffron/10 group-hover:bg-temple-saffron/20 flex items-center justify-center transition-colors">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {displayItems.slice(0, 6).map((item, i) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative rounded-2xl overflow-hidden bg-temple-cream-dark border border-temple-gold/10 hover:border-temple-gold/30 transition-all duration-300 reveal-scale ${
                i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''
              }`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              style={{ aspectRatio: i === 0 ? '1' : '4/3' }}
            >
              <div className="relative w-full h-full min-h-[150px]">
                <Image
                  src={item.thumbnail_url || item.file_url}
                  alt={language === 'kn' ? (item.title_kn || '') : (item.title_en || '')}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Title on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-semibold drop-shadow-lg">
                    {language === 'kn' ? item.title_kn : item.title_en}
                  </p>
                </div>
                {/* Corner tag */}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Images size={12} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 100%)' }}
          >
            <Camera size={16} /> View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
