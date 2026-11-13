import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Heart, 
  ArrowUpRight, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  RefreshCw,
  Zap,
  Globe2
} from 'lucide-react';
import BrandLogo from './BrandLogo.tsx';
import { useT, useFormat, useI18n } from '../i18n/index.tsx';

interface RealtimeAppGraphicProps {
  className?: string;
  variant?: 'full' | 'compact';
}

interface LiveTransaction {
  id: string;
  donor: string;
  /** Key under productDetails:ui.live.locations */
  location: string;
  amount: number;
  currency: 'EUR' | 'GBP' | 'CHF';
  type: 'recurring' | 'one-time' | 'sponsorship';
  method: 'SEPA' | 'Apple Pay' | 'Card' | 'iDEAL';
  /** Key under productDetails:ui.live.campaigns */
  campaign: string;
  /** Seconds since the event (0 = just now) */
  ago: number;
  status: 'settled' | 'processing';
}

const INITIAL_TRANSACTIONS: LiveTransaction[] = [
  { id: 'tx-8041', donor: 'Dr. Helena Weber', location: 'munich', amount: 150, currency: 'EUR', type: 'recurring', method: 'SEPA', campaign: 'cleanWater', ago: 0, status: 'settled' },
  { id: 'tx-8040', donor: 'Marc & Sophie Laurent', location: 'lyon', amount: 75, currency: 'EUR', type: 'sponsorship', method: 'Card', campaign: 'eastAfrica', ago: 18, status: 'settled' },
  { id: 'tx-8039', donor: 'Aarav Patel', location: 'london', amount: 250, currency: 'GBP', type: 'one-time', method: 'Apple Pay', campaign: 'winterRelief', ago: 42, status: 'settled' },
  { id: 'tx-8038', donor: 'Clara Van der Beek', location: 'utrecht', amount: 100, currency: 'EUR', type: 'recurring', method: 'iDEAL', campaign: 'healthClinics', ago: 60, status: 'settled' },
  { id: 'tx-8037', donor: 'Julian Schneider', location: 'zurich', amount: 500, currency: 'CHF', type: 'one-time', method: 'SEPA', campaign: 'endowment', ago: 180, status: 'settled' },
];

