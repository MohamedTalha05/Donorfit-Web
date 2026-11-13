export type PageRoute = 
  | '/'
  | '/sponsorship'
  | '/orphan-sponsorship'
  | '/money-pool'
  | '/membership'
  | '/water-well'
  | '/qurbani'
  | '/school-management'
  | '/donations'
  | '/recurring-giving'
  | '/donor-management'
  | '/campaign-management'
  | '/reporting-and-insights'
  | '/solutions/ngos'
  | '/solutions/charities'
  | '/solutions/foundations'
  | '/solutions/sponsorship-organizations'
  | '/solutions/membership-organizations'
  | '/solutions/international-organizations'
  | '/about'
  | '/contact'
  | '/partners'
  | '/integrations'
  | `/integrations/${string}`
  | '/security'
  | '/blog'
  | `/blog/${string}`
  | '/guides'
  | '/case-studies'
  | '/faqs'
  | '/privacy-policy'
  | '/cookie-policy'
  | '/impressum'
  | '/refund-policy'
  | '/terms'
  | '/accessibility';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  h1: string;
  subheadline: string;
  heroKicker: string;
  problemsAddressed: { title: string; description: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  features: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedProductIds: string[];
  mockupType: 'sponsorship' | 'orphan' | 'moneypool' | 'membership' | 'donations' | 'recurring' | 'donormanagement' | 'campaign' | 'reporting';
}

export interface SolutionItem {
  id: string;
  slug: string;
  targetAudience: string;
  h1: string;
  subheadline: string;
  heroKicker: string;
  overview: string;
  keyChallenges: { title: string; description: string }[];
  tailoredFeatures: { title: string; description: string }[];
  measurableOutcomes: { metric: string; label: string; context: string }[];
  faqs: { question: string; answer: string }[];
  recommendedProducts: { id: string; name: string; url: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Fundraising' | 'NGO Technology' | 'Donor Management' | 'Sponsorship' | 'Membership' | 'Recurring Giving' | 'Donor Retention' | 'Charity Operations' | 'Digital Transformation';
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  imageAlt: string;
  content: string[];
  keyTakeaways: string[];
  relatedArticleSlugs: string[];
  relatedProducts: { title: string; slug: string }[];
}

export interface CaseStudy {
  id: string;
  organization: string;
  type: string;
  location: string;
  headline: string;
  summary: string;
  results: { metric: string; label: string }[];
  challenge: string;
  solution: string;
  outcome: string;
  quote?: { text: string; author: string; role: string };
}

export interface GuideItem {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  pageCount: string;
  keyTopics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Security & Compliance' | 'Payments & Banking' | 'Implementation' | 'Pricing';
}
