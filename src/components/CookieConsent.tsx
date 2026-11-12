import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT } from '../i18n/index.tsx';
import { Shield, Check, X, Settings2 } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'donorfit_cookie_consent_v1';

export default function CookieConsent() {
  const { isCookieSettingsOpen, closeCookieSettings, openCookieSettings, navigateTo } = useModal();
  const t = useT('cookies');
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Wait 1.5s after initial page render so it's not jarring
        const timer = setTimeout(() => setShowBanner(true), 1500);
        return () => clearTimeout(timer);
      } else {
        setPreferences(JSON.parse(stored));
      }
    } catch {
      // In case localStorage is blocked
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore
    }
    setShowBanner(false);
    closeCookieSettings();
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <>
      {/* Bottom Sticky Banner */}
      {showBanner && !isCookieSettingsOpen && (
        <aside 
          aria-label={t('banner.ariaLabel')}
          className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-xl"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-semibold text-neutral-900 font-display">
                  {t('banner.title')}
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('banner.text')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={openCookieSettings}
                className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                {t('banner.manage')}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
              >
                {t('banner.rejectNonEssential')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {t('banner.acceptAll')}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Management Modal */}
      {isCookieSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs">
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-emerald-600" />
                <h2 id="cookie-settings-title" className="text-base font-bold text-neutral-900 font-display">
                  {t('dialog.title')}
                </h2>
              </div>
              <button
                onClick={closeCookieSettings}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label={t('dialog.closeAria')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <p className="text-neutral-600 leading-relaxed">
                {t('dialog.introBefore')}{' '}
                <button
                  type="button"
                  onClick={() => {
                    closeCookieSettings();
                    navigateTo('/cookie-policy');
                  }}
                  className="text-emerald-700 hover:underline font-medium inline"
                >
                  {t('dialog.introLink')}
                </button>
                {t('dialog.introAfter')}
              </p>

              {/* Necessary */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">{t('categories.necessary.name')}</span>
                  <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 rounded text-[11px] font-semibold">{t('dialog.alwaysActive')}</span>
                </div>
                <p className="text-neutral-500 leading-relaxed">
                  {t('categories.necessary.description')}
                </p>
              </div>

              {/* Preferences */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-neutral-900">{t('categories.preferences.name')}</span>
                    <p className="text-neutral-500 mt-0.5 leading-relaxed">
                      {t('categories.preferences.description')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-neutral-900">{t('categories.analytics.name')}</span>
                    <p className="text-neutral-500 mt-0.5 leading-relaxed">
                      {t('categories.analytics.description')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-neutral-900">{t('categories.marketing.name')}</span>
                    <p className="text-neutral-500 mt-0.5 leading-relaxed">
                      {t('categories.marketing.description')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <button
                type="button"
                onClick={handleRejectAll}
                className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
              >
                {t('dialog.rejectAll')}
              </button>
              <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-4 py-1.5 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  {t('dialog.save')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {t('dialog.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
