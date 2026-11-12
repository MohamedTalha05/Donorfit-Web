import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import { ShieldCheck, FileText, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'cookies' | 'impressum' | 'terms' | 'accessibility';
}

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface CookieCategory {
  name: string;
  description: string;
}

const ODR_URL = 'https://ec.europa.eu/consumers/odr/';

export default function LegalPage({ type }: LegalPageProps) {
  const { navigateTo, openCookieSettings } = useModal();
  const t = useT('legal');
  const tx = useTx('legal');

  const backButton = (
    <button
      onClick={() => navigateTo('/')}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>{t('ui.backToHome')}</span>
    </button>
  );

  const header = (
    <header className="space-y-3 border-b border-neutral-200 pb-6">
      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t(`${type}.eyebrow`)}</span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
        {t(`${type}.title`)}
      </h1>
      <p className="text-xs text-neutral-500">{t(`${type}.meta`)}</p>
    </header>
  );

  const paragraphs = (key: string) => tx<string[]>(key).map((p, i) => <p key={i}>{p}</p>);

  if (type === 'privacy') {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {backButton}
        {header}

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.info.heading')}</h2>
            {paragraphs('privacy.info.paragraphs')}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.controller.heading')}</h2>
            <p>{t('privacy.controller.intro')}</p>
            <div className="p-4 bg-neutral-100 rounded-xl tabular-nums text-xs text-neutral-800 space-y-1">
              {tx<string[]>('privacy.controller.lines').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.roles.heading')}</h2>
            <p>
              {tx<string[]>('privacy.roles.parts').map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>,
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.website.heading')}</h2>
            {paragraphs('privacy.website.paragraphs')}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.storage.heading')}</h2>
            {paragraphs('privacy.storage.paragraphs')}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('privacy.rights.heading')}</h2>
            {paragraphs('privacy.rights.paragraphs')}
          </section>
        </div>
      </div>
    );
  }

  if (type === 'cookies') {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {backButton}
        {header}

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('cookies.what.heading')}</h2>
            {paragraphs('cookies.what.paragraphs')}
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('cookies.categories.heading')}</h2>
            <div className="space-y-3">
              {tx<CookieCategory[]>('cookies.categories.items').map((cat, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-neutral-200">
                  <span className="font-bold text-neutral-900 text-xs">{cat.name}</span>
                  <p className="text-xs text-neutral-600 mt-1">{cat.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('cookies.manage.heading')}</h2>
            {paragraphs('cookies.manage.paragraphs')}
            <div className="pt-2">
              <button
                type="button"
                onClick={openCookieSettings}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {t('cookies.manage.button')}
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (type === 'impressum') {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {backButton}
        {header}

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('impressum.provider.heading')}</h2>
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 tabular-nums text-xs space-y-1">
              {tx<string[]>('impressum.provider.lines').map((line, i) => (
                <div key={i} className={i === 0 ? 'font-bold text-neutral-900' : undefined}>
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('impressum.contact.heading')}</h2>
            <div className="p-4 bg-neutral-50 rounded-xl space-y-1 text-xs">
              {tx<string[]>('impressum.contact.lines').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('impressum.representation.heading')}</h2>
            {paragraphs('impressum.representation.paragraphs')}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('impressum.register.heading')}</h2>
            {paragraphs('impressum.register.paragraphs')}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 font-display">{t('impressum.odr.heading')}</h2>
            <p>
              {t('impressum.odr.before')}{' '}
              <a href={ODR_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
                {ODR_URL}
              </a>{t('impressum.odr.after')}
            </p>
          </section>
        </div>
      </div>
    );
  }

  if (type === 'terms') {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {backButton}
        {header}

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {tx<LegalSection[]>('terms.sections').map((section, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    );
  }

  // Accessibility
  return (
    <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {backButton}
      {header}

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
