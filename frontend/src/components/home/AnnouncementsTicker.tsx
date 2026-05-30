'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { templeApi } from '@/lib/api';
import { Announcement } from '@/types';

export default function AnnouncementsTicker() {
  const { language } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    templeApi.getAnnouncements()
      .then((r) => setAnnouncements(r.data.data || []))
      .catch(() => {});
  }, []);

  if (announcements.length === 0) return null;

  const text = announcements
    .map((a) => (language === 'kn' ? a.title_kn : a.title_en))
    .join('  ✦  ');

  return (
    <div className="bg-temple-maroon text-white py-2 overflow-hidden relative flex items-center gap-3">
      <div className="flex-shrink-0 bg-temple-gold text-temple-brown px-3 py-1 text-xs font-bold flex items-center gap-1.5 z-10 whitespace-nowrap">
        <Bell size={13} fill="currentColor" />
        {language === 'kn' ? 'ಪ್ರಕಟಣೆ' : 'NOTICE'}
      </div>
      <div className="overflow-hidden flex-1">
        <p className="whitespace-nowrap animate-marquee text-sm text-white/90">
          {text}
        </p>
      </div>
    </div>
  );
}
