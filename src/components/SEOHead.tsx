import { useEffect } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { productByRoute } from '../data/productPages.ts';
import { localizePath, translateObj, useI18n, LANGS, type Lang } from '../i18n/index.tsx';
import { BLOG_POSTS } from '../data/blogPosts.ts';
import { blogImage } from './blog/blogContent.ts';

/** Blog article for a route ("/blog/<slug>"), if any. */
const blogPostFor = (route: string) =>
  route.startsWith('/blog/') ? BLOG_POSTS.find((p) => p.slug === route.slice('/blog/'.length).replace(/\/$/, '')) : undefined;

const SITE = 'https://donorfit.com';
const OG_LOCALE: Record<Lang, string> = { en: 'en_GB', de: 'de_DE' };

type Meta = { title: string; description: string };

/** Title/description for a route in a language (product pages and blog posts first, then the route table). */
function metaFor(route: string, lang: Lang): Meta {
  const product = productByRoute(route);
  if (product) {
    const seo = translateObj<Meta | undefined>(lang, 'products', `pages.${product.slug}.seo`);
    if (seo?.title) return seo;
  }
  const text = blogPostFor(route)?.[lang];
  if (text) return { title: text.seoTitle ?? `${text.title} | Donorfit Blog`, description: text.metaDescription ?? text.excerpt };
  const routes = translateObj<Record<string, Meta>>(lang, 'seo', 'routes') ?? {};
  return routes[route] ?? routes['/'];
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Default share image/type from index.html, restored when leaving an article. */
let defaults: { type: string; image: string; twitterImage: string } | null = null;

/** Per-route, per-language <title>, meta description, Open Graph, canonical and hreflang alternates. */
export default function SEOHead() {
  const { currentRoute } = useModal();
  const { lang } = useI18n();

  useEffect(() => {
    const { title, description } = metaFor(currentRoute, lang);
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALE[lang]);

    const url = (l: Lang) => `${SITE}${localizePath(currentRoute, l)}`;
    setLink('canonical', url(lang));
    setMeta('meta[property="og:url"]', 'property', 'og:url', url(lang));
    // Articles only list the languages they are written in.
    const post = blogPostFor(currentRoute);
    for (const l of LANGS) {
      if (!post || post[l]) setLink('alternate', url(l), l);
      else document.head.querySelector(`link[rel="alternate"][hreflang="${l}"]`)?.remove();
    }
    setLink('alternate', url(post && !post.en ? lang : 'en'), 'x-default');

    // Open Graph type and image: the article's featured image on blog posts, the site defaults elsewhere.
    const get = (sel: string) => document.head.querySelector<HTMLMetaElement>(sel)?.getAttribute('content') ?? '';
    defaults ??= { type: get('meta[property="og:type"]') || 'website', image: get('meta[property="og:image"]'), twitterImage: get('meta[name="twitter:image"]') };
    const img = post?.[lang] ? blogImage(post.featuredImage) : undefined;
    setMeta('meta[property="og:type"]', 'property', 'og:type', img ? 'article' : defaults.type);
    if (img || defaults.image) setMeta('meta[property="og:image"]', 'property', 'og:image', img ? new URL(img, SITE).href : defaults.image);
    if (img || defaults.twitterImage) setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img ? new URL(img, SITE).href : defaults.twitterImage);
  }, [currentRoute, lang]);

  return null;
}
