import React, { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n/index.tsx';

/**
 * Homepage hero: zero-fee "ticket" between the description and the CTAs, so 0% platform fees and
 * 0% transaction fees are part of the first screen (pattern: the fee claim lives inside the hero).
 * Two segments split by a dashed divider, like a receipt stub. Each "0" rolls down from 9 once on load;
 * the digit column and "%" are CSS generated content (.zf-roll / .zf-pct in index.css) so they stay out of
 * the accessible name and search snippets, which come from the sr-only text.
 * Business model (client, 2026-11-19): organisations pay no platform or transaction fees. Text: home:zeroBanner.
 */

function useEnteredView<T extends Element>() {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, entered };
}

function RollingZero({ run, delay }: { run: boolean; delay: number }) {
  return (
    <span aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden align-top leading-none">
      <span
        className="zf-roll block transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:!translate-y-[-90%] motion-reduce:transition-none"
        style={{ transform: `translateY(${run ? -90 : 0}%)`, transitionDelay: `${delay}ms` }}
      />
    </span>
  );
}

export default function ZeroFeeBadge({ className = '' }: { className?: string }) {
  const t = useT('home');
  const tc = useT('common');
  const { ref, entered } = useEnteredView<HTMLDivElement>();
  const percent = tc('fees.percent');
  const items = [t('zeroBanner.platform'), t('zeroBanner.transaction')];

  return (
    <div ref={ref} className={`relative inline-block max-w-full ${className}`}>
      {/* glow behind the ticket */}
      <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2rem] bg-brand-400/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.07] ring-1 ring-white/15 backdrop-blur">
        <p className="flex items-center justify-center gap-2 border-b border-white/10 px-5 py-2 text-xs font-semibold text-brand-200 lg:justify-start">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-300 shadow-[0_0_10px_2px_rgb(0_160_160/0.8)]" />
          {t('zeroBanner.audience')}
        </p>
        <ul data-zero-fee className="grid grid-cols-2">
          {items.map((label, i) => (
            <li key={label} className={`relative flex min-w-0 flex-col items-center gap-2 px-4 py-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left ${i === 1 ? 'border-l border-dashed border-white/25' : ''}`}>
              <span className="sr-only">0{percent} </span>
              <span className="hv-display flex shrink-0 items-start text-[2.6rem] font-extrabold leading-none text-white sm:text-5xl lg:text-[3.5rem]">
                <RollingZero run={entered} delay={300 + i * 180} />
                <span
                  aria-hidden="true"
                  className={`zf-pct ml-0.5 text-[0.55em] leading-[1.05] text-brand-300 transition-opacity duration-500 motion-reduce:transition-none ${
                    entered ? 'opacity-100' : 'opacity-0 motion-reduce:opacity-100'
                  }`}
                  style={{ transitionDelay: `${1100 + i * 180}ms` }}
                />
              </span>
              <span className="min-w-0 text-sm font-bold leading-tight text-white sm:text-base">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
