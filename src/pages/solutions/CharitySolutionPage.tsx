import React from 'react';
import {
  SlidersHorizontal,
  QrCode,
  Receipt,
  Percent,
  UserRound,
  Mail,
  Layers,
  HandCoins,
  Clock,
  Eye,
  FileText,
  Share2,
  ClipboardCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
import HomeLink from '../../components/home/HomeLink.tsx';
import { PRODUCT_META, type ProductSlug } from '../../data/productPages.ts';
import { SOLUTION_PHOTOS, type SolutionText } from '../../data/solutions.ts';
import classroomImg from '../../assets/images/sections/campaign-classroom.jpg';
import medicalImg from '../../assets/images/medical_aid_clinic_care_1793682092589.jpg';
import waterImg from '../../assets/images/hero/waterwell.jpg';
import communityImg from '../../assets/images/sections/campaign-food.jpg';
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

const SLUG = 'for-charities' as const;

type CharityText = SolutionText & {
  hero: SolutionText['hero'] & { formTitle: string; formOther: string; formCover: string; formDonate: string };
  causes: { title: string; sub: string; items: { title: string; text: string; slug: ProductSlug; imageAlt: string }[] };
};

const CAUSE_PHOTOS = [classroomImg, medicalImg, waterImg, communityImg];

export default function CharitySolutionPage() {
  const s = useSolution<CharityText>(SLUG);
  const t = useT('solutions');
  const tc = useT('common');
  const [photo] = SOLUTION_PHOTOS[SLUG];
  const { eur } = useFormat();

  return (
    <SolutionShell>
      {/* Hero: split layout, photo with a donation-form mock-up overlapping it */}
      <section aria-labelledby="cha-hero" className="relative bg-gradient-to-b from-aqua to-white pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
          <div>
            <Breadcrumb slug={SLUG} />
            <div className="mt-6">
              <Badge icon={SOLUTION_ICONS[SLUG]}>{s.hero.badge}</Badge>
            </div>
            <h1 id="cha-hero" className="mt-5 text-[2.4rem] font-extrabold leading-[1.04] text-navy-950 sm:text-6xl">
              {s.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{s.hero.lead}</p>
            <HeroActions slug={SLUG} />
          </div>

          <div className="relative pb-24 sm:pb-16 lg:pb-0 lg:pl-10">
            <img
              src={photo.src}
              alt={s.hero.imageAlt}
              width={1400}
              height={933}
              fetchPriority="high"
              className="h-80 w-full rounded-[2rem] object-cover sm:h-[28rem]"
              style={{ objectPosition: photo.pos }}
            />
            {/* Donation form mock-up (decorative: example data) */}
            <div
              aria-hidden="true"
              className="absolute -bottom-2 left-4 right-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgb(0_24_64/0.55)] ring-1 ring-neutral-200 sm:left-auto sm:right-6 sm:w-80 lg:-bottom-10 lg:-left-2 lg:right-auto"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-navy-950">{s.hero.formTitle}</p>
                <ExampleTag />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-sm font-bold tabular-nums">
                {[eur(25), eur(50), eur(100)].map((a, i) => (
                  <span key={a} className={`rounded-lg py-2 text-center ${i === 1 ? 'bg-navy-950 text-white' : 'bg-soft text-navy-950 ring-1 ring-neutral-200'}`}>
                    {a}
                  </span>
                ))}
                <span className="rounded-lg bg-soft py-2 text-center text-neutral-600 ring-1 ring-neutral-200">{s.hero.formOther}</span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-600 text-[10px] text-white">✓</span>
                {s.hero.formCover}
              </p>
              <span className="mt-4 block rounded-full bg-brand-700 py-2.5 text-center text-sm font-bold text-white">{s.hero.formDonate}</span>
            </div>
          </div>
        </div>
      </section>

      <Challenges text={s} variant="cards" id="cha-challenges" icons={[Layers, HandCoins, Clock, Eye]} />
      <Helps text={s} tone="white" id="cha-helps" icons={[FileText, Share2, ClipboardCheck]} />

      {/* Signature: causes a charity can fundraise for */}
      <PSection tone="navy" labelledBy="cha-causes">
        <div className={CONTAINER}>
          <SectionTitle id="cha-causes" dark title={s.causes.title} sub={s.causes.sub} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.causes.items.map((c, i) => (
              <li key={c.title}>
                <HomeLink to={PRODUCT_META[c.slug].route} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white/5 ring-1 ring-white/10 hover:ring-brand-300">
                  <img src={CAUSE_PHOTOS[i]} alt={c.imageAlt} width={600} height={400} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-white/70">{c.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-300 group-hover:text-white">
                      {t('ui.usesProduct', { name: tc(`products.${c.slug}`) })}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </HomeLink>
              </li>
            ))}
          </ul>
        </div>
      </PSection>

      <SolutionDetails block={s.solutions} variant="cards" tone="soft" id="cha-solutions" />

      {s.tools && (
        <PSection labelledBy="cha-tools">
          <div className={CONTAINER}>
            <SectionTitle id="cha-tools" title={s.tools.title} />
            <FeatureCards items={s.tools.items} icons={[SlidersHorizontal, QrCode, Receipt, Percent, UserRound, Mail]} variant="tiles" />
          </div>
        </PSection>
      )}

      <UseCases text={s} id="cha-cases" tone="aqua" />
      <HowItWorks text={s} id="cha-steps" />
      <SolutionFAQ text={s} id="cha-faq" />
      <SolutionCTA slug={SLUG} text={s} variant="aqua" />
      <OtherSolutions current={SLUG} />
    </SolutionShell>
  );
}
