/**
 * Audience "Solutions" landing pages.
 *
 * Language-neutral structure only: slugs, routes, photos and the old URLs that
 * now redirect here. All visible text lives in src/locales/<lang>/solutions.json
 * under items.<slug>; page metadata lives in seo.json under routes.<route>.
 *
 * Content rule: features described on these pages must exist in the Donorfit
 * app (source: products.json product copy and the Pricing page feature list).
 * No result guarantees, no unverified currency / payment-method / country claims.
 */
import { HandHeart, Gift, Landmark, HandHelping, UsersRound, Earth, type LucideIcon } from 'lucide-react';
import type { ProductSlug } from './productPages.ts';

import ngoImg from '../assets/images/sections/solution-ngo.jpg';
import charityImg from '../assets/images/sections/campaign-winter.jpg';
import foundationImg from '../assets/images/sections/solution-trust.jpg';
import sponsorshipImg from '../assets/images/sections/solution-charities.jpg';
import membershipImg from '../assets/images/hero/membership.jpg';
import waterwellImg from '../assets/images/hero/waterwell.jpg';
import foodImg from '../assets/images/sections/campaign-food.jpg';
import cattleImg from '../assets/images/qurbani/eid-cattle-market.jpg';

export type SolutionSlug =
  | 'for-ngos'
  | 'for-charities'
  | 'for-foundations'
  | 'for-sponsorship-orgs'
  | 'for-membership-orgs'
  | 'for-international-orgs';

export const SOLUTION_ORDER: SolutionSlug[] = [
  'for-ngos',
  'for-charities',
  'for-foundations',
  'for-sponsorship-orgs',
  'for-membership-orgs',
  'for-international-orgs',
];

export const solutionRoute = (slug: SolutionSlug) => `/solutions/${slug}`;

export const SOLUTION_ICONS: Record<SolutionSlug, LucideIcon> = {
  'for-ngos': HandHeart,
  'for-charities': Gift,
  'for-foundations': Landmark,
  'for-sponsorship-orgs': HandHelping,
  'for-membership-orgs': UsersRound,
  'for-international-orgs': Earth,
};

export const isSolutionSlug = (s: string): s is SolutionSlug => (SOLUTION_ORDER as string[]).includes(s);

/** Photos used on each page (hero first). Every page has a different hero photo. */
export const SOLUTION_PHOTOS: Record<SolutionSlug, { src: string; pos?: string }[]> = {
  'for-ngos': [{ src: ngoImg, pos: '50% 45%' }],
  'for-charities': [{ src: charityImg, pos: '50% 40%' }],
  'for-foundations': [{ src: foundationImg, pos: '50% 35%' }],
  'for-sponsorship-orgs': [{ src: sponsorshipImg, pos: '50% 40%' }],
  'for-membership-orgs': [{ src: membershipImg, pos: '50% 60%' }],
  'for-international-orgs': [
    { src: waterwellImg, pos: '45% 50%' },
    { src: foodImg, pos: '50% 50%' },
    { src: cattleImg, pos: '50% 55%' },
  ],
};

/** A Donorfit product explained for one audience: what it does, how they could use it, why it helps. */
export interface SolutionDetail {
  slug: ProductSlug;
  what: string;
  use: string;
  purpose: string;
}

/** Translated text shared by every solution page (solutions:items.<slug>). */
export interface SolutionText {
  navLabel: string;
  navDescription: string;
  hero: { badge: string; title: string; lead: string; imageAlt: string } & Record<string, string>;
  challenges: { title: string; sub: string; items: { title: string; text: string }[] };
  helps: { title: string; sub: string; items: { title: string; text: string; points: string[] }[] };
  solutions: { title: string; sub: string; items: SolutionDetail[] };
  /** Platform features (absent on the International page). */
  tools?: { title: string; items: { title: string; text: string }[] };
  /** Illustrative scenarios; slug '' = no product chip. */
  useCases: { title: string; sub: string; items: { title: string; text: string; slug: ProductSlug | '' }[] };
  steps: { title: string; sub: string; items: { title: string; text: string }[] };
  faqs: { question: string; answer: string }[];
  cta: { title: string; body: string; button: string };
}

/**
 * Old solution URLs (before 2026-11-14) → new routes. Applied by the router,
 * so bookmarks and external links keep working.
 */
export const LEGACY_ROUTE_REDIRECTS: Record<string, string> = {
  '/solutions/ngos': '/solutions/for-ngos',
  '/solutions/charities': '/solutions/for-charities',
  '/solutions/foundations': '/solutions/for-foundations',
  '/solutions/sponsorship-organizations': '/solutions/for-sponsorship-orgs',
  '/solutions/membership-organizations': '/solutions/for-membership-orgs',
  '/solutions/international-organizations': '/solutions/for-international-orgs',
  // Old recurring giving page (2026-11-14): replaced by the Recurring Management page.
  '/recurring-giving': '/recurring-management',
};
