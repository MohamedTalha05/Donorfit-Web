/**
 * Helpers that turn the static entries in src/data/blogPosts.ts into what the blog pages show.
 * No network, no database: everything is computed from the local file at runtime.
 */
import { BLOG_POSTS, type BlogPostEntry, type BlogPostText } from '../../data/blogPosts.ts';
import { normalizeForSearch, type Lang } from '../../i18n/index.tsx';

/** Every image under src/assets/images, keyed by its path inside that folder ("sections/x.jpg"). */
const IMAGE_MODULES = import.meta.glob('../../assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const PREFIX = '../../assets/images/';

/** Public URL of an image referenced by its path inside src/assets/images (undefined if missing). */
export function blogImage(path: string): string | undefined {
  const url = IMAGE_MODULES[PREFIX + path.replace(/^\/+/, '')];
  if (!url && import.meta.env.DEV) console.warn(`[blog] Image not found in src/assets/images: ${path}`);
  return url;
}

/* ------------------------------------------------------------------ */
/* Markdown subset → blocks                                            */
/* ------------------------------------------------------------------ */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2' | 'h3'; text: string; id: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'img'; alt: string; src: string };

/** URL-safe id for a heading ("Start with one goal" → "start-with-one-goal"). */
export function headingId(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/ß/g, 'ss')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
}

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  const seen = new Map<string, number>();
  const uniqueId = (text: string) => {
    const base = headingId(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
  for (const raw of body.trim().split(/\n\s*\n/)) {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const first = lines[0];
    const img = first.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (lines.length === 1 && img) blocks.push({ type: 'img', alt: img[1], src: img[2] });
    else if (first.startsWith('### ')) blocks.push({ type: 'h3', text: first.slice(4), id: uniqueId(first.slice(4)) });
    else if (first.startsWith('## ')) blocks.push({ type: 'h2', text: first.slice(3), id: uniqueId(first.slice(3)) });
    else if (lines.every((l) => l.startsWith('- '))) blocks.push({ type: 'ul', items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\.\s/.test(l))) blocks.push({ type: 'ol', items: lines.map((l) => l.replace(/^\d+\.\s/, '')) });
    else if (first.startsWith('> ')) blocks.push({ type: 'note', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') });
    else blocks.push({ type: 'p', text: lines.join(' ') });
  }
  return blocks;
}

/** Text without Markdown markers (for search and reading time). */
export function plainText(body: string): string {
  return body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*]/g, ' ')
    .replace(/^\s*(?:-|\d+\.)\s/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** About 200 words per minute, at least 1 minute. */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

/* ------------------------------------------------------------------ */
/* Posts for a language                                                */
/* ------------------------------------------------------------------ */

export type LocalizedPost = Omit<BlogPostEntry, 'en' | 'de'> &
  BlogPostText & {
    lang: Lang;
    image?: string;
    readingMinutes: number;
    /** Normalised title + excerpt + body + category label, for client-side search. */
    searchText: string;
  };

/** Posts written in `lang`, newest first. `categoryLabel` turns a category key into its translated label. */
export function postsFor(lang: Lang, categoryLabel: (key: string) => string): LocalizedPost[] {
  return BLOG_POSTS.filter((p) => p[lang])
    .map((p) => {
      const { en, de, ...meta } = p;
      const text = p[lang] as BlogPostText;
      const plain = plainText(text.body);
      return {
        ...meta,
        ...text,
        lang,
        image: blogImage(p.featuredImage),
        readingMinutes: readingMinutes(plain),
        searchText: normalizeForSearch(`${text.title} ${text.excerpt} ${plain} ${categoryLabel(p.category)}`),
      };
    })
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

/** The newest post flagged `featured`, otherwise the newest post. */
export function featuredPost(posts: LocalizedPost[]): LocalizedPost | undefined {
  return posts.find((p) => p.featured) ?? posts[0];
}

/** Explicit `related` slugs first, then same category, then newest; never the post itself. */
export function relatedPosts(post: LocalizedPost, posts: LocalizedPost[], count = 3): LocalizedPost[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const picked: LocalizedPost[] = [];
  const add = (p?: LocalizedPost) => p && !picked.includes(p) && picked.length < count && picked.push(p);
  (post.related ?? []).forEach((slug) => add(others.find((p) => p.slug === slug)));
  others.filter((p) => p.category === post.category).forEach(add);
  others.forEach(add);
  return picked;
}

export const blogRoute = (slug: string) => `/blog/${slug}`;
