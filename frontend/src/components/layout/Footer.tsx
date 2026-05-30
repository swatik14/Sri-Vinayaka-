'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-temple-brown text-white">
      {/* Om banner */}
      <div className="bg-temple-gold py-3 text-center">
        <p className="text-temple-brown font-heading font-bold text-lg tracking-widest">
          ॐ गं गणपतये नमः ❖ ॐ ಗಂ ಗಣಪತಯೇ ನಮಃ
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-temple-gold flex items-center justify-center text-temple-maroon font-bold text-xl">
              ॐ
            </div>
            <div>
              <p className="font-heading font-bold text-white">Sri Vinayaka</p>
              <p className="text-temple-gold text-sm">Ganapathi Temple</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            A sacred abode of Lord Ganapathi, blessing devotees for over 200 years in the heart of Basavanagudi.
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-temple-saffron flex items-center justify-center transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors">
              <Youtube size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-temple-gold mb-4 text-lg">{t('quickLinks')}</h3>
          <ul className="space-y-2">
            {[
              { href: '/', label: t('home') },
              { href: '/about', label: t('about') },
              { href: '/sevas', label: t('sevas') },
              { href: '/festivals', label: t('festivals') },
              { href: '/gallery', label: t('gallery') },
              { href: '/donations', label: t('donations') },
              { href: '/live-darshan', label: t('liveDarshan') },
              { href: '/contact', label: t('contact') },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-white/70 hover:text-temple-gold text-sm transition-colors flex items-center gap-1.5">
                  <span className="text-temple-saffron text-xs">›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Temple Info */}
        <div>
          <h3 className="font-heading font-bold text-temple-gold mb-4 text-lg">{t('usefulInfo')}</h3>
          <div className="space-y-3">
            <div>
              <p className="text-temple-gold text-xs font-semibold uppercase tracking-wide mb-1">{t('dresscode')}</p>
              <p className="text-white/70 text-sm">{t('dresscodeInfo')}</p>
            </div>
            <div>
              <p className="text-temple-gold text-xs font-semibold uppercase tracking-wide mb-1">{t('photography')}</p>
              <p className="text-white/70 text-sm">{t('photographyInfo')}</p>
            </div>
            <div className="mt-3">
              <p className="text-temple-gold text-xs font-semibold uppercase tracking-wide mb-2">{t('templeTimings')}</p>
              <div className="flex items-start gap-1.5 text-white/70 text-sm">
                <Clock size={13} className="mt-0.5 text-temple-saffron flex-shrink-0" />
                <div>
                  <p>Mon–Fri: 6:00 AM – 12:00 PM</p>
                  <p>5:00 PM – 9:00 PM</p>
                  <p>Weekends: 5:30 AM – 1:00 PM</p>
                  <p>4:00 PM – 9:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading font-bold text-temple-gold mb-4 text-lg">{t('contact')}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-temple-saffron mt-0.5 flex-shrink-0" />
              <div className="text-white/70 text-sm">
                <p>Temple Road, Basavanagudi</p>
                <p>Bangalore, Karnataka 560004</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-temple-saffron flex-shrink-0" />
              <div className="text-white/70 text-sm">
                <p>+91 80 2661 0000</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-temple-saffron flex-shrink-0" />
              <a href="mailto:info@srivinayakatemple.org" className="text-white/70 hover:text-temple-gold text-sm transition-colors">
                info@srivinayakatemple.org
              </a>
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-white/5 h-28 flex items-center justify-center">
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-xs hover:text-temple-gold transition-colors flex items-center gap-1"
            >
              <MapPin size={14} /> {t('getDirections')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-white/50 text-xs px-4">
        <p>© {year} Sri Vinayaka Ganapathi Temple Trust. {t('allRightsReserved')}.</p>
        <p className="mt-1 text-temple-gold/60">{t('omNamah')}</p>
      </div>
    </footer>
  );
}
