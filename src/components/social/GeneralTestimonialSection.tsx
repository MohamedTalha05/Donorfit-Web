import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFormat, useI18n, useT } from '../../i18n/index.tsx';
import { GENERAL_SAMPLE_AREAS, generalTestimonials, type Testimonial } from '../../data/testimonials.ts';
import TestimonialCard from './TestimonialCard.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * Spotlight testimonial carousel: one quote in focus, its neighbours peeking in at the sides. Loops endlessly.
 * - No visible buttons at rest. Inside the carousel, two subtle arrows fade in at the edges; the arrow on the
 *   side the pointer is on brightens, and clicking anywhere on that side moves the carousel. Arrows hide when
 *   the pointer leaves.
 * - Touch: swipe left/right (arrows never show on touch screens). Keyboard: arrow keys when focused; the arrow
 *   buttons are focusable and visible on focus.
 * - Cards glide with a combined slide, scale and fade. The carousel fades up when it first enters the viewport.
 * - No autoplay (moving content without a pause control would fail WCAG 2.2.2). Reduced motion: no transitions.
 */
export function TestimonialCarousel({ items, dark = false }: { items: Testimonial[]; onSoft?: boolean; dark?: boolean }) {
  const t = useT('social');
  const { int } = useFormat();
  const wrap = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState<'left' | 'right' | null>(null);
  const [inside, setInside] = useState(false);
  const [shown, setShown] = useState(false);
  const n = items.length;

  // Gentle entrance the first time the carousel enters the viewport.
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (n === 0) return null;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + n) % n);
  const many = n > 1;

  /** Shortest circular distance of card i from the card in focus (… -2, -1, 0, 1, 2 …). */
  const offset = (i: number) => {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const sideOf = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    return x < 0.36 ? 'left' : x > 0.64 ? 'right' : null;
  };

  const arrow = (dir: 'left' | 'right') => {
    const Icon = dir === 'left' ? ChevronLeft : ChevronRight;
    const active = side === dir;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(dir === 'left' ? -1 : 1);
        }}
        aria-label={dir === 'left' ? t('testimonials.prev') : t('testimonials.next')}
        className={`absolute top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-[opacity,transform] duration-300 ease-out focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:flex ${
          dark ? 'bg-white/15 text-white ring-1 ring-white/25' : 'bg-white/85 text-navy-950 shadow-[0_14px_34px_-14px_rgb(0_24_64/0.55)] ring-1 ring-navy-950/10'
        } ${dir === 'left' ? 'left-1 sm:left-3 lg:left-6' : 'right-1 sm:right-3 lg:right-6'} ${
          active ? 'scale-100 opacity-100' : inside ? 'scale-90 opacity-35' : 'pointer-events-none scale-90 opacity-0'
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  };

  return (
    <div
      ref={wrap}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={t('testimonials.listLabel')}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(-1);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(1);
          }
        }}
        onMouseEnter={() => setInside(true)}
        onMouseMove={(e) => setSide(sideOf(e))}
        onMouseLeave={() => {
          setInside(false);
          setSide(null);
        }}
        onClick={(e) => {
          const s = sideOf(e);
          if (many && s) go(s === 'left' ? -1 : 1);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') touchX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (many && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        className={`relative select-none [touch-action:pan-y] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 ${
          many && side ? 'cursor-pointer' : ''
        }`}
      >
        {/* Stage: edges fade out so the neighbouring cards dissolve instead of being cut off. */}
        <div className="grid justify-items-center overflow-hidden pb-14 pt-6 [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]">
        {items.map((item, i) => {
          const d = many ? offset(i) : 0;
          const abs = Math.abs(d);
          const style: React.CSSProperties =
            d === 0
              ? { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 30 }
              : abs === 1
                ? { transform: `translateX(${d * 82}%) scale(0.84)`, opacity: 0.5, zIndex: 20 }
                : { transform: `translateX(${Math.sign(d) * 140}%) scale(0.7)`, opacity: 0, zIndex: 10 };
          return (
            <div
              key={item.id}
              aria-hidden={d !== 0}
              inert={d !== 0 ? true : undefined}
              style={style}
              className="w-[84%] transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.22,0.8,0.2,1)] [grid-area:1/1] motion-reduce:transition-none sm:w-[68%] lg:w-[52%]"
            >
              <TestimonialCard item={item} dark={dark} />
            </div>
          );
        })}
        </div>
        {many && (
          <>
            {arrow('left')}
            {arrow('right')}
          </>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {t('testimonials.slideOf', { n: int(index + 1), total: int(n) })}
      </p>
    </div>
  );
}

/**
 * Site-wide "Hear From the Organizations We Empower" section about the whole Donorfit platform.
 * Live site: renders nothing until approved quotes marked `general: true` exist in src/data/testimonials.ts.
 * Development: renders clearly marked sample cards (one per platform area) so the layout can be reviewed.
 */
export default function GeneralTestimonialSection({
  id = 'testimonials-general',
  tone = 'white',
  className = '',
}: {
  id?: string;
  tone?: 'white' | 'soft' | 'aqua';
  className?: string;
}) {
  const t = useT('social');
  const { lang } = useI18n();
  const approved = generalTestimonials(lang);

  if (approved.length === 0 && !import.meta.env.DEV) return null;

  const isPreview = approved.length === 0;
  const items: Testimonial[] = isPreview
    ? GENERAL_SAMPLE_AREAS.map((area) => ({
        id: `general-sample-${area}`,
        pages: [],
        general: true,
        product: area,
        heading: { [lang]: t('testimonials.sample.heading') },
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
    <section aria-labelledby={id} className={`home-v2 relative isolate ${bg} overflow-hidden py-20 sm:py-28 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(55%_60%_at_50%_60%,var(--color-aqua),transparent)]" />
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={id} className="text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.75rem]">
            {t('testimonials.general.title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('testimonials.general.body')}</p>
        </div>
        {isPreview && (
          <p data-dev-placeholder="testimonials" className="mx-auto mt-6 block w-fit rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-600">
            {t('testimonials.general.devPlaceholder')}
          </p>
        )}
        <div className="mt-10 sm:mt-12">
          <TestimonialCarousel items={items} onSoft={tone === 'soft'} />
        </div>
      </div>
    </section>
  );
}
