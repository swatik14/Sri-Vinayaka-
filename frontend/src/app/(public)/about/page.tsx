'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const milestones = [
    { year: '1820', en: 'Temple founded by local devotees in the heart of Basavanagudi', kn: 'ಬಸವನಗುಡಿಯ ಹೃದಯಭಾಗದಲ್ಲಿ ಸ್ಥಳೀಯ ಭಕ್ತರಿಂದ ದೇವಾಲಯ ಸ್ಥಾಪನೆ' },
    { year: '1885', en: 'First major renovation with traditional Dravidian architecture', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದ್ರಾವಿಡ ಶೈಲಿಯಲ್ಲಿ ಮೊದಲ ಪ್ರಮುಖ ನವೀಕರಣ' },
    { year: '1952', en: 'Annadana program started — free meals for 500+ devotees daily', kn: 'ಅನ್ನದಾನ ಕಾರ್ಯಕ್ರಮ ಪ್ರಾರಂಭ — ದಿನಕ್ಕೆ 500+ ಭಕ್ತರಿಗೆ ಉಚಿತ ಊಟ' },
    { year: '1985', en: 'Kumbabhisheka (consecration ceremony) performed with grand celebrations', kn: 'ಭವ್ಯ ಆಚರಣೆಗಳೊಂದಿಗೆ ಕುಂಭಾಭಿಷೇಕ ನಡೆಯಿತು' },
    { year: '2010', en: 'Temple Trust registered; digital records and seva booking introduced', kn: 'ದೇವಾಲಯ ಟ್ರಸ್ಟ್ ನೋಂದಣಿ; ಡಿಜಿಟಲ್ ದಾಖಲೆ ಮತ್ತು ಸೇವಾ ಬುಕಿಂಗ್ ಪರಿಚಯ' },
    { year: '2024', en: 'Online darshan and digital donation platform launched', kn: 'ಆನ್‌ಲೈನ್ ದರ್ಶನ ಮತ್ತು ಡಿಜಿಟಲ್ ದೇಣಿಗೆ ವೇದಿಕೆ ಪ್ರಾರಂಭ' },
  ];

  const features = [
    { icon: '🕌', en: 'Traditional Dravidian Architecture', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪ' },
    { icon: '🎭', en: '10+ Cultural Programs Annually', kn: 'ವಾರ್ಷಿಕ 10+ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು' },
    { icon: '🍽️', en: 'Daily Annadana — Free Meals', kn: 'ದೈನಂದಿನ ಅನ್ನದಾನ — ಉಚಿತ ಊಟ' },
    { icon: '📚', en: 'Vedic Education & Scholarships', kn: 'ವೈದಿಕ ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ವೇತನ' },
    { icon: '🏥', en: 'Health Camps for the Community', kn: 'ಸಮುದಾಯಕ್ಕಾಗಿ ಆರೋಗ್ಯ ಶಿಬಿರಗಳು' },
    { icon: '🎁', en: 'Distribution of Prasad Daily', kn: 'ಪ್ರತಿದಿನ ಪ್ರಸಾದ ವಿತರಣೆ' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-temple-gold text-lg mb-2">ॐ गण गणपतये नमः</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('aboutTitle')}</h1>
          <p className="text-white/70 text-lg">Over 200 years of devotion, culture, and service</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="gold-divider mb-6 w-20"><span className="text-temple-gold text-xl px-2">📖</span></div>
            <h2 className="section-title mb-4">{t('ourHistory')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {language === 'kn'
                  ? 'ಶ್ರೀ ವಿನಾಯಕ ಗಣಪತಿ ದೇವಾಲಯ 1820 ರಲ್ಲಿ ಬೆಂಗಳೂರಿನ ಬಸವನಗುಡಿಯ ಹೃದಯಭಾಗದಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಯಿತು. ಮೂಲತಃ ಸ್ಥಳೀಯ ಭಕ್ತರ ಗುಂಪಿನಿಂದ ನಿರ್ಮಿಸಲಾದ ಸಣ್ಣ ಗುಡಿಯು ಇಂದು ಭವ್ಯ ದೇವಾಲಯ ಸಂಕೀರ್ಣವಾಗಿ ಬೆಳೆದಿದೆ.'
                  : 'Sri Vinayaka Ganapathi Temple was established in 1820 in the heart of Basavanagudi, Bangalore. Originally built as a small shrine by a group of local devotees, it has grown into a grand temple complex that serves as a spiritual anchor for the community.'}
              </p>
              <p>
                {language === 'kn'
                  ? 'ದ್ರಾವಿಡ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ದೇವಾಲಯದ ಗೋಪುರ ಮತ್ತು ಮಂಟಪಗಳು ಕರ್ನಾಟಕದ ಸಮೃದ್ಧ ಆಧ್ಯಾತ್ಮಿಕ ಪರಂಪರೆಯ ಸಂಕೇತ.'
                  : 'The temple\'s Dravidian-style architecture, with its intricately carved gopura (tower) and mandapa (hall), stands as a testament to Karnataka\'s rich spiritual heritage and artistry.'}
              </p>
              <p>
                {language === 'kn'
                  ? 'ಇಂದು ದೇವಾಲಯ ಪ್ರತಿದಿನ ಸಾವಿರಾರು ಭಕ್ತರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತದೆ ಮತ್ತು ಗಣೇಶ ಚತುರ್ಥಿ, ಸಂಕಷ್ಟಹರ ಚತುರ್ಥಿ ಮತ್ತು ಬ್ರಹ್ಮೋತ್ಸವ ಮುಂತಾದ ಹಬ್ಬಗಳನ್ನು ಭವ್ಯವಾಗಿ ಆಚರಿಸುತ್ತದೆ.'
                  : 'Today, the temple serves thousands of devotees daily and celebrates festivals like Ganesh Chaturthi, Sankatahara Chaturthi, and Brahmotsava with grand devotion and cultural programs.'}
              </p>
            </div>
          </div>
          <div className="bg-temple-gradient rounded-2xl p-8 text-white text-center relative overflow-hidden">
            <span className="absolute text-[200px] font-bold text-white/5 -top-10 -right-10 pointer-events-none">ॐ</span>
            <div className="text-8xl mb-4">🕌</div>
            <h3 className="font-heading font-bold text-3xl text-temple-gold mb-2">200+</h3>
            <p className="text-white/80 mb-6">Years of Service</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-2xl font-bold text-temple-gold">5000+</p><p className="text-xs text-white/60">Daily Devotees</p></div>
              <div><p className="text-2xl font-bold text-temple-gold">50+</p><p className="text-xs text-white/60">Annual Events</p></div>
              <div><p className="text-2xl font-bold text-temple-gold">500+</p><p className="text-xs text-white/60">Daily Meals</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-temple-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center mb-10">{t('ourHistory')} Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-temple-gold/30 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex gap-6 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 hidden md:block" />
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-temple-maroon text-white font-bold text-sm flex items-center justify-center shadow-temple z-10 relative">
                      {m.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="card p-4 hover:shadow-temple transition-shadow">
                      <p className="text-temple-maroon font-semibold text-sm">
                        {language === 'kn' ? m.kn : m.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-10">What We Do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, en, kn }) => (
              <div key={en} className="card-hover p-6 flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-temple-maroon">
                    {language === 'kn' ? kn : en}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-temple-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-heading font-bold text-temple-gold mb-6">{t('vision')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-temple-gold text-xl mb-3">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                {language === 'kn'
                  ? 'ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನ, ಸಾಂಸ್ಕೃತಿಕ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆಯ ಮೂಲಕ ಸಮಾಜದ ಸಮಗ್ರ ವಿಕಾಸಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವ ದೇವಾಲಯ.'
                  : 'To be a temple that contributes to the holistic development of society through spiritual knowledge, cultural preservation, and community service.'}
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-temple-gold text-xl mb-3">Our Mission</h3>
              <ul className="text-white/80 text-sm space-y-2 text-left">
                {[
                  'Provide authentic Vedic religious services',
                  'Preserve and promote traditional arts & culture',
                  'Serve the community through Annadana and education',
                  'Create a welcoming space for all devotees',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-temple-gold mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