export default function RealtimeAppGraphic({ className = '', variant = 'full' }: RealtimeAppGraphicProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'crm' | 'sponsorship'>('feed');
  const [transactions, setTransactions] = useState<LiveTransaction[]>(INITIAL_TRANSACTIONS);
  const [todayTotal, setTodayTotal] = useState<number>(18450);
  const [pulse, setPulse] = useState<boolean>(false);
  const t = useT('productDetails');
  const { eur, eurCents, int } = useFormat();
  const { locale } = useI18n();
  /** Locale-aware percentage, e.g. pct(99.2, 1) → "99.2%" / "99,2 %". */
  const pct = (n: number, digits = 0, signed = false) =>
    new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: digits, maximumFractionDigits: digits, signDisplay: signed ? 'always' : 'auto' }).format(n / 100);
  const money = (amount: number, currency: LiveTransaction['currency']) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  const timeAgo = (seconds: number) =>
    seconds <= 0
      ? t('ui.live.justNow')
      : seconds < 60
        ? t('ui.live.secondsAgo', { n: seconds })
        : t('ui.live.minutesAgo', { n: Math.round(seconds / 60) });

  // Gentle real-time simulation: occasionally add a live donation to demonstrate real-time software capability
  useEffect(() => {
    const pool = [
      { donor: 'Lukas Meyer', location: 'frankfurt', amount: 60, type: 'recurring' as const, method: 'SEPA' as const, campaign: 'orphanCare' },
      { donor: 'Amélie Dupont', location: 'brussels', amount: 120, type: 'sponsorship' as const, method: 'Card' as const, campaign: 'schoolNutrition' },
      { donor: 'Felix Braun', location: 'vienna', amount: 200, type: 'one-time' as const, method: 'Apple Pay' as const, campaign: 'fieldClinic' }
    ];

    const interval = setInterval(() => {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const newTx: LiveTransaction = {
        id: `tx-${Math.floor(8042 + Math.random() * 500)}`,
        donor: pick.donor,
        location: pick.location,
        amount: pick.amount,
        currency: 'EUR',
        type: pick.type,
        method: pick.method,
        campaign: pick.campaign,
        ago: 0,
        status: 'settled'
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 5)]);
      setTodayTotal((prev) => prev + pick.amount);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-2xl sm:rounded-3xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden font-sans select-none ${className}`}>
      
      {/* 1. App Browser & Environment Header */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-neutral-900 border-b border-neutral-800/80 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-neutral-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity"></span>
          </div>

          <div className="flex items-center gap-2 pl-2">
            <BrandLogo variant="icon" onDark className="h-4.5" alt="Donorfit" />
            <span className="text-xs font-semibold text-neutral-300">Donorfit Core</span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs text-neutral-400 font-mono hidden md:inline">app.donorfit.com/eu-central-1/live-feed</span>
          </div>
        </div>

        {/* Live Status Pill & Latency */}
        <div className="flex items-center gap-3 text-xs">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
            pulse ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 scale-105' : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold tracking-wide uppercase text-[10px]">{t('ui.live.engineActive')}</span>
          </div>
          <span className="text-[11px] text-neutral-500 hidden sm:inline">Frankfurt AWS · &lt;24ms</span>
        </div>
      </div>

      {/* 2. Application Sub-Bar / Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-800 border-b border-neutral-800 bg-neutral-900/40 text-xs">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] font-medium">
            <span>{t('ui.live.todayInflow')}</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white mt-1 tabular-nums">
            {eur(todayTotal)}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium inline-flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> {t('ui.live.vsYesterday', { pct: pct(16.2, 1, true) })}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] font-medium">
            <span>{t('ui.live.sepaClearance')}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white mt-1 tabular-nums">
            {t('ui.live.cleared', { pct: pct(100) })}
          </div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">
            {t('ui.live.batchVerified')}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] font-medium">
            <span>{t('ui.live.activeRecurring')}</span>
            <Users className="w-3.5 h-3.5 text-brand-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white mt-1 tabular-nums">
            {t('ui.live.activeCount', { count: int(3842) })}
          </div>
          <span className="text-[11px] text-brand-400 font-medium mt-0.5 block">
            {t('ui.live.retention', { pct: pct(99.2, 1) })}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] font-medium">
            <span>{t('ui.live.autoReceipts')}</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white mt-1 tabular-nums">
            {t('ui.live.instantPdf')}
          </div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">
            {t('ui.live.estdv')}
          </span>
        </div>
      </div>

      {/* 3. Interactive View Switcher Tabs inside the Graphic */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 pt-4 pb-2 border-b border-neutral-800 bg-neutral-950/80">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t('ui.live.tabs.feed')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'crm'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('ui.live.tabs.crm')}</span>
          </button>

          <button
            onClick={() => setActiveTab('sponsorship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sponsorship'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{t('ui.live.tabs.sponsorship')}</span>
          </button>
        </div>

        <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
          {t('ui.live.lastEvent', { time: transactions[0] ? timeAgo(transactions[0].ago) : t('ui.live.now') })}
        </span>
      </div>

      {/* 4. Tab Body */}
      <div className="p-4 sm:p-6 bg-neutral-950">
        
        {/* VIEW A: REAL-TIME GIVING FEED */}
        {activeTab === 'feed' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 px-3 uppercase tracking-wider">
              <span>{t('ui.live.cols.supporter')}</span>
              <span className="hidden sm:inline">{t('ui.live.cols.method')}</span>
              <span>{t('ui.live.cols.amount')}</span>
            </div>

            <div className="divide-y divide-neutral-900 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/30">
              {transactions.map((tx, idx) => (
                <div 
                  key={tx.id} 
                  className={`flex items-center justify-between p-3.5 hover:bg-neutral-900/60 transition-colors text-xs ${
                    idx === 0 && pulse ? 'bg-emerald-950/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-brand-500 flex items-center justify-center font-bold text-white text-[11px] shrink-0 shadow-xs">
                      {tx.donor.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{tx.donor}</span>
                        {tx.type === 'recurring' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-400">
                            {t('ui.live.badgeMonthly')}
                          </span>
                        )}
                        {tx.type === 'sponsorship' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-950 border border-brand-800 text-brand-400">
                            {t('ui.live.badgeSponsorship')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400">{t(`ui.live.campaigns.${tx.campaign}`)}</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-start text-[11px]">
                    <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3 text-neutral-500" />
                      {tx.method === 'Card' ? t('ui.live.card') : tx.method} · {t(`ui.live.locations.${tx.location}`)}
                    </span>
                    <span className="text-neutral-500 text-[10px]">{timeAgo(tx.ago)}</span>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-white tabular-nums text-sm">
                      +{money(tx.amount, tx.currency)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {t('ui.live.settled')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {t('ui.live.securityNote')}
              </span>
              <span className="text-neutral-400 font-mono">{t('ui.live.receiptAutomation', { pct: pct(100) })}</span>
            </div>
          </div>
        )}

        {/* VIEW B: SUPPORTER 360° CRM CARD */}
        {activeTab === 'crm' && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-navy-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                  HW
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">Dr. Helena Weber</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      {t('ui.live.crm.tier')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{t('ui.live.crm.memberMeta')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('ui.live.crm.taxCertificate')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">{t('ui.live.crm.lifetime')}</span>
                <span className="text-lg font-bold text-white tabular-nums mt-0.5 block">{eurCents(6450)}</span>
                <span className="text-[10px] text-emerald-400">{t('ui.live.crm.contributions', { count: int(38) })}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">{t('ui.live.crm.recurring')}</span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums mt-0.5 block">{t('ui.live.crm.perMonth', { amount: eurCents(150) })}</span>
                <span className="text-[10px] text-neutral-400">{t('ui.live.crm.sepaMandate')}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">{t('ui.live.crm.gdpr')}</span>
                <span className="text-lg font-bold text-brand-300 mt-0.5 block">{t('ui.live.crm.optIn')}</span>
                <span className="text-[10px] text-neutral-400">{t('ui.live.crm.doubleOptIn')}</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: SPONSORSHIP ALLOCATION */}
        {activeTab === 'sponsorship' && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{t('ui.live.allocation.kicker')}</span>
                <h4 className="text-base font-bold text-white mt-0.5">{t('ui.live.allocation.title')}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-brand-950 border border-brand-800 text-brand-300 text-xs font-semibold">
                {t('ui.live.allocation.roleView')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-sm">{t('ui.live.allocation.child1.name')}</h5>
                    <span className="text-xs text-neutral-400">{t('ui.live.allocation.child1.meta')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                    {t('ui.live.allocation.activeCare')}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t('ui.live.allocation.child1.body', { amount: eur(75) })}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{t('ui.live.allocation.child1.footer')}</span>
                  <span className="text-brand-400 font-medium">{t('ui.live.allocation.child1.status')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-sm">{t('ui.live.allocation.child2.name')}</h5>
                    <span className="text-xs text-neutral-400">{t('ui.live.allocation.child2.meta')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                    {t('ui.live.allocation.activeCare')}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t('ui.live.allocation.child2.body', { amount: eur(150) })}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{t('ui.live.allocation.child2.footer')}</span>
                  <span className="text-emerald-400 font-medium">{t('ui.live.allocation.child2.status')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

