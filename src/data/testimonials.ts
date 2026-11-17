/**
 * Customer testimonials.
 *
 * INTENTIONALLY EMPTY. Add an entry ONLY for a genuine quote that the customer
 * has approved in writing (exact wording in every language shown, name, role,
 * photo/logo). Never add invented names, quotes, ratings or figures.
 *
 * While a page has no approved testimonial, its TestimonialSection renders
 * nothing on the live site. In development (`npm run dev`) a clearly marked
 * placeholder shows where the section will appear.
 *
 * Example of the shape (do not publish as-is):
 *
 *   {
 *     id: 'acme-membership-2027',
 *     pages: ['membership', 'solutions/for-membership-orgs'],
 *     quote: { en: '…approved English wording…', de: '…approved German wording…' },
 *     name: 'Full Name',
 *     role: { en: 'Treasurer', de: 'Schatzmeisterin' },
 *     organisation: 'Organisation e.V.',
 *     logo: CUSTOMER_LOGOS.find((l) => l.id === 'organisation-id')?.src,
 *     product: 'membership',
 *     approved: '2027-01-15',
 *   }
 */
import type { Lang } from '../i18n/index.tsx';

/** Pages that can show a testimonial section (one key per marketing page). */
export type TestimonialPage =
  | 'home'
  | 'membership'
  | 'sponsorship'
  | 'money-pool'
  | 'water-well'
  | 'qurbani'
  | 'donations'
  | 'payment-gateways'
  | 'recurring-management'
  | 'donor-management'
  | 'reporting-and-insights'
  | 'campaign-management'
  | 'orphan-sponsorship'
  | 'solutions/for-ngos'
  | 'solutions/for-charities'
  | 'solutions/for-foundations'
  | 'solutions/for-sponsorship-orgs'
  | 'solutions/for-membership-orgs'
  | 'solutions/for-international-orgs';

export interface Testimonial {
  id: string;
  /** Pages this quote is relevant to. */
  pages: TestimonialPage[];
  /** Approved wording per language. A language without a quote does not show this testimonial. */
  quote: Partial<Record<Lang, string>>;
  name: string;
  role?: Partial<Record<Lang, string>>;
  organisation: string;
  /** Approved photo of the person (preferred) or the organisation's logo. */
  photo?: string;
  logo?: string;
  /** Product or solution the quote is about, shown as a small tag (label from common:products / footer links). */
  product?: string;
  /** ISO date the customer approved the wording, for the content record. */
  approved: string;
  /** Development-only sample card (never in TESTIMONIALS). */
  sample?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [];

export function testimonialsFor(page: TestimonialPage, lang: Lang): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.pages.includes(page) && t.quote[lang]);
}
