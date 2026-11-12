import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { X, CheckCircle2, Sparkles, ArrowRight, Check } from 'lucide-react';
import BrandLogo from './BrandLogo.tsx';
import { useT } from '../i18n/index.tsx';

/* Module ids and country codes are used in logic / submitted — only display labels are translated. */
const MODULE_IDS = ['donations', 'recurring', 'sponsorship', 'orphan', 'moneypool', 'membership', 'crm', 'reporting'];
const COUNTRIES = ['DE', 'FR', 'NL', 'BE', 'AT', 'CH', 'GB', 'OTHER'];

export default function GetStartedModal() {
  const { isGetStartedOpen, closeGetStarted, selectedModule } = useModal();
  const t = useT('forms');
  const [submitted, setSubmitted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>(() => {
    return selectedModule ? [selectedModule] : ['donations', 'recurring'];
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orgName: '',
    country: 'DE',
    currency: 'EUR',
    estimatedDonors: '1000-5000',
  });

  if (!isGetStartedOpen) return null;

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter((m) => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.orgName) return;
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    closeGetStarted();
  };

  const modulesList = MODULE_IDS.map((id) => ({ id, label: t(`getStarted.modules.${id}`) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-started-headline"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <BrandLogo variant="icon" className="h-10 shrink-0" alt="" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">{t('getStarted.eyebrow')}</span>
              <h2 id="get-started-headline" className="text-lg font-bold text-neutral-950 font-display">
                {t('getStarted.title')}
              </h2>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label={t('getStarted.closeDialog')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-display">{t('getStarted.success.title')}</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              {t('getStarted.success.receivedBefore')}<span className="font-semibold text-neutral-900">{formData.orgName}</span>{t('getStarted.success.receivedMiddle')}<span className="font-semibold text-neutral-900">{formData.email}</span>{t('getStarted.success.receivedAfter')}
            </p>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs text-neutral-600 space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('getStarted.success.selectedModules')}</span>
                <span className="font-medium text-neutral-800">{t(selectedModules.length === 1 ? 'getStarted.success.modulesActiveOne' : 'getStarted.success.modulesActive', { count: selectedModules.length })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('getStarted.success.jurisdiction')}</span>
                <span className="font-medium text-neutral-800">{formData.country} · {formData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('getStarted.success.dataResidency')}</span>
                <span className="font-medium text-emerald-700">{t('getStarted.success.dataResidencyValue')}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                {t('getStarted.success.done')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-neutral-800">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                {t('getStarted.step1')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {modulesList.map((m) => {
                  const isChecked = selectedModules.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleModule(m.id)}
                      className={`flex items-center gap-2 p-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-semibold'
                          : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                {t('getStarted.step2')}
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={t('getStarted.fields.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder={t('getStarted.fields.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={t('getStarted.fields.orgNamePlaceholder')}
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-xs bg-white"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{t(`getStarted.countries.${c}`)}</option>
                      ))}
                    </select>

                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-xs bg-white"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CHF">CHF (Fr)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100">
              <span className="text-neutral-500">{t('getStarted.supportNote')}</span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>{t('getStarted.submit')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
