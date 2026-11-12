import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Heart,
  Euro,
  ArrowUpRight,
  Sparkles,
  Lock,
  Building2,
  RefreshCw,
  Sliders,
  ChevronRight,
  Award,
  Clock
} from 'lucide-react';
import BrandLogo from './BrandLogo.tsx';

interface MockupProps {
  type: 'sponsorship' | 'orphan' | 'moneypool' | 'membership' | 'donations' | 'recurring' | 'donormanagement' | 'campaign' | 'reporting' | 'hero';
  className?: string;
}

export default function ProductMockup({ type, className = '' }: MockupProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'allocations' | 'compliance'>('overview');
  const [demoAmount, setDemoAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<'monthly' | 'single'>('monthly');

  if (type === 'hero') {
    return (
      <div className={`rounded-2xl border border-neutral-200/90 bg-white/95 backdrop-blur-xl shadow-2xl shadow-neutral-900/10 overflow-hidden ${className}`}>
        {/* Browser / Application Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 text-white border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            </div>
            <span className="pl-2 inline-flex"><BrandLogo variant="icon" onDark className="h-4" alt="Donorfit" /></span>
            <span className="text-xs tabular-nums text-neutral-400 truncate">app.donorfit.com/workspace/eu-central</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SEPA & Direct Rails Live
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Top KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-neutral-50 to-emerald-50/30 border border-neutral-200/80">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Recurring Monthly Run Rate</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 tabular-nums tracking-tight mt-1 tabular-nums">
                €248,500
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                +18.4% year-over-year
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-neutral-50 to-brand-50/30 border border-neutral-200/80">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Active Sponsorships</span>
                <Users className="w-3.5 h-3.5 text-brand-600" />
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 tabular-nums tracking-tight mt-1 tabular-nums">
                3,842
              </div>
              <div className="text-[11px] text-brand-700 font-semibold mt-1">
                99.2% retention rate
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-neutral-50 to-brand-50/30 border border-neutral-200/80">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Auto-Tax Compliance</span>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 tabular-nums tracking-tight mt-1 tabular-nums">
                100%
              </div>
              <div className="text-[11px] text-brand-700 font-semibold mt-1">
                German / French & UK certificates
              </div>
            </div>
          </div>

          {/* Interactive Micro Chart / Allocation Stream */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="font-semibold text-neutral-200">Real-Time Giving Velocity (30 Days)</span>
              </div>
              <span className="text-[11px] tabular-nums text-emerald-400 font-medium">Reconciled via SEPA CAMT.053</span>
            </div>

            {/* SVG Sparkline visualization */}
            <div className="h-16 w-full pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q40,38 80,42 T160,25 T240,28 T320,12 T400,8 L400,60 L0,60 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,45 Q40,38 80,42 T160,25 T240,28 T320,12 T400,8"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="400" cy="8" r="4" fill="#34d399" className="animate-ping origin-center" />
                <circle cx="400" cy="8" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
              <span>Oct 1 · €182k</span>
              <span>Oct 15 · €214k</span>
              <span className="text-emerald-400 font-bold">Today · €248.5k Peak</span>
            </div>
          </div>

          {/* Live Recent Event Pill */}
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/90 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                ✓
              </div>
              <div>
                <span className="font-bold text-neutral-900 block leading-tight">SEPA Core Batch Executed</span>
                <span className="text-neutral-500 text-[11px]">2,140 mandates collected without friction</span>
              </div>
            </div>
            <div className="text-right">
              <span className="tabular-nums font-bold text-neutral-950">€96,300</span>
              <span className="text-[10px] text-emerald-600 block font-medium">99.4% Clean Pass</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'donations' || type === 'recurring') {
    return (
      <div className={`rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5 overflow-hidden ${className}`}>
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-display">Frictionless Giving Checkout</span>
          </div>
          <span className="text-[11px] text-neutral-400 tabular-nums">2-Step Mobile Optimized</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {/* Frequency Toggle */}
          <div className="flex p-1 bg-neutral-100 rounded-xl">
            <button
              onClick={() => setFrequency('monthly')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                frequency === 'monthly'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly Sustaining Gift (Recommended)
            </button>
            <button
              onClick={() => setFrequency('single')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                frequency === 'single'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              One-Time Gift
            </button>
          </div>

          {/* Amount Pills */}
          <div>
            <label className="block text-neutral-500 font-medium mb-2 text-[11px]">Select Impact Amount:</label>
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setDemoAmount(amt)}
                  className={`py-2.5 text-center rounded-xl border text-xs font-bold transition-all ${
                    demoAmount === amt
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  €{amt}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {demoAmount === 25 && 'Provides nutritious meals for 5 community children for one month.'}
                {demoAmount === 50 && 'Funds full school supplies, uniforms, and books for 2 students.'}
                {demoAmount === 100 && 'Supplies clean solar water filtration for 10 rural households.'}
                {demoAmount === 250 && 'Equips a mobile field medical clinic with essential emergency kits.'}
              </span>
            </div>
          </div>

          {/* Supported Rails */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
            <div className="flex justify-between items-center text-neutral-700">
              <span className="font-semibold text-[11px]">Direct Payment Methods:</span>
              <span className="text-[10px] text-emerald-600 font-medium">Zero Redirection</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-neutral-800">
              <span className="px-2.5 py-1 bg-white rounded-md border border-neutral-200 shadow-2xs">SEPA Direct Debit</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-neutral-200 shadow-2xs">Apple Pay</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-neutral-200 shadow-2xs">Visa / Mastercard</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-neutral-200 shadow-2xs">PayPal</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="pt-2">
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Lock className="w-3.5 h-3.5" />
              <span>Confirm €{demoAmount} {frequency === 'monthly' ? 'Monthly Commitment' : 'Donation'}</span>
            </button>
            <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400 mt-2">
              <span>SSL 256-Bit</span>
              <span>·</span>
              <span>Official Tax Receipt Generated Instantly</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sponsorship' || type === 'orphan') {
    return (
      <div className={`rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5 overflow-hidden ${className}`}>
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold font-display">Beneficiary & Sponsor Dossier</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
            Active Sponsorship #SP-4902
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div>
              <span className="text-[11px] text-neutral-500 block">Beneficiary Child</span>
              <span className="font-bold text-neutral-900 text-sm">Amina K. (Age 9)</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Primary Education · Grade 4</span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block">Dedicated Sponsor</span>
              <span className="font-bold text-neutral-900 text-sm">Stefan & Maria Hoffmann</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Frankfurt am Main, Germany</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-700">
              <span className="font-medium">Academic Year 2026/2027 Care Funding</span>
              <span className="tabular-nums font-bold text-emerald-700">€480 / €480 Funded</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-full"></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
              Verified Milestone Audit
            </span>
            <div className="space-y-1.5 text-neutral-600">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Health & Dental Examination Passed
                </span>
                <span className="text-neutral-400">Oct 12, 2026</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Term 1 Report Card Dispatched
                </span>
                <span className="text-neutral-400">Sep 28, 2026</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-brand-50/70 border border-brand-100 text-[11px] text-brand-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <span>Guardian privacy consent verified. Sensitive location data encrypted under EU child safeguarding guidelines.</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'moneypool') {
    return (
      <div className={`rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5 overflow-hidden ${className}`}>
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 text-white">
          <span className="text-xs font-bold font-display">Verified Group Money Pool</span>
          <span className="text-[11px] font-semibold text-emerald-400">88% of Goal</span>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <h4 className="text-base font-bold text-neutral-950 font-display">
              Solar Water Desalination Initiative
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Organized by Cologne Community Aid Guild · Direct NGO Settlement
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Collected from 142 contributors</span>
              <span className="tabular-nums font-bold text-neutral-900">€22,150 / €25,000</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-brand-500 rounded-full w-[88%]"></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-neutral-900">Recent Group Contributor</span>
              <span className="tabular-nums font-bold text-emerald-700">€500.00</span>
            </div>
            <p className="text-neutral-600 italic text-[11px]">
              &ldquo;From the students of Albertus-Magnus Gymnasium. We stand with you!&rdquo;
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
            <span>Official deduction receipts issued automatically</span>
            <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">View Contributor Wall →</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Reporting & CRM Mockup
  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 text-white">
        <span className="text-xs font-bold font-display">Donor CRM & Cohort Retention Feed</span>
        <span className="text-[11px] text-emerald-400 tabular-nums">Live Data Sync</span>
      </div>

      <div className="p-5 sm:p-6 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 text-[11px] block">Average Donor LTV</span>
            <span className="text-lg font-bold text-neutral-950 tabular-nums mt-0.5 block">€1,420</span>
            <span className="text-emerald-600 text-[10px] font-semibold">+22% vs. one-time gifts</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 text-[11px] block">Failed SEPA Recovery</span>
            <span className="text-lg font-bold text-neutral-950 tabular-nums mt-0.5 block">68.4%</span>
            <span className="text-neutral-500 text-[10px]">Via automated retry logic</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-neutral-200 space-y-2 bg-white">
          <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
            Recent Supporter Timeline
          </span>
          <div className="space-y-1.5 text-neutral-600">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-neutral-900">Dr. Helena Richter</span>
              <span className="tabular-nums text-emerald-700 font-bold">€1,200 Major Gift</span>
            </div>
            <p className="text-[10px] text-neutral-400">Tagged: Clean Water Endowment · Tax certificate #DE-8810 sent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
