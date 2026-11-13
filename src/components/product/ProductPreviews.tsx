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
  type Status = 'active' | 'renewalDue' | 'lapsed';
  const rows: [string, 'individual' | 'family' | 'student' | 'organisational', Status, string | null][] = [
    ['Amina Khan', 'individual', 'active', '2026-03-12'],
    ['Daniel Weber', 'family', 'active', '2026-04-02'],
    ['Leila Haddad', 'student', 'renewalDue', '2026-11-18'],
    ['Community Trust e.V.', 'organisational', 'active', '2026-06-30'],
    ['Yusuf Ali', 'individual', 'lapsed', null],
  ];
  const stats: [Status, number][] = [
    ['active', 412],
    ['renewalDue', 37],
    ['lapsed', 12],
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
                <Pill tone={st === 'active' ? 'ok' : st === 'lapsed' ? 'muted' : 'wait'}>{k(`status.${st}`)}</Pill>
              </span>
              <span className="text-right tabular-nums text-neutral-500">{d ? short(d) : '—'}</span>
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

/* ---------------- Water Well: public campaign page ---------------- */
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
