import React, { useId, useState } from 'react';
import { ArrowRight, Building2, Check, CreditCard, HandHeart, Info, Percent } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
import HomeLink from '../home/HomeLink.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * Donorfit's zero-fee message: 0% Donorfit platform fee and 0% Donorfit transaction fee,
 * with payment-provider charges disclosed separately. Text: common:fees.
 *
 * Confirmed facts only (Pricing page, Terms, payment gateway FAQ):
 * - no Donorfit platform fee, no Donorfit transaction fee on the core platform;
 * - provider processing fees are set by the provider and may still apply;
 * - donors can choose to cover the provider fee ("Cover the Fee").
 * Two designs with the same facts:
 * - `receipt` (Home, Pricing): light card with an example €100 receipt and a Cover the Fee switch;
 * - `flow` (product, feature and payment pages): navy card that follows a donation from donor to organisation.
 * The example receipt never shows a provider fee amount, because that depends on the provider.
 * Optional add-on modules (Membership, Sponsorship, MoneyPool, Water, Qurbani) pass `addon` so the note says so.
 */
export default function ZeroFeeHighlight({
  variant = 'flow',
  addon,
  id = 'zero-fee',
  className = '',
  pricingLink = true,
}: {
  variant?: 'receipt' | 'flow';
  /** Slug of a paid add-on module (common:products.<slug>) to show the add-on price note. */
  addon?: 'membership' | 'sponsorship' | 'qurbani' | 'money-pool' | 'water-well';
  id?: string;
  className?: string;
  /** Show the "See pricing" button (off on the Pricing page itself). */
  pricingLink?: boolean;
}) {
  const t = useT('common');
  const figures = (['platform', 'transaction'] as const).map((key) => ({
    key,
    label: t(`fees.${key}.label`),
    text: t(`fees.${key}.text`),
  }));
  const addonNote = addon ? t('fees.addonNote', { product: t(`products.${addon}`) }) : null;

  if (variant === 'flow') return <ZeroFeeFlow id={id} className={className} figures={figures} addonNote={addonNote} pricingLink={pricingLink} />;

  return (
    <section aria-labelledby={id} className={`relative py-16 sm:py-24 ${className}`}>
      <div className={CONTAINER}>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-aqua ring-1 ring-brand-200">
          {/* soft turquoise light, top left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-300)_45%,transparent),transparent)]"
          />
          <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            {/* Message */}
            <div className="min-w-0">
              <h2 id={id} className="text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">
                {t('fees.headline')}
              </h2>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10">
                {figures.map((f) => (
                  <div key={f.key} className="flex min-w-0 flex-col">
                    <dt className="order-2 mt-3 text-lg font-bold leading-snug text-navy-950 sm:text-xl">{f.label}</dt>
                    <dd className="hv-display order-1 whitespace-nowrap text-[4.25rem] font-extrabold leading-[0.85] tracking-tight tabular-nums text-navy-950 sm:text-[6.5rem] lg:text-[7.25rem]">
                      {t('fees.zero')}
                      <span className="text-brand-600">{t('fees.percent')}</span>
                    </dd>
                    <dd className="order-3 mt-1.5 text-[15px] leading-relaxed text-neutral-600">{f.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-navy-950/80">{t('fees.body')}</p>
              {addonNote && (
                <p className="mt-4 max-w-xl rounded-2xl bg-white/70 px-4 py-3 text-[15px] leading-relaxed text-navy-950 ring-1 ring-brand-200">{addonNote}</p>
              )}
              {pricingLink && (
                <HomeLink to="/pricing" className="hv-btn hv-btn-primary mt-8">
                  {t('fees.link')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </HomeLink>
              )}
            </div>

            {/* Example receipt */}
            <DonationReceipt />
          </div>

          <p className="flex gap-2.5 border-t border-brand-200 bg-white/60 px-6 py-5 text-sm leading-relaxed text-neutral-600 sm:px-10 lg:px-16">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
            {t('fees.providerNote')}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Flow design (product, feature and payment pages)                    */
/* ------------------------------------------------------------------ */

function ZeroFeeFlow({
  id,
  className,
  figures,
  addonNote,
  pricingLink,
}: {
  id: string;
  className: string;
  figures: { key: string; label: string; text: string }[];
  addonNote: string | null;
  pricingLink: boolean;
}) {
  const t = useT('common');
  const steps = [
    { key: 'donor', Icon: HandHeart },
    { key: 'donorfit', Icon: Percent },
    { key: 'provider', Icon: CreditCard },
    { key: 'org', Icon: Building2 },
  ] as const;

  return (
    <section aria-labelledby={id} className={`relative py-16 sm:py-24 ${className}`}>
      <div className={CONTAINER}>
        <div className="hv-dark-bg relative isolate overflow-hidden rounded-[2.5rem] text-white">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
          <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
            {/* Message */}
            <div className="min-w-0 lg:self-center">
              <h2 id={id} className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {t('fees.headline')}
              </h2>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10">
                {figures.map((f) => (
                  <div key={f.key} className="flex min-w-0 flex-col border-l-2 border-brand-400 pl-4 sm:pl-5">
                    <dt className="order-2 mt-3 text-base font-bold leading-snug text-white sm:text-lg">{f.label}</dt>
                    <dd className="hv-display order-1 whitespace-nowrap text-[3.5rem] font-extrabold leading-[0.85] tracking-tight tabular-nums text-white sm:text-[5rem]">
                      {t('fees.zero')}
                      <span className="text-brand-300">{t('fees.percent')}</span>
                    </dd>
                    <dd className="order-3 mt-1.5 text-sm leading-relaxed text-white/65">{f.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-9 max-w-xl text-[17px] leading-relaxed text-white/85">{t('fees.body')}</p>
              {addonNote && (
                <p className="mt-4 max-w-xl rounded-2xl bg-white/[0.06] px-4 py-3 text-[15px] leading-relaxed text-white/85 ring-1 ring-white/15">{addonNote}</p>
              )}
              {pricingLink && (
                <HomeLink to="/pricing" className="hv-btn hv-btn-ghost mt-8">
                  {t('fees.link')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </HomeLink>
              )}
            </div>

            {/* Where a donation goes */}
            <figure className="min-w-0">
              <figcaption className="text-sm font-semibold text-brand-200">{t('fees.flow.label')}</figcaption>
              <ol className="mt-5">
                {steps.map(({ key, Icon }, i) => {
                  const hero = key === 'donorfit';
                  return (
                    <li key={key} className="relative flex gap-4 pb-4 last:pb-0 sm:gap-5">
                      {i < steps.length - 1 && (
                        <span aria-hidden="true" className="absolute bottom-0 left-[1.375rem] top-12 w-px bg-gradient-to-b from-brand-300/70 to-white/15 sm:left-6" />
                      )}
                      <span
                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${
                          hero ? 'bg-brand-400 text-navy-950 shadow-[0_0_32px_-4px_rgb(0_160_160/0.8)]' : 'bg-white/10 text-brand-200 ring-1 ring-white/20'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div
                        className={`min-w-0 flex-1 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 ${
                          hero ? 'bg-white text-navy-950 shadow-[0_24px_50px_-28px_rgb(0_0_0/0.7)]' : 'bg-white/[0.04] ring-1 ring-white/10'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className={`text-base font-bold leading-snug ${hero ? 'text-navy-950' : 'text-white'}`}>{t(`fees.flow.${key}.title`)}</h3>
                          {hero && (
                            <span className="hv-display shrink-0 whitespace-nowrap text-2xl font-extrabold leading-none text-brand-700">
                              {t('fees.zero')}
                              {t('fees.percent')}
                            </span>
                          )}
                        </div>
                        <p className={`mt-1 text-sm leading-relaxed ${hero ? 'text-neutral-600' : 'text-white/65'}`}>{t(`fees.flow.${key}.text`)}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </figure>
          </div>

          <p className="flex gap-2.5 border-t border-white/10 bg-white/[0.03] px-6 py-5 text-sm leading-relaxed text-white/65 sm:px-10 lg:px-16">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
            {t('fees.providerNote')}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Example €100 donation: what Donorfit takes (nothing) and what the provider sets. */
function DonationReceipt() {
  const t = useT('common');
  const { eurCents } = useFormat();
  const [covered, setCovered] = useState(false);
  const switchId = useId();
  const amount = 100;

  const row = 'flex items-baseline justify-between gap-4 py-3.5';
  return (
    <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
      {/* stacked-paper edge behind the receipt */}
      <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-6 -z-10 rounded-[1.75rem] bg-white/70 ring-1 ring-brand-200" />
      <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_40px_80px_-40px_rgb(0_24_64/0.45)] ring-1 ring-navy-950/5  sm:p-8">
        <figcaption className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-navy-950">{t('fees.receipt.title')}</span>
          <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-semibold text-neutral-500">{t('fees.receipt.example')}</span>
        </figcaption>

        <dl className="mt-4 divide-y divide-dashed divide-neutral-200 text-[15px]">
          <div className={row}>
            <dt className="text-neutral-600">{t('fees.receipt.donation')}</dt>
            <dd className="hv-display shrink-0 whitespace-nowrap text-xl font-extrabold tabular-nums text-navy-950">{eurCents(amount)}</dd>
          </div>
          {(['platformFee', 'transactionFee'] as const).map((k) => (
            <div key={k} className={row}>
              <dt className="flex min-w-0 items-center gap-2 text-neutral-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {t(`fees.receipt.${k}`)}
              </dt>
              <dd className="shrink-0 whitespace-nowrap font-bold tabular-nums text-brand-700">{eurCents(0)}</dd>
            </div>
          ))}
          <div className={row}>
            <dt className="shrink-0 text-neutral-600">{t('fees.receipt.providerFee')}</dt>
            <dd className="min-w-0 text-right text-sm font-semibold text-neutral-500">
              {covered ? t('fees.receipt.providerCovered') : t('fees.receipt.providerValue')}
            </dd>
          </div>
        </dl>

        <div className="mt-2 rounded-2xl bg-navy-950 p-4 text-white sm:p-5">
          <div className="text-xs font-semibold text-brand-200">{t('fees.receipt.receives')}</div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2" aria-live="polite">
            <span className="hv-display whitespace-nowrap text-2xl font-extrabold tabular-nums sm:text-3xl">{eurCents(amount)}</span>
            {!covered && <span className="text-sm text-white/70">{t('fees.receipt.lessProvider')}</span>}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <label htmlFor={switchId} className="cursor-pointer text-sm font-semibold leading-snug text-navy-950">
            {t('fees.receipt.cover')}
          </label>
          <button
            id={switchId}
            type="button"
            role="switch"
            aria-checked={covered}
            onClick={() => setCovered((v) => !v)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none ${
              covered ? 'bg-brand-600' : 'bg-neutral-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${covered ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>
    </figure>
  );
}
