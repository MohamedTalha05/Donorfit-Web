import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { productByRoute, isHiddenRoute } from '../data/productPages.ts';
import { useT } from '../i18n/index.tsx';
import BrandLogo from './BrandLogo.tsx';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';

/** A link is either a footer label key ('links.x') or a product name ('common:products.x'). */
type FooterLink = { route: string; key: string; product?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'product',
    links: [
      { route: '/', key: 'platform' },
      { route: '/pricing', key: 'pricing' },
      { route: '/sponsorship', key: 'sponsorship', product: true },
      { route: '/orphan-sponsorship', key: 'orphanSponsorship' },
      { route: '/money-pool', key: 'money-pool', product: true },
      { route: '/membership', key: 'membership', product: true },
      { route: '/water-well', key: 'water-well', product: true },
      { route: '/qurbani', key: 'qurbani', product: true },
      { route: '/school-management', key: 'school-management', product: true },
      { route: '/donations', key: 'donations' },
      { route: '/recurring-giving', key: 'recurringGiving' },
      { route: '/donor-management', key: 'donorManagement' },
      { route: '/reporting-and-insights', key: 'reporting' },
    ],
  },
  {
    title: 'solutions',
    links: [
      { route: '/solutions/ngos', key: 'ngos' },
      { route: '/solutions/charities', key: 'charities' },
      { route: '/solutions/foundations', key: 'foundations' },
      { route: '/solutions/sponsorship-organizations', key: 'sponsorshipOrgs' },
      { route: '/solutions/membership-organizations', key: 'membershipOrgs' },
      { route: '/solutions/international-organizations', key: 'internationalOrgs' },
    ],
  },
];

const RESOURCE_LINKS: FooterLink[] = [
  { route: '/blog', key: 'blog' },
  { route: '/guides', key: 'guides' },
  { route: '/case-studies', key: 'caseStudies' },
  { route: '/faqs', key: 'faqs' },
];
const COMPANY_LINKS: FooterLink[] = [
  { route: '/about', key: 'about' },
  { route: '/contact', key: 'contact' },
  { route: '/partners', key: 'partners' },
];
const LEGAL_LINKS: FooterLink[] = [
  { route: '/privacy-policy', key: 'privacy' },
  { route: '/cookie-policy', key: 'cookies' },
  { route: '/terms', key: 'terms' },
  { route: '/refund-policy', key: 'refund' },
  { route: '/impressum', key: 'impressum' },
  { route: '/accessibility', key: 'accessibility' },
];

const linkClass = 'text-brand-300 hover:text-white transition-colors cursor-pointer text-left';
const headingClass = 'text-xs font-bold uppercase tracking-wider text-white';

export default function Footer() {
  const { openGetStarted, openBookDemo, navigateTo, openCookieSettings, currentRoute, localize } = useModal();
  const t = useT('footer');
  const tc = useT('common');
  // The homepage and product landing pages end with their own CTA, so skip the duplicate banner there.
  const showPreCta =
    currentRoute !== '/' && currentRoute !== '' && (!productByRoute(currentRoute) || isHiddenRoute(currentRoute));

  /** Real <a href> (language-prefixed) so Cmd/Ctrl-click works; plain clicks use SPA navigation. */
  const NavLink = ({ link, className = linkClass, children }: { link: FooterLink; className?: string; children?: React.ReactNode }) => (
    <a
      href={localize(link.route)}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigateTo(link.route);
      }}
      className={className}
    >
      {children ?? (link.product ? tc(`products.${link.key}`) : t(`links.${link.key}`))}
    </a>
  );

  return (
    <footer className="relative overflow-hidden bg-navy-950 bg-dark-glow text-white/80 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Pre-CTA Banner */}
        {showPreCta && (
        <div className="relative rounded-2xl bg-neutral-800/80 border border-neutral-700/80 p-8 sm:p-12 mb-16 overflow-hidden">
          <div aria-hidden="true" className="accent-hairline absolute inset-x-8 top-0 h-px pointer-events-none" />
          <div aria-hidden="true" className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-glow-slow pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{t('preCta.eyebrow')}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">{t('preCta.title')}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{t('preCta.body')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => openBookDemo()}
                className="px-5 py-2.5 border border-white/30 bg-white/5 hover:bg-white/10 hover:border-brand-300 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                {tc('actions.bookDemo')}
              </button>
              <button
                onClick={() => openGetStarted()}
                className="btn-gradient-light inline-flex items-center gap-2 px-6 py-2.5 text-neutral-950 font-bold rounded-lg cursor-pointer"
              >
                <span>{tc('actions.getStarted')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800 text-xs">
          {/* Col 1: Brand & Positioning */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <NavLink
              link={{ route: '/', key: 'platform' }}
              className="inline-flex cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              <BrandLogo onDark className="h-8 sm:h-9" alt={t('homeAria')} />
            </NavLink>
            <p className="text-neutral-400 leading-relaxed">{t('tagline')}</p>
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('hosting')}</span>
            </div>
          </div>

          {/* Cols 2–3: Product, Solutions */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-3">
              <div className={headingClass}>{t(`columns.${col.title}`)}</div>
              <ul className="space-y-2">
                {col.links.filter((link) => !isHiddenRoute(link.route)).map((link) => (
                  <li key={link.route}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 4: Resources & Company */}
          <div className="space-y-3">
            <div className={headingClass}>{t('columns.resources')}</div>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.route}>
                  <NavLink link={link} />
                </li>
              ))}
              <li className={`pt-2 ${headingClass}`}>{t('columns.company')}</li>
              {COMPANY_LINKS.map((link) => (
                <li key={link.route}>
                  <NavLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Trust and Legal */}
          <div className="space-y-3">
            <div className={headingClass}>{t('columns.trust')}</div>
            <ul className="space-y-2">
              <li>
                <NavLink
                  link={{ route: '/security', key: 'security' }}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 font-medium text-emerald-400"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t('links.security')}</span>
                </NavLink>
              </li>
              {LEGAL_LINKS.map((link) => (
                <li key={link.route}>
                  <NavLink link={link} />
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-brand-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {t('links.cookiePreferences')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>{t('bottom.rights', { year: new Date().getFullYear() })}</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
            <span>{t('bottom.focus')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('bottom.hq')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
