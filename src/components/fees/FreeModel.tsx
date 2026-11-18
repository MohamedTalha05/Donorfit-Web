import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Building2, Check, HandHeart, ShieldCheck } from 'lucide-react';
import { useFormat, useT, useTx } from '../../i18n/index.tsx';

/**
 * Pricing page: how the free model works (money flow + how Donorfit is funded) and a fee calculator
 * (amount raised → €0 platform fee, €0 transaction fees, 100% kept; no processing-cost estimate).
 * Facts (client, 2026-11-18): 0% platform fee, Donorfit absorbs all gateway processing charges, organisations
 * receive 100% of the intended donation. Donorfit is funded by optional paid add-ons and exclusive features;
 * there is no donor tip. Text: company:pricing.model and company:pricing.calc.
 */

/** True once the element has entered the viewport (never resets). */
function useEnteredView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, entered };
}

/* ------------------------------------------------------------------ */
/* How the free model works                                            */
/* ------------------------------------------------------------------ */

export function FreeModel({ id }: { id: string }) {
  const t = useT('company');
  const tx = useTx('company');
  const { eur } = useFormat();
  const steps = tx<{ title: string; text: string }[]>('pricing.model.steps');
  const chips = tx<string[]>('pricing.model.chips');
  const { ref, entered } = useEnteredView<HTMLOListElement>();
  const icons = [HandHeart, ShieldCheck, Building2];
  const amount = eur(50);

  return (
    <section aria-labelledby={id} className="home-v2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id={id} className="text-3xl font-extrabold leading-tight text-navy-950 [text-wrap:balance] sm:text-4xl">
          {t('pricing.model.title')}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-neutral-600">{t('pricing.model.intro')}</p>
      </div>

      {/* Money flow */}
      <ol ref={ref} className="relative mt-12 grid gap-5 lg:grid-cols-3 lg:gap-8">
        {/* connector line that draws in (desktop) */}
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-11 hidden h-0.5 overflow-hidden rounded-full bg-brand-100 lg:block">
          <span
            className="block h-full origin-left bg-gradient-to-r from-brand-400 to-brand-600 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none"
            style={{ transform: `scaleX(${entered ? 1 : 0})` }}
          />
        </span>
        {steps.map((s, i) => {
          const Icon = icons[i] ?? Check;
          const highlight = i === 1;
          return (
            <li
              key={s.title}
              className={`relative flex flex-col items-center rounded-[1.75rem] p-7 text-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                highlight ? 'bg-navy-950 text-white shadow-[0_30px_60px_-30px_rgb(0_24_64/0.7)]' : 'bg-white ring-1 ring-neutral-200'
              } ${entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              <span
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${
                  highlight ? 'bg-brand-400 text-navy-950 shadow-[0_0_36px_-6px_rgb(0_160_160/0.9)]' : 'bg-brand-50 text-brand-700 ring-4 ring-white'
                }`}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className={`mt-5 text-xl font-bold leading-snug ${highlight ? 'text-white' : 'text-navy-950'}`}>{s.title.replace('{{amount}}', amount)}</h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${highlight ? 'text-white/75' : 'text-neutral-600'}`}>{s.text}</p>
              {i < steps.length - 1 && (
                <ArrowRight aria-hidden="true" className="mt-5 h-5 w-5 rotate-90 text-brand-500 lg:hidden" />
              )}
            </li>
          );
        })}
      </ol>

      {/* How Donorfit is funded */}
      <div className="mt-8 grid gap-6 rounded-[1.75rem] bg-aqua p-7 ring-1 ring-brand-200 sm:p-9 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
        <div>
          <h3 className="text-xl font-bold text-navy-950 sm:text-2xl">{t('pricing.model.fundingTitle')}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 sm:text-base">{t('pricing.model.fundingText')}</p>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {chips.map((c) => (
            <li key={c} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy-950 ring-1 ring-brand-200">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fee calculator (client-side)                                        */
/* ------------------------------------------------------------------ */

/** Smoothly tweens a displayed number towards `target` (instant with reduced motion). */
function useTween(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      from.current = target;
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 450);
      const v = start + (target - start) * (1 - Math.pow(1 - p, 3));
      setValue(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function FeeCalculator({ id }: { id: string }) {
  const t = useT('company');
  const { eur, eurCents } = useFormat();
  const amountId = useId();
  // The input keeps the typed text (so the field can be cleared); the number is parsed from it.
  const [amountText, setAmountText] = useState('25000');
  const amount = parseFloat(amountText);

  const safeAmount = clamp(Number.isFinite(amount) ? amount : 0, 0, 10_000_000);

  const shownTotal = useTween(safeAmount);

  const input =
    'w-full rounded-xl border border-neutral-300 bg-white py-3 pl-9 pr-4 text-lg font-bold tabular-nums text-navy-950 shadow-xs focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100';

  return (
    <section aria-labelledby={id} className="home-v2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2.25rem] bg-white shadow-[0_40px_90px_-50px_rgb(0_24_64/0.5)] ring-1 ring-neutral-200">
        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          {/* Inputs */}
          <div className="p-7 sm:p-10">
            <h2 id={id} className="text-3xl font-extrabold leading-tight text-navy-950 [text-wrap:balance] sm:text-4xl">
              {t('pricing.calc.title')}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600 sm:text-base">{t('pricing.calc.intro')}</p>

            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor={amountId} className="text-sm font-semibold text-navy-950">
                  {t('pricing.calc.amountLabel')}
                </label>
                <div className="relative mt-2">
                  <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-neutral-400">
                    €
                  </span>
                  <input
                    id={amountId}
                    name="fundraising-amount"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={100}
                    autoComplete="off"
                    value={amountText}
                    onChange={(e) => setAmountText(e.target.value)}
                    className={input}
                  />
                </div>
                <input
                  type="range"
                  aria-label={t('pricing.calc.amountLabel')}
                  min={0}
                  max={250000}
                  step={500}
                  value={clamp(safeAmount, 0, 250000)}
                  onChange={(e) => setAmountText(e.target.value)}
                  className="mt-4 w-full accent-brand-600"
                />
              </div>

            </div>
          </div>

          {/* Results */}
          <div className="relative isolate bg-navy-950 p-7 text-white sm:p-10">
            <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
            <p className="sr-only" aria-live="polite">
              {t('pricing.calc.total')}: {eur(safeAmount)}. {t('pricing.calc.keep')}: {eur(safeAmount)}.
            </p>
            <dl className="divide-y divide-white/10">
              <div className="flex items-baseline justify-between gap-4 pb-4">
                <dt className="text-sm text-white/70">{t('pricing.calc.total')}</dt>
                <dd className="hv-display whitespace-nowrap text-2xl font-extrabold tabular-nums">{eur(Math.round(shownTotal))}</dd>
              </div>
              {(['platform', 'transaction'] as const).map((k) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="flex items-center gap-2 text-sm text-white/70">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400 text-navy-950">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t(`pricing.calc.${k}`)}
                  </dt>
                  <dd className="whitespace-nowrap text-xl font-bold tabular-nums text-brand-300">{eurCents(0)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-2xl bg-brand-400 p-5 text-navy-950">
              <div className="text-sm font-semibold">{t('pricing.calc.keep')}</div>
              <div className="hv-display mt-1 whitespace-nowrap text-4xl font-extrabold tabular-nums sm:text-5xl">{eur(Math.round(shownTotal))}</div>
              <div className="mt-1 text-sm font-semibold text-navy-950/75">{t('pricing.calc.keepNote')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
