import React, { createContext, useContext, useState, ReactNode } from 'react';
import { I18nProvider, LANG_STORAGE_KEY, localizePath, parsePath, type Lang } from '../i18n/index.tsx';

interface ModalContextType {
  isBookDemoOpen: boolean;
  isGetStartedOpen: boolean;
  isCookieSettingsOpen: boolean;
  openBookDemo: (presetModule?: string) => void;
  closeBookDemo: () => void;
  openGetStarted: (presetModule?: string) => void;
  closeGetStarted: () => void;
  openCookieSettings: () => void;
  closeCookieSettings: () => void;
  selectedModule: string | null;
  /** Language-neutral route, e.g. "/pricing" (also on /de/pricing). */
  currentRoute: string;
  /** Navigate to a language-neutral route; the active language prefix is added automatically. */
  navigateTo: (route: string) => void;
  /** Active language (from the URL). */
  lang: Lang;
  /** Switch language, stay on the same page, and remember the choice. */
  setLang: (lang: Lang) => void;
  /** Public href for a route in the active (or given) language. */
  localize: (route: string, lang?: Lang) => string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // The browser pathname is the source of truth: '/de/…' = German, anything else = English.
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname || '/';
    // A returning visitor who chose German keeps it, even when arriving on an English URL.
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (stored === 'de' && parsePath(path).lang === 'en') {
      const target = localizePath(path, 'de') + window.location.search + window.location.hash;
      window.history.replaceState({}, '', target);
      return localizePath(path, 'de');
    }
    return path;
  });
  const { lang, path: currentRoute } = parsePath(pathname);

  const localize = (route: string, l: Lang = lang) => localizePath(route, l);

  const navigateTo = (route: string) => {
    const target = localizePath(route, lang);
    setPathname(target.split('?')[0].split('#')[0]);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setLang = (next: Lang) => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    if (next === lang) return;
    const target = localizePath(currentRoute, next);
    setPathname(target);
    window.history.pushState({}, '', target + window.location.search + window.location.hash);
  };

  // Sync with browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openBookDemo = (presetModule?: string) => {
    if (presetModule) setSelectedModule(presetModule);
    setIsBookDemoOpen(true);
  };

  const closeBookDemo = () => {
    setIsBookDemoOpen(false);
    setSelectedModule(null);
  };

  const openGetStarted = (presetModule?: string) => {
    if (presetModule) setSelectedModule(presetModule);
    setIsGetStartedOpen(true);
  };

  const closeGetStarted = () => {
    setIsGetStartedOpen(false);
    setSelectedModule(null);
  };

  const openCookieSettings = () => {
    setIsCookieSettingsOpen(true);
  };

  const closeCookieSettings = () => {
    setIsCookieSettingsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isBookDemoOpen,
        isGetStartedOpen,
        isCookieSettingsOpen,
        openBookDemo,
        closeBookDemo,
        openGetStarted,
        closeGetStarted,
        openCookieSettings,
        closeCookieSettings,
        selectedModule,
        currentRoute,
        navigateTo,
        lang,
        setLang,
        localize,
      }}
    >
      <I18nProvider lang={lang}>{children}</I18nProvider>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
