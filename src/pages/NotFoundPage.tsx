import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { ArrowRight, Home, Search } from 'lucide-react';
import BrandLogo from '../components/BrandLogo.tsx';
import { useT } from '../i18n/index.tsx';

export default function NotFoundPage() {
  const { navigateTo } = useModal();
  const t = useT('company');

  return (
    <div className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
      <div className="flex justify-center">
        <BrandLogo className="h-10 sm:h-12" alt="Donorfit" />
      </div>

      <div className="space-y-3">
        <span className="text-xs tabular-nums font-bold text-neutral-500 uppercase tracking-widest">{t('notFound.code')}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
          {t('notFound.title')}
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          {t('notFound.text')}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>{t('notFound.home')}</span>
        </button>
        <button
          onClick={() => navigateTo('/sponsorship')}
          className="px-4 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs rounded-xl border border-neutral-300 transition-colors cursor-pointer"
        >
          {t('notFound.sponsorship')}
        </button>
        <button
          onClick={() => navigateTo('/faqs')}
          className="px-4 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs rounded-xl border border-neutral-300 transition-colors cursor-pointer"
        >
          {t('notFound.faqs')}
        </button>
      </div>

      <div className="pt-12 border-t border-neutral-200 text-xs text-neutral-500">
        {t('notFound.helpBefore')}{' '}
        <button onClick={() => navigateTo('/solutions/ngos')} className="text-emerald-700 underline font-medium">{t('notFound.helpLink1')}</button>
        {' '}{t('notFound.helpMiddle')}{' '}
        <button onClick={() => navigateTo('/contact')} className="text-emerald-700 underline font-medium">{t('notFound.helpLink2')}</button>{t('notFound.helpAfter')}
      </div>
    </div>
  );
}
