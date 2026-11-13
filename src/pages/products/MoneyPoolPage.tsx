import React from 'react';
import {
  PiggyBank,
  Link2,
  Target,
  UsersRound,
  ReceiptText,
  Share2,
  Coins,
  HeartHandshake,
  Check,
  MessageCircle,
  Mail,
  QrCode,
  PenLine,
  LineChart,
} from 'lucide-react';
import { useFormat, useT, useTx } from '../../i18n/index.tsx';
import { SECTION_PHOTOS } from '../../components/home/sectionPhotos.ts';
import {
  CONTAINER,
  PSection,
  SectionTitle,
  GetStartedButton,
  DemoButton,
  Features,
  Benefits,
  FAQ,
  Related,
  FinalCTA,
  useProductPage,
  useProductPhoto,
  useProductBadge,
} from '../../components/product/ProductKit.tsx';
import MoneyPoolDashboard, { DEMO, DEMO_PCT, Marker } from '../../components/product/MoneyPoolDashboard.tsx';

type TitleBody = { title: string; body: string };

/** The core idea, as one equation (text from sections.money-pool.equation). */
const EQUATION_ICONS = [Target, UsersRound, Coins, HeartHandshake];
const STEP_ICONS = [PenLine, Share2, Coins, LineChart];
const SHARE_ICONS = [MessageCircle, Mail, Link2, QrCode];
const AUDIENCE_PHOTOS = [
  SECTION_PHOTOS.solutionNgo,
  SECTION_PHOTOS.solutionCharities,
  SECTION_PHOTOS.solutionTrust,
  SECTION_PHOTOS.solutionMasjid,
  SECTION_PHOTOS.campaignClassroom,
  SECTION_PHOTOS.campaignWinter,
];

