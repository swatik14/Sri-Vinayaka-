'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const navLinks = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'about' as const },
  { href: '/lord-ganapathi', key: 'lordGanapathi' as const },
  { href: '/sevas', key: 'sevas' as const },
  { href: '/festivals', key: 'festivals' as const },
  { href: '/gallery', key: 'gallery' as const },
  { href: '/donations', key: 'donations' as const },
  { href: '/live-darshan', key: 'liveDarshan' as const },
  { href: '/contact', key: 'contact' as const },
];

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-temple-maroon-dark text-white/90 text-xs px-4 py-1.5 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Phone size={11} /> +91 80 2661 0000</span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} /> Mon–Fri: 6AM–12PM, 5PM–9PM | Weekends: 5:30AM–1PM, 4PM–9:30PM
          </span>
        </div>
        <span className="text-temple-gold font-medium animate-pulse">ॐ गं गणपतये नमः</span>
      </div>

      {/* Main header */}
      <div
        className={`bg-temple-maroon transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-temple-gold flex items-center justify-center text-temple-maroon font-bold text-lg md:text-xl shadow-gold group-hover:scale-105 transition-transform">
              ॐ
            </div>
            <div>
              <div className="text-white font-heading font-bold text-sm md:text-base leading-tight">
                Sri Vinayaka
              </div>
              <div className="text-temple-gold text-xs md:text-sm font-medium">
                Ganapathi Temple
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  pathname === href
                    ? 'text-temple-gold bg-white/10'
                    : 'text-white/90 hover:text-temple-gold hover:bg-white/10'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/donations"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-temple-gold text-temple-brown font-semibold text-sm rounded-lg hover:bg-temple-gold-light transition-all duration-200 shadow-gold"
            >
              {t('donate')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white hover:text-temple-gold transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-temple-maroon-dark border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === href
                    ? 'text-temple-gold bg-white/10'
                    : 'text-white hover:text-temple-gold hover:bg-white/10'
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/donations"
              className="mt-2 px-4 py-3 bg-temple-gold text-temple-brown font-semibold text-sm rounded-lg text-center"
            >
              {t('donate')}
            </Link>
          </nav>
          <div className="px-4 pb-4 text-white/60 text-xs space-y-1 border-t border-white/10 pt-3">
            <p className="flex items-center gap-1.5"><Phone size={11} /> +91 80 2661 0000</p>
            <p className="flex items-center gap-1.5"><Clock size={11} /> Mon–Fri: 6AM–12PM, 5PM–9PM</p>
          </div>
        </div>
      )}
    </header>
  );
}
