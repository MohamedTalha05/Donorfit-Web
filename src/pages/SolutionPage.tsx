import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { SOLUTIONS } from '../data/solutions.ts';
import { useT, useTx } from '../i18n/index.tsx';
import type { SolutionItem } from '../types.ts';

/** Translated text fields of a solution (structural fields live in src/data/solutions.ts). */
type SolutionText = Omit<SolutionItem, 'id' | 'slug' | 'recommendedProducts'> & {
  audienceName: string;
  recommendedProducts: { name: string }[];
};
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Building,
  Check
} from 'lucide-react';

interface SolutionPageProps {
  slug: string;
}

export default function SolutionPage({ slug }: SolutionPageProps) {
  const config = SOLUTIONS[slug];
  const t = useT('solutions');
  const tx = useTx('solutions');
  const text = config ? tx<SolutionText | undefined>(`items.${slug}`) : undefined;
  const { openBookDemo, openGetStarted, navigateTo } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!config || !text) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">{t('ui.notFound.title')}</h1>
        <p className="text-sm text-neutral-600 mb-6">{t('ui.notFound.text')}</p>
        <button
          onClick={() => navigateTo('/')}
          className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          {t('ui.notFound.button')}
        </button>
      </div>
    );
  }

  const solution = {
    ...text,
    id: config.slug,
    recommendedProducts: config.recommendedProducts.map((p, i) => ({ ...p, name: text.recommendedProducts[i]?.name ?? p.id })),
  };
  /** English templates use {{audience}} ("For NGOs"); German uses {{name}} ("NGOs") for natural grammar. */
  const audienceVars = { audience: solution.targetAudience, name: solution.audienceName };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const getSolutionImage = () => {
    if (slug === 'ngos' || slug === 'international-organizations') {
      return {
        src: '/src/assets/images/humanitarian_field_aid_1793444727541.jpg',
        alt: t('ui.images.field')
      };
    }
    if (slug === 'foundations' || slug === 'membership-organizations') {
      return {
        src: '/src/assets/images/nonprofit_gala_fundraising_1793682093614.jpg',
        alt: t('ui.images.gala')
      };
    }
    return {
      src: '/src/assets/images/donor_relationships_1793444728253.jpg',
      alt: t('ui.images.office')
    };
  };

  const audienceImage = getSolutionImage();

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">
      
      {/* 1. HERO SECTION WITH RICH ASYMMETRIC PHOTOGRAPHY */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>{solution.heroKicker}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12] text-balance">
              {solution.h1}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              {solution.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openGetStarted(solution.id)}
                className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                <span>{t('ui.hero.getStarted', audienceVars)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => openBookDemo(solution.id)}
                className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-xs sm:text-sm rounded-xl border border-neutral-300 transition-colors cursor-pointer"
              >
                {t('ui.hero.walkthrough')}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-xl relative">
              <img
                src={audienceImage.src}
                alt={audienceImage.alt}
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('ui.hero.tailoredFor', audienceVars)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. OVERVIEW & METRICS BANNER */}
      <section className="bg-neutral-950 bg-dark-glow text-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-neutral-800 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {t('ui.impact.kicker')}
            </span>
            <p className="text-base sm:text-xl text-neutral-200 leading-relaxed font-normal text-balance">
              {solution.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
            {solution.measurableOutcomes.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums tabular-nums">{m.metric}</div>
                <div className="text-sm font-bold text-white">{m.label}</div>
                <div className="text-xs text-neutral-400 mt-1">{m.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KEY CHALLENGES & TAILORED CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              {t('ui.challenges.kicker')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              {t('ui.challenges.title', audienceVars)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solution.keyChallenges.map((c, i) => (
              <div key={i} className="hover-lift p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-xs space-y-3">
                <div className="text-xs tabular-nums font-bold text-rose-600">{t('ui.challenges.label', { n: i + 1 })}</div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">{c.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {t('ui.features.kicker')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              {t('ui.features.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solution.tailoredFeatures.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">{f.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED MODULES */}
      <section className="bg-neutral-100/70 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t('ui.products.kicker')}
            </span>
            <h3 className="text-2xl font-bold text-neutral-950 font-display">
              {t('ui.products.title', audienceVars)}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {solution.recommendedProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => navigateTo(p.url)}
                className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 text-left transition-all group cursor-pointer shadow-xs"
              >
                <div className="font-bold text-neutral-900 text-sm group-hover:text-emerald-700 flex items-center justify-between">
                  <span>{p.name}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-neutral-500 mt-2">{t('ui.products.explore')}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {t('ui.faqs.kicker')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
            {t('ui.faqs.title', audienceVars)}
          </h2>
        </div>

        <div className="space-y-3">
          {solution.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-sm text-neutral-900 font-display flex items-center justify-between gap-4 hover:bg-neutral-50/50 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
