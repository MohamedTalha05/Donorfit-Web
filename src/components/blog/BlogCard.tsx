import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFormat, useT } from '../../i18n/index.tsx';
import HomeLink from '../home/HomeLink.tsx';
import { blogRoute, type LocalizedPost } from './blogContent.ts';

/**
 * Article card. The whole card is clickable through the "Read more" link
 * (stretched over the card), so there is a single link per card for screen readers.
 */
export default function BlogCard({ post, headingLevel = 'h3' }: { post: LocalizedPost; headingLevel?: 'h2' | 'h3' }) {
  const t = useT('blog');
  const { date } = useFormat();
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white transition-[border-color,box-shadow] hover:border-brand-300 hover:shadow-[0_24px_50px_-30px_rgb(0_24_64/0.45)] focus-within:border-brand-300">
      <div className="aspect-[16/10] overflow-hidden bg-aqua">
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-brand-700">{t(`categories.${post.category}`)}</p>
        <Heading className="mt-2 text-lg font-bold leading-snug text-navy-950 group-hover:text-brand-800 sm:text-xl">{post.title}</Heading>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-neutral-600">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-100 pt-4 text-sm">
          <span className="text-neutral-500">
            <time dateTime={post.publishedDate}>{date(post.publishedDate)}</time>
            <span className="sr-only">, </span>
            <span className="ml-2 border-l border-neutral-200 pl-2">{t('ui.post.readingTime', { min: post.readingMinutes })}</span>
          </span>
          <HomeLink
            to={blogRoute(post.slug)}
            aria-label={t('ui.index.readMoreAria', { title: post.title })}
            className="inline-flex shrink-0 items-center gap-1 font-bold text-brand-700 after:absolute after:inset-0 after:rounded-[1.5rem] after:content-[''] hover:text-brand-900 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-600"
          >
            {t('ui.index.readMore')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </HomeLink>
        </div>
      </div>
    </article>
  );
}
