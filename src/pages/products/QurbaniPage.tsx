import React from 'react';
import {
  Moon,
  ListChecks,
  HandCoins,
  ClipboardList,
  UserRound,
  CreditCard,
  BarChart3,
  HandHeart,
  Check,
  Landmark,
  HeartHandshake,
  ReceiptText,
  UsersRound,
} from 'lucide-react';
import { useT, useTx } from '../../i18n/index.tsx';
import marketImg from '../../assets/images/qurbani/eid-cattle-market.jpg';
import decoratedCowImg from '../../assets/images/qurbani/decorated-cow.jpg';
import cattleRestingImg from '../../assets/images/qurbani/cattle-resting.jpg';
import {
  CONTAINER,
  PSection,
  SectionTitle,
  GetStartedButton,
  Features,
  FAQ,
  Related,
  ExampleNote,
  PRODUCT_PHOTOS,
  useProductPage,
} from '../../components/product/ProductKit.tsx';
import { QurbaniPreview } from '../../components/product/ProductPreviews.tsx';

/** Page-specific copy from products.json → sections.qurbani (en/de). */
interface QurbaniSections {
  ctaStart: string;
  photos: { hero: string; intro: string; why: string };
  hero: { choose: string; options: { name: string; note: string }[]; selected: string; note: string };
  introPoints: string[];
  howTitle: string;
  howSub: string;
  actors: { donor: string; org: string };
  featuresTitle: string;
  featuresSub: string;
  previewTitle: string;
  previewSub: string;
  audiencesTitle: string;
  audiencesSub: string;
  whyTitle: string;
  why: string[];
}

const STEP_ICONS = [ListChecks, CreditCard, ClipboardList, HandHeart];
const FEATURE_ICONS = [ListChecks, HandCoins, ClipboardList, UserRound, CreditCard, BarChart3];
const INTRO_ICONS = [ListChecks, ReceiptText, UsersRound];
const AUDIENCE_ICONS = [Moon, HeartHandshake, Landmark, UsersRound];

