'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, IndianRupee, Clock, Users, CheckCircle, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { sevaApi } from '@/lib/api';
import { Seva, SevaBookingForm, SevaBookingResult } from '@/types';

interface Props {
  seva: Seva;
  onClose: () => void;
}

export default function BookingModal({ seva, onClose }: Props) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [booking, setBooking] = useState<SevaBookingResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SevaBookingForm>({
    defaultValues: { seva_id: seva.id, num_devotees: 1 },
  });

  const numDevotees = watch('num_devotees', 1);
  const total = seva.price * numDevotees;

  const onSubmit = async (data: SevaBookingForm) => {
    setIsSubmitting(true);
    try {
      const res = await sevaApi.book(data);
      setBooking(res.data.data);
      setStep('success');
      toast.success(t('bookingSuccess'));
    } catch {
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-temple-maroon text-white p-5 rounded-t-2xl flex items-start justify-between sticky top-0">
          <div>
            <p className="text-temple-gold text-xs font-medium mb-1">
              {language === 'kn' ? 'ಸೇವಾ ಬುಕಿಂಗ್' : 'Seva Booking'}
            </p>
            <h2 className="font-heading font-bold text-lg">
              {language === 'kn' ? seva.name_kn : seva.name_en}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            {/* Seva summary */}
            <div className="bg-temple-cream-dark rounded-xl p-4 mb-5 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-temple-brown">
                <IndianRupee size={14} className="text-temple-gold" />
                <strong>₹{seva.price.toLocaleString('en-IN')}</strong> / devotee
              </span>
              <span className="flex items-center gap-1.5 text-temple-brown">
                <Clock size={14} className="text-temple-saffron" />
                {seva.duration_minutes} min
              </span>
              <span className="flex items-center gap-1.5 text-temple-brown">
                <Users size={14} className="text-temple-saffron" />
                Max {seva.max_devotees}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">{t('fullName')} *</label>
                <input
                  {...register('devotee_name', { required: t('required') })}
                  className="input-field"
                  placeholder="Enter full name"
                />
                {errors.devotee_name && <p className="text-red-500 text-xs mt-1">{errors.devotee_name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('email')} *</label>
                  <input
                    {...register('devotee_email', {
                      required: t('required'),
                      pattern: { value: /\S+@\S+\.\S+/, message: t('invalidEmail') },
                    })}
                    type="email"
                    className="input-field"
                    placeholder="email@example.com"
                  />
                  {errors.devotee_email && <p className="text-red-500 text-xs mt-1">{errors.devotee_email.message}</p>}
                </div>
                <div>
                  <label className="input-label">{t('phone')} *</label>
                  <input
                    {...register('devotee_phone', {
                      required: t('required'),
                      pattern: { value: /^[6-9]\d{9}$/, message: t('invalidPhone') },
                    })}
                    type="tel"
                    className="input-field"
                    placeholder="9876543210"
                  />
                  {errors.devotee_phone && <p className="text-red-500 text-xs mt-1">{errors.devotee_phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="input-label">{t('nakshatra')}</label>
                  <input {...register('nakshatra')} className="input-field" placeholder="e.g. Ashwini" />
                </div>
                <div>
                  <label className="input-label">{t('gotra')}</label>
                  <input {...register('gotra')} className="input-field" placeholder="e.g. Kashyapa" />
                </div>
                <div>
                  <label className="input-label">{t('rashi')}</label>
                  <input {...register('rashi')} className="input-field" placeholder="e.g. Mesha" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('sevaDate')} *</label>
                  <input
                    {...register('seva_date', { required: t('required') })}
                    type="date"
                    min={minDate}
                    className="input-field"
                  />
                  {errors.seva_date && <p className="text-red-500 text-xs mt-1">{errors.seva_date.message}</p>}
                </div>
                <div>
                  <label className="input-label">{t('numberOfDevotees')}</label>
                  <input
                    {...register('num_devotees', { min: 1, max: seva.max_devotees })}
                    type="number"
                    min={1}
                    max={seva.max_devotees}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">{t('specialRequests')}</label>
                <textarea
                  {...register('special_requests')}
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Any special requests..."
                />
              </div>
            </div>

            {/* Total */}
            <div className="mt-5 p-4 bg-temple-maroon/5 rounded-xl flex items-center justify-between">
              <span className="font-semibold text-temple-brown">{t('totalAmount')}</span>
              <span className="text-2xl font-bold text-temple-maroon flex items-center gap-1">
                <IndianRupee size={20} />
                {total.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-4 justify-center text-base py-3"
            >
              {isSubmitting ? t('loading') : `🙏 ${t('confirmBooking')}`}
            </button>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-temple-maroon mb-2">{t('bookingSuccess')}</h3>
            <p className="text-gray-500 mb-5">A confirmation will be sent to your email</p>

            <div className="bg-temple-cream-dark rounded-xl p-5 text-left space-y-3 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{t('bookingId')}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-temple-maroon font-mono">{booking?.booking_id}</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(booking?.booking_id || ''); toast.success('Copied!'); }}
                    className="text-temple-saffron hover:text-temple-saffron-dark"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('sevaDate')}</span>
                <span className="font-semibold">{booking?.seva_date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('numberOfDevotees')}</span>
                <span className="font-semibold">{booking?.num_devotees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">{t('totalAmount')}</span>
                <span className="font-bold text-temple-maroon text-lg">
                  ₹{booking?.total_amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-temple-gold text-sm font-medium mb-4">{t('jaiGanapathi')}</p>
            <button onClick={onClose} className="btn-secondary w-full justify-center">
              {t('close')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
