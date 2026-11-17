import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n, useT } from '../../i18n/index.tsx';
import { testimonialsFor, type Testimonial, type TestimonialPage } from '../../data/testimonials.ts';
import TestimonialCard from './TestimonialCard.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/** Up to three quotes: grid. More: swipeable row with previous/next buttons. */
export function TestimonialList({ items, dark = false }: { items: Testimonial[]; dark?: boolean }) {
  const t = useT('social');
  const row = useRef<HTMLUListElement>(null);

  if (items.length <= 3) {
    return (
      <ul className={`grid gap-6 ${items.length === 1 ? 'mx-auto max-w-3xl' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((item) => (
          <li key={item.id}>
            <TestimonialCard item={item} dark={dark} />
          </li>
        ))}
      </ul>
    );
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector('li');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 24), behavior: reduce ? 'auto' : 'smooth' });
  };
  const btn = `flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
    dark ? 'text-white ring-white/25 hover:bg-white/10' : 'bg-white text-navy-950 ring-neutral-300 hover:bg-aqua'
  }`;

  return (
    <div>
      <ul
        ref={row}
        tabIndex={0}
        aria-label={t('testimonials.listLabel')}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-brand-600 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.id} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <TestimonialCard item={item} dark={dark} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} className={btn} aria-label={t('testimonials.prev')}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} className={btn} aria-label={t('testimonials.next')}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * Page-specific testimonial section.
 * Live site: renders nothing until an approved testimonial exists for this page and language.
 * Development: renders a clearly marked placeholder so the position can be reviewed.
 */
export default function TestimonialSection({
  page,
  tone = 'white',
}: {
  page: TestimonialPage;
  tone?: 'white' | 'soft' | 'aqua';
}) {
  const t = useT('social');
  const { lang } = useI18n();
  const approved = testimonialsFor(page, lang);
  const id = `testimonials-${page.replace(/\W+/g, '-')}`;

  // Live site: no approved quote for this page → no section at all.
  if (approved.length === 0 && !import.meta.env.DEV) return null;

  // Development only: clearly labelled sample cards so the layout can be reviewed. Never shipped.
  const isPreview = approved.length === 0;
  const items: Testimonial[] = isPreview
    ? [1, 2, 3].map((n) => ({
        id: `sample-${n}`,
        pages: [page],
        quote: { [lang]: t('testimonials.sample.quote') },
        name: t('testimonials.sample.name'),
        role: { [lang]: t('testimonials.sample.role') },
        organisation: t('testimonials.sample.organisation'),
        approved: '',
        sample: true,
      }))
    : approved;

  const bg = tone === 'soft' ? 'bg-soft' : tone === 'aqua' ? 'bg-aqua' : 'bg-white';
  return (
    <section aria-labelledby={id} className={`${bg} py-20 sm:py-28`}>
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <h2 id={id} className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
            {t(`testimonials.pages.${page}.title`)}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t(`testimonials.pages.${page}.body`)}</p>
        </div>
        {isPreview && (
          <p data-dev-placeholder="testimonials" className="mt-6 inline-block rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-600">
            {t('testimonials.devPlaceholder', { page })}
          </p>
        )}
        <div className="mt-12">
          <TestimonialList items={items} />
        </div>
      </div>
    </section>
  );
}
