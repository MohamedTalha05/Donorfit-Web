import React from 'react';
import { PiggyBank, Link2, Target, UsersRound, ReceiptText, Share2 } from 'lucide-react';
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
import { MoneyPoolPreview } from '../../components/product/ProductPreviews.tsx';

const p = PRODUCT_PAGES['money-pool'];

export default function MoneyPoolPage() {
  const photo = PRODUCT_PHOTOS['money-pool'];
  const pct = 73;
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: reversed split, circular photo with contributor avatars */}
      <section aria-labelledby="mp-hero" className="relative overflow-hidden bg-gradient-to-br from-aqua via-white to-soft pb-20 pt-14 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]`}>
          <div aria-hidden="true" className="relative order-2 mx-auto w-full max-w-md lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-full ring-[14px] ring-white shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)]">
              <img
                src={photo.src}
                alt=""
                width={1600}
                height={1067}
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{ objectPosition: '45% 35%' }}
              />
            </div>
            {/* contributors orbit */}
            {[
              ['AR', 'left-0 top-10 bg-navy-950 text-white'],
              ['SO', 'right-2 top-4 bg-brand-500 text-navy-950'],
              ['FK', '-left-2 bottom-24 bg-brand-100 text-brand-900'],
              ['+140', 'right-0 bottom-28 bg-white text-navy-950 ring-1 ring-neutral-200'],
            ].map(([t, cls]) => (
              <span key={t} className={`absolute flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold shadow-lg ${cls}`}>
                {t}
              </span>
            ))}
            <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl">
              <div className="flex items-baseline justify-between">
                <span className="hv-display text-xl font-extrabold tabular-nums text-navy-950">{eur(8760)}</span>
                <span className="text-xs tabular-nums text-neutral-500">of {eur(12000)}</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand-50">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-neutral-500">143 contributors · example pool</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              <PiggyBank className="h-3.5 w-3.5" aria-hidden="true" /> Donorfit Money Pool
            </span>
            <h1 id="mp-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} />
              <DemoButton product={p.name} dark={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Intro + problems */}
      <PSection labelledBy="mp-intro">
        <div className={CONTAINER}>
          <SectionTitle id="mp-intro" title={p.intro.title} sub={p.intro.body} />
          <ProblemSolution p={p} variant="rows" />
        </div>
      </PSection>

      {/* Preview first, then features */}
      <PSection tone="navy" labelledBy="mp-preview" className="overflow-hidden">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative`}>
          <SectionTitle id="mp-preview" dark align="center" title="A pool your whole community can follow" sub="A live progress ring, words of encouragement and one-tap sharing." />
          <div className="mx-auto mt-12 max-w-4xl">
            <MoneyPoolPreview />
            <ExampleNote dark />
          </div>
        </div>
      </PSection>

      <PSection labelledBy="mp-features">
        <div className={CONTAINER}>
          <SectionTitle id="mp-features" title="Everything to run a pool" />
          <Features p={p} variant="list" icons={[PiggyBank, Link2, Target, UsersRound, ReceiptText, Share2]} />
        </div>
      </PSection>

      {/* Steps + use cases */}
      <PSection tone="aqua" labelledBy="mp-steps">
        <div className={CONTAINER}>
          <SectionTitle id="mp-steps" title="How a pool works" />
          <Steps p={p} variant="line" />
          <h3 className="mt-20 text-xl font-bold text-navy-950">Use cases for organisations and communities</h3>
          <Audiences p={p} />
        </div>
      </PSection>

      <PSection tone="soft" labelledBy="mp-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="mp-benefits" title="Why pools work" />
          <Benefits p={p} variant="tiles" />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
