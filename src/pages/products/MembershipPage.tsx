import React from 'react';
import { UserPlus, Layers, IdCard, Landmark, RefreshCw, Users, QrCode } from 'lucide-react';
import { PRODUCT_PAGES } from '../../data/productPages.ts';
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
import { MembershipPreview } from '../../components/product/ProductPreviews.tsx';

const p = PRODUCT_PAGES.membership;

export default function MembershipPage() {
  const photo = PRODUCT_PHOTOS.membership;
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: split, photo with a membership card */}
      <section aria-labelledby="mem-hero" className="relative bg-soft pb-20 pt-14 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              <IdCard className="h-3.5 w-3.5" aria-hidden="true" /> Donorfit Membership
            </span>
            <h1 id="mem-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} />
              <DemoButton product={p.name} dark={false} />
            </div>
          </div>
          <div className="relative px-2 sm:px-8">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)]">
              <img src={photo.src} alt={photo.alt} width={1600} height={1067} fetchPriority="high" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: photo.pos }} />
            </div>
            {/* Membership card illustration */}
            <div
              aria-hidden="true"
              className="absolute -bottom-10 left-0 w-72 rotate-[-4deg] rounded-2xl bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 p-5 text-white shadow-2xl sm:-left-4 sm:w-80"
            >
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Member card</span>
                <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-navy-950">Active</span>
              </div>
              <div className="hv-display mt-5 text-xl font-extrabold">Amina Khan</div>
              <div className="mt-1 text-xs text-white/70">Individual plan · member since 2021</div>
              <div className="mt-5 flex items-end justify-between">
                <div className="text-[11px] text-white/60">
                  Renews
                  <div className="text-sm font-semibold text-white">12 March</div>
                </div>
                <QrCode className="h-10 w-10 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <PSection labelledBy="mem-intro">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <SectionTitle id="mem-intro" title={p.intro.title} />
          <p className="text-lg leading-relaxed text-neutral-600 lg:pt-3">{p.intro.body}</p>
        </div>
        <div className={CONTAINER}>
          <ProblemSolution p={p} variant="rows" />
        </div>
      </PSection>

      {/* Features */}
      <PSection tone="soft" labelledBy="mem-features">
        <div className={CONTAINER}>
          <SectionTitle id="mem-features" title="From sign-up to renewal" sub="Everything you need to run memberships, in the order your members experience it." />
          <Features p={p} variant="list" icons={[UserPlus, Layers, IdCard, Landmark, RefreshCw, Users]} />
        </div>
      </PSection>

      {/* Preview */}
      <PSection tone="navy" labelledBy="mem-preview" className="overflow-hidden">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative grid items-center gap-12 lg:grid-cols-[1fr_1.6fr]`}>
          <div>
            <SectionTitle id="mem-preview" dark title="Your members at a glance" sub="See who is active, whose renewal is due and who has lapsed — and export an up-to-date list for your general assembly." />
            <div className="mt-10">
              <Steps p={p} variant="stack" dark />
            </div>
          </div>
          <div>
            <MembershipPreview />
            <ExampleNote dark />
          </div>
        </div>
      </PSection>

      {/* Benefits & audiences */}
      <PSection tone="aqua" labelledBy="mem-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="mem-benefits" title="What changes for your organisation" />
          <Benefits p={p} variant="statements" />
          <h3 className="mt-20 text-xl font-bold text-navy-950">Built for</h3>
          <Audiences p={p} />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
