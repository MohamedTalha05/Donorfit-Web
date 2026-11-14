import React from 'react';
import { ClipboardList, Layers, IdCard, Wallet, BellRing, ListFilter, Contact, Coins, Vote, RefreshCcw } from 'lucide-react';
import { useFormat } from '../../i18n/index.tsx';
import { SOLUTION_PHOTOS, type SolutionDetail, type SolutionText } from '../../data/solutions.ts';
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
  Sequence,
  FeatureCards,
  SolutionFAQ,
  SolutionCTA,
  OtherSolutions,
  SOLUTION_ICONS,
  useSolution,
} from '../../components/solutions/SolutionKit.tsx';

const SLUG = 'for-membership-orgs' as const;

type MembershipText = SolutionText & {
  hero: SolutionText['hero'] & {
    cardLabel: string;
    cardName: string;
    cardPlan: string;
    cardStatus: string;
    cardSince: string;
    cardRenews: string;
  };
  year: { title: string; steps: { title: string; text: string }[] };
  plans: { title: string; sub: string; tiers: string[]; cycles: string[] };
  beyond: { title: string; sub: string; items: SolutionDetail[] };
};

export default function MembershipSolutionPage() {
  const s = useSolution<MembershipText>(SLUG);
  const [photo] = SOLUTION_PHOTOS[SLUG];
  const { date } = useFormat();

  return (
    <SolutionShell>
      {/* Hero: navy, copy left; photo with a membership-card mock-up right */}
      <section aria-labelledby="mem-sol-hero" className="hv-hero-bg relative overflow-hidden pb-20 pt-12 text-white sm:pb-28 sm:pt-16">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
          <div>
            <Breadcrumb slug={SLUG} dark />
            <div className="mt-6">
              <Badge icon={SOLUTION_ICONS[SLUG]} dark>
                {s.hero.badge}
              </Badge>
            </div>
            <h1 id="mem-sol-hero" className="mt-5 text-[2.3rem] font-extrabold leading-[1.05] sm:text-[3.5rem]">
              {s.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{s.hero.lead}</p>
            <HeroActions slug={SLUG} dark />
          </div>

          <div className="relative pb-24 sm:pb-16">
            <img
              src={photo.src}
              alt={s.hero.imageAlt}
              width={1600}
              height={1067}
              fetchPriority="high"
              className="h-72 w-full rounded-[2rem] object-cover opacity-95 sm:h-[26rem]"
              style={{ objectPosition: photo.pos }}
            />
            {/* Membership card mock-up (decorative: example data) */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-4 w-[min(20rem,calc(100%-2rem))] -rotate-2 rounded-2xl bg-white p-5 text-navy-950 shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] sm:right-8 motion-reduce:rotate-0"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-brand-700">{s.hero.cardLabel}</span>
                <ExampleTag />
              </div>
              <p className="mt-3 text-xl font-bold">{s.hero.cardName}</p>
              <p className="text-sm text-neutral-600">{s.hero.cardPlan}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4 text-sm">
                <div>
                  <dt className="text-neutral-500">{s.hero.cardSince}</dt>
                  <dd className="font-bold tabular-nums">{date('2023-03-01', { month: 'short', year: 'numeric' })}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{s.hero.cardRenews}</dt>
                  <dd className="font-bold tabular-nums">{date('2027-03-01', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                </div>
              </dl>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-aqua px-2.5 py-0.5 text-sm font-semibold text-brand-800">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {s.hero.cardStatus}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Challenges text={s} variant="cards" id="mem-sol-challenges" icons={[Contact, Layers, Coins, Vote]} />
      <Helps text={s} tone="navy" id="mem-sol-helps" icons={[IdCard, Wallet, Vote]} />

      {/* Signature: a member's year */}
      <PSection labelledBy="mem-sol-year">
        <div className={CONTAINER}>
          <SectionTitle id="mem-sol-year" title={s.year.title} />
          <Sequence steps={s.year.steps} columns={5} />
        </div>
      </PSection>

      {/* Plans */}
      <PSection tone="aqua" labelledBy="mem-sol-plans">
        <div className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20`}>
          <SectionTitle id="mem-sol-plans" title={s.plans.title} sub={s.plans.sub} />
          <div className="space-y-6">
            <ul className="flex flex-wrap gap-3">
              {s.plans.tiers.map((tier) => (
                <li key={tier} className="rounded-full bg-white px-5 py-2.5 text-[15px] font-bold text-navy-950 ring-1 ring-brand-200">
                  {tier}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-3">
              {s.plans.cycles.map((c) => (
                <li key={c} className="rounded-full bg-navy-950 px-5 py-2.5 text-[15px] font-bold text-white">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PSection>

      {/* Membership first, in detail, with its feature list */}
      <SolutionDetails block={s.solutions} variant="rows" id="mem-sol-solutions" />
      {s.tools && (
        <PSection labelledBy="mem-sol-tools" className="!pt-0 sm:!pt-0">
          <div className={CONTAINER}>
            <h3 id="mem-sol-tools" className="text-2xl font-extrabold text-navy-950">
              {s.tools.title}
            </h3>
            <FeatureCards items={s.tools.items} icons={[ClipboardList, Layers, IdCard, Wallet, BellRing, ListFilter]} variant="list" />
          </div>
        </PSection>
      )}

      {/* Additional fundraising, explained separately from membership */}
      <SolutionDetails block={s.beyond} variant="cards" tone="soft" id="mem-sol-beyond" />

      <UseCases text={s} id="mem-sol-cases" />
      <HowItWorks text={s} id="mem-sol-steps" tone="soft" />
      <SolutionFAQ text={s} id="mem-sol-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="aqua" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
