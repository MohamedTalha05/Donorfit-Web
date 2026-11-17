import React from 'react';
import { useI18n, useT } from '../../i18n/index.tsx';
import { testimonialsFor, type TestimonialPage } from '../../data/testimonials.ts';
import GeneralTestimonialSection, { TestimonialCarousel } from './GeneralTestimonialSection.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * Testimonial slot of a marketing page.
 * With approved quotes for this page: a page-specific section.
 * Without: the site-wide general section (GeneralTestimonialSection), which itself renders
 * nothing on the live site until approved general quotes exist. Only one of the two is
 * ever shown, so a page never repeats the same quote.
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

  if (approved.length === 0) return <GeneralTestimonialSection id={id} tone={tone} />;

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
        <div className="mt-12">
          <TestimonialCarousel items={approved} onSoft={tone === 'soft'} />
        </div>
      </div>
    </section>
  );
}
