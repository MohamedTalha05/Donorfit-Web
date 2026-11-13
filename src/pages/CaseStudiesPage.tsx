import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import type { CaseStudy } from '../types.ts';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export default function CaseStudiesPage() {
  const { openBookDemo, openGetStarted } = useModal();
  const t = useT('resources');
  const tx = useTx('resources');
  const caseStudies = tx<CaseStudy[]>('caseStudies.items') ?? [];

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">
      
      {/* Hero */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('caseStudies.ui.kicker')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
            {t('caseStudies.ui.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('caseStudies.ui.intro')}
          </p>
        </div>
      </section>

      {/* Case Studies Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {caseStudies.map((cs) => (
          <article
            key={cs.id}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-8"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{cs.type}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display mt-1">
                  {cs.organization}
                </h2>
                <span className="text-xs text-neutral-500 mt-0.5 block">{cs.location}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {cs.results.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center min-w-28">
                    <div className="text-xl font-extrabold text-neutral-950 tabular-nums tabular-nums">{r.metric}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Headline and Narrative */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 font-display">
                {cs.headline}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-4xl">
                {cs.summary}
              </p>
            </div>

            {/* Challenge, Solution, Outcome Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">{t('caseStudies.ui.challenge')}</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{cs.challenge}</p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">{t('caseStudies.ui.solution')}</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{cs.solution}</p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('caseStudies.ui.outcome')}</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{cs.outcome}</p>
              </div>
            </div>

            {/* Quote Block */}
            {cs.quote && (
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-4">
                <div className="text-emerald-500 text-3xl font-serif font-black leading-none shrink-0">&ldquo;</div>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-neutral-800 italic leading-relaxed">
                    {cs.quote.text}
                  </p>
                  <div className="text-xs font-bold text-neutral-900">
                    {cs.quote.author} <span className="text-neutral-500 font-normal">· {cs.quote.role}</span>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Conversion Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
          {t('caseStudies.ui.cta.title')}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
          {t('caseStudies.ui.cta.text')}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => openBookDemo()}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t('caseStudies.ui.cta.button')}
          </button>
        </div>
      </section>

    </div>
  );
}
