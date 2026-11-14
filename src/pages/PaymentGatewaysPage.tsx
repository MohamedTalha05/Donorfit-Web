import React from 'react';
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  ArrowLeftRight,
  MapPin,
  Globe2,
  Coins,
  ListChecks,
  ShieldCheck,
  BadgeCheck,
  Percent,
  HandCoins,
  HandHeart,
  PiggyBank,
  IdCard,
  HeartHandshake,
  Droplets,
  Moon,
  Layers,
  Users,
  SlidersHorizontal,
  Workflow,
  LayoutDashboard,
  Info,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { useT, useTx } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import BrandLogo from '../components/BrandLogo.tsx';
import { APP_SIGNUP_URL } from '../data/links.ts';
import { PAYMENT_INTEGRATIONS, integrationPath, getIntegration, type Integration } from '../data/integrations.ts';
import { PRODUCT_META, type ProductSlug } from '../data/productPages.ts';
import { SOLUTION_ICONS, SOLUTION_ORDER, solutionRoute } from '../data/solutions.ts';
import { CONTAINER, PSection, SectionTitle } from '../components/product/ProductKit.tsx';

/**
 * Payment methods and the providers that offer them. Source: the "offered" lists on the
 * provider integration pages (src/locales/<lang>/integrations.json → pages.<id>.offered).
 * Keep both in sync if a provider's offer changes. UPI is not offered by any integrated provider.
 */
const METHODS: { key: string; icon: LucideIcon; providers: string[] }[] = [
  { key: 'cards', icon: CreditCard, providers: ['stripe', 'mollie', 'micropayment'] },
  { key: 'wallets', icon: Smartphone, providers: ['stripe', 'mollie'] },
  { key: 'debit', icon: Landmark, providers: ['stripe', 'gocardless', 'mollie', 'micropayment'] },
  { key: 'paypal', icon: Wallet, providers: ['paypal'] },
  { key: 'transfer', icon: ArrowLeftRight, providers: ['micropayment'] },
  { key: 'local', icon: MapPin, providers: ['mollie'] },
];

/** Fundraising activities that use the connected gateway (gateways:uses.items.<key>). */
const USES: { key: 'donations' | ProductSlug; icon: LucideIcon; route?: string }[] = [
  { key: 'donations', icon: HandHeart, route: '/solutions/for-charities' },
  { key: 'money-pool', icon: PiggyBank },
  { key: 'membership', icon: IdCard },
  { key: 'sponsorship', icon: HeartHandshake },
  { key: 'water-well', icon: Droplets },
  { key: 'qurbani', icon: Moon },
];

const WHY_ICONS = [Layers, Users, SlidersHorizontal, Workflow, Globe2, LayoutDashboard];
const CHECK_ICONS = [Globe2, Coins, CreditCard, ShieldCheck];

const scrollToGateways = () => document.getElementById('gateways')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ------------------------------------------------------------------ */
/* Hero visual: providers → Donorfit → fundraising activities          */
/* ------------------------------------------------------------------ */

