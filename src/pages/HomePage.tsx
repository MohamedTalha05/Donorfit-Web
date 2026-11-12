import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  ShieldCheck,
  FileCheck2,
  DatabaseZap,
  HandCoins,
  RefreshCw,
  Flag,
  Users,
  HeartHandshake,
  BarChart3,
  Globe2,
  Landmark,
  Moon,
  Building2,
  Code2,
  Palette,
  Receipt,
  Percent,
  CalendarCheck,
  CreditCard,
  Wallet,
  Banknote,
  BadgeCheck,
  Sparkles,
  MessageSquareQuote,
  Target,
  QrCode,
  Share2,
  Snowflake,
  UtensilsCrossed,
  School,
} from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { FAQS_DATA } from '../data/content.ts';
import { VERIFIED_ORGANISATIONS, SUCCESS_STORIES } from '../data/homepage.ts';
import HomeLink from '../components/home/HomeLink.tsx';
import ProductShowcase from '../components/home/ProductShowcase.tsx';
import DashboardPreview from '../components/home/DashboardPreview.tsx';
import DonationFormPreview from '../components/home/DonationFormPreview.tsx';
import RecurringPreview from '../components/home/RecurringPreview.tsx';
import IntegrationHub from '../components/home/IntegrationHub.tsx';
import Photo from '../components/home/Photo.tsx';
import { SECTION_PHOTOS } from '../components/home/sectionPhotos.ts';
import { SampleBadge, eur, int } from '../components/home/mockKit.tsx';

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const SECTION = 'relative scroll-mt-24 py-24 sm:py-32';

type Tone = 'light' | 'dark';

/** Adds `.is-visible` to [data-reveal] elements as they scroll into view. */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('hv-reveal-ready');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('hv-reveal-ready');
    };
  }, [ref]);
}

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

