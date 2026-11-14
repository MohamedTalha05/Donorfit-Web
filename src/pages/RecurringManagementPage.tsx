import React from 'react';
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Repeat,
  CalendarClock,
  ListChecks,
  IdCard,
  HeartHandshake,
  History,
  KeyRound,
  RefreshCcw,
  HandHeart,
  LayoutDashboard,
  ClipboardList,
  Users,
  FileSearch,
  Plug,
  CheckCircle2,
  HelpCircle,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { useFormat, useT, useTx } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import { APP_SIGNUP_URL } from '../data/links.ts';
import { PAYMENT_INTEGRATIONS, integrationPath, getIntegration } from '../data/integrations.ts';
import { CONTAINER, PSection, SectionTitle } from '../components/product/ProductKit.tsx';

/**
 * Recurring payments are explicitly documented only for GoCardless
 * (integrations.json → pages.gocardless.offered: "One-off and recurring payments").
 * Move a provider into this list only once recurring support is confirmed.
 */
const RECURRING_DOCUMENTED = ['gocardless'];

/** Feature cards (recurring:features.items.<key>), all taken from existing product copy. */
const FEATURES: { key: string; icon: LucideIcon }[] = [
  { key: 'contributions', icon: Repeat },
  { key: 'schedules', icon: CalendarClock },
  { key: 'tracking', icon: ListChecks },
  { key: 'membership', icon: IdCard },
  { key: 'sponsorship', icon: HeartHandshake },
  { key: 'history', icon: History },
  { key: 'authorisation', icon: KeyRound },
  { key: 'management', icon: RefreshCcw },
];

const AREA_LINKS = [
  { icon: HandHeart, to: '/solutions/for-charities' },
  { icon: IdCard, to: '/membership' },
  { icon: HeartHandshake, to: '/sponsorship' },
];
const BENEFIT_ICONS = [LayoutDashboard, ClipboardList, Repeat, Users, FileSearch, Plug];

const scrollToHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ------------------------------------------------------------------ */
/* Hero visual: the recurring cycle + example upcoming contributions   */
/* ------------------------------------------------------------------ */

