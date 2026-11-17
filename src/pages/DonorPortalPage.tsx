import React from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  FileText,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Mail,
  Receipt,
  Repeat,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import { useT, useTx } from '../i18n/index.tsx';
import { CONTAINER, PSection, SectionTitle, FAQ, ExampleNote, DemoButton } from '../components/product/ProductKit.tsx';
import {
  DonorOverviewPreview,
  DonorLedgerPreview,
  DonorSubscriptionPreview,
  DonorProfilePreview,
} from '../components/product/ProductPreviews.tsx';
import CustomerLogoSection from '../components/social/CustomerLogoSection.tsx';
import TestimonialSection from '../components/social/TestimonialSection.tsx';
import { DONOR_PORTAL_URL, NEW_TAB } from '../data/links.ts';
import type { ProductPageContent } from '../data/productPages.ts';
import loginShot from '../assets/images/content/donor-portal-login.webp';

/**
 * Donor Portal (formerly "Donor Management", /donor-management redirects here).
 * Every feature described is taken from the Donor Portal in the app (app.donorfit.com/donorlogin),
 * checked on 2026-11-17: email + 6-digit code sign-in, overview, donation list with receipts,
 * recurring donation changes (amount, date, cause, history, cancel), profile and annual certificates.
 * Text: src/locales/<lang>/portal.json.
 */

type Feature = { title: string; body: string; points: string[] };
type Item = { title: string; text: string };

const FEATURE_VISUALS = [DonorOverviewPreview, DonorLedgerPreview, DonorSubscriptionPreview, DonorProfilePreview];
const FEATURE_ICONS = [LayoutDashboard, Receipt, Repeat, UserRound];
const MORE_ICONS = [KeyRound, Building2, Globe2, BadgeCheck, Mail, FileText];

function AccessButton() {
  const t = useT('portal');
  return (
    <a href={DONOR_PORTAL_URL} {...NEW_TAB} className="hv-btn hv-btn-primary">
      {t('hero.access')}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function DonorPortalPage() {
  const t = useT('portal');
  const tx = useTx('portal');
  const features = tx<Feature[]>('features');
  const more = tx<Item[]>('more');
  const donors = tx<Item[]>('donors');
  const orgs = tx<Item[]>('orgs');
  const facts = tx<string[]>('what.facts');

  const steps = tx<{ title: string; description: string }[]>('steps');
  // Shape expected by the shared FAQ component.
  const p = {
    slug: 'donor-portal',
    name: t('name'),
    faqs: tx<{ question: string; answer: string }[]>('faqs'),
  } as unknown as ProductPageContent;

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero */}
      <section aria-labelledby="dp-hero" className="relative overflow-hidden bg-soft pb-20 pt-14 sm:pt-20">
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-100/70 blur-3xl" />
        <div className={`${CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> {t('hero.badge')}
            </span>
            <h1 id="dp-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 [text-wrap:balance] sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{t('hero.body')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AccessButton />
              <DemoButton product="DonorPortal" dark={false} />
            </div>
          </div>
          <figure className="px-2 sm:px-8">
            <div className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(0_24_64/0.55)] ring-1 ring-navy-950/5">
              <img src={loginShot} alt={t('hero.shotAlt')} width={1000} height={914} fetchPriority="high" className="h-auto w-full" />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-6 left-0 flex items-center gap-3 rounded-2xl bg-navy-950 px-4 py-3 text-white shadow-2xl sm:-left-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{t('hero.codeChip')}</span>
            </div>
            </div>
            <figcaption className="mt-10 text-center text-xs text-neutral-500">{t('hero.shotCaption')}</figcaption>
          </figure>
        </div>
      </section>

      {/* What is the Donor Portal? */}
      <PSection labelledBy="dp-what">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <SectionTitle id="dp-what" title={t('what.title')} />
          <div className="space-y-5 text-lg leading-relaxed text-neutral-600 lg:pt-3">
            <p>{t('what.body1')}</p>
            <p>{t('what.body2')}</p>
          </div>
        </div>
        <ul className={`${CONTAINER} mt-14 grid gap-4 sm:grid-cols-3`}>
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-[15px] font-semibold text-navy-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </PSection>

      <CustomerLogoSection id="dp-customers" compact />

      {/* Features with previews */}
      <PSection tone="soft" labelledBy="dp-features">
        <div className={CONTAINER}>
          <SectionTitle id="dp-features" title={t('featuresTitle')} sub={t('featuresSub')} />
          <div className="mt-16 space-y-20 sm:space-y-28">
            {features.map((f, i) => {
              const Visual = FEATURE_VISUALS[i];
              const Icon = FEATURE_ICONS[i];
              return (
                <article key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">{f.title}</h3>
                    <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-neutral-600">{f.body}</p>
                    <ul className="mt-6 max-w-xl space-y-3">
                      {f.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-navy-950">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="min-w-0">
                    {Visual && <Visual />}
                    <ExampleNote />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </PSection>

      {/* Self-service options */}
      <PSection labelledBy="dp-more">
        <div className={CONTAINER}>
          <SectionTitle id="dp-more" title={t('moreTitle')} />
          <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => {
              const Icon = MORE_ICONS[i % MORE_ICONS.length];
              return (
                <div key={m.title} className="border-t-2 border-brand-500 pt-5">
                  <dt className="flex items-center gap-2.5 text-lg font-bold text-navy-950">
                    <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    {m.title}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-neutral-600">{m.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </PSection>

      {/* How it works */}
      <PSection tone="navy" labelledBy="dp-steps" className="overflow-hidden">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative`}>
          <SectionTitle id="dp-steps" dark title={t('stepsTitle')} sub={t('stepsSub')} />
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-white/20 lg:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="hv-display relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-navy-950 ring-8 ring-navy-950">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </PSection>

      {/* Benefits */}
      <PSection tone="aqua" labelledBy="dp-benefits">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          {[
            { id: 'dp-benefits', title: t('donorsTitle'), items: donors, Icon: UserRound },
            { id: 'dp-benefits-orgs', title: t('orgsTitle'), items: orgs, Icon: Building2 },
          ].map(({ id, title, items, Icon }) => (
            <div key={id} className="rounded-[1.75rem] bg-white p-7 ring-1 ring-brand-200 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-950 text-brand-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 id={id} className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                  {title}
                </h2>
              </div>
              <ul className="mt-8 space-y-5">
                {items.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-navy-950">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-navy-950">{b.title}</span>
                      <span className="mt-0.5 block text-[15px] leading-relaxed text-neutral-600">{b.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PSection>

      <TestimonialSection page="donor-management" />
      <FAQ p={p} title={t('faqTitle')} />

      {/* Final CTA */}
      <section aria-labelledby="dp-cta" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <Users aria-hidden="true" className="absolute -bottom-10 -right-6 h-64 w-64 text-white/[0.05]" strokeWidth={1} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="dp-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('cta.body')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <AccessButton />
              <DemoButton product="DonorPortal" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

