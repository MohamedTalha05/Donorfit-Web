/** Homepage section photography (sources in src/assets/images/sections/CREDITS.md). */
import donateOnline from '../../assets/images/sections/donate-online.jpg';
import recurring from '../../assets/images/sections/recurring.jpg';
import campaignFood from '../../assets/images/sections/campaign-food.jpg';
import campaignWinter from '../../assets/images/sections/campaign-winter.jpg';
import campaignClassroom from '../../assets/images/sections/campaign-classroom.jpg';
import payments from '../../assets/images/sections/payments.jpg';
import solutionNgo from '../../assets/images/sections/solution-ngo.jpg';
import solutionTrust from '../../assets/images/sections/solution-trust.jpg';
import solutionMasjid from '../../assets/images/sections/solution-masjid.jpg';
import solutionCharities from '../../assets/images/sections/solution-charities.jpg';
import ctaCommunity from '../../assets/images/sections/cta-community.jpg';

/** Alt texts are translated: see `home:photos.<key>` in src/locales/<lang>/home.json. */
export interface SectionPhoto {
  src: string;
  width: number;
  height: number;
  pos?: string;
}

export const SECTION_PHOTOS = {
  donateOnline: { src: donateOnline, width: 1400, height: 788, pos: '45% 40%' },
  recurring: { src: recurring, width: 1400, height: 934, pos: '55% 45%' },
  campaignFood: { src: campaignFood, width: 1400, height: 934, pos: '35% 40%' },
  campaignWinter: { src: campaignWinter, width: 1400, height: 788, pos: '50% 50%' },
  campaignClassroom: { src: campaignClassroom, width: 1400, height: 934, pos: '50% 40%' },
  payments: { src: payments, width: 1400, height: 700, pos: '55% 50%' },
  solutionNgo: { src: solutionNgo, width: 1400, height: 934, pos: '55% 45%' },
  solutionTrust: { src: solutionTrust, width: 1400, height: 934, pos: '50% 55%' },
  solutionMasjid: { src: solutionMasjid, width: 1400, height: 1050, pos: '50% 45%' },
  solutionCharities: { src: solutionCharities, width: 1400, height: 934, pos: '50% 55%' },
  ctaCommunity: { src: ctaCommunity, width: 1400, height: 934, pos: '50% 35%' },
} satisfies Record<string, SectionPhoto>;

export type SectionPhotoKey = keyof typeof SECTION_PHOTOS;
