import React from 'react';
import { UserPlus, Layers, IdCard, Landmark, RefreshCw, Users, QrCode, ClipboardCheck, Upload, Mail, ShieldCheck, Check } from 'lucide-react';
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
  FAQ,
  Related,
  FinalCTA,
  ExampleNote,
  useProductPage,
  useProductPhoto,
  useProductBadge,
} from '../../components/product/ProductKit.tsx';
import {
  MembershipPreview,
  MembershipApprovalsPreview,
  MembershipProfilePreview,
  MembershipSubscriptionsPreview,
} from '../../components/product/ProductPreviews.tsx';
import CustomerLogoSection from '../../components/social/CustomerLogoSection.tsx';
import TestimonialSection from '../../components/social/TestimonialSection.tsx';
import ContentPhoto from '../../components/ContentPhoto.tsx';
import applicationFormShot from '../../assets/images/content/membership-application-form.webp';
import ZeroFeeHighlight from '../../components/fees/ZeroFeeHighlight.tsx';
import { PaymentPartners } from '../../components/partners/PartnerLogos.tsx';

/** Screenshot of the real hosted application form (sandbox-membership.donorfit.com/apply), filled with example data. */
function ApplicationFormShot() {
  const t = useT('products');
  return (
    <figure className="rounded-[1.75rem] bg-gradient-to-br from-brand-100 via-aqua to-white p-5 ring-1 ring-brand-200 sm:p-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgb(0_24_64/0.45)] ring-1 ring-navy-950/5">
        <img
          src={applicationFormShot}
          alt={t('sections.membership.screenshotAlt')}
          width={960}
          height={1388}
          loading="lazy"
          decoding="async"
          className="h-auto w-full bg-white"
        />
      </div>
      <figcaption className="mt-4 text-center text-xs text-neutral-500">{t('sections.membership.screenshotCaption')}</figcaption>
    </figure>
  );
}

function ExampleVisual({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ExampleNote />
    </div>
  );
}

const TOUR_VISUALS: React.ComponentType[] = [
  ApplicationFormShot,
  () => (
    <ExampleVisual>
      <MembershipApprovalsPreview />
    </ExampleVisual>
  ),
  () => (
    <ExampleVisual>
      <MembershipProfilePreview />
    </ExampleVisual>
  ),
  () => (
    <ExampleVisual>
      <MembershipSubscriptionsPreview />
    </ExampleVisual>
  ),
];
const TOUR_ICONS = [UserPlus, ClipboardCheck, IdCard, RefreshCw];

type TourItem = { title: string; body: string; points: string[] };

