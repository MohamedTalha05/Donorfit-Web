# Donorfit translations (English / Deutsch)

Every namespace has the **same keys** in `en/` and `de/`. English is the source; German is a reviewed human-quality translation (no runtime machine translation).

## Using translations in components

```tsx
import { useT, useTx, useFormat, useI18n } from '../i18n/index.tsx'; // adjust relative path

const t = useT('home');            // strings:   t('hero.title'), t('greeting', { name: 'Sarah' })  → "{{name}}" placeholders
const tc = useT('common');         // shared buttons: tc('actions.bookDemo')
const tx = useTx('faqs');          // objects/arrays: tx<FAQ[]>('items')
const { eur, eurCents, int, date } = useFormat(); // locale-aware € / numbers / dates (de: "48.320 €", "11. November 2026")
const { lang } = useI18n();        // 'en' | 'de'
```

- Hooks only work inside components. Module-level constants with visible text must move into JSON (keep non-text config such as icons, routes, numbers, images in code and zip them with translated text by index or key).
- Non-hook helpers may use `fmt.eur()` etc. from `src/i18n/index.tsx`.
- Internal links: use `navigateTo(route)` / `HomeLink to={route}` with **language-neutral** routes (`/pricing`); the `/de` prefix is added automatically. For a raw `href`, use `localize(route)` from `useModal()`.
- Rich text: keep sentences whole in one key. For inline bold/links, split into `before` / `bold` / `after` keys rather than concatenating fragments of a sentence.
- Never put visible English directly in JSX (except brand/product names, code, units already inside a translated string).

## German style guide

- Formal address: **Sie / Ihr / Ihnen**, consistently.
- Natural, idiomatic German for the nonprofit sector — not literal translation. Keep meaning; restructure sentences where German needs it.
- Sentence case for headings (German nouns capitalised as normal). German quotation marks „…“.
- Numbers, currency and dates come from `useFormat()` — never hard-code "€1,000" style strings; put numbers in placeholders.
- Inclusive forms with the colon in compact UI and prose: Spender:innen, Unterstützer:innen, Pat:innen, Mitarbeiter:innen.
- German text is ~30 % longer: keep buttons short; prefer concise wording.

## Glossary (use consistently)

| English | Deutsch |
|---|---|
| Get Started / Get Started Free | Jetzt starten / Kostenlos starten |
| Book a Demo | Demo vereinbaren |
| Learn more | Mehr erfahren |
| Contact us | Kontaktieren Sie uns |
| Explore products | Produkte entdecken |
| donation / donate | Spende / spenden |
| donor(s) | Spender:in / Spender:innen |
| supporter(s) | Unterstützer:innen |
| online donations | Online-Spenden |
| donation form | Spendenformular |
| recurring donation / recurring giving | regelmäßige Spende / regelmäßiges Spenden |
| monthly donation | monatliche Spende |
| manage donations | Spenden verwalten |
| donor management / CRM | Spenderverwaltung / CRM |
| fundraising campaign | Fundraising-Kampagne |
| appeal | Spendenaufruf |
| fundraising target / goal | Spendenziel |
| raised | gesammelt |
| membership management | Mitgliederverwaltung |
| member / membership fee / dues | Mitglied / Mitgliedsbeitrag / Mitgliedsbeiträge |
| renewal | Verlängerung |
| sponsorship / sponsor | Patenschaft / Pat:in |
| beneficiary | Begünstigte:r |
| child sponsorship / orphan sponsorship | Kinderpatenschaft / Waisenpatenschaft |
| tax receipt | Zuwendungsbestätigung |
| SEPA Direct Debit / mandate | SEPA-Lastschrift / SEPA-Lastschriftmandat |
| payment method | Zahlungsart |
| charity / nonprofit | gemeinnützige Organisation |
| NGO | NGO |
| charitable trust / foundation | Stiftung |
| trustees / board | Vorstand bzw. Stiftungsrat |
| masjid | Moschee / Moscheegemeinde |
| Eid al-Adha | Opferfest (Eid al-Adha) |
| GDPR | DSGVO |
| dashboard | Dashboard |
| example data / sample data | Beispieldaten |

**Keep untranslated:** Donorfit, the six product names (Membership, Sponsorship, Water Well, Qurbani, School Management, Money Pool), Stripe, PayPal, SEPA, Apple Pay, Google Pay, iDEAL, Bancontact, DATEV, Salesforce, WordPress and other third-party names.
