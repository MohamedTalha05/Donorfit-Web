import React from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx, useFormat } from '../i18n/index.tsx';
import type { LocalizedBlogPost } from './BlogIndexPage.tsx';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  Share2, 
  Bookmark,
  Sparkles
} from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { navigateTo, openBookDemo, openGetStarted } = useModal();
  const t = useT('blog');
  const tx = useTx('blog');
  const { date } = useFormat();
  const posts = tx<LocalizedBlogPost[]>('posts');
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">{t('ui.post.notFoundTitle')}</h1>
        <p className="text-sm text-neutral-600 mb-6">{t('ui.post.notFoundText')}</p>
        <button
          onClick={() => navigateTo('/blog')}
          className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          {t('ui.post.returnToDirectory')}
        </button>
      </div>
    );
  }

  const relatedArticles = posts.filter((p) => post.relatedArticleSlugs.includes(p.slug));

  return (
    <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('ui.post.backToResources')}</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
            {post.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>{t('ui.post.published', { date: date(post.publishedAt) })}</span>
          {post.updatedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">{t('ui.post.updated', { date: date(post.updatedAt) })}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 font-display leading-[1.15] text-balance">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2 border-y border-neutral-200 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900">{post.author.name}</div>
              <div className="text-xs text-neutral-500">{post.author.role}</div>
            </div>
          </div>
          <div className="text-xs text-neutral-500">
            {t('ui.post.verified')}
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      <div className="p-6 rounded-2xl bg-neutral-100/90 border border-neutral-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t('ui.post.keyTakeaways')}</span>
        </div>
        <ul className="space-y-2 text-xs text-neutral-700">
          {post.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Prose Content */}
      <div className="prose prose-neutral max-w-none space-y-6 text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
        {post.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related Products Box */}
      {post.relatedProducts.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
            {t('ui.post.relevantSolutions')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.relatedProducts.map((prod, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(`/${prod.slug}`)}
                className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="font-bold text-xs text-neutral-900 group-hover:text-emerald-700">
                  {prod.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-neutral-900 bg-dark-glow text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-md">
          <h3 className="text-xl font-bold font-display">{t('ui.post.ctaTitle')}</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {t('ui.post.ctaText')}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openBookDemo()}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t('ui.post.ctaButton')}
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 space-y-6">
          <h3 className="text-xl font-bold text-neutral-950 font-display">{t('ui.post.relatedTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <article
                key={rel.slug}
                onClick={() => navigateTo(`/blog/${rel.slug}`)}
                className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-xs flex flex-col justify-between space-y-4 group cursor-pointer transition-all"
              >
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-emerald-700">{rel.category}</div>
                  <h4 className="text-base font-bold text-neutral-950 font-display group-hover:text-emerald-700 transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:text-emerald-700">
                  <span>{t('ui.readArticle')}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
