import React from 'react';
import { Lock, Check, Droplets, FileCheck2, Landmark } from 'lucide-react';
import { SampleBadge } from './mockKit.tsx';
import { useT, useFormat } from '../../i18n/index.tsx';

const AMOUNTS = [25, 50, 100, 250];
const SELECTED = 50;
/** 'card' is translated (home:mock.card); the rest are brand names. */
const METHODS = ['SEPA', 'card', 'Apple Pay', 'PayPal'];

/** Static, illustrative donation checkout. */
export default function DonationFormPreview() {
  const t = useT('home');
  const { eur } = useFormat();
  return (
    <figure
      className="relative mx-auto w-full max-w-md"
      aria-label={t('donationForm.figureLabel')}
    >
      {/* soft backdrop */}
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-300/50 via-brand-200/30 to-transparent blur-2xl" />

      <div aria-hidden="true" className="select-none overflow-hidden rounded-3xl border border-neutral-200/90 bg-white text-left shadow-[0_40px_80px_-36px_rgb(23_23_23/0.3)]">
        {/* Campaign header */}
        <div className="relative h-28 overflow-hidden bg-gradient-to-br from-navy-900 via-brand-800 to-brand-600">
          <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 112" preserveAspectRatio="none">
            <path d="M0 80 C 80 40, 140 110, 220 70 S 360 30, 400 60 L400 112 L0 112 Z" fill="white" fillOpacity="0.35" />
            <path d="M0 95 C 90 70, 170 115, 260 88 S 370 70, 400 85 L400 112 L0 112 Z" fill="white" fillOpacity="0.5" />
          </svg>
          <div className="relative flex h-full items-end gap-3 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-brand-700 shadow-md">
              <Droplets className="h-5 w-5" />
            </span>
            <div className="text-white">
              <div className="text-[11px] font-medium text-brand-100">{t('donationForm.organisation')}</div>
              <div className="text-base font-bold">{t('donationForm.campaign')}</div>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Frequency */}
          <div className="grid grid-cols-2 rounded-xl bg-neutral-100 p-1 text-sm font-semibold">
            <span className="rounded-lg py-2 text-center text-neutral-500">{t('mock.oneTime')}</span>
            <span className="rounded-lg bg-white py-2 text-center text-neutral-900 shadow-xs">{t('mock.monthly')}</span>
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {AMOUNTS.map((a) => (
              <span
                key={a}
                className={`rounded-xl border py-2.5 text-center text-sm font-bold tabular-nums ${
                  a === SELECTED
                    ? 'border-brand-600 bg-brand-50 text-brand-800 ring-2 ring-brand-600/15'
                    : 'border-neutral-200 text-neutral-700'
                }`}
              >
                {eur(a)}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-400">
            <span>{t('donationForm.otherAmount')}</span>
            <span>EUR</span>
          </div>

          {/* Cover fees */}
          <div className="flex items-start gap-2.5 text-xs text-neutral-600">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-brand-600 text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span>{t('donationForm.coverFees')}</span>
          </div>

          {/* Methods */}
          <div className="flex flex-wrap gap-2">
            {METHODS.map((m, i) => (
              <span
                key={m}
                className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold ${
                  i === 0 ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-neutral-200 text-neutral-600'
                }`}
              >
                {m === 'card' ? t('mock.card') : m}
              </span>
            ))}
          </div>

          <span className="hv-btn hv-btn-navy flex w-full !rounded-xl items-center justify-center rounded-xl py-3.5 text-sm font-bold">
            {t('donationForm.donateCta', { amount: eur(SELECTED) })}
          </span>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
            <Lock className="h-3 w-3" /> {t('donationForm.secure')}
          </div>
        </div>
      </div>

      {/* Floating callouts */}
      <div aria-hidden="true" className="absolute -right-3 top-12 hidden items-center gap-2.5 rounded-2xl border border-neutral-200/90 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur sm:flex lg:-right-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <FileCheck2 className="h-4 w-4" />
        </span>
        <div className="text-left">
          <div className="text-xs font-semibold text-neutral-900">{t('donationForm.receiptTitle')}</div>
          <div className="text-[11px] text-neutral-500">{t('donationForm.receiptSub')}</div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute -left-3 -top-7 hidden items-center gap-2.5 rounded-2xl border border-neutral-200/90 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur sm:flex lg:-left-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Landmark className="h-4 w-4" />
        </span>
        <div className="text-left">
          <div className="text-xs font-semibold text-neutral-900">{t('donationForm.sepaTitle')}</div>
          <div className="text-[11px] text-neutral-500">{t('donationForm.sepaSub')}</div>
        </div>
      </div>

      <figcaption className="mt-4 flex justify-center">
        <SampleBadge label={t('donationForm.badge')} />
      </figcaption>
    </figure>
  );
}
