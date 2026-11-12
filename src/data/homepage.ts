/**
 * Homepage content that must stay truthful.
 *
 * VERIFIED_ORGANISATIONS and SUCCESS_STORIES are intentionally empty.
 * Add an entry ONLY for a real customer that has given written permission
 * to be named (and, for stories, approved the exact wording and figures).
 * While a list is empty, the homepage renders an honest fallback instead.
 */

export interface VerifiedOrganisation {
  name: string;
  /** Optional logo in /public (e.g. '/logos/acme.svg'). Text wordmark is used otherwise. */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export interface SuccessStory {
  organisation: string;
  sector: string;
  summary: string;
  /** Only figures the organisation has confirmed. */
  outcomes?: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
}

export const VERIFIED_ORGANISATIONS: VerifiedOrganisation[] = [];

export const SUCCESS_STORIES: SuccessStory[] = [];
