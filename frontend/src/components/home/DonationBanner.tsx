'use client';

import Link from 'next/link';
import { Heart, ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const causes = [
  { en: 'Annadana',         kn: 'ಅನ್ನದಾನ',        en2: 'Sponsor free meals for devotees',   kn2: 'ಭಕ್ತರಿಗೆ ಉಚಿತ ಊಟ ಪ್ರಾಯೋಜಿಸಿ',       amount: 2000 },
  { en: 'Deepotsava',        kn: 'ದೀಪೋತ್ಸವ',      en2: 'Light sacred lamps in the temple', kn2: 'ದೇವಾಲಯದಲ್ಲಿ ಪವಿತ್ರ ದೀಪ ಹಚ್ಚಿ',     amount: 501  },
  { en: 'Vedic Education',   kn: 'ವೈದಿಕ ಶಿಕ್ಷಣ',  en2: 'Support young Vedic scholars',     kn2: 'ಯುವ ವೈದಿಕ ವಿದ್ವಾಂಸರನ್ನು ಬೆಂಬಲಿಸಿ', amount: 3000 },
  { en: 'Temple Renovation', kn: 'ದೇವಾಲಯ ನವೀಕರಣ', en2: 'Beautify this sacred space',       kn2: 'ಈ ಪವಿತ್ರ ಸ್ಥಳವನ್ನು ಸುಂದರಗೊಳಿಸಿ',   amount: 5000 },
];

export default function DonationBanner() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 45%, #2C1A0E 100%)' }}
      />
      {/* Decorative large OM */}
      <span className="absolute text-[500px] font-bold text-white/[0.025] -top-40 -left-32 pointer-events-none select-none leading-none">ॐ</span>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)' }} />
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-temple-saffron text-sm font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-temple-saffron inline-block" />
            Seva & Dharma
            <span className="w-8 h-px bg-temple-saffron inline-block" />
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            {t('donateCause')}
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-5">
            <Heart size={16} className="text-temple-gold" />
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">{t('donateDesc')}</p>
          <p className="inline-flex items-center gap-1.5 text-temple-gold/80 text-sm mt-3 bg-temple-gold/10 px-4 py-1.5 rounded-full border border-temple-gold/20">
            <Shield size={12} /> {t('taxBenefit')}
          </p>
        </div>

        {/* Cause cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {causes.map(({ en, kn, en2, kn2, amount }, i) => (
            <Link
              key={en}
              href={`/donations?purpose=${encodeURIComponent(en)}`}
              className="group relative bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/30 rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-2 overflow-hidden reveal-scale"
              style={{ backdropFilter: 'blur(4px)', transitionDelay: `${i * 0.1}s` }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.15), transparent 70%)' }} />

              <h3 className="font-bold text-white text-base mb-1 group-hover:text-temple-gold transition-colors">
                {language === 'kn' ? kn : en}
              </h3>
              <p className="text-white/55 text-sm mb-4 leading-relaxed">
                {language === 'kn' ? kn2 : en2}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-temple-gold font-bold text-sm">
                  From ₹{amount.toLocaleString('en-IN')}
                </span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-temple-gold/20 transition-colors">
                  <ArrowRight size={11} className="text-white/60 group-hover:text-temple-gold" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/donations"
            className="inline-flex items-center gap-3 px-10 py-4 text-temple-brown font-bold text-lg rounded-2xl shadow-gold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}
          >
            <Heart size={20} fill="currentColor" /> {t('donate')} Now
          </Link>
          <p className="text-white/40 text-xs mt-4 flex items-center justify-center gap-3">
            <Shield size={11} /> Secure payment
            <span>·</span> Instant receipt
            <span>·</span> 80G Tax benefit
          </p>
        </div>
      </div>
    </section>
  );
}
