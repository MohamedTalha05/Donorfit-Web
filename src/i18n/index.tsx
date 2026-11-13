/**
 * Donorfit i18n — small, dependency-free translation layer.
 *
 * - Translations live in src/locales/<lang>/<namespace>.json (same keys in every language).
 * - English is bundled eagerly (default language, no flash); German is lazy-loaded on first use.
 * - Language comes from the URL: English keeps the existing unprefixed URLs, German lives under /de/…
 *
 * Usage in components:
 *   const t = useT('home');              t('hero.title')  ·  t('hero.greeting', { name: 'Sarah' })
 *   const tx = useTx('faqs');            tx<FAQ[]>('items')   // objects / arrays
 *   const { eur, int, date } = useFormat();
 *   const { lang } = useI18n();
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'de';
export const LANGS: Lang[] = ['en', 'de'];
export const DEFAULT_LANG: Lang = 'en';
export const LANG_STORAGE_KEY = 'df-lang';
export const LOCALE: Record<Lang, string> = { en: 'en-IE', de: 'de-DE' };

type Dict = Record<string, unknown>;

const nsName = (p: string) => p.split('/').pop()!.replace(/\.json$/, '');

const enModules = import.meta.glob('../locales/en/*.json', { eager: true, import: 'default' }) as Record<string, Dict>;
const deLoaders = import.meta.glob('../locales/de/*.json', { import: 'default' }) as Record<string, () => Promise<Dict>>;

const RESOURCES: Partial<Record<Lang, Record<string, Dict>>> = {
  en: Object.fromEntries(Object.entries(enModules).map(([p, d]) => [nsName(p), d])),
};

export function isLoaded(lang: Lang) {
  return !!RESOURCES[lang];
}

export async function loadLang(lang: Lang) {
  if (RESOURCES[lang]) return;
  if (lang === 'de') {
    const entries = await Promise.all(Object.entries(deLoaders).map(async ([p, load]) => [nsName(p), await load()] as const));
    RESOURCES.de = Object.fromEntries(entries);
  }
}

function lookup(lang: Lang, ns: string, path: string): unknown {
  let cur: unknown = RESOURCES[lang]?.[ns];
  for (const part of path.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Dict)[part];
  }
  return cur;
}

const warned = new Set<string>();
function missing(lang: Lang, key: string) {
  if (import.meta.env.DEV && !warned.has(`${lang}:${key}`)) {
    warned.add(`${lang}:${key}`);
    console.warn(`[i18n] Missing ${lang} translation: ${key}`);
  }
}

/** Translate "namespace:path.to.key" — falls back to English, then to the key itself. */
export function translate(lang: Lang, ns: string, key: string, vars?: Record<string, string | number>): string {
  let v = lookup(lang, ns, key);
  if (typeof v !== 'string') {
    missing(lang, `${ns}:${key}`);
    v = lookup('en', ns, key);
  }
  if (typeof v !== 'string') return key;
  return vars ? v.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{{${k}}}`)) : v;
}

/** Return an object/array from the translations (falls back to English). */
export function translateObj<T>(lang: Lang, ns: string, key: string): T {
  const v = lookup(lang, ns, key);
  if (v === undefined) {
    missing(lang, `${ns}:${key}`);
    return lookup('en', ns, key) as T;
  }
  return v as T;
}

/**
 * Normalise translated text for search/filter comparisons: German strings contain
 * invisible soft hyphens (see scripts/soft-hyphenate-de.mjs) that must not break matching.
 */
export const normalizeForSearch = (s: string) => s.replace(/­/g, '').toLocaleLowerCase();

/* ------------------------------------------------------------------ */
/* URL helpers                                                         */
/* ------------------------------------------------------------------ */

/** Split a browser pathname into language + language-neutral route ("/de/pricing" → de, "/pricing"). */
export function parsePath(pathname: string): { lang: Lang; path: string } {
  if (pathname === '/de' || pathname.startsWith('/de/')) {
    const rest = pathname.slice(3);
    return { lang: 'de', path: rest === '' ? '/' : rest };
  }
  return { lang: 'en', path: pathname || '/' };
}

/** Build the public URL path for a route in a language ("/pricing", de → "/de/pricing"). */
export function localizePath(route: string, lang: Lang): string {
  if (/^(https?:|mailto:|tel:)/.test(route)) return route;
  if (lang === 'en') return route;
  if (route === '/' || route === '') return '/de';
  return route.startsWith('/') ? `/de${route}` : `/de/${route}`;
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

const formatters = (lang: Lang) => {
  const loc = LOCALE[lang];
  const eurF = new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const eurCentsF = new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
  const intF = new Intl.NumberFormat(loc);
  return {
    eur: (n: number) => eurF.format(n),
    eurCents: (n: number) => eurCentsF.format(n),
    int: (n: number) => intF.format(n),
    /** Format an ISO date (YYYY-MM-DD) or Date. */
    date: (d: string | Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
      new Intl.DateTimeFormat(loc, opts).format(typeof d === 'string' ? new Date(d) : d),
  };
};

/** Module-level formatters for non-hook helpers (kept in sync by the provider). */
let current = formatters(DEFAULT_LANG);
export const fmt = {
  eur: (n: number) => current.eur(n),
  eurCents: (n: number) => current.eurCents(n),
  int: (n: number) => current.int(n),
  date: (d: string | Date, o?: Intl.DateTimeFormatOptions) => current.date(d, o),
};

/* ------------------------------------------------------------------ */
/* React                                                               */
/* ------------------------------------------------------------------ */

interface I18nValue {
  lang: Lang;
  locale: string;
}
const I18nContext = createContext<I18nValue>({ lang: DEFAULT_LANG, locale: LOCALE[DEFAULT_LANG] });

/** Provides the active language (driven by the router in ModalContext). Renders nothing until that language is loaded. */
export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const [ready, setReady] = useState(isLoaded(lang));
  useEffect(() => {
    let alive = true;
    if (isLoaded(lang)) setReady(true);
    else {
      setReady(false);
      loadLang(lang).then(() => alive && setReady(true));
    }
    return () => {
      alive = false;
    };
  }, [lang]);

  if (ready) current = formatters(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Native form validation bubbles follow the *browser's* language, not the page's.
  // Supply the message in the page language for every form field on the site.
  useEffect(() => {
    if (!ready) return;
    type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const isField = (el: EventTarget | null): el is Field =>
      el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement;
    const onInvalid = (e: Event) => {
      const el = e.target;
      if (!isField(el)) return;
      el.setCustomValidity('');
      const v = el.validity;
      const type = el instanceof HTMLInputElement ? el.type : '';
      let key = 'invalid';
      const vars: Record<string, string | number> = {};
      if (v.valueMissing) key = type === 'checkbox' ? 'checkbox' : el instanceof HTMLSelectElement ? 'select' : 'required';
      else if (v.typeMismatch) key = type === 'email' ? 'email' : type === 'url' ? 'url' : 'invalid';
      else if (v.tooShort) {
        key = 'tooShort';
        vars.min = (el as HTMLInputElement).minLength;
      } else if (v.tooLong) {
        key = 'tooLong';
        vars.max = (el as HTMLInputElement).maxLength;
      } else if (v.patternMismatch) key = 'pattern';
      else if (v.badInput || v.rangeUnderflow || v.rangeOverflow || v.stepMismatch) key = 'number';
      el.setCustomValidity(translate(lang, 'common', `validation.${key}`, vars));
    };
    const onEdit = (e: Event) => {
      if (isField(e.target)) e.target.setCustomValidity('');
    };
    document.addEventListener('invalid', onInvalid, true);
    document.addEventListener('input', onEdit, true);
    document.addEventListener('change', onEdit, true);
    return () => {
      document.removeEventListener('invalid', onInvalid, true);
      document.removeEventListener('input', onEdit, true);
      document.removeEventListener('change', onEdit, true);
    };
  }, [lang, ready]);

  const value = useMemo(() => ({ lang, locale: LOCALE[lang] }), [lang]);
  if (!ready) return null;
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Translation function bound to a namespace. */
export function useT(ns: string) {
  const { lang } = useI18n();
  return useCallback((key: string, vars?: Record<string, string | number>) => translate(lang, ns, key, vars), [lang, ns]);
}

/** Object/array lookup bound to a namespace. */
export function useTx(ns: string) {
  const { lang } = useI18n();
  return useCallback(<T,>(key: string) => translateObj<T>(lang, ns, key), [lang, ns]);
}

/** Locale-aware number, currency and date formatting. */
export function useFormat() {
  const { lang } = useI18n();
  return useMemo(() => formatters(lang), [lang]);
}
