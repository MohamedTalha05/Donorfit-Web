import React from 'react';
import { GraduationCap, Users, ClipboardCheck, Wallet, HeartHandshake, FileBarChart, ShieldCheck } from 'lucide-react';
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
import { SchoolPreview } from '../../components/product/ProductPreviews.tsx';

const p = PRODUCT_PAGES['school-management'];

export default function SchoolManagementPage() {
  const photo = PRODUCT_PHOTOS['school-management'];
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: dashboard-first, photo as a framed inset */}
      <section aria-labelledby="sch-hero" className="relative overflow-hidden bg-soft pb-16 pt-14 sm:pt-20">
        <div className={CONTAINER}>
          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" /> Donorfit School Management
              </span>
              <h1 id="sch-hero" className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl">
                {p.headline}
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <GetStartedButton product={p.name} />
                <DemoButton product={p.name} dark={false} />
              </div>
            </div>
          </div>

          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_17rem]">
            <SchoolPreview />
            <div className="hidden overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)] lg:block">
              <img src={photo.src} alt={photo.alt} width={1600} height={1067} fetchPriority="high" className="h-full w-full object-cover" style={{ objectPosition: '62% 40%' }} />
            </div>
          </div>
          <ExampleNote />
        </div>
      </section>

      {/* Intro + problems */}
      <PSection labelledBy="sch-intro">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}>
          <div>
            <SectionTitle id="sch-intro" title={p.intro.title} sub={p.intro.body} />
          </div>
          <ProblemSolution p={p} variant="rows" />
        </div>
      </PSection>

      {/* Features grid */}
      <PSection tone="aqua" labelledBy="sch-features">
        <div className={CONTAINER}>
          <SectionTitle id="sch-features" align="center" title="School administration, fees and sponsorship together" />
          <Features p={p} variant="grid" icons={[Users, ClipboardCheck, Wallet, HeartHandshake, FileBarChart, ShieldCheck]} />
        </div>
      </PSection>

      {/* How it works */}
      <PSection labelledBy="sch-steps">
        <div className={CONTAINER}>
          <SectionTitle id="sch-steps" title="Up and running in three steps" />
          <Steps p={p} variant="line" />
        </div>
      </PSection>

      {/* Benefits + audiences on navy */}
      <PSection tone="navy" labelledBy="sch-benefits">
        <div className={`${CONTAINER} grid gap-14 lg:grid-cols-2`}>
          <div>
            <SectionTitle id="sch-benefits" dark title="Benefits for educational institutions" />
            <ul className="mt-10 space-y-6">
              {p.benefits.map((b) => (
                <li key={b.title} className="border-l-2 border-brand-500 pl-5">
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/70">{b.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white lg:mt-3">Who it is for</h3>
            <Audiences p={p} dark stacked />
          </div>
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
