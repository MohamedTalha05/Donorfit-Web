#!/usr/bin/env node
/**
 * Verifies that every translation namespace has identical keys in en and de,
 * that no value is empty, and that {{placeholders}} match between languages.
 * Usage: npm run i18n:check
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..', 'src', 'locales');
const langs = ['en', 'de'];
const files = new Set(langs.flatMap((l) => fs.readdirSync(path.join(root, l)).filter((f) => f.endsWith('.json'))));

const flatten = (obj, prefix = '', out = {}) => {
  if (Array.isArray(obj)) obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (obj && typeof obj === 'object') for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  else out[prefix] = obj;
  return out;
};
const placeholders = (s) => (typeof s === 'string' ? [...s.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map((m) => m[1]).sort().join(',') : '');

let problems = 0;
const report = (msg) => {
  problems++;
  console.log('  ✗ ' + msg);
};

for (const file of [...files].sort()) {
  const data = {};
  for (const l of langs) {
    const p = path.join(root, l, file);
    if (!fs.existsSync(p)) {
      console.log(`${file}`);
      report(`missing in ${l}/`);
      continue;
    }
    try {
      data[l] = flatten(JSON.parse(fs.readFileSync(p, 'utf8')));
    } catch (e) {
      console.log(`${file}`);
      report(`${l}/${file} is not valid JSON: ${e.message}`);
    }
  }
  if (!data.en || !data.de) continue;
  const before = problems;
  const lines = [];
  const log = (m) => lines.push(m);
  for (const k of Object.keys(data.en)) {
    if (!(k in data.de)) log(`de missing key: ${k}`);
    else if (placeholders(data.en[k]) !== placeholders(data.de[k])) log(`placeholder mismatch: ${k}`);
  }
  for (const k of Object.keys(data.de)) if (!(k in data.en)) log(`de has extra key: ${k}`);
  for (const l of langs) for (const [k, v] of Object.entries(data[l])) if (v === '' && data[l === 'en' ? 'de' : 'en'][k] !== '') log(`${l} empty value: ${k}`); // empty in both = intentional (e.g. decorative alt)
  console.log(`${file}: ${Object.keys(data.en).length} keys${lines.length ? '' : ' ✓'}`);
  lines.slice(0, 25).forEach(report);
  if (lines.length > 25) report(`…and ${lines.length - 25} more`);
  if (problems === before && lines.length) problems += lines.length;
}

console.log(problems ? `\n${problems} problem(s) found.` : '\nAll namespaces match.');
process.exit(problems ? 1 : 0);
