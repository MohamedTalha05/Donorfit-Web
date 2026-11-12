import React from 'react';
import { RefreshCw, PauseCircle, CheckCircle2, CalendarClock, UserRound } from 'lucide-react';
import { SampleBadge } from './mockKit.tsx';
import { useT, useTx, useFormat } from '../../i18n/index.tsx';

type Status = 'active' | 'retry' | 'paused';

/** Plan labels come from home:recurringPreview.plans (same order). `next` is a local date (month is 0-based). */
const PLANS: { name: string; method: string; amount: number; next: [number, number, number] | null; status: Status }[] = [
  { name: 'Yusuf A.', method: 'SEPA', amount: 30, next: [2026, 11, 1], status: 'active' },
  { name: 'Hannah B.', method: 'card', amount: 20, next: [2026, 11, 3], status: 'retry' },
  { name: 'Omar S.', method: 'SEPA', amount: 45, next: [2026, 11, 5], status: 'active' },
  { name: 'Clara V.', method: 'SEPA', amount: 120, next: null, status: 'paused' },
];

const NEXT_RUN = new Date(2026, 11, 1);

const STATUS_STYLE: Record<Status, { cls: string; Icon: typeof CheckCircle2 }> = {
  active: { cls: 'bg-brand-100 text-brand-800 ring-brand-200', Icon: CheckCircle2 },
  retry: { cls: 'bg-neutral-100 text-neutral-700 ring-neutral-200', Icon: RefreshCw },
  paused: { cls: 'bg-white text-neutral-500 ring-neutral-200', Icon: PauseCircle },
};

export default function RecurringPreview() {
  const t = useT('home');
  const tx = useTx('home');
  const { eur, date } = useFormat();
  const planLabels = tx<string[]>('recurringPreview.plans');
  const actions = tx<string[]>('recurringPreview.selfServiceActions');
  return (
    <figure
      className="relative"
      aria-label={t('recurringPreview.figureLabel')}
    >
      <div aria-hidden="true" className="select-none overflow-hidden rounded-3xl border border-neutral-200/90 bg-white text-left shadow-[0_40px_80px_-36px_rgb(23_23_23/0.28)]">
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <div className="text-sm font-bold text-neutral-900">{t('recurringPreview.title')}</div>
            <div className="text-[11px] text-neutral-500">
              {t('recurringPreview.nextRun', { date: date(NEXT_RUN, { day: 'numeric', month: 'long' }) })}
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-2.5 py-1.5 text-[11px] font-medium text-white">
            <CalendarClock className="h-3.5 w-3.5" /> {t('recurringPreview.schedule')}
          </span>
        </div>
        <div className="divide-y divide-neutral-100 pb-8">
          {PLANS.map((p, i) => {
            const { cls, Icon } = STATUS_STYLE[p.status];
            return (
              <div key={p.name} className="flex items-center gap-3 px-5 py-3.5 text-xs">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600">
                  {p.name.split(' ').map((s) => s[0]).join('')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-neutral-900">{p.name}</div>
                  <div className="truncate text-[11px] text-neutral-500">
                    {planLabels[i]} · {p.method === 'card' ? t('mock.card') : p.method}
                  </div>
                </div>
                <span className={`hidden items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 sm:inline-flex ${cls}`}>
                  <Icon className="h-3 w-3" /> {t(`recurringPreview.status.${p.status}`)}
                </span>
                <div className="w-16 shrink-0 text-right">
                  <div className="font-semibold tabular-nums text-neutral-900">{eur(p.amount)}</div>
                  <div className="text-[11px] text-neutral-400">
                    {p.next ? date(new Date(p.next[0], p.next[1], p.next[2]), { day: 'numeric', month: 'short' }) : '—'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-service card */}
      <div aria-hidden="true" className="relative -mt-6 ml-auto mr-4 w-64 select-none rounded-2xl border border-neutral-200/90 bg-white/95 p-4 text-left shadow-xl backdrop-blur sm:mr-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <UserRound className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs font-semibold text-neutral-900">{t('recurringPreview.selfServiceTitle')}</div>
            <div className="text-[11px] text-neutral-500">{t('recurringPreview.selfServiceSub')}</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-medium">
          {actions.map((a) => (
            <span key={a} className="rounded-lg border border-neutral-200 py-1.5 text-center text-neutral-700">
              {a}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 flex justify-center">
        <SampleBadge />
      </figcaption>
    </figure>
  );
}
