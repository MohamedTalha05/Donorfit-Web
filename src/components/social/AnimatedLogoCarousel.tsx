import React, { useEffect, useRef, useState } from 'react';
import type { CustomerLogo } from '../../data/customers.ts';

/** Auto-scroll speed in px per second: slow enough to read every logo. */
const SPEED = 28;
/** Every logo gets roughly the same visual area, so wide and tall marks look equally weighted. */
const LOGO_AREA = 5200;
const MIN_H = 30;
const MAX_H = 62;

function logoHeight(l: CustomerLogo) {
  return Math.round(Math.min(MAX_H, Math.max(MIN_H, Math.sqrt(LOGO_AREA / (l.w / l.h)))));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function LogoTile({ logo, hidden = false }: { logo: CustomerLogo; hidden?: boolean }) {
  const h = logoHeight(logo);
  return (
    <li className="shrink-0">
      <div className="flex h-20 items-center justify-center rounded-2xl bg-white px-6 ring-1 ring-neutral-200/80 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-18px_rgb(0_24_64/0.45)] hover:ring-brand-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-24 sm:px-8">
        <img
          src={logo.src}
          alt={hidden ? '' : logo.name}
          title={hidden ? undefined : logo.name}
          width={logo.w}
          height={logo.h}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-[calc(var(--h)*0.85)] w-auto max-w-none select-none sm:h-[var(--h)]"
          style={{ '--h': `${h}px` } as React.CSSProperties}
        />
      </div>
    </li>
  );
}

/**
 * Horizontally scrolling logo strip.
 * - Moves slowly and continuously, including on mouse hover. Pauses only while a visitor is
 *   using it (keyboard focus, touch, wheel) and while it is off-screen.
 * - It is a real scroll container, so visitors can swipe or scroll it by hand.
 * - With reduced motion, logos are shown as a static wrapped grid.
 */
export default function AnimatedLogoCarousel({ logos, label }: { logos: CustomerLogo[]; label: string }) {
  const reduced = usePrefersReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const holdUntil = useRef(0);
  const visible = useRef(true);

  useEffect(() => {
    const el = scroller.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);

    let pos = el.scrollLeft;
    let last = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const half = el.scrollWidth / 2;
      const held = el.matches(':focus-within') || now < holdUntil.current || !visible.current || document.hidden;
      if (held || half <= el.clientWidth) {
        pos = el.scrollLeft; // follow manual scrolling while paused
      } else {
        pos += (SPEED * dt) / 1000;
      }
      if (pos >= half) pos -= half;
      if (!held) el.scrollLeft = pos;
      else if (el.scrollLeft >= half) el.scrollLeft -= half;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <ul aria-label={label} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {logos.map((l) => (
          <LogoTile key={l.id} logo={l} />
        ))}
      </ul>
    );
  }

  const holdFor = (ms: number) => (holdUntil.current = performance.now() + ms);

  return (
      <div
        ref={scroller}
        role="region"
        aria-label={label}
        tabIndex={0}
        onTouchStart={() => holdFor(60_000)}
        onTouchEnd={() => holdFor(2500)}
        onWheel={() => holdFor(2000)}
        className="-mx-1 overflow-x-auto overscroll-x-contain rounded-2xl px-1 py-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
        }}
      >
        <div className="flex w-max gap-3 sm:gap-4">
          <ul className="flex gap-3 sm:gap-4">
            {logos.map((l) => (
              <LogoTile key={l.id} logo={l} />
            ))}
          </ul>
          {/* Second copy makes the loop seamless; hidden from assistive technology. */}
          <ul aria-hidden="true" className="flex gap-3 sm:gap-4">
            {logos.map((l) => (
              <LogoTile key={l.id} logo={l} hidden />
            ))}
          </ul>
        </div>
      </div>
  );
}
