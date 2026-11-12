/**
 * Structural (non-text) config for the audience solution pages.
 * All visible text lives in src/locales/<lang>/solutions.json under items.<slug>
 * (recommendedProducts names are zipped with this list by index).
 */
export interface SolutionConfig {
  slug: string;
  recommendedProducts: { id: string; url: string }[];
  image: 'field' | 'gala' | 'office';
}

export const SOLUTIONS: Record<string, SolutionConfig> = {
  ngos: {
    slug: 'ngos',
    recommendedProducts: [
      { id: 'sponsorship', url: '/sponsorship' },
      { id: 'donor-management', url: '/donor-management' },
      { id: 'reporting-and-insights', url: '/reporting-and-insights' },
    ],
    image: 'field',
  },
  charities: {
    slug: 'charities',
    recommendedProducts: [
      { id: 'donations', url: '/donations' },
      { id: 'recurring-giving', url: '/recurring-giving' },
      { id: 'campaign-management', url: '/campaign-management' },
    ],
    image: 'office',
  },
  foundations: {
    slug: 'foundations',
    recommendedProducts: [
      { id: 'reporting-and-insights', url: '/reporting-and-insights' },
      { id: 'donor-management', url: '/donor-management' },
      { id: 'money-pool', url: '/money-pool' },
    ],
    image: 'gala',
  },
  'sponsorship-organizations': {
    slug: 'sponsorship-organizations',
    recommendedProducts: [
      { id: 'sponsorship', url: '/sponsorship' },
      { id: 'orphan-sponsorship', url: '/orphan-sponsorship' },
      { id: 'recurring-giving', url: '/recurring-giving' },
    ],
    image: 'office',
  },
  'membership-organizations': {
    slug: 'membership-organizations',
    recommendedProducts: [
      { id: 'membership', url: '/membership' },
      { id: 'donor-management', url: '/donor-management' },
      { id: 'donations', url: '/donations' },
    ],
    image: 'gala',
  },
  'international-organizations': {
    slug: 'international-organizations',
    recommendedProducts: [
      { id: 'campaign-management', url: '/campaign-management' },
      { id: 'sponsorship', url: '/sponsorship' },
      { id: 'reporting-and-insights', url: '/reporting-and-insights' },
    ],
    image: 'field',
  },
};
