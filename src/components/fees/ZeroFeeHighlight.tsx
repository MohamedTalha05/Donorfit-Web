import React, { useEffect, useRef, useState } from 'react';
import { Building2, Check, CreditCard, HandHeart, Percent } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * Donorfit's zero-fee message. Text: common:fees.
 *
 * Business model confirmed by the client on 2026-11-18:
 * - 0% platform fee for organisations;
 * - Donorfit absorbs the payment gateway processing charges for every organisation and gateway,
 *   so they are never passed on to organisations or deducted from donations;
 * - organisations receive 100% of the intended donation amount.
 * ("Cover the Fee" was removed site-wide at the same time.)
 *
 * Two designs with the same facts:
 * - `receipt` (Home, Pricing): light card with an example €100 receipt;
 * - `flow` (product, feature and payment pages): navy card that follows a donation from donor to organisation.
 * Motion: the 0% figures rise in and the 100% figure counts up the first time the section is in view
 * (final values shown immediately with reduced motion or before hydration).
 * Optional add-on modules (Membership, Sponsorship, MoneyPool, Water, Qurbani) pass `addon` so the note says so.
 */

/** True once the element has entered the viewport (never resets). */
function useEnteredView<T extends Element>() {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, entered };
}

/** Whether entrance motion should play (false with reduced motion, so content is static and final). */
function useMotion() {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof IntersectionObserver !== 'undefined');
  }, []);
  return motion;
}

/** Counts 0 → target once `start` is true; returns target when motion is off. */
function useCountUp(target: number, start: boolean, motion: boolean, delay = 250) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (motion) setValue(0);
  }, [motion]);
  useEffect(() => {
    if (!motion || !start) return;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1600);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [motion, start, target, delay]);
  return value;
}

type Figure = { key: string; label: string; text: string };

