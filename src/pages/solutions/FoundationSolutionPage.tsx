import React from 'react';
import { FolderKanban, History, UserRound, Receipt, BarChart3, Webhook, CornerDownRight, CalendarRange, Target, Users, ShieldCheck, Network, Archive } from 'lucide-react';
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
  FeatureCards,
  SolutionFAQ,
  SolutionCTA,
  OtherSolutions,
  SOLUTION_ICONS,
  useSolution,
} from '../../components/solutions/SolutionKit.tsx';

const SLUG = 'for-foundations' as const;

type FoundationText = SolutionText & {
  board: { title: string; sub: string; items: { question: string; answer: string }[] };
  example: { title: string; body: string; programmes: string[]; ofTarget: string };
};

/** Example programme figures (raised, target). */
const PROGRAMMES: [number, number][] = [
  [42500, 60000],
  [27800, 30000],
  [9600, 25000],
];

export default function FoundationSolutionPage() {
  const s = useSolution<FoundationText>(SLUG);
  const t = useT('solutions');
  const [photo] = SOLUTION_PHOTOS[SLUG];
  const { eur } = useFormat();

  /** Three example programmes as separate campaigns (invented figures, labelled as example data). */
  const programmesMock = (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgb(0_24_64/0.45)] ring-1 ring-brand-200 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <p className="text-lg font-bold text-navy-950">{s.example.title}</p>
        <ExampleTag />
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.example.body}</p>
      <ul className="mt-6 space-y-6">
        {s.example.programmes.map((name, i) => {
          const [raised, target] = PROGRAMMES[i];
          const pct = Math.round((raised / target) * 100);
          return (
            <li key={name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-bold text-navy-950">{name}</span>
                <span className="text-sm tabular-nums text-neutral-600">
                  <span className="font-bold text-navy-950">{eur(raised)}</span> {s.example.ofTarget.replace('{{target}}', eur(target))}
                </span>
              </div>
              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-aqua" aria-hidden="true">
                <div className="h-full rounded-full bg-navy-950" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="sr-only">{t('ui.illustrative')}</p>
    </div>
  );

  return (
    <SolutionShell>
      {/* Hero: quiet, centred statement above a wide photo band */}
      <section aria-labelledby="fdn-hero" className="relative bg-white pt-12 sm:pt-16">
        <div className={`${CONTAINER} flex flex-col items-center text-center`}>
          <Breadcrumb slug={SLUG} />
          <div className="mt-6">
            <Badge icon={SOLUTION_ICONS[SLUG]}>{s.hero.badge}</Badge>
          </div>
          <h1 id="fdn-hero" className="mt-6 max-w-4xl text-[2.4rem] font-extrabold leading-[1.05] text-navy-950 sm:text-6xl">
            {s.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">{s.hero.lead}</p>
          <HeroActions slug={SLUG} center />
        </div>
        <div className="mx-auto mt-14 max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <img
            src={photo.src}
            alt={s.hero.imageAlt}
            width={1400}
            height={933}
            fetchPriority="high"
            className="h-64 w-full rounded-[2rem] object-cover sm:h-[26rem]"
            style={{ objectPosition: photo.pos }}
          />
        </div>
      </section>

      <Challenges text={s} variant="dark" id="fdn-challenges" icons={[CalendarRange, Target, ShieldCheck, Archive]} />

      {/* Signature: board questions → where the answer lives */}
      <PSection labelledBy="fdn-board">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="fdn-board" title={s.board.title} sub={s.board.sub} />
          </div>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            {s.board.items.map((q) => (
              <div key={q.question} className="py-7">
                <dt className="text-xl font-bold text-navy-950">{q.question}</dt>
                <dd className="mt-3 flex items-start gap-3 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
                  <CornerDownRight className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  {q.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </PSection>

      <Helps text={s} tone="soft" id="fdn-helps" icons={[FolderKanban, CalendarRange, Network]} />
      <SolutionDetails block={s.solutions} variant="rows" id="fdn-solutions" />
      <UseCases text={s} id="fdn-cases" tone="aqua" aside={programmesMock} />

      {s.tools && (
        <PSection labelledBy="fdn-tools">
          <div className={CONTAINER}>
            <SectionTitle id="fdn-tools" title={s.tools.title} />
            <FeatureCards items={s.tools.items} icons={[FolderKanban, History, UserRound, Receipt, BarChart3, Webhook]} variant="list" />
          </div>
        </PSection>
      )}

      <HowItWorks text={s} id="fdn-steps" tone="navy" />
      <SolutionFAQ text={s} id="fdn-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="photo" photo={photo} primary="contact" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