function Eyebrow({ children, tone = 'light' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${
        tone === 'dark' ? 'bg-white/8 text-brand-300 ring-1 ring-white/15' : 'bg-brand-100/70 text-brand-800 ring-1 ring-brand-200/70'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone === 'dark' ? 'bg-brand-300' : 'bg-brand-600'}`} />
      {children}
    </span>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: Tone;
}) {
  return (
    <div data-reveal className={`space-y-5 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.5rem] ${
          tone === 'dark' ? 'text-white' : 'text-navy-950'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${tone === 'dark' ? 'text-white/70' : 'text-neutral-600'}`}>{description}</p>
      )}
    </div>
  );
}

function CheckList({ items, tone = 'light' }: { items: React.ReactNode[]; tone?: Tone }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3.5 text-[15px] leading-relaxed ${tone === 'dark' ? 'text-white/80' : 'text-neutral-700'}`}>
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              tone === 'dark' ? 'bg-brand-300 text-navy-950' : 'bg-brand-600 text-white'
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TextLink({ to, children, tone = 'light' }: { to: string; children: React.ReactNode; tone?: Tone }) {
  return (
    <HomeLink
      to={to}
      className={`group inline-flex items-center gap-2 rounded-md text-[15px] font-bold transition-colors ${
        tone === 'dark' ? 'text-brand-300 hover:text-brand-200' : 'text-brand-700 hover:text-brand-900'
      }`}
    >
      {children}
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 motion-reduce:transition-none ${
          tone === 'dark' ? 'bg-brand-300/15' : 'bg-brand-100'
        }`}
      >
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </HomeLink>
  );
}

const inlineLink =
  'font-semibold text-navy-900 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-600';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const PLATFORM_FEATURES = [
  {
    icon: HandCoins,
    title: 'Online donations',
    description: 'Branded donation forms and campaign pages that work beautifully on every device.',
    to: '/donations',
  },
  {
    icon: RefreshCw,
    title: 'Recurring giving',
    description: 'Monthly and annual giving with SEPA mandates, automatic retries and donor self-service.',
    to: '/recurring-giving',
  },
  {
    icon: Flag,
    title: 'Campaigns & appeals',
    description: 'Goal-based appeals with live progress, milestones, QR codes and matched giving.',
    to: '/campaign-management',
  },
  {
    icon: Users,
    title: 'Donor management',
    description: 'One profile per supporter with full giving history, consent records and notes.',
    to: '/donor-management',
  },
  {
    icon: HeartHandshake,
    title: 'Sponsorship',
    description: 'Manage sponsors, beneficiaries and progress updates with role-based safeguarding.',
    to: '/sponsorship',
  },
  {
    icon: BarChart3,
    title: 'Reporting & insights',
    description: 'Retention, campaign and fund reports ready for your board, trustees and auditors.',
    to: '/reporting-and-insights',
  },
];

const EXAMPLE_CAMPAIGNS = [
  { icon: UtensilsCrossed, title: 'Ramadan Food Packs', tag: 'Seasonal appeal', raised: 32450, goal: 40000, supporters: 618, daysLeft: 9 },
  { icon: Snowflake, title: 'Emergency Winter Appeal', tag: 'Emergency', raised: 21800, goal: 50000, supporters: 402, daysLeft: 21 },
  { icon: School, title: 'Build a Classroom', tag: 'Project fund', raised: 14250, goal: 15000, supporters: 187, daysLeft: 4 },
];

const PAYMENT_GROUPS = [
  { icon: Banknote, title: 'Bank payments', items: ['SEPA Direct Debit', 'iDEAL', 'Bancontact', 'Sofort / Klarna'] },
  { icon: CreditCard, title: 'Cards', items: ['Visa', 'Mastercard', 'American Express'] },
  { icon: Wallet, title: 'Wallets', items: ['Apple Pay', 'Google Pay', 'PayPal'] },
];

const SOLUTIONS = [
  {
    icon: Globe2,
    title: 'NGOs',
    description: 'Run appeals across countries and currencies while keeping every gift accountable to your field programmes.',
    points: ['Multi-currency, localised checkout', 'Restricted fund tracking', 'Audit-ready exports'],
    to: '/solutions/ngos',
  },
  {
    icon: Landmark,
    title: 'Charitable trusts & foundations',
    description: 'Give trustees clear visibility of restricted allocations, donors and governance reporting.',
    points: ['Trustee & board reports', 'Read-only auditor access', 'Restricted allocations'],
    to: '/solutions/foundations',
  },
  {
    icon: Moon,
    title: 'Masjids & faith communities',
    description: 'Collect regular giving, seasonal appeals and building funds from your community in one place.',
    points: ['Recurring community giving', 'Seasonal appeal pages', 'QR codes for in-person events'],
    to: '/money-pool',
  },
  {
    icon: Building2,
    title: 'Charities & nonprofits',
    description: 'Replace spreadsheets and disconnected tools with one platform your whole team can use.',
    points: ['Automated tax receipts', 'Donor CRM', 'Membership & sponsorship'],
    to: '/solutions/charities',
  },
];

const HOME_FAQ_INDEXES = [0, 8, 3, 5, 6, 2, 7];

/* Bento layout + visual treatment per platform feature (same order as PLATFORM_FEATURES). */
const BENTO = [
  { span: 'lg:col-span-2 lg:row-span-2', tone: 'dark' as Tone, card: 'hv-dark-bg border-navy-800 text-white', icon: 'bg-brand-300 text-navy-950' },
  { span: 'lg:col-span-2', tone: 'light' as Tone, card: 'border-brand-200 bg-gradient-to-br from-brand-100 via-aqua to-white', icon: 'bg-brand-600 text-white' },
  { span: '', tone: 'light' as Tone, card: 'border-brand-200 bg-gradient-to-br from-brand-100 to-white', icon: 'bg-navy-900 text-brand-300' },
  { span: '', tone: 'light' as Tone, card: 'border-neutral-200 bg-soft', icon: 'bg-white text-brand-700 ring-1 ring-brand-200' },
  { span: 'lg:col-span-2', tone: 'light' as Tone, card: 'border-neutral-200 bg-white', icon: 'bg-gradient-to-br from-brand-500 to-navy-700 text-white' },
  { span: 'lg:col-span-2', tone: 'dark' as Tone, card: 'border-brand-500/40 bg-gradient-to-br from-brand-700 to-navy-900 text-white', icon: 'bg-white/15 text-white ring-1 ring-white/25' },
];

/* Small decorative illustrations for the bento cards. */
function BentoArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <div aria-hidden="true" className="relative mt-auto hidden space-y-3 pt-10 sm:block">
        <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-white/5 p-1 text-sm font-semibold">
          <span className="py-2 text-center text-white/50">One-time</span>
          <span className="rounded-lg bg-white py-2 text-center text-navy-950">Monthly</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 100, 250].map((a) => (
            <span
              key={a}
              className={`rounded-xl py-3 text-center text-sm font-bold tabular-nums ${
                a === 50 ? 'bg-brand-300 text-navy-950' : 'border border-white/15 bg-white/5 text-white/80'
              }`}
            >
              {eur(a)}
            </span>
          ))}
        </div>
        <div className="h-11 rounded-xl border border-white/15 bg-white/5" />
        <div className="h-11 rounded-xl bg-gradient-to-r from-brand-500 to-navy-600" />
      </div>
    );
  if (index === 1)
    return (
      <div aria-hidden="true" className="absolute -right-6 -top-6 hidden h-36 w-36 rounded-full border-[14px] border-brand-200/70 sm:block">
        <div className="absolute inset-3 rounded-full border-[10px] border-dashed border-brand-300/60" />
      </div>
    );
  if (index === 2)
    return (
      <div aria-hidden="true" className="mt-5 h-2.5 overflow-hidden rounded-full bg-white">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-400 to-brand-500" />
      </div>
    );
  if (index === 3)
    return (
      <div aria-hidden="true" className="mt-5 flex -space-x-2">
        {['AH', 'JK', 'FR', 'LM'].map((i, n) => (
          <span
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-soft ${
              ['bg-brand-600 text-white', 'bg-brand-300 text-navy-950', 'bg-navy-900 text-white', 'bg-brand-200 text-brand-800'][n]
            }`}
          >
            {i}
          </span>
        ))}
      </div>
    );
  if (index === 5)
    return (
      <div aria-hidden="true" className="absolute bottom-6 right-6 hidden h-20 items-end gap-1.5 sm:flex">
        {[40, 65, 50, 80, 70, 100].map((h, i) => (
          <span key={i} className={`w-3 rounded-t ${i === 5 ? 'bg-brand-300' : 'bg-white/25'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  return null;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const { openBookDemo, openGetStarted } = useModal();
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const faqs = HOME_FAQ_INDEXES.map((i) => FAQS_DATA[i]).filter(Boolean);
  const [featured, ...restCampaigns] = EXAMPLE_CAMPAIGNS;

  return (
    <div ref={rootRef} className="home-v2 overflow-x-clip bg-white">
      {/* 1. HERO ------------------------------------------------------ */}
      <section aria-labelledby="hero-title" className="hv-hero-bg relative isolate overflow-hidden pb-28 pt-16 text-white sm:pt-24 lg:pb-40 lg:pt-28">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <div aria-hidden="true" className="hv-drift absolute -right-32 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-600/30 blur-3xl" />
        <div aria-hidden="true" className="hv-drift absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-300/10 blur-3xl [animation-delay:-6s]" />

        <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12`}>
          <div className="text-center lg:text-left">
            <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
              Fundraising technology built for nonprofits
            </div>

            <h1
              id="hero-title"
              data-reveal
              style={delay(80)}
              className="mx-auto mt-8 max-w-3xl text-[2.75rem] font-extrabold leading-[0.98] sm:text-7xl lg:mx-0 lg:text-[4.25rem] xl:text-[5.25rem]"
            >
              Raise more for your mission.{' '}
              <span className="hv-gradient-text sm:block">Spend less time on admin.</span>
            </h1>

            <p data-reveal style={delay(160)} className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl lg:mx-0">
              Donation forms, recurring giving, campaigns and donor management in one connected platform — built for NGOs,
              charitable trusts, masjids and nonprofits.
            </p>

            <div data-reveal style={delay(240)} className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <button type="button" onClick={() => openGetStarted()} className="hv-btn hv-btn-primary px-8 py-4 text-base">
                Get Started Free
                <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-ghost px-8 py-4 text-base">
                Book a Demo
              </button>
            </div>

            <ul data-reveal style={delay(320)} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-white/65 lg:justify-start">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-300" aria-hidden="true" /> Hosted in the EU, GDPR-compliant
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-brand-300" aria-hidden="true" /> Automated tax receipts
              </li>
              <li className="flex items-center gap-2">
                <DatabaseZap className="h-4 w-4 text-brand-300" aria-hidden="true" /> Export your data anytime
              </li>
            </ul>
          </div>

          <div data-reveal style={delay(200)} className="px-4 sm:px-10 lg:px-8 xl:px-0">
            <ProductShowcase />
          </div>
        </div>
      </section>

      {/* 2. PRODUCT SHOWCASE ----------------------------------------- */}
      <section aria-labelledby="showcase-title" className="relative pb-24 sm:pb-32">
        <h2 id="showcase-title" className="sr-only">
          Product overview
        </h2>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[42%] bg-navy-950" />
        <div aria-hidden="true" className="absolute inset-x-0 top-[42%] bottom-0 bg-gradient-to-b from-aqua to-white" />
        <div className={`${CONTAINER} relative -mt-16 lg:-mt-24`}>
          <div data-reveal className="relative mx-auto max-w-6xl">
            <div
              aria-hidden="true"
              className="absolute -inset-x-6 -top-8 bottom-16 -z-10 rounded-[3rem] bg-gradient-to-r from-brand-600/40 via-brand-500/20 to-brand-300/25 blur-3xl"
            />
            <div className="rounded-[1.75rem] bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur sm:p-3">
              <DashboardPreview />
            </div>
          </div>

          <div data-reveal className="mx-auto mt-14 grid max-w-5xl overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[0_30px_60px_-40px_rgb(0_24_64/0.5)] sm:grid-cols-3 sm:divide-x sm:divide-brand-100">
            {[
              { icon: Target, title: 'Every gift, one view', text: 'Donations, recurring plans and campaigns update in a single dashboard.' },
              { icon: Receipt, title: 'Receipts on autopilot', text: 'Compliant donation receipts are generated and sent for you.' },
              { icon: BarChart3, title: 'Reports in a click', text: 'Share clear numbers with trustees, boards and auditors.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 border-b border-brand-100 p-6 text-left last:border-b-0 sm:border-b-0 sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-navy-700 text-white shadow-[0_8px_20px_-8px_rgb(0_122_128/0.7)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY ------------------------------------------------ */}
      <section aria-labelledby="trusted-title" className="pb-8">
        <div className={CONTAINER}>
          <div data-reveal className="rounded-[2rem] border border-neutral-200/80 bg-soft px-6 py-10 sm:px-12">
            {VERIFIED_ORGANISATIONS.length > 0 ? (
              <>
                <h2 id="trusted-title" className="text-center text-sm font-semibold text-neutral-500">
                  Trusted by organisations doing vital work
                </h2>
                <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                  {VERIFIED_ORGANISATIONS.map((org) => (
                    <li key={org.name} className="text-neutral-500 grayscale transition-[filter,opacity] hover:grayscale-0">
                      {org.logoSrc ? (
                        <img
                          src={org.logoSrc}
                          alt={org.name}
                          width={org.logoWidth ?? 140}
                          height={org.logoHeight ?? 40}
                          loading="lazy"
                          className="h-9 w-auto object-contain opacity-70 hover:opacity-100"
                        />
                      ) : (
                        <span className="text-lg font-bold tracking-tight">{org.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex flex-col items-center gap-7">
                <h2 id="trusted-title" className="!font-sans text-center text-sm font-semibold !tracking-normal text-neutral-500">
                  Built for organisations that serve their communities
                </h2>
                <ul className="flex flex-wrap items-center justify-center gap-3">
                  {[
                    'NGOs',
                    'Charities',
                    'Charitable trusts & foundations',
                    'Masjids',
                    'Sponsorship programmes',
                    'Membership associations',
                  ].map((label, i) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-xs transition-colors hover:border-brand-300"
                    >
                      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${i % 2 ? 'bg-brand-400' : 'bg-brand-500'}`} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM OVERVIEW (bento) -------------------------------- */}
      <section id="platform" aria-labelledby="platform-title" className={SECTION}>
        <div className={CONTAINER}>
          <SectionHeader
            id="platform-title"
            eyebrow="Platform"
            title={
              <>
                Everything you need to fundraise, <span className="hv-gradient-text-light">in one place</span>
              </>
            }
            description="Stop stitching together forms, spreadsheets and payment tools. Donorfit connects every part of your fundraising."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(15rem,auto)] lg:grid-cols-4">
            {PLATFORM_FEATURES.map(({ icon: Icon, title, description, to }, i) => {
              const b = BENTO[i];
              const dark = b.tone === 'dark';
              return (
                <HomeLink
                  key={title}
                  to={to}
                  data-reveal
                  style={delay((i % 3) * 80)}
                  className={`hv-lift group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-8 ${b.span} ${b.card}`}
                >
                  <span className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${b.icon}`}>
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className={`relative mt-6 font-extrabold ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-xl'} ${dark ? 'text-white' : 'text-navy-950'}`}>
                    {title}
                  </h3>
                  <p className={`relative mt-2 max-w-md text-[15px] ${i === 0 ? '' : 'flex-1'} leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>
                    {description}
                  </p>
                  <BentoArt index={i} />
                  <span className={`relative mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${dark ? 'text-brand-300' : 'text-brand-700'}`}>
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </HomeLink>
              );
            })}
          </div>

          <p data-reveal className="mt-10 text-center text-[15px] text-neutral-600">
            Also available:{' '}
            <HomeLink to="/membership" className={inlineLink}>
              Membership
            </HomeLink>{' '}
            and{' '}
            <HomeLink to="/money-pool" className={inlineLink}>
              Money Pool
            </HomeLink>{' '}
            for group fundraising.
          </p>
        </div>
      </section>

      {/* 5. DONATION FORM -------------------------------------------- */}
      <section aria-labelledby="forms-title" className={`${SECTION} bg-soft`}>
        <div aria-hidden="true" className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className={`${CONTAINER} relative grid items-center gap-20 lg:grid-cols-2`}>
          <div className="space-y-10">
            <SectionHeader
              align="left"
              id="forms-title"
              eyebrow="Online donations"
              title="Donation forms that donors actually finish"
              description="A clear two-step checkout with your branding, the payment methods your supporters prefer and receipts sent automatically."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Palette, title: 'Your brand', text: 'Match your colours, fonts and imagery.' },
                { icon: Code2, title: 'Embed anywhere', text: 'WordPress, Webflow, Squarespace or custom sites.' },
                { icon: Percent, title: 'Donors cover fees', text: 'Optional fee cover so you receive the full gift.' },
                { icon: Receipt, title: 'Instant receipts', text: 'Country-specific tax receipts, sent automatically.' },
              ].map(({ icon: Icon, title, text }, i) => (
                <div
                  key={title}
                  data-reveal
                  style={delay(i * 70)}
                  className="hv-lift rounded-2xl border border-white bg-white/70 p-5 shadow-[0_10px_30px_-20px_rgb(0_24_64/0.35)] backdrop-blur"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{text}</p>
                </div>
              ))}
            </div>
            <div data-reveal>
              <TextLink to="/donations">Explore online donations</TextLink>
            </div>
          </div>
          <div data-reveal style={delay(120)} className="relative px-4 sm:px-8 lg:px-0">
            {/* Donor photo layered behind the form */}
            <Photo
              {...SECTION_PHOTOS.donateOnline}
              className="absolute bottom-10 right-0 top-10 hidden w-[52%] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_24_64/0.55)] lg:block"
              overlay="bg-gradient-to-l from-transparent to-navy-950/25"
            />
            <div className="relative lg:w-[80%]">
              <DonationFormPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECURRING -------------------------------------------------- */}
      <section aria-labelledby="recurring-title" className={`${SECTION} hv-dark-bg overflow-hidden text-white`}>
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative grid items-center gap-20 lg:grid-cols-2`}>
          <div data-reveal className="order-2 lg:order-1">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-8 -z-0 rounded-[3rem] bg-gradient-to-br from-brand-600/40 to-brand-300/10 blur-2xl" />
              {/* Monthly-giving photo behind the recurring plans panel */}
              <Photo
                {...SECTION_PHOTOS.recurring}
                className="relative mb-[-5rem] aspect-[16/10] w-full rounded-[2rem] ring-1 ring-white/10 sm:w-[78%] lg:mb-[-7rem]"
                overlay="bg-gradient-to-b from-transparent via-transparent to-navy-950/70"
              />
              <div className="relative ml-auto [&_figcaption_span]:!border-white/15 [&_figcaption_span]:!bg-white/5 [&_figcaption_span]:!text-white/60 sm:w-[88%]">
                <RecurringPreview />
              </div>
            </div>
          </div>
          <div className="order-1 space-y-10 lg:order-2">
            <SectionHeader
              tone="dark"
              align="left"
              id="recurring-title"
              eyebrow="Recurring giving"
              title="Predictable income, without chasing payments"
              description="Turn one-off supporters into monthly donors and let Donorfit handle the collections, retries and changes."
            />
            <div data-reveal>
              <CheckList
                tone="dark"
                items={[
                  <>
                    <strong className="font-semibold text-white">SEPA mandates handled for you</strong> — including
                    pre-notifications and bank file exports.
                  </>,
                  <>
                    <strong className="font-semibold text-white">Failed payments retried automatically</strong>, with card
                    details refreshed when cards are replaced.
                  </>,
                  <>
                    <strong className="font-semibold text-white">Donor self-service</strong> — supporters update bank details,
                    change amounts or pause instead of cancelling.
                  </>,
                  <>
                    <strong className="font-semibold text-white">Upgrade prompts</strong> that invite loyal donors to increase
                    their gift.
                  </>,
                ]}
              />
            </div>
            <div data-reveal>
              <TextLink tone="dark" to="/recurring-giving">
                Explore recurring giving
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAMPAIGNS -------------------------------------------------- */}
      <section aria-labelledby="campaigns-title" className={`${SECTION} hv-aqua-bg`}>
        <div className={CONTAINER}>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              align="left"
              id="campaigns-title"
              eyebrow="Campaigns"
              title="Appeals that build momentum"
              description="Launch a campaign page in minutes, show live progress toward your goal and give supporters a reason to share."
            />
            <div data-reveal>
              <TextLink to="/campaign-management">Explore campaigns</TextLink>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-5">
            {[featured, ...restCampaigns].map(({ icon: Icon, title, tag, raised, goal, supporters, daysLeft }, i) => {
              const pct = Math.min(100, Math.round((raised / goal) * 100));
              const isFeatured = i === 0;
              return (
                <article
                  key={title}
                  data-reveal
                  style={delay(i * 90)}
                  className={`hv-lift overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-[0_20px_50px_-35px_rgb(0_24_64/0.5)] ${
                    isFeatured ? 'lg:col-span-3 lg:row-span-2 lg:grid lg:grid-cols-2' : 'lg:col-span-2 lg:grid lg:grid-cols-[9rem_1fr]'
                  }`}
                >
                  <Photo
                    {...[SECTION_PHOTOS.campaignFood, SECTION_PHOTOS.campaignWinter, SECTION_PHOTOS.campaignClassroom][i]}
                    className={`relative ${isFeatured ? 'h-56 lg:h-full' : 'h-40 lg:h-full'}`}
                    overlay="bg-gradient-to-t from-navy-950/60 via-navy-950/5 to-navy-950/25"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-5 top-5 flex items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur ${
                        isFeatured ? 'h-14 w-14' : 'h-11 w-11'
                      }`}
                    >
                      <Icon className={isFeatured ? 'h-7 w-7' : 'h-5 w-5'} />
                    </span>
                    <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-navy-900">
                      {tag}
                    </span>
                  </Photo>
                  <div className={`flex flex-col justify-center space-y-4 ${isFeatured ? 'p-7 sm:p-9' : 'p-6'}`}>
                    <h3 className={`font-extrabold text-navy-950 ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{title}</h3>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <span className={`hv-display font-extrabold tabular-nums text-navy-950 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                          {eur(raised)}
                        </span>
                        <span className="text-sm tabular-nums text-neutral-500">of {eur(goal)}</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={`${title} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                        className={`mt-3 overflow-hidden rounded-full bg-brand-100 ${isFeatured ? 'h-3' : 'h-2.5'}`}
                      >
                        <div className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-brand-100 pt-4 text-xs text-neutral-500">
                      <span>
                        <strong className="font-semibold tabular-nums text-navy-900">{pct}%</strong> funded
                      </span>
                      <span>
                        <strong className="font-semibold tabular-nums text-navy-900">{int(supporters)}</strong> supporters
                      </span>
                      <span>
                        <strong className="font-semibold tabular-nums text-navy-900">{daysLeft}</strong> days left
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-5 flex justify-center">
            <SampleBadge label="Example campaigns · sample data" />
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, text: 'Goals & live progress bars' },
              { icon: BadgeCheck, text: 'Automatic milestone emails' },
              { icon: HandCoins, text: 'Matched giving from sponsors' },
              { icon: QrCode, text: 'Tracking links & QR codes' },
            ].map(({ icon: Icon, text }, i) => (
              <li
                key={text}
                data-reveal
                style={delay(i * 60)}
                className="flex items-center gap-3 rounded-2xl border border-white bg-white/70 px-4 py-4 text-sm font-semibold text-navy-900 shadow-xs backdrop-blur"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. PAYMENTS --------------------------------------------------- */}
      <section aria-labelledby="payments-title" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="hv-vibrant-bg relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-white shadow-[0_40px_90px_-40px_rgb(0_24_64/0.8)] sm:px-12 sm:py-24 lg:px-16">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full border-[40px] border-white/5" />
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div className="space-y-9">
              <SectionHeader
                tone="dark"
                align="left"
                id="payments-title"
                eyebrow="Payments"
                title="Every way your supporters want to give"
                description="Accept bank payments, cards and wallets through trusted gateways, with funds paid directly to your organisation’s bank account."
              />
              <div data-reveal>
                <CheckList
                  tone="dark"
                  items={[
                    'No Donorfit platform fee or transaction fee on the core platform.',
                    'Donors can choose to cover processing fees.',
                    'Multi-currency checkout in EUR, GBP, USD, CHF and more.',
                  ]}
                />
              </div>
              <div data-reveal className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-white/70">Payment gateways:</span>
                {['Stripe', 'PayPal'].map((g) => (
                  <span key={g} className="rounded-full bg-white px-4 py-1.5 font-bold text-navy-950" translate="no">
                    {g}
                  </span>
                ))}
              </div>
              <div data-reveal>
                <TextLink tone="dark" to="/pricing">
                  See pricing
                </TextLink>
              </div>
            </div>

            <div className="grid gap-4">
              <Photo
                {...SECTION_PHOTOS.payments}
                className="relative aspect-[2/1] w-full rounded-3xl ring-1 ring-white/15"
                overlay="bg-gradient-to-t from-navy-950/50 to-transparent"
              />
              {PAYMENT_GROUPS.map(({ icon: Icon, title, items }, i) => (
                <div
                  key={title}
                  data-reveal
                  style={delay(i * 90)}
                  className={`hv-glass rounded-3xl p-6 ${i === 1 ? 'lg:translate-x-8' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-300 text-navy-950">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {items.map((m) => (
                      <li key={m} className="rounded-xl border border-white/15 bg-navy-950/30 px-3.5 py-2 text-sm font-semibold text-white" translate="no">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. INTEGRATIONS ---------------------------------------------- */}
      <section aria-labelledby="integrations-title" className={SECTION}>
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-96 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-aqua),transparent)]" />
        <div className={`${CONTAINER} relative`}>
          <SectionHeader
            id="integrations-title"
            eyebrow="Integrations"
            title="Works with the tools you already use"
            description="Connect payments, accounting and your website — and take your data with you whenever you need it."
          />
          <div data-reveal className="mt-16">
            <IntegrationHub />
          </div>
          <div data-reveal className="mt-12 text-center">
            <TextLink to="/partners">See partners & integrations</TextLink>
          </div>
        </div>
      </section>

      {/* 10. SOLUTIONS (editorial rows) ------------------------------- */}
      <section aria-labelledby="solutions-title" className={`${SECTION} bg-soft`}>
        <div className={CONTAINER}>
          <SectionHeader
            id="solutions-title"
            eyebrow="Solutions"
            title="Made for the way your organisation works"
            description="Whether you run international programmes or serve a local community, Donorfit adapts to you."
          />
          <div className="mt-16 overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white">
            {SOLUTIONS.map(({ icon: Icon, title, description, points, to }, i) => (
              <HomeLink
                key={title}
                to={to}
                data-reveal
                style={delay(i * 70)}
                className="group relative grid items-center gap-5 border-b border-neutral-100 p-7 transition-colors last:border-b-0 hover:bg-aqua sm:p-9 lg:grid-cols-[10rem_minmax(0,1.1fr)_minmax(0,1.2fr)_3rem] lg:gap-10"
              >
                <Photo
                  {...[SECTION_PHOTOS.solutionNgo, SECTION_PHOTOS.solutionTrust, SECTION_PHOTOS.solutionMasjid, SECTION_PHOTOS.solutionCharities][i]}
                  className="relative aspect-[16/9] w-full rounded-2xl ring-1 ring-neutral-200 lg:aspect-[4/3]"
                />
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-brand-300 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-extrabold text-navy-950">{title}</h3>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-neutral-600">{description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {points.map((p) => (
                      <li key={p} className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1 text-xs font-semibold text-brand-800">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-neutral-200 text-navy-900 transition-[background-color,border-color,color,transform] group-hover:-rotate-12 group-hover:border-brand-300 group-hover:bg-brand-300 motion-reduce:transition-none lg:flex">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </HomeLink>
            ))}
          </div>
          <p data-reveal className="mt-10 text-center text-[15px] text-neutral-600">
            Also for{' '}
            <HomeLink to="/solutions/sponsorship-organizations" className={inlineLink}>
              sponsorship organisations
            </HomeLink>
            ,{' '}
            <HomeLink to="/solutions/membership-organizations" className={inlineLink}>
              membership associations
            </HomeLink>{' '}
            and{' '}
            <HomeLink to="/solutions/international-organizations" className={inlineLink}>
              international organisations
            </HomeLink>
            .
          </p>
        </div>
      </section>

      {/* 11. CUSTOMER STORIES ----------------------------------------- */}
      <section aria-labelledby="stories-title" className={`${SECTION} hv-dark-bg overflow-hidden text-white`}>
        <div aria-hidden="true" className="hv-display pointer-events-none absolute left-4 top-6 select-none text-[16rem] sm:left-12 font-extrabold leading-none text-white/[0.04]">
          “
        </div>
        <div className={`${CONTAINER} relative`}>
          <SectionHeader tone="dark" id="stories-title" eyebrow="Customer stories" title="Stories from the organisations we serve" />
          {SUCCESS_STORIES.length > 0 ? (
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SUCCESS_STORIES.map((s) => (
                <article key={s.organisation} data-reveal className="hv-glass flex flex-col rounded-3xl p-7">
                  <div className="text-xs font-semibold text-brand-300">{s.sector}</div>
                  <h3 className="mt-2 text-xl font-bold text-white">{s.organisation}</h3>
                  <p className="mt-3 flex-1 text-sm text-white/70">{s.summary}</p>
                  {s.outcomes && s.outcomes.length > 0 && (
                    <dl className="mt-6 grid grid-cols-2 gap-3">
                      {s.outcomes.map((o) => (
                        <div key={o.label} className="rounded-xl bg-white/5 p-3">
                          <dt className="text-xs text-white/60">{o.label}</dt>
                          <dd className="text-lg font-extrabold tabular-nums text-white">{o.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {s.quote && (
                    <blockquote className="mt-6 border-l-2 border-brand-300 pl-4 text-sm text-white/80">
                      “{s.quote.text}”
                      <footer className="mt-2 text-xs text-white/55">
                        — {s.quote.author}, {s.quote.role}
                      </footer>
                    </blockquote>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div data-reveal className="hv-glass relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] p-8 text-center sm:p-14">
              <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent" />
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-300 text-navy-950 shadow-[0_0_40px_-8px_rgb(0_160_160/0.6)]">
                <MessageSquareQuote className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-2xl font-bold text-white">Customer stories are on their way</h3>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
                We’re preparing our first stories together with the organisations behind them, and we only publish results
                they’ve confirmed. In the meantime, see how Donorfit would work for your own organisation.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-primary">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Book a Demo
                </button>
                <HomeLink to="/contact" className="hv-btn hv-btn-ghost">
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  Share Your Story With Us
                </HomeLink>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 12. FAQ ------------------------------------------------------- */}
      <section aria-labelledby="faq-title" className={SECTION}>
        <div className={`${CONTAINER} grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              align="left"
              id="faq-title"
              eyebrow="FAQ"
              title="Questions, answered"
              description="Everything you need to know before getting started."
            />
            <div data-reveal className="flex flex-wrap gap-x-7 gap-y-3">
              <TextLink to="/faqs">All FAQs</TextLink>
              <TextLink to="/contact">Contact our team</TextLink>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                data-reveal
                style={delay(Math.min(i, 4) * 50)}
                className="group rounded-2xl border border-neutral-200 bg-white transition-[background-color,border-color,box-shadow] open:border-brand-200 open:bg-aqua open:shadow-[0_20px_40px_-30px_rgb(0_24_64/0.5)]"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-base font-bold text-navy-950 transition-colors hover:text-brand-700 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{faq.question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-brand-300 transition-[transform,background-color,color] group-open:rotate-45 group-open:bg-brand-600 group-open:text-white motion-reduce:transition-none">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-6 pb-6 pr-16 text-[15px] leading-relaxed text-neutral-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA ------------------------------------------------- */}
      <section aria-labelledby="cta-title" className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div data-reveal className="hv-hero-bg relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          {/* Community backdrop, darkened so the text keeps strong contrast */}
          <Photo {...SECTION_PHOTOS.ctaCommunity} className="absolute inset-0 -z-10 !bg-transparent opacity-40 mix-blend-luminosity" overlay="bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950/80" />
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div aria-hidden="true" className="hv-drift absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/35 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-[36px] border-brand-300/10" />
          <div aria-hidden="true" className="absolute -right-16 top-10 h-48 w-48 rounded-full border border-dashed border-white/15" />

          <div className="relative">
            <h2 id="cta-title" className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Give your team more time for <span className="hv-gradient-text">the mission</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              Register your organisation and start accepting donations — most charities are live within one to two business
              days.
            </p>
            <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={() => openGetStarted()} className="hv-btn hv-btn-primary px-9 py-4.5 text-base">
                Get Started Free
                <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-ghost px-9 py-4.5 text-base">
                Book a Demo
              </button>
            </div>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/75">
              {['€0 per month core platform', 'No platform or transaction fee', 'Export your data anytime'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-300 text-navy-950">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
