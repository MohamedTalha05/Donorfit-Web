import React from 'react';
import { MapPin, PlusSquare, HandCoins, Target, Megaphone, FolderOpen, Droplets } from 'lucide-react';
import { useFormat, useT, useTx } from '../../i18n/index.tsx';
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
import { WaterWellPreview } from '../../components/product/ProductPreviews.tsx';

export default function WaterWellPage() {
  const tx = useTx('products');
  const p = useProductPage('water-well');
  const photo = useProductPhoto('water-well');
  const badge = useProductBadge('water-well');
  const t = useT('products');
  const { eur } = useFormat();
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: immersive full-bleed photograph */}
      <section aria-labelledby="ww-hero" className="relative isolate flex min-h-[38rem] items-end overflow-hidden text-white sm:min-h-[44rem]">
        <img
          src={photo.src}
          alt={photo.alt}
          width={1600}
          height={1067}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: '45% 45%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />
        <div className={`${CONTAINER} grid w-full items-end gap-10 pb-14 pt-40 sm:pb-20 lg:grid-cols-[1.4fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur">
              <Droplets className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" /> {badge}
            </span>
            <h1 id="ww-hero" className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} />
              <DemoButton product={p.name} />
            </div>
          </div>
          {/* Campaign progress card */}
          <div aria-hidden="true" className="hidden rounded-3xl bg-white/95 p-6 text-navy-950 shadow-2xl backdrop-blur lg:block">
            <div className="flex items-center gap-2 text-xs font-bold">
              <MapPin className="h-4 w-4 text-brand-600" /> {t('sections.water-well.hero.project')}
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="hv-display text-3xl font-extrabold tabular-nums">{eur(3420)}</span>
              <span className="text-sm tabular-nums text-neutral-500">{t('sections.water-well.hero.of', { amount: eur(4500) })}</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-brand-50">
              <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1.5 text-[10px] font-semibold">
              {tx<string[]>('sections.water-well.hero.stages').map((s, i) => (
                <span key={s} className={`rounded-md py-1.5 text-center ${i < 2 ? 'bg-brand-600 text-white' : i === 2 ? 'bg-navy-950 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-neutral-500">{t('sections.water-well.hero.note')}</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <PSection labelledBy="ww-intro">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20`}>
          <SectionTitle id="ww-intro" title={p.intro.title} />
          <div>
            <p className="text-lg leading-relaxed text-neutral-600">{p.intro.body}</p>
          </div>
        </div>
        <div className={CONTAINER}>
          <ProblemSolution p={p} variant="rows" />
        </div>
      </PSection>

      {/* Features bento */}
      <PSection tone="aqua" labelledBy="ww-features">
        <div className={CONTAINER}>
          <SectionTitle id="ww-features" title={t('sections.water-well.featuresTitle')} />
          <Features p={p} variant="bento" icons={[MapPin, PlusSquare, HandCoins, Target, Megaphone, FolderOpen]} />
        </div>
      </PSection>

      {/* Campaign preview */}
      <PSection labelledBy="ww-preview">
        <div className={CONTAINER}>
          <SectionTitle id="ww-preview" align="center" title={t('sections.water-well.previewTitle')} sub={t('sections.water-well.previewSub')} />
          <div className="mx-auto mt-12 max-w-5xl">
            <WaterWellPreview />
            <ExampleNote />
          </div>
        </div>
      </PSection>

      {/* How it works on navy */}
      <PSection tone="navy" labelledBy="ww-steps">
        <div className={CONTAINER}>
          <SectionTitle id="ww-steps" dark title={t('sections.water-well.stepsTitle')} />
          <Steps p={p} variant="line" dark />
        </div>
      </PSection>

      {/* Benefits + audiences */}
      <PSection tone="soft" labelledBy="ww-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="ww-benefits" title={t('sections.water-well.benefitsTitle')} />
          <Benefits p={p} variant="tiles" />
          <h3 className="mt-16 text-xl font-bold text-navy-950">{t('sections.water-well.audiencesTitle')}</h3>
          <Audiences p={p} />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
