import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import LegalDocument from '../components/legal/LegalDocument.tsx';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'cookies' | 'impressum' | 'terms' | 'refund' | 'accessibility';
}

export default function LegalPage({ type }: LegalPageProps) {
  const { navigateTo } = useModal();
  const t = useT('legal');
  const tx = useTx('legal');

  // Privacy Policy, Terms, Cookie Policy, Imprint and Refund Policy share one document layout.
  if (type !== 'accessibility') return <LegalDocument key={type} doc={type} />;

  // Accessibility Statement
  return (
    <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <button
        onClick={() => navigateTo('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{t('ui.backToHome')}</span>
      </button>

      <header className="space-y-3 border-b border-neutral-200 pb-6">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('accessibility.eyebrow')}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">{t('accessibility.title')}</h1>
        <p className="text-xs text-neutral-500">{t('accessibility.meta')}</p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 font-display">{t('accessibility.conformance.heading')}</h2>
          <p>
            {t('accessibility.conformance.before')}<strong>{t('accessibility.conformance.bold')}</strong>{t('accessibility.conformance.after')}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 font-display">{t('accessibility.measures.heading')}</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            {tx<string[]>('accessibility.measures.items').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 font-display">{t('accessibility.feedback.heading')}</h2>
          <p>
            {t('accessibility.feedback.before')}<span className="tabular-nums text-neutral-900">{t('accessibility.feedback.email')}</span>{t('accessibility.feedback.after')}
          </p>
        </section>
      </div>
    </div>
  );
}
