import googleCloudLogo from '../assets/partners/google-cloud.svg';
import azureLogo from '../assets/partners/microsoft-azure.svg';
import awsLogo from '../assets/partners/aws.svg';
import stripeLogo from '../assets/integrations/stripe.svg';
import gocardlessLogo from '../assets/integrations/gocardless.svg';
import mollieLogo from '../assets/integrations/mollie.png';
import paypalLogo from '../assets/integrations/paypal.svg';
import micropaymentLogo from '../assets/integrations/micropayment.svg';
import payrexxLogo from '../assets/integrations/payrexx.svg';

/**
 * Partner logos shown across the site (Home, Partners, Payment Gateways, product pages).
 * Language-neutral facts only; headings and descriptions live in common.json under `partners`.
 * Logo sources: src/assets/partners/CREDITS.md and src/assets/integrations/CREDITS.md.
 *
 * `h` sets the rendered logo height so very different marks read at a similar optical size
 * (a square icon needs more height than a long wordmark). Logos are never recoloured or cropped.
 */
export type PartnerLogo = {
  id: string;
  name: string;
  logo: string;
  /** Official website, opened in a new tab. */
  url: string;
  /** Intrinsic size of the file (avoids layout shift). */
  w: number;
  h: number;
  /** Rendered height in rem. */
  displayH: number;
};

/** Cloud and technology providers whose services run the Donorfit platform (confirmed by the client: Google Cloud and Azure on 2026-11-17, AWS on 2026-11-19). */
export const CLOUD_PARTNERS: PartnerLogo[] = [
  { id: 'google-cloud', name: 'Google Cloud', logo: googleCloudLogo, url: 'https://cloud.google.com', w: 181, h: 28, displayH: 1.6 },
  { id: 'azure', name: 'Microsoft Azure', logo: azureLogo, url: 'https://azure.microsoft.com', w: 96, h: 96, displayH: 2.6 },
  { id: 'aws', name: 'Amazon Web Services', logo: awsLogo, url: 'https://aws.amazon.com', w: 304, h: 182, displayH: 2.5 },
];

/**
 * Payment gateway partners, in the order the client asked for (2026-11-19).
 * Note: in the Donorfit app build checked on 2026-11-17, Mollie and Payrexx are still marked "coming soon";
 * the client asked for them to be shown as partners.
 */
export const PAYMENT_PARTNERS: PartnerLogo[] = [
  { id: 'stripe', name: 'Stripe', logo: stripeLogo, url: 'https://stripe.com', w: 360, h: 150, displayH: 1.9 },
  { id: 'gocardless', name: 'GoCardless', logo: gocardlessLogo, url: 'https://gocardless.com', w: 1000, h: 149, displayH: 1.05 },
  { id: 'mollie', name: 'Mollie', logo: mollieLogo, url: 'https://www.mollie.com', w: 1600, h: 472, displayH: 1.45 },
  { id: 'paypal', name: 'PayPal', logo: paypalLogo, url: 'https://www.paypal.com', w: 1310, h: 440, displayH: 1.45 },
  { id: 'micropayment', name: 'Micropayment', logo: micropaymentLogo, url: 'https://www.micropayment.de', w: 802, h: 234, displayH: 2.2 },
  { id: 'payrexx', name: 'Payrexx', logo: payrexxLogo, url: 'https://www.payrexx.com', w: 103, h: 23, displayH: 1.2 },
];
