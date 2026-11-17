/**
 * Customer testimonials.
 *
 * Add an entry ONLY for a genuine quote that the customer has approved (exact
 * wording in every language shown, name, role, photo/logo). Never add invented
 * names, quotes, ratings or figures, and never pair a quote with a photo that
 * does not show that person.
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
 *     general: true,                      // also show in the site-wide section
 *     heading: { en: 'Renewals that run themselves', de: '…' },
 *     approved: '2027-01-15',
 *   }
 *
 * The seven general quotes below come from the donorfit.com homepage; the client confirmed them as
 * genuine on 2026-11-17. Their live-site photos are generic theme avatars, so they are not used.
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

/** Area of the platform a quote is about; label from social:testimonials.areas.<area>. */
export type TestimonialArea = 'donations' | 'membership' | 'sponsorship' | 'money-pool' | 'water-well' | 'qurbani' | 'payments';

export interface Testimonial {
  id: string;
  /** Pages this quote is relevant to (page-specific sections). */
  pages: TestimonialPage[];
  /**
   * Also show this quote in the general "Hear From the Organizations We Empower" section,
   * which appears on every marketing page that has no page-specific quote.
   */
  general?: boolean;
  /** Short card heading per language, e.g. "Giving made simple". Optional. */
  heading?: Partial<Record<Lang, string>>;
  /** Approved wording per language. A language without a quote does not show this testimonial. */
  quote: Partial<Record<Lang, string>>;
  name: string;
  role?: Partial<Record<Lang, string>>;
  /** Organisation name, if the customer agreed to show it. */
  organisation?: string;
  /** Approved photo of the person (preferred) or the organisation's logo. */
  photo?: string;
  logo?: string;
  /** Platform area the quote is about, shown as a small tag. */
  product?: TestimonialArea;
  /** ISO date the customer approved the wording, for the content record. */
  approved: string;
  /** Development-only sample card (never in TESTIMONIALS). */
  sample?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  // The seven testimonials from the donorfit.com homepage (checked 2026-11-17). The client confirmed on
  // 2026-11-17 that these are genuine customer reviews. The live site shows generic theme avatars that do
  // not belong to these people (4 photos for 7 names), so initials are shown instead of photos.
  // English wording is verbatim; the trailing comma of the last quote (a cut-off on the live site) is shown as "…".
  // German: faithful translation (the German live site has no testimonials).
  {
    id: 'sophie-mueller',
    pages: [],
    general: true,
    heading: { en: 'Results that matter', de: 'Ergebnisse, die zählen' },
    quote: { en: 'Very serious and recommended!', de: 'Sehr seriös und empfehlenswert!' },
    name: 'Sophie Müller',
    role: { en: 'Development Lead', de: 'Leitung Entwicklung' },
    approved: '2026-11-17',
  },
  {
    id: 'sarah-mitchell',
    pages: [],
    general: true,
    heading: { en: 'Truly mission focused', de: 'Ganz auf die Mission ausgerichtet' },
    quote: { en: 'Exactly what modern nonprofits need', de: 'Genau das, was moderne gemeinnützige Organisationen brauchen' },
    name: 'Sarah Mitchell',
    role: { en: 'Co-founder', de: 'Mitgründung' },
    approved: '2026-11-17',
  },
  {
    id: 'omar-hassan',
    pages: [],
    general: true,
    heading: { en: 'Growth without limits', de: 'Wachstum ohne Grenzen' },
    quote: { en: 'A reputable aid for organization Thanks to everyone who helps.', de: 'Eine seriöse Hilfe für Organisationen. Danke an alle, die helfen.' },
    name: 'Omar Hassan',
    role: { en: 'Donor Relations Manager', de: 'Donor Relations Management' },
    approved: '2026-11-17',
  },
  {
    id: 'thomas-berger',
    pages: [],
    general: true,
    heading: { en: 'Stress free fundraising', de: 'Fundraising ohne Stress' },
    quote: { en: 'One of the best!', de: 'Eines der besten!' },
    name: 'Thomas Berger',
    role: { en: 'Chief Executive Officer', de: 'Geschäftsführung' },
    approved: '2026-11-17',
  },
  {
    id: 'emma-carter',
    pages: [],
    general: true,
    heading: { en: 'Simply works better', de: 'Funktioniert einfach besser' },
    quote: { en: 'Easy handling, kept totally clear and simple!', de: 'Einfache Handhabung, völlig klar und übersichtlich gehalten!' },
    name: 'Emma Carter',
    role: { en: 'Fundraising Manager', de: 'Fundraising-Management' },
    approved: '2026-11-17',
  },
  {
    id: 'ahmed-rahman',
    pages: [],
    general: true,
    heading: { en: 'Beyond our expectations', de: 'Mehr als erwartet' },
    quote: { en: 'Best site and you can trust them!', de: 'Die beste Seite, und man kann ihnen vertrauen!' },
    name: 'Ahmed Rahman',
    role: { en: 'Director of Operations', de: 'Leitung Betrieb' },
    approved: '2026-11-17',
  },
  {
    id: 'fatima-khan',
    pages: [],
    general: true,
    heading: { en: 'Giving made simple', de: 'Spenden leicht gemacht' },
    quote: { en: 'One of the best donation portals there is! MashaAllah, transparent…', de: 'Eines der besten Spendenportale überhaupt! MashaAllah, transparent …' },
    name: 'Fatima Khan',
    role: { en: 'Nonprofit Administrator', de: 'Verwaltung einer gemeinnützigen Organisation' },
    approved: '2026-11-17',
  },
];

export function testimonialsFor(page: TestimonialPage, lang: Lang): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.pages.includes(page) && t.quote[lang]);
}

/** Quotes for the general platform section (general: true), in the order listed. */
export function generalTestimonials(lang: Lang): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.general && t.quote[lang]);
}

/** Platform areas the development preview cycles through, one sample card each. */
export const GENERAL_SAMPLE_AREAS: TestimonialArea[] = ['donations', 'membership', 'sponsorship', 'money-pool', 'water-well', 'qurbani', 'payments'];
