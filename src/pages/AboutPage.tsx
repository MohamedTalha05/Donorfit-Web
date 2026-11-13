import React from 'react';
import { ArrowRight, ArrowUpRight, Eye, Feather, HandHeart, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import { CONTAINER, PRODUCT_ICONS, PRODUCT_PHOTOS } from '../components/product/ProductKit.tsx';
import { PRODUCT_META, PRODUCT_ORDER, isHiddenProduct } from '../data/productPages.ts';

/* Every photo appears once on the page (Pexels/Unsplash, see the CREDITS.md next to each file). */
import volunteersImg from '../assets/images/sections/campaign-winter.jpg';
import classroomImg from '../assets/images/sections/campaign-classroom.jpg';
import readingImg from '../assets/images/sections/solution-charities.jpg';
import meetingImg from '../assets/images/sections/solution-trust.jpg';
import communityEventImg from '../assets/images/sections/campaign-food.jpg';
import masjidImg from '../assets/images/sections/solution-masjid.jpg';
import aidImg from '../assets/images/sections/solution-ngo.jpg';
import textbooksImg from '../assets/images/sections/cta-community.jpg';

type Item = { title: string; text: string };

/** Core values, same order as about.values.items. */
const VALUE_ICONS: LucideIcon[] = [Feather, Eye, Users, ShieldCheck, HandHeart];

/** Visible products only: unlaunched ones (HIDDEN_PRODUCTS) are left out. */
const PRODUCTS = PRODUCT_ORDER.filter((s) => !isHiddenProduct(s));

const H2 = 'text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]';
const BODY = 'text-lg leading-relaxed text-neutral-600';
const textLink =
  'inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

export default function AboutPage() {
  const { openGetStarted, navigateTo } = useModal();
  const t = useT('company');
  const tx = useTx('company');
  const tc = useT('common');

  const how = tx<Item[]>('about.how.items');
  const audiences = tx<Item[]>('about.support.items');
  const values = tx<Item[]>('about.values.items');

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="ab-hero" className="hv-hero-bg relative isolate overflow-hidden pb-20 pt-16 text-white sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="hv-grid-dark absolute inset-0 -z-10" />
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              {t('about.hero.badge')}
            </span>
            <h1 id="ab-hero" className="mt-6 text-[2.3rem] font-extrabold leading-[1.06] text-balance sm:text-[3.25rem]">
              {t('about.hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{t('about.hero.body')}</p>
          </div>

          {/* Photo mosaic: volunteers sorting donations, a village classroom, girls reading together */}
          <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
            <img
              src={volunteersImg}
              alt={t('about.photos.main')}
              width={1400}
              height={933}
              fetchPriority="high"
              className="col-span-3 row-span-2 h-[22rem] w-full rounded-[1.75rem] object-cover ring-1 ring-white/15 sm:h-[28rem]"
              style={{ objectPosition: '45% 50%' }}
            />
            <img src={classroomImg} alt={t('about.photos.aid')} width={1400} height={933} className="col-span-2 h-full w-full rounded-[1.5rem] object-cover ring-1 ring-white/15" />
            <img src={readingImg} alt={t('about.photos.community')} width={1400} height={933} className="col-span-2 h-full w-full rounded-[1.5rem] object-cover ring-1 ring-white/15" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- What Donorfit is */}
      <section aria-labelledby="ab-intro" className="bg-white py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <h2 id="ab-intro" className={H2}>
              {t('about.intro.title')}
            </h2>
            <p className="mt-6 text-xl font-medium leading-relaxed text-navy-900 sm:text-[1.4rem]">{t('about.intro.lead')}</p>
          </div>
          <div className={`space-y-6 lg:col-span-7 lg:pt-2 ${BODY}`}>
            <p>{t('about.intro.p1')}</p>
            <p>{t('about.intro.p2')}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Built around everyday work */}
      <section aria-labelledby="ab-problem" className="bg-soft py-20 sm:py-28">
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <img
            src={meetingImg}
            alt={t('about.problem.photo')}
            width={1400}
            height={933}
            loading="lazy"
            decoding="async"
            className="h-80 w-full rounded-[2rem] object-cover sm:h-[28rem]"
          />
          <div>
            <h2 id="ab-problem" className={H2}>
              {t('about.problem.title')}
            </h2>
            <div className={`mt-6 space-y-5 ${BODY}`}>
              <p>{t('about.problem.p1')}</p>
              <p>{t('about.problem.p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------- How organisations use it */}
      <section aria-labelledby="ab-how" className="bg-white py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <h2 id="ab-how" className={H2}>
              {t('about.how.title')}
            </h2>
            <p className={`mt-4 max-w-2xl ${BODY}`}>{t('about.how.intro')}</p>
            <dl className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {how.map((h) => (
                <div key={h.title} className="py-6">
                  <dt className="text-xl font-bold text-navy-950">{h.title}</dt>
                  <dd className="mt-2 max-w-2xl text-[16px] leading-relaxed text-neutral-600">{h.text}</dd>
                </div>
              ))}
            </dl>
            <HomeLink to="/integrations" className={`mt-6 ${textLink}`}>
              {t('about.how.integrationsLink')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
          <div className="lg:col-span-5">
            <img
              src={communityEventImg}
              alt={t('about.how.photo')}
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
              className="h-80 w-full rounded-[2rem] object-cover sm:h-[30rem] lg:sticky lg:top-28 lg:h-[36rem]"
              style={{ objectPosition: '40% 50%' }}
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------- Mission & vision (photo band) */}
      <section aria-label={`${t('about.mission.label')}, ${t('about.vision.label')}`} className="relative isolate overflow-hidden py-24 text-white sm:py-32">
        <img
          src={masjidImg}
          alt={t('about.missionPhoto')}
          width={1400}
          height={933}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: '50% 60%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/70" />
        <div className={`${CONTAINER} grid gap-14 lg:grid-cols-2 lg:gap-20`}>
          {(['mission', 'vision'] as const).map((k) => {
            const Icon = k === 'mission' ? Target : Eye;
            return (
              <div key={k} className="border-t border-white/20 pt-8">
                <h2 className="flex items-center gap-3 text-base font-semibold text-brand-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {t(`about.${k}.label`)}
                </h2>
                <p className="hv-display mt-6 text-2xl font-bold leading-snug text-white sm:text-[2rem] sm:leading-[1.25]">{t(`about.${k}.text`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- Products */}
      <section aria-labelledby="ab-offer" className="bg-aqua py-20 sm:py-28">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <h2 id="ab-offer" className={H2}>
              {t('about.offer.title')}
            </h2>
            <p className={`mt-4 ${BODY}`}>{t('about.offer.sub')}</p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((slug) => {
              const Icon = PRODUCT_ICONS[slug];
              const photo = PRODUCT_PHOTOS[slug];
              const name = tc(`products.${slug}`);
              return (
                <li key={slug}>
                  <HomeLink
                    to={PRODUCT_META[slug].route}
                    aria-label={t('about.offer.learnMore', { name })}
                    className="hv-lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={photo.src}
                        alt=""
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                        style={{ objectPosition: photo.pos }}
                      />
                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-md">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-bold text-navy-950" translate="no">
                          {name}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-brand-700" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{t(`about.offer.products.${slug}`)}</p>
                    </div>
                  </HomeLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- Who we work with */}
      <section aria-labelledby="ab-support" className="bg-white py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 id="ab-support" className={H2}>
                {t('about.support.title')}
              </h2>
              <p className={`mt-4 ${BODY}`}>{t('about.support.intro')}</p>
              <img
                src={aidImg}
                alt={t('about.support.photo')}
                width={1400}
                height={933}
                loading="lazy"
                decoding="async"
                className="mt-8 h-72 w-full rounded-[2rem] object-cover sm:h-80"
                style={{ objectPosition: '50% 40%' }}
              />
            </div>
          </div>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-7">
            {audiences.map((a) => (
              <div key={a.title} className="py-7">
                <dt className="text-xl font-bold text-navy-950">{a.title}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-neutral-600">{a.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------- Values */}
      <section aria-labelledby="ab-values" className="bg-soft py-20 sm:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <h2 id="ab-values" className={H2}>
              {t('about.values.title')}
            </h2>
            <p className={`mt-4 ${BODY}`}>{t('about.values.intro')}</p>
            <img
              src={textbooksImg}
              alt={t('about.values.photo')}
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
              className="mt-8 h-72 w-full rounded-[2rem] object-cover sm:h-80"
              style={{ objectPosition: '50% 35%' }}
            />
          </div>
          <ul className="space-y-8 lg:col-span-7 lg:pt-2">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i] ?? Feather;
              return (
                <li key={v.title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 ring-1 ring-neutral-200">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-navy-950">{v.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-neutral-600">{v.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- Pricing */}
      <section aria-labelledby="ab-cost" className="bg-white py-20 sm:py-24">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-12 lg:gap-16`}>
          <h2 id="ab-cost" className={`${H2} lg:col-span-5`}>
            {t('about.cost.title')}
          </h2>
          <div className="lg:col-span-7">
            <div className={`space-y-5 ${BODY}`}>
              <p>{t('about.cost.p1')}</p>
              <p>{t('about.cost.p2')}</p>
            </div>
            <HomeLink to="/pricing" className={`mt-6 ${textLink}`}>
              {t('about.cost.link')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Final CTA */}
      <section aria-labelledby="ab-cta" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="ab-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t('about.cta.title')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('about.cta.text')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <button type="button" onClick={() => openGetStarted()} className="hv-btn hv-btn-primary">
                {tc('actions.getStarted')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => navigateTo('/contact')} className="hv-btn hv-btn-ghost">
                {t('about.cta.contact')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
