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
import { BrowserFrame, eur, int } from '../home/mockKit.tsx';
import { PRODUCT_PHOTOS } from './ProductKit.tsx';

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

/* ---------------- Membership: members dashboard ---------------- */
export function MembershipPreview() {
  const rows = [
    ['Amina Khan', 'Individual', 'Active', '12 Mar'],
    ['Daniel Weber', 'Family', 'Active', '02 Apr'],
    ['Leila Haddad', 'Student', 'Renewal due', '18 Nov'],
    ['Community Trust e.V.', 'Organisational', 'Active', '30 Jun'],
    ['Yusuf Ali', 'Individual', 'Lapsed', '—'],
  ] as const;
  return (
    <Shell url="app.donorfit.com/membership/members" label="Membership dashboard preview listing members with plan, status and renewal date">
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-lg font-bold text-navy-950">Members</div>
          <div className="flex gap-2 text-xs">
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-500">
              <Search className="h-3.5 w-3.5" /> Search members…
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-700">
              <Filter className="h-3.5 w-3.5" /> Plan
            </span>
            <span className="hidden items-center gap-1.5 rounded-lg bg-navy-950 px-2.5 py-1.5 font-medium text-white sm:flex">
              <Download className="h-3.5 w-3.5" /> Assembly list
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ['Active', 412],
            ['Renewal due', 37],
            ['Lapsed', 12],
          ].map(([l, n]) => (
            <div key={l as string} className="rounded-xl border border-neutral-200 p-3">
              <div className="text-[11px] text-neutral-500">{l}</div>
              <div className="hv-display text-xl font-extrabold tabular-nums text-navy-950">{int(n as number)}</div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] bg-soft px-4 py-2 text-[11px] font-semibold text-neutral-500">
            <span>Member</span>
            <span>Plan</span>
            <span>Status</span>
            <span className="text-right">Renews</span>
          </div>
          {rows.map(([n, plan, st, d]) => (
            <div key={n} className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="truncate font-medium text-navy-950">{n}</span>
              <span className="truncate text-neutral-600">{plan}</span>
              <span>
                <Pill tone={st === 'Active' ? 'ok' : st === 'Lapsed' ? 'muted' : 'wait'}>{st}</Pill>
              </span>
              <span className="text-right tabular-nums text-neutral-500">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Sponsorship: sponsor ↔ beneficiary ledger ---------------- */
export function SponsorshipPreview() {
  const rows = [
    { sponsor: 'Marc L.', ben: 'Yusuf, 11 · Grade 5', amount: 30, months: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
    { sponsor: 'Helena W.', ben: 'Amara, 9 · Grade 3', amount: 25, months: [1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0] },
    { sponsor: 'Co-sponsors (3)', ben: 'Village school library', amount: 60, months: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
  ];
  return (
    <Shell url="app.donorfit.com/sponsorship" label="Sponsorship dashboard preview linking sponsors to beneficiaries with a twelve-month contribution record">
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-navy-950">Sponsorships</div>
          <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-700">
            <CalendarDays className="h-3.5 w-3.5" /> School year
          </span>
        </div>
        {rows.map((r) => (
          <div key={r.sponsor} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-navy-950 px-2.5 py-1 text-xs font-semibold text-white">{r.sponsor}</span>
              <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-400" />
              <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">{r.ben}</span>
              <span className="ml-auto text-xs font-bold tabular-nums text-navy-950">{eur(r.amount)} / month</span>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-1">
              {r.months.map((m, i) => (
                <span
                  key={i}
                  title={['Paid', 'Paid', 'Upcoming'][m]}
                  className={`h-2 rounded-full ${m === 1 ? 'bg-brand-600' : m === 2 ? 'bg-navy-950' : 'bg-neutral-200'}`}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-neutral-400">
              <span>Sep</span>
              <span>Aug</span>
            </div>
          </div>
        ))}
        <div className="flex gap-4 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-600" /> Paid</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-950" /> Retried and paid</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-neutral-200" /> Upcoming</span>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Water Well: public campaign page ---------------- */
export function WaterWellPreview() {
  const photo = PRODUCT_PHOTOS['water-well'];
  const stages: [string, 'done' | 'now' | 'todo', string][] = [
    ['Site survey', 'done', 'Completed'],
    ['Drilling', 'done', 'Completed'],
    ['Pump installation', 'now', 'In progress'],
    ['Handover to village', 'todo', 'Planned'],
  ];
  return (
    <Shell url="give.your-charity.org/wells/village-well" label="Water well campaign page preview with project photo, fundraising target, progress and build stages">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative h-48 md:h-auto">
          <img src={photo.src} alt="" width={800} height={533} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: photo.pos }} />
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <div className="text-[11px] font-semibold text-brand-700">Water well project</div>
            <div className="hv-display mt-1 text-xl font-extrabold text-navy-950">Village water well</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">A hand-pump well serving the village school and surrounding homes.</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="hv-display text-2xl font-extrabold tabular-nums text-navy-950">{eur(3420)}</span>
              <span className="text-xs tabular-nums text-neutral-500">target {eur(4500)}</span>
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
          <span className="hv-btn hv-btn-primary w-full !rounded-xl !py-3 text-sm">Donate to this well</span>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Qurbani: contributions management ---------------- */
export function QurbaniPreview() {
  const options = [
    ['Sheep or goat', 184],
    ['Cow share', 96],
    ['Camel share', 21],
  ] as const;
  const rows = [
    ['Q-1043', 'Fatima R.', 'Sheep or goat', 2, 'Paid'],
    ['Q-1044', 'Omar S.', 'Cow share', 1, 'Paid'],
    ['Q-1045', 'Aisha B.', 'Sheep or goat', 1, 'Pending'],
    ['Q-1046', 'Ibrahim K.', 'Camel share', 1, 'Paid'],
  ] as const;
  return (
    <Shell url="app.donorfit.com/qurbani" label="Qurbani management preview with contribution counts per option and a list of contributions with payment status">
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <Moon className="h-5 w-5 text-brand-600" /> Qurbani contributions
          </div>
          <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">Eid al-Adha</span>
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
            <span>Ref</span>
            <span>Donor</span>
            <span>Option</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Payment</span>
          </div>
          {rows.map(([ref, d, o, q, st]) => (
            <div key={ref} className="grid grid-cols-[0.8fr_1.1fr_1.2fr_0.4fr_0.8fr] items-center border-t border-neutral-100 px-4 py-2.5 text-xs">
              <span className="tabular-nums text-neutral-500">{ref}</span>
              <span className="truncate font-medium text-navy-950">{d}</span>
              <span className="truncate text-neutral-600">{o}</span>
              <span className="text-right tabular-nums">{q}</span>
              <span className="text-right">
                <Pill tone={st === 'Paid' ? 'ok' : 'wait'}>{st}</Pill>
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
  const days = [92, 95, 90, 96, 93];
  return (
    <Shell url="app.donorfit.com/school/overview" label="School dashboard preview with weekly attendance, term fee summary and a student list">
      <div className="flex">
        <aside className="hidden w-44 shrink-0 space-y-1 border-r border-neutral-200 bg-soft p-4 md:block">
          <div className="mb-4 flex items-center gap-2">
            <BrandLogo variant="icon" className="h-5" alt="" />
            <span className="text-sm font-bold text-navy-950">School</span>
          </div>
          {[
            [GraduationCap, 'Overview', true],
            [Users, 'Students', false],
            [CalendarDays, 'Attendance', false],
            [Wallet, 'Fees', false],
          ].map(([I, l, a]) => {
            const Icon = I as typeof Users;
            return (
              <span key={l as string} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${a ? 'bg-white text-brand-800 ring-1 ring-neutral-200' : 'text-neutral-600'}`}>
                <Icon className="h-3.5 w-3.5" /> {l as string}
              </span>
            );
          })}
        </aside>
        <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-6">
          <div className="text-lg font-bold text-navy-950">Term 2 overview</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="text-xs font-semibold text-navy-950">Attendance this week</div>
              <div className="mt-3 flex h-20 items-end gap-2">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <span className={`w-full rounded-t ${i === 4 ? 'bg-brand-600' : 'bg-brand-100'}`} style={{ height: `${(d - 80) * 4}px` }} />
                    <span className="text-[10px] text-neutral-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="text-xs font-semibold text-navy-950">Term fees</div>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full">
                <span className="bg-brand-600" style={{ width: '72%' }} />
                <span className="bg-brand-200" style={{ width: '20%' }} />
                <span className="bg-navy-950" style={{ width: '8%' }} />
              </div>
              <dl className="mt-3 grid grid-cols-3 text-[11px]">
                {[
                  ['Paid', 181],
                  ['Pending', 50],
                  ['Overdue', 20],
                ].map(([l, n]) => (
                  <div key={l as string}>
                    <dt className="text-neutral-500">{l}</dt>
                    <dd className="font-bold tabular-nums text-navy-950">{n}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            {[
              ['Sara M.', '4B', 'Sponsored', 'Paid'],
              ['Ahmed N.', '4B', '—', 'Pending'],
              ['Grace O.', '5A', 'Sponsored', 'Paid'],
            ].map(([n, c, s, f]) => (
              <div key={n} className="grid grid-cols-[1.3fr_0.5fr_1fr_0.8fr] items-center border-b border-neutral-100 px-4 py-2.5 text-xs last:border-b-0">
                <span className="font-medium text-navy-950">{n}</span>
                <span className="text-neutral-500">{c}</span>
                <span className="text-neutral-600">{s}</span>
                <span className="text-right">
                  <Pill tone={f === 'Paid' ? 'ok' : 'wait'}>{f}</Pill>
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
  const pct = 73;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <Shell url="give.your-charity.org/pool/masjid-roof" label="Money pool page preview with a progress ring, contributor wall and sharing options">
      <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-brand-50)" strokeWidth="12" />
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-brand-600)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="hv-display text-2xl font-extrabold tabular-nums text-navy-950">{pct}%</span>
              <span className="text-[10px] text-neutral-500">of target</span>
            </div>
          </div>
          <div className="mt-3 text-center text-xs">
            <div className="font-bold tabular-nums text-navy-950">{eur(8760)} of {eur(12000)}</div>
            <div className="text-neutral-500">143 contributors · 12 days left</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="hv-display text-xl font-extrabold text-navy-950">Masjid roof repair</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">Organised by the youth committee · paid directly to the masjid’s account</p>
          </div>
          <ul className="space-y-2">
            {[
              ['Ali R.', 50, 'For my parents'],
              ['Anonymous', 20, ''],
              ['Sara & Omar', 100, 'May it be accepted'],
            ].map(([n, a, msg]) => (
              <li key={n as string} className="flex items-start justify-between gap-3 rounded-xl bg-soft px-3.5 py-2.5 text-xs">
                <div>
                  <div className="font-semibold text-navy-950">{n}</div>
                  {msg && <div className="text-neutral-500">“{msg}”</div>}
                </div>
                <span className="font-bold tabular-nums text-brand-800">{eur(a as number)}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 text-xs">
            {[
              [MessageCircle, 'WhatsApp'],
              [Share2, 'Share link'],
              [QrCode, 'QR code'],
            ].map(([I, l]) => {
              const Icon = I as typeof Share2;
              return (
                <span key={l as string} className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-700">
                  <Icon className="h-3.5 w-3.5" /> {l as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}
