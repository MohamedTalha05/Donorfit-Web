import { useEffect } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { productByRoute } from '../data/productPages.ts';
import { localizePath, translateObj, useI18n, LANGS, type Lang } from '../i18n/index.tsx';

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
  if (route.startsWith('/blog/')) {
    const slug = route.slice('/blog/'.length);
    const posts = translateObj<{ slug: string; seoTitle: string; metaDescription: string }[] | undefined>(lang, 'blog', 'posts');
    const post = posts?.find((p) => p.slug === slug);
    if (post) return { title: post.seoTitle, description: post.metaDescription };
  }
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
    for (const l of LANGS) setLink('alternate', url(l), l);
    setLink('alternate', url('en'), 'x-default');
  }, [currentRoute, lang]);

  return null;
}
