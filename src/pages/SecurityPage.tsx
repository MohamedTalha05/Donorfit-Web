import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import {
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  FileCheck2,
  CreditCard,
  ChevronDown,
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const PILLARS = [
  { key: 'sovereignty', icon: Server, iconClass: 'bg-emerald-50 text-emerald-700' },
  { key: 'access', icon: KeyRound, iconClass: 'bg-brand-50 text-brand-700' },
  { key: 'portability', icon: FileCheck2, iconClass: 'bg-brand-50 text-brand-700' },
] as const;

const ARCHITECTURE = [
  { key: 'encryption', icon: Lock },
  { key: 'payments', icon: CreditCard },
  { key: 'redundancy', icon: Server },
  { key: 'safeguarding', icon: ShieldCheck },
] as const;

export default function SecurityPage() {
  const { openBookDemo, navigateTo } = useModal();
  const t = useT('company');
  const tx = useTx('company');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const heroBadges = tx<string[]>('security.hero.badges');
  const gdprRights = tx<{ title: string; text: string }[]>('security.gdpr.rights');
  const securityFaqs = tx<{ question: string; answer: string }[]>('security.faq.items');

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">

      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('security.hero.eyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12] text-balance">
            {t('security.hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('security.hero.intro')}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-2">
            {heroBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. APPROACH TO DATA PROTECTION & CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map(({ key, icon: Icon, iconClass }) => (
            <div key={key} className="hover-lift p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className={`w-10 h-10 rounded-xl ${iconClass} flex items-center justify-center font-bold`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 font-display">
                {t(`security.pillars.${key}.title`)}
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t(`security.pillars.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECHNICAL & ORGANIZATIONAL MEASURES (TOMS) */}
      <section className="bg-neutral-900 bg-dark-glow text-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {t('security.architecture.eyebrow')}
            </span>
            <h2 className="text-3xl font-extrabold font-display">
              {t('security.architecture.title')}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {t('security.architecture.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARCHITECTURE.map(({ key, icon: Icon }) => (
              <div key={key} className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{t(`security.architecture.${key}.title`)}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t(`security.architecture.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GDPR & COMPLIANCE FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {t('security.gdpr.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              {t('security.gdpr.title')}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">
              {t('security.gdpr.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {gdprRights.map((right, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-xs font-bold text-neutral-900 block">{right.title}</span>
                <p className="text-xs text-neutral-500">{right.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECURITY FAQS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {t('security.faq.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
            {t('security.faq.title')}
          </h2>
        </div>

        <div className="space-y-3">
          {securityFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-xl border border-neutral-200/90 bg-white overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-neutral-900 font-display flex items-center justify-between gap-4 hover:bg-neutral-50/50 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SECURITY CONTACT INFORMATION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-neutral-100 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-neutral-950 font-display">{t('security.contact.title')}</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('security.contact.text')}
            </p>
            <div className="pt-1 text-xs tabular-nums font-semibold text-neutral-900">
              security@donorfit.com · {t('security.contact.pgp')}
            </div>
          </div>

          <button
            onClick={() => navigateTo('/contact')}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {t('security.contact.button')}
          </button>
        </div>
      </section>

    </div>
  );
}
