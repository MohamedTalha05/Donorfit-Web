import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Cloud, CreditCard, Wallet } from 'lucide-react';
import { useT } from '../../i18n/index.tsx';
import HomeLink from '../home/HomeLink.tsx';
import { NEW_TAB } from '../../data/links.ts';
import { CLOUD_PARTNERS, PAYMENT_PARTNERS, type PartnerLogo } from '../../data/partners.ts';

/**
 * Partner logo sections. Cloud & technology partners and payment gateway partners are always
 * shown as two separate groups, never mixed. Text: common:partners.
 *
 *  - <PartnerEcosystem>  Homepage: both groups (cloud tiles + payment marquee).
 *  - <PaymentPartners variant="feature">  Payment Gateways and Partners pages: full logo grid.
 *  - <PaymentPartners variant="compact">  Product / solution pages: one slim strip.
 *
 * Motion: one staggered entrance per group, a slow marquee that pauses on hover/focus, and a small
 * lift on hover. With prefers-reduced-motion everything is static and the marquee becomes a grid.
 */

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

/** True once the element has entered the viewport (never resets). */
function useEnteredView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, entered };
}

/** Staggered entrance for the n-th item of a group. */
const enter = (entered: boolean, i: number) => ({
  className: `transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
    entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
  }`,
  style: { transitionDelay: entered ? `${i * 70}ms` : '0ms' },
});

function LogoImg({ p, scale = 1 }: { p: PartnerLogo; scale?: number }) {
  const t = useT('common');
  return (
    <img
      src={p.logo}
      alt={t('partners.logoAlt', { name: p.name })}
      width={p.w}
      height={p.h}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="block w-auto max-w-full object-contain"
      style={{ height: `${p.displayH * scale}rem` }}
    />
  );
}

/** A logo in a tile that links to the provider's official website (new tab). */
function LogoTile({ p, size = 'md', tabbable = true }: { p: PartnerLogo; size?: 'sm' | 'md' | 'lg'; tabbable?: boolean }) {
  const t = useT('common');
  const box = { sm: 'h-16 px-4', md: 'h-[4.5rem] px-4 sm:h-24', lg: 'h-28 px-6' }[size];
  const scale = { sm: 0.8, md: 1, lg: 1.12 }[size];
  return (
    <a
      href={p.url}
      {...NEW_TAB}
      tabIndex={tabbable ? undefined : -1}
      aria-label={t('partners.visit', { name: p.name })}
      className={`group/logo relative flex w-full items-center justify-center rounded-2xl bg-white ring-1 ring-neutral-200 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(0_24_64/0.45)] hover:ring-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${box}`}
    >
      <span className="transition-transform duration-300 group-hover/logo:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/logo:scale-100">
        <LogoImg p={p} scale={scale} />
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-brand-600 opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
      />
    </a>
  );
}

