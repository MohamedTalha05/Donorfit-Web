import React, { useMemo } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { useT, useI18n } from '../i18n/index.tsx';
import { postsFor } from '../components/blog/blogContent.ts';
import BlogCard from '../components/blog/BlogCard.tsx';
import HomeLink from '../components/home/HomeLink.tsx';

/**
 * Guides hub. Downloadable toolkits are not available yet, so instead of an email-gated
 * placeholder this page lists the practical articles from the static blog (src/data/blogPosts.ts),
 * which exist in the visitor's language.
 */
export default function GuidesPage() {
  const t = useT('resources');
  const tb = useT('blog');
  const { lang } = useI18n();
  const posts = useMemo(() => postsFor(lang, (k) => tb(`categories.${k}`)), [lang, tb]);

  return (
    <div className="space-y-16 sm:space-y-20 pb-24">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('guides.ui.kicker')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
            {t('guides.ui.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">{t('guides.ui.intro')}</p>
        </div>
      </section>

      {/* Practical articles */}
      <section aria-labelledby="guides-articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="guides-articles" className="text-2xl font-extrabold text-neutral-950 font-display">
            {t('guides.ui.articlesTitle')}
          </h2>
          <HomeLink to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            {t('guides.ui.allArticles')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </HomeLink>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-neutral-100 border border-neutral-200 text-center space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 font-display">{t('guides.ui.helpTitle')}</h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">{t('guides.ui.helpText')}</p>
          <HomeLink
            to="/contact"
            className="inline-flex px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            {t('guides.ui.helpButton')}
          </HomeLink>
        </div>
      </section>
    </div>
  );
}
