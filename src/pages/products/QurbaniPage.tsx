import React from 'react';
import { Moon, ListChecks, HandCoins, ClipboardList, UserRound, CreditCard, BarChart3 } from 'lucide-react';
import { PRODUCT_PAGES } from '../../data/productPages.ts';
import { eur } from '../../components/home/mockKit.tsx';
import {
  CONTAINER,
  PSection,
  SectionTitle,
  GetStartedButton,
  DemoButton,
  ProblemSolution,
  Features,
  Steps,
  Benefits,
  Audiences,
  FAQ,
  Related,
  FinalCTA,
  ExampleNote,
  PRODUCT_PHOTOS,
} from '../../components/product/ProductKit.tsx';
import { QurbaniPreview } from '../../components/product/ProductPreviews.tsx';

const p = PRODUCT_PAGES.qurbani;

/** Example Qurbani options shown in the hero (organisations set their own). */
const EXAMPLE_OPTIONS = [
  { name: 'Sheep or goat', note: 'One share', price: 150 },
  { name: 'Cow', note: 'One-seventh share', price: 95 },
  { name: 'Camel', note: 'One-seventh share', price: 140 },
];

export default function QurbaniPage() {
  const photo = PRODUCT_PHOTOS.qurbani;
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: navy with crescent, option picker + photo arch */}
      <section aria-labelledby="qu-hero" className="hv-hero-bg relative isolate overflow-hidden pb-20 pt-16 text-white sm:pt-24">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-16 -top-16 -z-10 h-[28rem] w-[28rem] text-brand-500/15">
          <path d="M140 20a90 90 0 1 0 40 150A75 75 0 1 1 140 20Z" fill="currentColor" />
        </svg>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              <Moon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" /> Donorfit Qurbani
            </span>
            <h1 id="qu-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} />
              <DemoButton product={p.name} />
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-t-[10rem] rounded-b-[2rem] ring-1 ring-white/15">
              <img src={photo.src} alt={photo.alt} width={1600} height={1067} fetchPriority="high" className="h-[22rem] w-full object-cover sm:h-[28rem]" style={{ objectPosition: photo.pos }} />
            </div>
            <div aria-hidden="true" className="absolute -bottom-10 left-1/2 w-[min(22rem,92%)] -translate-x-1/2 rounded-2xl bg-white p-4 text-navy-950 shadow-2xl">
              <div className="text-xs font-bold">Choose your Qurbani</div>
              <ul className="mt-3 space-y-1.5 text-xs">
                {EXAMPLE_OPTIONS.map((o, i) => (
                  <li key={o.name} className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 0 ? 'bg-brand-50 ring-1 ring-brand-300' : 'bg-soft'}`}>
                    <span>
                      <span className="font-semibold">{o.name}</span> <span className="text-neutral-500">· {o.note}</span>
                    </span>
                    <span className="font-bold tabular-nums">{eur(o.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-center text-[10px] text-neutral-500">Example options — you set your own</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + problems */}
      <PSection labelledBy="qu-intro" className="pt-28 sm:pt-36">
        <div className={CONTAINER}>
          <SectionTitle id="qu-intro" align="center" title={p.intro.title} sub={p.intro.body} />
          <div className="mx-auto max-w-5xl">
            <ProblemSolution p={p} variant="split" />
          </div>
        </div>
      </PSection>

      {/* Features as rows on navy */}
      <PSection tone="navy" labelledBy="qu-features">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="qu-features" dark title="Built around the Qurbani season" sub="From the options you offer to the payment for every share." />
          </div>
          <Features p={p} variant="rows" icons={[ListChecks, HandCoins, ClipboardList, UserRound, CreditCard, BarChart3]} />
        </div>
      </PSection>

      {/* Preview */}
      <PSection labelledBy="qu-preview">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.5fr]`}>
          <div>
            <SectionTitle id="qu-preview" title="Every contribution in one list" sub="See contributions per option, the donor behind each one and whether it has been paid." />
            <Steps p={p} variant="stack" />
          </div>
          <div>
            <QurbaniPreview />
            <ExampleNote />
          </div>
        </div>
      </PSection>

      {/* Benefits + audiences */}
      <PSection tone="aqua" labelledBy="qu-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="qu-benefits" title="Benefits for your organisation" />
          <Benefits p={p} variant="statements" />
          <h3 className="mt-16 text-xl font-bold text-navy-950">Who uses Qurbani</h3>
          <Audiences p={p} />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
