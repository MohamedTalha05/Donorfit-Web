import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import BrandLogo from './BrandLogo.tsx';
import { isHiddenProduct } from '../data/productPages.ts';
import { APP_LOGIN_URL, APP_SIGNUP_URL } from '../data/links.ts';
import { useT, useTx, type Lang } from '../i18n/index.tsx';
import {
  ChevronDown,
  Menu,
  X,
  Moon,
  IdCard,
  HeartHandshake,
  PiggyBank,
  Droplets,
  GraduationCap,
  Newspaper,
  CirclePlay,
  BookOpenText,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Navigation config
 *
 * `href: null` = destination page does not exist yet. Such items are shown
 * as "Coming soon" (not clickable) instead of linking to an invented URL.
 * To go live, add the route in App.tsx and set the href here.
 * ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  description: string;
  icon: LucideIcon;
  href: string | null;
}

/** The six Donorfit products (labels/descriptions come from the 'common' and 'products' namespaces). */
const PRODUCT_NAV = [
  { slug: 'membership', icon: IdCard, href: '/membership' },
  { slug: 'sponsorship', icon: HeartHandshake, href: '/sponsorship' },
  { slug: 'water-well', icon: Droplets, href: '/water-well' },
  { slug: 'qurbani', icon: Moon, href: '/qurbani' },
  { slug: 'school-management', icon: GraduationCap, href: '/school-management' },
  { slug: 'money-pool', icon: PiggyBank, href: '/money-pool' },
] as const;

const RESOURCE_NAV = [
  { key: 'blog', icon: Newspaper, href: '/blog' },
  { key: 'videos', icon: CirclePlay, href: null },
  { key: 'docs', icon: BookOpenText, href: null },
] as const;

/** Integrations page route. */
const INTEGRATIONS = { path: '/integrations' };
/** Pricing page route. */
const PRICING_HREF: string | null = '/pricing';
/** Customer app auth — full page redirects in the same tab (see src/data/links.ts). */
const LOGIN_URL = APP_LOGIN_URL;
const SIGNUP_URL = APP_SIGNUP_URL;

type MenuId = 'products' | 'resources';

/* ------------------------------------------------------------------ */