export default function QurbaniPage() {
  const tx = useTx('products');
  const t = useT('products');
  // Localised page content, with the route data (slug, route, related) from productPages.ts.
  const p = useProductPage('qurbani');
  const s = tx<QurbaniSections>('sections.qurbani');
  const goats = PRODUCT_PHOTOS.qurbani;

  const stepGroups = [
    { actor: s.actors.donor, steps: p.steps.slice(0, 2), offset: 0, dark: false },
    { actor: s.actors.org, steps: p.steps.slice(2, 4), offset: 2, dark: true },
  ];

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="qu-hero" className="hv-hero-bg relative isolate overflow-hidden pb-24 pt-16 text-white sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-16 -top-16 -z-10 h-[28rem] w-[28rem] text-brand-500/15">
          <path d="M140 20a90 90 0 1 0 40 150A75 75 0 1 1 140 20Z" fill="currentColor" />
        </svg>
        <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              <Moon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" /> {t('ui.badge', { name: p.name })}
            </span>
            <h1 id="qu-hero" className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] sm:text-[3.5rem]">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} label={s.ctaStart} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-t-[10rem] rounded-b-[2rem] ring-1 ring-white/15">
              <img
                src={marketImg}
                alt={s.photos.hero}
                width={1100}
                height={1650}
                fetchPriority="high"
                className="h-[26rem] w-full object-cover sm:h-[32rem]"
                style={{ objectPosition: '55% 55%' }}
              />
            </div>
            {/* Example option picker: no prices, organisations set their own */}
            <div aria-hidden="true" className="relative mx-auto -mt-14 w-[min(22rem,92%)] rounded-2xl sm:absolute sm:-bottom-12 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 bg-white p-4 text-navy-950 shadow-2xl">
              <div className="text-sm font-bold">{s.hero.choose}</div>
              <ul className="mt-3 space-y-1.5 text-xs">
                {s.hero.options.map((o, i) => (
                  <li
                    key={o.name}
                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${i === 0 ? 'bg-brand-50 ring-1 ring-brand-300' : 'bg-soft'}`}
                  >
                    <span>
                      <span className="font-semibold">{o.name}</span> <span className="text-neutral-500">{o.note}</span>
                    </span>
                    {i === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-800">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} /> {s.hero.selected}
                      </span>
                    ) : (
                      <span className="h-4 w-4 rounded-full ring-1 ring-neutral-300" />
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-center text-[10px] leading-snug text-neutral-500">{s.hero.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- What is Qurbani */}
      <PSection labelledBy="qu-intro" className="pt-32 sm:pt-36">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <h2 id="qu-intro" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
              {p.intro.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">{p.intro.body}</p>
            <ul className="mt-8 space-y-4">
              {s.introPoints.map((point, i) => {
                const Icon = INTRO_ICONS[i % INTRO_ICONS.length];
                return (
                  <li key={point} className="flex items-center gap-4 text-[15px] font-medium text-navy-950">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Two livestock photos: decorated cow at an Eid market, goats and rams at a livestock market */}
          <div className="relative pb-10 sm:pb-14">
            <img
              src={decoratedCowImg}
              alt={s.photos.intro}
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              style={{ objectPosition: '45% 40%' }}
            />
            <img
              src={goats.src}
              alt={t('photos.qurbani')}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-2 -left-3 aspect-[4/3] w-40 rounded-[1.5rem] object-cover ring-8 ring-white sm:-left-8 sm:w-56"
              style={{ objectPosition: goats.pos }}
            />
          </div>
        </div>
      </PSection>

      {/* ---------------------------------------------------- How it works */}
      <section id="qu-how" tabIndex={-1} aria-labelledby="qu-how-title" className="relative scroll-mt-24 bg-aqua py-20 outline-none sm:py-28">
        <div className={CONTAINER}>
          <SectionTitle id="qu-how-title" title={s.howTitle} sub={s.howSub} />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-6">
            {stepGroups.map((g) => (
              <div key={g.actor}>
                {/* Who does these steps */}
                <div className="flex items-center gap-3">
                  <span className={`shrink-0 text-sm font-bold ${g.dark ? 'text-navy-950' : 'text-brand-800'}`}>{g.actor}</span>
                  <span aria-hidden="true" className={`h-1.5 flex-1 rounded-full ${g.dark ? 'bg-navy-950' : 'bg-brand-500'}`} />
                </div>
                <ol start={g.offset + 1} className="mt-5 grid gap-4 sm:grid-cols-2">
                  {g.steps.map((step, i) => {
                    const n = g.offset + i + 1;
                    const Icon = STEP_ICONS[n - 1];
                    return (
                      <li
                        key={step.title}
                        className={`flex flex-col rounded-[1.5rem] p-6 ${g.dark ? 'hv-dark-bg text-white' : 'bg-white ring-1 ring-brand-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`hv-display flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold ${
                              g.dark ? 'bg-brand-500 text-navy-950' : 'bg-navy-950 text-white'
                            }`}
                          >
                            {n}
                          </span>
                          <Icon className={`h-6 w-6 ${g.dark ? 'text-brand-300' : 'text-brand-600'}`} aria-hidden="true" />
                        </div>
                        <h3 className={`mt-6 text-lg font-bold ${g.dark ? 'text-white' : 'text-navy-950'}`}>{step.title}</h3>
                        <p className={`mt-1.5 text-[15px] leading-relaxed ${g.dark ? 'text-white/70' : 'text-neutral-600'}`}>{step.description}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Features */}
      <PSection labelledBy="qu-features">
        <div className={CONTAINER}>
          <SectionTitle id="qu-features" title={s.featuresTitle} sub={s.featuresSub} />
          <Features p={p} variant="grid" icons={FEATURE_ICONS} />
        </div>
      </PSection>

      {/* --------------------------------------------------------- Preview */}
      <PSection tone="soft" labelledBy="qu-preview">
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
          <SectionTitle id="qu-preview" title={s.previewTitle} sub={s.previewSub} />
          <div>
            <QurbaniPreview />
            <ExampleNote />
          </div>
        </div>
      </PSection>

      {/* ------------------------------------------------------- Audiences */}
      <PSection tone="navy" labelledBy="qu-audiences">
        <div className={CONTAINER}>
          <SectionTitle id="qu-audiences" dark title={s.audiencesTitle} sub={s.audiencesSub} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.audiences.map((a, i) => {
              const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
              return (
                <li key={a.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-navy-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{a.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{a.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* ------------------------------------------------------------- Why */}
      <PSection tone="aqua" labelledBy="qu-why">
        <div className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`}>
          <img
            src={cattleRestingImg}
            alt={s.photos.why}
            width={1100}
            height={1648}
            loading="lazy"
            decoding="async"
            className="order-2 aspect-[4/3] w-full rounded-[2rem] object-cover lg:order-1 lg:aspect-[4/5]"
            style={{ objectPosition: '50% 65%' }}
          />
          <div className="order-1 lg:order-2">
            <SectionTitle id="qu-why" title={s.whyTitle} />
            <ul className="mt-8 divide-y divide-brand-100 rounded-[1.75rem] bg-white px-6 ring-1 ring-brand-100 sm:px-8">
            {s.why.map((w) => (
              <li key={w} className="flex items-center gap-4 py-5 text-base font-semibold text-navy-950 sm:text-lg">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-navy-950">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                {w}
              </li>
            ))}
            </ul>
            <div className="mt-8">
              <GetStartedButton product={p.name} label={s.ctaStart} />
            </div>
          </div>
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />

      {/* ------------------------------------------------------- Final CTA */}
      <section aria-labelledby="qu-cta" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -bottom-20 -right-10 h-72 w-72 text-white/[0.06]">
            <path d="M140 20a90 90 0 1 0 40 150A75 75 0 1 1 140 20Z" fill="currentColor" />
          </svg>
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="qu-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {p.cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{p.cta.body}</p>
            </div>
            <div className="lg:justify-self-end">
              <GetStartedButton product={p.name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
