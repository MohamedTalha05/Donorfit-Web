#!/usr/bin/env node
/**
 * Inserts soft hyphens (U+00AD) at natural compound boundaries of long German words
 * in src/locales/de/*.json, so headings break cleanly ("Mitglieder-/verwaltung") on
 * narrow screens even in browsers without a German hyphenation dictionary.
 * Soft hyphens are invisible unless the line breaks there.
 *
 * Skips SEO fields (titles/meta descriptions must stay clean for search snippets),
 * slugs, ids, routes and URLs. Idempotent — safe to re-run after editing translations.
 * Usage: node scripts/soft-hyphenate-de.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales', 'de');
const SHY = '­';

// Compound → break points ("|"). Longest entries are applied first.
const SPLITS = `
Nicht|regierungs|organisationen Gemeinschafts|organisationen Patenschafts|organisationen Mitglieder|organisationen
Wohlfahrts|organisationen Bildungs|organisationen Hilfs|organisationen Gemeinschafts|patenschaften Gemeinde|patenschaften
Bildungs|patenschaften Bildungs|patenschaft Schüler|patenschaften Waisen|patenschaften Waisen|patenschaft Kinder|patenschaften
Patenschafts|verwaltung Patenschafts|programmen Patenschafts|programme Mitglieder|verwaltung Spender|verwaltung Organisations|verwaltung
Schul|verwaltungs|software Kampagnen|verwaltung Kampagnen|management Kampagnen|fortschritt Kampagnen|berichte Spenden|management
Zuwendungs|bestätigungen Zuwendungs|bestätigung Verlängerungs|erinnerungen Mitglieder|kommunikation Mitglieder|versammlungen
Mitgliedschafts|modelle Mitgliedschafts|stufen Mitglieder|verzeichnis Mitglieder|datenbanken Mitglieder|lebenszyklus Mitglieder|anmeldung
Mitglieder|aufnahme Mitglieds|beiträgen Mitglieds|beiträge Beitrags|verlängerungen Beitrags|abrechnung Bildungs|einrichtungen
Moschee|gemeinden Glaubens|gemeinschaften Gemeinschafts|gruppen Gemeinschafts|schulen Kinder|schutz|standards Kinder|hilfs|programme
Fortschritts|berichte Fortschritts|analysen Verwaltungs|aufwand Spenden|technologie Spenden|formulare Spenden|formulars Spenden|fortschritt
grenz|überschreitende Grenz|überschreitende Daten|souveränität Daten|übertragbarkeit Sicherheits|architektur Lastschrift|abwicklung
Lastschrift|mandat Transaktions|gebühren Transaktions|volumen Plattform|gebühren Überweisungs|gebühren Datenschutz|erklärung Datenschutz|vorgaben
Geschäfts|bedingungen Nutzungs|bedingungen Barriere|freiheit Wirkungs|geschichten Wirkungs|nachweise Wirkungs|berichte Kunden|geschichten
Produkt|dokumentation Produkt|funktionen Zahlungs|anbieters Zahlungs|anbieter Zahlungs|lösungen Zahlungs|verfolgung Zahlungs|verwaltung
Mittel|verwendung Mittel|verwaltung Mittel|buchführung Spender|betreuung Spender|historien Beispiel|kampagnen Beispiel|kampagne
Unterstützer|wand Unterstützer|daten Fortschritts|ring Wochen|anwesenheit Rechnungslegungs|standards Wechselkurs|schwankungen
Einwilligungs|nachweisen Einwilligungs|nachweise Kommunikations|verläufe Versorgungs|meilensteinen Erstattungs|richtlinie
Gebühren|übernahme Gebühren|übersicht Vereins|verwaltung Projekt|informationen Projekt|darstellung Lebensmittel|pakete
Stiftungs|vermögen Vorab|ankündigungen Herausforderungen
`.trim().split(/\s+/).filter((w) => w.includes('|'));

const pairs = SPLITS.map((s) => [s.replace(/\|/g, ''), s.replace(/\|/g, SHY)]).sort((a, b) => b[0].length - a[0].length);
const SKIP_KEY = /(^|\.)(seo|seoTitle|metaDescription|slug|slugs|id|ids|href|url|route|to|key|categoryKey|icon|type|value)(\.|$|\[)|relatedArticleSlugs/;

const hyphenate = (s) => {
  let out = s.replace(new RegExp(SHY, 'g'), ''); // idempotent: start from clean text
  for (const [plain, soft] of pairs) out = out.split(plain).join(soft);
  return out;
};

let changed = 0;
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  if (file === 'seo.json') continue;
  const p = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const walk = (o, key) => {
    if (Array.isArray(o)) return o.map((v, i) => walk(v, `${key}[${i}]`));
    if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, walk(v, key ? `${key}.${k}` : k)]));
    if (typeof o !== 'string' || SKIP_KEY.test(key)) return o;
    const h = hyphenate(o);
    if (h !== o) changed++;
    return h;
  };
  fs.writeFileSync(p, JSON.stringify(walk(data, ''), null, 2) + '\n');
}
console.log(`soft-hyphenate-de: updated ${changed} string(s)`);
