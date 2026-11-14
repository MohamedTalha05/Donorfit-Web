import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Info,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext.tsx';
import { useFormat, useT, useTx } from '../../i18n/index.tsx';
import HomeLink from '../home/HomeLink.tsx';
import { APP_SIGNUP_URL } from '../../data/links.ts';
import { PRODUCT_META, isHiddenProduct } from '../../data/productPages.ts';
import { SOLUTION_ICONS, SOLUTION_ORDER, solutionRoute, type SolutionDetail, type SolutionSlug, type SolutionText } from '../../data/solutions.ts';
import { CONTAINER, PSection, SectionTitle, PRODUCT_ICONS, PRODUCT_PHOTOS } from '../product/ProductKit.tsx';

export { CONTAINER, PSection, SectionTitle, SOLUTION_ICONS };

/** Book-a-demo form interest preset per page (only values the form offers). */
const DEMO_INTEREST: Partial<Record<SolutionSlug, string>> = {
  'for-sponsorship-orgs': 'sponsorship',
  'for-membership-orgs': 'membership',
};

/** Translated text of a solution page, typed by the caller for its page-specific sections. */
export function useSolution<T extends SolutionText = SolutionText>(slug: SolutionSlug): T {
  const tx = useTx('solutions');
  return tx<T>(`items.${slug}`);
}

/* ------------------------------------------------------------------ */
/* Page frame + hero helpers                                           */
/* ------------------------------------------------------------------ */

export function SolutionShell({ children }: { children: React.ReactNode }) {
  return <div className="home-v2 overflow-x-clip bg-white">{children}</div>;
}

export function Breadcrumb({ slug, dark = false }: { slug: SolutionSlug; dark?: boolean }) {
  const t = useT('solutions');
  const text = useSolution(slug);
  const muted = dark ? 'text-white/60' : 'text-neutral-500';
  return (
    <nav aria-label={t('ui.breadcrumbAria')} className={`text-sm ${muted}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>{t('ui.breadcrumb')}</li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li aria-current="page" className={`font-semibold ${dark ? 'text-white' : 'text-navy-950'}`}>
          {text.navLabel}
        </li>
      </ol>
    </nav>
  );
}

export function RegisterButton({ className = '' }: { className?: string }) {
  const t = useT('solutions');
  return (
    <a href={APP_SIGNUP_URL} className={`hv-btn hv-btn-primary ${className}`}>
      {t('ui.register')}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function DemoButton({ slug, dark = false, label }: { slug: SolutionSlug; dark?: boolean; label?: string }) {
  const { openBookDemo } = useModal();
  const t = useT('solutions');
  return (
    <button type="button" onClick={() => openBookDemo(DEMO_INTEREST[slug])} className={`hv-btn ${dark ? 'hv-btn-ghost' : 'hv-btn-outline'}`}>
      {label ?? t('ui.bookDemo')}
    </button>
  );
}

export function HeroActions({ slug, dark = false, center = false }: { slug: SolutionSlug; dark?: boolean; center?: boolean }) {
  return (
    <div className={center ? 'flex flex-col items-center' : ''}>
      <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${center ? 'justify-center' : ''}`}>
        <RegisterButton />
        <DemoButton slug={slug} dark={dark} />
      </div>
      <FreeNote dark={dark} className="mt-5" />
    </div>
  );
}

