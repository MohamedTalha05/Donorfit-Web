import React from 'react';
import { Quote } from 'lucide-react';
import { useI18n, useT } from '../../i18n/index.tsx';
import type { Testimonial } from '../../data/testimonials.ts';

/** One approved customer quote. Equal heights come from the parent grid (h-full + flex). */
export default function TestimonialCard({ item, dark = false }: { item: Testimonial; dark?: boolean }) {
  const { lang } = useI18n();
  const tc = useT('common');
  const t = useT('social');
  const quote = item.quote[lang];
  if (!quote) return null;
  const role = item.role?.[lang];
  const productLabel = item.product ? tc(`products.${item.product}`) : '';

  return (
    <figure
      className={`flex h-full flex-col rounded-[1.75rem] p-7 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 ${
        dark
          ? 'hv-glass text-white'
          : 'border border-neutral-200 bg-white shadow-[0_20px_50px_-36px_rgb(0_24_64/0.4)] hover:shadow-[0_28px_60px_-34px_rgb(0_24_64/0.5)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <Quote className={`h-7 w-7 ${dark ? 'text-brand-300' : 'text-brand-500'}`} aria-hidden="true" />
        {item.sample && (
          <span className="rounded-full border border-dashed border-neutral-400 px-2.5 py-0.5 text-xs font-semibold text-neutral-500">
            {t('testimonials.sample.badge')}
          </span>
        )}
      </div>
      <blockquote className={`mt-5 flex-1 text-[17px] leading-relaxed ${dark ? 'text-white/85' : 'text-navy-950'}`}>
        <p>{quote}</p>
      </blockquote>
      <figcaption className={`mt-7 flex items-center gap-4 border-t pt-6 ${dark ? 'border-white/10' : 'border-neutral-200'}`}>
        {item.photo ? (
          <img src={item.photo} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover" />
        ) : item.logo ? (
          <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-white px-2 ring-1 ring-neutral-200">
            <img src={item.logo} alt="" loading="lazy" className="max-h-8 w-auto max-w-full object-contain" />
          </span>
        ) : null}
        <span className="min-w-0">
          <span className={`block font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>{item.name}</span>
          <span className={`block text-sm ${dark ? 'text-white/65' : 'text-neutral-600'}`}>
            {role ? `${role}, ` : ''}
            {item.organisation}
          </span>
        </span>
        {productLabel && productLabel !== `products.${item.product}` && (
          <span
            className={`ml-auto hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline ${
              dark ? 'bg-white/10 text-brand-200' : 'bg-brand-50 text-brand-800 ring-1 ring-brand-100'
            }`}
          >
            {productLabel}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
