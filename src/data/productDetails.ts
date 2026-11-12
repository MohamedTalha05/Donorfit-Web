import type { ProductItem } from '../types.ts';

/**
 * Structural (non-text) data for the template-based product pages rendered by ProductPage.
 * All visible text lives in src/locales/<lang>/productDetails.json under `items.<slug>`.
 */
export type ProductStructure = Pick<ProductItem, 'id' | 'slug' | 'relatedProductIds' | 'mockupType'>;

/** Translated text fields of a product (shape of `productDetails:items.<slug>`). */
export type ProductText = Pick<
  ProductItem,
  | 'title'
  | 'shortDescription'
  | 'h1'
  | 'subheadline'
  | 'heroKicker'
  | 'problemsAddressed'
  | 'howItWorks'
  | 'features'
  | 'benefits'
  | 'faqs'
>;

export const PRODUCT_DETAILS: Record<string, ProductStructure> = {
  'sponsorship': {
    id: 'sponsorship',
    slug: 'sponsorship',
    relatedProductIds: ['orphan-sponsorship', 'recurring-giving', 'donor-management'],
    mockupType: 'sponsorship',
  },
  'orphan-sponsorship': {
    id: 'orphan-sponsorship',
    slug: 'orphan-sponsorship',
    relatedProductIds: ['sponsorship', 'recurring-giving', 'donations'],
    mockupType: 'orphan',
  },
  'money-pool': {
    id: 'money-pool',
    slug: 'money-pool',
    relatedProductIds: ['campaign-management', 'donations', 'membership'],
    mockupType: 'moneypool',
  },
  'membership': {
    id: 'membership',
    slug: 'membership',
    relatedProductIds: ['donor-management', 'recurring-giving', 'reporting-and-insights'],
    mockupType: 'membership',
  },
  'donations': {
    id: 'donations',
    slug: 'donations',
    relatedProductIds: ['recurring-giving', 'campaign-management', 'donor-management'],
    mockupType: 'donations',
  },
  'recurring-giving': {
    id: 'recurring-giving',
    slug: 'recurring-giving',
    relatedProductIds: ['donations', 'sponsorship', 'donor-management'],
    mockupType: 'recurring',
  },
  'donor-management': {
    id: 'donor-management',
    slug: 'donor-management',
    relatedProductIds: ['reporting-and-insights', 'campaign-management', 'donations'],
    mockupType: 'donormanagement',
  },
  'campaign-management': {
    id: 'campaign-management',
    slug: 'campaign-management',
    relatedProductIds: ['money-pool', 'donations', 'reporting-and-insights'],
    mockupType: 'campaign',
  },
  'reporting-and-insights': {
    id: 'reporting-and-insights',
    slug: 'reporting-and-insights',
    relatedProductIds: ['donor-management', 'campaign-management', 'recurring-giving'],
    mockupType: 'reporting',
  },
};
