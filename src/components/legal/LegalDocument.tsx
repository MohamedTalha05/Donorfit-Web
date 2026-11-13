import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, CalendarDays, FileText, Info, ListOrdered, Settings2 } from 'lucide-react';
import { useModal } from '../../context/ModalContext.tsx';
import { useT, useTx } from '../../i18n/index.tsx';
import HomeLink from '../home/HomeLink.tsx';

/* ------------------------------------------------------------------ *
 * Legal documents (Privacy Policy, Terms & Conditions), rendered from
 * locales/<lang>/legal.json → "privacy" / "terms".
 * Content is a list of sections made of typed blocks, so EN and DE keep
 * the same structure (section ids are shared and used as anchors).
 * Company identity is read from "impressum.provider" so it is defined once.
 * ------------------------------------------------------------------ */

type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; title: string; text: string }
  | { type: 'link'; text: string; to: string }
  | { type: 'cookieButton'; text: string }
  | { type: 'controller' }
  | { type: 'kv'; rows: [string, string][] };

type Section = { id: string; heading: string; blocks: Block[] };

/** ISO dates matching the visible "Last updated" text of each document (update both together). */
const UPDATED_ISO: Record<LegalDoc, string> = {
  privacy: '2026-11-13',
  terms: '2026-11-13',
  cookies: '2026-11-13',
  impressum: '2026-11-13',
  refund: '2026-11-13',
};

export type LegalDoc = 'privacy' | 'terms' | 'cookies' | 'impressum' | 'refund';

const linkClass =
  'inline-flex items-center gap-1.5 rounded font-semibold text-brand-700 underline underline-offset-4 decoration-brand-300 hover:text-brand-800 hover:decoration-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