export default function MoneyPoolPage() {
  const p = useProductPage('money-pool');
  const hero = useProductPhoto('money-pool');
  const badge = useProductBadge('money-pool');
  const t = useT('products');
  const tx = useTx('products');
  const s = (key: string, vars?: Record<string, string | number>) => t(`sections.money-pool.${key}`, vars);
  const { eur, int } = useFormat();

  const equation = tx<{ lead: string; term: string; note: string }[]>('sections.money-pool.equation');
  const legend = tx<TitleBody[]>('sections.money-pool.legend');
  const steps = tx<TitleBody[]>('sections.money-pool.steps');
  const sharing = tx<string[]>('sections.money-pool.sharing');
  const audiences = tx<(TitleBody & { alt: string })[]>('sections.money-pool.audiences');
  const whatBody = tx<string[]>('sections.money-pool.whatBody');

  const sharingList = (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label={s('sharingLabel')}>
      {sharing.map((l, i) => {
        const Icon = SHARE_ICONS[i % SHARE_ICONS.length];
        return (
          <li key={l} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-brand-200">
            <Icon className="h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
            {l}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="mp-hero" className="relative overflow-hidden bg-gradient-to-b from-aqua to-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              <PiggyBank className="h-3.5 w-3.5" aria-hidden="true" /> {badge}
            </span>
            <h1 id="mp-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} label={s('ctaPrimary')} />
              <DemoButton product={p.name} dark={false} />
            </div>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-500">{s('heroAudience')}</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)]">
              <img
                src={hero.src}
                alt={hero.alt}
                width={1600}
                height={1067}
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{ objectPosition: '42% 35%' }}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            </div>
            {/* Example campaign card */}
            <div className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-white p-5 shadow-2xl sm:-left-8 sm:right-auto sm:w-80">
              <p className="text-[11px] font-medium text-neutral-500">{s('heroCard.label')}</p>
              <p className="hv-display mt-0.5 text-base font-extrabold text-navy-950">{s('dashboard.campaign')}</p>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="hv-display text-xl font-extrabold tabular-nums text-navy-950">{eur(DEMO.raised)}</span>
                <span className="text-xs tabular-nums text-neutral-500">{s('heroCard.ofGoal', { amount: eur(DEMO.goal) })}</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand-50" aria-hidden="true">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${DEMO_PCT}%` }} />
              </div>
              <p className="mt-2 text-[11px] tabular-nums text-neutral-500">
                {s('heroCard.meta', { count: int(DEMO.contributors), days: int(DEMO.daysLeft) })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Equation */}
      <section aria-labelledby="mp-equation" className="hv-dark-bg relative overflow-hidden py-20 text-white sm:py-24">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative`}>
          <h2 id="mp-equation" className="max-w-2xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            {s('equationTitle')}
          </h2>
          <ol className="mt-12 grid items-start gap-y-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-x-6">
            {equation.map((e, i) => {
              const Icon = EQUATION_ICONS[i % EQUATION_ICONS.length];
              const op = i === equation.length - 1 ? null : i === equation.length - 2 ? '=' : '+';
              const last = i === equation.length - 1;
              return (
                <React.Fragment key={e.term}>
                  <li className={`rounded-[1.5rem] p-6 ${last ? 'bg-brand-500 text-navy-950' : 'border border-white/10 bg-white/[0.04]'}`}>
                    <Icon className={`h-6 w-6 ${last ? 'text-navy-950' : 'text-brand-400'}`} aria-hidden="true" />
                    <p className="hv-display mt-5 text-4xl font-extrabold leading-none sm:text-5xl">{e.lead}</p>
                    <p className={`hv-display mt-1 text-xl font-bold ${last ? 'text-navy-950' : 'text-white'}`}>{e.term}</p>
                    <p className={`mt-3 text-sm leading-relaxed ${last ? 'text-navy-900' : 'text-white/65'}`}>{e.note}</p>
                  </li>
                  {op && (
                    <li aria-hidden="true" className="hv-display flex items-center justify-center text-4xl font-extrabold text-brand-400 lg:h-full">
                      {op}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------- What it is and why */}
      <PSection labelledBy="mp-what">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="relative order-2 lg:order-1">
            <img
              src={SECTION_PHOTOS.campaignFood.src}
              alt={s('photos.food')}
              width={SECTION_PHOTOS.campaignFood.width}
              height={SECTION_PHOTOS.campaignFood.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[1.75rem] object-cover"
              style={{ objectPosition: SECTION_PHOTOS.campaignFood.pos }}
            />
            <img
              src={SECTION_PHOTOS.ctaCommunity.src}
              alt={s('photos.textbooks')}
              width={SECTION_PHOTOS.ctaCommunity.width}
              height={SECTION_PHOTOS.ctaCommunity.height}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-10 -right-2 hidden aspect-square w-44 rounded-[1.5rem] object-cover ring-8 ring-white sm:block lg:-right-8 lg:w-52"
              style={{ objectPosition: SECTION_PHOTOS.ctaCommunity.pos }}
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 id="mp-what" className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
              {s('whatTitle')}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-neutral-600">
              {whatBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <h3 className="mt-10 text-lg font-bold text-navy-950">{s('whyTitle')}</h3>
            <ul className="mt-4 space-y-4">
              {p.problems.map((x) => (
                <li key={x.solution} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="text-neutral-500">{x.problem}</span> <strong className="font-semibold text-navy-950">{x.solution}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PSection>

      {/* ---------------------------------------------------- Dashboard */}
      <PSection tone="aqua" labelledBy="mp-dashboard">
        <div className={CONTAINER}>
          <SectionTitle id="mp-dashboard" title={s('dashboardTitle')} sub={s('dashboardSub')} />
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
            <MoneyPoolDashboard />
            <ol className="space-y-7 lg:pt-14">
              {legend.map((l, i) => (
                <li key={l.title} className="flex gap-4">
                  <Marker n={i + 1} className="mt-0.5 ring-aqua" />
                  <div>
                    <h3 className="text-base font-bold text-navy-950">{l.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{l.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PSection>

      {/* -------------------------------------------------- How it works */}
      <PSection labelledBy="mp-steps">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="mp-steps" title={s('stepsTitle')} sub={s('stepsSub')} />
            <div className="mt-8">
              <GetStartedButton product={p.name} label={s('ctaPrimary')} />
            </div>
          </div>
          <ol className="relative">
            {steps.map((st, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <li key={st.title} className="relative flex gap-5 pb-12 last:pb-0">
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="absolute left-6 top-14 h-[calc(100%-3.5rem)] w-px bg-brand-200" />
                  )}
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-brand-700">{s('stepLabel', { n: i + 1 })}</p>
                    <h3 className="mt-0.5 text-xl font-bold text-navy-950">{st.title}</h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neutral-600">{st.body}</p>
                    {i === 1 && sharingList}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </PSection>

      {/* ------------------------------------------------------ Features */}
      <PSection tone="soft" labelledBy="mp-features">
        <div className={CONTAINER}>
          <SectionTitle id="mp-features" title={s('featuresTitle')} />
          <Features p={p} variant="list" icons={[PiggyBank, Link2, Target, UsersRound, ReceiptText, Share2]} />
        </div>
      </PSection>

      {/* ----------------------------------------------------- Audiences */}
      <PSection labelledBy="mp-audiences">
        <div className={CONTAINER}>
          <SectionTitle id="mp-audiences" title={s('audiencesTitle')} sub={s('audiencesSub')} />
          <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {audiences.map((a, i) => {
              const photo = AUDIENCE_PHOTOS[i % AUDIENCE_PHOTOS.length];
              return (
                <li key={a.title} className="flex items-center gap-5">
                  <img
                    src={photo.src}
                    alt={a.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-28"
                    style={{ objectPosition: photo.pos }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-navy-950">{a.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{a.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      {/* ------------------------------------------------------ Benefits */}
      <PSection tone="aqua" labelledBy="mp-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="mp-benefits" title={s('benefitsTitle')} />
          <Benefits p={p} variant="statements" />
        </div>
      </PSection>

      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
