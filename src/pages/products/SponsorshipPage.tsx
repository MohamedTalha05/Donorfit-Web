import React from 'react';
import { BookOpen, GraduationCap, HeartHandshake, Users, LineChart, ShieldCheck } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
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
  useProductPage,
  useProductPhoto,
  useProductBadge,
} from '../../components/product/ProductKit.tsx';
import { SponsorshipPreview } from '../../components/product/ProductPreviews.tsx';

export default function SponsorshipPage() {
  const p = useProductPage('sponsorship');
  const photo = useProductPhoto('sponsorship');
  const badge = useProductBadge('sponsorship');
  const t = useT('products');
  const { eur, int } = useFormat();
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: centred headline over aqua, wide photo band with the sponsor ↔ student link */}
      <section aria-labelledby="spo-hero" className="relative bg-gradient-to-b from-aqua to-white pt-16 sm:pt-24">
        <div className={`${CONTAINER} text-center`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" /> {badge}
          </span>
          <h1 id="spo-hero" className="mx-auto mt-6 max-w-4xl text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl lg:text-7xl">
            {p.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <GetStartedButton product={p.name} />
            <DemoButton product={p.name} dark={false} />
          </div>
        </div>
        <div className={`${CONTAINER} relative mt-16`}>
          <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)]">
            <img src={photo.src} alt={photo.alt} width={1600} height={1200} fetchPriority="high" className="h-72 w-full object-cover sm:h-[26rem]" style={{ objectPosition: '55% 40%' }} />
          </div>
          {/* sponsor ↔ student link */}
          <div aria-hidden="true" className="relative mx-auto -mt-14 flex max-w-3xl flex-col items-stretch gap-3 px-4 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex-1 rounded-2xl bg-white p-4 text-left shadow-xl ring-1 ring-neutral-200">
              <div className="text-[11px] text-neutral-500">{t('sections.sponsorship.hero.sponsor')}</div>
              <div className="font-bold text-navy-950">Marc L.</div>
              <div className="text-xs tabular-nums text-brand-800">{t('sections.sponsorship.hero.monthly', { amount: eur(30) })}</div>
            </div>
            <div className="hidden w-20 items-center sm:flex">
              <span className="h-0.5 flex-1 border-t-2 border-dashed border-brand-500" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-navy-950">
                <HeartHandshake className="h-4 w-4" />
              </span>
              <span className="h-0.5 flex-1 border-t-2 border-dashed border-brand-500" />
            </div>
            <div className="flex-1 rounded-2xl bg-navy-950 p-4 text-left text-white shadow-xl">
              <div className="text-[11px] text-white/60">{t('sections.sponsorship.hero.student')}</div>
              <div className="font-bold">{t('sections.sponsorship.hero.studentName', { name: 'Yusuf', age: int(11) })}</div>
              <div className="text-xs text-white/70">{t('sections.sponsorship.hero.funded', { grade: int(5), funded: int(8), total: int(12) })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + problems */}
      <PSection labelledBy="spo-intro">
        <div className={CONTAINER}>
          <SectionTitle id="spo-intro" title={p.intro.title} sub={p.intro.body} />
          <ProblemSolution p={p} variant="split" />
        </div>
      </PSection>

      {/* Features */}
      <PSection tone="soft" labelledBy="spo-features">
        <div className={CONTAINER}>
          <SectionTitle id="spo-features" align="center" title={t('sections.sponsorship.featuresTitle')} />
          <Features p={p} variant="grid" icons={[GraduationCap, BookOpen, HeartHandshake, Users, LineChart, ShieldCheck]} />
        </div>
      </PSection>

      {/* Preview + steps */}
      <PSection labelledBy="spo-preview">
        <div className={`${CONTAINER} grid items-start gap-14 lg:grid-cols-[1.5fr_1fr]`}>
          <div className="order-2 lg:order-1">
            <SponsorshipPreview />
            <ExampleNote />
          </div>
          <div className="order-1 lg:order-2 lg:pt-6">
            <SectionTitle id="spo-preview" title={t('sections.sponsorship.previewTitle')} sub={t('sections.sponsorship.previewSub')} />
            <Steps p={p} variant="stack" />
          </div>
        </div>
      </PSection>

      {/* Benefits + audiences on navy */}
      <PSection tone="navy" labelledBy="spo-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="spo-benefits" dark title={t('sections.sponsorship.benefitsTitle')} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {p.benefits.map((b) => (
              <div key={b.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-7">
                <h3 className="text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{b.description}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-16 text-xl font-bold text-white">{t('ui.builtFor')}</h3>
          <Audiences p={p} dark />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
