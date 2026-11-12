import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Plus, X, IdCard, HeartHandshake, Droplets, Moon, GraduationCap, PiggyBank, type LucideIcon } from 'lucide-react';
import { useModal } from '../../context/ModalContext.tsx';
import HomeLink from '../home/HomeLink.tsx';
import { PRODUCT_PAGES, type ProductPageContent, type ProductSlug } from '../../data/productPages.ts';

import membershipImg from '../../assets/images/hero/membership.jpg';
import sponsorshipImg from '../../assets/images/hero/sponsorship.jpg';
import waterwellImg from '../../assets/images/hero/waterwell.jpg';
import qurbaniImg from '../../assets/images/hero/qurbani.jpg';
import schoolImg from '../../assets/images/hero/school.jpg';
import moneypoolImg from '../../assets/images/hero/moneypool.jpg';

export const PRODUCT_ICONS: Record<ProductSlug, LucideIcon> = {
  membership: IdCard,
  sponsorship: HeartHandshake,
  'water-well': Droplets,
  qurbani: Moon,
  'school-management': GraduationCap,
  'money-pool': PiggyBank,
};

export const PRODUCT_PHOTOS: Record<ProductSlug, { src: string; alt: string; pos?: string }> = {
  membership: { src: membershipImg, alt: 'Community members gathered under a tree for an outdoor association meeting', pos: '50% 60%' },
  sponsorship: { src: sponsorshipImg, alt: 'A schoolboy writing carefully in his notebook at his desk', pos: '55% 45%' },
  'water-well': { src: waterwellImg, alt: 'Children filling yellow jerrycans at a village hand-pump well', pos: '45% 50%' },
  qurbani: { src: qurbaniImg, alt: 'Goats and rams at a livestock market ahead of Eid al-Adha', pos: '60% 55%' },
  'school-management': { src: schoolImg, alt: 'A teacher leading a lesson with uniformed students in a classroom', pos: '50% 40%' },
  'money-pool': { src: moneypoolImg, alt: 'Volunteers standing together behind donation tubs at a community collection drive', pos: '45% 30%' },
};

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

type Tone = 'white' | 'soft' | 'aqua' | 'navy';
const TONE: Record<Tone, string> = {
  white: 'bg-white',
  soft: 'bg-soft',
  aqua: 'bg-aqua',
  navy: 'hv-dark-bg text-white',
};

