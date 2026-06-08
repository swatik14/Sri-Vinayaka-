'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const forms = [
  { name: 'Ganesha', kn: 'ಗಣೇಶ', desc: 'Lord of all beings' },
  { name: 'Vinayaka', kn: 'ವಿನಾಯಕ', desc: 'Remover of obstacles' },
  { name: 'Ganapathi', kn: 'ಗಣಪತಿ', desc: 'Leader of Ganas' },
  { name: 'Vighnaharta', kn: 'ವಿಘ್ನಹರ್ತ', desc: 'Destroyer of obstacles' },
  { name: 'Lambodara', kn: 'ಲಂಬೋದರ', desc: 'Big-bellied one' },
  { name: 'Heramba', kn: 'ಹೇರಂಬ', desc: 'Protector of the weak' },
];

const attributes = [
  { attr: 'Elephant Head', kn: 'ಆನೆ ತಲೆ', meaning: 'Wisdom and memory', en2: 'Represents the power of the mind to perceive beyond the mundane', kn2: 'ಸಾಮಾನ್ಯ ಅನುಭವದ ಆಚೆ ಮನಸ್ಸಿನ ಶಕ್ತಿ' },
  { attr: 'Large Ears', kn: 'ದೊಡ್ಡ ಕಿವಿ', meaning: 'Listening and knowledge', en2: 'Listens to the prayers of devotees without bias', kn2: 'ಭಕ್ತರ ಪ್ರಾರ್ಥನೆಗಳನ್ನು ನಿಷ್ಪಕ್ಷಪಾತವಾಗಿ ಕೇಳುವರು' },
  { attr: 'Broken Tusk', kn: 'ಮುರಿದ ದಂತ', meaning: 'Sacrifice and writing', en2: 'Sacrificed his tusk to write the Mahabharata', kn2: 'ಮಹಾಭಾರತ ಬರೆಯಲು ದಂತ ತ್ಯಾಗ ಮಾಡಿದರು' },
  { attr: 'Modaka (Sweet)', kn: 'ಮೋದಕ', meaning: 'Sweetness of spiritual knowledge', en2: 'The reward of the righteous life', kn2: 'ಧಾರ್ಮಿಕ ಜೀವನದ ಪ್ರತಿಫಲ' },
  { attr: 'Mouse (Vahana)', kn: 'ಇಲಿ (ವಾಹನ)', meaning: 'Ego under control', en2: 'The ego (mouse) is controlled by wisdom (Ganesha)', kn2: 'ಅಹಂಕಾರ (ಇಲಿ) ಬುದ್ಧಿಯ ನಿಯಂತ್ರಣದಲ್ಲಿ' },
  { attr: 'Pot Belly', kn: 'ದೊಡ್ಡ ಹೊಟ್ಟೆ', meaning: 'Containing the universe', en2: 'Holds all experiences of the universe within', kn2: 'ಬ್ರಹ್ಮಾಂಡದ ಎಲ್ಲಾ ಅನುಭವಗಳನ್ನು ಒಳಗೊಂಡಿದೆ' },
];

const mantras = [
  {
    name: 'Mula Mantra',
    mantra: 'ॐ गं गणपतये नमः',
    kannada: 'ಓಂ ಗಂ ಗಣಪತಯೇ ನಮಃ',
    meaning: 'I bow to Lord Ganapathi, the remover of obstacles',
  },
  {
    name: 'Ganapathi Gayatri',
    mantra: 'ॐ तत्पुरुषाय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्तिः प्रचोदयात्',
    kannada: 'ಓಂ ತತ್ಪುರುಷಾಯ ವಿದ್ಮಹೇ ವಕ್ರತುಂಡಾಯ ಧೀಮಹಿ ತನ್ನೋ ದಂತಿಃ ಪ್ರಚೋದಯಾತ್',
    meaning: 'Let us meditate on the great Ganapathi, may he illuminate our minds',
  },
  {
    name: 'Ekadanta Mantra',
    mantra: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    kannada: 'ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ। ನಿರ್ವಿಘ್ನಂ ಕುರು ಮೇ ದೇವ ಸರ್ವಕಾರ್ಯೇಷು ಸರ್ವದಾ॥',
    meaning: 'O Lord with curved trunk, huge body, radiant as millions of suns — grant me freedom from obstacles in all undertakings, always.',
  },
];

