/**
 * External destinations. Login, sign-up and demo booking always open in a new tab,
 * so the visitor keeps the Donorfit website open in the original tab.
 */
export const APP_LOGIN_URL = 'https://app.donorfit.com/signin';
export const APP_SIGNUP_URL = 'https://app.donorfit.com/signup';
/** Donor Portal sign-in for supporters (verified in the app on 2026-11-17: email + 6-digit code). */
export const DONOR_PORTAL_URL = 'https://app.donorfit.com/donorlogin';
/** Every "Book a Demo" button opens this Calendly page. */
export const DEMO_BOOKING_URL = 'https://calendly.com/donorfit/30min';

/** Spread onto an <a> that should open in a new tab: <a href={APP_SIGNUP_URL} {...NEW_TAB}>. */
export const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Open an external page in a new tab from a click handler (buttons). */
export function openInNewTab(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
