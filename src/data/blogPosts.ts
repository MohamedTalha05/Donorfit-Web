/**
 * ============================================================================
 * DONORFIT BLOG — the single source for every blog article (no database, no CMS)
 * ============================================================================
 *
 * HOW TO PUBLISH A NEW ARTICLE
 * 1. Put the featured image in src/assets/images/ (any sub-folder), e.g.
 *    src/assets/images/blog/my-photo.jpg  (JPG/PNG/WebP, about 1400px wide).
 * 2. Copy one entry below, give it a new `slug` (lowercase-words-with-hyphens;
 *    it becomes the URL /blog/<slug> and /de/blog/<slug>) and fill in the fields.
 * 3. Set `featuredImage` to the path inside src/assets/images, e.g. 'blog/my-photo.jpg'.
 * 4. Write the article in `en` and/or `de`. A language you leave out simply does
 *    not show that article (in the list, search or sitemap) for that language.
 * 5. Run `npm run build`. The article page, its SEO tags and Article structured
 *    data are generated automatically.
 *
 * To edit an article, change its text here. To remove one, delete its entry.
 *
 * WRITING THE BODY (`body`, a small Markdown subset)
 *   First paragraph          → shown as the article introduction
 *   ## Heading               → section heading (H2, also listed in the contents)
 *   ### Sub-heading          → H3
 *   - item                   → bullet list (one item per line)
 *   1. item                  → numbered list
 *   > text                   → highlighted note
 *   ![Alt text](sections/campaign-food.jpg)   → image from src/assets/images, on its own line
 *   **bold**, [link text](/pricing) or [link](https://example.org) inside paragraphs
 * Separate blocks with an empty line.
 *
 * Content rules: describe only features that exist in the Donorfit app, no invented
 * statistics, no guaranteed results. Donorfit is free to use; transaction charges
 * are set by the payment provider. School Management is "Coming Soon".
 */

export type BlogCategory =
  | 'fundraising'
  | 'nonprofitManagement'
  | 'digitalDonations'
  | 'charityImpact'
  | 'sponsorship'
  | 'membershipManagement'
  | 'donorfitUpdates';

/** Display order of the category filter (labels: src/locales/<lang>/blog.json → categories). */
export const BLOG_CATEGORIES: BlogCategory[] = [
  'fundraising',
  'nonprofitManagement',
  'digitalDonations',
  'charityImpact',
  'sponsorship',
  'membershipManagement',
  'donorfitUpdates',
];

export interface BlogPostText {
  title: string;
  /** One or two sentences for cards, search results and the meta description fallback. */
  excerpt: string;
  /** Alt text for the featured image. */
  imageAlt: string;
  /** Optional: <title> for search engines (defaults to "<title> | Donorfit Blog"). */
  seoTitle?: string;
  /** Optional: meta description (defaults to the excerpt). */
  metaDescription?: string;
  /** Article text in the Markdown subset described above. */
  body: string;
}

export interface BlogPostEntry {
  /** URL part: /blog/<slug>. Also used as the id. */
  slug: string;
  category: BlogCategory;
  /** YYYY-MM-DD */
  publishedDate: string;
  /** Optional YYYY-MM-DD for meaningful updates. */
  updatedDate?: string;
  /** Path inside src/assets/images, e.g. 'sections/campaign-winter.jpg'. */
  featuredImage: string;
  /** Shown as the large featured article on the blog page (the newest flagged post wins). */
  featured?: boolean;
  /** Optional slugs of related articles; otherwise same-category and recent posts are used. */
  related?: string[];
  author?: string;
  en?: BlogPostText;
  de?: BlogPostText;
}

