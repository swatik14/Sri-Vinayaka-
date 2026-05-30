'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-temple-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="gold-divider mb-4 max-w-xs mx-auto"><span className="text-temple-gold text-xl px-3">📍</span></div>
          <h2 className="section-title">{t('contactTitle')}</h2>
          <p className="section-subtitle">{t('contactSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-temple-saffron/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-temple-saffron" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon mb-1">{t('visitUs')}</h3>
                  <p className="text-gray-600">Temple Road, Basavanagudi</p>
                  <p className="text-gray-600">Bangalore, Karnataka 560004</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-temple-saffron text-sm font-medium mt-2 hover:gap-2.5 transition-all"
                  >
                    <Navigation size={14} /> {t('getDirections')}
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-green-600" />
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

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon mb-1">{t('emailUs')}</h3>
                  <a href="mailto:info@srivinayakatemple.org" className="text-gray-600 hover:text-temple-saffron transition-colors">
                    info@srivinayakatemple.org
                  </a>
                </div>
              </div>
            </div>

            <Link href="/contact" className="btn-secondary w-full justify-center mt-4">
              {t('sendMessage')}
            </Link>
          </div>

          {/* Map placeholder */}
          <div className="card overflow-hidden h-full min-h-[350px]">
            <div className="bg-temple-cream-dark h-full min-h-[350px] flex flex-col items-center justify-center gap-4 p-8 text-center">
              <MapPin size={48} className="text-temple-gold/40" />
              <div>
                <p className="text-temple-maroon font-heading font-bold text-xl mb-2">Sri Vinayaka Ganapathi Temple</p>
                <p className="text-gray-500 text-sm mb-1">Temple Road, Basavanagudi</p>
                <p className="text-gray-500 text-sm">Bangalore, Karnataka 560004</p>
              </div>
              <a
                href="https://www.google.com/maps/search/Basavanagudi+Temple+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Navigation size={16} /> Open in Google Maps
              </a>
              <p className="text-gray-400 text-xs mt-2">
                Replace with embedded Google Maps iframe in production
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