function RecurringCycle() {
  const t = useT('recurring');
  const tx = useTx('recurring');
  const { eur, date } = useFormat();
  const cycle = tx<string[]>('hero.cycle');
  // Node positions around the ring: top, right, bottom, left.
  const pos = ['left-1/2 top-0 -translate-x-1/2 -translate-y-1/2', 'right-0 top-1/2 translate-x-1/4 -translate-y-1/2', 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', 'left-0 top-1/2 -translate-x-1/4 -translate-y-1/2'];
  return (
    <figure aria-label={t('hero.visualLabel')} className="relative mx-auto w-full max-w-[30rem] pt-6 sm:pb-24">
      <div className="relative mx-auto aspect-square w-[74%] sm:mr-6 sm:w-[68%]">
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-brand-200)" strokeWidth="2" />
          <g className="origin-center motion-safe:animate-[spin_60s_linear_infinite]">
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-brand-500)" strokeWidth="2.5" strokeDasharray="60 493" strokeLinecap="round" />
          </g>
          {/* direction arrows on the ring */}
          {[45, 135, 225, 315].map((a) => (
            <g key={a} transform={`rotate(${a} 100 100)`}>
              <path d="M 100 12 l -4 -3.5 M 100 12 l -4 3.5" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ))}
        </svg>
        <div className="absolute inset-[25%] flex flex-col items-center justify-center rounded-full bg-navy-950 text-center text-white shadow-[0_24px_60px_-20px_rgb(0_24_64/0.6)]">
          <Repeat className="h-6 w-6 text-brand-300 sm:h-8 sm:w-8" aria-hidden="true" />
          <span className="mt-1.5 px-2 text-xs font-bold leading-tight [hyphens:none] sm:mt-2 sm:px-3 sm:text-sm">{t('hero.centre')}</span>
        </div>
        <ol>
          {cycle.map((label, i) => (
            <li key={label} className={`absolute ${pos[i]} flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-xs font-bold text-navy-950 shadow-md ring-1 ring-brand-200 [hyphens:none] [overflow-wrap:normal] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm`}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] text-white sm:h-6 sm:w-6 sm:text-xs">{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>

      {/* Example schedule */}
      <div aria-hidden="true" className="relative mx-auto mt-12 w-[15.5rem] rounded-2xl sm:absolute sm:bottom-0 sm:left-0 sm:mx-0 sm:mt-0 sm:w-[14.5rem] bg-white p-4 shadow-[0_30px_60px_-30px_rgb(0_24_64/0.55)] ring-1 ring-neutral-200 sm:-left-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-navy-950">{t('hero.upcoming')}</p>
          <span className="whitespace-nowrap rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">{t('hero.example')}</span>
        </div>
        <ul className="mt-3 space-y-2">
          {['2026-12-01', '2027-01-01', '2027-02-01'].map((d) => (
            <li key={d} className="flex items-center justify-between gap-2 text-sm">
              <span className="whitespace-nowrap tabular-nums text-neutral-600">{date(d, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span className="whitespace-nowrap font-semibold tabular-nums text-navy-950">{t('hero.monthly', { amount: eur(25) })}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-aqua px-2.5 py-0.5 text-xs font-semibold text-brand-800">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t('hero.status')}
        </p>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */

export default function RecurringManagementPage() {
  const t = useT('recurring');
  const tx = useTx('recurring');
  const tix = useTx('integrations');
  const ti = useT('integrations');
  const ts = useTx('solutions');

  const introBody = tx<string[]>('intro.body');
  const areas = tx<{ title: string; text: string }[]>('intro.areas');
  const steps = tx<{ title: string; text: string }[]>('steps.items');
  const benefits = tx<{ title: string; text: string }[]>('benefits.items');
  const faqs = tx<{ question: string; answer: string }[]>('faq.items');

  const documented = PAYMENT_INTEGRATIONS.filter((p) => RECURRING_DOCUMENTED.includes(p.id));
  const toConfirm = PAYMENT_INTEGRATIONS.filter((p) => !RECURRING_DOCUMENTED.includes(p.id));

  const relatedLinks = [
    { to: '/solutions/for-membership-orgs', label: ts<string>('items.for-membership-orgs.navLabel') },
    { to: '/solutions/for-sponsorship-orgs', label: ts<string>('items.for-sponsorship-orgs.navLabel') },
    { to: '/solutions/for-charities', label: ts<string>('items.for-charities.navLabel') },
    { to: '/payment-gateways', label: t('gateways.allGateways') },
  ];

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* 1. Hero */}
      <section aria-labelledby="rm-hero" className="relative bg-gradient-to-b from-aqua to-white pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200">
              <Repeat className="h-4 w-4" aria-hidden="true" />
              {t('hero.badge')}
            </span>
            <h1 id="rm-hero" className="mt-6 text-[2.4rem] font-extrabold leading-[1.04] text-navy-950 sm:text-[3.5rem]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{t('hero.body')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={scrollToHow} className="hv-btn hv-btn-primary">
                {t('hero.explore')} <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <a href={APP_SIGNUP_URL} className="hv-btn hv-btn-outline">
                {t('hero.start')}
              </a>
            </div>
          </div>
          <RecurringCycle />
        </div>
      </section>

      {/* 2. Introduction */}
      <PSection labelledBy="rm-intro">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20`}>
          <div>
            <h2 id="rm-intro" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
              {t('intro.title')}
            </h2>
            {introBody.map((p) => (
              <p key={p} className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-4 self-center">
            {areas.map((a, i) => {
              const { icon: Icon, to } = AREA_LINKS[i];
              return (
                <li key={a.title}>
                  <HomeLink to={to} className="group flex gap-5 rounded-[1.5rem] border border-neutral-200 bg-soft p-6 hover:border-brand-300 hover:bg-white">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-brand-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-navy-950 group-hover:text-brand-800">{a.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-neutral-600">{a.text}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 group-hover:text-brand-700" aria-hidden="true" />
                  </HomeLink>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* 3. How it works */}
      <PSection id="how-it-works" tone="soft" labelledBy="rm-steps">
        <div className={CONTAINER}>
          <SectionTitle id="rm-steps" title={t('steps.title')} sub={t('steps.sub')} />
          <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-10 right-10 top-12 hidden h-px bg-brand-300 lg:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-[1.5rem] bg-white p-7 ring-1 ring-neutral-200">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white ring-4 ring-soft">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </PSection>

      {/* 4. Features */}
      <PSection labelledBy="rm-features">
        <div className={CONTAINER}>
          <SectionTitle id="rm-features" title={t('features.title')} sub={t('features.sub')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ key, icon: Icon }) => (
              <li key={key} className="hv-lift flex flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-6 hover:border-brand-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aqua text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{t(`features.items.${key}.title`)}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-neutral-600">{t(`features.items.${key}.text`)}</p>
                <p className="mt-4 w-fit rounded-full bg-soft px-2.5 py-0.5 text-xs font-semibold text-neutral-600 ring-1 ring-neutral-200">{t(`features.items.${key}.where`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      {/* 5. Gateways */}
      <PSection tone="soft" labelledBy="rm-gateways">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle id="rm-gateways" title={t('gateways.title')} sub={t('gateways.sub')} />
            <HomeLink to="/payment-gateways" className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
              {t('gateways.allGateways')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
            {/* Documented */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-navy-950">
                <CheckCircle2 className="h-5 w-5 text-brand-700" aria-hidden="true" />
                {t('gateways.documentedTitle')}
              </h3>
              <p className="mt-1.5 text-[15px] text-neutral-600">{t('gateways.documentedText')}</p>
              {documented.map((p) => (
                <article key={p.id} className="mt-5 rounded-[1.5rem] border-2 border-brand-300 bg-white p-7">
                  <div className="flex h-16 items-center justify-center rounded-xl bg-soft ring-1 ring-neutral-200">
                    <img src={p.logo} alt={t('gateways.logoAlt', { name: p.name })} loading="lazy" className={`${p.logoH} w-auto max-w-[60%] object-contain`} />
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-navy-950" translate="no">
                    {p.name}
                  </h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{t('gateways.recurringNote')}</p>
                  <p className="mt-4 text-sm font-bold text-navy-950">{t('gateways.methods')}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {(tix<string[]>(`pages.${p.id}.offered`) ?? []).map((o) => (
                      <li key={o} className="rounded-full bg-aqua px-3 py-1 text-sm font-medium text-brand-900">
                        {o}
                      </li>
                    ))}
                  </ul>
                  <HomeLink to={integrationPath(p.id)} aria-label={t('gateways.learnMoreAria', { name: p.name })} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
                    {t('gateways.learnMore')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </HomeLink>
                </article>
              ))}
            </div>

            {/* To confirm */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-navy-950">
                <HelpCircle className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                {t('gateways.checkTitle')}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{t('gateways.checkText')}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {toConfirm.map((p) => (
                  <li key={p.id} className="flex flex-col rounded-[1.5rem] border border-dashed border-neutral-300 bg-white p-5">
                    <div className="flex h-12 items-center">
                      <img src={p.logo} alt={t('gateways.logoAlt', { name: p.name })} loading="lazy" className={`${p.logoH} max-h-7 w-auto max-w-[9rem] object-contain`} />
                    </div>
                    <h4 className="mt-3 font-bold text-navy-950" translate="no">
                      {p.name}
                    </h4>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-neutral-600">{ti(`providers.${p.id}`)}</p>
                    <HomeLink to={integrationPath(p.id)} aria-label={t('gateways.learnMoreAria', { name: p.name })} className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-900">
                      {t('gateways.learnMore')} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </HomeLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PSection>

      {/* 6. Benefits */}
      <PSection tone="aqua" labelledBy="rm-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="rm-benefits" title={t('benefits.title')} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Repeat;
              return (
                <li key={b.title} className="flex gap-4 rounded-[1.5rem] bg-white p-6 ring-1 ring-brand-200">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-950">{b.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{b.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <h3 className="mt-14 text-lg font-bold text-navy-950">{t('benefits.linksTitle')}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((l) => (
              <li key={l.to}>
                <HomeLink to={l.to} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[15px] font-semibold text-navy-950 ring-1 ring-brand-200 hover:ring-brand-500">
                  {l.label} <ArrowUpRight className="h-4 w-4 text-brand-700" aria-hidden="true" />
                </HomeLink>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      {/* 7. Pricing */}
      <PSection labelledBy="rm-pricing">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20`}>
          <div>
            <SectionTitle id="rm-pricing" title={t('pricing.title')} sub={t('pricing.body')} />
            <HomeLink to="/pricing" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
              {t('pricing.link')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <div className="grid gap-4 self-center sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-navy-950 p-7 text-white">
              <h3 className="text-lg font-bold">{t('pricing.platformTitle')}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{t('pricing.platformText')}</p>
            </div>
            <div className="rounded-[1.5rem] border border-neutral-200 bg-soft p-7">
              <h3 className="text-lg font-bold text-navy-950">{t('pricing.providerTitle')}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{t('pricing.providerText')}</p>
            </div>
          </div>
        </div>
      </PSection>

      {/* 8. FAQ */}
      <PSection tone="soft" labelledBy="rm-faq">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="rm-faq" title={t('faq.title')} sub={t('faq.sub')} />
            <HomeLink to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
              {t('faq.contact')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <div className="space-y-3">
            {faqs.map((q, i) => (
              <details key={q.question} open={i === 0} className="group rounded-2xl border border-neutral-200 bg-white open:border-brand-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-base font-bold text-navy-950 hover:text-brand-700 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <h3 className="min-w-0">{q.question}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-950 text-white transition-transform group-open:rotate-45 motion-reduce:transition-none">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-6 pb-6 pr-14 text-[15px] leading-relaxed text-neutral-600">{q.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </PSection>

      {/* 9. Final CTA */}
      <section aria-labelledby="rm-cta" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <Repeat aria-hidden="true" className="absolute -bottom-10 -right-6 h-64 w-64 text-white/[0.05]" strokeWidth={1} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="rm-cta" className="text-3xl font-extrabold leading-[1.08] sm:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('cta.body')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href={APP_SIGNUP_URL} className="hv-btn hv-btn-primary">
                {t('cta.primary')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <HomeLink to="/contact" className="hv-btn hv-btn-ghost">
                {t('cta.secondary')}
              </HomeLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
