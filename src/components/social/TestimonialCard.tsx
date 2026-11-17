import React from 'react';
import { Quote } from 'lucide-react';
import { useI18n, useT } from '../../i18n/index.tsx';
import type { Testimonial } from '../../data/testimonials.ts';

/** Initials for the avatar fallback when no approved photo or logo exists. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

/**
 * One approved customer quote: turquoise heading pill, large quote, decorative quote mark,
 * then the person (approved photo, logo or initials). Used by the spotlight carousel.
 */
export default function TestimonialCard({ item, dark = false }: { item: Testimonial; dark?: boolean; onSoft?: boolean }) {
  const { lang } = useI18n();
  const t = useT('social');
  const quote = item.quote[lang];
  if (!quote) return null;
  const role = item.role?.[lang];
  const heading = item.heading?.[lang];
  const area = item.product ? t(`testimonials.areas.${item.product}`) : '';
  const meta = [role, item.organisation].filter(Boolean).join(', ');

  return (
    <figure
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-10 ${
        dark
          ? 'bg-navy-900 text-white ring-1 ring-white/15 shadow-[0_40px_80px_-44px_rgb(0_0_0/0.7)]'
          : 'bg-white ring-1 ring-navy-950/[0.06] shadow-[0_40px_80px_-44px_rgb(0_24_64/0.5)]'
      }`}
    >
      {/* decorative quote mark */}
      <Quote
        aria-hidden="true"
        className={`absolute -right-3 -top-4 -z-10 h-36 w-36 rotate-180 sm:h-44 sm:w-44 ${dark ? 'text-white/[0.06]' : 'text-brand-50'}`}
        fill="currentColor"
        strokeWidth={0}
      />

      <div className="flex flex-wrap items-center gap-2">
        {heading && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
              dark ? 'bg-white/10 text-brand-200' : 'bg-brand-50 text-brand-800 ring-1 ring-brand-100'
            }`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-brand-300' : 'bg-brand-500'}`} />
            {heading}
          </span>
        )}
        {item.sample && (
          <span className="rounded-full border border-dashed border-neutral-400 px-2.5 py-0.5 text-xs font-semibold text-neutral-500">
            {t('testimonials.sample.badge')}
          </span>
        )}
      </div>

      <blockquote
        className={`mt-6 flex-1 text-[1.375rem] font-bold leading-snug [text-wrap:balance] sm:text-[1.75rem] ${dark ? 'text-white' : 'text-navy-950'}`}
      >
        <p>“{quote}”</p>
      </blockquote>

      <figcaption className={`mt-8 flex items-center gap-4 border-t pt-6 ${dark ? 'border-white/10' : 'border-neutral-100'}`}>
        {item.photo ? (
          <img src={item.photo} alt="" width={56} height={56} loading="lazy" decoding="async" className="h-14 w-14 shrink-0 rounded-full object-cover" />
        ) : item.logo ? (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-2 ring-1 ring-neutral-200">
            <img src={item.logo} alt="" width={40} height={40} loading="lazy" decoding="async" className="max-h-9 w-auto max-w-full object-contain" />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="hv-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-800 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgb(0_122_128/0.8)]"
          >
            {initials(item.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className={`block break-words font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{item.name}</span>
          {meta && <span className={`block break-words text-sm leading-snug ${dark ? 'text-white/65' : 'text-neutral-600'}`}>{meta}</span>}
          {area && (
            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                dark ? 'bg-white/10 text-brand-200' : 'bg-brand-50 text-brand-800 ring-1 ring-brand-100'
              }`}
            >
              {area}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
