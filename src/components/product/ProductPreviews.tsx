import React from 'react';
import {
  Search,
  Download,
  Filter,
  CheckCircle2,
  CircleDot,
  Circle,
  Share2,
  QrCode,
  MessageCircle,
  CalendarDays,
  Users,
  Wallet,
  GraduationCap,
  Moon,
} from 'lucide-react';
import BrandLogo from '../BrandLogo.tsx';
import { BrowserFrame } from '../home/mockKit.tsx';
import { PRODUCT_PHOTOS } from './ProductKit.tsx';
import { useFormat, useI18n, useT, useTx } from '../../i18n/index.tsx';

const Pill = ({ tone, children }: { tone: 'ok' | 'wait' | 'muted' | 'warn'; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
      tone === 'ok'
        ? 'bg-brand-50 text-brand-800'
        : tone === 'wait'
          ? 'bg-soft text-navy-700 ring-1 ring-navy-950/10'
          : tone === 'warn'
            ? 'bg-navy-950 text-white'
            : 'bg-neutral-100 text-neutral-500'
    }`}
  >
    {children}
  </span>
);

const Shell = ({ url, label, children }: { url: string; label: string; children: React.ReactNode }) => (
  <figure aria-label={label}>
    <BrowserFrame url={url}>
      <div aria-hidden="true" className="select-none text-left">
        {children}
      </div>
    </BrowserFrame>
  </figure>
);

/** Translation helper scoped to products:previews.<slug>. */
function usePreviewT(slug: string) {
  const t = useT('products');
  return (key: string, vars?: Record<string, string | number>) => t(`previews.${slug}.${key}`, vars);
}

/* ---------------- Membership: members dashboard ---------------- */
export function MembershipPreview() {
  const k = usePreviewT('membership');
  const { int, date } = useFormat();
  const short = (iso: string) => date(iso, { day: '2-digit', month: 'short' });
  type Status = 'active' | 'cancelling' | 'cancelled';
  const rows: [string, 'individual' | 'family' | 'student' | 'organisational', Status, string | null][] = [
    ['Amina Khan', 'individual', 'active', '2026-12-01'],
    ['Daniel Weber', 'family', 'active', '2026-12-06'],
    ['Leila Haddad', 'student', 'cancelling', '2026-12-15'],
    ['Community Trust e.V.', 'organisational', 'active', '2027-03-01'],
    ['Yusuf Ali', 'individual', 'cancelled', null],
  ];
  const stats: [Status, number][] = [
    ['active', 412],
    ['cancelling', 9],
    ['cancelled', 23],
  ];
  return (
    <Shell url="app.donorfit.com/membership/members" label={k('label')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-lg font-bold text-navy-950">{k('title')}</div>
          <div className="flex gap-2 text-xs">
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-500">
              <Search className="h-3.5 w-3.5" /> {k('search')}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-700">
              <Filter className="h-3.5 w-3.5" /> {k('filter')}
            </span>
            <span className="hidden items-center gap-1.5 rounded-lg bg-navy-950 px-2.5 py-1.5 font-medium text-white sm:flex">
              <Download className="h-3.5 w-3.5" /> {k('export')}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(([l, n]) => (
            <div key={l} className="rounded-xl border border-neutral-200 p-3">
              <div className="text-[11px] text-neutral-500">{k(`stats.${l}`)}</div>
              <div className="hv-display text-xl font-extrabold tabular-nums text-navy-950">{int(n)}</div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">
            <span>{k('cols.member')}</span>
            <span>{k('cols.plan')}</span>
            <span>{k('cols.status')}</span>
            <span className="text-right">{k('cols.renews')}</span>
          </div>
          {rows.map(([n, plan, st, d]) => (
            <div key={n} className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="truncate font-medium text-navy-950">{n}</span>
              <span className="truncate text-neutral-600">{k(`plans.${plan}`)}</span>
              <span>
                <Pill tone={st === 'active' ? 'ok' : st === 'cancelled' ? 'muted' : 'wait'}>{k(`status.${st}`)}</Pill>
              </span>
              <span className="text-right tabular-nums text-neutral-500">{d ? short(d) : '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Membership: application approval queue ---------------- */
export function MembershipApprovalsPreview() {
  const k = usePreviewT('membership');
  const { eur, int, date } = useFormat();
  const short = (iso: string) => date(iso, { day: '2-digit', month: 'short' });
  const rows: { name: string; email: string; plan: 'individual' | 'family' | 'student'; amount: number; method: 'sepa' | 'cash'; at: string; done?: boolean }[] = [
    { name: 'Sara Demir', email: 'sara.demir@example.org', plan: 'family', amount: 18, method: 'sepa', at: '2026-11-16' },
    { name: 'Jonas Becker', email: 'j.becker@example.org', plan: 'student', amount: 5, method: 'cash', at: '2026-11-15' },
    { name: 'Amina Khan', email: 'amina.khan@example.org', plan: 'individual', amount: 10, method: 'sepa', at: '2026-11-14', done: true },
  ];
  return (
    <Shell url="app.donorfit.com/membership/subscriptions" label={k('approvals.label')}>
      <div className="grid gap-3 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-base font-bold text-navy-950 sm:text-lg">{k('approvals.title')}</div>
          <Pill tone="wait">{k('approvals.count', { count: int(3) })}</Pill>
        </div>
        {rows.map((r, i) => (
          <div key={r.name} className={`rounded-xl border p-3.5 ${i === 0 ? 'border-brand-300 bg-brand-50/40' : 'border-neutral-200'}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-navy-950">{r.name}</div>
                <div className="truncate text-[11px] text-neutral-500">{r.email}</div>
              </div>
              <Pill tone={r.done ? 'ok' : 'wait'}>{r.done ? k('approvals.approved') : k('approvals.pending')}</Pill>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
              <span>
                {k(`plans.${r.plan}`)} · {k('approvals.perMonth', { amount: eur(r.amount) })}
              </span>
              <span>{k(`approvals.${r.method}`)}</span>
              <span className="tabular-nums">
                {k('approvals.submitted')} {short(r.at)}
              </span>
            </div>
            {i === 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-lg bg-navy-950 px-3 py-1.5 text-[11px] font-semibold text-white">{k('approvals.approve')}</span>
                <span className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[11px] font-semibold text-neutral-600">{k('approvals.reject')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Membership: member profile with activity log ---------------- */
export function MembershipProfilePreview() {
  const k = usePreviewT('membership');
  const { eurCents, date } = useFormat();
  const long = (iso: string) => date(iso, { day: 'numeric', month: 'short', year: 'numeric' });
  const facts: [string, string][] = [
    [k('profile.plan'), k('plans.individual')],
    [k('profile.amount'), eurCents(10)],
    [k('profile.cycle'), k('profile.monthly')],
    [k('profile.next'), long('2026-12-01')],
  ];
  const log: [string, string | null, string][] = [
    [k('profile.paid'), k('profile.paidDesc', { amount: eurCents(10) }), '2026-11-01'],
    [k('profile.cycleChanged'), k('profile.cycleDesc'), '2026-10-12'],
    [k('profile.paid'), k('profile.paidDesc', { amount: eurCents(10) }), '2026-10-01'],
    [k('profile.registered'), null, '2026-09-14'],
  ];
  return (
    <Shell url="app.donorfit.com/membership/members" label={k('profile.label')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="hv-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-extrabold text-white">AK</span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-bold text-navy-950">Amina Khan</div>
            <div className="truncate text-[11px] text-neutral-500">
              #M-001 · {k('profile.since', { date: long('2026-09-14') })}
            </div>
          </div>
          <Pill tone="ok">{k('status.active')}</Pill>
        </div>
        <dl className="grid grid-cols-2 gap-2.5">
          {facts.map(([l, v]) => (
            <div key={l} className="rounded-xl border border-neutral-200 p-2.5">
              <dt className="text-[10px] text-neutral-500">{l}</dt>
              <dd className="mt-0.5 text-[13px] font-semibold tabular-nums text-navy-950">{v}</dd>
            </div>
          ))}
        </dl>
        <div>
          <div className="text-xs font-bold text-navy-950">{k('profile.log')}</div>
          <ol className="mt-2.5 space-y-0">
            {log.map(([title, desc, d], i) => (
              <li key={i} className="relative flex gap-3 pb-3 last:pb-0">
                {i < log.length - 1 && <span className="absolute left-[5px] top-3.5 h-full w-px bg-brand-200" />}
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${i === 0 ? 'bg-brand-500' : 'bg-brand-200'}`} />
                <div className="flex min-w-0 flex-1 flex-wrap justify-between gap-x-3 text-[11px]">
                  <span className="min-w-0">
                    <span className="font-semibold text-navy-950">{title}</span>
                    {desc && <span className="block text-neutral-500">{desc}</span>}
                  </span>
                  <span className="tabular-nums text-neutral-400">{long(d)}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Membership: subscriptions overview ---------------- */
export function MembershipSubscriptionsPreview() {
  const k = usePreviewT('membership');
  const { eur, int, date } = useFormat();
  const short = (iso: string) => date(iso, { day: '2-digit', month: 'short' });
  const stats: [string, string, string | null][] = [
    [k('subs.mrr'), eur(4870), null],
    [k('subs.active'), int(412), null],
    [k('subs.failed'), int(4), k('subs.action')],
    [k('subs.upcoming'), int(57), k('subs.due')],
  ];
  const rows: [string, string, string, boolean][] = [
    ['Daniel Weber', 'GoCardless', '2026-12-06', false],
    ['Yasmin Okafor', 'Stripe', '2026-11-19', true],
    ['Community Trust e.V.', 'PayPal', '2027-03-01', false],
  ];
  return (
    <Shell url="app.donorfit.com/membership/subscriptions" label={k('subs.label')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="text-base font-bold text-navy-950 sm:text-lg">{k('subs.title')}</div>
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map(([l, v, note], i) => (
            <div key={l} className={`rounded-xl border p-3 ${i === 2 ? 'border-navy-950/15 bg-soft' : 'border-neutral-200'}`}>
              <div className="text-[10px] text-neutral-500">{l}</div>
              <div className="hv-display text-lg font-extrabold tabular-nums text-navy-950">{v}</div>
              {note && <div className="text-[10px] text-neutral-500">{note}</div>}
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[1.4fr_1fr_0.9fr] bg-soft px-3.5 py-2 text-[11px] font-semibold text-neutral-500">
            <span>{k('subs.colMember')}</span>
            <span>{k('subs.colGateway')}</span>
            <span className="text-right">{k('subs.colNext')}</span>
          </div>
          {rows.map(([n, g, d, failed]) => (
            <div key={n} className="grid grid-cols-[1.4fr_1fr_0.9fr] items-center border-t border-neutral-100 px-3.5 py-2.5 text-xs">
              <span className="min-w-0">
                <span className="block truncate font-medium text-navy-950">{n}</span>
                <span className="mt-0.5 inline-block">
                  <Pill tone={failed ? 'warn' : 'ok'}>{failed ? k('subs.failedPill') : k('subs.activePill')}</Pill>
                </span>
              </span>
              <span className="truncate text-neutral-600">{g}</span>
              <span className="text-right tabular-nums text-neutral-500">{short(d)}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Sponsorship: sponsor ↔ beneficiary ledger ---------------- */
export function SponsorshipPreview() {
  const k = usePreviewT('sponsorship');
  const { eur, int } = useFormat();
  const rows = [
    { sponsor: 'Marc L.', ben: k('beneficiary', { name: 'Yusuf', age: int(11), grade: int(5) }), amount: 30, months: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
    { sponsor: 'Helena W.', ben: k('beneficiary', { name: 'Amara', age: int(9), grade: int(3) }), amount: 25, months: [1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0] },
    { sponsor: k('coSponsors', { count: int(3) }), ben: k('library'), amount: 60, months: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
  ];
  // month state → legend label: 0 upcoming, 1 paid, 2 retried and paid
  const stateLabel = [k('legend.upcoming'), k('legend.paid'), k('legend.retried')];
  return (
    <Shell url="app.donorfit.com/sponsorship" label={k('label')}>
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-navy-950">{k('title')}</div>
          <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-700">
            <CalendarDays className="h-3.5 w-3.5" /> {k('period')}
          </span>
        </div>
        {rows.map((r) => (
          <div key={r.sponsor} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-navy-950 px-2.5 py-1 text-xs font-semibold text-white">{r.sponsor}</span>
              <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-400" />
              <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">{r.ben}</span>
              <span className="ml-auto text-xs font-bold tabular-nums text-navy-950">{k('perMonth', { amount: eur(r.amount) })}</span>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-1">
              {r.months.map((m, i) => (
                <span
                  key={i}
                  title={stateLabel[m]}
                  className={`h-2 rounded-full ${m === 1 ? 'bg-brand-600' : m === 2 ? 'bg-navy-950' : 'bg-neutral-200'}`}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-neutral-400">
              <span>{k('monthStart')}</span>
              <span>{k('monthEnd')}</span>
            </div>
          </div>
        ))}
        <div className="flex gap-4 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-600" /> {k('legend.paid')}</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-950" /> {k('legend.retried')}</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-neutral-200" /> {k('legend.upcoming')}</span>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Water: public campaign page ---------------- */
export function WaterWellPreview() {
  const k = usePreviewT('water-well');
  const tx = useTx('products');
  const { eur } = useFormat();
  const photo = PRODUCT_PHOTOS['water-well'];
  const names = tx<string[]>('previews.water-well.stages');
  const states: ('done' | 'now' | 'todo')[] = ['done', 'done', 'now', 'todo'];
  const stages = names.map((l, i) => [l, states[i], k(`status.${states[i]}`)] as const);
  return (
    <Shell url="give.your-charity.org/wells/village-well" label={k('label')}>
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative h-48 md:h-auto">
          <img src={photo.src} alt="" width={800} height={533} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: photo.pos }} />
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <div className="text-[11px] font-semibold text-brand-700">{k('eyebrow')}</div>
            <div className="hv-display mt-1 text-xl font-extrabold text-navy-950">{k('title')}</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">{k('description')}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="hv-display text-2xl font-extrabold tabular-nums text-navy-950">{eur(3420)}</span>
              <span className="text-xs tabular-nums text-neutral-500">{k('target', { amount: eur(4500) })}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand-50">
              <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
            </div>
          </div>
          <ol className="space-y-2.5">
            {stages.map(([l, s, note]) => (
              <li key={l} className="flex items-center gap-2.5 text-xs">
                {s === 'done' ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                ) : s === 'now' ? (
                  <CircleDot className="h-4 w-4 text-navy-950" />
                ) : (
                  <Circle className="h-4 w-4 text-neutral-300" />
                )}
                <span className={`flex-1 ${s === 'todo' ? 'text-neutral-400' : 'font-medium text-navy-950'}`}>{l}</span>
                <span className="text-[11px] text-neutral-500">{note}</span>
              </li>
            ))}
          </ol>
          <span className="hv-btn hv-btn-primary w-full !rounded-xl !py-3 text-sm">{k('donate')}</span>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Qurbani: contributions management ---------------- */
export function QurbaniPreview() {
  const k = usePreviewT('qurbani');
  const { int } = useFormat();
  const options = [
    [k('options.sheep'), 184],
    [k('options.cow'), 96],
    [k('options.camel'), 21],
  ] as const;
  const rows = [
    ['Q-1043', 'Fatima R.', k('options.sheep'), 2, true],
    ['Q-1044', 'Omar S.', k('options.cow'), 1, true],
    ['Q-1045', 'Aisha B.', k('options.sheep'), 1, false],
    ['Q-1046', 'Ibrahim K.', k('options.camel'), 1, true],
  ] as const;
  return (
    <Shell url="app.donorfit.com/qurbani" label={k('label')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <Moon className="h-5 w-5 text-brand-600" /> {k('title')}
          </div>
          <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">{k('season')}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {options.map(([o, n]) => (
            <div key={o} className="rounded-xl border border-neutral-200 p-3">
              <div className="truncate text-[11px] text-neutral-500">{o}</div>
              <div className="hv-display text-xl font-extrabold tabular-nums text-navy-950">{int(n)}</div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[0.8fr_1.1fr_1.2fr_0.4fr_0.8fr] bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">
            <span>{k('cols.ref')}</span>
            <span>{k('cols.donor')}</span>
            <span>{k('cols.option')}</span>
            <span className="text-right">{k('cols.qty')}</span>
            <span className="text-right">{k('cols.payment')}</span>
          </div>
          {rows.map(([ref, d, o, q, paid]) => (
            <div key={ref} className="grid grid-cols-[0.8fr_1.1fr_1.2fr_0.4fr_0.8fr] items-center border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="tabular-nums text-neutral-500">{ref}</span>
              <span className="truncate font-medium text-navy-950">{d}</span>
              <span className="truncate text-neutral-600">{o}</span>
              <span className="text-right tabular-nums">{int(q)}</span>
              <span className="text-right">
                <Pill tone={paid ? 'ok' : 'wait'}>{k(paid ? 'status.paid' : 'status.pending')}</Pill>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- School: school dashboard ---------------- */
export function SchoolPreview() {
  const k = usePreviewT('school-management');
  const tx = useTx('products');
  const { int } = useFormat();
  const days = [92, 95, 90, 96, 93];
  const dayNames = tx<string[]>('previews.school-management.days');
  const nav: [typeof Users, string, boolean][] = [
    [GraduationCap, k('nav.overview'), true],
    [Users, k('nav.students'), false],
    [CalendarDays, k('nav.attendance'), false],
    [Wallet, k('nav.fees'), false],
  ];
  const fees: ['paid' | 'pending' | 'overdue', number][] = [
    ['paid', 181],
    ['pending', 50],
    ['overdue', 20],
  ];
  const students: [string, string, boolean, boolean][] = [
    ['Sara M.', '4B', true, true],
    ['Ahmed N.', '4B', false, false],
    ['Grace O.', '5A', true, true],
  ];
  return (
    <Shell url="app.donorfit.com/school/overview" label={k('label')}>
      <div className="flex">
        <aside className="hidden w-44 shrink-0 space-y-1 border-r border-neutral-200 bg-soft p-4 md:block">
          <div className="mb-4 flex items-center gap-2">
            <BrandLogo variant="icon" className="h-5" alt="" />
            <span className="text-sm font-bold text-navy-950">{k('app')}</span>
          </div>
          {nav.map(([Icon, l, a]) => (
            <span key={l} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${a ? 'bg-white text-brand-800 ring-1 ring-neutral-200' : 'text-neutral-600'}`}>
              <Icon className="h-3.5 w-3.5" /> {l}
            </span>
          ))}
        </aside>
        <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-6">
          <div className="text-lg font-bold text-navy-950">{k('title', { term: int(2) })}</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="text-xs font-semibold text-navy-950">{k('attendance')}</div>
              <div className="mt-3 flex h-20 items-end gap-2">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <span className={`w-full rounded-t ${i === 4 ? 'bg-brand-600' : 'bg-brand-100'}`} style={{ height: `${(d - 80) * 4}px` }} />
                    <span className="text-[10px] text-neutral-400">{dayNames[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="text-xs font-semibold text-navy-950">{k('fees')}</div>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full">
                <span className="bg-brand-600" style={{ width: '72%' }} />
                <span className="bg-brand-200" style={{ width: '20%' }} />
                <span className="bg-navy-950" style={{ width: '8%' }} />
              </div>
              <dl className="mt-3 grid grid-cols-3 text-[11px]">
                {fees.map(([l, n]) => (
                  <div key={l}>
                    <dt className="text-neutral-500">{k(`status.${l}`)}</dt>
                    <dd className="font-bold tabular-nums text-navy-950">{int(n)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            {students.map(([n, c, sponsored, paid]) => (
              <div key={n} className="grid grid-cols-[1.3fr_0.5fr_1fr_0.8fr] items-center border-b border-neutral-100 px-4 py-2.5 text-xs last:border-b-0">
                <span className="font-medium text-navy-950">{n}</span>
                <span className="text-neutral-500">{c}</span>
                <span className="text-neutral-600">{sponsored ? k('sponsored') : '—'}</span>
                <span className="text-right">
                  <Pill tone={paid ? 'ok' : 'wait'}>{k(paid ? 'status.paid' : 'status.pending')}</Pill>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Money Pool: public pool page ---------------- */
export function MoneyPoolPreview() {
  const k = usePreviewT('money-pool');
  const { eur, int } = useFormat();
  const { locale } = useI18n();
  const pct = 73;
  const r = 52;
  const c = 2 * Math.PI * r;
  const contributions: [string, number, '' | 'parents' | 'accepted'][] = [
    ['Ali R.', 50, 'parents'],
    [k('anonymous'), 20, ''],
    ['Sara & Omar', 100, 'accepted'],
  ];
  const share: [typeof Share2, string][] = [
    [MessageCircle, k('share.whatsapp')],
    [Share2, k('share.link')],
    [QrCode, k('share.qr')],
  ];
  return (
    <Shell url="give.your-charity.org/pool/masjid-roof" label={k('label')}>
      <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-brand-50)" strokeWidth="12" />
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-brand-600)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="hv-display text-2xl font-extrabold tabular-nums text-navy-950">
                {new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(pct / 100)}
              </span>
              <span className="text-[10px] text-neutral-500">{k('ofTarget')}</span>
            </div>
          </div>
          <div className="mt-3 text-center text-xs">
            <div className="font-bold tabular-nums text-navy-950">{k('raised', { raised: eur(8760), target: eur(12000) })}</div>
            <div className="text-neutral-500">{k('meta', { count: int(143), days: int(12) })}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="hv-display text-xl font-extrabold text-navy-950">{k('title')}</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">{k('organiser')}</p>
          </div>
          <ul className="space-y-2">
            {contributions.map(([n, a, msg]) => (
              <li key={n} className="flex items-start justify-between gap-3 rounded-xl bg-soft px-3.5 py-2.5 text-xs">
                <div>
                  <div className="font-semibold text-navy-950">{n}</div>
                  {msg && <div className="text-neutral-500">{k('quote', { text: k(`messages.${msg}`) })}</div>}
                </div>
                <span className="font-bold tabular-nums text-brand-800">{eur(a)}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 text-xs">
            {share.map(([Icon, l]) => (
              <span key={l} className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-700">
                <Icon className="h-3.5 w-3.5" /> {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ================================================================== */
/* Donor Portal previews. Labels follow the real portal screens        */
/* (app.donorfit.com/donorlogin); all figures are example data.        */
/* ================================================================== */

const PORTAL_URL = 'app.donorfit.com';

function usePortalT() {
  const t = useT('portal');
  return (key: string, vars?: Record<string, string | number>) => t(`previews.${key}`, vars);
}

type PortalCause = 'water' | 'general' | 'orphans';

/** Overview: welcome, total contributions, next billing run, recent donations. */
export function DonorOverviewPreview() {
  const k = usePortalT();
  const { eur, eurCents, date } = useFormat();
  const short = (iso: string) => date(iso, { day: '2-digit', month: 'short' });
  const rows: [string, PortalCause, string, number][] = [
    ['2026-11-01', 'water', 'SEPA', 30],
    ['2026-10-14', 'general', 'PayPal', 50],
    ['2026-10-01', 'water', 'SEPA', 30],
  ];
  return (
    <Shell url={PORTAL_URL} label={k('label.overview')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="text-base font-bold text-navy-950 sm:text-lg">{k('welcome', { name: 'Amina' })}</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-navy-950 p-3.5 text-white">
            <div className="text-[11px] text-brand-200">{k('totalContributions')}</div>
            <div className="hv-display mt-1 text-xl font-extrabold tabular-nums">{eur(1240)}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3.5">
            <div className="text-[11px] text-neutral-500">{k('nextBilling')}</div>
            <div className="hv-display mt-1 text-xl font-extrabold tabular-nums text-navy-950">
              {date('2026-12-01', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">{k('feed')}</div>
          {rows.map(([d, cause, method, amount]) => (
            <div key={d + cause} className="grid grid-cols-[0.7fr_1.3fr_0.8fr_0.8fr] items-center gap-2 border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="tabular-nums text-neutral-500">{short(d)}</span>
              <span className="truncate font-medium text-navy-950">{k(`causes.${cause}`)}</span>
              <span className="truncate text-neutral-500">{method}</span>
              <span className="text-right font-semibold tabular-nums text-navy-950">{eurCents(amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/** Donation list with a receipt download per donation. */
export function DonorLedgerPreview() {
  const k = usePortalT();
  const { eurCents, date } = useFormat();
  const short = (iso: string) => date(iso, { day: '2-digit', month: 'short', year: 'numeric' });
  const rows: [string, PortalCause, number][] = [
    ['2026-11-01', 'water', 30],
    ['2026-10-14', 'general', 50],
    ['2026-09-20', 'orphans', 25],
    ['2026-09-01', 'water', 30],
  ];
  return (
    <Shell url={PORTAL_URL} label={k('label.ledger')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-base font-bold text-navy-950 sm:text-lg">{k('ledgerTitle')}</div>
          <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5" /> {k('colCause')}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[1fr_1.2fr_0.8fr_auto] gap-2 bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">
            <span>{k('colDate')}</span>
            <span>{k('colCause')}</span>
            <span className="text-right">{k('colAmount')}</span>
            <span className="w-7" />
          </div>
          {rows.map(([d, cause, amount]) => (
            <div key={d + cause} className="grid grid-cols-[1fr_1.2fr_0.8fr_auto] items-center gap-2 border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="tabular-nums text-neutral-500">{short(d)}</span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-navy-950">{k(`causes.${cause}`)}</span>
                <Pill tone="ok">{k('paid')}</Pill>
              </span>
              <span className="text-right font-semibold tabular-nums text-navy-950">{eurCents(amount)}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100" title={k('download')}>
                <Download className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/** One active recurring donation with modify / history / cancel. */
export function DonorSubscriptionPreview() {
  const k = usePortalT();
  const { eurCents, date } = useFormat();
  return (
    <Shell url={PORTAL_URL} label={k('label.subs')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="text-base font-bold text-navy-950 sm:text-lg">{k('subsTitle')}</div>
        <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-navy-950">{k('causes.water')}</div>
              <div className="mt-0.5 text-xs text-neutral-600">
                <span className="hv-display text-lg font-extrabold tabular-nums text-navy-950">{eurCents(30)}</span> {k('perMonth')}
              </div>
            </div>
            <Pill tone="ok">{k('active')}</Pill>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-white p-2.5 ring-1 ring-neutral-200">
              <dt className="text-[10px] text-neutral-500">{k('nextRenewal')}</dt>
              <dd className="font-semibold tabular-nums text-navy-950">{date('2026-12-01', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
            </div>
            <div className="rounded-lg bg-white p-2.5 ring-1 ring-neutral-200">
              <dt className="text-[10px] text-neutral-500">{k('paidVia')}</dt>
              <dd className="font-semibold text-navy-950">SEPA</dd>
            </div>
          </dl>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg bg-navy-950 px-3 py-1.5 text-[11px] font-semibold text-white">{k('modify')}</span>
            <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-navy-950">{k('history')}</span>
            <span className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-neutral-500">{k('cancel')}</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/** Personal details + annual donation certificates by year. */
export function DonorProfilePreview() {
  const k = usePortalT();
  const { date } = useFormat();
  const years: [number, boolean][] = [
    [2025, true],
    [2026, false],
  ];
  return (
    <Shell url={PORTAL_URL} label={k('label.profile')}>
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="text-base font-bold text-navy-950 sm:text-lg">{k('profileTitle')}</div>
        <div className="rounded-xl border border-neutral-200 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-navy-950">{k('personal')}</span>
            <span className="text-[11px] font-semibold text-brand-700">{k('edit')}</span>
          </div>
          <div className="mt-2 grid gap-1 text-xs text-neutral-600">
            <span className="font-medium text-navy-950">Amina Khan</span>
            <span>Lindenstraße 12, 50674 Köln</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">{k('certificates')}</div>
          {years.map(([y, ready]) => (
            <div key={y} className="flex items-center justify-between gap-3 border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="font-semibold tabular-nums text-navy-950">{y}</span>
              {ready ? (
                <span className="flex items-center gap-2">
                  <Pill tone="ok">{k('certReady')}</Pill>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </span>
              ) : (
                <Pill tone="muted">{k('certFrom', { date: date(`${y + 1}-01-15`, { day: 'numeric', month: 'short', year: 'numeric' }) })}</Pill>
              )}
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
