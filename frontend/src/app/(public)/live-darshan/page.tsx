'use client';

import { useEffect, useState } from 'react';
import { Youtube, Radio, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { templeApi } from '@/lib/api';
import { LiveDarshan } from '@/types';

export default function LiveDarshanPage() {
  const { t, language } = useLanguage();
  const [config, setConfig] = useState<LiveDarshan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    templeApi.getLiveDarshan()
      .then((r) => setConfig(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const schedule = [
    { time: '6:00 AM – 8:00 AM', en: 'Morning Puja & Abhisheka', kn: 'ಬೆಳಗಿನ ಪೂಜೆ ಮತ್ತು ಅಭಿಷೇಕ', days: 'Daily' },
    { time: '11:30 AM – 12:00 PM', en: 'Uchha Puja', kn: 'ಉಚ್ಚ ಪೂಜೆ', days: 'Daily' },
    { time: '6:00 PM – 8:00 PM', en: 'Evening Puja & Arati', kn: 'ಸಂಜೆ ಪೂಜೆ ಮತ್ತು ಆರತಿ', days: 'Daily' },
    { time: 'All Day', en: 'Festival Special Stream', kn: 'ಹಬ್ಬ ವಿಶೇಷ ಪ್ರಸಾರ', days: 'On Festivals' },
  ];

  const videoId = config?.youtube_video_id || 'jNQXAC9IVRw';
  const channelId = config?.youtube_channel_id || 'UCxxxxxxxxxxxxxx';
  const isLive = config?.is_live || false;

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-temple-gold text-2xl mb-2">📺</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('liveDarshanTitle')}</h1>
          <p className="text-white/80 text-xl">{t('liveDarshanSubtitle')}</p>
          {!loading && (
            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full font-semibold text-sm ${
              isLive ? 'bg-red-500 text-white animate-pulse' : 'bg-white/20 text-white'
            }`}>
              <Radio size={14} fill="currentColor" />
              {isLive ? t('currentlyLive') : t('offlineNow')}
            </div>
          )}
        </div>
      </div>

      {/* YouTube Player */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="card overflow-hidden">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}${isLive ? '?autoplay=1&mute=1' : ''}`}
                title="Sri Vinayaka Temple Live Darshan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="p-5 bg-temple-cream-dark flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-temple-maroon">Sri Vinayaka Ganapathi Temple</h3>
                <p className="text-gray-500 text-sm">Basavanagudi, Bangalore</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://www.youtube.com/channel/${channelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm py-2"
                >
                  <Youtube size={16} /> {t('subscribe')}
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2 text-sm py-2"
                >
                  {t('watchOnYouTube')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-12 bg-temple-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center mb-8">{t('liveSchedule')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {schedule.map((s) => (
              <div key={s.en} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Radio size={18} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-temple-maroon">
                    {language === 'kn' ? s.kn : s.en}
                  </h4>
                  <p className="text-temple-saffron font-semibold text-sm">{s.time}</p>
                  <p className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                    <Calendar size={11} /> {s.days}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {config && (
            <div className="mt-6 card p-5 border-l-4 border-temple-saffron">
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === 'kn' ? config.schedule_kn : config.schedule_en}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Notice */}
      <section className="py-10 bg-temple-maroon text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="font-heading font-bold text-xl text-temple-gold mb-3">
            Can&apos;t make it in person?
          </h3>
          <p className="text-white/80 mb-5">
            Subscribe to our YouTube channel to receive notifications when we go live for special pujas and festivals.
          </p>
          <a
            href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
          >
            <Youtube size={20} /> Subscribe to Channel
          </a>
        </div>
      </section>
    </div>
  );
}
