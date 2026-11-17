import React, { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Coins, Users } from 'lucide-react';
import { useT } from '../../i18n/index.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * "Donorfit in Numbers": the three client-confirmed figures (2026-11-17) in one slim panel.
 * Used on Home, About, Pricing, Contact and the six solution pages (after the customer logos).
 * Text: home:keyFigures. Values and labels come from the translations and must not be changed here.
 *
 * Motion: the numbers count up from 0 the first time the section enters the viewport; the
 * panel fades up through the homepage's data-reveal system. Before hydration (prerendered HTML), with
 * reduced motion, or without IntersectionObserver, the final values are shown straight away.
 * Screen readers always get the final value; the animated digits are aria-hidden.
 */

type FigureKey = 'members' | 'volume' | 'experience';
const TARGETS: Record<FigureKey, number> = { members: 750, volume: 25, experience: 10 };
const DURATION = 1800;

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/** True once the element has entered the viewport (never resets). */
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, entered };
}

/** Counts from 0 to `target` after `start` turns true. Returns the final value when motion is off. */
function useCountUp(target: number, start: boolean, delay: number) {
  const [value, setValue] = useState(target);
  const [armed, setArmed] = useState(false);

  // After hydration, drop to 0 so the count-up can play (skipped with reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    setValue(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || !start) return;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        setValue(Math.round(easeOutCubic(p) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [armed, start, target, delay]);

  return value;
}

function Figure({ k, start, delay, className }: { k: FigureKey; start: boolean; delay: number; className: string }) {
  const t = useT('home');
  const n = useCountUp(TARGETS[k], start, delay);
  return (
    <p className={className}>
      <span className="sr-only">{t(`keyFigures.${k}.value`)}</span>
      <span aria-hidden="true">{t(`keyFigures.${k}.template`, { n })}</span>
    </p>
  );
}

const ITEMS: { key: FigureKey; Icon: typeof Users }[] = [
  { key: 'members', Icon: Users },
  { key: 'volume', Icon: Coins },
  { key: 'experience', Icon: CalendarCheck },
];

export default function KeyFigures({ id = 'key-figures', className = '' }: { id?: string; className?: string }) {
  const t = useT('home');
  const { ref, entered } = useEnteredView<HTMLUListElement>();

  return (
    <section aria-labelledby={id} className={`home-v2 py-10 sm:py-14 ${className}`}>
      <div className={CONTAINER}>
        {/* thin gradient border */}
        <div data-reveal className="rounded-[1.75rem] bg-gradient-to-r from-brand-300 via-brand-100 to-navy-950/15 p-px shadow-[0_24px_60px_-40px_rgb(0_24_64/0.45)]">
          <div className="relative isolate overflow-hidden rounded-[calc(1.75rem-1px)] bg-white">
            {/* soft light + faint dot grid on the right */}
            <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 -z-10 w-1/2 opacity-70 [background-image:radial-gradient(rgb(0_160_160/0.22)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_left,black,transparent)]"
            />

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,3fr)] lg:items-center lg:gap-10 lg:px-10">
              <div>
                <h2 id={id} className="text-2xl font-extrabold leading-tight text-navy-950 sm:text-[1.75rem]">
                  {t('keyFigures.title')}
                </h2>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-neutral-600">{t('keyFigures.body')}</p>
              </div>

              <ul ref={ref} className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {ITEMS.map(({ key, Icon }, i) => (
                  <li
                    key={key}
                    className="group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:block sm:px-6 sm:py-1 sm:first:pl-0 sm:first:pt-1 sm:last:pb-1 sm:last:pr-0"
                  >
                    <div className="shrink-0">
                      <Figure
                        k={key}
                        start={entered}
                        delay={i * 150}
                        className="hv-display whitespace-nowrap text-[1.875rem] font-extrabold leading-none tracking-tight tabular-nums text-navy-950 sm:text-[2.25rem] transition-colors duration-300 group-hover:text-brand-700 motion-reduce:transition-none lg:text-[2.75rem]"
                      />
                      <span aria-hidden="true" className="mt-3 hidden h-[3px] w-14 overflow-hidden rounded-full bg-brand-100 sm:block">
                        <span
                          className={`block h-full rounded-full bg-gradient-to-r from-brand-500 to-navy-700 transition-[width] duration-[1200ms] ease-out motion-reduce:transition-none ${entered ? 'w-full' : 'w-0'}`}
                          style={{ transitionDelay: `${300 + i * 150}ms` }}
                        />
                      </span>
                    </div>
                    <p className="flex min-w-0 items-center justify-end gap-2 text-right text-sm font-semibold leading-snug text-neutral-700 sm:mt-3 sm:justify-start sm:text-left">
                      <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 sm:flex text-brand-700 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white motion-reduce:transition-none">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {t(`keyFigures.${key}.label`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
