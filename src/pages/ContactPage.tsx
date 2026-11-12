import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT } from '../i18n/index.tsx';
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';

/** Submitted option values stay stable across languages; only labels are translated. */
const INQUIRY_TYPES = ['sales', 'general', 'product', 'partnership', 'support'] as const;

export default function ContactPage() {
  const { navigateTo } = useModal();
  const t = useT('company');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orgName: '',
    inquiryType: 'sales',
    message: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || !formData.consent) return;
    setSubmitted(true);
  };

  const deskName = (INQUIRY_TYPES as readonly string[]).includes(formData.inquiryType)
    ? t(`contact.desks.${formData.inquiryType}`)
    : formData.inquiryType;

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">

      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>{t('contact.hero.eyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12] text-balance">
            {t('contact.hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('contact.hero.intro')}
          </p>
        </div>
      </section>

      {/* 2. CONTACT GRID: FORM & DIRECT DESKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 font-display">{t('contact.success.title')}</h2>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {t('contact.success.thanksBefore')}{' '}
                  <span className="font-semibold text-neutral-900">{formData.name || t('contact.success.nameFallback')}</span>
                  {t('contact.success.thanksMiddle')}{' '}
                  <span className="font-semibold text-neutral-900">{deskName}</span>{' '}
                  {t('contact.success.thanksAfter')}
                </p>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 max-w-sm mx-auto text-left space-y-1">
                  <div className="font-semibold text-neutral-900">{t('contact.success.nextTitle')}</div>
                  <p>{t('contact.success.step1')}</p>
                  <p>{t('contact.success.step2', { email: formData.email })}</p>
                  <p>{t('contact.success.step3')}</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  {t('contact.success.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-neutral-950 font-display mb-1">
                    {t('contact.form.title')}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {t('contact.form.intro')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t('contact.form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t('contact.form.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t('contact.form.orgLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('contact.form.orgPlaceholder')}
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t('contact.form.typeLabel')}
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm bg-white"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>{t(`contact.form.types.${type}`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('contact.form.messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden text-sm"
                  ></textarea>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent-box"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500 mt-0.5"
                  />
                  <label htmlFor="consent-box" className="text-xs text-neutral-600 leading-relaxed cursor-pointer">
                    {t('contact.form.consentBefore')}{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('/privacy-policy')}
                      className="text-emerald-700 underline font-medium"
                    >
                      {t('contact.form.consentLink')}
                    </button>{' '}
                    {t('contact.form.consentAfter')}
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{t('contact.form.submit')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Desks & Office Information */}
          <div className="lg:col-span-5 space-y-6">

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                {t('contact.desksPanel.title')}
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{t('contact.desksPanel.general')}</div>
                  <div className="text-neutral-600 tabular-nums text-xs mt-0.5">contact@donorfit.com</div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <div className="font-bold text-neutral-900">{t('contact.desksPanel.sales')}</div>
                  <div className="text-neutral-600 tabular-nums text-xs mt-0.5">sales@donorfit.com</div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <div className="font-bold text-neutral-900">{t('contact.desksPanel.security')}</div>
                  <div className="text-neutral-600 tabular-nums text-xs mt-0.5">security@donorfit.com</div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <div className="font-bold text-neutral-900">{t('contact.desksPanel.support')}</div>
                  <div className="text-neutral-600 mt-0.5 leading-relaxed">
                    {t('contact.desksPanel.supportTextBefore')}{' '}
                    <span className="tabular-nums">support@donorfit.com</span>
                    {t('contact.desksPanel.supportTextAfter')}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{t('contact.office.title')}</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Donorfit Technologies<br />
                Bockenheimer Landstraße 101<br />
                60325 Frankfurt am Main<br />
                {t('contact.office.country')}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{t('contact.office.hours')}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
