import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Building2,
  Target,
  Users,
  Compass,
  Check
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo.tsx';
import { useT, useTx } from '../i18n/index.tsx';

const PRINCIPLE_ICONS = [Target, ShieldCheck, Heart];

export default function AboutPage() {
  const { openBookDemo, openGetStarted, navigateTo } = useModal();
  const t = useT('company');
  const tx = useTx('company');
  const tc = useT('common');
  const principles = tx<{ title: string; text: string }[]>('about.principles.items');

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">

      {/* 1. HERO SECTION WITH SUBTLE PATTERN */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <BrandLogo variant="icon" className="h-4" alt="" />
            <span>{t('about.hero.eyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.08] text-balance">
            {t('about.hero.title')}
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed">
            {t('about.hero.intro')}
          </p>

          <div className="p-5 rounded-2xl bg-neutral-100/80 border border-neutral-200/90 text-sm text-neutral-800 font-medium">
            <span className="text-emerald-700 font-bold">{t('about.hero.formulaLabel')}</span>{' '}
            <span className="font-bold text-neutral-950">{t('about.hero.formula')}</span>
          </div>
        </div>
      </section>

      {/* 2. DUAL PHOTOGRAPHY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl relative h-80 sm:h-96">
            <img
              src="/src/assets/images/donor_relationships_1793444728253.jpg"
              alt={t('about.photos.teamAlt')}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <span className="text-sm font-bold text-white">{t('about.photos.teamCaption')}</span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl relative h-80 sm:h-96">
            <img
              src="/src/assets/images/humanitarian_field_aid_1793444727541.jpg"
              alt={t('about.photos.fieldAlt')}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <span className="text-sm font-bold text-white">{t('about.photos.fieldCaption')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE & APPROACH TO NONPROFIT TECH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t('about.purpose.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 font-display leading-tight text-balance">
            {t('about.purpose.title')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t('about.purpose.p1')}
          </p>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t('about.purpose.p2')}
          </p>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t('about.purpose.p3Before')}{' '}
            <span className="font-semibold text-neutral-900">{t('about.purpose.p3Bold')}</span>
          </p>
        </div>
      </section>

      {/* 4. GUIDING PRINCIPLES: DARK CONTRAST SECTION */}
      <section className="bg-neutral-950 bg-dark-glow text-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-neutral-800 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {t('about.principles.eyebrow')}
            </span>
            <h2 className="text-3xl font-extrabold font-display">
              {t('about.principles.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? Target;
              return (
                <div key={i} className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-neutral-950 font-display">
          {t('about.cta.title')}
        </h2>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
          {t('about.cta.text')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => openBookDemo()}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t('about.cta.discoveryCall')}
          </button>
          <button
            onClick={() => openGetStarted()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>{tc('actions.getStarted')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
