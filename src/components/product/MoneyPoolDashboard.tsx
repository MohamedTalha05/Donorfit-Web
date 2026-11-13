import React, { useEffect, useRef, useState } from 'react';
import { CalendarClock, Target, UsersRound, Wallet, Info } from 'lucide-react';
import { useFormat, useI18n, useT } from '../../i18n/index.tsx';

/**
 * Illustrative MoneyPool campaign dashboard.
 * All figures are invented demonstration data and are labelled as such in the UI.
 * Visible text lives in products:sections.money-pool.dashboard.
 */
export const DEMO = {
  goal: 12000,
  raised: 8760,
  contributors: 143,
  deadline: '2026-12-15',
  daysLeft: 33,
  recent: [
    { name: 'Ali R.', amount: 50, method: 'card', ago: { n: 12, unit: 'min' }, note: 'parents' },
    { name: null, amount: 20, method: 'link', ago: { n: 48, unit: 'min' }, note: '' },
    { name: 'Sara & Omar', amount: 100, method: 'sepa', ago: { n: 2, unit: 'h' }, note: 'accepted' },
    { name: 'Fatima K.', amount: 25, method: 'card', ago: { n: 5, unit: 'h' }, note: '' },
  ] as { name: string | null; amount: number; method: 'card' | 'link' | 'sepa'; ago: { n: number; unit: 'min' | 'h' }; note: '' | 'parents' | 'accepted' }[],
};

export const DEMO_PCT = Math.round((DEMO.raised / DEMO.goal) * 100);

/** Locale-aware whole-number percentage ("73%" / "73 %"). */
export function usePercent() {
  const { locale } = useI18n();
  return (pct: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(pct / 100);
}

/** Numbered marker used to key dashboard regions to the legend beside it. */
export function Marker({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`hv-display inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-950 text-[11px] font-extrabold text-white ring-4 ring-white ${className}`}
    >
      {n}
    </span>
  );
}

/** Fills the progress bar once when it scrolls into view (instant with reduced motion). */
function useFillOnView<T extends Element>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

export default function MoneyPoolDashboard() {
  const [barRef, filled] = useFillOnView<HTMLDivElement>();
  const t = useT('products');
  const k = (key: string, vars?: Record<string, string | number>) => t(`sections.money-pool.dashboard.${key}`, vars);
  const { eur, int, date } = useFormat();
  const pct = usePercent();
  const stats = [
    { icon: Target, label: k('stats.goal'), value: eur(DEMO.goal) },
    { icon: Wallet, label: k('stats.total'), value: eur(DEMO.raised) },
    { icon: UsersRound, label: k('stats.contributors'), value: int(DEMO.contributors) },
    { icon: CalendarClock, label: k('stats.deadline'), value: date(DEMO.deadline, { day: 'numeric', month: 'short', year: 'numeric' }) },
  ];

  return (
    <figure
      className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_50px_100px_-50px_rgb(0_24_64/0.55)]"
      aria-label={k('label')}
    >
      {/* Demo notice */}
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-soft px-5 py-2.5 text-xs font-medium text-navy-800">
        <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {k('notice')}
      </div>

      <div className="p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Marker n={1} className="mt-1" />
            <div>
              <p className="text-xs text-neutral-500">{k('organiser')}</p>
              <h3 className="hv-display text-xl font-extrabold text-navy-950 sm:text-2xl">{k('campaign')}</h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            {k('open', { days: int(DEMO.daysLeft) })}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 flex items-center gap-3">
          <Marker n={2} />
          <span className="text-sm font-semibold text-navy-950">{k('keyFigures')}</span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white p-4">
              <dt className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Icon className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                {label}
              </dt>
              <dd className="hv-display mt-1 text-lg font-extrabold tabular-nums text-navy-950 sm:text-xl">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Progress */}
        <div className="mt-6" ref={barRef}>
          <div className="flex items-center gap-3">
            <Marker n={3} />
            <div className="flex flex-1 items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-navy-950">{k('progress')}</span>
              <span className="tabular-nums text-neutral-600">
                <strong className="text-navy-950">{pct(DEMO_PCT)}</strong> {k('ofAmount', { amount: eur(DEMO.goal) })}
              </span>
            </div>
          </div>
          <div
            className="mt-3 h-3.5 overflow-hidden rounded-full bg-brand-50"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={DEMO_PCT}
            aria-label={k('progressLabel')}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-[width] duration-[1400ms] ease-out motion-reduce:transition-none"
              style={{ width: filled ? `${DEMO_PCT}%` : '0%' }}
            />
          </div>
          <p className="mt-2 text-xs tabular-nums text-neutral-500">{k('stillNeeded', { amount: eur(DEMO.goal - DEMO.raised) })}</p>
        </div>

        {/* Recent contributions */}
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <Marker n={4} />
            <h4 className="text-sm font-semibold text-navy-950">{k('recentTitle')}</h4>
          </div>
          <ul className="mt-3 divide-y divide-neutral-100 rounded-2xl border border-neutral-200">
            {DEMO.recent.map((c) => {
              const name = c.name ?? k('anonymous');
              const when = k(c.ago.unit === 'min' ? 'minutesAgo' : 'hoursAgo', { n: c.ago.n });
              return (
                <li key={name + when} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white"
                    >
                      {c.name === null ? '?' : c.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy-950">{name}</p>
                      <p className="truncate text-xs text-neutral-500">
                        {k(`methods.${c.method}`)}, {when}
                        {c.note && <span className="hidden sm:inline"> · {k('quote', { text: k(`notes.${c.note}`) })}</span>}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-brand-800">{eur(c.amount)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </figure>
  );
}