/** The two 0% figures; they rise in when the section enters the viewport. */
function ZeroFigures({ figures, entered, motion, dark }: { figures: Figure[]; entered: boolean; motion: boolean; dark: boolean }) {
  const t = useT('common');
  const hidden = motion && !entered;
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10">
      {figures.map((f, i) => (
        <div key={f.key} className={`flex min-w-0 flex-col ${dark ? 'border-l-2 border-brand-400 pl-4 sm:pl-5' : ''}`}>
          <dt className={`order-2 mt-3 font-bold leading-snug ${dark ? 'text-base text-white sm:text-lg' : 'text-lg text-navy-950 sm:text-xl'}`}>{f.label}</dt>
          <dd className="order-1 overflow-hidden">
            <span
              className={`hv-display block whitespace-nowrap font-extrabold leading-[0.9] tracking-tight tabular-nums transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${
                dark ? 'text-[3.5rem] text-white sm:text-[5rem]' : 'text-[4.25rem] text-navy-950 sm:text-[6.5rem] lg:text-[7.25rem]'
              } ${hidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              {t('fees.zero')}
              <span className={dark ? 'text-brand-300' : 'text-brand-600'}>{t('fees.percent')}</span>
            </span>
          </dd>
          <dd className={`order-3 mt-1.5 leading-relaxed ${dark ? 'text-sm text-white/65' : 'text-[15px] text-neutral-600'}`}>{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "100% of every donation reaches your organisation", with a count-up. */
function FullAmount({ entered, motion, dark }: { entered: boolean; motion: boolean; dark: boolean }) {
  const t = useT('common');
  const n = useCountUp(100, entered, motion, 400);
  const fill = motion ? (entered ? 100 : 0) : 100;
  return (
    <div className={`mt-8 overflow-hidden rounded-2xl p-5 sm:p-6 ${dark ? 'bg-brand-400 text-navy-950' : 'bg-navy-950 text-white'}`}>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="hv-display whitespace-nowrap text-5xl font-extrabold leading-none tracking-tight tabular-nums sm:text-6xl">
          <span className="sr-only">
            {t('fees.hundred')}
            {t('fees.percent')}
          </span>
          <span aria-hidden="true">
            {n}
            <span className={dark ? 'text-navy-700' : 'text-brand-300'}>{t('fees.percent')}</span>
          </span>
        </span>
        <span className={`text-base font-bold leading-snug sm:text-lg ${dark ? 'text-navy-950' : 'text-white'}`}>{t('fees.full.label')}</span>
      </p>
      <span aria-hidden="true" className={`mt-4 block h-1.5 overflow-hidden rounded-full ${dark ? 'bg-navy-950/15' : 'bg-white/15'}`}>
        <span
          className={`block h-full origin-left rounded-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${dark ? 'bg-navy-950' : 'bg-brand-400'}`}
          style={{ transform: `scaleX(${fill / 100})`, transitionDelay: '400ms' }}
        />
      </span>
    </div>
  );
}

export default function ZeroFeeHighlight({
  variant = 'flow',
  addon,
  id = 'zero-fee',
  className = '',
}: {
  variant?: 'receipt' | 'flow';
  /** Slug of a paid add-on module (common:products.<slug>) to show the add-on price note. */
  addon?: 'membership' | 'sponsorship' | 'qurbani' | 'money-pool' | 'water-well';
  id?: string;
  className?: string;
}) {
  const t = useT('common');
  const { ref, entered } = useEnteredView<HTMLDivElement>();
  const motion = useMotion();
  const figures: Figure[] = (['platform', 'transaction'] as const).map((key) => ({
    key,
    label: t(`fees.${key}.label`),
    text: t(`fees.${key}.text`),
  }));
  const addonNote = addon ? t('fees.addonNote', { product: t(`products.${addon}`) }) : null;
  const dark = variant === 'flow';

  const message = (
    <div ref={ref} className="min-w-0 lg:self-center">
      <h2 id={id} className={`text-2xl font-extrabold leading-tight [text-wrap:balance] sm:text-3xl ${dark ? 'text-white' : 'text-navy-950'}`}>
        {t('fees.headline')}
      </h2>
      <ZeroFigures figures={figures} entered={entered} motion={motion} dark={dark} />
      <FullAmount entered={entered} motion={motion} dark={dark} />
      <p className={`mt-8 max-w-xl leading-relaxed ${dark ? 'text-[17px] text-white/85' : 'text-lg text-navy-950/80'}`}>{t('fees.body')}</p>
      {addonNote && (
        <p
          className={`mt-4 max-w-xl rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
            dark ? 'bg-white/[0.06] text-white/85 ring-1 ring-white/15' : 'bg-white/70 text-navy-950 ring-1 ring-brand-200'
          }`}
        >
          {addonNote}
        </p>
      )}
    </div>
  );

  if (dark) {
    return (
      <section aria-labelledby={id} className={`relative py-16 sm:py-24 ${className}`}>
        <div className={CONTAINER}>
          <div className="hv-dark-bg relative isolate overflow-hidden rounded-[2.5rem] text-white">
            <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
            <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
              {message}
              <DonationFlow />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className={`relative py-16 sm:py-24 ${className}`}>
      <div className={CONTAINER}>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-aqua ring-1 ring-brand-200">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-300)_45%,transparent),transparent)]"
          />
          <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            {message}
            <DonationReceipt />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Flow: donor → Donorfit (0%) → provider (fee covered) → organisation  */
/* ------------------------------------------------------------------ */

function DonationFlow() {
  const t = useT('common');
  const steps = [
    { key: 'donor', Icon: HandHeart },
    { key: 'donorfit', Icon: Percent },
    { key: 'provider', Icon: CreditCard },
    { key: 'org', Icon: Building2 },
  ] as const;

  return (
    <figure className="min-w-0 lg:self-center">
      <figcaption className="text-sm font-semibold text-brand-200">{t('fees.flow.label')}</figcaption>
      <ol className="mt-5">
        {steps.map(({ key, Icon }, i) => {
          const hero = key === 'donorfit' || key === 'org';
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
                      {key === 'org' ? t('fees.hundred') : t('fees.zero')}
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
  );
}

/* ------------------------------------------------------------------ */
/* Receipt: an example €100 donation                                   */
/* ------------------------------------------------------------------ */

function DonationReceipt() {
  const t = useT('common');
  const { eurCents } = useFormat();
  const amount = 100;
  const row = 'flex items-baseline justify-between gap-4 py-3.5';

  return (
    <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
      {/* stacked-paper edge behind the receipt */}
      <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-6 -z-10 rounded-[1.75rem] bg-white/70 ring-1 ring-brand-200" />
      <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_40px_80px_-40px_rgb(0_24_64/0.45)] ring-1 ring-navy-950/5 sm:p-8">
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
        </dl>

        <div className="mt-2 rounded-2xl bg-navy-950 p-4 text-white sm:p-5">
          <div className="text-xs font-semibold text-brand-200">{t('fees.receipt.receives')}</div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <span className="hv-display whitespace-nowrap text-2xl font-extrabold tabular-nums sm:text-3xl">{eurCents(amount)}</span>
            <span className="text-sm text-white/70">{t('fees.receipt.receivesNote')}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
