'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, Facebook, Youtube, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactForm { name: string; email: string; phone: string; subject: string; message: string; }

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We will get back to you soon. 🙏');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const timings = [
    { day: 'Monday – Friday', time: '6:00 AM – 12:00 PM, 5:00 PM – 9:00 PM' },
    { day: 'Saturday & Sunday', time: '5:30 AM – 1:00 PM, 4:00 PM – 9:30 PM' },
    { day: 'Festivals & Holidays', time: '5:00 AM – 10:00 PM (Varies)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-temple-gold text-2xl mb-2">📬</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('contactTitle')}</h1>
          <p className="text-white/80 text-xl">{t('contactSubtitle')}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          {/* Left — info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-heading font-bold text-xl text-temple-maroon mb-5">{t('visitUs')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-temple-saffron/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-temple-saffron" />
                  </div>
                  <div>
                    <p className="font-semibold text-temple-brown">Temple Road, Basavanagudi</p>
                    <p className="text-gray-500 text-sm">Bangalore, Karnataka 560004</p>
                    <a
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-temple-saffron text-sm font-medium mt-1 hover:gap-2.5 transition-all"
                    >
                      <Navigation size={13} /> {t('getDirections')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-temple-brown">{t('callUs2')}</p>
                    <a href="tel:+918026610000" className="block text-gray-500 text-sm hover:text-temple-saffron">+91 80 2661 0000</a>
                    <a href="tel:+919876543210" className="block text-gray-500 text-sm hover:text-temple-saffron">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-temple-brown">{t('emailUs')}</p>
                    <a href="mailto:info@srivinayakatemple.org" className="text-gray-500 text-sm hover:text-temple-saffron">
                      info@srivinayakatemple.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="card p-6">
              <h3 className="font-heading font-bold text-xl text-temple-maroon mb-4 flex items-center gap-2">
                <Clock size={18} className="text-temple-saffron" /> {t('openingHours')}
              </h3>
              <div className="space-y-3">
                {timings.map((t) => (
                  <div key={t.day} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-temple-brown text-sm">{t.day}</span>
                    <span className="text-gray-500 text-sm">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="card p-6">
              <h3 className="font-heading font-bold text-xl text-temple-maroon mb-4">{t('followUs')}</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', bg: 'hover:bg-blue-600', href: '#' },
                  { icon: Youtube, label: 'YouTube', bg: 'hover:bg-red-600', href: '#' },
                  { icon: Instagram, label: 'Instagram', bg: 'hover:bg-pink-600', href: '#' },
                ].map(({ icon: Icon, label, bg, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-12 h-12 rounded-xl bg-temple-cream-dark ${bg} flex items-center justify-center text-temple-brown hover:text-white transition-all duration-200`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="card p-6">
              <h3 className="font-heading font-bold text-xl text-temple-maroon mb-5">{t('sendMessage')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">{t('yourName')} *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="input-label">{t('phone')}</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      type="tel"
                      className="input-field"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">{t('email')} *</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    required
                    className="input-field"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="input-label">{t('subject')} *</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="input-field"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="input-label">{t('message')} *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                  <Send size={16} />
                  {isSubmitting ? t('loading') : t('sendMessage')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
