import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  CreditCard,
  HeartHandshake,
  Mail,
  MessageCircle,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import { CONTAINER } from '../components/product/ProductKit.tsx';
import BrandLogo from '../components/BrandLogo.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import { INTEGRATIONS, getIntegration, hostOf, integrationPath, type Integration } from '../data/integrations.ts';

type PageCopy = {
  tagline: string;
  about: string[];
  offered: string[];
  benefits: { title: string; body: string }[];
  needs: string[];
};
type Step = { title: string; body: string };

/** One icon per benefit slot, chosen per category so they fit the benefit themes. */
const BENEFIT_ICONS: Record<Integration['category'], LucideIcon[]> = {
  payments: [HeartHandshake, Smartphone, BarChart3],
  email: [Mail, MessageCircle, BarChart3],
};

const extLinkClass =
  'inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

function BackLink({ dark = false }: { dark?: boolean }) {
  const t = useT('integrations');
  return (
    <HomeLink
      to="/integrations"
      className={`inline-flex items-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark ? 'text-white/75 hover:text-white focus-visible:outline-white' : 'text-brand-700 hover:text-brand-800 focus-visible:outline-brand-600'
      }`}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {t('detail.back')}
    </HomeLink>
  );
}

export default function IntegrationDetailPage({ id }: { id: string }) {
  const integration = getIntegration(id);
  const t = useT('integrations');
  const tx = useTx('integrations');
  const tc = useT('common');
  const { openBookDemo } = useModal();

  if (!integration) return <NotFoundPage />;

  const { name, category } = integration;
  const v = { name };
  const copy = tx<PageCopy>(`pages.${id}`);
  const steps = tx<Step[]>(`flow.${category}.steps`).map((s) => ({
    title: s.title.split("{{name}}").join(name),
    body: s.body.split("{{name}}").join(name),
  }));
  const related = INTEGRATIONS.filter((i) => i.category === category && i.id !== id);
  const CategoryIcon = category === 'payments' ? CreditCard : Mail;
  const benefitIcons = BENEFIT_ICONS[category];

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="int-hero" className="hv-hero-bg relative isolate overflow-hidden pb-20 pt-10 text-white sm:pb-24 sm:pt-12">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <div className={CONTAINER}>
          <BackLink dark />
          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                <CategoryIcon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
                {t(`detail.badge.${category}`)}
              </span>
              <h1 id="int-hero" className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] sm:text-[3.5rem]">
                {t('detail.heroTitle', v)}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{copy.tagline}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-primary">
                  {t('detail.talk')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a href={integration.url} target="_blank" rel="noopener noreferrer" aria-label={t('detail.visitLabel', v)} className="hv-btn hv-btn-ghost">
                  {t('detail.visit', { host: hostOf(integration.url) })}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Provider + Donorfit pairing */}
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className="flex h-40 w-56 items-center justify-center rounded-[2rem] bg-white px-8 shadow-[0_30px_70px_-25px_rgb(0_0_0/0.6)] sm:h-48 sm:w-64">
                <img src={integration.logo} alt={t('logoAlt', v)} className={`h-auto w-full object-contain ${integration.square ? "max-h-24" : "max-h-14"}`} />
              </div>
              <div aria-hidden="true" className="relative -ml-6 flex items-center">
                <span className="h-px w-10 border-t-2 border-dashed border-brand-300/70 sm:w-14" />
                <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-[0_24px_60px_-18px_rgb(0_160_160/0.7)] ring-4 ring-brand-500/30 sm:h-24 sm:w-24">
                  <BrandLogo variant="icon" className="h-10 sm:h-11" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- About */}
      <section aria-labelledby="int-about" className="bg-white py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="min-w-0 lg:col-span-7">
            <h2 id="int-about" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
              {t('detail.aboutTitle')}
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-neutral-600">
              {copy.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          <aside aria-labelledby="int-glance" className="min-w-0 self-start rounded-[1.75rem] border border-neutral-200 bg-soft p-6 sm:p-8 lg:col-span-5">
            <h2 id="int-glance" className="text-lg font-bold text-navy-950">
              {t('detail.glanceTitle')}
            </h2>
            <dl className="mt-5 divide-y divide-neutral-200 text-[15px]">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-500">{t('detail.glanceCategory')}</dt>
                <dd className="text-right font-semibold text-navy-950">{t(`detail.badge.${category}`)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-500">{t('detail.glanceWebsite')}</dt>
                <dd className="min-w-0 text-right">
                  <a href={integration.url} target="_blank" rel="noopener noreferrer" aria-label={t('detail.visitLabel', v)} className={extLinkClass}>
                    {hostOf(integration.url)}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="shrink-0 text-neutral-500">{t('detail.glanceDocs')}</dt>
                <dd className="min-w-0 text-right">
                  <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer" aria-label={t('detail.docsLinkLabel', v)} className={extLinkClass}>
                    {/* zero-width spaces let long hosts wrap only before a dot */}
                    <span>{hostOf(integration.docsUrl).replace(/\./g, '​.')}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
            <h3 className="mt-6 text-sm font-semibold text-neutral-500">{t('detail.offeredTitle', v)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.offered.map((o) => (
                <li key={o} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-navy-900 ring-1 ring-neutral-200">
                  {o}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* -------------------------------------------------------- Benefits */}
      <section aria-labelledby="int-benefits" className="bg-aqua py-20 sm:py-28">
        <div className={CONTAINER}>
          <h2 id="int-benefits" className="max-w-2xl text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
            {t('detail.benefitsTitle', v)}
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.benefits.map((b, i) => {
              const Icon = benefitIcons[i] ?? Check;
              return (
                <li key={b.title} className="rounded-[1.5rem] bg-white p-7 ring-1 ring-neutral-200/80">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-brand-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-navy-950">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{b.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- How it works */}
      <section aria-labelledby="int-how" className="bg-white py-20 sm:py-28">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <h2 id="int-how" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
              {t('detail.howTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t(`flow.${category}.sub`, v)}</p>
          </div>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-brand-200 lg:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------- Setup guide */}
      <section aria-labelledby="int-setup" className="bg-soft py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-6">
            <h2 id="int-setup" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.6rem]">
              {t('detail.setupTitle')}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600">{t('detail.setupSub', v)}</p>
            <h3 className="mt-10 text-lg font-bold text-navy-950">{t('detail.needsTitle')}</h3>
            <ul className="mt-4 space-y-3">
              {copy.needs.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[16px] leading-snug text-navy-950">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 self-start lg:col-span-6">
            <div className="rounded-[1.5rem] bg-white p-7 ring-1 ring-neutral-200">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-950">{t('detail.docsTitle', v)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{t('detail.docsBody', v)}</p>
              <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer" aria-label={t('detail.docsLinkLabel', v)} className={`mt-4 ${extLinkClass}`}>
                {t('detail.docsLink', v)}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-[1.5rem] bg-navy-950 p-7 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{t('detail.helpTitle')}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{t('detail.helpBody', v)}</p>
              <HomeLink
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-300 underline-offset-4 hover:text-brand-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tc('actions.contactTeam')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </HomeLink>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Related */}
      {related.length > 0 && (
        <section aria-labelledby="int-related" className="bg-white py-20 sm:py-24">
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="int-related" className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                {t(`detail.related.${category}`)}
              </h2>
              <BackLink />
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <HomeLink
                    to={integrationPath(r.id)}
                    aria-label={t('learnMoreLabel', { name: r.name })}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-5 transition-colors hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <span className="flex h-16 items-center justify-center rounded-xl bg-soft">
                      <img src={r.logo} alt="" loading="lazy" className={`${r.logoH} w-auto max-w-[75%] object-contain`} />
                    </span>
                    <span className="mt-4 text-base font-bold text-navy-950" translate="no">
                      {r.name}
                    </span>
                    <span className="mt-1 text-sm leading-relaxed text-neutral-600">{tx<PageCopy>(`pages.${r.id}`).tagline}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-700">
                      {t('learnMore')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </HomeLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- CTA */}
      <section aria-labelledby="int-cta" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="int-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t('detail.ctaTitle', v)}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('detail.ctaBody')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <button type="button" onClick={() => openBookDemo()} className="hv-btn hv-btn-primary">
                {tc('actions.bookDemo')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <HomeLink to="/integrations" className="hv-btn hv-btn-ghost">
                {t('detail.ctaAll')}
              </HomeLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
