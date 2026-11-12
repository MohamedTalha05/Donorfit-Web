import React from 'react';
import {
  LayoutDashboard,
  HandCoins,
  RefreshCw,
  Flag,
  Users,
  BarChart3,
  Settings,
  Download,
  CalendarDays,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import BrandLogo from '../BrandLogo.tsx';
import { BrowserFrame, SampleBadge } from './mockKit.tsx';
import { useT, useTx, useFormat } from '../../i18n/index.tsx';

/* ---------- Sample data (illustrative only; labels in home:dashboard) ---------- */

const DAILY = [
  820, 940, 760, 1120, 1380, 990, 1040, 1210, 1460, 1180, 1320, 1610, 1490, 1270, 1550, 1720, 1640, 1480, 1830, 1960,
  1710, 1880, 2140, 1990, 2060, 2320, 2180, 2410, 2290, 2560,
];

/** Values for home:dashboard.kpis (same order). */
const KPI_VALUES: { n: number; kind: 'eur' | 'int' }[] = [
  { n: 48320, kind: 'eur' },
  { n: 1186, kind: 'int' },
  { n: 412, kind: 'int' },
  { n: 41, kind: 'eur' },
];

type CampaignKey = 'winterRelief' | 'cleanWater' | 'schoolMeals' | 'generalFund';

const CAMPAIGNS: { key: CampaignKey; raised: number; goal: number }[] = [
  { key: 'winterRelief', raised: 18400, goal: 25000 },
  { key: 'cleanWater', raised: 9650, goal: 12000 },
  { key: 'schoolMeals', raised: 4120, goal: 10000 },
];

const RECENT: { name: string; campaign: CampaignKey; method: string; amount: number; monthly: boolean }[] = [
  { name: 'Amira H.', campaign: 'winterRelief', method: 'SEPA', amount: 50, monthly: true },
  { name: 'Jonas K.', campaign: 'cleanWater', method: 'card', amount: 120, monthly: false },
  { name: 'Fatima R.', campaign: 'generalFund', method: 'Apple Pay', amount: 25, monthly: true },
  { name: 'Lea M.', campaign: 'schoolMeals', method: 'PayPal', amount: 75, monthly: false },
];

const NAV = [
  { icon: LayoutDashboard, key: 'overview', active: true },
  { icon: HandCoins, key: 'donations' },
  { icon: RefreshCw, key: 'recurring' },
  { icon: Flag, key: 'campaigns' },
  { icon: Users, key: 'donors' },
  { icon: BarChart3, key: 'reports' },
  { icon: Settings, key: 'settings' },
];

/* ---------- Chart geometry ---------- */

const W = 560;
const H = 160;
const max = Math.max(...DAILY) * 1.1;
const pts = DAILY.map((v, i) => [(i / (DAILY.length - 1)) * W, H - (v / max) * H] as const);
const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const area = `${line} L${W},${H} L0,${H} Z`;

export default function DashboardPreview() {
  const t = useT('home');
  const tc = useT('common');
  const tx = useTx('home');
  const { eur, int } = useFormat();
  const KPIS = tx<{ label: string; sub: string }[]>('dashboard.kpis').map((k, i) => ({
    ...k,
    value: KPI_VALUES[i].kind === 'eur' ? eur(KPI_VALUES[i].n) : int(KPI_VALUES[i].n),
  }));
  return (
    <figure aria-label={t('dashboard.figureLabel')}>
      <BrowserFrame url="app.donorfit.com/overview">
        <div aria-hidden="true" className="flex select-none text-left">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-neutral-200/80 bg-neutral-50/60 p-4 lg:flex">
            <div className="mb-4 flex items-center gap-2 px-2">
              <BrandLogo variant="icon" className="h-6" alt="" />
              <span className="text-sm font-bold text-neutral-900" translate="no">Donorfit</span>
            </div>
            {NAV.map(({ icon: Icon, key, active }) => (
              <span
                key={key}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium ${
                  active ? 'bg-white text-brand-700 shadow-xs ring-1 ring-neutral-200/80' : 'text-neutral-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(`dashboard.nav.${key}`)}
              </span>
            ))}
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 space-y-5 p-4 sm:p-6">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{t('dashboard.nav.overview')}</div>
                <div className="text-lg font-bold text-neutral-900">{t('dashboard.greeting', { name: 'Sarah' })}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="hidden items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-neutral-500 md:flex">
                  <Search className="h-3.5 w-3.5" /> {t('dashboard.search')}
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 font-medium text-neutral-700">
                  <CalendarDays className="h-3.5 w-3.5" /> {t('dashboard.range')}
                </span>
                <span className="hidden items-center gap-1.5 rounded-lg bg-neutral-900 px-2.5 py-1.5 font-medium text-white sm:flex">
                  <Download className="h-3.5 w-3.5" /> {t('dashboard.export')}
                </span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {KPIS.map((k) => (
                <div key={k.label} className="rounded-xl border border-neutral-200/80 bg-white p-3.5">
                  <div className="truncate text-[11px] font-medium text-neutral-500">{k.label}</div>
                  <div className="mt-1 text-lg font-bold tabular-nums text-neutral-950 sm:text-xl">{k.value}</div>
                  <div className="text-[11px] text-neutral-400">{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-5">
              {/* Chart */}
              <div className="rounded-xl border border-neutral-200/80 bg-white p-4 xl:col-span-3">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{t('dashboard.chartTitle')}</div>
                    <div className="text-[11px] text-neutral-500">{t('dashboard.chartSub')}</div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-600" /> {t('dashboard.chartLegend')}
                    </span>
                  </div>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full sm:h-40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--color-neutral-200)" strokeDasharray="3 5" />
                  ))}
                  <path d={area} fill="url(#dash-area)" />
                  <path d={line} fill="none" stroke="var(--color-brand-600)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                  <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill="var(--color-brand-600)" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* Campaigns */}
              <div className="rounded-xl border border-neutral-200/80 bg-white p-4 xl:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-900">{t('dashboard.activeCampaigns')}</div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                </div>
                <div className="space-y-4">
                  {CAMPAIGNS.map((c) => {
                    const pct = Math.round((c.raised / c.goal) * 100);
                    return (
                      <div key={c.key}>
                        <div className="flex items-baseline justify-between gap-2 text-xs">
                          <span className="truncate font-medium text-neutral-800">{t(`dashboard.campaignNames.${c.key}`)}</span>
                          <span className="shrink-0 tabular-nums text-neutral-500">{pct}%</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-neutral-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-navy-600" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-1 text-[11px] tabular-nums text-neutral-400">
                          {eur(c.raised)} {t('mock.of', { amount: eur(c.goal) })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent donations */}
            <div className="rounded-xl border border-neutral-200/80 bg-white">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                <div className="text-sm font-semibold text-neutral-900">{t('dashboard.recentTitle')}</div>
                <span className="text-[11px] font-medium text-brand-700">{tc('actions.viewAll')}</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {RECENT.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">
                      {r.name.split(' ').map((p) => p[0]).join('')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-neutral-900">{r.name}</div>
                      <div className="truncate text-[11px] text-neutral-500">{t(`dashboard.campaignNames.${r.campaign}`)}</div>
                    </div>
                    <span className="hidden rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 sm:inline">
                      {r.method === 'card' ? t('mock.card') : r.method}
                    </span>
                    <span
                      className={`hidden rounded-md px-2 py-0.5 text-[11px] md:inline ${
                        r.monthly ? 'bg-brand-50 text-brand-700' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {r.monthly ? t('mock.monthly') : t('mock.oneTime')}
                    </span>
                    <span className="w-14 shrink-0 text-right font-semibold tabular-nums text-neutral-900">{eur(r.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
      <figcaption className="mt-3 flex justify-center">
        <SampleBadge label={t('dashboard.sampleBadge')} />
      </figcaption>
    </figure>
  );
}