function GatewayHub() {
  const t = useT('gateways');
  const tc = useT('common');
  const tf = useT('footer');
  const uses = USES.map((u) => ({ ...u, label: u.key === 'donations' ? tf('links.donations') : tc(`products.${u.key}`) }));
  // Row centres (in %) for the connector lines on large screens.
  const left = PAYMENT_INTEGRATIONS.map((_, i, a) => 10 + (80 * i) / (a.length - 1));
  const right = uses.map((_, i, a) => 8 + (84 * i) / (a.length - 1));
  return (
    <figure role="img" aria-label={t('hero.visualLabel')} className="relative rounded-[2rem] bg-white p-5 shadow-[0_40px_80px_-50px_rgb(0_24_64/0.55)] ring-1 ring-brand-200 sm:p-7">
      <div className="relative grid gap-6 lg:h-[27rem] lg:grid-cols-[8rem_1fr_9.5rem] lg:gap-0">
        {/* connector lines (large screens) */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
          <g fill="none" strokeWidth="1.25" vectorEffect="non-scaling-stroke">
            {left.map((y, i) => (
              <path key={`l${i}`} d={`M 22 ${y} C 38 ${y}, 38 50, 50 50`} stroke="var(--color-brand-300)" vectorEffect="non-scaling-stroke" />
            ))}
            {right.map((y, i) => (
              <path key={`r${i}`} d={`M 50 50 C 62 50, 62 ${y}, 74.5 ${y}`} stroke="var(--color-navy-700)" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </svg>

        <div className="relative">
          <p className="mb-2 text-xs font-semibold text-neutral-500 lg:sr-only">{t('hero.visualProviders')}</p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:flex lg:h-full lg:flex-col lg:justify-between">
            {PAYMENT_INTEGRATIONS.map((p) => (
              <li key={p.id} className="flex h-12 items-center justify-center rounded-xl bg-white px-2 ring-1 ring-neutral-200 lg:h-14">
                <img src={p.logo} alt="" draggable={false} className={`${p.logoH} max-h-7 w-auto max-w-[85%] scale-90 object-contain`} />
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <ArrowDown className="mb-3 h-5 w-5 text-brand-500 lg:hidden" aria-hidden="true" />
          <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-navy-950 shadow-[0_20px_50px_-15px_rgb(0_122_128/0.7)] ring-4 ring-brand-500/25">
            <BrandLogo variant="icon" className="h-10 brightness-0 invert" alt="" />
          </span>
          <span className="mt-3 rounded-full bg-aqua px-3 py-1 text-xs font-bold text-brand-800">{t('hero.visualPlatform')}</span>
          <ArrowDown className="mt-3 h-5 w-5 text-brand-500 lg:hidden" aria-hidden="true" />
        </div>

        <div className="relative">
          <p className="mb-2 text-xs font-semibold text-neutral-500 lg:sr-only">{t('hero.visualUses')}</p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:h-full lg:flex-col lg:justify-between">
            {uses.map(({ key, icon: Icon, label }) => (
              <li key={key} className="flex h-11 items-center gap-2 rounded-xl bg-soft px-3 text-sm font-semibold text-navy-950 ring-1 ring-neutral-200">
                <Icon className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */

export default function PaymentGatewaysPage() {
  const t = useT('gateways');
  const tx = useTx('gateways');
  const tix = useTx('integrations');
  const tc = useT('common');
  const ts = useTx('solutions');

  const introBody = tx<string[]>('intro.body');
  const facts = tx<{ title: string; text: string }[]>('intro.facts');
  const globalBody = tx<string[]>('global.body');
  const checks = tx<{ title: string; text: string }[]>('global.checks');
  const steps = tx<{ title: string; text: string }[]>('steps.items');
  const needs = tx<string[]>('steps.needs');
  const why = tx<{ title: string; text: string }[]>('why.items');
  const pricingPoints = tx<{ title: string; text: string }[]>('pricing.points');
  const faqs = tx<{ question: string; answer: string }[]>('faq.items');

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* 1. Hero */}
      <section aria-labelledby="pg-hero" className="relative bg-gradient-to-b from-aqua to-white pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-14`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              {t('hero.badge')}
            </span>
            <h1 id="pg-hero" className="mt-6 text-[2.4rem] font-extrabold leading-[1.04] text-navy-950 sm:text-[3.5rem]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{t('hero.body')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={scrollToGateways} className="hv-btn hv-btn-primary">
                {t('hero.explore')} <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <a href={APP_SIGNUP_URL} className="hv-btn hv-btn-outline">
                {t('hero.start')}
              </a>
            </div>
          </div>
          <GatewayHub />
        </div>
      </section>

      {/* 2. Introduction */}
      <PSection labelledBy="pg-intro">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20`}>
          <div>
            <h2 id="pg-intro" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
              {t('intro.title')}
            </h2>
            {introBody.map((p) => (
              <p key={p} className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-4 self-center">
            {facts.map((f, i) => {
              const Icon = [Layers, CreditCard, BadgeCheck][i] ?? Layers;
              return (
                <li key={f.title} className="flex gap-5 rounded-[1.5rem] border border-neutral-200 bg-soft p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-950">{f.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* 3. All supported gateways */}
      <PSection id="gateways" tone="soft" labelledBy="pg-gateways">
        <div className={CONTAINER}>
          <SectionTitle id="pg-gateways" title={t('gateways.title')} sub={t('gateways.sub')} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PAYMENT_INTEGRATIONS.map((p) => {
              const offered = tix<string[]>(`pages.${p.id}.offered`) ?? [];
              return (
                <li key={p.id}>
                  <article className="hv-lift flex h-full flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-7 hover:border-brand-300">
                    <div className="flex h-20 items-center justify-center rounded-xl bg-soft ring-1 ring-neutral-200">
                      <img
                        src={p.logo}
                        alt={t('gateways.logoAlt', { name: p.name })}
                        loading="lazy"
                        decoding="async"
                        className={`${p.logoH} w-auto max-w-[70%] object-contain`}
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-navy-950" translate="no">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{t(`gateways.items.${p.id}`)}</p>
                    <p className="mt-5 text-sm font-bold text-navy-950">{t('gateways.offered')}</p>
                    <ul className="mt-2 flex flex-1 flex-wrap content-start gap-2">
                      {offered.map((o) => (
                        <li key={o} className="rounded-full bg-aqua px-3 py-1 text-sm font-medium text-brand-900">
                          {o}
                        </li>
                      ))}
                    </ul>
                    <HomeLink
                      to={integrationPath(p.id)}
                      aria-label={t('gateways.learnMoreAria', { name: p.name })}
                      className="mt-6 inline-flex w-fit items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900"
                    >
                      {t('gateways.learnMore')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </HomeLink>
                  </article>
                </li>
              );
            })}
            <li className="flex rounded-[1.5rem] border border-dashed border-brand-300 bg-aqua/60 p-7">
              <p className="flex gap-3 text-[15px] leading-relaxed text-navy-950">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                {t('gateways.note')}
              </p>
            </li>
          </ul>
        </div>
      </PSection>

      {/* 4. Global / international */}
      <PSection tone="navy" labelledBy="pg-global">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20`}>
          <div>
            <h2 id="pg-global" className="text-3xl font-extrabold leading-[1.08] text-white sm:text-[2.75rem]">
              {t('global.title')}
            </h2>
            {globalBody.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-white/70">
                {p}
              </p>
            ))}
            <HomeLink to="/solutions/for-international-orgs" className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-300 hover:text-white">
              {t('global.link')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t('global.checkTitle')}</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {checks.map((c, i) => {
                const Icon = CHECK_ICONS[i] ?? ListChecks;
                return (
                  <li key={c.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                    <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                    <h4 className="mt-4 font-bold text-white">{c.title}</h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/70">{c.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </PSection>

      {/* 5. Payment methods */}
      <PSection labelledBy="pg-methods">
        <div className={CONTAINER}>
          <SectionTitle id="pg-methods" title={t('methods.title')} sub={t('methods.sub')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {METHODS.map(({ key, icon: Icon, providers }) => (
              <li key={key} className="flex flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua text-brand-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{t(`methods.items.${key}.title`)}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-neutral-600">{t(`methods.items.${key}.text`)}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
                  <span className="mr-1 text-sm font-semibold text-neutral-500">{t('methods.via')}</span>
                  {providers.map((id) => {
                    const p = getIntegration(id) as Integration;
                    return (
                      <HomeLink
                        key={id}
                        to={integrationPath(id)}
                        className="inline-flex rounded-full px-3 py-1 text-sm font-semibold text-navy-950 ring-1 ring-neutral-300 hover:bg-aqua hover:ring-brand-300"
                        translate="no"
                      >
                        {p.name}
                      </HomeLink>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      {/* 6. How integration works */}
      <PSection tone="soft" labelledBy="pg-steps">
        <div className={CONTAINER}>
          <SectionTitle id="pg-steps" title={t('steps.title')} sub={t('steps.sub')} />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-[1.5rem] bg-white p-7 ring-1 ring-neutral-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-4 rounded-[1.5rem] border border-brand-200 bg-aqua p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-10">
            <h3 className="shrink-0 font-bold text-navy-950">{t('steps.needsTitle')}</h3>
            <ul className="flex flex-col gap-3 lg:flex-row lg:gap-8">
              {needs.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[15px] text-navy-950">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PSection>

      {/* 7. Across Donorfit solutions */}
      <PSection labelledBy="pg-uses">
        <div className={CONTAINER}>
          <SectionTitle id="pg-uses" title={t('uses.title')} sub={t('uses.sub')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USES.map(({ key, icon: Icon, route }) => {
              const to = route ?? PRODUCT_META[key as ProductSlug].route;
              const name = key === 'donations' ? ts<string>('items.for-charities.navLabel') : tc(`products.${key}`);
              return (
                <li key={key} className="flex flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-7">
                  <Icon className="h-7 w-7 text-brand-700" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-bold text-navy-950">{t(`uses.items.${key}.title`)}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-neutral-600">{t(`uses.items.${key}.text`)}</p>
                  <HomeLink to={to} className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
                    {t('uses.explore', { name })} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </HomeLink>
                </li>
              );
            })}
          </ul>
          <h3 className="mt-14 text-xl font-bold text-navy-950">{t('uses.solutionsTitle')}</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SOLUTION_ORDER.map((s) => {
              const Icon = SOLUTION_ICONS[s];
              return (
                <li key={s}>
                  <HomeLink
                    to={solutionRoute(s)}
                    className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2.5 text-[15px] font-semibold text-navy-950 ring-1 ring-neutral-200 hover:bg-aqua hover:ring-brand-300"
                  >
                    <Icon className="h-4 w-4 text-brand-700" aria-hidden="true" />
                    {ts<string>(`items.${s}.navLabel`)}
                  </HomeLink>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* 8. Why multiple gateways */}
      <PSection tone="aqua" labelledBy="pg-why">
        <div className={CONTAINER}>
          <SectionTitle id="pg-why" title={t('why.title')} sub={t('why.sub')} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => {
              const Icon = WHY_ICONS[i] ?? Layers;
              return (
                <li key={w.title} className="flex gap-4 rounded-[1.5rem] bg-white p-6 ring-1 ring-brand-200">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-950">{w.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{w.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* 9. Pricing */}
      <PSection labelledBy="pg-pricing">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20`}>
          <div>
            <SectionTitle id="pg-pricing" title={t('pricing.title')} sub={t('pricing.body')} />
            <HomeLink to="/pricing" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
              {t('pricing.link')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <ul className="space-y-4 self-center">
            {pricingPoints.map((p, i) => {
              const Icon = [BadgeCheck, Percent, HandCoins][i] ?? BadgeCheck;
              return (
                <li key={p.title} className="flex gap-5 rounded-[1.5rem] border border-neutral-200 bg-soft p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-brand-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-950">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* 10. FAQ */}
      <PSection tone="soft" labelledBy="pg-faq">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="pg-faq" title={t('faq.title')} sub={t('faq.sub')} />
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

      {/* 11. Final CTA */}
      <section aria-labelledby="pg-cta" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="pg-cta" className="text-3xl font-extrabold leading-[1.08] sm:text-5xl">
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
