/**
 * Homepage content that must stay truthful.
 *
 * SUCCESS_STORIES is intentionally empty. Add an entry ONLY for a real customer
 * that has approved the exact wording and figures in writing.
 * While it is empty, the homepage renders an honest fallback instead.
 *
 * Customer logos: src/data/customers.ts. Testimonials: src/data/testimonials.ts.
 */

export interface SuccessStory {
  organisation: string;
  sector: string;
  summary: string;
  /** Only figures the organisation has confirmed. */
  outcomes?: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
}

export const SUCCESS_STORIES: SuccessStory[] = [];
