'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'linear-gradient(180deg, #2C1A0E 0%, #1A0A0A 100%)' }} className="text-white relative overflow-hidden">

      {/* Decorative OM watermark */}
      <span className="absolute text-[500px] font-bold text-white/[0.015] -bottom-40 -right-20 pointer-events-none select-none leading-none">ॐ</span>

      {/* Gold top banner */}
      <div style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 40%, #F0D060 50%, #D4AF37 60%, #B8860B 100%)' }} className="py-3 text-center">
        <p className="text-[#3D0D0D] font-bold tracking-widest text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
          ॐ गं गणपतये नमः &nbsp;❖&nbsp; ॐ ಗಂ ಗಣಪತಯೇ ನಮಃ
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-temple-maroon font-bold text-2xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}
            >
              ॐ
            </div>
            <div>
              <p className="font-bold text-white text-base" style={{ fontFamily: 'Cinzel, serif' }}>Sri Sri Sri Karyasiddhi Vinayaka</p>
              <p className="text-temple-gold text-xs tracking-widest uppercase">Temple, Nagdevanahalli</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            A sacred abode of Lord Ganapathi, blessing devotees for over 200 years at Nagdevanahalli, Bangalore - 560056.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Facebook, label: 'Facebook', hover: 'hover:bg-blue-600' },
              { icon: Youtube,  label: 'YouTube',  hover: 'hover:bg-red-600'  },
              { icon: Instagram,label: 'Instagram',hover: 'hover:bg-pink-600' },
            ].map(({ icon: Icon, label, hover }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className={`w-10 h-10 rounded-xl bg-white/10 ${hover} flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-temple-gold mb-5 text-sm uppercase tracking-widest">{t('quickLinks')}</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/',               label: t('home') },
              { href: '/about',          label: t('about') },
              { href: '/sevas',          label: t('sevas') },
              { href: '/festivals',      label: t('festivals') },
              { href: '/gallery',        label: t('gallery') },
              { href: '/donations',      label: t('donations') },
              { href: '/live-darshan',   label: t('liveDarshan') },
              { href: '/contact',        label: t('contact') },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-white/60 hover:text-temple-gold text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-saffron/50 group-hover:bg-temple-gold transition-colors flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Temple Info */}
        <div>
          <h3 className="font-bold text-temple-gold mb-5 text-sm uppercase tracking-widest">{t('usefulInfo')}</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-temple-gold text-xs font-bold uppercase tracking-wide mb-1">{t('dresscode')}</p>
              <p className="text-white/60 text-xs">{t('dresscodeInfo')}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-temple-gold text-xs font-bold uppercase tracking-wide mb-1">{t('photography')}</p>
              <p className="text-white/60 text-xs">{t('photographyInfo')}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-temple-gold text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Clock size={11} className="text-temple-saffron" /> {t('templeTimings')}
              </p>
              <div className="space-y-1 text-white/60 text-xs">
                <p>Mon–Fri: 6:00 AM – 12:00 PM, 5:00 PM – 9:00 PM</p>
                <p>Weekends: 5:30 AM – 1:00 PM, 4:00 PM – 9:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-temple-gold mb-5 text-sm uppercase tracking-widest">{t('contact')}</h3>
          <div className="space-y-4">
            {[
              { icon: MapPin, lines: ['Nagdevanahalli, Bangalore', 'Karnataka - 560056'] },
              { icon: Phone,  lines: ['+91 80 2661 0000', '+91 98765 43210'] },
            ].map(({ icon: Icon, lines }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-temple-saffron/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-temple-saffron" />
                </div>
                <div className="text-white/60 text-sm">
                  {lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-temple-saffron/15 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-temple-saffron" />
              </div>
              <a href="mailto:info@srivinayakatemple.org" className="text-white/60 hover:text-temple-gold text-sm transition-colors">
                info@srivinayakatemple.org
              </a>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl border border-temple-gold/20 bg-temple-gold/5 text-center">
            <p className="text-temple-gold/80 text-xs font-medium">Open 365 days a year</p>
            <p className="text-white/40 text-xs mt-0.5">Including all festivals & holidays</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 text-center text-white/40 text-xs px-4 relative z-10">
        <p>© {year} Sri Sri Sri Karyasiddhi Vinayaka Temple, Nagdevanahalli. {t('allRightsReserved')}.</p>
        <p className="mt-1.5 text-temple-gold/50 tracking-widest">{t('omNamah')}</p>
      </div>
    </footer>
  );
}