/** Smooth-scroll to a section and update the URL hash without triggering the router. */
function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(window.history.state, '', `#${id}`);
  // Move focus for keyboard and screen-reader users without a second scroll.
  el.focus({ preventScroll: true });
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const { navigateTo, openCookieSettings } = useModal();
  const t = useT('legal');
  const tx = useTx('legal');
  const sections = tx<Section[]>(`${doc}.sections`);
  const related = tx<{ text: string; to: string }[] | undefined>(`${doc}.related`) ?? [];
  /** Short documents (e.g. the Imprint) set "toc": false and render as a single column. */
  const showToc = tx<boolean | undefined>(`${doc}.toc`) !== false;
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  // Deep links (e.g. /privacy-policy#rights): scroll to the section once rendered.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && ids.includes(id)) window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tocLink = (s: Section, compact = false) => (
    <a
      href={`#${s.id}`}
      onClick={(e) => {
        e.preventDefault();
        goToSection(s.id);
      }}
      aria-current={active === s.id ? 'location' : undefined}
      className={`block rounded-lg border-l-2 py-1.5 pl-3 pr-2 text-[14px] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        active === s.id && !compact
          ? 'border-brand-600 bg-brand-50 font-semibold text-brand-800'
          : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-navy-950'
      }`}
    >
      {s.heading}
    </a>
  );

  const renderBlock = (b: Block, key: number) => {
    switch (b.type) {
      case 'p':
        return <p key={key}>{b.text}</p>;
      case 'h3':
        return (
          <h3 key={key} className="pt-3 text-lg font-bold text-navy-950">
            {b.text}
          </h3>
        );
      case 'list':
        return (
          <ul key={key} className="list-disc space-y-2 pl-6 marker:text-brand-600">
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        );
      case 'table':
        return (
          <div key={key} className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
              <thead className="bg-soft text-navy-950">
                <tr>
                  {b.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {b.rows.map((r) => (
                  <tr key={r.join('|')} className="align-top">
                    {r.map((c, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-navy-950' : ''}`}>
                        {i === 0 && /^[a-z_0-9-]+$/.test(c) ? <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">{c}</code> : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'note':
        return (
          <div key={key} className="rounded-xl border-l-4 border-brand-600 bg-brand-50 p-5">
            <p className="flex items-center gap-2 font-bold text-navy-950">
              <Info className="h-4 w-4 text-brand-700" aria-hidden="true" />
              {b.title}
            </p>
            <p className="mt-2">{b.text}</p>
          </div>
        );
      case 'link':
        return (
          <p key={key}>
            <HomeLink to={b.to} className={linkClass}>
              {b.text}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </HomeLink>
          </p>
        );
      case 'cookieButton':
        return (
          <p key={key}>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <Settings2 className="h-4 w-4" aria-hidden="true" />
              {b.text}
            </button>
          </p>
        );
      case 'controller':
        return (
          <address key={key} className="rounded-xl border border-neutral-200 bg-white p-5 not-italic text-navy-950">
            {tx<string[]>('impressum.provider.lines').map((line, i) => (
              <span key={line} className={`block ${i === 0 ? 'font-bold' : ''}`}>
                {line}
              </span>
            ))}
            {doc !== 'impressum' && (
              <span className="mt-3 block">
                {t('privacy.emailLabel')}:{' '}
                <a href={`mailto:${t('privacy.controllerEmail')}`} className={linkClass}>
                  {t('privacy.controllerEmail')}
                </a>
              </span>
            )}
          </address>
        );
      case 'kv':
        return (
          <dl key={key} className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {b.rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(10rem,16rem)_1fr] sm:gap-6">
                <dt className="text-[15px] text-neutral-500">{label}</dt>
                <dd className="font-semibold text-navy-950">
                  {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? (
                    <a href={`mailto:${value}`} className={linkClass}>
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-v2 bg-white">
      {/* ---------------------------------------------------------- Header */}
      <header className="border-b border-neutral-200 bg-soft">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-neutral-600 hover:text-navy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('ui.backToHome')}
          </button>
          <p className="mt-8 text-sm font-semibold text-brand-700">{t(`${doc}.eyebrow`)}</p>
          <h1 className="mt-2 text-[2rem] font-extrabold leading-tight text-navy-950 hyphens-auto break-words sm:text-5xl">{t(`${doc}.title`)}</h1>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm text-navy-900 ring-1 ring-neutral-200">
            <CalendarDays className="h-4 w-4 text-brand-700" aria-hidden="true" />
            {t(`${doc}.updatedLabel`)}: <time dateTime={UPDATED_ISO[doc]} className="font-semibold">{t(`${doc}.updated`)}</time>
          </p>
          <div className="mt-6 max-w-3xl space-y-3 text-lg leading-relaxed text-neutral-700">
            {tx<string[]>(`${doc}.intro`).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {related.length > 0 && (
            <nav aria-labelledby={`${doc}-related`} className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              <span id={`${doc}-related`} className="mr-1 font-semibold text-neutral-500">
                {t(`${doc}.relatedLabel`)}:
              </span>
              {related.map((r) => (
                <HomeLink
                  key={r.to}
                  to={r.to}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold text-brand-800 ring-1 ring-neutral-200 transition-colors hover:ring-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  {r.text}
                </HomeLink>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* ------------------------------------------------- Contents + body */}
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:gap-14 lg:px-8 ${showToc ? 'lg:grid-cols-[17rem_1fr]' : ''}`}
      >
        {/* Desktop: sticky table of contents */}
        {showToc && (
        <nav aria-labelledby="toc-title" className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <h2 id="toc-title" className="flex items-center gap-2 text-sm font-bold text-navy-950">
              <ListOrdered className="h-4 w-4 text-brand-700" aria-hidden="true" />
              {t(`${doc}.tocTitle`)}
            </h2>
            <ol className="mt-3 space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>{tocLink(s)}</li>
              ))}
            </ol>
          </div>
        </nav>
        )}

        <div className="min-w-0">
          {/* Mobile and tablet: collapsible table of contents */}
          {showToc && (
          <details id="toc" open className="group mb-10 rounded-2xl border border-neutral-200 bg-soft p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded text-base font-bold text-navy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              <span className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-brand-700" aria-hidden="true" />
                {t(`${doc}.tocTitle`)}
              </span>
              <ArrowUp className="h-4 w-4 text-neutral-500 transition-transform group-[:not([open])]:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </summary>
            <ol className="mt-3 space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>{tocLink(s, true)}</li>
              ))}
            </ol>
          </details>
          )}

          <article className="max-w-[70ch] space-y-14 text-[16.5px] leading-[1.75] text-neutral-700">
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={`${s.id}-h`}>
                <h2
                  id={s.id}
                  tabIndex={-1}
                  className="scroll-mt-28 text-2xl font-extrabold leading-tight text-navy-950 outline-none sm:text-[1.7rem]"
                >
                  <span id={`${s.id}-h`}>{s.heading}</span>
                </h2>
                <div className="mt-5 space-y-4">{s.blocks.map(renderBlock)}</div>
                {showToc && (
                <a
                  href="#toc"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('toc');
                  }}
                  className="mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-neutral-500 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:hidden"
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(`${doc}.backToTop`)}
                </a>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