export default function MembershipPage() {
  const p = useProductPage('membership');
  const photo = useProductPhoto('membership');
  const badge = useProductBadge('membership');
  const t = useT('products');
  const tx = useTx('products');
  const tour = tx<TourItem[]>('sections.membership.tour');
  const { date } = useFormat();
  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: split, photo with a membership card */}
      <section aria-labelledby="mem-hero" className="relative bg-soft pb-20 pt-14 sm:pt-20">
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              <IdCard className="h-3.5 w-3.5" aria-hidden="true" /> {badge}
            </span>
            <h1 id="mem-hero" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl">
              {p.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{p.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GetStartedButton product={p.name} />
              <DemoButton product={p.name} dark={false} />
            </div>
          </div>
          <div className="relative px-2 sm:px-8">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(0_24_64/0.6)]">
              <img src={photo.src} alt={photo.alt} width={1600} height={1067} fetchPriority="high" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: photo.pos }} />
            </div>
            {/* Membership card illustration */}
            <div
              aria-hidden="true"
              className="absolute -bottom-10 left-0 w-72 rotate-[-4deg] rounded-2xl bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 p-5 text-white shadow-2xl sm:-left-4 sm:w-80"
            >
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{t('sections.membership.hero.card')}</span>
                <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-navy-950">{t('sections.membership.hero.status')}</span>
              </div>
              <div className="hv-display mt-5 text-xl font-extrabold">Amina Khan</div>
              <div className="mt-1 text-xs text-white/70">{t('sections.membership.hero.plan', { year: 2021 })}</div>
              <div className="mt-5 flex items-end justify-between">
                <div className="text-[11px] text-white/60">
                  {t('sections.membership.hero.renews')}
                  <div className="text-sm font-semibold text-white">{date('2026-03-12', { day: 'numeric', month: 'long' })}</div>
                </div>
                <QrCode className="h-10 w-10 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <PSection labelledBy="mem-intro">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <SectionTitle id="mem-intro" title={p.intro.title} />
          <div className="space-y-5 text-lg leading-relaxed text-neutral-600 lg:pt-3">
            <p>{p.intro.body}</p>
            <p>{t('sections.membership.introMore')}</p>
          </div>
        </div>
        <div className={CONTAINER}>
          <ContentPhoto photo="membershipCommunity" aspect="aspect-[4/3] sm:aspect-[21/9]" className="mt-14" />
          <ProblemSolution p={p} variant="rows" />
        </div>
      </PSection>

      {/* Customer logos */}
      <CustomerLogoSection id="mem-customers" compact />
      <ZeroFeeHighlight id="mem-fees" addon="membership" className="!pt-0" />
      <PaymentPartners id="mem-payments" variant="compact" className="-mt-6 pb-16 sm:-mt-10 sm:pb-24" />

      {/* Feature tour: each core area beside the matching screen */}
      <PSection tone="soft" labelledBy="mem-tour">
        <div className={CONTAINER}>
          <SectionTitle id="mem-tour" title={t('sections.membership.tourTitle')} sub={t('sections.membership.tourSub')} />
          <div className="mt-16 space-y-20 sm:space-y-28">
            {tour.map((item, i) => {
              const Visual = TOUR_VISUALS[i];
              const Icon = TOUR_ICONS[i];
              return (
                <article key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-neutral-600">{item.body}</p>
                    <ul className="mt-6 max-w-xl space-y-3">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-navy-950">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="min-w-0">
                    <Visual />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </PSection>

      {/* Supporting features */}
      <PSection labelledBy="mem-features">
        <div className={CONTAINER}>
          <SectionTitle id="mem-features" title={t('sections.membership.moreTitle')} sub={t('sections.membership.moreSub')} />
          <Features p={p} variant="list" icons={[Layers, Landmark, Users, Upload, Mail, ShieldCheck]} />
        </div>
      </PSection>

      {/* How it works */}
      <PSection tone="navy" labelledBy="mem-preview" className="overflow-hidden">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
        <div className={`${CONTAINER} relative grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]`}>
          <div className="min-w-0">
            <SectionTitle id="mem-preview" dark title={t('sections.membership.previewTitle')} sub={t('sections.membership.previewSub')} />
            <div className="mt-10">
              <Steps p={p} variant="stack" dark />
            </div>
          </div>
          <div className="min-w-0">
            <MembershipPreview />
            <ExampleNote dark />
          </div>
        </div>
      </PSection>

      {/* Benefits */}
      <PSection tone="aqua" labelledBy="mem-benefits">
        <div className={CONTAINER}>
          <SectionTitle id="mem-benefits" title={t('sections.membership.benefitsTitle')} />
          <Benefits p={p} variant="statements" />
        </div>
      </PSection>

      {/* Use cases */}
      <PSection labelledBy="mem-usecases">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="mem-usecases" title={t('sections.membership.useCasesTitle')} sub={t('sections.membership.useCasesSub')} />
            <ContentPhoto photo="membershipMeeting" className="mt-10 hidden lg:block" />
          </div>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            {p.audiences.map((a) => (
              <div key={a.title} className="py-6 sm:py-7">
                <dt className="text-lg font-bold text-navy-950">{a.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-neutral-600">{a.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PSection>

      <TestimonialSection page="membership" />
      <FAQ p={p} />
      <Related p={p} />
      <FinalCTA p={p} />
    </div>
  );
}
