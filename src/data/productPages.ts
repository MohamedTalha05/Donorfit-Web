/**
 * Structure of the six Donorfit product landing pages.
 *
 * All visible text lives in the 'products' translation namespace
 * (src/locales/<lang>/products.json → pages.<slug>). This module only keeps
 * language-neutral data: slugs, routes and related products.
 *
 * Membership, Sponsorship and Money Pool features are taken from the
 * existing product copy in content.ts. Water Well, Qurbani and School
 * Management features follow the product brief supplied on 2026-11-11.
 * No statistics or testimonials: every number shown in a preview is
 * labelled as example data in the UI.
 */

export type ProductSlug = 'membership' | 'sponsorship' | 'water-well' | 'qurbani' | 'school-management' | 'money-pool';

export interface ProductMeta {
  slug: ProductSlug;
  /** Language-neutral route (the /de prefix is added by navigation helpers). */
  route: string;
  related: ProductSlug[];
}

/** Translated text of a product page (products:pages.<slug>). */
export interface ProductPageText {
  name: string;
  navDescription: string;
  seo: { title: string; description: string };
  headline: string;
  subheadline: string;
  intro: { title: string; body: string };
  problems: { problem: string; solution: string }[];
  features: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  audiences: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; body: string };
}

/** Structure + translated text, as consumed by the product page components. */
export type ProductPageContent = ProductMeta & ProductPageText;

export const PRODUCT_META: Record<ProductSlug, ProductMeta> = {
  membership: { slug: 'membership', route: '/membership', related: ['money-pool', 'sponsorship', 'school-management'] },
  sponsorship: { slug: 'sponsorship', route: '/sponsorship', related: ['school-management', 'membership', 'water-well'] },
  'water-well': { slug: 'water-well', route: '/water-well', related: ['money-pool', 'qurbani', 'sponsorship'] },
  qurbani: { slug: 'qurbani', route: '/qurbani', related: ['water-well', 'money-pool', 'membership'] },
  'school-management': { slug: 'school-management', route: '/school-management', related: ['sponsorship', 'membership', 'money-pool'] },
  'money-pool': { slug: 'money-pool', route: '/money-pool', related: ['water-well', 'qurbani', 'membership'] },
};

/**
 * Unlaunched products: hidden everywhere on the site (menus, footer, related cards,
 * pricing, home carousel) and their route shows the 404 page.
 * Their page code and copy are kept; remove the slug from this list to launch.
 */
export const HIDDEN_PRODUCTS: readonly ProductSlug[] = ['school-management'];
export const isHiddenProduct = (slug: string): boolean => (HIDDEN_PRODUCTS as readonly string[]).includes(slug);
export const isHiddenRoute = (route: string): boolean => HIDDEN_PRODUCTS.some((s) => PRODUCT_META[s].route === route);

export const PRODUCT_ORDER: ProductSlug[] = ['membership', 'sponsorship', 'water-well', 'qurbani', 'school-management', 'money-pool'];

/** Related products without hidden ones, topped up from PRODUCT_ORDER so the row stays full. */
export function visibleRelated(slug: ProductSlug, related: ProductSlug[]): ProductSlug[] {
  const out = related.filter((s) => !isHiddenProduct(s));
  for (const s of PRODUCT_ORDER) {
    if (out.length >= related.length) break;
    if (s !== slug && !isHiddenProduct(s) && !out.includes(s)) out.push(s);
  }
  return out;
}

/** Find a product by its language-neutral route ("/membership"). */
export const productByRoute = (route: string): ProductMeta | undefined => Object.values(PRODUCT_META).find((p) => p.route === route);
