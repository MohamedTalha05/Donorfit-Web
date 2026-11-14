import React from 'react';
import { Info } from 'lucide-react';
import HomeLink from '../home/HomeLink.tsx';
import { blogImage, type Block } from './blogContent.ts';

/** Inline Markdown: **bold** and [text](url). Internal links ("/pricing") keep the active language. */
function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={m.index} className="font-bold text-navy-950">{m[1]}</strong>);
    else {
      const [label, href] = [m[2], m[3]];
      const cls = 'font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900';
      parts.push(
        href.startsWith('/') ? (
          <HomeLink key={m.index} to={href} className={cls}>
            {label}
          </HomeLink>
        ) : (
          <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Renders a parsed article body. The first paragraph is styled as the introduction. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  const introIndex = blocks.findIndex((b) => b.type === 'p');
  return (
    <div className="text-[17px] leading-[1.8] text-neutral-700">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return i === introIndex ? (
              <p key={i} className="text-xl leading-relaxed text-navy-950 sm:text-[1.35rem]">
                <Inline text={b.text} />
              </p>
            ) : (
              <p key={i} className="mt-5">
                <Inline text={b.text} />
              </p>
            );
          case 'h2':
            return (
              <h2 key={i} id={b.id} className="mt-14 scroll-mt-28 text-2xl font-extrabold leading-tight text-navy-950 sm:text-[1.9rem]">
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} id={b.id} className="mt-10 scroll-mt-28 text-xl font-bold text-navy-950">
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-2 w-2 rounded-full bg-brand-500" />
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mt-5 space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                      {j + 1}
                    </span>
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case 'note':
            return (
              <aside key={i} className="mt-8 flex gap-4 rounded-2xl border border-brand-200 bg-aqua p-6 text-navy-950">
                <Info className="mt-1 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case 'img': {
            const src = blogImage(b.src);
            if (!src) return null;
            return (
              <figure key={i} className="mt-10">
                <img src={src} alt={b.alt} loading="lazy" decoding="async" className="w-full rounded-[1.5rem] object-cover" />
              </figure>
            );
          }
        }
      })}
    </div>
  );
}