function GroupHeading({ icon: Icon, title, text, id, tone = 'light' }: { icon: typeof Cloud; title: string; text: string; id?: string; tone?: 'light' | 'aqua' }) {
  return (
    <div className="flex items-start gap-3.5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone === 'aqua' ? 'bg-white text-brand-700 ring-1 ring-brand-200' : 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 id={id} className="text-lg font-bold leading-snug text-navy-950 sm:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{text}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

/** Continuous logo carousel: two copies of the list slide left; the copy is hidden from AT and tab order. */
function LogoMarquee({ items }: { items: PartnerLogo[] }) {
  const list = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 gap-4 pr-4">
      {items.map((p) => (
        <li key={p.id} className="w-40 shrink-0 sm:w-44">
          <LogoTile p={p} tabbable={!copy} />
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <div className="pl-marquee group/marquee relative overflow-hidden py-3 motion-reduce:hidden">
        <div className="pl-marquee-track flex w-max group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
          {list(false)}
          {list(true)}
        </div>
      </div>
      {/* Reduced motion: a static grid instead of the carousel */}
      <ul className="hidden grid-cols-2 gap-3 motion-reduce:grid sm:grid-cols-3 lg:grid-cols-6">
        {items.map((p) => (
          <li key={p.id}>
            <LogoTile p={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* "More ways to pay" tile                                             */
/* ------------------------------------------------------------------ */

function MoreWaysTile({ showLink }: { showLink: boolean }) {
  const t = useT('common');
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 rounded-2xl border border-dashed border-brand-300 bg-aqua/70 px-5 py-4">
      <p className="flex items-center gap-2 text-[15px] font-bold text-navy-950">
        <Wallet className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
        {t('partners.payments.more.title')}
      </p>
      <p className="text-sm leading-relaxed text-neutral-700">{t('partners.payments.more.text')}</p>
      {showLink && (
        <HomeLink to="/payment-gateways" className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
          {t('partners.payments.more.link')}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </HomeLink>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cloud & technology partners                                         */
/* ------------------------------------------------------------------ */

export function CloudPartnerTiles({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const { ref, entered } = useEnteredView<HTMLUListElement>();
  return (
    <ul ref={ref} className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {CLOUD_PARTNERS.map((p, i) => {
        const e = enter(entered, i);
        return (
          <li key={p.id} className={e.className} style={e.style}>
            <LogoTile p={p} size={size} />
            <p className="mt-2 text-center text-sm font-semibold text-navy-950" translate="no">
              {p.name}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Payment gateway partners                                            */
/* ------------------------------------------------------------------ */

type PaymentProps = {
  id: string;
  variant: 'feature' | 'compact';
  /** Show "See all payment options" (hide it on the Payment Gateways page itself). */
  showLink?: boolean;
  className?: string;
};

export function PaymentPartners({ id, variant, showLink = true, className = '' }: PaymentProps) {
  const t = useT('common');
  const { ref, entered } = useEnteredView<HTMLDivElement>();

  if (variant === 'compact') {
    return (
      <section aria-labelledby={id} className={`home-v2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
        <div ref={ref} className="grid gap-6 rounded-[1.75rem] bg-soft p-6 ring-1 ring-neutral-200 sm:p-8 lg:grid-cols-[17rem_1fr] lg:items-center lg:gap-10">
          <div>
            <h2 id={id} className="flex items-center gap-2 text-lg font-bold text-navy-950">
              <CreditCard className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
              {t('partners.payments.title')}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{t('partners.payments.compactText')}</p>
            {showLink && (
              <HomeLink to="/payment-gateways" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
                {t('partners.payments.more.link')}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </HomeLink>
            )}
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {PAYMENT_PARTNERS.map((p, i) => {
              const e = enter(entered, i);
              return (
                <li key={p.id} className={e.className} style={e.style}>
                  <LogoTile p={p} size="sm" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className={`home-v2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 id={id} className="text-3xl font-extrabold leading-tight text-navy-950 [text-wrap:balance] sm:text-4xl">
          {t('partners.payments.title')}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-neutral-600">{t('partners.payments.text')}</p>
      </div>
      <div ref={ref} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {PAYMENT_PARTNERS.map((p, i) => {
          const e = enter(entered, i);
          return (
            <div key={p.id} className={e.className} style={e.style}>
              <LogoTile p={p} size="lg" />
            </div>
          );
        })}
        {(() => {
          const e = enter(entered, PAYMENT_PARTNERS.length);
          return (
            <div className={`col-span-2 sm:col-span-3 lg:col-span-2 ${e.className}`} style={e.style}>
              <MoreWaysTile showLink={showLink} />
            </div>
          );
        })()}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Homepage: both groups                                               */
/* ------------------------------------------------------------------ */

export function PartnerEcosystem({ id, className = '' }: { id: string; className?: string }) {
  const t = useT('common');
  const { ref, entered } = useEnteredView<HTMLDivElement>(0.15);
  const head = enter(entered, 0);
  const pay = enter(entered, 3);
  return (
    <section aria-labelledby={id} className={`home-v2 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 id={id} className="text-3xl font-extrabold leading-tight text-navy-950 [text-wrap:balance] sm:text-4xl lg:text-5xl">
          {t('partners.ecosystem.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('partners.ecosystem.intro')}</p>
      </div>

      <div ref={ref} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        {/* Cloud & technology partners */}
        <div className={`rounded-[1.75rem] bg-aqua p-6 ring-1 ring-brand-200 sm:p-8 ${head.className}`} style={head.style}>
          <GroupHeading icon={Cloud} tone="aqua" title={t('partners.cloud.title')} text={t('partners.cloud.text')} />
          <div className="mt-7">
            <CloudPartnerTiles />
          </div>
        </div>

        {/* Payment gateway partners */}
        <div className={`flex min-w-0 flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-neutral-200 sm:p-8 ${pay.className}`} style={pay.style}>
          <GroupHeading icon={CreditCard} title={t('partners.payments.title')} text={t('partners.payments.text')} />
          <div className="mt-6 min-w-0">
            <LogoMarquee items={PAYMENT_PARTNERS} />
          </div>
          <div className="mt-auto flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-600">{t('partners.payments.more.text')}</p>
            <HomeLink to="/payment-gateways" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
              {t('partners.payments.more.link')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </HomeLink>
          </div>
        </div>
      </div>
    </section>
  );
}
