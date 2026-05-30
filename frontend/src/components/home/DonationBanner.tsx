'use client';

import Link from 'next/link';
import { Heart, BookOpen, Flame, Utensils } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const causes = [
  { icon: Utensils, en: 'Annadana', kn: 'ಅನ್ನದಾನ', en2: 'Sponsor free meals', kn2: 'ಉಚಿತ ಊಟ ಪ್ರಾಯೋಜಿಸಿ', amount: 2000 },
  { icon: Flame, en: 'Deepotsava', kn: 'ದೀಪೋತ್ಸವ', en2: 'Light sacred lamps', kn2: 'ಪವಿತ್ರ ದೀಪ ಹಚ್ಚಿ', amount: 501 },
  { icon: BookOpen, en: 'Vedic Education', kn: 'ವೈದಿಕ ಶಿಕ್ಷಣ', en2: 'Support young scholars', kn2: 'ಯುವ ವಿದ್ವಾಂಸರನ್ನು ಬೆಂಬಲಿಸಿ', amount: 3000 },
  { icon: Heart, en: 'Temple Renovation', kn: 'ದೇವಾಲಯ ನವೀಕರಣ', en2: 'Beautify the sacred space', kn2: 'ಪವಿತ್ರ ಸ್ಥಳವನ್ನು ಸುಂದರಗೊಳಿಸಿ', amount: 5000 },
];

export default function DonationBanner() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-temple-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-5">
        <span className="absolute text-[400px] font-bold text-white -top-32 -left-32">ॐ</span>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="gold-divider mb-4 max-w-xs mx-auto"><span className="text-temple-gold text-xl px-3">💛</span></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            {t('donateCause')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('donateDesc')}</p>
          <p className="text-temple-gold/80 text-sm mt-2">{t('taxBenefit')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {causes.map(({ icon: Icon, en, kn, en2, kn2, amount }) => (
            <Link
              key={en}
              href={`/donations?purpose=${encodeURIComponent(en)}`}
              className="group bg-white/10 hover:bg-white/15 border border-white/20 hover:border-temple-gold/50 rounded-2xl p-5 text-white transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-temple-gold/20 group-hover:bg-temple-gold/30 flex items-center justify-center mb-3 transition-colors">
                <Icon size={22} className="text-temple-gold" />
              </div>
              <h3 className="font-heading font-bold text-base mb-1">
                {language === 'kn' ? kn : en}
              </h3>
              <p className="text-white/60 text-sm mb-3">{language === 'kn' ? kn2 : en2}</p>
              <p className="text-temple-gold font-bold">
                From ₹{amount.toLocaleString('en-IN')}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/donations" className="btn-gold text-lg px-10 py-4 shadow-gold">
            💛 {t('donate')}
          </Link>
          <p className="text-white/50 text-sm mt-4">
            Secure payment · Instant receipt · Tax benefits available
          </p>
        </div>
      </div>
    </section>
  );
}