export default function LordGanapathiPage() {
  const { t, language } = useLanguage();

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10 reveal">
          <p className="text-temple-gold text-lg mb-2">ॐ गण गणपतये नमः</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('lordTitle')}</h1>
          <p className="text-white/80 text-xl">{t('lordSubtitle')}</p>
        </div>
      </div>

      {/* Significance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-temple reveal-left">
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/images/ganesha-idol.jpg"
                alt="Lord Ganesha"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-temple-maroon/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="font-heading font-bold text-2xl text-temple-gold mb-1">Lord Ganapathi</h2>
              <p className="text-white/80 text-sm italic">&ldquo;He who overcomes all obstacles and bestows wisdom&rdquo;</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2"><p className="text-temple-gold font-bold">Vahana</p><p className="text-white/70">Mushaka (Mouse)</p></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2"><p className="text-temple-gold font-bold">Consorts</p><p className="text-white/70">Siddhi & Riddhi</p></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2"><p className="text-temple-gold font-bold">Parents</p><p className="text-white/70">Shiva & Parvati</p></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2"><p className="text-temple-gold font-bold">Favorite</p><p className="text-white/70">Modaka</p></div>
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <h2 className="section-title mb-4">{t('significance')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {language === 'kn'
                  ? 'ಗಣಪತಿ, ಗಣೇಶ ಅಥವಾ ವಿನಾಯಕ ಎಂದೂ ಕರೆಯಲ್ಪಡುವ ಈ ದೇವರು ಹಿಂದೂ ಧರ್ಮದ ಅತ್ಯಂತ ಪ್ರಮುಖ ದೇವತೆಗಳಲ್ಲಿ ಒಬ್ಬರು. ಅವರು ಅಡೆತಡೆಗಳ ನಿವಾರಕ, ವಿದ್ಯೆ, ಬುದ್ಧಿ ಮತ್ತು ಹೊಸ ಆರಂಭದ ದೇವರು.'
                  : 'Lord Ganapathi, also known as Ganesha or Vinayaka, is one of the most widely revered deities in Hinduism. He is the remover of obstacles, the patron of arts and sciences, and the god of new beginnings.'}
              </p>
              <p>
                {language === 'kn'
                  ? 'ಯಾವುದೇ ಮಂಗಳ ಕಾರ್ಯ ಆರಂಭಿಸುವ ಮೊದಲು ಗಣಪತಿಯ ಪೂಜೆ ಮಾಡಲಾಗುತ್ತದೆ. ಅವರ ಆಶೀರ್ವಾದದಿಂದ ಎಲ್ಲಾ ಕಾರ್ಯಗಳು ನಿರ್ವಿಘ್ನವಾಗಿ ಮುಗಿಯುತ್ತವೆ ಎಂದು ನಂಬಲಾಗಿದೆ.'
                  : 'Before beginning any auspicious task, Ganapathi is worshipped first. His blessings are believed to ensure that all endeavors proceed without obstacles and are completed successfully.'}
              </p>
              <p>
                {language === 'kn'
                  ? 'ಆನೆಯ ತಲೆ ಮತ್ತು ಮಾನವ ದೇಹ — ಗಣಪತಿಯ ಅನನ್ಯ ರೂಪ ಜ್ಞಾನ (ಆನೆ) ಮತ್ತು ಭಾವನೆ (ಮಾನವ) ಯ ಸಂಯೋಜನೆಯನ್ನು ಸಂಕೇತಿಸುತ್ತದೆ.'
                  : 'The elephant head and human body — Ganapathi\'s unique form symbolizes the union of wisdom (elephant) and emotion (human), representing the ideal balance for a fulfilling life.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attributes */}
      <section className="py-16 bg-temple-cream-dark">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-10 reveal">{t('attributes')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attributes.map((a, i) => (
              <div key={a.attr} className="card-hover p-5 reveal-scale"
                style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6B1A1A, #4A0F0F)' }}>
                    <span className="text-temple-gold text-xs font-bold">ॐ</span>
                  </div>
                  <h3 className="font-heading font-bold text-temple-maroon">
                    {language === 'kn' ? a.kn : a.attr}
                  </h3>
                </div>
                <p className="text-temple-saffron text-sm font-medium mb-2">{a.meaning}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {language === 'kn' ? a.kn2 : a.en2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-10 reveal">{t('forms')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {forms.map(({ name, kn, desc }, i) => (
              <div key={name} className="card text-center p-5 hover:shadow-temple hover:-translate-y-2 transition-all duration-300 reveal-scale"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #FF9A00)' }}>
                  <span className="text-white font-bold text-lg">ॐ</span>
                </div>
                <h3 className="font-heading font-bold text-temple-maroon text-sm">{language === 'kn' ? kn : name}</h3>
                <p className="text-gray-400 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mantras */}
      <section className="py-16 bg-temple-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute text-[500px] font-bold text-white/[0.025] -top-20 -left-20 leading-none animate-float-slow">ॐ</span>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white text-center mb-10 reveal">{t('mantras')}</h2>
          <div className="space-y-6">
            {mantras.map((m, i) => (
              <div key={m.name} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}>
                <h3 className="text-temple-gold font-bold font-heading text-lg mb-3">{m.name}</h3>
                <p className="text-2xl font-bold text-center mb-2 leading-relaxed">{m.mantra}</p>
                <p className="text-white/60 text-center text-sm mb-2" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}>
                  {m.kannada}
                </p>
                <div className="border-t border-white/20 mt-3 pt-3">
                  <p className="text-white/70 text-sm text-center italic">{m.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
