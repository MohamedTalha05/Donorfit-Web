import React from 'react';
import { CreditCard, Scale, KeyRound, MessagesSquare, ArrowRight, ArrowUpRight, MapPinned, Landmark, Wallet, CalendarClock, Images, Handshake } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
import HomeLink from '../../components/home/HomeLink.tsx';
import { PAYMENT_INTEGRATIONS, integrationPath } from '../../data/integrations.ts';
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
  Sequence,
  SolutionFAQ,
  SolutionCTA,
  OtherSolutions,
  SOLUTION_ICONS,
  useSolution,
} from '../../components/solutions/SolutionKit.tsx';

const SLUG = 'for-international-orgs' as const;

type InternationalText = SolutionText & {
  hero: SolutionText['hero'] & { imageAlt2: string; imageAlt3: string };
  stages: { title: string; sub: string; project: string; raised: string; steps: { title: string; text: string }[] };
  checklist: { title: string; sub: string; items: { title: string; text: string }[] };
  providers: { title: string; sub: string };
};

const CHECK_ICONS = [CreditCard, Scale, KeyRound, MessagesSquare];

export default function InternationalSolutionPage() {
  const s = useSolution<InternationalText>(SLUG);
  const t = useT('solutions');
  const ti = useT('integrations');
  const [main, second, third] = SOLUTION_PHOTOS[SLUG];
  const { eur } = useFormat();
  const raised = 6300;
  const target = 9000;

  return (
    <SolutionShell>
      {/* Hero: copy left, three-photo mosaic right */}
      <section aria-labelledby="int-hero" className="relative bg-white pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <div>
            <Breadcrumb slug={SLUG} />
            <div className="mt-6">
              <Badge icon={SOLUTION_ICONS[SLUG]}>{s.hero.badge}</Badge>
            </div>
            <h1 id="int-hero" className="mt-5 text-[2.3rem] font-extrabold leading-[1.05] text-navy-950 sm:text-[3.4rem]">
              {s.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{s.hero.lead}</p>
            <HeroActions slug={SLUG} />
          </div>
          <div className="grid h-[24rem] grid-cols-[1.4fr_1fr] grid-rows-2 gap-3 sm:h-[32rem] sm:gap-4">
            <img
              src={main.src}
              alt={s.hero.imageAlt}
              width={1600}
              height={1067}
              fetchPriority="high"
              className="row-span-2 h-full w-full rounded-[1.75rem] object-cover"
              style={{ objectPosition: main.pos }}
            />
            <img src={second.src} alt={s.hero.imageAlt2} width={1400} height={933} className="h-full w-full rounded-[1.75rem] object-cover" style={{ objectPosition: second.pos }} />
            <img src={third.src} alt={s.hero.imageAlt3} width={1400} height={933} className="h-full w-full rounded-[1.75rem] object-cover" style={{ objectPosition: third.pos }} />
          </div>
        </div>
      </section>

      <Challenges text={s} variant="dark" id="int-challenges" icons={[MapPinned, Landmark, Wallet, CalendarClock]} />
      <Helps text={s} id="int-helps" icons={[Images, CreditCard, Handshake]} />

      {/* Signature: supported payment providers (facts from src/data/integrations.ts) */}
      <PSection tone="soft" labelledBy="int-providers">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle id="int-providers" title={s.providers.title} sub={s.providers.sub} />
            <HomeLink to="/integrations" className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
              {t('ui.allIntegrations')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PAYMENT_INTEGRATIONS.map((p) => (
              <li key={p.id}>
                <HomeLink
                  to={integrationPath(p.id)}
                  aria-label={t('ui.providerLink', { name: p.name })}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-6 hover:border-brand-300"
                >
                  <span className="flex h-12 items-center">
                    <img src={p.logo} alt="" className={`${p.logoH} w-auto max-w-[8rem] object-contain`} loading="lazy" decoding="async" />
                  </span>
                  <span className="mt-4 font-bold text-navy-950">{p.name}</span>
                  <span className="mt-1 flex-1 text-sm leading-relaxed text-neutral-600">{ti(`providers.${p.id}`)}</span>
                  <ArrowUpRight className="mt-4 h-5 w-5 text-neutral-400 group-hover:text-brand-700" aria-hidden="true" />
                </HomeLink>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      {/* Regional requirements: honest pre-launch checklist */}
      <PSection tone="aqua" labelledBy="int-check">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20`}>
          <div>
            <SectionTitle id="int-check" title={s.checklist.title} sub={s.checklist.sub} />
            <HomeLink to="/contact" className="hv-btn hv-btn-navy mt-8">
              {t('ui.talkToUs')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {s.checklist.items.map((c, i) => {
              const Icon = CHECK_ICONS[i];
              return (
                <li key={c.title} className="rounded-[1.5rem] bg-white p-6 ring-1 ring-brand-200">
                  <Icon className="h-6 w-6 text-brand-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-navy-950">{c.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{c.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </PSection>

      <SolutionDetails block={s.solutions} variant="cards" id="int-solutions" />

      {/* Example: a water well project through its stages */}
      <PSection tone="soft" labelledBy="int-stages">
        <div className={CONTAINER}>
          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
            <SectionTitle id="int-stages" title={s.stages.title} sub={s.stages.sub} />
            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-navy-950">{s.stages.project}</p>
                <ExampleTag />
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-soft ring-1 ring-neutral-200" aria-hidden="true">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.round((raised / target) * 100)}%` }} />
              </div>
              <p className="mt-3 text-sm tabular-nums text-neutral-600">
                {s.stages.raised.replace('{{raised}}', eur(raised)).replace('{{target}}', eur(target))}
              </p>
            </div>
          </div>
          <Sequence steps={s.stages.steps} />
        </div>
      </PSection>

      <UseCases text={s} id="int-cases" />
      <HowItWorks text={s} id="int-steps" tone="navy" />
      <SolutionFAQ text={s} id="int-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="navy" primary="contact" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
