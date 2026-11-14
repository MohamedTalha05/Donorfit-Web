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
 * Blog articles come from the static file src/data/blogPosts.ts. Each article is
 * prerendered for the languages it is written in, with Open Graph article tags and
 * schema.org Article data, and is added to dist/sitemap.xml automatically.
 *
 * Usage: runs automatically after `vite build` (see package.json "build").
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://donorfit.com';
const LANGS = ['en', 'de'];
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const urls = [...new Set([...sitemap.matchAll(/<loc>https:\/\/donorfit\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'))];

const seo = { en: readJson('src/locales/en/seo.json'), de: readJson('src/locales/de/seo.json') };
const products = { en: readJson('src/locales/en/products.json'), de: readJson('src/locales/de/products.json') };

const parse = (p) => (p === '/de' || p.startsWith('/de/') ? { lang: 'de', route: p.slice(3) || '/' } : { lang: 'en', route: p });
const localize = (route, lang) => (lang === 'en' ? route : route === '/' ? '/de' : `/de${route}`);

/* ------------------------------------------------------------------ */
/* Blog articles (src/data/blogPosts.ts, compiled with esbuild so any  */
/* Node version can read it)                                           */
/* ------------------------------------------------------------------ */

const blogSource = fs.readFileSync(path.join(root, 'src', 'data', 'blogPosts.ts'), 'utf8');
const { code: blogCode } = await transform(blogSource, { loader: 'ts', format: 'esm' });
const { BLOG_POSTS } = await import(`data:text/javascript;base64,${Buffer.from(blogCode).toString('base64')}`);

const postFor = (route) => (route.startsWith('/blog/') ? BLOG_POSTS.find((p) => p.slug === route.slice('/blog/'.length)) : undefined);

/** Article URLs not yet in public/sitemap.xml (added to the built sitemap below). */
const blogUrls = [];
for (const post of BLOG_POSTS) {
  for (const lang of LANGS) {
    const p = localize(`/blog/${post.slug}`, lang);
    if (post[lang] && !urls.includes(p)) {
      urls.push(p);
      blogUrls.push({ path: p, post });
    }
  }
}

/** Absolute URL of a built image from src/assets/images (Vite emits it as dist/assets/<name>-<hash>.<ext>). */
const assetFiles = fs.readdirSync(path.join(dist, 'assets'));
function builtImage(imagePath) {
  const { name, ext } = path.parse(imagePath);
  const hit = assetFiles.find((f) => f.endsWith(ext) && f.startsWith(`${name}-`) && /^[\w-]{8}$/.test(f.slice(name.length + 1, -ext.length)));
  return hit ? `${SITE}/assets/${hit}` : undefined;
}

/* ------------------------------------------------------------------ */

/** Same precedence as src/components/SEOHead.tsx. */
function metaFor(route, lang) {
  const slug = route.slice(1);
  const productSeo = products[lang]?.pages?.[slug]?.seo;
  if (productSeo?.title) return productSeo;
  const text = postFor(route)?.[lang];
  if (text) return { title: text.seoTitle ?? `${text.title} | Donorfit Blog`, description: text.metaDescription ?? text.excerpt };
  return seo[lang].routes[route] ?? seo[lang].routes['/'];
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function articleTags(post, lang, description, url) {
  const image = builtImage(post.featuredImage);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post[lang].title,
    description,
    image: image ? [image] : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    inLanguage: lang,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: post.author ?? 'Donorfit' },
    publisher: { '@type': 'Organization', name: 'Donorfit', '@id': `${SITE}/#organization` },
  };
  return [
    `<meta property="og:type" content="article" />`,
    ...(image ? [`<meta property="og:image" content="${image}" />`, `<meta name="twitter:image" content="${image}" />`] : []),
    `<meta property="article:published_time" content="${post.publishedDate}" />`,
    `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
  ];
}

function render(route, lang) {
  const { title, description } = metaFor(route, lang);
  const url = (l) => `${SITE}${localize(route, l)}`;
  const post = postFor(route);
  const langs = post ? LANGS.filter((l) => post[l]) : LANGS;
  let html = shell
    .replace(/<html([^>]*)\blang="[^"]*"/, `<html$1lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    // Drop tags SEOHead manages, then add the per-route set.
    .replace(/\s*<meta\s+name="description"[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:(title|description|url|locale)"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, '');
  if (post) html = html.replace(/\s*<meta\s+(?:property="og:(?:type|image)"|name="twitter:image")[^>]*>/gi, '');
  const head = [
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url(lang)}" />`,
    `<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_GB'}" />`,
    `<link rel="canonical" href="${url(lang)}" />`,
    ...langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url(langs.includes('en') ? 'en' : langs[0])}" />`,
    ...(post ? articleTags(post, lang, description, url(lang)) : []),
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

// Sitemap: append blog articles that are not listed in public/sitemap.xml.
if (blogUrls.length) {
  const entries = blogUrls.map(({ path: p, post }) => {
    const route = parse(p).route;
    const alternates = LANGS.filter((l) => post[l]).map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${localize(route, l)}" />`);
    return [
      '  <url>',
      `    <loc>${SITE}${p}</loc>`,
      `    <lastmod>${post.updatedDate ?? post.publishedDate}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.6</priority>',
      ...alternates,
      '  </url>',
    ].join('\n');
  });
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`));
}

// Unknown URLs: GitHub Pages serves 404.html (status 404) — the app renders its own not-found page.
fs.writeFileSync(path.join(dist, '404.html'), shell.replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Donorfit</title>'));
console.log(`prerender-routes: wrote ${written} route shells (+404.html) to dist/, including ${BLOG_POSTS.length} blog articles`);
