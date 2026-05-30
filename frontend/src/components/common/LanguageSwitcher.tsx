'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-white/10 rounded-lg p-0.5 gap-0.5">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
          language === 'en'
            ? 'bg-temple-gold text-temple-brown shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('kn')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
          language === 'kn'
            ? 'bg-temple-gold text-temple-brown shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Switch to Kannada"
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
