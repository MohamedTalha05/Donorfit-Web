import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx, useFormat } from '../i18n/index.tsx';

interface GuideEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  pageCount: number;
  keyTopics: string[];
}
import { FileText, Download, CheckCircle2, ArrowRight, ShieldCheck, X } from 'lucide-react';

export default function GuidesPage() {
  const { openBookDemo, openGetStarted } = useModal();
  const t = useT('resources');
  const tc = useT('common');
  const tx = useTx('resources');
  const { int } = useFormat();
  const guides = tx<GuideEntry[]>('guides.items') ?? [];
  const [downloadingGuide, setDownloadingGuide] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setDownloadSuccess(true);
  };

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">
      
      {/* Hero */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('guides.ui.kicker')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
            {t('guides.ui.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('guides.ui.intro')}
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {guide.category}
                  </span>
                  <span className="text-neutral-500 tabular-nums">{guide.format} · {t('guides.ui.pages', { count: int(guide.pageCount) })}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-display leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {guide.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                    {t('guides.ui.keyTopics')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-md text-xs text-neutral-700 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500">{t('guides.ui.freeToolkit')}</span>
                <button
                  onClick={() => {
                    setDownloadingGuide(guide.title);
                    setDownloadSuccess(false);
                    setEmailInput('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('guides.ui.download')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Modal */}
      {downloadingGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">{t('guides.ui.modal.label')}</span>
              <button
                onClick={() => setDownloadingGuide(null)}
                aria-label={tc('actions.close')}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {downloadSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-neutral-900 font-display">{t('guides.ui.modal.successTitle')}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {t('guides.ui.modal.deliveredBefore')}<span className="font-semibold text-neutral-900">{downloadingGuide}</span>{t('guides.ui.modal.deliveredMiddle')}<span className="font-semibold text-neutral-900">{emailInput}</span>{t('guides.ui.modal.deliveredAfter')}
                </p>
                <div className="pt-2">
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(t('guides.ui.modal.simulatedAlert'));
                      setDownloadingGuide(null);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('guides.ui.modal.save')}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-display mb-1">
                    {downloadingGuide}
                  </h3>
                  <p className="text-neutral-500">
                    {t('guides.ui.modal.prompt')}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">{t('guides.ui.modal.emailLabel')}</label>
                  <input
                    type="email"
                    required
                    placeholder={t('guides.ui.modal.emailPlaceholder')}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between text-neutral-500">
                  <span className="text-xs">{t('guides.ui.modal.note')}</span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    {t('guides.ui.modal.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