function FlagGB({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" preserveAspectRatio="none">
      <clipPath id="gb-flag-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-flag-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagDE({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

function SoonBadge() {
  const t = useT('nav');
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-neutral-100 px-1.5 py-px text-[11px] leading-4 font-semibold uppercase tracking-wide text-neutral-600 ring-1 ring-neutral-200">
      {t('soon')}
    </span>
  );
}

const FLAGS: Record<Lang, (p: { className?: string }) => React.JSX.Element> = { en: FlagGB, de: FlagDE };

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600';

/** Lets cmd/ctrl/middle-click open a real URL in a new tab; otherwise uses SPA navigation. */
function isPlainLeftClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

/* ------------------------------------------------------------------ */

export default function Navbar() {
  const { openBookDemo, navigateTo, currentRoute, lang, setLang, localize } = useModal();
  const t = useT('nav');
  const tc = useT('common');
  const tp = useTx('products');

  // Unlaunched products (HIDDEN_PRODUCTS) are left out of the menu entirely.
  const PRODUCT_ITEMS: NavItem[] = PRODUCT_NAV.filter((p) => !isHiddenProduct(p.slug)).map((p) => ({
    label: tc(`products.${p.slug}`),
    description: tp<string>(`pages.${p.slug}.navDescription`) ?? '',
    icon: p.icon,
    href: p.href,
  }));
  const RESOURCE_ITEMS: NavItem[] = RESOURCE_NAV.map((r) => ({
    label: t(`resourceItems.${r.key}.label`),
    description: t(`resourceItems.${r.key}.description`),
    icon: r.icon,
    href: r.href,
  }));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({ products: null, resources: null });
  const panelRefs = useRef<Record<MenuId, HTMLDivElement | null>>({ products: null, resources: null });
  const uid = useId();

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const go = useCallback(
    (path: string, sectionId?: string) => {
      clearCloseTimer();
      setOpenMenu(null);
      setMobileMenuOpen(false);
      navigateTo(path);
      if (sectionId) {
        // Wait for the page to render, then bring the section into view.
        window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    },
    [navigateTo],
  );

  // Close menus on outside click, Escape, and route change.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }, [currentRoute]);

  /* ---------- desktop dropdown behaviour ---------- */

  const handlePointerEnter = (id: MenuId) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return; // touch/pen use click
    clearCloseTimer();
    if (openMenu !== id) openedByHover.current = true;
    setOpenMenu(id);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const handleTriggerClick = (id: MenuId) => {
    // A mouse click right after hover-opening keeps the menu open instead of toggling it shut.
    if (openMenu === id && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpenMenu(openMenu === id ? null : id);
  };

  const focusableItems = (id: MenuId) =>
    Array.from(panelRefs.current[id]?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);

  const handleTriggerKeyDown = (id: MenuId) => (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openedByHover.current = false;
      setOpenMenu(id);
      requestAnimationFrame(() => focusableItems(id)[0]?.focus());
    } else if (e.key === 'Escape') {
      setOpenMenu(null);
    }
  };

  const handlePanelKeyDown = (id: MenuId) => (e: React.KeyboardEvent) => {
    const items = focusableItems(id);
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpenMenu(null);
      triggerRefs.current[id]?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const handleGroupBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Close when keyboard focus leaves the trigger + panel group.
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
  };

  const isSectionActive = (items: NavItem[]) => items.some((i) => i.href && currentRoute === i.href);

  /* ---------- shared render helpers ---------- */

  const renderDropdownItem = (item: NavItem, compact = false) => {
    const Icon = item.icon;
    const active = item.href !== null && currentRoute === item.href;
    const inner = (
      <>
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg ring-1 transition-colors ${
            compact ? 'h-8 w-8' : 'h-9 w-9'
          } ${
            item.href
              ? 'bg-emerald-50 text-emerald-700 ring-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600 group-focus-visible:bg-emerald-600 group-focus-visible:text-white'
              : 'bg-neutral-50 text-neutral-400 ring-neutral-200'
          }`}
        >
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span
            className={`flex items-center text-sm font-semibold ${
              item.href ? 'text-neutral-900 group-hover:text-emerald-700' : 'text-neutral-500'
            } ${active ? 'text-emerald-700' : ''}`}
          >
            {item.label}
            {!item.href && <SoonBadge />}
          </span>
          <span className={`mt-0.5 block text-xs leading-snug ${item.href ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {item.description}
          </span>
        </span>
      </>
    );

    const base = 'group flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-colors';

    if (!item.href) {
      return (
        <span className={`${base} cursor-default`} aria-disabled="true" title={t('comingSoon')}>
          {inner}
        </span>
      );
    }
    const href = item.href;
    return (
      <a
        href={localize(href)}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          if (!isPlainLeftClick(e)) return;
          e.preventDefault();
          go(href);
        }}
        className={`${base} hover:bg-neutral-50 ${active ? 'bg-emerald-50/60' : ''} ${focusRing}`}
      >
        {inner}
      </a>
    );
  };

  const triggerClass = (id: MenuId, active: boolean) =>
    `flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap transition-colors cursor-pointer hover:bg-brand-50 hover:text-brand-700 ${focusRing} ${
      openMenu === id || active ? 'text-brand-700' : ''
    } ${openMenu === id ? 'bg-brand-50' : ''}`;

  const panelClass = (id: MenuId) =>
    `absolute left-0 top-full z-40 pt-2.5 origin-top transition duration-200 ease-out motion-reduce:transition-none ${
      openMenu === id
        ? 'visible translate-y-0 scale-100 opacity-100'
        : 'invisible pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
    }`;

  const renderDesktopDropdown = (id: MenuId, label: string, items: NavItem[], panel: React.ReactNode) => {
    const panelId = `${uid}-${id}-panel`;
    return (
      <div
        className="relative"
        onPointerEnter={handlePointerEnter(id)}
        onPointerLeave={handlePointerLeave}
        onBlur={handleGroupBlur}
      >
        <button
          ref={(el) => {
            triggerRefs.current[id] = el;
          }}
          type="button"
          aria-expanded={openMenu === id}
          aria-controls={panelId}
          onClick={() => handleTriggerClick(id)}
          onKeyDown={handleTriggerKeyDown(id)}
          className={triggerClass(id, isSectionActive(items))}
        >
          <span>{label}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${openMenu === id ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          id={panelId}
          ref={(el) => {
            panelRefs.current[id] = el;
          }}
          className={panelClass(id)}
          onKeyDown={handlePanelKeyDown(id)}
        >
          {panel}
        </div>
      </div>
    );
  };

  /* ---------- render ---------- */

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200/80 bg-white/85 shadow-xs backdrop-blur-xl transition-[background-color,box-shadow,border-color]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <a
            href={localize('/')}
            onClick={(e) => {
              if (!isPlainLeftClick(e)) return;
              e.preventDefault();
              go('/');
            }}
            className={`flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-90 ${focusRing}`}
            aria-label={t('homeAria')}
          >
            <BrandLogo priority className="h-8 sm:h-9 lg:h-10" alt="Donorfit" />
          </a>

          {/* Desktop navigation */}
          <nav
            ref={navRef}
            aria-label={t('mainNav')}
            className="hidden items-center gap-1 text-sm font-medium text-navy-950 lg:flex xl:gap-2"
          >
            {renderDesktopDropdown(
              'products',
              t('products'),
              PRODUCT_ITEMS,
              <div className="w-[34rem] overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl shadow-neutral-900/10 ring-1 ring-black/[0.02]">
                <ul className="grid grid-cols-2 gap-1 p-3">
                  {PRODUCT_ITEMS.map((item) => (
                    <li key={item.label}>{renderDropdownItem(item)}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 border-t border-neutral-100 bg-neutral-50/80 px-5 py-3 text-xs">
                  <span className="text-neutral-500">{t('notSure')}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      openBookDemo();
                    }}
                    className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md font-semibold text-emerald-700 hover:text-emerald-800 ${focusRing}`}
                  >
                    {t('bookDemoLink')} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>,
            )}

            <a
              href={localize(INTEGRATIONS.path)}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                go(INTEGRATIONS.path);
              }}
              aria-current={currentRoute === INTEGRATIONS.path ? 'page' : currentRoute.startsWith(`${INTEGRATIONS.path}/`) ? 'true' : undefined}
              className={`rounded-lg px-3 py-2 whitespace-nowrap transition-colors hover:bg-brand-50 hover:text-brand-700 ${focusRing} ${
                currentRoute === INTEGRATIONS.path || currentRoute.startsWith(`${INTEGRATIONS.path}/`) ? 'text-neutral-950' : ''
              }`}
            >
              {t('integrations')}
            </a>

            {renderDesktopDropdown(
              'resources',
              t('resources'),
              RESOURCE_ITEMS,
              <div className="w-80 rounded-2xl border border-neutral-200/90 bg-white p-2.5 shadow-xl shadow-neutral-900/10 ring-1 ring-black/[0.02]">
                <ul className="space-y-0.5">
                  {RESOURCE_ITEMS.map((item) => (
                    <li key={item.label}>{renderDropdownItem(item, true)}</li>
                  ))}
                </ul>
              </div>,
            )}

            {PRICING_HREF ? (
              <a
                href={localize(PRICING_HREF)}
                onClick={(e) => {
                  if (!isPlainLeftClick(e)) return;
                  e.preventDefault();
                  go(PRICING_HREF);
                }}
                className={`rounded-lg px-3 py-2 whitespace-nowrap transition-colors hover:bg-brand-50 hover:text-brand-700 ${focusRing}`}
              >
                {t('pricing')}
              </a>
            ) : (
              <span
                className="flex cursor-default items-center rounded-lg px-3 py-2 whitespace-nowrap text-neutral-400"
                aria-disabled="true"
                title={t('pricingSoon')}
              >
                {t('pricing')}
                <SoonBadge />
              </span>
            )}

            {/* Language selector */}
            <div role="group" aria-label={t('language')} className="ml-1 flex items-center gap-1 border-l border-neutral-200 pl-3">
              {(['en', 'de'] as const).map((l) => {
                const Flag = FLAGS[l];
                const on = lang === l;
                const name = t(`languages.${l}.name`);
                return (
                  <button
                    key={l}
                    type="button"
                    lang={l}
                    aria-pressed={on}
                    aria-label={on ? t('currentLanguage', { name }) : t('switchTo', { name })}
                    title={name}
                    onClick={() => setLang(l)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-bold transition-colors ${
                      on ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/40' : 'text-neutral-500 hover:bg-neutral-100 hover:text-navy-950'
                    } ${focusRing}`}
                  >
                    <Flag className="block h-3.5 w-5 rounded-[2px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                    {t(`languages.${l}.short`)}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right: account actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={LOGIN_URL}
              className={`hidden rounded-full px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-brand-50 hover:text-brand-700 lg:inline-flex ${focusRing}`}
            >
              {t('login')}
            </a>
            <a
              href={SIGNUP_URL}
              className={`btn-gradient hidden rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap sm:inline-flex ${focusRing}`}
            >
              {t('signup')}
            </a>

            {/* Mobile / tablet menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls={`${uid}-mobile`}
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              className={`cursor-pointer rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden ${focusRing}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        id={`${uid}-mobile`}
        className={`grid border-neutral-200 bg-white transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          mobileMenuOpen ? 'grid-rows-[1fr] border-b opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label={t('mobileNav')} className="max-h-[calc(100dvh-4.5rem)] space-y-1 overflow-y-auto px-4 pt-2 pb-6 sm:px-6">
            {(
              [
                ['products', t('products'), PRODUCT_ITEMS],
                ['resources', t('resources'), RESOURCE_ITEMS],
              ] as const
            ).map(([id, label, items]) => {
              const expanded = mobileSection === id;
              return (
                <div key={id} className="border-b border-neutral-100 pb-1">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${uid}-m-${id}`}
                    onClick={() => setMobileSection(expanded ? null : id)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-50 ${focusRing}`}
                  >
                    {label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    id={`${uid}-m-${id}`}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                      expanded ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                    }`}
                  >
                    <ul className="grid gap-0.5 overflow-hidden sm:grid-cols-2">
                      {items.map((item) => (
                        <li key={item.label}>{renderDropdownItem(item, true)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            <a
              href={localize(INTEGRATIONS.path)}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                go(INTEGRATIONS.path);
              }}
              className={`block rounded-lg border-b border-neutral-100 px-3 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-50 ${focusRing}`}
            >
              {t('integrations')}
            </a>

            {PRICING_HREF ? (
              <a
                href={localize(PRICING_HREF)}
                onClick={(e) => {
                  if (!isPlainLeftClick(e)) return;
                  e.preventDefault();
                  go(PRICING_HREF);
                }}
                className={`block rounded-lg border-b border-neutral-100 px-3 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-50 ${focusRing}`}
              >
                {t('pricing')}
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="flex items-center border-b border-neutral-100 px-3 py-3 text-base font-semibold text-neutral-400"
              >
                {t('pricing')} <SoonBadge />
              </span>
            )}

            <div role="group" aria-label={t('language')} className="flex flex-wrap items-center gap-2 px-3 py-3">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">{t('language')}</span>
              {(['en', 'de'] as const).map((l) => {
                const Flag = FLAGS[l];
                const on = lang === l;
                return (
                  <button
                    key={l}
                    type="button"
                    lang={l}
                    aria-pressed={on}
                    onClick={() => setLang(l)}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                      on ? 'bg-emerald-50 text-neutral-900 ring-1 ring-emerald-600/40' : 'text-neutral-600 hover:bg-neutral-50'
                    } ${focusRing}`}
                  >
                    <Flag className="block h-3.5 w-5 rounded-[2px]" /> {t(`languages.${l}.name`)} ({t(`languages.${l}.short`)})
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-3 sm:flex-row">
              <a
                href={LOGIN_URL}
                className={`w-full rounded-full border border-neutral-300 py-2.5 text-center text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 ${focusRing}`}
              >
                {t('login')}
              </a>
              <a
                href={SIGNUP_URL}
                className={`btn-gradient w-full rounded-full py-2.5 text-center text-sm font-semibold ${focusRing}`}
              >
                {t('signup')}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
