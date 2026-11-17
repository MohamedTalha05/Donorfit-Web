import React from 'react';
import { useT } from '../../i18n/index.tsx';
import { CUSTOMER_LOGOS } from '../../data/customers.ts';
import AnimatedLogoCarousel from './AnimatedLogoCarousel.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/** Same logos everywhere, but each page starts the strip at a different organisation. */
function rotated<T>(list: T[], key: string): T[] {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = h % list.length;
  return [...list.slice(n), ...list.slice(0, n)];
}

/**
 * "Trusted by" band with the customer logo carousel.
 * - `compact`: one-line heading, used inside product, feature and solution pages.
 * - `tone`: background of the surrounding section; the card takes the contrasting surface.
 * Renders nothing when there are no authorised logos.
 */
export default function CustomerLogoSection({
  id,
  compact = false,
  tone = 'white',
  className = '',
}: {
  id: string;
  compact?: boolean;
  tone?: 'white' | 'soft' | 'aqua';
  className?: string;
}) {
  const t = useT('social');
  if (CUSTOMER_LOGOS.length === 0) return null;

  const sectionBg = tone === 'soft' ? 'bg-soft' : tone === 'aqua' ? 'bg-aqua' : 'bg-white';
  const cardBg = tone === 'white' ? 'bg-soft border-neutral-200/80' : 'bg-white/70 border-white';

  return (
    <section aria-labelledby={id} className={`${sectionBg} ${compact ? 'py-12 sm:py-16' : 'py-10'} ${className}`}>
      <div className={CONTAINER}>
        <div className={`rounded-[2rem] border px-5 py-8 sm:px-10 sm:py-10 ${cardBg}`}>
          {compact ? (
            <h2 id={id} className="text-center text-base font-bold text-navy-950 sm:text-lg">
              {t('logos.compactTitle')}
            </h2>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <h2 id={id} className="text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">
                {t('logos.title')}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">{t('logos.body')}</p>
            </div>
          )}
          <div className={compact ? 'mt-6' : 'mt-8'}>
            <AnimatedLogoCarousel logos={id === 'trusted-title' ? CUSTOMER_LOGOS : rotated(CUSTOMER_LOGOS, id)} label={t('logos.regionLabel')} />
          </div>
        </div>
      </div>
    </section>
  );
}
