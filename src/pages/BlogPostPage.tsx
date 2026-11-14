import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Linkedin, Facebook, Twitter, MessageCircle, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { useI18n, useT, useFormat } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import BlogCard from '../components/blog/BlogCard.tsx';
import ArticleBody from '../components/blog/ArticleBody.tsx';
import { postsFor, parseBody, relatedPosts, blogRoute, type Block, type LocalizedPost } from '../components/blog/blogContent.ts';
import { APP_SIGNUP_URL } from '../data/links.ts';

const SITE = 'https://donorfit.com';

/** schema.org Article data for the post (also written into the prerendered HTML by scripts/prerender-routes.mjs). */
function articleJsonLd(post: LocalizedPost, url: string, author: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.image ? [new URL(post.image, SITE).href] : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    inLanguage: post.lang,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: 'Donorfit', '@id': `${SITE}/#organization` },
  };
}

function ShareLinks({ post, url }: { post: LocalizedPost; url: string }) {
  const t = useT('blog');
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const title = encodeURIComponent(post.title);
  const links = [
    { network: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { network: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { network: 'X', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${u}&text=${title}` },
    { network: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${title}%20${u}` },
  ];
  const btn =
    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-navy-950 ring-1 ring-neutral-200 transition-colors hover:bg-navy-950 hover:text-white hover:ring-navy-950';
  return (
    <div>
      <h2 className="text-sm font-bold text-navy-950">{t('ui.post.share')}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map(({ network, icon: Icon, href }) => (
          <li key={network}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t('ui.post.shareOn', { network })} title={network} className={btn}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:?subject=${title}&body=${u}`} aria-label={t('ui.post.shareEmail')} title={t('ui.post.shareEmail')} className={btn}>
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
        <li>
          <button
            type="button"
            className={btn}
            aria-label={copied ? t('ui.post.copied') : t('ui.post.copyLink')}
            title={copied ? t('ui.post.copied') : t('ui.post.copyLink')}
            onClick={() => {
              navigator.clipboard?.writeText(url).then(
                () => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                },
                () => undefined,
              );
            }}
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <LinkIcon className="h-4 w-4" aria-hidden="true" />}
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="sr-only">
        {copied ? t('ui.post.copied') : ''}
      </p>
    </div>
  );
}

export default function BlogPostPage({ slug }: { slug: string }) {
  const { localize } = useModal();
  const { lang } = useI18n();
  const t = useT('blog');
  const { date } = useFormat();

  const posts = useMemo(() => postsFor(lang, (k) => t(`categories.${k}`)), [lang, t]);
  const post = posts.find((p) => p.slug === slug);
  const blocks = useMemo(() => (post ? parseBody(post.body) : []), [post]);
  const url = `${SITE}${localize(blogRoute(slug))}`;
  const author = post?.author ?? t('ui.post.defaultAuthor');

  // Article structured data for search engines.
  useEffect(() => {
    if (!post) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'article-jsonld';
    el.text = JSON.stringify(articleJsonLd(post, url, author));
    document.getElementById('article-jsonld')?.remove();
    document.head.appendChild(el);
    return () => el.remove();
  }, [post, url, author]);

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <h1 className="text-3xl font-extrabold text-navy-950">{t('ui.post.notFoundTitle')}</h1>
        <p className="mt-3 text-neutral-600">{t('ui.post.notFoundText')}</p>
        <HomeLink to="/blog" className="hv-btn hv-btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t('ui.post.notFoundButton')}
        </HomeLink>
      </div>
    );
  }

  const toc = blocks.filter((b): b is Extract<Block, { id: string }> => b.type === 'h2');
  const related = relatedPosts(post, posts);

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      <article>
        {/* Header */}
        <header className="bg-gradient-to-b from-aqua to-white pb-10 pt-10 sm:pt-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <HomeLink to="/blog" className="inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-600 hover:text-navy-950">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('ui.post.back')}
            </HomeLink>
            <div className="mt-8">
              <HomeLink
                to={`/blog?category=${post.category}`}
                className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-50"
              >
                {t(`categories.${post.category}`)}
              </HomeLink>
            </div>
            <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.08] text-navy-950 sm:text-5xl">{post.title}</h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-neutral-600">
              <span className="font-semibold text-navy-950">{t('ui.post.by', { author })}</span>
              <time dateTime={post.publishedDate}>{t('ui.post.published', { date: date(post.publishedDate) })}</time>
              {post.updatedDate && <span>{t('ui.post.updated', { date: date(post.updatedDate) })}</span>}
              <span>{t('ui.post.readingTime', { min: post.readingMinutes })}</span>
            </p>
          </div>
        </header>

        {post.image && (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1400}
              height={600}
              fetchPriority="high"
              className="aspect-[16/9] w-full rounded-[2rem] object-cover sm:aspect-[21/9]"
            />
          </div>
        )}

        {/* Body with contents + sharing beside it on large screens */}
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16 lg:px-8">
          <div className="mx-auto w-full max-w-[42rem] lg:mx-0 lg:ml-auto">
            <ArticleBody blocks={blocks} />
            <div className="mt-14 border-t border-neutral-200 pt-8 lg:hidden">
              <ShareLinks post={post} url={url} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              {toc.length > 1 && (
                <nav aria-labelledby="toc-title">
                  <h2 id="toc-title" className="text-sm font-bold text-navy-950">
                    {t('ui.post.contents')}
                  </h2>
                  <ul className="mt-3 space-y-1 border-l border-neutral-200">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm leading-snug text-neutral-600 hover:border-brand-500 hover:text-navy-950">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <ShareLinks post={post} url={url} />
            </div>
          </aside>
        </div>
      </article>

      {/* Call to action */}
      <section aria-labelledby="post-cta" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-12 sm:py-14">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="post-cta" className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {t('ui.post.ctaTitle')}
              </h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/70">{t('ui.post.ctaText')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href={APP_SIGNUP_URL} className="hv-btn hv-btn-primary">
                {t('ui.post.ctaRegister')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <HomeLink to="/pricing" className="hv-btn hv-btn-ghost">
                {t('ui.post.ctaPricing')}
              </HomeLink>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section aria-labelledby="post-related" className="bg-soft py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="post-related" className="text-3xl font-extrabold text-navy-950">
                {t('ui.post.related')}
              </h2>
              <HomeLink to="/blog" className="inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-700 hover:text-brand-900">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t('ui.post.back')}
              </HomeLink>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
