/**
 * Customer logos shown in the "Trusted by" logo carousel.
 *
 * Supplied by the Donorfit team as organisations that use Donorfit (November 2026).
 * Add an organisation ONLY when Donorfit is authorised to display its logo,
 * and remove it straight away if that permission is withdrawn.
 *
 * Files live in src/assets/customers/ (trimmed, transparent background).
 * `w`/`h` are the pixel size of the file and are used to size every logo to
 * the same visual weight while keeping its original proportions.
 */
import majeedia from '../assets/customers/majeedia-trust.png';
import haysen from '../assets/customers/haysen-europe.png';
import hilal from '../assets/customers/hilal-i-ummah.png';
import roadToJannah from '../assets/customers/road-to-jannah.png';
import wefa from '../assets/customers/wefa-swiss.png';
import umut from '../assets/customers/umut-ev.png';
import ditib from '../assets/customers/ditib-hessen.png';
import waisenkinder from '../assets/customers/waisenkinder-bangladesch.png';
import humanRelief from '../assets/customers/human-relief.png';
import ihed from '../assets/customers/ihed.png';
import tuisa from '../assets/customers/tuisa-hilft.png';
import hilfeOhneGrenzen from '../assets/customers/hilfe-ohne-grenzen.png';
import iha from '../assets/customers/iha.png';
import teebah from '../assets/customers/teebah-foundation.png';

export interface CustomerLogo {
  id: string;
  /** Organisation name, used as the image's alt text. */
  name: string;
  src: string;
  w: number;
  h: number;
}

export const CUSTOMER_LOGOS: CustomerLogo[] = [
  { id: 'majeedia-trust', name: 'Majeedia Trust', src: majeedia, w: 215, h: 61 },
  { id: 'wefa-swiss', name: 'WEFA Swiss – International Relief Organization', src: wefa, w: 247, h: 79 },
  { id: 'hilfe-ohne-grenzen', name: 'Hilfe ohne Grenzen', src: hilfeOhneGrenzen, w: 258, h: 76 },
  { id: 'human-relief', name: 'Human Relief', src: humanRelief, w: 243, h: 85 },
  { id: 'ditib-hessen', name: 'Islamische Religionsgemeinschaft DITIB Hessen e.V.', src: ditib, w: 160, h: 128 },
  { id: 'road-to-jannah', name: 'Road to Jannah', src: roadToJannah, w: 242, h: 78 },
  { id: 'iha', name: 'IHA – Internationale Hilfe für Arme', src: iha, w: 190, h: 81 },
  { id: 'hilal-i-ummah', name: 'Hilal-i Ummah Humanitarian Relief Organization', src: hilal, w: 255, h: 60 },
  { id: 'teebah-foundation', name: 'Teebah Foundation', src: teebah, w: 224, h: 71 },
  { id: 'umut-ev', name: 'UMUT e.V.', src: umut, w: 242, h: 78 },
  { id: 'haysen-europe', name: 'Haysen Europe', src: haysen, w: 245, h: 57 },
  { id: 'tuisa-hilft', name: 'Tuisa Hilft Stiftung', src: tuisa, w: 262, h: 71 },
  { id: 'ihed', name: 'IHED', src: ihed, w: 243, h: 106 },
  { id: 'waisenkinder-bangladesch', name: 'Hilfsorganisation für Waisenkinder in Bangladesch e.V., Hamm', src: waisenkinder, w: 223, h: 115 },
];
