/**
 * In-content photographs (not hero images). Alt text: src/locales/<lang>/photos.json.
 * Sources and licences: src/assets/images/content/CREDITS.md.
 * New files are 1400px wide WebP; `pos` is the CSS object-position used for the 4:3 crop.
 */
import membershipCommunity from '../assets/images/content/membership-community.webp';
import membershipMeeting from '../assets/images/content/membership-meeting.webp';
import sponsorshipTutoring from '../assets/images/content/sponsorship-tutoring.webp';
import sponsorshipHomework from '../assets/images/content/sponsorship-homework.webp';
import waterwellPump from '../assets/images/content/waterwell-hand-pump.webp';
import donationsHandover from '../assets/images/content/donations-handover.webp';
import donorPhoneCall from '../assets/images/content/donor-phone-call.webp';
import reportingCharts from '../assets/images/content/reporting-charts.webp';
import paymentsOnline from '../assets/images/content/payments-online.webp';
import recurring from '../assets/images/sections/recurring.jpg';

export interface ContentPhotoData {
  src: string;
  w: number;
  h: number;
  pos?: string;
}

export const CONTENT_PHOTOS = {
  membershipCommunity: { src: membershipCommunity, w: 1400, h: 933, pos: '50% 50%' },
  membershipMeeting: { src: membershipMeeting, w: 1400, h: 933, pos: '50% 45%' },
  sponsorshipTutoring: { src: sponsorshipTutoring, w: 1400, h: 935, pos: '50% 40%' },
  sponsorshipHomework: { src: sponsorshipHomework, w: 1400, h: 933, pos: '50% 50%' },
  waterwellPump: { src: waterwellPump, w: 1400, h: 1751, pos: '50% 55%' },
  donationsHandover: { src: donationsHandover, w: 1400, h: 933, pos: '50% 45%' },
  donorPhoneCall: { src: donorPhoneCall, w: 1400, h: 1120, pos: '50% 40%' },
  reportingCharts: { src: reportingCharts, w: 1400, h: 934, pos: '50% 50%' },
  paymentsOnline: { src: paymentsOnline, w: 1400, h: 933, pos: '50% 40%' },
  // Existing homepage photo (Pexels), reused on the Recurring Management page.
  recurring: { src: recurring, w: 1400, h: 934, pos: '50% 50%' },
} satisfies Record<string, ContentPhotoData>;

export type ContentPhotoKey = keyof typeof CONTENT_PHOTOS;