export function FreeNote({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const t = useT('solutions');
  return (
    <p className={`flex items-start gap-2 text-sm ${dark ? 'text-white/65' : 'text-neutral-600'} ${className}`}>
      <Info className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-brand-300' : 'text-brand-700'}`} aria-hidden="true" />
      <span>{t('ui.freeNote')}</span>
    </p>
  );
}

export function Badge({ icon: Icon, children, dark = false }: { icon: LucideIcon; children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ${
        dark ? 'bg-white/10 text-brand-200 ring-white/15' : 'bg-white text-brand-800 ring-brand-200'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Small caption for mock-ups showing invented numbers. */
export function ExampleTag({ dark = false, label }: { dark?: boolean; label?: string }) {
  const t = useT('solutions');
  return (
    <span
      className={`inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        dark ? 'bg-white/10 text-white/70' : 'bg-neutral-100 text-neutral-600'
      }`}
    >
      {label ?? t('ui.exampleData')}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* A. Challenges                                                       */
/* ------------------------------------------------------------------ */

/**
 * `rows`: two-column list separated by rules. `cards`: icon cards on a soft background.
 * `dark`: cards on a navy section.
 */
export function Challenges({
  text,
  id,
  variant = 'rows',
  icons = [],
}: {
  text: SolutionText;
  id: string;
  variant?: 'rows' | 'cards' | 'dark';
  icons?: LucideIcon[];
}) {
  const c = text.challenges;
  const dark = variant === 'dark';
  if (variant === 'rows') {
    return (
      <PSection labelledBy={id}>
        <div className={CONTAINER}>
          <SectionTitle id={id} title={c.title} sub={c.sub} />
          <ul className="mt-12 grid gap-x-16 border-t border-neutral-200 sm:grid-cols-2">
            {c.items.map((item) => (
              <li key={item.title} className="border-b border-neutral-200 py-7">
                <h3 className="text-lg font-bold text-navy-950 sm:text-xl">{item.title}</h3>
                <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-neutral-600 sm:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </PSection>
    );
  }
  return (
    <PSection labelledBy={id} tone={dark ? 'navy' : 'soft'}>
      <div className={CONTAINER}>
        <SectionTitle id={id} title={c.title} sub={c.sub} dark={dark} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.items.map((item, i) => {
            const Icon: LucideIcon | undefined = icons[i];
            return (
              <li
                key={item.title}
                className={`flex gap-5 rounded-[1.5rem] p-7 ${dark ? 'border border-white/10 bg-white/5' : 'border border-neutral-200 bg-white'}`}
              >
                {Icon && (
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      dark ? 'bg-white/10 text-brand-300' : 'bg-aqua text-brand-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{item.title}</h3>
                  <p className={`mt-1.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* B. How Donorfit helps                                               */
/* ------------------------------------------------------------------ */

export function Helps({
  text,
  id,
  tone = 'white',
  icons = [],
}: {
  text: SolutionText;
  id: string;
  tone?: 'white' | 'soft' | 'aqua' | 'navy';
  icons?: LucideIcon[];
}) {
  const h = text.helps;
  const dark = tone === 'navy';
  const card = dark
    ? 'border border-white/10 bg-white/5'
    : tone === 'white'
      ? 'border border-neutral-200 bg-soft'
      : 'border border-neutral-200 bg-white';
  return (
    <PSection labelledBy={id} tone={tone}>
      <div className={CONTAINER}>
        <SectionTitle id={id} title={h.title} sub={h.sub} dark={dark} />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {h.items.map((item, i) => {
            const Icon: LucideIcon | undefined = icons[i];
            return (
              <li key={item.title} className={`flex flex-col rounded-[1.5rem] p-7 ${card}`}>
                {Icon && <Icon className={`h-7 w-7 ${dark ? 'text-brand-300' : 'text-brand-700'}`} aria-hidden="true" />}
                <h3 className={`text-xl font-bold ${i < icons.length ? 'mt-5' : ''}${dark ? 'text-white' : 'text-navy-950'}`}>{item.title}</h3>
                <p className={`mt-1.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{item.text}</p>
                <ul className={`mt-5 space-y-2.5 border-t pt-5 ${dark ? 'border-white/10' : 'border-neutral-200'}`}>
                  {item.points.map((p) => (
                    <li key={p} className={`flex items-start gap-2.5 text-[15px] leading-snug ${dark ? 'text-white/85' : 'text-navy-950'}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-brand-300' : 'text-brand-700'}`} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* C. Solutions in detail                                              */
/* ------------------------------------------------------------------ */

function DetailList({ d }: { d: SolutionDetail }) {
  const t = useT('solutions');
  const rows: [string, string][] = [
    [t('ui.whatItDoes'), d.what],
    [t('ui.howToUse'), d.use],
    [t('ui.whyItHelps'), d.purpose],
  ];
  return (
    <dl className="space-y-4">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="text-sm font-bold text-brand-700">{k}</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-neutral-700">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function ExploreLink({ slug }: { slug: SolutionDetail['slug'] }) {
  const t = useT('solutions');
  const tc = useT('common');
  return (
    <HomeLink to={PRODUCT_META[slug].route} className="inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
      {t('ui.explore', { name: tc(`products.${slug}`) })}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </HomeLink>
  );
}

/**
 * `rows`: alternating photo / text rows (best for 1–4 products).
 * `cards`: photo cards side by side (best for 2–3 products).
 */
export function SolutionDetails({
  block,
  id,
  variant = 'rows',
  tone = 'white',
}: {
  block: { title: string; sub: string; items: SolutionDetail[] };
  id: string;
  variant?: 'rows' | 'cards';
  tone?: 'white' | 'soft' | 'aqua';
}) {
  const tc = useT('common');
  const items = block.items.filter((d) => !isHiddenProduct(d.slug));
  return (
    <PSection labelledBy={id} tone={tone}>
      <div className={CONTAINER}>
        <SectionTitle id={id} title={block.title} sub={block.sub} />
        {variant === 'rows' ? (
          <ul className="mt-14 space-y-14 sm:space-y-20">
            {items.map((d, i) => {
              const photo = PRODUCT_PHOTOS[d.slug];
              const Icon = PRODUCT_ICONS[d.slug];
              return (
                <li key={d.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <img
                    src={photo.src}
                    alt=""
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                    className={`h-60 w-full rounded-[1.75rem] object-cover sm:h-80 ${i % 2 ? 'lg:order-2' : ''}`}
                    style={{ objectPosition: photo.pos }}
                  />
                  <div>
                    <h3 className="flex items-center gap-3 text-2xl font-extrabold text-navy-950 sm:text-3xl">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua text-brand-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {tc(`products.${d.slug}`)}
                    </h3>
                    <div className="mt-6">
                      <DetailList d={d} />
                    </div>
                    <div className="mt-6">
                      <ExploreLink slug={d.slug} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className={`mt-12 grid gap-5 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {items.map((d) => {
              const photo = PRODUCT_PHOTOS[d.slug];
              const Icon = PRODUCT_ICONS[d.slug];
              return (
                <li key={d.slug} className="flex flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white">
                  <div className="relative h-40 overflow-hidden">
                    <img src={photo.src} alt="" width={600} height={400} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: photo.pos }} />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-md">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-navy-950">{tc(`products.${d.slug}`)}</h3>
                    <div className="mt-4 flex-1">
                      <DetailList d={d} />
                    </div>
                    <div className="mt-6">
                      <ExploreLink slug={d.slug} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* D. Use cases                                                        */
/* ------------------------------------------------------------------ */

/** Illustrative scenarios. `aside` (e.g. an example mock-up) sits beside the cards on large screens. */
export function UseCases({
  text,
  id,
  tone = 'white',
  aside,
}: {
  text: SolutionText;
  id: string;
  tone?: 'white' | 'soft' | 'aqua';
  aside?: React.ReactNode;
}) {
  const t = useT('solutions');
  const tc = useT('common');
  const u = text.useCases;
  const cards = (
    <ul className={`grid gap-5 ${aside ? '' : u.items.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {u.items.map((c) => (
        <li key={c.title} className={`flex flex-col rounded-[1.5rem] p-7 ${tone === 'white' ? 'border border-neutral-200 bg-white' : 'bg-white ring-1 ring-neutral-200'}`}>
          <h3 className="text-lg font-bold text-navy-950">{c.title}</h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-neutral-600">{c.text}</p>
          {c.slug && !isHiddenProduct(c.slug) && (
            <HomeLink
              to={PRODUCT_META[c.slug].route}
              className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-aqua px-3 py-1 text-sm font-semibold text-brand-800 hover:bg-brand-100"
            >
              {t('ui.usesProduct', { name: tc(`products.${c.slug}`) })}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </HomeLink>
          )}
        </li>
      ))}
    </ul>
  );
  return (
    <PSection labelledBy={id} tone={tone}>
      <div className={CONTAINER}>
        <SectionTitle id={id} title={u.title} sub={u.sub} />
        {aside ? (
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="lg:sticky lg:top-28">{aside}</div>
            {cards}
          </div>
        ) : (
          <div className="mt-12">{cards}</div>
        )}
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* E. How it works                                                     */
/* ------------------------------------------------------------------ */

export function HowItWorks({ text, id, tone = 'white' }: { text: SolutionText; id: string; tone?: 'white' | 'soft' | 'navy' }) {
  const t = useT('solutions');
  const dark = tone === 'navy';
  const s = text.steps;
  return (
    <PSection labelledBy={id} tone={tone}>
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle id={id} title={s.title} sub={s.sub} dark={dark} />
          <HomeLink
            to="/integrations"
            className={`inline-flex shrink-0 items-center gap-1.5 text-[15px] font-bold ${dark ? 'text-brand-300 hover:text-white' : 'text-brand-700 hover:text-brand-900'}`}
          >
            {t('ui.seeIntegrations')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </HomeLink>
        </div>
        <Sequence steps={s.items} dark={dark} columns={s.items.length === 5 ? 5 : 4} />
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* Feature cards                                                       */
/* ------------------------------------------------------------------ */

export function FeatureCards({
  items,
  icons,
  variant = 'grid',
}: {
  items: { title: string; text: string }[];
  icons: LucideIcon[];
  /** grid: 3-column icon cards · list: compact two-column list · tiles: icon tiles on aqua */
  variant?: 'grid' | 'list' | 'tiles';
}) {
  if (variant === 'list') {
    return (
      <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {items.map((f, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={f.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-brand-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold text-navy-950 sm:text-lg">{f.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{f.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  const tiles = variant === 'tiles';
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => {
        const Icon = icons[i % icons.length];
        return (
          <li
            key={f.title}
            className={`rounded-[1.5rem] p-7 ${tiles ? 'bg-aqua' : 'border border-neutral-200 bg-white shadow-[0_1px_2px_rgb(0_24_64/0.04)]'}`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                tiles ? 'bg-white text-brand-700 ring-1 ring-brand-200' : 'bg-aqua text-brand-700'
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy-950">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered process (only for real sequences)                          */
/* ------------------------------------------------------------------ */

export function Sequence({
  steps,
  dark = false,
  columns = 4,
}: {
  steps: { title: string; text: string }[];
  dark?: boolean;
  columns?: 4 | 5;
}) {
  const { int } = useFormat();
  return (
    <ol className={`mt-12 grid gap-8 sm:grid-cols-2 ${columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} lg:gap-6`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums ${
                dark ? 'bg-brand-500 text-navy-950' : 'bg-navy-950 text-white'
              }`}
            >
              {int(i + 1)}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={`hidden h-px flex-1 lg:block ${dark ? 'bg-white/20' : 'bg-neutral-300'}`} />
            )}
          </div>
          <h3 className={`mt-4 text-lg font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{s.title}</h3>
          <p className={`mt-1.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function SolutionFAQ({ text, id }: { text: SolutionText; id: string }) {
  const t = useT('solutions');
  return (
    <PSection labelledBy={id}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle id={id} title={t('ui.faqTitle')} sub={t('ui.faqSub')} />
          <HomeLink to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
            {t('ui.contactTeam')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </HomeLink>
        </div>
        <div className="space-y-3">
          {text.faqs.map((q, i) => (
            <details
              key={q.question}
              open={i === 0}
              className="group rounded-2xl border border-neutral-200 bg-white transition-[background-color,border-color] open:border-brand-200 open:bg-aqua"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-base font-bold text-navy-950 hover:text-brand-700 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">{q.question}</span>
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
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

/**
 * `navy`: dark rounded panel. `aqua`: light panel with navy text.
 * `photo`: navy panel with the page photo on one side.
 */
export function SolutionCTA({
  slug,
  text,
  variant = 'navy',
  photo,
  primary = 'register',
}: {
  slug: SolutionSlug;
  text: SolutionText;
  variant?: 'navy' | 'aqua' | 'photo';
  photo?: { src: string; pos?: string };
  /** register: sign-up first, demo second. contact: contact page first, sign-up second. */
  primary?: 'register' | 'contact';
}) {
  const t = useT('solutions');
  const id = `${slug}-cta`;
  const Icon = SOLUTION_ICONS[slug];
  const dark = variant !== 'aqua';
  const buttons = primary === 'contact' ? (
    <>
      <HomeLink to="/contact" className="hv-btn hv-btn-primary">
        {text.cta.button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </HomeLink>
      <a href={APP_SIGNUP_URL} className={`hv-btn ${dark ? 'hv-btn-ghost' : 'hv-btn-outline'}`}>
        {t('ui.register')}
      </a>
    </>
  ) : (
    <>
      <a href={APP_SIGNUP_URL} className="hv-btn hv-btn-primary">
        {text.cta.button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <DemoButton slug={slug} dark={dark} />
    </>
  );

  if (variant === 'photo' && photo) {
    return (
      <section aria-labelledby={id} className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hv-hero-bg mx-auto grid max-w-6xl overflow-hidden rounded-[2.25rem] text-white lg:grid-cols-[1.2fr_1fr]">
          <div className="px-6 py-14 sm:px-12 sm:py-16">
            <h2 id={id} className="text-3xl font-extrabold leading-[1.08] sm:text-[2.6rem]">
              {text.cta.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{text.cta.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{buttons}</div>
            <FreeNote dark className="mt-6" />
          </div>
          <img src={photo.src} alt="" loading="lazy" decoding="async" className="h-64 w-full object-cover lg:h-full" style={{ objectPosition: photo.pos }} />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        className={`relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-14 sm:px-14 sm:py-20 ${
          dark ? 'hv-hero-bg text-white' : 'border border-brand-200 bg-aqua text-navy-950'
        }`}
      >
        {dark && <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />}
        <Icon aria-hidden="true" className={`absolute -bottom-10 -right-6 h-64 w-64 ${dark ? 'text-white/[0.05]' : 'text-brand-700/[0.07]'}`} strokeWidth={1} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id={id} className="text-3xl font-extrabold leading-[1.08] sm:text-5xl">
              {text.cta.title}
            </h2>
            <p className={`mt-4 max-w-xl text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-700'}`}>{text.cta.body}</p>
            <FreeNote dark={dark} className="mt-6" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">{buttons}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Other solutions                                                     */
/* ------------------------------------------------------------------ */

export function OtherSolutions({ current }: { current: SolutionSlug }) {
  const t = useT('solutions');
  const tx = useTx('solutions');
  const id = `${current}-other`;
  return (
    <PSection tone="soft" labelledBy={id} className="!pt-4 sm:!pt-6">
      <div className={CONTAINER}>
        <SectionTitle id={id} title={t('ui.otherTitle')} sub={t('ui.otherSub')} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_ORDER.filter((s) => s !== current).map((s) => {
            const Icon = SOLUTION_ICONS[s];
            return (
              <li key={s}>
                <HomeLink
                  to={solutionRoute(s)}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-brand-300"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua text-brand-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-navy-950 group-hover:text-brand-700">{tx<string>(`items.${s}.navLabel`)}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-neutral-600">{tx<string>(`items.${s}.navDescription`)}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 group-hover:text-brand-700" aria-hidden="true" />
                </HomeLink>
              </li>
            );
          })}
        </ul>
      </div>
    </PSection>
  );
}
