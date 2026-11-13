import React, { useEffect, useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { X, CheckCircle2, Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo.tsx';
import { useT, useTx, useFormat, useI18n } from '../i18n/index.tsx';

/* Option values are submitted / used in logic — only their display labels are translated. */
const ORG_TYPES = ['ngo', 'charity', 'foundation', 'sponsorship', 'membership', 'humanitarian'];
const INTERESTS = ['general', 'sponsorship', 'orphan-sponsorship', 'recurring-giving', 'donor-management', 'money-pool', 'membership', 'campaigns'];
const VOLUMES = ['under-100k', '100k-500k', '500k-2m', '2m-10m', 'over-10m'];
const TIMES = ['09:00 AM CET', '11:00 AM CET', '02:00 PM CET', '04:00 PM CET'];

export default function BookDemoModal() {
  const { isBookDemoOpen, closeBookDemo, selectedModule } = useModal();
  const t = useT('forms');
  const txCommon = useTx('common');
  const { eur, date } = useFormat();
  const { lang } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organizationName: '',
    orgType: 'ngo',
    country: 'DE',
    annualVolume: '100k-500k',
    interest: selectedModule || 'general',
    preferredDate: '',
    preferredTime: '09:00 AM CET',
    notes: '',
  });

  // The modal stays mounted, so apply a preset product each time it opens (ignore values the form doesn't list).
  useEffect(() => {
    if (isBookDemoOpen && selectedModule && INTERESTS.includes(selectedModule)) {
      setFormData((f) => ({ ...f, interest: selectedModule }));
    }
  }, [isBookDemoOpen, selectedModule]);

  if (!isBookDemoOpen) return null;

  const volumeVars: Record<string, Record<string, string>> = {
    'under-100k': { amount: eur(100000) },
    '100k-500k': { min: eur(100000), max: eur(500000) },
    '500k-2m': { min: eur(500000) },
  };

  const timeLabel = (value: string) => (TIMES.includes(value) ? t(`bookDemo.timeOptions.${value}`) : value);

  /** Display label for the chosen interest. A preset may be an option value, a product slug or an English product name. */
  const interestLabel = (value: string) => {
    if (lang === 'en') return value; // English shows the raw value (capitalised via CSS), as before
    if (INTERESTS.includes(value)) return t(`bookDemo.interestOptions.${value}`);
    const products = txCommon<Record<string, string> | undefined>('products') ?? {};
    return products[value] ?? value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.workEmail || !formData.organizationName) return;
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    closeBookDemo();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <BrandLogo variant="icon" className="h-10 shrink-0" alt="" />
            <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">{t('bookDemo.eyebrow')}</span>
            <h2 id="modal-headline" className="text-lg font-bold text-neutral-950 font-display">
              {t('bookDemo.title')}
            </h2>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label={t('bookDemo.closeDialog')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-display">{t('bookDemo.success.title')}</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              {t('bookDemo.success.thanksBefore')}<span className="font-semibold text-neutral-900">{formData.fullName || t('bookDemo.success.nameFallback')}</span>{t('bookDemo.success.thanksMiddle')}<span className="font-semibold text-neutral-900">{formData.workEmail}</span>{t('bookDemo.success.thanksAfter')}
            </p>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs text-neutral-600 space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('bookDemo.success.organization')}</span>
                <span className="font-medium text-neutral-800">{formData.organizationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('bookDemo.success.focus')}</span>
                <span className={`font-medium text-neutral-800 ${lang === 'en' ? 'capitalize' : ''}`}>{interestLabel(formData.interest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('bookDemo.success.window')}</span>
                <span className="font-medium text-neutral-800">
                  {formData.preferredDate
                    ? lang === 'en'
                      ? formData.preferredDate
                      : date(formData.preferredDate)
                    : t('bookDemo.success.nextAvailable')}{' '}
                  · {timeLabel(formData.preferredTime)}
                </span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                {t('bookDemo.success.close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-neutral-800">
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('bookDemo.intro')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.fullName')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t('bookDemo.fields.fullNamePlaceholder')}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.workEmail')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder={t('bookDemo.fields.workEmailPlaceholder')}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.organizationName')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder={t('bookDemo.fields.organizationNamePlaceholder')}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.orgType')}
                </label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm bg-white"
                >
                  {ORG_TYPES.map((v) => (
                    <option key={v} value={v}>{t(`bookDemo.orgTypeOptions.${v}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.interest')}
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm bg-white"
                >
                  {INTERESTS.map((v) => (
                    <option key={v} value={v}>{t(`bookDemo.interestOptions.${v}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.annualVolume')}
                </label>
                <select
                  value={formData.annualVolume}
                  onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm bg-white"
                >
                  {VOLUMES.map((v) => (
                    <option key={v} value={v}>{t(`bookDemo.volumeOptions.${v}`, volumeVars[v])}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.preferredDate')}
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('bookDemo.fields.preferredTime')}
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm bg-white"
                >
                  {TIMES.map((v) => (
                    <option key={v} value={v}>{timeLabel(v)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('bookDemo.trustNote')}</span>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>{t('bookDemo.submit')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
