'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { galleryApi } from '@/lib/api';
import { GalleryItem } from '@/types';

const placeholderImages = [
  'https://images.unsplash.com/photo-1609246543200-4b2b0a0a0a0a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1589308842892-bb3fc8faa2d1?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1557555187-23d685287bc3?w=400&h=300&fit=crop',
];

export default function GalleryPreview() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    galleryApi.getAll({ featured: true, limit: 6 })
      .then((r) => setItems(r.data.data || []))
      .catch(() => {});
  }, []);

  const displayItems = items.length > 0 ? items : placeholderImages.map((url, i) => ({
    id: i,
    title_en: 'Temple View',
    title_kn: 'ದೇವಾಲಯ ದೃಶ್ಯ',
    description_en: null,
    description_kn: null,
    file_url: url,
    file_type: 'image' as const,
    thumbnail_url: url,
    category: 'temple',
    is_featured: true,
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="gold-divider mb-4 w-24"><span className="text-temple-gold text-xl px-2">📸</span></div>
            <h2 className="section-title">{t('galleryTitle')}</h2>
            <p className="section-subtitle">{t('gallerySubtitle')}</p>
          </div>
          <Link href="/gallery" className="hidden md:flex items-center gap-1.5 text-temple-saffron font-semibold hover:gap-3 transition-all">
            {t('viewAll')} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {displayItems.slice(0, 6).map((item, i) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative rounded-xl overflow-hidden bg-gray-100 ${
                i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '1' : '4/3' }}
            >
              <div className="relative w-full h-full min-h-[150px]">
                {item.file_url.startsWith('http') ? (
                  <Image
                    src={item.thumbnail_url || item.file_url}
                    alt={language === 'kn' ? (item.title_kn || '') : (item.title_en || '')}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-temple-cream-dark flex items-center justify-center">
                    <ImageIcon size={32} className="text-temple-gold/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.title_en && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">
                      {language === 'kn' ? item.title_kn : item.title_en}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/gallery" className="btn-secondary">
            <ImageIcon size={16} /> {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
