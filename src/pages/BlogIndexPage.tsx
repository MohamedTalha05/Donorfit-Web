import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, ArrowRight, Newspaper } from 'lucide-react';
import { useI18n, useT, useFormat, normalizeForSearch } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import BlogCard from '../components/blog/BlogCard.tsx';
import { postsFor, featuredPost, blogRoute } from '../components/blog/blogContent.ts';
import { BLOG_CATEGORIES, type BlogCategory } from '../data/blogPosts.ts';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
type Filter = 'all' | BlogCategory;

/** Initial filter and search from the URL (?category=…&q=…), so filtered views can be shared. */
function readQuery(): { category: Filter; q: string } {
  if (typeof window === 'undefined') return { category: 'all', q: '' };
  const params = new URLSearchParams(window.location.search);
  const c = params.get('category') ?? 'all';
  return { category: (BLOG_CATEGORIES as string[]).includes(c) ? (c as Filter) : 'all', q: params.get('q') ?? '' };
}

export default function BlogIndexPage() {
  const { lang } = useI18n();
  const t = useT('blog');
  const { date } = useFormat();
  const [category, setCategory] = useState<Filter>(() => readQuery().category);
  const [query, setQuery] = useState(() => readQuery().q);

  const posts = useMemo(() => postsFor(lang, (k) => t(`categories.${k}`)), [lang, t]);
  const featured = featuredPost(posts);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: posts.length };
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [posts]);

  const q = normalizeForSearch(query.trim());
  const filtering = category !== 'all' || q !== '';
  const results = posts.filter((p) => (category === 'all' || p.category === category) && (!q || q.split(/\s+/).every((w) => p.searchText.includes(w))));
  // Without a filter, the featured article sits on its own above the grid.
  const grid = filtering ? results : results.filter((p) => p !== featured);

  // Keep the filter in the address bar (language prefix and path stay unchanged).
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (query.trim()) params.set('q', query.trim());
    const search = params.toString();
    const next = window.location.pathname + (search ? `?${search}` : '');
    if (next !== window.location.pathname + window.location.search) window.history.replaceState(window.history.state, '', next);
  }, [category, query]);

  const countLabel = (n: number) => (n === 1 ? t('ui.index.countOne') : t('ui.index.countOther', { count: n }));
  const clear = () => {
    setCategory('all');
    setQuery('');
  };

  return (
    <div className="home-v2 overflow-x-clip bg-white">
      {/* Hero: title, search and topic index */}
      <section aria-labelledby="blog-title" className="relative bg-gradient-to-b from-aqua via-aqua/60 to-white pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              Donorfit Blog
            </span>
            <h1 id="blog-title" className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] text-navy-950 sm:text-6xl">
              {t('ui.index.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">{t('ui.index.description')}</p>

            <form role="search" className="mt-9 max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="blog-search" className="sr-only">
                {t('ui.index.searchLabel')}
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('ui.index.searchPlaceholder')}
                  autoComplete="off"
                  className="h-14 w-full rounded-full border border-neutral-300 bg-white pl-13 pr-12 text-base text-navy-950 shadow-[0_10px_30px_-20px_rgb(0_24_64/0.4)] placeholder:text-neutral-500 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('ui.index.clear')}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-navy-950"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Topic index: chips on small screens, a list with counts on large screens */}
          <div className="lg:rounded-[1.75rem] lg:bg-white lg:p-6 lg:shadow-[0_30px_60px_-45px_rgb(0_24_64/0.5)] lg:ring-1 lg:ring-brand-200">
            <h2 className="text-lg font-bold text-navy-950">{t('ui.index.topicsTitle')}</h2>
            <div role="group" aria-label={t('ui.index.topicsLabel')} className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {(['all', ...BLOG_CATEGORIES] as Filter[]).map((c) => {
                const on = category === c;
                const n = counts[c] ?? 0;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCategory(c)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-full px-4 py-2 text-sm font-semibold transition-colors lg:rounded-xl lg:px-3.5 lg:py-2.5 lg:text-[15px] ${
                      on ? 'bg-navy-950 text-white' : 'bg-white text-navy-950 ring-1 ring-neutral-200 hover:bg-aqua lg:ring-0'
                    }`}
                  >
                    <span>{t(`categories.${c}`)}</span>
                    <span className={`tabular-nums ${on ? 'text-white/70' : 'text-neutral-500'}`}>
                      <span className="sr-only">(</span>
                      {n}
                      <span className="sr-only">)</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured article (hidden while filtering, so results stay in one list) */}
      {!filtering && featured && (
        <section aria-labelledby="blog-featured" className="pb-6 pt-6 sm:pt-10">
          <div className={CONTAINER}>
            <h2 id="blog-featured" className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {t('ui.index.featured')}
            </h2>
            <article className="group relative mt-8 grid overflow-hidden rounded-[2rem] bg-navy-950 text-white lg:grid-cols-[1.25fr_1fr]">
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
                {featured.image && (
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    width={1400}
                    height={933}
                    fetchPriority="high"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-sm font-semibold text-brand-300">{t(`categories.${featured.category}`)}</p>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight sm:text-[2.1rem]">{featured.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-white/60">
                  <time dateTime={featured.publishedDate}>{date(featured.publishedDate)}</time>
                  <span className="sr-only">, </span>
                  <span className="ml-2 border-l border-white/20 pl-2">{t('ui.post.readingTime', { min: featured.readingMinutes })}</span>
                </p>
                <HomeLink
                  to={blogRoute(featured.slug)}
                  aria-label={t('ui.index.readMoreAria', { title: featured.title })}
                  className="hv-btn hv-btn-primary mt-8 w-fit after:absolute after:inset-0 after:content-['']"
                >
                  {t('ui.index.readMore')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </HomeLink>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Latest articles / search results */}
      <section aria-labelledby="blog-list" className="pb-24 pt-14 sm:pb-28 sm:pt-16">
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id="blog-list" className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {filtering ? t('ui.index.results') : t('ui.index.latest')}
            </h2>
            <p aria-live="polite" className="text-[15px] text-neutral-600">
              {filtering && (results.length === 1 ? t('ui.index.resultsOne') : t('ui.index.resultsOther', { count: results.length }))}
              {!filtering && countLabel(posts.length)}
            </p>
          </div>

          {grid.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          ) : results.length > 0 ? null : (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-neutral-300 bg-soft px-6 py-14 text-center">
              <p className="text-lg font-bold text-navy-950">{t('ui.index.noResults')}</p>
              <p className="mt-2 text-[15px] text-neutral-600">{t('ui.index.noResultsHint')}</p>
              <button type="button" onClick={clear} className="hv-btn hv-btn-outline mt-6">
                {t('ui.index.clear')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
