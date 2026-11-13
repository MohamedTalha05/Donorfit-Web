import React from 'react';
import { ArrowDown, ArrowRight, ArrowUp, Check, CreditCard, Mail } from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import { CONTAINER } from '../components/product/ProductKit.tsx';
import BrandLogo from '../components/BrandLogo.tsx';

import HomeLink from '../components/home/HomeLink.tsx';
import { PAYMENT_INTEGRATIONS as PAYMENTS, EMAIL_INTEGRATIONS as EMAIL, integrationPath, type Integration } from '../data/integrations.ts';

/** No connection status is shown: none is verified from the marketing site. */
type Provider = Integration;

function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/* ------------------------------------------------------------------ */
/* Hero illustration: the providers wired into Donorfit                */
/* ------------------------------------------------------------------ */

function LogoChip({ p, small = false }: { p: Provider; small?: boolean }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] ${small ? 'h-14 px-3' : 'h-16 px-4'}`}>
      <img src={p.logo} alt="" className={`${p.logoH} w-auto max-w-full object-contain`} draggable={false} />
    </div>
  );
}

function Switchboard() {
  const t = useT('integrations');
  return (
    <figure aria-hidden="true" className="relative mx-auto w-full max-w-lg">
      {/* connector lines (desktop) */}
      <svg viewBox="0 0 480 420" className="absolute inset-0 hidden h-full w-full sm:block" preserveAspectRatio="none">
        <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-400/60">
          {[48, 144, 240, 336, 432].map((x) => (
            <path key={x} d={`M${x} 118 C ${x} 170, 240 150, 240 196`} />
          ))}
          {[160, 320].map((x) => (
            <path key={x} d={`M${x} 312 C ${x} 270, 240 280, 240 252`} />
          ))}
        </g>
        <circle cx="240" cy="224" r="64" fill="none" stroke="currentColor" strokeDasharray="2 6" className="text-white/25" />
      </svg>

      <div className="relative">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/70">
          <CreditCard className="h-4 w-4 text-brand-300" /> {t('hero.hubPayments')}
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {PAYMENTS.map((p) => (
            <LogoChip key={p.id} p={p} small />
          ))}
        </div>

        <div className="my-8 flex justify-center sm:my-14">
          <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-white shadow-[0_24px_60px_-18px_rgb(0_160_160/0.7)] ring-4 ring-brand-500/30">
            <BrandLogo variant="icon" className="h-11" alt="" />
          </div>
        </div>

        <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
          {EMAIL.map((p) => (
            <LogoChip key={p.id} p={p} small />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-white/70">
          <Mail className="h-4 w-4 text-brand-300" /> {t('hero.hubEmail')}
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Category section                                                    */
/* ------------------------------------------------------------------ */

function ProviderRow({ p }: { p: Provider }) {
  const t = useT('integrations');
  return (
    <li className="grid gap-4 p-5 sm:grid-cols-[9.5rem_1fr_auto] sm:items-center sm:gap-6 sm:p-6">
      <div className="flex h-16 items-center justify-center rounded-xl bg-white ring-1 ring-neutral-200 sm:w-38">
        <img src={p.logo} alt={t('logoAlt', { name: p.name })} loading="lazy" className={`${p.logoH} w-auto max-w-[80%] object-contain`} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-navy-950" translate="no">
          {p.name}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{t(`providers.${p.id}`)}</p>
      </div>
      <HomeLink
        to={integrationPath(p.id)}
        aria-label={t('learnMoreLabel', { name: p.name })}
        className="group inline-flex items-center gap-1.5 justify-self-start rounded-lg px-1 py-1 text-sm font-semibold text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:justify-self-end"
      >
        {t('learnMore')}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
      </HomeLink>
    </li>
  );
}

function Category({
  id,
  ns,
  icon: Icon,
  providers,
  tone,
}: {
  id: string;
  ns: 'payments' | 'email';
  icon: typeof CreditCard;
  providers: Provider[];
  tone: 'white' | 'aqua';
}) {
  const t = useT('integrations');
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-24 py-20 sm:py-28 ${tone === 'aqua' ? 'bg-aqua' : 'bg-white'}`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-12 lg:gap-14`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-brand-300">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id={`${id}-title`} className="mt-6 text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
              {t(`categories.${ns}.title`)}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-neutral-600">{t(`categories.${ns}.body`)}</p>
          </div>
        </div>
        <ul className="divide-y divide-neutral-200 self-start overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_20px_50px_-30px_rgb(0_24_64/0.35)] lg:col-span-7">
          {providers.map((p) => (
            <ProviderRow key={p.id} p={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  const t = useT('integrations');
  const tx = useTx('integrations');
  const tc = useT('common');
  const { navigateTo, openBookDemo } = useModal();
  const why = tx<string[]>('why.items');

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="in-hero" className="hv-hero-bg relative isolate overflow-hidden pb-20 pt-16 text-white sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              {t('hero.badge')}
            </span>
            <h1 id="in-hero" className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] sm:text-[3.5rem]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{t('hero.body')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => scrollToId('payments')} className="hv-btn hv-btn-primary">
                {t('hero.jumpPayments', { count: PAYMENTS.length })}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollToId('email-marketing')} className="hv-btn hv-btn-ghost">
                {t('hero.jumpEmail', { count: EMAIL.length })}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <Switchboard />
        </div>
      </section>

      {/* ------------------------------------------------------ Categories */}
      <Category id="payments" ns="payments" icon={CreditCard} providers={PAYMENTS} tone="white" />
      <Category id="email-marketing" ns="email" icon={Mail} providers={EMAIL} tone="aqua" />

      {/* --------------------------------------------------- Help + Why */}
      <section aria-labelledby="in-why" className="bg-white py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-5">
            <h2 id="in-why" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
              {t('why.title')}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-600">{t('help.text')}</p>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {t('help.link')}
            </button>
          </div>
          <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:col-span-7">
            {why.map((item) => (
              <li key={item} className="flex items-start gap-4 border-t border-neutral-200 py-5 text-[17px] font-medium leading-snug text-navy-950">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Final CTA */}
      <section aria-labelledby="in-cta" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="in-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('cta.body')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <button type="button" onClick={() => scrollToId('payments')} className="hv-btn hv-btn-primary">
                {t('cta.button')}
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-ghost">
                {tc('actions.bookDemo')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
