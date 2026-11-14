import React from 'react';
import { UserRound, ListChecks, GraduationCap, ShieldCheck, MessageSquareText, RefreshCw, HeartHandshake, Link2, Lock } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
import { SOLUTION_PHOTOS, type SolutionText } from '../../data/solutions.ts';
import {
  CONTAINER,
  PSection,
  SectionTitle,
  SolutionShell,
  Breadcrumb,
  Badge,
  HeroActions,
  ExampleTag,
  Challenges,
  Helps,
  SolutionDetails,
  UseCases,
  HowItWorks,
  SolutionFAQ,
  SolutionCTA,
  OtherSolutions,
  SOLUTION_ICONS,
  useSolution,
} from '../../components/solutions/SolutionKit.tsx';

const SLUG = 'for-sponsorship-orgs' as const;

type SponsorshipText = SolutionText & {
  hero: SolutionText['hero'] & {
    recordTitle: string;
    sponsor: string;
    beneficiary: string;
    beneficiaryName: string;
    type: string;
    monthly: string;
    status: string;
    lastUpdate: string;
  };
  models: { title: string; sub: string; items: { title: string; text: string }[] };
  school: { title: string; text: string };
};

/** Sponsors (top row) → beneficiaries (bottom row) per sponsorship model. */
const MODEL_SHAPES: [number, number][] = [
  [1, 1],
  [3, 1],
  [4, 0],
];

function ModelDiagram({ sponsors, beneficiaries }: { sponsors: number; beneficiaries: number }) {
  return (
    <div aria-hidden="true" className="flex h-24 flex-col items-center justify-between rounded-2xl bg-aqua py-4">
      <div className="flex gap-2">
        {Array.from({ length: sponsors }).map((_, i) => (
          <span key={i} className="h-5 w-5 rounded-full bg-navy-950" />
        ))}
      </div>
      <span className="h-4 w-px bg-brand-500" />
      {beneficiaries ? (
        <span className="h-5 w-5 rounded-full bg-brand-500 ring-4 ring-white" />
      ) : (
        <span className="h-5 w-14 rounded-full bg-brand-500 ring-4 ring-white" />
      )}
    </div>
  );
}

export default function SponsorshipSolutionPage() {
  const s = useSolution<SponsorshipText>(SLUG);
  const t = useT('solutions');
  const [photo] = SOLUTION_PHOTOS[SLUG];
  const { eur } = useFormat();

  return (
    <SolutionShell>
      {/* Hero: photo left with a sponsorship record card, copy right */}
      <section aria-labelledby="spo-sol-hero" className="relative bg-soft pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16`}>
          <div className="order-2 lg:order-1">
            <div className="relative pb-28 sm:pb-20">
              <img
                src={photo.src}
                alt={s.hero.imageAlt}
                width={1400}
                height={933}
                fetchPriority="high"
                className="h-80 w-full rounded-[2rem] object-cover sm:h-[30rem]"
                style={{ objectPosition: photo.pos }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-4 right-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgb(0_24_64/0.55)] ring-1 ring-neutral-200 sm:left-8 sm:right-auto sm:w-[22rem]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-bold text-navy-950">
                    <HeartHandshake className="h-4 w-4 text-brand-700" />
                    {s.hero.recordTitle}
                  </p>
                  <ExampleTag />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-neutral-500">{s.hero.sponsor}</dt>
                    <dd className="font-bold text-navy-950">Anna K.</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500">{s.hero.beneficiary}</dt>
                    <dd className="font-bold text-navy-950">{s.hero.beneficiaryName}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-aqua px-2.5 py-0.5 font-semibold text-brand-800">{s.hero.type}</span>
                  <span className="tabular-nums text-neutral-700">{s.hero.monthly.replace('{{amount}}', eur(30))}</span>
                  <span className="rounded-full bg-navy-950 px-2.5 py-0.5 font-semibold text-white">{s.hero.status}</span>
                </div>
                <p className="mt-3 border-t border-neutral-100 pt-3 text-sm text-neutral-600">{s.hero.lastUpdate}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Breadcrumb slug={SLUG} />
            <div className="mt-6">
              <Badge icon={SOLUTION_ICONS[SLUG]}>{s.hero.badge}</Badge>
            </div>
            <h1 id="spo-sol-hero" className="mt-5 text-[2.3rem] font-extrabold leading-[1.05] text-navy-950 sm:text-[3.4rem]">
              {s.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{s.hero.lead}</p>
            <HeroActions slug={SLUG} />
          </div>
        </div>
      </section>

      <Challenges text={s} variant="rows" id="spo-sol-challenges" />
      <Helps text={s} tone="soft" id="spo-sol-helps" icons={[Link2, Lock, RefreshCw]} />

      {/* Signature: sponsorship models */}
      <PSection labelledBy="spo-sol-models">
        <div className={CONTAINER}>
          <SectionTitle id="spo-sol-models" title={s.models.title} sub={s.models.sub} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {s.models.items.map((m, i) => (
              <li key={m.title} className="rounded-[1.5rem] border border-neutral-200 bg-white p-6">
                <ModelDiagram sponsors={MODEL_SHAPES[i][0]} beneficiaries={MODEL_SHAPES[i][1]} />
                <h3 className="mt-6 text-xl font-bold text-navy-950">{m.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      <SolutionDetails block={s.solutions} variant="cards" tone="aqua" id="spo-sol-solutions" />

      {/* Platform features on navy, with School Management announced (not available) */}
      {s.tools && (
        <PSection tone="navy" labelledBy="spo-sol-features">
          <div className={CONTAINER}>
            <SectionTitle id="spo-sol-features" dark title={s.tools.title} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.tools.items.map((f, i) => {
                const Icon = [UserRound, ListChecks, GraduationCap, ShieldCheck, MessageSquareText, RefreshCw][i] ?? HeartHandshake;
                return (
                  <li key={f.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-7">
                    <Icon className="h-7 w-7 text-brand-300" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{f.text}</p>
                  </li>
                );
              })}
            </ul>
            <aside aria-labelledby="spo-sol-school" className="mt-6 flex flex-col gap-4 rounded-[1.5rem] border border-dashed border-white/25 p-7 sm:flex-row sm:items-start">
              <GraduationCap className="h-7 w-7 shrink-0 text-white/50" aria-hidden="true" />
              <div>
                <h3 id="spo-sol-school" className="flex flex-wrap items-center gap-3 text-lg font-bold text-white">
                  {s.school.title}
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80 ring-1 ring-white/20">{t('ui.comingSoon')}</span>
                </h3>
                <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-white/65">{s.school.text}</p>
              </div>
            </aside>
          </div>
        </PSection>
      )}

      <UseCases text={s} id="spo-sol-cases" />
      <HowItWorks text={s} id="spo-sol-steps" tone="soft" />
      <SolutionFAQ text={s} id="spo-sol-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="navy" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
