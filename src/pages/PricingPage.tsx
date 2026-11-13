import React, { useId, useMemo, useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { APP_SIGNUP_URL } from '../data/links.ts';
import { isHiddenProduct } from '../data/productPages.ts';
import { useFormat, useI18n, useT, useTx } from '../i18n/index.tsx';
import {
  ArrowRight,
  BadgePercent,
  BellRing,
  Check,
  ChevronDown,
  CreditCard,
  Database,
  Globe2,
  GraduationCap,
  HandHeart,
  IdCard,
  Layers,
  MessageSquare,
  Moon,
  Receipt,
  RefreshCcw,
  Repeat,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Content source: https://donorfit.com/en/pricing-plan/
 * Plan features, add-on names, stats and footnotes use the reference
 * wording (translated text lives in src/locales/<lang>/company.json →
 * "pricing"). Add-ons link to an existing page only where one exists.
 * ------------------------------------------------------------------ */

/** Index of the plan feature that carries the "*" footnote ("Flexible Cover the Fee model"). */
const FOOTNOTE_FEATURE_INDEX = 9;

interface AddOn {
  key: string;
  icon: LucideIcon;
  href: string | null;
  /** Product slug this add-on belongs to; the card is hidden while that product is in HIDDEN_PRODUCTS. */
  product?: string;
}

const ADD_ONS: AddOn[] = [
  { key: 'crm', icon: Database, href: '/donor-management' },
  { key: 'recurring', icon: Repeat, href: '/recurring-giving' },
  { key: 'sponsorship', icon: HandHeart, href: '/sponsorship' },
  { key: 'membership', icon: IdCard, href: '/membership' },
  { key: 'school', icon: GraduationCap, href: null, product: 'school-management' },
  { key: 'qurbani', icon: Moon, href: null },
];

/** Transaction volume shown in the stats band (rendered as compact currency, e.g. "€1M" / "1 Mio. €"). */
const TRANSACTION_VOLUME_EUR = 1_000_000;

const STAT_KEYS = ['members', 'volume', 'users'] as const;

const BILLING_FEATURES: { key: string; icon: LucideIcon }[] = [
  { key: 'automatedBilling', icon: Zap },
  { key: 'paymentProcessing', icon: CreditCard },
  { key: 'dunning', icon: BellRing },
  { key: 'invoicing', icon: Receipt },
  { key: 'subscriptions', icon: Layers },
  { key: 'recurringBilling', icon: RefreshCcw },
  { key: 'scalability', icon: TrendingUp },
  { key: 'compliance', icon: Globe2 },
];

/* ------------------------------------------------------------------ */

function SignupLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={APP_SIGNUP_URL} className={`btn-gradient inline-flex items-center justify-center gap-2 font-bold rounded-xl ${className}`}>
      {children}
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}

export default function PricingPage() {
  const { openBookDemo, navigateTo, localize } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const uid = useId();
  const t = useT('company');
  const tx = useTx('company');
  const tc = useT('common');
  const { eur } = useFormat();
  const { locale } = useI18n();

  const planFeatures = tx<string[]>('pricing.plan.features');
  const heroBadges = tx<string[]>('pricing.hero.badges');
  const pricingFaqs = tx<{ q: string; a: string }[]>('pricing.faq.items');

  const volumeAmount = useMemo(
    () =>
      new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', notation: 'compact' }).format(
        TRANSACTION_VOLUME_EUR,
      ),
    [locale],
  );

  const goContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateTo('/contact');
  };

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">
      {/* 1. HERO */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <BadgePercent className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>{t('pricing.hero.eyebrow')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.08]">
            {t('pricing.hero.titleLead')}{' '}
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-brand-600 bg-clip-text text-transparent">
              {t('pricing.hero.titleHighlight')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
            {t('pricing.hero.intro')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-xs text-sm font-bold text-neutral-900"
              >
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <SignupLink className="px-8 py-4 text-sm sm:text-base">{t('pricing.hero.startFree')}</SignupLink>
            <button
              type="button"
              onClick={() => openBookDemo()}
              className="px-7 py-4 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-sm sm:text-base rounded-xl border border-neutral-300/90 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {tc('actions.bookDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* 2. PLAN */}
      <section aria-labelledby={`${uid}-plan`} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('pricing.plan.eyebrow')}</span>
          <h2 id={`${uid}-plan`} className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
            {t('pricing.plan.title')}
          </h2>
        </div>

        <div className="relative rounded-3xl bg-white border border-emerald-200 shadow-xl shadow-neutral-900/5 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-hero-glow pointer-events-none" />
          <div aria-hidden="true" className="accent-hairline absolute inset-x-10 top-0 h-px" />

          <div className="relative grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            {/* Price column */}
            <div className="p-8 sm:p-10 lg:border-r border-b lg:border-b-0 border-neutral-200/80 flex flex-col gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold ring-1 ring-emerald-200">
                  {t('pricing.plan.badge')}
                </span>
                <h3 className="text-xl font-bold text-neutral-950 font-display">
                  {t('pricing.plan.name')}
                </h3>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-6xl font-extrabold tracking-tight text-neutral-950 font-display tabular-nums leading-none">{eur(0)}</span>
                <span className="text-sm font-medium text-neutral-500 pb-1.5">{t('pricing.plan.perMonth')}</span>
              </div>

              <SignupLink className="w-full px-6 py-3.5 text-sm">{t('pricing.plan.cta')}</SignupLink>

              <div className="space-y-2 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200/80 pt-5 mt-auto">
                <p>{t('pricing.plan.noteCoverFee')}</p>
                <p>
                  {t('pricing.plan.noteExclusiveBefore')}{' '}
                  <a href={localize('/contact')} onClick={goContact} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                    {t('pricing.plan.noteExclusiveLink')}
                  </a>
                  {t('pricing.plan.noteExclusiveAfter')}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="p-8 sm:p-10">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-6">{t('pricing.plan.includedTitle')}</h3>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {planFeatures.map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                      <Check className="w-3 h-3 text-emerald-700 stroke-[3]" aria-hidden="true" />
                    </span>
                    <span>
                      {text}
                      {i === FOOTNOTE_FEATURE_INDEX && <span aria-label={t('pricing.plan.seeNote')}>*</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADD-ONS */}
      <section aria-labelledby={`${uid}-addons`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('pricing.addons.eyebrow')}</span>
            <h2 id={`${uid}-addons`} className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
              {t('pricing.addons.title')}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              {t('pricing.addons.intro')}
            </p>
          </div>
          <a
            href={localize('/contact')}
            onClick={goContact}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 shrink-0"
          >
            {t('pricing.addons.askPricing')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADD_ONS.filter((addon) => !(addon.product && isHiddenProduct(addon.product))).map((addon) => {
            const Icon = addon.icon;
            const body = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="block space-y-1.5">
                  <span className="flex items-center gap-2 text-lg font-bold text-neutral-950 font-display">
                    {t(`pricing.addons.items.${addon.key}.name`)}
                    {!addon.href && (
                      <span className="rounded-full bg-neutral-100 px-2 py-px text-[11px] leading-4 font-semibold uppercase tracking-wide text-neutral-600 ring-1 ring-neutral-200">
                        {t('pricing.addons.badge')}
                      </span>
                    )}
                  </span>
                  <span className="block text-sm text-neutral-600 leading-relaxed">{t(`pricing.addons.items.${addon.key}.description`)}</span>
                </span>
                {addon.href && (
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                    {tc('actions.learnMore')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                )}
              </>
            );
            const cardClass = 'group flex h-full flex-col gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-xs';
            const href = addon.href;
            return (
              <li key={addon.key}>
                {href ? (
                  <a
                    href={localize(href)}
                    onClick={(e) => {
                      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      navigateTo(href);
                    }}
                    className={`${cardClass} hover-lift`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 4. STATS */}
      <section aria-label={t('pricing.stats.ariaLabel')} className="bg-neutral-950 bg-dark-glow text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-neutral-800 shadow-2xl">
        <dl className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-10 text-center">
          {STAT_KEYS.map((key) => (
            <div key={key} className="flex flex-col-reverse gap-2">
              <dt className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">{t(`pricing.stats.${key}.label`)}</dt>
              <dd className="text-5xl sm:text-6xl font-extrabold font-display text-white tabular-nums tracking-tight">
                {t(`pricing.stats.${key}.value`, { amount: volumeAmount })}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 5. GET STARTED — BILLING FEATURES */}
      <section aria-labelledby={`${uid}-billing`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('pricing.billing.eyebrow')}</span>
          <h2 id={`${uid}-billing`} className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
            {t('pricing.billing.title')}
          </h2>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BILLING_FEATURES.map(({ key, icon: Icon }) => (
            <li key={key} className="hover-lift flex items-center gap-3 p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-neutral-900">{t(`pricing.billing.items.${key}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. FAQ */}
      <section aria-labelledby={`${uid}-faq`} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('pricing.faq.eyebrow')}</span>
          <h2 id={`${uid}-faq`} className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
            {t('pricing.faq.title')}
          </h2>
        </div>
        <div className="space-y-3">
          {pricingFaqs.map((faq, i) => {
            const open = openFaq === i;
            const panelId = `${uid}-faq-${i}`;
            return (
              <div key={i} className="rounded-xl border border-neutral-200/90 bg-white overflow-hidden">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full p-5 text-left font-bold text-base text-neutral-900 font-display flex items-center justify-between gap-4 hover:bg-neutral-50/60 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} hidden={!open} className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                  <p className="pt-3">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-neutral-600">
          {t('pricing.faq.moreBefore')}{' '}
          <a
            href={localize('/faqs')}
            onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              navigateTo('/faqs');
            }}
            className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            {t('pricing.faq.moreLink')}
          </a>
          {t('pricing.faq.moreAfter')}
        </p>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-neutral-900 bg-dark-glow text-white border border-neutral-800 shadow-2xl overflow-hidden text-center space-y-6">
          <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-3xl sm:text-4xl font-extrabold font-display text-balance">
            {t('pricing.closing.title')}
          </h2>
          <p className="relative text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {t('pricing.closing.text')}
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-4 pt-2">
            <SignupLink className="px-8 py-4 text-sm sm:text-base">{t('pricing.hero.startFree')}</SignupLink>
            <a
              href={localize('/contact')}
              onClick={goContact}
              className="inline-flex items-center gap-2 px-6 py-4 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              {t('pricing.closing.contactSales')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
