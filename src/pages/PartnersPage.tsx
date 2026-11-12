import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { Handshake, CheckCircle2, ArrowRight, Building2, ShieldCheck, Globe } from 'lucide-react';
import { useT, useTx } from '../i18n/index.tsx';

interface PartnerType {
  title: string;
  description: string;
  benefits: string[];
}

export default function PartnersPage() {
  const { navigateTo, openBookDemo } = useModal();
  const t = useT('company');
  const tx = useTx('company');

  const partnerTypes = tx<PartnerType[]>('partners.types');
  const integrations = tx<string[]>('partners.integrations.items');

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">

      {/* Hero */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('partners.hero.eyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
            {t('partners.hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('partners.hero.intro')}
          </p>
        </div>
      </section>

      {/* Partner Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerTypes.map((pt, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  0{idx + 1}
                </div>
                <h2 className="text-xl font-bold text-neutral-900 font-display">{pt.title}</h2>
                <p className="text-xs text-neutral-600 leading-relaxed">{pt.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">{t('partners.perksLabel')}</span>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {pt.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Ecosystem Integrations */}
      <section id="integrations" className="scroll-mt-24 bg-neutral-900 bg-dark-glow text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
            {t('partners.integrations.eyebrow')}
          </span>
          <h2 className="text-3xl font-extrabold font-display">
            {t('partners.integrations.title')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {t('partners.integrations.intro')}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs font-medium text-neutral-300">
            {integrations.map((name) => (
              <span key={name} className="px-3.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
          {t('partners.cta.title')}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
          {t('partners.cta.text')}
        </p>
        <div>
          <button
            onClick={() => navigateTo('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>{t('partners.cta.button')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
}
