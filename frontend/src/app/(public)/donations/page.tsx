'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IndianRupee, CheckCircle, Copy, Shield, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { donationApi } from '@/lib/api';
import { DonationForm, DonationResult, DonationPurpose } from '@/types';

const SUGGESTED_AMOUNTS = [101, 251, 501, 1001, 2100, 5100];

function DonationsContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [purposes, setPurposes] = useState<DonationPurpose[]>([]);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [result, setResult] = useState<DonationResult | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultPurpose = searchParams.get('purpose') || 'General Donation';

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DonationForm>({
    defaultValues: {
      purpose_en: defaultPurpose,
      purpose_kn: 'ಸಾಮಾನ್ಯ ದೇಣಿಗೆ',
      is_anonymous: false,
      amount: 501,
    },
  });

  const amount = watch('amount');
  const isAnon = watch('is_anonymous');

  useEffect(() => {
    donationApi.getPurposes().then((r) => setPurposes(r.data.data || [])).catch(() => {});
  }, []);

  const setPurpose = (p: DonationPurpose) => {
    setValue('purpose_en', p.name_en);
    setValue('purpose_kn', p.name_kn);
    if (p.suggested_amount) setValue('amount', p.suggested_amount);
  };

  const onSubmit = async (data: DonationForm) => {
    setIsSubmitting(true);
    try {
      const res = await donationApi.donate({ ...data, amount: Number(data.amount) });
      setResult(res.data.data);
      setStep('success');
      toast.success(t('donationSuccess'));
    } catch {
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success' && result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 bg-temple-cream-dark">
        <div className="card p-8 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-temple-maroon mb-2">{t('donationSuccess')}</h2>
          <p className="text-temple-gold text-xl font-bold mb-1">
            ₹{result.amount.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-500 text-sm mb-5">{result.purpose_en}</p>

          <div className="bg-temple-cream-dark rounded-xl p-4 text-left mb-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">{t('receiptNumber')}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-temple-maroon font-mono text-sm">{result.receipt_number}</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(result.receipt_number); toast.success('Copied!'); }}
                  className="text-temple-saffron"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('donorName')}</span>
              <span className="font-semibold">{result.donor_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="status-pending">{result.payment_status}</span>
            </div>
          </div>

          <p className="text-temple-gold text-sm font-medium mb-2">{t('jaiGanapathi')}</p>
          <p className="text-gray-400 text-xs mb-4">{t('taxBenefit')}</p>
          <button onClick={() => { setStep('form'); setResult(null); }} className="btn-secondary w-full justify-center">
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto px-4 relative z-10 reveal">
          <p className="text-temple-gold text-2xl mb-2">ॐ</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('donationsTitle')}</h1>
          <p className="text-white/80 text-xl">{t('donationsSubtitle')}</p>
          <p className="text-temple-gold/80 text-sm mt-2">{t('taxBenefit')}</p>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Donation causes */}
          <div className="reveal-left">
            <h3 className="font-heading font-bold text-xl text-temple-maroon mb-5">Choose a Cause</h3>
            <div className="space-y-3">
              {purposes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPurpose(p)}
                  className={`w-full text-left card p-4 hover:border-temple-gold hover:shadow-gold transition-all ${
                    watch('purpose_en') === p.name_en ? 'border-2 border-temple-gold shadow-gold' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-temple-maroon text-sm">
                        {language === 'kn' ? p.name_kn : p.name_en}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {language === 'kn' ? p.description_kn : p.description_en}
                      </p>
                    </div>
                    {p.suggested_amount && (
                      <span className="text-temple-gold font-bold text-sm flex-shrink-0">
                        ₹{p.suggested_amount.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-6 p-4 bg-temple-cream-dark rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={14} className="text-green-600" /> Secure & encrypted payment
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart size={14} className="text-temple-saffron" /> 80G tax benefit available
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-blue-600" /> Instant receipt via email
              </div>
            </div>
          </div>

          {/* Donation form */}
          <div className="lg:col-span-2 reveal-right">
            <div className="card p-6">
              <h3 className="font-heading font-bold text-xl text-temple-maroon mb-5">{t('donationsTitle')}</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="input-label">{t('donationAmount')} (₹) *</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SUGGESTED_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setValue('amount', amt); setCustomAmount(''); }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                          amount === amt && !customAmount
                            ? 'border-temple-saffron bg-temple-saffron text-white'
                            : 'border-gray-200 text-temple-brown hover:border-temple-saffron'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('amount', { required: t('required'), min: { value: 1, message: 'Minimum ₹1' } })}
                      type="number"
                      className="input-field pl-9"
                      placeholder="Enter custom amount"
                      onChange={(e) => { setCustomAmount(e.target.value); setValue('amount', parseFloat(e.target.value) || 0); }}
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                </div>

                {/* Donor info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">{t('donorName')} *</label>
                    <input
                      {...register('donor_name', { required: !isAnon && t('required') })}
                      className="input-field"
                      placeholder="Full name"
                      disabled={isAnon}
                    />
                    {errors.donor_name && <p className="text-red-500 text-xs mt-1">{errors.donor_name.message}</p>}
                  </div>
                  <div>
                    <label className="input-label">{t('email')} *</label>
                    <input
                      {...register('donor_email', {
                        required: t('required'),
                        pattern: { value: /\S+@\S+\.\S+/, message: t('invalidEmail') },
                      })}
                      type="email"
                      className="input-field"
                      placeholder="email@example.com"
                    />
                    {errors.donor_email && <p className="text-red-500 text-xs mt-1">{errors.donor_email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">{t('phone')} *</label>
                    <input
                      {...register('donor_phone', {
                        required: t('required'),
                        pattern: { value: /^[6-9]\d{9}$/, message: t('invalidPhone') },
                      })}
                      type="tel"
                      className="input-field"
                      placeholder="9876543210"
                    />
                    {errors.donor_phone && <p className="text-red-500 text-xs mt-1">{errors.donor_phone.message}</p>}
                  </div>
                  <div>
                    <label className="input-label">{t('panNumber')}</label>
                    <input
                      {...register('pan_number', {
                        pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: 'Invalid PAN format' },
                      })}
                      className="input-field uppercase"
                      placeholder="ABCDE1234F"
                    />
                    {errors.pan_number && <p className="text-red-500 text-xs mt-1">{errors.pan_number.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="input-label">{t('address')}</label>
                  <textarea
                    {...register('donor_address')}
                    rows={2}
                    className="input-field resize-none"
                    placeholder="Your address (optional)"
                  />
                </div>

                <div>
                  <label className="input-label">{t('notes')}</label>
                  <textarea
                    {...register('notes')}
                    rows={2}
                    className="input-field resize-none"
                    placeholder="Any message or special intention..."
                  />
                </div>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register('is_anonymous')}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-temple-saffron focus:ring-temple-saffron"
                  />
                  <span className="text-sm text-gray-600">{t('anonymous')}</span>
                </label>

                {/* Total */}
                <div className="p-4 bg-temple-maroon/5 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-temple-brown">{t('donationAmount')}</span>
                  <span className="text-2xl font-bold text-temple-maroon flex items-center gap-1">
                    <IndianRupee size={20} />
                    {(amount || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !amount}
                  className="btn-gold w-full justify-center text-base py-4"
                >
                  {isSubmitting ? t('loading') : t('donate')}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Note: Payment gateway integration required for live payments. This records your donation intent.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DonationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-temple-cream-dark flex items-center justify-center"><p className="text-temple-maroon">Loading...</p></div>}>
      <DonationsContent />
    </Suspense>
  );
}