export const BLOG_POSTS: BlogPostEntry[] = [
  {
    slug: 'plan-a-fundraising-campaign-supporters-can-follow',
    category: 'fundraising',
    publishedDate: '2026-11-12',
    featuredImage: 'sections/campaign-winter.jpg',
    featured: true,
    related: ['writing-project-updates-donors-read', 'preparing-your-qurbani-campaign'],
    en: {
      title: 'How to plan a fundraising campaign your supporters can follow',
      excerpt:
        'A clear goal, an honest budget and regular updates help supporters understand what they are giving to. Here is a simple way to plan your next campaign.',
      imageAlt: 'Volunteers collecting donated goods for people in need',
      seoTitle: 'How to Plan a Fundraising Campaign Supporters Can Follow | Donorfit Blog',
      metaDescription:
        'A practical guide for nonprofits: set a clear goal, break down the budget, choose a deadline and keep supporters updated throughout your fundraising campaign.',
      body: `Most supporters are happy to help when they understand what their money will do. A campaign that answers three questions, what is needed, how much it costs and how far you have come, is easier to support and easier to share. This guide walks through the planning steps that make a campaign easy to follow.

## Start with one clear goal

Choose a single, concrete outcome for the campaign. "Winter kits for families in our district" is easier to picture than "support our winter work". If you have several needs, consider running separate campaigns instead of combining them.

A good campaign goal is:

- **Specific**: people can picture what will be bought or built.
- **Measurable**: you can put an amount on it.
- **Achievable**: realistic for your supporter base and timeframe.

## Break down the budget

A total amount on its own can feel abstract. Showing how the target is made up helps supporters see where their contribution fits. For a winter appeal, that might be the cost of one kit, the number of families and the cost of delivery.

Keep the breakdown honest and simple. If some costs are estimates, say so.

## Set a deadline

A deadline gives the campaign a natural rhythm: a launch, a middle phase and a final push. It also tells supporters when they can expect to hear about the result. Choose a date that fits the need. A seasonal appeal should close before the season starts.

![Volunteers sorting donated clothes and smiling together](hero/moneypool.jpg)

## Decide how people will give

Think about where your supporters will come across the campaign: on your website, at an event, in a newsletter or in a WhatsApp group. Each channel needs an easy way to give, such as an embedded donation form, a short link or a QR code on a poster.

If a group of volunteers or a committee wants to fundraise together for the campaign, a shared crowdfunding page like [Donorfit MoneyPool](/money-pool) lets everyone follow one goal while contributions go directly to your organisation.

## Plan your updates before you launch

Updates are part of the campaign, not an afterthought. Before launch, note down the moments you will report on:

1. Launch: why the campaign matters.
2. Halfway: progress so far and what is still needed.
3. Goal reached or deadline passed: the result and a thank-you.
4. Delivery: what the money achieved, ideally with photos.

> Supporters who see what happened after they gave are more likely to understand your work. Make the final update as carefully as the launch.

## After the campaign

Close the campaign when it ends, thank everyone who contributed and share the final result. Then look back: which channels brought in contributions, which updates people responded to and what you would change next time. These notes make your next campaign easier to plan.`,
    },
    de: {
      title: 'So planen Sie eine Spendenkampagne, die Unterstützer:innen nachvollziehen können',
      excerpt:
        'Ein klares Ziel, ein ehrliches Budget und regelmäßige Updates helfen Unterstützer:innen zu verstehen, wofür sie spenden. So planen Sie Ihre nächste Kampagne auf einfache Weise.',
      imageAlt: 'Ehrenamtliche sammeln Sachspenden für Menschen in Not',
      seoTitle: 'Spendenkampagnen nachvollziehbar planen | Donorfit Blog',
      metaDescription:
        'Leitfaden für gemeinnützige Organisationen: klares Ziel setzen, Budget aufschlüsseln, Frist wählen und Unterstützer:innen während der Kampagne informieren.',
      body: `Die meisten Unterstützer:innen helfen gern, wenn sie verstehen, was ihr Geld bewirkt. Eine Kampagne, die drei Fragen beantwortet – was gebraucht wird, was es kostet und wie weit Sie schon gekommen sind –, lässt sich leichter unterstützen und leichter teilen. Dieser Leitfaden führt durch die Planungsschritte, die eine Kampagne gut nachvollziehbar machen.

## Mit einem klaren Ziel beginnen

Wählen Sie für die Kampagne ein einziges, konkretes Ergebnis. "Winterpakete für Familien in unserem Bezirk" kann man sich leichter vorstellen als "Unterstützen Sie unsere Winterarbeit". Wenn Sie mehrere Bedarfe haben, sollten Sie eher getrennte Kampagnen durchführen, statt sie zu bündeln.

Ein gutes Kampagnenziel ist:

- **Konkret**: Man kann sich vorstellen, was gekauft oder gebaut wird.
- **Messbar**: Sie können einen Betrag dafür nennen.
- **Erreichbar**: realistisch für Ihren Unterstützerkreis und Zeitrahmen.

## Das Budget aufschlüsseln

Ein Gesamtbetrag allein wirkt oft abstrakt. Wenn Sie zeigen, wie sich das Spendenziel zusammensetzt, sehen Unterstützer:innen, wo ihr Beitrag hineinpasst. Bei einem Winter-Spendenaufruf können das die Kosten für ein Paket, die Zahl der Familien und die Kosten für die Auslieferung sein.

Halten Sie die Aufschlüsselung ehrlich und einfach. Wenn manche Kosten geschätzt sind, sagen Sie das.

## Eine Frist festlegen

Eine Frist gibt der Kampagne einen natürlichen Rhythmus: einen Start, eine mittlere Phase und einen Schlussspurt. Sie zeigt Unterstützer:innen außerdem, wann sie mit einer Nachricht über das Ergebnis rechnen können. Wählen Sie ein Datum, das zum Bedarf passt. Ein saisonaler Spendenaufruf sollte enden, bevor die Saison beginnt.

![Ehrenamtliche sortieren gespendete Kleidung und lächeln gemeinsam](hero/moneypool.jpg)

## Festlegen, wie Menschen spenden

Überlegen Sie, wo Ihre Unterstützer:innen auf die Kampagne stoßen: auf Ihrer Website, bei einer Veranstaltung, in einem Newsletter oder in einer WhatsApp-Gruppe. Jeder Kanal braucht einen einfachen Weg zum Spenden, etwa ein eingebettetes Spendenformular, einen Kurzlink oder einen QR-Code auf einem Plakat.

Wenn eine Gruppe von Ehrenamtlichen oder ein Komitee gemeinsam für die Kampagne sammeln möchte, können mit einer gemeinsamen Crowdfunding-Seite wie [Donorfit MoneyPool](/money-pool) alle demselben Ziel folgen, während die Beiträge direkt an Ihre Organisation gehen.

## Updates vor dem Start planen

Updates sind Teil der Kampagne, kein nachträglicher Gedanke. Notieren Sie vor dem Start die Momente, über die Sie berichten werden:

1. Start: warum die Kampagne wichtig ist.
2. Halbzeit: bisheriger Fortschritt und was noch gebraucht wird.
3. Ziel erreicht oder Frist abgelaufen: das Ergebnis und ein Dankeschön.
4. Umsetzung: was mit dem Geld erreicht wurde, idealerweise mit Fotos.

> Unterstützer:innen, die sehen, was nach ihrer Spende geschehen ist, verstehen Ihre Arbeit eher. Gestalten Sie das letzte Update so sorgfältig wie den Start.

## Nach der Kampagne

Schließen Sie die Kampagne, wenn sie endet, danken Sie allen, die beigetragen haben, und teilen Sie das Endergebnis. Blicken Sie dann zurück: Welche Kanäle haben Beiträge gebracht, auf welche Updates haben Menschen reagiert und was würden Sie beim nächsten Mal ändern? Diese Notizen erleichtern die Planung Ihrer nächsten Kampagne.`,
    },
  },
  {
    slug: 'bring-donor-member-and-sponsor-records-together',
    category: 'nonprofitManagement',
    publishedDate: '2026-11-10',
    featuredImage: 'sections/solution-trust.jpg',
    related: ['renewal-season-without-the-paperwork', 'protecting-beneficiaries-in-sponsorship-programmes'],
    en: {
      title: 'Bringing donor, member and sponsor records into one place',
      excerpt:
        'When supporter information sits in several spreadsheets, the same person can appear three times with different details. Here is how to tidy it up step by step.',
      imageAlt: 'A social worker in conversation with a couple at a table',
      seoTitle: 'Bringing Donor, Member and Sponsor Records Together | Donorfit Blog',
      metaDescription:
        'How nonprofits can bring donor, member and sponsor information from separate spreadsheets into one organised set of records, step by step.',
      body: `Many nonprofits grow one spreadsheet at a time: one for donors, one for members, one for sponsors and another for an event. Over time, the same person ends up in several files with different addresses, and nobody is sure which version is correct. Bringing these records together takes some effort, but it makes daily work much easier.

## Why scattered records cause problems

- A supporter who is also a member may receive two different letters, or none at all.
- Updating an address in one file does not update it in the others.
- It is hard to see the full relationship someone has with your organisation.
- Knowledge sits with individual staff members and is lost when they leave.

## Step 1: List what you have

Write down every place supporter information is kept: spreadsheets, email lists, paper forms and old software exports. Note who looks after each one and what it is used for. This list is often longer than expected.

## Step 2: Agree on the fields you need

Decide which information you actually need for each person, such as name, contact details, consent preferences, giving history, membership status or sponsorship. Leave out fields nobody uses. Fewer fields are easier to keep up to date.

## Step 3: Clean before you combine

Before merging, tidy each source:

1. Remove obvious duplicates.
2. Use one format for names, dates and phone numbers.
3. Mark records that are clearly out of date.
4. Check that you have a lawful basis and recorded consent where needed.

## Step 4: Bring the data into one system

Once the data is clean, import it into one system that your team shares. In Donorfit, you can import existing records and keep donors, members and sponsors on one platform, each with their giving history. Membership and Sponsorship add the details those relationships need, such as plans and renewal dates or the beneficiary a sponsor supports.

## Step 5: Keep it clean

One system only helps if everyone uses it. Agree on a few simple rules:

- New supporters are added in one place only.
- Changes are made in the shared system, not in private copies.
- Members and donors can update their own details where possible, for example through a self-service portal.

> Treat data protection as part of the project, not a separate task. If you are unsure what you may store and for how long, ask your data protection adviser.

## Where to start

You do not have to move everything at once. Many organisations begin with the group that causes the most work, often members or sponsors, and add the others afterwards.`,
    },
    de: {
      title: 'Spender-, Mitglieder- und Patenschaftsdaten an einem Ort zusammenführen',
      excerpt:
        'Wenn Unterstützerdaten in mehreren Tabellen liegen, kann dieselbe Person dreimal mit unterschiedlichen Angaben auftauchen. So bringen Sie Schritt für Schritt Ordnung hinein.',
      imageAlt: 'Eine Fachkraft der Sozialarbeit im Gespräch mit einem Paar an einem Tisch',
      seoTitle: 'Spender-, Mitglieder- und Patendaten bündeln | Donorfit Blog',
      metaDescription:
        'So führen gemeinnützige Organisationen Daten von Spender:innen, Mitgliedern und Pat:innen aus getrennten Tabellen Schritt für Schritt geordnet zusammen.',
      body: `Viele gemeinnützige Organisationen wachsen Tabelle für Tabelle: eine für Spender:innen, eine für Mitglieder, eine für Pat:innen und noch eine für eine Veranstaltung. Mit der Zeit steht dieselbe Person in mehreren Dateien mit unterschiedlichen Adressen, und niemand weiß genau, welche Version stimmt. Diese Daten zusammenzuführen kostet etwas Aufwand, erleichtert die tägliche Arbeit aber erheblich.

## Warum verstreute Daten Probleme verursachen

- Wer spendet und zugleich Mitglied ist, erhält womöglich zwei verschiedene Briefe – oder gar keinen.
- Wird eine Adresse in einer Datei geändert, bleibt sie in den anderen unverändert.
- Es ist schwer zu erkennen, welche Beziehung jemand insgesamt zu Ihrer Organisation hat.
- Wissen liegt bei einzelnen Mitarbeiter:innen und geht verloren, wenn sie die Organisation verlassen.

## Schritt 1: Bestandsaufnahme machen

Notieren Sie jeden Ort, an dem Unterstützerdaten gespeichert sind: Tabellen, E-Mail-Verteiler, Papierformulare und Exporte aus alter Software. Halten Sie fest, wer sich um welche Quelle kümmert und wofür sie genutzt wird. Diese Liste ist oft länger als erwartet.

## Schritt 2: Die benötigten Felder festlegen

Entscheiden Sie, welche Angaben Sie zu jeder Person tatsächlich brauchen, etwa Name, Kontaktdaten, Einwilligungen, Spendenhistorie, Mitgliedsstatus oder Patenschaft. Lassen Sie Felder weg, die niemand nutzt. Weniger Felder lassen sich leichter aktuell halten.

## Schritt 3: Erst bereinigen, dann zusammenführen

Bereinigen Sie vor dem Zusammenführen jede Quelle:

1. Entfernen Sie offensichtliche Dubletten.
2. Verwenden Sie ein einheitliches Format für Namen, Datumsangaben und Telefonnummern.
3. Markieren Sie Datensätze, die eindeutig veraltet sind.
4. Prüfen Sie, ob eine Rechtsgrundlage besteht und, wo nötig, eine dokumentierte Einwilligung vorliegt.

## Schritt 4: Die Daten in ein System übertragen

Sind die Daten bereinigt, importieren Sie sie in ein System, das Ihr Team gemeinsam nutzt. In Donorfit können Sie bestehende Datensätze importieren und Spender:innen, Mitglieder und Pat:innen auf einer Plattform führen, jeweils mit ihrer Spendenhistorie. Membership und Sponsorship ergänzen die Angaben, die diese Beziehungen brauchen, etwa Tarife und Verlängerungsdaten oder die begünstigte Person, die von Pat:innen unterstützt wird.

## Schritt 5: Ordnung halten

Ein gemeinsames System hilft nur, wenn alle es nutzen. Vereinbaren Sie ein paar einfache Regeln:

- Neue Unterstützer:innen werden nur an einer Stelle angelegt.
- Änderungen erfolgen im gemeinsamen System, nicht in privaten Kopien.
- Mitglieder und Spender:innen können ihre Daten nach Möglichkeit selbst aktualisieren, zum Beispiel über ein Self-Service-Portal.

> Behandeln Sie Datenschutz als Teil des Projekts, nicht als separate Aufgabe. Wenn Sie unsicher sind, was Sie wie lange speichern dürfen, fragen Sie Ihre Datenschutzberatung.

## Womit Sie beginnen

Sie müssen nicht alles auf einmal umstellen. Viele Organisationen beginnen mit der Gruppe, die den meisten Aufwand verursacht – oft Mitglieder oder Pat:innen – und ergänzen die anderen danach.`,
    },
  },
  {
    slug: 'donation-form-on-your-website-checklist',
    category: 'digitalDonations',
    publishedDate: '2026-11-06',
    featuredImage: 'sections/donate-online.jpg',
    related: ['how-donorfit-pricing-works', 'plan-a-fundraising-campaign-supporters-can-follow'],
    en: {
      title: 'Adding a donation form to your website: a practical checklist',
      excerpt:
        'From suggested amounts to payment providers and receipts, these are the points to check before you put a donation form live on your website.',
      imageAlt: 'A woman holding a phone and a bank card while donating online',
      seoTitle: 'Donation Form on Your Website: A Practical Checklist | Donorfit Blog',
      metaDescription:
        'A practical checklist for nonprofits adding an online donation form to their website: amounts, wording, payment providers, receipts, QR codes and testing.',
      body: `A donation form is often the first direct contact a supporter has with your organisation online. It should be quick to understand, easy to complete on a phone and clear about what happens next. Use this checklist before you publish yours.

## Content and wording

- **Say what the gift is for.** A short sentence above the form is enough: "Your donation supports our winter appeal."
- **Offer a few suggested amounts.** Three amounts and an "other amount" field are usually easier than a long list.
- **Keep required fields to a minimum.** Ask only for what you need to process the gift and send a receipt.
- **Explain recurring giving clearly** if you offer it: how often, and how supporters can change it.

## Choosing a payment provider

Payments on your form are processed by a payment provider. Donorfit integrates with Stripe, PayPal, GoCardless, Mollie and Micropayment. Each provider offers different payment methods and has its own transaction fees, which you agree with the provider directly.

Questions to ask when choosing:

1. Which payment methods do our supporters prefer?
2. Do we need direct debit for regular gifts?
3. Which fees apply, and can donors choose to cover them?
4. What does the provider need from us to open an account?

You can read more about each option on the [integrations page](/integrations).

## Receipts and thank-you messages

Decide what a donor receives after giving: a confirmation, a thank-you message and, where relevant, a donation receipt. Donorfit can generate receipts automatically from predefined templates. Check with your tax adviser which details your receipts must include.

## Placing the form

Embed the form where people are most likely to look for it: on a dedicated donation page, on campaign pages and in the main navigation. For offline moments such as events, posters and collection boxes, a QR code that opens the donation page connects the physical and digital worlds.

## Test before launch

Before you share the form widely:

- Make a real test donation on a phone and on a computer.
- Check that the confirmation and receipt arrive and look right.
- Ask someone outside your team to give and tell you where they hesitated.
- Make sure the form loads quickly and is readable without zooming.

> Small details matter. A confusing label or an unexpected extra step can be enough for someone to stop. Testing with real people is the quickest way to find them.

## After launch

Look at your form regularly. If supporters often contact you with the same question, answer it on the form itself.`,
    },
    de: {
      title: 'Ein Spendenformular auf Ihrer Website einbinden: eine praktische Checkliste',
      excerpt:
        'Von vorgeschlagenen Beträgen über Zahlungsanbieter bis zu Spendenbelegen: Diese Punkte sollten Sie prüfen, bevor Ihr Spendenformular auf der Website live geht.',
      imageAlt: 'Eine Frau mit Smartphone und Bankkarte spendet online',
      seoTitle: 'Spendenformular auf der Website: eine Checkliste | Donorfit Blog',
      metaDescription:
        'Praktische Checkliste für gemeinnützige Organisationen, die ein Online-Spendenformular einbinden: Beträge, Texte, Zahlungsanbieter, Belege, QR-Codes und Tests.',
      body: `Ein Spendenformular ist oft der erste direkte Online-Kontakt zwischen Unterstützer:innen und Ihrer Organisation. Es sollte schnell verständlich, auf dem Smartphone leicht auszufüllen und klar darin sein, was als Nächstes passiert. Gehen Sie diese Checkliste durch, bevor Sie Ihr Formular veröffentlichen.

## Inhalt und Formulierungen

- **Sagen Sie, wofür die Spende ist.** Ein kurzer Satz über dem Formular genügt: "Ihre Spende unterstützt unseren Winter-Spendenaufruf."
- **Bieten Sie einige vorgeschlagene Beträge an.** Drei Beträge und ein Feld "Anderer Betrag" sind meist einfacher als eine lange Liste.
- **Beschränken Sie Pflichtfelder auf ein Minimum.** Fragen Sie nur ab, was Sie zur Abwicklung der Spende und für den Spendenbeleg brauchen.
- **Erklären Sie regelmäßiges Spenden verständlich**, wenn Sie es anbieten: wie oft und wie Unterstützer:innen es ändern können.

## Einen Zahlungsanbieter wählen

Zahlungen über Ihr Formular werden von einem Zahlungsanbieter abgewickelt. Donorfit ist mit Stripe, PayPal, GoCardless, Mollie und Micropayment integriert. Jeder Anbieter bietet andere Zahlungsarten und hat eigene Transaktionsgebühren, die Sie direkt mit dem Anbieter vereinbaren.

Fragen für die Auswahl:

1. Welche Zahlungsarten bevorzugen unsere Unterstützer:innen?
2. Brauchen wir Lastschrift für regelmäßige Spenden?
3. Welche Gebühren fallen an, und können Spender:innen sie übernehmen?
4. Was benötigt der Anbieter von uns, um ein Konto zu eröffnen?

Mehr zu jeder Option lesen Sie auf der [Integrationsseite](/integrations).

## Belege und Dankesnachrichten

Legen Sie fest, was Spender:innen nach ihrer Spende erhalten: eine Bestätigung, eine Dankesnachricht und, wo zutreffend, eine Zuwendungsbestätigung. Donorfit kann Belege automatisch aus vordefinierten Vorlagen erstellen. Klären Sie mit Ihrer Steuerberatung, welche Angaben Ihre Belege enthalten müssen.

## Das Formular platzieren

Binden Sie das Formular dort ein, wo Menschen am ehesten danach suchen: auf einer eigenen Spendenseite, auf Kampagnenseiten und in der Hauptnavigation. Für Offline-Momente wie Veranstaltungen, Plakate und Sammeldosen verbindet ein QR-Code, der die Spendenseite öffnet, die analoge mit der digitalen Welt.

## Vor dem Start testen

Bevor Sie das Formular breit teilen:

- Machen Sie eine echte Testspende auf dem Smartphone und am Computer.
- Prüfen Sie, ob Bestätigung und Beleg ankommen und richtig aussehen.
- Bitten Sie eine Person außerhalb Ihres Teams, zu spenden und Ihnen zu sagen, wo sie gezögert hat.
- Stellen Sie sicher, dass das Formular schnell lädt und ohne Zoomen lesbar ist.

> Kleine Details zählen. Eine missverständliche Beschriftung oder ein unerwarteter zusätzlicher Schritt kann schon genügen, damit jemand abbricht. Tests mit echten Menschen sind der schnellste Weg, solche Stellen zu finden.

## Nach dem Start

Sehen Sie sich Ihr Formular regelmäßig an. Wenn Unterstützer:innen sich oft mit derselben Frage melden, beantworten Sie sie direkt im Formular.`,
    },
  },
  {
    slug: 'writing-project-updates-donors-read',
    category: 'charityImpact',
    publishedDate: '2026-11-03',
    featuredImage: 'hero/waterwell.jpg',
    related: ['plan-a-fundraising-campaign-supporters-can-follow', 'protecting-beneficiaries-in-sponsorship-programmes'],
    en: {
      title: 'Telling donors what happened: writing project updates people read',
      excerpt:
        'A good project update is short, specific and honest, including about delays. Here is a simple structure for updates that show supporters the difference they made.',
      imageAlt: 'Children drinking clean water from a tap',
      seoTitle: 'Writing Project Updates Donors Actually Read | Donorfit Blog',
      metaDescription:
        'How charities can write short, specific and honest project updates that show supporters what their donations achieved, with a simple structure to follow.',
      body: `Supporters give to make something happen. When they hear what happened next, their gift becomes part of a story they can follow. Project updates do not need to be long or polished. They need to be specific, regular and honest.

## What makes an update useful

- **It is specific.** "The pump was installed on Tuesday and tested by the village committee" says more than "great progress this month".
- **It shows, not just tells.** A photo of the site, taken with permission, often explains more than a paragraph.
- **It connects to the gift.** Remind readers what they supported and where the project is now.
- **It is honest.** If something is delayed or costs more than planned, say so and explain what you are doing about it.

## A simple structure

Use the same structure every time. It makes updates faster to write and easier to read:

1. **Where we are**: one sentence on the current stage.
2. **What happened**: two or three sentences on the latest progress.
3. **What comes next**: the next step and roughly when.
4. **Thank you**: a short, sincere thank-you.

## Use the stages of the project

Many projects move through natural stages. A water well, for example, goes from survey to drilling, installation and handover. Each stage is a good moment for an update. In Donorfit [Water Well](/water-well), every well has its own campaign page where you can post updates as it moves through these stages.

![Volunteers packing food parcels at a community event](sections/campaign-food.jpg)

## Photos and dignity

Photos make updates real, but they involve real people. Before sharing:

- Ask for consent, and be especially careful with children.
- Show people with dignity, not only as recipients of help.
- Avoid details that could identify where vulnerable people live.

> When in doubt, a photo of the project itself, such as the finished well or the stocked shelves, can tell the story without identifying anyone.

## How often to update

Match the rhythm to the project. A short emergency appeal might need weekly updates, while a long-term project may only need one at each stage. What matters most is that supporters are not left wondering. A brief "no major news, here is what we are waiting for" is better than silence.

## Close the loop

The final update is the most important one. Share the result, thank supporters and, if possible, explain the difference it makes for the people involved. It is also a natural moment to tell supporters about your next project.`,
    },
    de: {
      title: 'Spender:innen zeigen, was passiert ist: Projekt-Updates, die gelesen werden',
      excerpt:
        'Ein gutes Projekt-Update ist kurz, konkret und ehrlich – auch bei Verzögerungen. Mit dieser einfachen Struktur zeigen Ihre Updates Unterstützer:innen, was sie bewirkt haben.',
      imageAlt: 'Kinder trinken sauberes Wasser aus einem Wasserhahn',
      seoTitle: 'Projekt-Updates, die Spender:innen wirklich lesen | Donorfit Blog',
      metaDescription:
        'Wie gemeinnützige Organisationen kurze, konkrete und ehrliche Projekt-Updates schreiben, die zeigen, was Spenden bewirkt haben – mit einer einfachen Struktur.',
      body: `Unterstützer:innen spenden, damit etwas passiert. Wenn sie erfahren, wie es weitergegangen ist, wird ihre Spende Teil einer Geschichte, die sie verfolgen können. Projekt-Updates müssen weder lang noch perfekt ausgefeilt sein. Sie müssen konkret, regelmäßig und ehrlich sein.

## Was ein Update nützlich macht

- **Es ist konkret.** "Die Pumpe wurde am Dienstag installiert und vom Dorfkomitee getestet" sagt mehr als "großartige Fortschritte in diesem Monat".
- **Es zeigt, statt nur zu erzählen.** Ein Foto vom Projektort, mit Einwilligung aufgenommen, erklärt oft mehr als ein ganzer Absatz.
- **Es knüpft an die Spende an.** Erinnern Sie die Leser:innen daran, was sie unterstützt haben und wo das Projekt jetzt steht.
- **Es ist ehrlich.** Wenn sich etwas verzögert oder mehr kostet als geplant, sagen Sie das und erklären Sie, was Sie dagegen tun.

## Eine einfache Struktur

Verwenden Sie jedes Mal dieselbe Struktur. So schreiben sich Updates schneller und lesen sich leichter:

1. **Wo wir stehen**: ein Satz zum aktuellen Stand.
2. **Was passiert ist**: zwei oder drei Sätze zu den neuesten Fortschritten.
3. **Wie es weitergeht**: der nächste Schritt und ungefähr wann.
4. **Danke**: ein kurzes, aufrichtiges Dankeschön.

## Die Phasen des Projekts nutzen

Viele Projekte durchlaufen natürliche Phasen. Ein Brunnen zum Beispiel geht von der Standortprüfung über die Bohrung und die Installation bis zur Übergabe. Jede Phase ist ein guter Anlass für ein Update. In Donorfit [Water Well](/water-well) hat jeder Brunnen eine eigene Kampagnenseite, auf der Sie Updates veröffentlichen können, während er diese Phasen durchläuft.

![Ehrenamtliche packen Lebensmittelpakete bei einer Gemeinschaftsveranstaltung](sections/campaign-food.jpg)

## Fotos und Würde

Fotos machen Updates greifbar, aber sie zeigen echte Menschen. Bevor Sie Fotos teilen:

- Holen Sie eine Einwilligung ein und seien Sie bei Kindern besonders vorsichtig.
- Zeigen Sie Menschen in Würde, nicht nur als Empfänger:innen von Hilfe.
- Vermeiden Sie Details, durch die erkennbar wird, wo schutzbedürftige Menschen wohnen.

> Im Zweifel erzählt ein Foto des Projekts selbst, etwa des fertigen Brunnens oder der gefüllten Regale, die Geschichte, ohne jemanden erkennbar zu machen.

## Wie oft Sie berichten sollten

Passen Sie den Rhythmus an das Projekt an. Ein kurzer Nothilfe-Spendenaufruf braucht vielleicht wöchentliche Updates, ein Langzeitprojekt womöglich nur eines pro Phase. Am wichtigsten ist, dass Unterstützer:innen nicht im Ungewissen bleiben. Ein kurzes "Keine großen Neuigkeiten, darauf warten wir gerade" ist besser als Schweigen.

## Den Kreis schließen

Das letzte Update ist das wichtigste. Teilen Sie das Ergebnis, danken Sie den Unterstützer:innen und erklären Sie nach Möglichkeit, was es für die betroffenen Menschen verändert. Es ist auch ein naheliegender Moment, Unterstützer:innen von Ihrem nächsten Projekt zu erzählen.`,
    },
  },
  {
    slug: 'protecting-beneficiaries-in-sponsorship-programmes',
    category: 'sponsorship',
    publishedDate: '2026-10-27',
    featuredImage: 'hero/sponsorship.jpg',
    related: ['writing-project-updates-donors-read', 'bring-donor-member-and-sponsor-records-together'],
    en: {
      title: 'Protecting beneficiaries in sponsorship programmes: privacy basics',
      excerpt:
        'Sponsorship connects people, which means handling sensitive information about children and families. These basics help you share progress without putting anyone at risk.',
      imageAlt: 'A schoolboy writing in his notebook in a classroom',
      seoTitle: 'Protecting Beneficiaries in Sponsorship Programmes | Donorfit Blog',
      metaDescription:
        'Privacy basics for sponsorship organisations: consent, dignified profiles, limited access and safe updates for sponsored children and families.',
      body: `Sponsorship builds a personal connection between a sponsor and a child, a family or a community. That connection depends on information: names, photos, school progress and sometimes locations. Handling this information carefully protects the people you support and the trust of your sponsors.

## Start with consent

Before a beneficiary profile is created, the person, or for a child their parent or guardian, should understand how the information will be used and agree to it. Record that consent and review it regularly, for example when a child grows older or a family moves.

## Share only what sponsors need

Sponsors want to feel connected, but they do not need every detail. A dignified profile usually includes:

- A first name and age.
- A photo taken with consent.
- General information about schooling or interests.
- Progress updates during the year.

Avoid sharing exact addresses, school names combined with locations, or other details that would make it easy to find a child.

## Limit who can see what

Not everyone in your organisation needs access to every record. Field workers may need the details of the families they work with, while office staff may only need payment information. In Donorfit [Sponsorship](/sponsorship), role-based permissions protect sensitive beneficiary information, locations and identity records, so people only access what they need.

## Write dignified updates

Progress updates are one of the most valued parts of sponsorship. Write them with the same respect you would want for your own family:

1. Focus on progress and interests, not only on needs.
2. Use photos that show people as they would want to be seen.
3. Check updates for personal details before sending them.

> A good test: would the child or family be comfortable reading this update themselves?

## Prepare for changes

Sponsorships change. A student finishes school, a family moves or a sponsor stops their support. Agree in advance how you handle these moments, how sponsors are informed and what happens to the information you no longer need.

## Get advice where needed

Data protection and safeguarding rules differ between countries and types of organisation. These basics are a starting point, not legal advice. Your safeguarding lead and data protection adviser can help you set the right policies for your programme.`,
    },
    de: {
      title: 'Begünstigte in Patenschaftsprogrammen schützen: Grundlagen des Datenschutzes',
      excerpt:
        'Patenschaften verbinden Menschen – und dabei geht es um sensible Informationen über Kinder und Familien. Mit diesen Grundlagen teilen Sie Fortschritte, ohne jemanden zu gefährden.',
      imageAlt: 'Ein Schüler schreibt im Klassenzimmer in sein Heft',
      seoTitle: 'Begünstigte in Patenschaftsprogrammen schützen | Donorfit Blog',
      metaDescription:
        'Datenschutz-Grundlagen für Patenschaftsorganisationen: Einwilligung, würdevolle Profile, begrenzter Zugriff und sichere Updates für Patenkinder und Familien.',
      body: `Eine Patenschaft schafft eine persönliche Verbindung zwischen Pat:innen und einem Kind, einer Familie oder einer Gemeinschaft. Diese Verbindung beruht auf Informationen: Namen, Fotos, schulischen Fortschritten und manchmal Aufenthaltsorten. Wer sorgfältig mit diesen Informationen umgeht, schützt die Menschen, die Sie unterstützen, und das Vertrauen Ihrer Pat:innen.

## Mit der Einwilligung beginnen

Bevor ein Profil für eine begünstigte Person angelegt wird, sollte die Person – bei Kindern die Eltern oder Erziehungsberechtigten – verstehen, wie die Informationen verwendet werden, und dem zustimmen. Dokumentieren Sie diese Einwilligung und überprüfen Sie sie regelmäßig, zum Beispiel wenn ein Kind älter wird oder eine Familie umzieht.

## Nur teilen, was Pat:innen brauchen

Pat:innen möchten sich verbunden fühlen, aber sie brauchen nicht jedes Detail. Ein würdevolles Profil enthält in der Regel:

- Vorname und Alter.
- Ein Foto, das mit Einwilligung aufgenommen wurde.
- Allgemeine Informationen zu Schule oder Interessen.
- Fortschritts-Updates im Laufe des Jahres.

Teilen Sie keine genauen Adressen, keine Schulnamen in Verbindung mit Orten und keine anderen Details, mit denen ein Kind leicht zu finden wäre.

## Begrenzen, wer was sehen kann

Nicht alle in Ihrer Organisation brauchen Zugriff auf jeden Datensatz. Mitarbeiter:innen vor Ort benötigen vielleicht die Daten der Familien, mit denen sie arbeiten, während das Büroteam womöglich nur Zahlungsinformationen braucht. In Donorfit [Sponsorship](/sponsorship) schützen rollenbasierte Berechtigungen sensible Informationen über Begünstigte, Standorte und Identitätsdokumente, sodass alle nur auf das zugreifen, was sie brauchen.

## Würdevolle Updates schreiben

Fortschritts-Updates gehören zu den am meisten geschätzten Teilen einer Patenschaft. Schreiben Sie sie mit demselben Respekt, den Sie sich für Ihre eigene Familie wünschen würden:

1. Konzentrieren Sie sich auf Fortschritte und Interessen, nicht nur auf Bedürfnisse.
2. Verwenden Sie Fotos, die Menschen so zeigen, wie sie gesehen werden möchten.
3. Prüfen Sie Updates vor dem Versand auf persönliche Angaben.

> Ein guter Test: Würde sich das Kind oder die Familie wohlfühlen, dieses Update selbst zu lesen?

## Auf Veränderungen vorbereitet sein

Patenschaften verändern sich. Ein:e Schüler:in beendet die Schule, eine Familie zieht um oder ein:e Pat:in beendet die Unterstützung. Legen Sie im Voraus fest, wie Sie mit diesen Momenten umgehen, wie Pat:innen informiert werden und was mit Informationen geschieht, die Sie nicht mehr benötigen.

## Bei Bedarf Rat einholen

Regeln zu Datenschutz und Kinderschutz unterscheiden sich je nach Land und Art der Organisation. Diese Grundlagen sind ein Ausgangspunkt, keine Rechtsberatung. Ihre verantwortliche Person für Kinderschutz und Ihre Datenschutzberatung können Ihnen helfen, die richtigen Richtlinien für Ihr Programm festzulegen.`,
    },
  },
  {
    slug: 'renewal-season-without-the-paperwork',
    category: 'membershipManagement',
    publishedDate: '2026-10-20',
    featuredImage: 'hero/membership.jpg',
    related: ['bring-donor-member-and-sponsor-records-together', 'how-donorfit-pricing-works'],
    en: {
      title: 'Preparing for renewal season without the paperwork',
      excerpt:
        'Invoices, bank statements and reminder emails can take over the weeks before renewals. A little preparation makes membership renewals calmer for volunteers and members.',
      imageAlt: 'A community group sitting together in a circle under a tree',
      seoTitle: 'Membership Renewal Season Without the Paperwork | Donorfit Blog',
      metaDescription:
        'How associations and clubs can prepare for membership renewals: clear plans, up-to-date member records, automatic reminders and a current list for the general assembly.',
      body: `For many associations and clubs, renewal season means evenings spent on invoices, bank statements and reminder emails, often done by volunteers. With some preparation, renewals can run more smoothly for both your team and your members.

## Review your membership plans

Before renewals start, check that your membership types still fit. Common plans include standard, student, senior, family, organisational and patron memberships, each with its own fee and cycle: annual, monthly or lifetime. Simplify where you can. Fewer, clearer plans are easier to explain and to manage.

## Make sure member details are current

Reminders only work if they reach people. A few weeks before renewals:

- Ask members to check their contact details.
- Remove duplicates and mark members who have left.
- Make it easy for members to update their own information, for example through a self-service portal.

## Communicate early

Tell members what is coming before the first payment is due:

1. When renewals start.
2. What the fee is for each plan.
3. How payment works.
4. Who to contact with questions.

## Automate what you can

Manual reminders take time and are easy to forget. In Donorfit [Membership](/membership), recurring billing collects dues automatically, failed payments are retried, and renewal reminders and confirmation notices are sent for you. Your team can then focus on members who need a personal conversation.

> Automation works best with a personal touch at the right moment. A short personal message to a long-standing member who has not renewed can be more effective than another automatic reminder.

## Prepare for the general assembly

Renewal season and the general assembly often fall close together. Many associations need to know who is an active, dues-paid member with voting rights. If your member records include status and voting eligibility, you can filter them to produce a current list instead of compiling it by hand.

## Learn from each season

After renewals, note what took the most time and what members asked about. Use these notes to improve your plans, your messages and your process for next year.`,
    },
    de: {
      title: 'Die Verlängerungssaison ohne Papierkram vorbereiten',
      excerpt:
        'Rechnungen, Kontoauszüge und Erinnerungs-E-Mails können die Wochen vor den Verlängerungen bestimmen. Mit etwas Vorbereitung verlaufen Mitgliedschaftsverlängerungen für Ehrenamtliche und Mitglieder entspannter.',
      imageAlt: 'Eine Gemeinschaftsgruppe sitzt im Kreis unter einem Baum',
      seoTitle: 'Mitgliedsverlängerungen ohne Papierkram | Donorfit Blog',
      metaDescription:
        'So bereiten Vereine Verlängerungen vor: klare Tarife, aktuelle Mitgliederdaten, automatische Erinnerungen und eine aktuelle Liste für die Mitgliederversammlung.',
      body: `Für viele Vereine und Verbände bedeutet die Verlängerungssaison Abende voller Rechnungen, Kontoauszüge und Erinnerungs-E-Mails – oft erledigt von Ehrenamtlichen. Mit etwas Vorbereitung laufen Verlängerungen für Ihr Team und Ihre Mitglieder reibungsloser.

## Mitgliedschaftstarife überprüfen

Prüfen Sie vor Beginn der Verlängerungen, ob Ihre Mitgliedschaftsarten noch passen. Übliche Tarife sind Standard-, Studierenden-, Senioren-, Familien-, Organisations- und Fördermitgliedschaften, jeweils mit eigenem Beitrag und Zyklus: jährlich, monatlich oder auf Lebenszeit. Vereinfachen Sie, wo es möglich ist. Weniger und klarere Tarife lassen sich leichter erklären und verwalten.

## Mitgliederdaten aktuell halten

Erinnerungen wirken nur, wenn sie ankommen. Einige Wochen vor den Verlängerungen:

- Bitten Sie Mitglieder, ihre Kontaktdaten zu prüfen.
- Entfernen Sie Dubletten und markieren Sie ausgetretene Mitglieder.
- Machen Sie es Mitgliedern leicht, ihre Daten selbst zu aktualisieren, zum Beispiel über ein Self-Service-Portal.

## Frühzeitig informieren

Sagen Sie Ihren Mitgliedern, was auf sie zukommt, bevor die erste Zahlung fällig ist:

1. Wann die Verlängerungen beginnen.
2. Wie hoch der Beitrag für jeden Tarif ist.
3. Wie die Zahlung funktioniert.
4. An wen man sich mit Fragen wenden kann.

## Automatisieren, was möglich ist

Manuelle Erinnerungen kosten Zeit und werden leicht vergessen. In Donorfit [Membership](/membership) zieht die wiederkehrende Abrechnung Beiträge automatisch ein, fehlgeschlagene Zahlungen werden erneut versucht, und Erinnerungen zur Verlängerung sowie Bestätigungen werden für Sie verschickt. Ihr Team kann sich dann auf Mitglieder konzentrieren, die ein persönliches Gespräch brauchen.

> Automatisierung wirkt am besten mit einer persönlichen Note im richtigen Moment. Eine kurze persönliche Nachricht an ein langjähriges Mitglied, das noch nicht verlängert hat, kann mehr bewirken als eine weitere automatische Erinnerung.

## Die Mitgliederversammlung vorbereiten

Verlängerungssaison und Mitgliederversammlung liegen oft nah beieinander. Viele Vereine müssen wissen, wer aktives, beitragszahlendes Mitglied mit Stimmrecht ist. Wenn Ihre Mitgliederdaten Status und Stimmberechtigung enthalten, können Sie danach filtern und eine aktuelle Liste erstellen, statt sie von Hand zusammenzutragen.

## Aus jeder Saison lernen

Notieren Sie nach den Verlängerungen, was am meisten Zeit gekostet hat und wonach Mitglieder gefragt haben. Nutzen Sie diese Notizen, um Ihre Tarife, Ihre Nachrichten und Ihre Abläufe für das nächste Jahr zu verbessern.`,
    },
  },
  {
    slug: 'how-donorfit-pricing-works',
    category: 'donorfitUpdates',
    publishedDate: '2026-10-13',
    featuredImage: 'sections/recurring.jpg',
    related: ['donation-form-on-your-website-checklist', 'plan-a-fundraising-campaign-supporters-can-follow'],
    en: {
      title: 'Donorfit is free to use: how payment provider fees work',
      excerpt:
        'Donorfit does not charge a platform fee. When a supporter pays, the payment provider you connect charges its own transaction fees. Here is how that works in practice.',
      imageAlt: 'A woman holding a bank card while using a laptop',
      seoTitle: 'Donorfit Is Free to Use: How Payment Provider Fees Work | Donorfit Blog',
      metaDescription:
        'Donorfit is free to use with no platform fee. Learn how payment provider transaction fees work and how donors can choose to cover them.',
      body: `We often hear the same question from organisations looking at Donorfit: what does it cost? The short answer is that Donorfit is free to use. This article explains what that means and which costs come from the payment provider you choose.

## No platform fee

Donorfit does not charge a monthly platform fee or a Donorfit fee on donations. You can register for free and start setting up your donation forms and campaigns.

## Transaction fees come from your payment provider

When a supporter pays, the payment is processed by a payment provider. Donorfit integrates with:

- Stripe
- PayPal
- GoCardless
- Mollie
- Micropayment

Each provider charges its own transaction fees according to its pricing and your agreement with it. These fees are set by the provider, not by Donorfit. Please check the current conditions on the provider's website before you choose.

## Letting donors cover the fee

Donorfit offers a cover-the-fee option. Donors can choose to add the transaction fee to their gift, so more of their donation reaches your organisation. It is always the donor's choice.

## What you get

The free platform includes the tools most organisations need to start, such as customisable donation forms you can embed on your website, QR codes, receipts generated from predefined templates, a donor portal, basic reports and dashboards and access for several team members. You can see the full list on the [pricing page](/pricing).

## Choosing a provider

Which provider fits best depends on the payment methods your supporters prefer and on how you plan to collect regular gifts. Each [integration page](/integrations) describes what the provider offers and what you need before connecting it. If you are unsure, our team is happy to talk through the options with you.

> Questions about your setup? [Contact our team](/contact) and we will help you find the right starting point.`,
    },
    de: {
      title: 'Donorfit ist kostenlos nutzbar: So funktionieren die Gebühren der Zahlungsanbieter',
      excerpt:
        'Donorfit erhebt keine Plattformgebühr. Wenn Unterstützer:innen zahlen, berechnet der von Ihnen verbundene Zahlungsanbieter eigene Transaktionsgebühren. So funktioniert das in der Praxis.',
      imageAlt: 'Eine Frau mit Bankkarte am Laptop',
      seoTitle: 'Donorfit kostenlos: Gebühren der Zahlungsanbieter | Donorfit Blog',
      metaDescription:
        'Donorfit ist kostenlos nutzbar, ohne Plattformgebühr. So funktionieren die Transaktionsgebühren der Anbieter und so können Spender:innen sie übernehmen.',
      body: `Organisationen, die sich Donorfit ansehen, stellen uns oft dieselbe Frage: Was kostet das? Die kurze Antwort: Donorfit ist kostenlos nutzbar. Dieser Artikel erklärt, was das bedeutet und welche Kosten vom Zahlungsanbieter Ihrer Wahl stammen.

## Keine Plattformgebühr

Donorfit erhebt weder eine monatliche Plattformgebühr noch eine Donorfit-Gebühr auf Spenden. Sie können sich kostenlos registrieren und mit der Einrichtung Ihrer Spendenformulare und Kampagnen beginnen.

## Transaktionsgebühren kommen von Ihrem Zahlungsanbieter

Wenn Unterstützer:innen zahlen, wird die Zahlung von einem Zahlungsanbieter abgewickelt. Donorfit ist integriert mit:

- Stripe
- PayPal
- GoCardless
- Mollie
- Micropayment

Jeder Anbieter berechnet eigene Transaktionsgebühren gemäß seiner Preisgestaltung und Ihrer Vereinbarung mit ihm. Diese Gebühren legt der Anbieter fest, nicht Donorfit. Bitte prüfen Sie vor Ihrer Wahl die aktuellen Konditionen auf der Website des Anbieters.

## Spender:innen die Gebühr übernehmen lassen

Donorfit bietet eine Option zur Gebührenübernahme. Spender:innen können die Transaktionsgebühr freiwillig zu ihrer Spende hinzufügen, sodass mehr von ihrer Spende bei Ihrer Organisation ankommt. Die Entscheidung liegt immer bei den Spender:innen.

## Was Sie erhalten

Die kostenlose Plattform enthält die Werkzeuge, die die meisten Organisationen für den Start brauchen, etwa anpassbare Spendenformulare zum Einbetten auf Ihrer Website, QR-Codes, Spendenbelege aus vordefinierten Vorlagen, ein Spenderportal, grundlegende Berichte und Dashboards sowie Zugänge für mehrere Teammitglieder. Die vollständige Liste finden Sie auf der [Preisseite](/pricing).

## Einen Anbieter wählen

Welcher Anbieter am besten passt, hängt von den Zahlungsarten ab, die Ihre Unterstützer:innen bevorzugen, und davon, wie Sie regelmäßige Spenden einziehen möchten. Jede [Integrationsseite](/integrations) beschreibt, was der Anbieter bietet und was Sie benötigen, bevor Sie ihn verbinden. Wenn Sie unsicher sind, bespricht unser Team die Optionen gern mit Ihnen.

> Fragen zu Ihrer Einrichtung? [Kontaktieren Sie unser Team](/contact), und wir helfen Ihnen, den passenden Einstieg zu finden.`,
    },
  },
  {
    slug: 'preparing-your-qurbani-campaign',
    category: 'fundraising',
    publishedDate: '2026-10-06',
    featuredImage: 'qurbani/eid-cattle-market.jpg',
    related: ['plan-a-fundraising-campaign-supporters-can-follow', 'writing-project-updates-donors-read'],
    en: {
      title: 'Preparing your Qurbani campaign: what to organise before Eid al-Adha',
      excerpt:
        'Qurbani contributions arrive in a few busy weeks. Planning your options, information and communication early helps your team keep every contribution organised.',
      imageAlt: 'Cattle gathered at a market before Eid al-Adha',
      seoTitle: 'Preparing Your Qurbani Campaign Before Eid al-Adha | Donorfit Blog',
      metaDescription:
        'How organisations can prepare a Qurbani campaign: decide on options, collect the right donor information, plan communication and keep contributions organised.',
      body: `During Eid al-Adha, many people wish to perform Qurbani and share its blessings with others. For organisations that carry out Qurbani on behalf of donors, most contributions arrive in a few busy weeks. Preparing well before the season helps your team keep every contribution and its details in order.

## Decide what you will offer

Start with the options you can actually provide:

- Which animals or shares you offer.
- Where the Qurbani will take place.
- The contribution amount for each option.
- The last date you can accept contributions.

Only offer what you can reliably carry out. It is better to close an option early than to promise more than your partners can deliver.

## Collect the information you need

Each contribution comes with details your team needs to carry out the Qurbani correctly, such as the donor's name and contact details and the option they chose. Agree in advance what you need to ask for and keep the form short.

## Bring contributions into one place

When orders arrive by phone, email and paper forms, it is easy to lose track during the busiest weeks. A single online Qurbani page helps keep everything together. With Donorfit [Qurbani](/qurbani), donors can choose from the animals and shares you have configured and contribute online, while your team can follow payments and see how many contributions each option has received.

![A decorated cow before Eid al-Adha](qurbani/decorated-cow.jpg)

## Plan your communication

Supporters appreciate knowing what happens with their Qurbani. Plan a few messages:

1. When the campaign opens, with the options and the deadline.
2. A reminder shortly before the deadline.
3. A confirmation after the Qurbani has been carried out.
4. An update on the distribution, where you can share one.

## Distribution stays with your organisation

Your organisation remains responsible for the Qurbani arrangements and the distribution of meat to people and families in need. Donorfit helps you keep the contributions and donor details organised so your team can focus on carrying it out.

> Review the season afterwards: which options were most requested, where questions came up and what you would prepare earlier next year.`,
    },
    de: {
      title: 'Ihre Qurbani-Kampagne vorbereiten: was Sie vor Eid al-Adha organisieren sollten',
      excerpt:
        'Qurbani-Beiträge gehen innerhalb weniger arbeitsreicher Wochen ein. Wenn Sie Optionen, Informationen und Kommunikation früh planen, kann Ihr Team jeden Beitrag geordnet verwalten.',
      imageAlt: 'Rinder auf einem Markt vor Eid al-Adha',
      seoTitle: 'Qurbani-Kampagne vor Eid al-Adha vorbereiten | Donorfit Blog',
      metaDescription:
        'So bereiten Organisationen eine Qurbani-Kampagne vor: Optionen festlegen, die richtigen Spenderdaten erfassen, Kommunikation planen und Beiträge ordnen.',
      body: `Zu Eid al-Adha möchten viele Menschen Qurbani verrichten und den Segen mit anderen teilen. Bei Organisationen, die das Qurbani im Auftrag von Spender:innen durchführen, gehen die meisten Beiträge innerhalb weniger arbeitsreicher Wochen ein. Eine gute Vorbereitung vor der Saison hilft Ihrem Team, jeden Beitrag und seine Details in Ordnung zu halten.

## Festlegen, was Sie anbieten

Beginnen Sie mit den Optionen, die Sie tatsächlich anbieten können:

- Welche Tiere oder Anteile Sie anbieten.
- Wo das Qurbani stattfindet.
- Die Beitragshöhe für jede Option.
- Der letzte Tag, an dem Sie Beiträge annehmen können.

Bieten Sie nur an, was Sie zuverlässig umsetzen können. Es ist besser, eine Option früh zu schließen, als mehr zu versprechen, als Ihre Partnerorganisationen leisten können.

## Die nötigen Informationen erfassen

Zu jedem Beitrag gehören Angaben, die Ihr Team braucht, um das Qurbani korrekt durchzuführen, etwa Name und Kontaktdaten der spendenden Person und die gewählte Option. Legen Sie im Voraus fest, was Sie abfragen müssen, und halten Sie das Formular kurz.

## Beiträge an einem Ort bündeln

Wenn Bestellungen per Telefon, E-Mail und Papierformular eingehen, verliert man in den arbeitsreichsten Wochen leicht den Überblick. Eine einzige Online-Qurbani-Seite hilft, alles zusammenzuhalten. Mit Donorfit [Qurbani](/qurbani) wählen Spender:innen aus den Tieren und Anteilen, die Sie eingerichtet haben, und leisten ihren Beitrag online, während Ihr Team Zahlungen verfolgen und sehen kann, wie viele Beiträge für jede Option eingegangen sind.

![Eine geschmückte Kuh vor Eid al-Adha](qurbani/decorated-cow.jpg)

## Die Kommunikation planen

Unterstützer:innen schätzen es zu wissen, was mit ihrem Qurbani geschieht. Planen Sie einige Nachrichten:

1. Zum Start der Kampagne, mit den Optionen und der Frist.
2. Eine Erinnerung kurz vor Ablauf der Frist.
3. Eine Bestätigung, nachdem das Qurbani durchgeführt wurde.
4. Ein Update zur Verteilung, sofern Sie eines teilen können.

## Die Verteilung bleibt bei Ihrer Organisation

Ihre Organisation bleibt für die Durchführung des Qurbani und die Verteilung des Fleisches an bedürftige Menschen und Familien verantwortlich. Donorfit hilft Ihnen, Beiträge und Spenderdaten geordnet zu halten, damit sich Ihr Team auf die Durchführung konzentrieren kann.

> Werten Sie die Saison anschließend aus: Welche Optionen wurden am häufigsten gewählt, wo kamen Fragen auf und was würden Sie im nächsten Jahr früher vorbereiten?`,
    },
  },
];