export function PSection({
  tone = 'white',
  id,
  labelledBy,
  className = '',
  children,
}: {
  tone?: Tone;
  id?: string;
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative scroll-mt-24 py-20 sm:py-28 ${TONE[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({
  id,
  title,
  sub,
  dark = false,
  align = 'left',
}: {
  id: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2 id={id} className={`text-3xl font-extrabold leading-[1.08] sm:text-[2.75rem] ${dark ? 'text-white' : 'text-navy-950'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function GetStartedButton({ product, dark = true, label = 'Get Started' }: { product: string; dark?: boolean; label?: string }) {
  const { openGetStarted } = useModal();
  return (
    <button type="button" onClick={() => openGetStarted(product)} className={`hv-btn hv-btn-primary ${dark ? '' : ''}`}>
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export function DemoButton({ product, dark = true }: { product: string; dark?: boolean }) {
  const { openBookDemo } = useModal();
  return (
    <button type="button" onClick={() => openBookDemo(product)} className={`hv-btn ${dark ? 'hv-btn-ghost' : 'hv-btn-outline'}`}>
      Book a Demo
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Problem → solution                                                  */
/* ------------------------------------------------------------------ */

export function ProblemSolution({ p, variant = 'rows' }: { p: ProductPageContent; variant?: 'rows' | 'split' }) {
  if (variant === 'split')
    return (
      <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white lg:grid-cols-2">
        <div className="bg-soft p-7 sm:p-10">
          <h3 className="text-sm font-bold text-neutral-500">Without Donorfit</h3>
          <ul className="mt-5 space-y-5">
            {p.problems.map((x) => (
              <li key={x.problem} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700">
                <X className="mt-1 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                {x.problem}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-7 sm:p-10">
          <h3 className="text-sm font-bold text-brand-800">With Donorfit {p.name}</h3>
          <ul className="mt-5 space-y-5">
            {p.problems.map((x) => (
              <li key={x.solution} className="flex gap-3 text-[15px] leading-relaxed text-navy-950">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {x.solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  return (
    <ol className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
      {p.problems.map((x) => (
        <li key={x.problem} className="grid gap-3 py-7 md:grid-cols-2 md:gap-12">
          <p className="text-[15px] leading-relaxed text-neutral-500">{x.problem}</p>
          <p className="flex gap-3 text-[15px] font-medium leading-relaxed text-navy-950">
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {x.solution}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

export function Features({
  p,
  variant,
  icons,
}: {
  p: ProductPageContent;
  variant: 'bento' | 'list' | 'grid' | 'rows';
  icons: LucideIcon[];
}) {
  const f = p.features;
  if (variant === 'bento')
    return (
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {f.map((x, i) => {
          const Icon = icons[i % icons.length];
          const big = i === 0;
          return (
            <div
              key={x.title}
              className={`rounded-[1.5rem] border p-7 ${
                big ? 'hv-dark-bg border-navy-800 text-white sm:col-span-2 lg:row-span-2' : 'border-neutral-200 bg-white'
              }`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${big ? 'bg-brand-500 text-navy-950' : 'bg-brand-50 text-brand-700'}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className={`mt-5 font-bold ${big ? 'text-2xl text-white sm:text-3xl' : 'text-lg text-navy-950'}`}>{x.title}</h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${big ? 'max-w-md text-white/70' : 'text-neutral-600'}`}>{x.description}</p>
            </div>
          );
        })}
      </div>
    );
  if (variant === 'list')
    return (
      <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {f.map((x, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={x.title} className="border-t-2 border-brand-500 pt-5">
              <dt className="flex items-center gap-2.5 text-lg font-bold text-navy-950">
                <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                {x.title}
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-600">{x.description}</dd>
            </div>
          );
        })}
      </dl>
    );
  if (variant === 'rows')
    return (
      <ul className="mt-12 grid gap-3">
        {f.map((x, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={x.title} className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:items-center sm:p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-navy-950">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="grid flex-1 gap-1 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <h3 className="text-base font-bold text-white">{x.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/70">{x.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {f.map((x, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={x.title} className="hv-lift rounded-[1.5rem] border border-neutral-200 bg-white p-7 shadow-xs">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-navy-700 text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy-950">{x.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{x.description}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export function Steps({ p, variant = 'line', dark = false }: { p: ProductPageContent; variant?: 'line' | 'stack'; dark?: boolean }) {
  if (variant === 'stack')
    return (
      <ol className="mt-10 space-y-0">
        {p.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0">
            {i < p.steps.length - 1 && <span aria-hidden="true" className={`absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px ${dark ? 'bg-white/20' : 'bg-brand-200'}`} />}
            <span
              className={`hv-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                dark ? 'bg-brand-500 text-navy-950' : 'bg-navy-950 text-white'
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-1.5">
              <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{s.title}</h3>
              <p className={`mt-1 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  return (
    <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
      <span aria-hidden="true" className={`absolute left-0 right-0 top-5 hidden h-px md:block ${dark ? 'bg-white/20' : 'bg-brand-200'}`} />
      {p.steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            className={`hv-display relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold ring-8 ${
              dark ? 'bg-brand-500 text-navy-950 ring-navy-950' : 'bg-brand-700 text-white ring-white'
            }`}
          >
            {i + 1}
          </span>
          <h3 className={`mt-5 text-lg font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{s.title}</h3>
          <p className={`mt-1.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits & audiences                                                */
/* ------------------------------------------------------------------ */

export function Benefits({ p, variant = 'tiles' }: { p: ProductPageContent; variant?: 'tiles' | 'statements' }) {
  if (variant === 'statements')
    return (
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {p.benefits.map((b) => (
          <div key={b.title}>
            <h3 className="hv-display text-2xl font-extrabold leading-tight text-navy-950">{b.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{b.description}</p>
          </div>
        ))}
      </div>
    );
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {p.benefits.map((b) => (
        <div key={b.title} className="rounded-[1.5rem] bg-white p-7 shadow-[0_20px_40px_-32px_rgb(0_24_64/0.5)] ring-1 ring-brand-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-navy-950">
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-navy-950">{b.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{b.description}</p>
        </div>
      ))}
    </div>
  );
}

export function Audiences({ p, dark = false, stacked = false }: { p: ProductPageContent; dark?: boolean; stacked?: boolean }) {
  return (
    <ul className={`mt-10 grid gap-4 ${stacked ? "" : "md:grid-cols-3"}`}>
      {p.audiences.map((a) => (
        <li
          key={a.title}
          className={`rounded-[1.5rem] p-6 ${dark ? 'border border-white/10 bg-white/5' : 'border border-neutral-200 bg-white'}`}
        >
          <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{a.title}</h3>
          <p className={`mt-1.5 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{a.description}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FAQ({ p }: { p: ProductPageContent }) {
  const id = `${p.slug}-faq-title`;
  return (
    <PSection labelledBy={id}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle id={id} title={`${p.name} questions`} sub="Can’t find your answer? Our team is happy to help." />
          <div className="mt-6">
            <HomeLink to="/contact" className="inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 transition-colors hover:text-brand-900">
              Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
        </div>
        <div className="space-y-3">
          {p.faqs.map((q, i) => (
            <details
              key={q.question}
              open={i === 0}
              className="group rounded-2xl border border-neutral-200 bg-white transition-[background-color,border-color] open:border-brand-200 open:bg-aqua"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-base font-bold text-navy-950 transition-colors hover:text-brand-700 sm:text-lg [&::-webkit-details-marker]:hidden">
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
/* Related products                                                    */
/* ------------------------------------------------------------------ */

export function Related({ p }: { p: ProductPageContent }) {
  const id = `${p.slug}-related-title`;
  return (
    <PSection tone="soft" labelledBy={id}>
      <div className={CONTAINER}>
        <SectionTitle id={id} title="Works well with" sub={`Products organisations often use alongside ${p.name}.`} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {p.related.map((slug) => {
            const r = PRODUCT_PAGES[slug];
            const Icon = PRODUCT_ICONS[slug];
            const photo = PRODUCT_PHOTOS[slug];
            return (
              <li key={slug}>
                <HomeLink to={r.route} className="hv-lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={photo.src}
                      alt=""
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                      style={{ objectPosition: photo.pos }}
                    />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-md">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4 p-6">
                    <div>
                      <h3 className="text-lg font-bold text-navy-950">{r.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">{r.navDescription}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-brand-700" aria-hidden="true" />
                  </div>
                </HomeLink>
              </li>
            );
          })}
        </ul>
      </div>
    </PSection>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCTA({ p }: { p: ProductPageContent }) {
  const id = `${p.slug}-cta-title`;
  const Icon = PRODUCT_ICONS[p.slug];
  return (
    <section aria-labelledby={id} className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <Icon aria-hidden="true" className="absolute -bottom-10 -right-6 h-64 w-64 text-white/[0.05]" strokeWidth={1} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id={id} className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
              {p.cta.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{p.cta.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <GetStartedButton product={p.name} />
            <DemoButton product={p.name} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small helper: "Example data" caption for previews. */
export function ExampleNote({ dark = false }: { dark?: boolean }) {
  return <p className={`mt-4 text-center text-xs ${dark ? 'text-white/55' : 'text-neutral-500'}`}>Preview shows example data.</p>;
}
