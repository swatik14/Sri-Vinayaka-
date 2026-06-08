'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-temple-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <div className="gold-divider mb-4 max-w-xs mx-auto"><span className="text-temple-gold text-xl px-3">ॐ</span></div>
          <h2 className="section-title">{t('contactTitle')}</h2>
          <p className="section-subtitle">{t('contactSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="card p-6 reveal-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-temple-saffron/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-temple-saffron" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon mb-1">{t('visitUs')}</h3>
                  <p className="text-gray-600">Nagdevanahalli, Bangalore</p>
                  <p className="text-gray-600">Karnataka - 560056</p>
                  <a
                    href="https://www.google.com/maps/search/Nagdevanahalli+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-temple-saffron text-sm font-medium mt-2 hover:gap-2.5 transition-all"
                  >
                    <Navigation size={14} /> {t('getDirections')}
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6 reveal-left" style={{ transitionDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon mb-1">{t('callUs2')}</h3>
                  <a href="tel:+918026610000" className="block text-gray-600 hover:text-temple-saffron transition-colors">
                    +91 80 2661 0000
                  </a>
                  <a href="tel:+919876543210" className="block text-gray-600 hover:text-temple-saffron transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6 reveal-left" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon mb-1">{t('emailUs')}</h3>
                  <a href="mailto:info@srivinayakatemple.org" className="text-gray-600 hover:text-temple-saffron transition-colors">
                    info@srivinayakatemple.org
                  </a>
                </div>
              </div>
            </div>

            <Link href="/contact" className="btn-secondary w-full justify-center mt-4 hover:scale-[1.02] transition-transform reveal">
              {t('sendMessage')}
            </Link>
          </div>

          {/* Map placeholder */}
          <div className="card overflow-hidden h-full min-h-[350px] reveal-right">
            <div className="bg-temple-cream-dark h-full min-h-[350px] flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center animate-glow"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #FF9A00)' }}>
                <MapPin size={28} className="text-white" />
              </div>
              <div>
                <p className="text-temple-maroon font-heading font-bold text-xl mb-2">Sri Sri Sri Karyasiddhi Vinayaka Temple</p>
                <p className="text-gray-500 text-sm">Nagdevanahalli, Bangalore - 560056</p>
                <p className="text-gray-500 text-sm">Karnataka, India</p>
              </div>
              <a
                href="https://www.google.com/maps/search/Nagdevanahalli+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hover:scale-105 transition-transform"
              >
                <Navigation size={16} /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
