'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Clock, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const navLinks = [
  { href: '/',               key: 'home'          as const },
  { href: '/about',          key: 'about'         as const },
  { href: '/lord-ganapathi', key: 'lordGanapathi' as const },
  { href: '/sevas',          key: 'sevas'         as const },
  { href: '/festivals',      key: 'festivals'     as const },
  { href: '/gallery',        key: 'gallery'       as const },
  { href: '/donations',      key: 'donations'     as const },
  { href: '/live-darshan',   key: 'liveDarshan'   as const },
  { href: '/contact',        key: 'contact'       as const },
];

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div
        className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs"
        style={{ background: 'linear-gradient(135deg, #3D0D0D 0%, #2C1A0E 100%)' }}
      >
        <div className="flex items-center gap-5 text-white/70">
          <span className="flex items-center gap-1.5 hover:text-temple-gold transition-colors">
            <Phone size={11} className="text-temple-saffron" /> +91 80 2661 0000
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Clock size={11} className="text-temple-saffron" />
            Mon–Fri: 6AM–12PM, 5PM–9PM &nbsp;|&nbsp; Weekends: 5:30AM–1PM, 4PM–9:30PM
          </span>
        </div>
        <span
          className="text-xs font-semibold tracking-wider animate-shimmer bg-clip-text text-transparent px-1"
          style={{ background: 'linear-gradient(90deg,#D4AF37,#F0D060,#D4AF37)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 2.5s linear infinite' }}
        >
          ॐ गं गणपतये नमः
        </span>
      </div>

      {/* Main navbar */}
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(60,12,12,0.96)'
            : 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(212,175,55,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div
                className="w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center font-bold text-xl text-temple-maroon group-hover:scale-110 transition-transform duration-300 shadow-glow-gold"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}
              >
                ॐ
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-temple-saffron border-2 border-temple-maroon animate-pulse" />
            </div>
            <div>
              <div className="text-white font-bold text-sm md:text-base leading-tight tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
                Karyasiddhi Vinayaka
              </div>
              <div className="text-temple-gold text-[11px] md:text-xs font-medium tracking-widest uppercase">
                Temple, Nagdevanahalli
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-temple-gold'
                      : 'text-white/85 hover:text-temple-gold hover:bg-white/8'
                  }`}
                >
                  {t(key)}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-temple-gold to-temple-saffron" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher />
            <Link
              href="/donations"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 font-semibold text-sm rounded-xl text-temple-brown transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}
            >
              <Heart size={14} fill="currentColor" /> {t('donate')}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white hover:text-temple-gold transition-colors rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto"
          style={{ background: 'linear-gradient(180deg, #3D0D0D 0%, #2C1A0E 100%)' }}
        >
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  pathname === href
                    ? 'text-temple-gold bg-white/10 border border-temple-gold/20'
                    : 'text-white/85 hover:text-temple-gold hover:bg-white/8'
                }`}
              >
                {pathname === href && <span className="w-1.5 h-1.5 rounded-full bg-temple-gold" />}
                {t(key)}
              </Link>
            ))}
            <Link
              href="/donations"
              className="mt-2 px-4 py-3 font-semibold text-sm rounded-xl text-center text-temple-brown"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 100%)' }}
            >
              {t('donate')}
            </Link>
          </nav>
          <div className="px-4 pb-4 text-white/50 text-xs space-y-1 border-t border-white/10 pt-3">
            <p className="flex items-center gap-1.5"><Phone size={11} className="text-temple-saffron" /> +91 80 2661 0000</p>
            <p className="flex items-center gap-1.5"><Clock size={11} className="text-temple-saffron" /> Mon–Fri: 6AM–12PM, 5PM–9PM</p>
          </div>
        </div>
      )}
    </header>
  );
}
