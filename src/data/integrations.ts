import stripeLogo from '../assets/integrations/stripe.svg';
import paypalLogo from '../assets/integrations/paypal.svg';
import gocardlessLogo from '../assets/integrations/gocardless.svg';
import micropaymentLogo from '../assets/integrations/micropayment.svg';
import mollieLogo from '../assets/integrations/mollie.png';
import brevoLogo from '../assets/integrations/brevo.png';
import mailchimpLogo from '../assets/integrations/mailchimp.svg';

export type IntegrationCategory = 'payments' | 'email';

/**
 * Providers Donorfit connects with. Copy lives in locales/{en,de}/integrations.json
 * under `pages.<id>`; this file holds the language-neutral facts only.
 * `logoH` evens out the optical size of very different wordmarks.
 */
export type Integration = {
  id: string;
  name: string;
  category: IntegrationCategory;
  logo: string;
  logoH: string;
  /** Provider's public website. */
  url: string;
  /** Provider's own documentation for setting up an account / API access. */
  docsUrl: string;
  /** Square mark rather than a wordmark (shown larger in the detail hero). */
  square?: boolean;
};

export const INTEGRATIONS: Integration[] = [
  { id: 'stripe', name: 'Stripe', category: 'payments', logo: stripeLogo, logoH: 'h-8', url: 'https://stripe.com', docsUrl: 'https://docs.stripe.com' },
  { id: 'paypal', name: 'PayPal', category: 'payments', logo: paypalLogo, logoH: 'h-6', url: 'https://www.paypal.com', docsUrl: 'https://developer.paypal.com/docs/' },
  { id: 'gocardless', name: 'GoCardless', category: 'payments', logo: gocardlessLogo, logoH: 'h-[1.1rem]', url: 'https://gocardless.com', docsUrl: 'https://developer.gocardless.com' },
  { id: 'micropayment', name: 'Micropayment', category: 'payments', logo: micropaymentLogo, logoH: 'h-8', url: 'https://www.micropayment.de', docsUrl: 'https://www.micropayment.de' },
  { id: 'mollie', name: 'Mollie', category: 'payments', logo: mollieLogo, logoH: 'h-6', url: 'https://www.mollie.com', docsUrl: 'https://docs.mollie.com' },
  { id: 'brevo', name: 'Brevo', category: 'email', logo: brevoLogo, logoH: 'h-7', url: 'https://www.brevo.com', docsUrl: 'https://developers.brevo.com' },
  { id: 'mailchimp', name: 'Mailchimp', category: 'email', logo: mailchimpLogo, logoH: 'h-10', square: true, url: 'https://mailchimp.com', docsUrl: 'https://mailchimp.com/developer/' },
];

export const PAYMENT_INTEGRATIONS = INTEGRATIONS.filter((i) => i.category === 'payments');
export const EMAIL_INTEGRATIONS = INTEGRATIONS.filter((i) => i.category === 'email');

export const integrationPath = (id: string) => `/integrations/${id}`;

export function getIntegration(id: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.id === id);
}

/** Short display host for a URL, e.g. "stripe.com". */
export const hostOf = (url: string) => new URL(url).host.replace(/^www\./, '');
