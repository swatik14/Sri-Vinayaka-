'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, BookOpen, Tv, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 45%, #2C1A0E 100%)'
      }} />

      {/* Animated radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 -top-40 -left-40"
          style={{ background: 'radial-gradient(circle, #FF9A00, transparent)', animation: 'pulse-slow 6s ease-in-out infinite' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 bottom-0 right-0"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)', animation: 'pulse-slow 8s ease-in-out infinite reverse' }} />
      </div>

      {/* Floating Om symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute text-[500px] font-bold text-white/[0.025] -top-24 -left-24 leading-none" style={{ animation: 'float-slow 10s ease-in-out infinite' }}>ॐ</span>
        <span className="absolute text-[200px] font-bold text-white/[0.03] bottom-10 right-10 leading-none" style={{ animation: 'float-slow 8s ease-in-out infinite reverse' }}>✦</span>
      </div>

      {/* Top & bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)' }} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT — Text */}
        <div className="text-center md:text-left hero-text">

          {/* Mobile image */}
          <div className="flex md:hidden justify-center mb-8 hero-image-mobile">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-temple-gold/60"
                style={{ boxShadow: '0 0 50px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.2)' }}>
                <Image src="/images/ganesha.jpg" alt="Lord Ganesha" fill className="object-cover" style={{ objectPosition: 'center 20%' }} priority />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-temple-maroon/20 to-transparent" />
              </div>
              <div className="absolute -inset-2 rounded-full border border-temple-gold/20 animate-pulse" />
            </div>
          </div>

          {/* Om badge */}
          <div className="hidden md:inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-temple-gold mb-6 animate-float"
            style={{ background: 'rgba(212,175,55,0.15)' }}>
            <span className="text-3xl text-temple-gold font-bold">ॐ</span>
          </div>

          {/* Temple name */}
          <h1 className="font-heading font-bold text-white mb-3 leading-tight text-shadow-gold"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            {t('templeName')}
          </h1>

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-temple-gold/30 rounded-full px-4 py-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-temple-gold animate-pulse" />
            <p className="text-temple-gold text-sm font-medium" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}>
              ನಾಗದೇವನಹಳ್ಳಿ, ಬೆಂಗಳೂರು
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 justify-center md:justify-start max-w-xs mx-auto md:mx-0">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-temple-gold text-xs tracking-widest">✦ ✦ ✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/90 mb-1 font-heading italic">&ldquo;{t('templeTagline')}&rdquo;</p>
          <p className="text-white/55 text-sm mb-10">{t('templeSubTagline')}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link href="/sevas" className="btn-gold text-sm px-6 py-3.5 inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <BookOpen size={17} /> {t('bookSeva')}
            </Link>
            <Link href="/live-darshan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border-2 border-temple-gold/60 text-temple-gold hover:bg-temple-gold hover:text-temple-brown transition-all duration-200 hover:scale-105">
              <Tv size={17} /> {t('liveDarshan')}
            </Link>
            <Link href="/donations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border-2 border-white/25 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <Heart size={17} /> {t('donate')}
            </Link>
          </div>

          <p className="mt-10 text-temple-gold/70 text-sm tracking-[0.3em] font-medium animate-pulse">ॐ गण गणपतये नमः</p>
        </div>

        {/* RIGHT — Ganesha image (desktop) */}
        <div className="hidden md:flex items-center justify-center hero-image">
          <div className="relative">
            {/* Outer glow rings */}
            <div className="absolute -inset-8 rounded-full border border-temple-gold/10 animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-temple-gold/15" />
            {/* Blur glow behind */}
            <div className="absolute inset-4 rounded-full blur-3xl opacity-30"
              style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
            {/* Main image circle */}
            <div className="relative rounded-full overflow-hidden border-[3px] border-temple-gold/50"
              style={{
                width: 'clamp(320px, 35vw, 480px)',
                height: 'clamp(320px, 35vw, 480px)',
                boxShadow: '0 0 60px rgba(212,175,55,0.35), 0 0 120px rgba(212,175,55,0.15)',
                animation: 'float 6s ease-in-out infinite',
              }}>
              <Image
                src="/images/ganesha.jpg"
                alt="Lord Ganesha"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 20%' }}
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-temple-maroon/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down */}
      <a href="#timings"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-temple-gold transition-colors animate-bounce"
        aria-label="Scroll down">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
