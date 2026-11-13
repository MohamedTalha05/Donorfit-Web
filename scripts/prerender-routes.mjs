#!/usr/bin/env node
/**
 * Post-build step for static hosting (GitHub Pages has no server-side rewrites).
 *
 * For every URL in public/sitemap.xml (English and /de German) this writes
 * dist/<path>/index.html — a copy of the SPA shell whose <head> already carries
 * the right language, title, description, canonical and hreflang tags. Deep links
 * and refreshes then return HTTP 200 with crawlable metadata instead of a 404.
 * It also writes dist/404.html so unknown URLs still load the app's own 404 page.
 *
 * Usage: runs automatically after `vite build` (see package.json "build").
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://donorfit.com';
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const urls = [...new Set([...sitemap.matchAll(/<loc>https:\/\/donorfit\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'))];

const seo = { en: readJson('src/locales/en/seo.json'), de: readJson('src/locales/de/seo.json') };
const products = { en: readJson('src/locales/en/products.json'), de: readJson('src/locales/de/products.json') };
const blog = { en: readJson('src/locales/en/blog.json'), de: readJson('src/locales/de/blog.json') };

// Blog posts are not listed in the sitemap; add both language versions explicitly.
for (const post of blog.en.posts) for (const p of [`/blog/${post.slug}`, `/de/blog/${post.slug}`]) if (!urls.includes(p)) urls.push(p);

const parse = (p) => (p === '/de' || p.startsWith('/de/') ? { lang: 'de', route: p.slice(3) || '/' } : { lang: 'en', route: p });
const localize = (route, lang) => (lang === 'en' ? route : route === '/' ? '/de' : `/de${route}`);

/** Same precedence as src/components/SEOHead.tsx. */
function metaFor(route, lang) {
  const slug = route.slice(1);
  const productSeo = products[lang]?.pages?.[slug]?.seo;
  if (productSeo?.title) return productSeo;
  if (route.startsWith('/blog/')) {
    const post = blog[lang].posts.find((x) => x.slug === route.slice(6));
    if (post) return { title: post.seoTitle, description: post.metaDescription };
  }
  return seo[lang].routes[route] ?? seo[lang].routes['/'];
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function render(route, lang) {
  const { title, description } = metaFor(route, lang);
  const url = (l) => `${SITE}${localize(route, l)}`;
  let html = shell
    .replace(/<html([^>]*)\blang="[^"]*"/, `<html$1lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    // Drop tags SEOHead manages, then add the per-route set.
    .replace(/\s*<meta\s+name="description"[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:(title|description|url|locale)"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, '');
  const head = [
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url(lang)}" />`,
    `<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_GB'}" />`,
    `<link rel="canonical" href="${url(lang)}" />`,
    `<link rel="alternate" hreflang="en" href="${url('en')}" />`,
    `<link rel="alternate" hreflang="de" href="${url('de')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url('en')}" />`,
  ].map((l) => `    ${l}`).join('\n');
  return html.replace('</head>', `${head}\n  </head>`);
}

let written = 0;
for (const p of urls) {
  const { lang, route } = parse(p);
  const html = render(route, lang);
  if (p === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html);
  } else {
    const dir = path.join(dist, ...p.split('/').filter(Boolean));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  written++;
}
// Unknown URLs: GitHub Pages serves 404.html (status 404) — the app renders its own not-found page.
fs.writeFileSync(path.join(dist, '404.html'), shell.replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Donorfit</title>'));
console.log(`prerender-routes: wrote ${written} route shells (+404.html) to dist/`);
