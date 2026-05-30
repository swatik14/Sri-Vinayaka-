'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background — replace with actual temple image */}
      <div
        className="absolute inset-0 bg-temple-gradient"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, rgba(255,154,0,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.1) 0%, transparent 60%),
            linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 50%, #2C1A0E 100%)
          `,
        }}
      />

      {/* Decorative Om symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute text-[400px] font-bold text-white opacity-[0.03] -top-20 -left-20">ॐ</span>
        <span className="absolute text-[300px] font-bold text-white opacity-[0.03] -bottom-10 -right-10">ॐ</span>
      </div>

      {/* Decorative border elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Om symbol */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-temple-gold/20 border-2 border-temple-gold mb-6 mx-auto animate-float">
          <span className="text-4xl text-temple-gold font-bold">ॐ</span>
        </div>

        {/* Temple name */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-3 leading-tight text-shadow-gold">
          {t('templeName')}
        </h1>

        {/* Kannada subtitle */}
        <p className="text-temple-gold text-2xl md:text-3xl font-medium mb-2" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}>
          ಶ್ರೀ ವಿನಾಯಕ ಗಣಪತಿ ದೇವಾಲಯ
        </p>

        <div className="gold-divider my-5 max-w-xs mx-auto">
          <span className="text-temple-gold text-sm font-medium px-3">✦ ✦ ✦</span>
        </div>

        <p className="text-xl md:text-2xl text-white/90 mb-2 font-heading italic">
          &ldquo;{t('templeTagline')}&rdquo;
        </p>
        <p className="text-white/60 text-base mb-10">{t('templeSubTagline')}</p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sevas" className="btn-gold text-lg px-8 py-4 shadow-gold">
            🙏 {t('bookSeva')}
          </Link>
          <Link href="/live-darshan" className="btn-outline border-temple-gold text-temple-gold text-lg px-8 py-4 hover:bg-temple-gold hover:text-temple-brown">
            📺 {t('liveDarshan')}
          </Link>
          <Link href="/donations" className="btn-outline border-white/40 text-white text-lg px-8 py-4 hover:bg-white/10 hover:border-white">
            💛 {t('donate')}
          </Link>
        </div>

        {/* Mantra */}
        <p className="mt-10 text-temple-gold/80 text-base tracking-widest font-medium animate-pulse">
          ॐ गण गणपतये नमः
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#timings"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-temple-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
