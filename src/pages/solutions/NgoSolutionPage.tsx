import React from 'react';
import { LayoutTemplate, QrCode, Receipt, Contact, BarChart3, Users, FolderKanban, UsersRound, Megaphone } from 'lucide-react';
import { useFormat } from '../../i18n/index.tsx';
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

const SLUG = 'for-ngos' as const;

type NgoText = SolutionText & {
  example: { title: string; body: string; campaign: string; raised: string; target: string; donors: string; update: string };
};

export default function NgoSolutionPage() {
  const s = useSolution<NgoText>(SLUG);
  const [photo] = SOLUTION_PHOTOS[SLUG];
  const { eur, int } = useFormat();
  const raised = 11240;
  const target = 18000;

  /** Example campaign card shown beside the use cases (invented figures, labelled as example data). */
  const campaignMock = (
    <figure className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_60px_-40px_rgb(0_24_64/0.5)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <figcaption className="text-xl font-bold text-navy-950">{s.example.campaign}</figcaption>
        <ExampleTag />
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-aqua" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.round((raised / target) * 100)}%` }} />
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-4">
        {[
          [s.example.raised, eur(raised)],
          [s.example.target, eur(target)],
          [s.example.donors, int(214)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-neutral-500">{k}</dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums text-navy-950 sm:text-xl">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 rounded-xl bg-aqua px-4 py-3 text-sm font-semibold text-brand-800">{s.example.update}</p>
    </figure>
  );

  return (
    <SolutionShell>
      {/* Hero: full-bleed field photo, copy anchored bottom-left on a navy fade */}
      <section aria-labelledby="ngo-hero" className="relative isolate flex min-h-[38rem] items-end overflow-hidden bg-navy-950 sm:min-h-[42rem]">
        <img
          src={photo.src}
          alt={s.hero.imageAlt}
          width={1400}
          height={933}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: photo.pos }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/10 lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-950/70 lg:to-transparent" />
        <div className={`${CONTAINER} w-full pb-14 pt-32 sm:pb-20`}>
          <div className="max-w-2xl text-white">
            <Breadcrumb slug={SLUG} dark />
            <div className="mt-6">
              <Badge icon={SOLUTION_ICONS[SLUG]} dark>
                {s.hero.badge}
              </Badge>
            </div>
            <h1 id="ngo-hero" className="mt-5 text-[2.4rem] font-extrabold leading-[1.04] sm:text-6xl">
              {s.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{s.hero.lead}</p>
            <HeroActions slug={SLUG} dark />
          </div>
        </div>
      </section>

      <Challenges text={s} variant="rows" id="ngo-challenges" />
      <Helps text={s} tone="navy" id="ngo-helps" icons={[FolderKanban, UsersRound, Megaphone]} />
      <SolutionDetails block={s.solutions} variant="rows" id="ngo-solutions" />

      {s.tools && (
        <PSection tone="soft" labelledBy="ngo-tools">
          <div className={CONTAINER}>
            <SectionTitle id="ngo-tools" title={s.tools.title} />
            <FeatureCards items={s.tools.items} icons={[LayoutTemplate, QrCode, Receipt, Contact, BarChart3, Users]} />
          </div>
        </PSection>
      )}

      <UseCases text={s} id="ngo-cases" aside={campaignMock} />
      <HowItWorks text={s} id="ngo-steps" tone="soft" />
      <SolutionFAQ text={s} id="ngo-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="navy" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
