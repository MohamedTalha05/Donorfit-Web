import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IdCard,
  HeartHandshake,
  Droplets,
  Moon,
  GraduationCap,
  PiggyBank,
  Check,
  CircleDot,
  Users,
} from 'lucide-react';
import { useT, useTx, useFormat } from '../../i18n/index.tsx';
import { isHiddenProduct } from '../../data/productPages.ts';

import membershipImg from '../../assets/images/hero/membership.jpg';
import sponsorshipImg from '../../assets/images/hero/sponsorship.jpg';
import waterwellImg from '../../assets/images/hero/waterwell.jpg';
import qurbaniImg from '../../assets/images/hero/qurbani.jpg';
import schoolImg from '../../assets/images/hero/school.jpg';
import moneypoolImg from '../../assets/images/hero/moneypool.jpg';


/* ------------------------------------------------------------------ */
/* Card primitives                                                     */
/* ------------------------------------------------------------------ */

function Card({ className = '', children, order = 0 }: { className?: string; children: React.ReactNode; order?: number }) {
  // The carousel card is compact: show two overlays (one on phones), pinned top and bottom.
  if (order > 1) return null;
  const pin = order === 0 ? '!top-4 !bottom-auto' : '!bottom-4 !top-auto max-sm:hidden';
  return (
    <div
      className={`ps-card ${pin} absolute rounded-2xl border border-white/70 bg-white/95 p-3.5 text-left text-navy-950 shadow-[0_24px_50px_-20px_rgb(0_24_64/0.55)] sm:p-4 ${className}`}
      style={{ '--card-order': order } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function Bar({ pct, className = '' }: { pct: number; className?: string }) {
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-brand-50 ${className}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

function CardTitle({ icon: Icon, children }: { icon: typeof Users; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product-specific overlays (illustrative example data)               */
/* ------------------------------------------------------------------ */

/** Shared hooks for the overlay cards (illustrative example data; text in home:showcase). */
function useCardKit() {
  return { t: useT('home'), tx: useTx('home'), ...useFormat() };
}

function MembershipCards() {
  const { t, tx, eur, int, date } = useCardKit();
  const planNames = tx<string[]>('showcase.membership.plans');
  const benefits = tx<string[]>('showcase.membership.benefits');
  return (
    <>
      <Card order={0} className="left-3 top-3 w-52 sm:-left-8 sm:top-8 sm:w-60">
        <CardTitle icon={IdCard}>{t('showcase.membership.plansTitle')}</CardTitle>
        <ul className="mt-3 space-y-1.5 text-[11px]">
          {(
            [
              [60, true],
              [120, false],
              [25, false],
            ] as const
          ).map(([price, sel], i) => (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${sel ? 'bg-brand-50 font-semibold ring-1 ring-brand-200' : 'bg-soft'}`}
            >
              <span>{planNames[i]}</span>
              <span className="tabular-nums">{t('mock.perYear', { price: eur(price) })}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card order={1} className="bottom-24 right-3 w-48 sm:-right-8 sm:bottom-28 sm:w-56">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-[11px] font-bold text-white">AK</span>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold">Amina K.</div>
            <div className="text-[11px] text-neutral-500">{t('showcase.membership.memberRole')}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-50 px-2.5 py-1.5 text-[11px]">
          <span className="flex items-center gap-1.5 font-semibold text-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" /> {t('showcase.membership.active')}
          </span>
          <span className="text-neutral-600">
            {t('showcase.membership.renews', { date: date(new Date(2027, 2, 12), { day: 'numeric', month: 'short' }) })}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1 text-[10px] font-medium text-neutral-600">
          {benefits.map((b) => (
            <span key={b} className="rounded-full border border-neutral-200 px-2 py-0.5">
              {b}
            </span>
          ))}
        </div>
      </Card>
      <Card order={2} className="bottom-3 left-3 hidden sm:-left-4 sm:bottom-6 sm:block">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-brand-600" />
          <div>
            <div className="hv-display text-xl font-extrabold tabular-nums leading-none">{int(1248)}</div>
            <div className="text-[11px] text-neutral-500">{t('showcase.membership.activeMembers')}</div>
          </div>
        </div>
      </Card>
    </>
  );
}

function SponsorshipCards() {
  const { t, eur } = useCardKit();
  return (
    <>
      <Card order={0} className="right-3 top-3 w-52 sm:-right-8 sm:top-10 sm:w-60">
        <CardTitle icon={HeartHandshake}>{t('showcase.sponsorship.title')}</CardTitle>
        <div className="mt-3 rounded-xl bg-soft p-2.5 text-[11px]">
          <div className="font-bold text-navy-950">{t('showcase.sponsorship.child', { name: 'Yusuf', age: 11 })}</div>
          <div className="text-neutral-600">{t('showcase.sponsorship.details')}</div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="text-neutral-600">{t('showcase.sponsorship.contribution')}</span>
          <span className="font-bold tabular-nums">{t('mock.perMonth', { price: eur(30) })}</span>
        </div>
      </Card>
      <Card order={1} className="bottom-3 left-3 w-52 sm:-left-8 sm:bottom-10 sm:w-60">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 36 36" className="h-12 w-12 shrink-0 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-brand-50)" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="var(--color-brand-600)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(8 / 12) * 94.2} 94.2`}
            />
          </svg>
          <div>
            <div className="text-xs font-bold">{t('showcase.sponsorship.yearFunded')}</div>
            <div className="text-[11px] tabular-nums text-neutral-600">{t('showcase.sponsorship.progress', { done: 8, total: 12 })}</div>
          </div>
        </div>
      </Card>
    </>
  );
}

function WaterWellCards() {
  const { t, tx, eur } = useCardKit();
  const stepLabels = tx<string[]>('showcase.waterwell.steps');
  const steps: [string, 'done' | 'now' | 'todo'][] = (['done', 'done', 'now', 'todo'] as const).map((s, i) => [stepLabels[i], s]);
  return (
    <>
      <Card order={0} className="left-3 top-3 w-52 sm:-left-8 sm:top-8 sm:w-60">
        <CardTitle icon={Droplets}>{t('showcase.waterwell.title')}</CardTitle>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="hv-display text-lg font-extrabold tabular-nums">{eur(3420)}</span>
          <span className="text-[11px] tabular-nums text-neutral-500">{t('mock.of', { amount: eur(4500) })}</span>
        </div>
        <Bar pct={76} className="mt-2" />
        <div className="mt-1.5 text-[11px] tabular-nums text-neutral-500">{t('showcase.waterwell.raised', { pct: 76 })}</div>
      </Card>
      <Card order={1} className="bottom-3 right-3 w-48 sm:-right-8 sm:bottom-10 sm:w-56">
        <div className="text-xs font-bold">{t('showcase.waterwell.status')}</div>
        <ol className="mt-2.5 space-y-2 text-[11px]">
          {steps.map(([label, s]) => (
            <li key={label} className="flex items-center gap-2">
              {s === 'done' ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              ) : s === 'now' ? (
                <CircleDot className="h-4 w-4 text-brand-600" />
              ) : (
                <span className="h-4 w-4 rounded-full border-2 border-neutral-200" />
              )}
              <span className={s === 'todo' ? 'text-neutral-400' : s === 'now' ? 'font-semibold' : 'text-neutral-700'}>{label}</span>
            </li>
          ))}
        </ol>
      </Card>
    </>
  );
}

function QurbaniCards() {
  const { t, tx, eur, int } = useCardKit();
  const options = tx<{ animal: string; share: string }[]>('showcase.qurbani.options');
  return (
    <>
      <Card order={0} className="right-3 top-3 w-56 sm:-right-8 sm:top-8 sm:w-64">
        <CardTitle icon={Moon}>{t('showcase.qurbani.title')}</CardTitle>
        <ul className="mt-3 space-y-1.5 text-[11px]">
          {(
            [
              [150, true],
              [95, false],
              [140, false],
            ] as const
          ).map(([price, sel], i) => [options[i].animal, options[i].share, price, sel] as const).map(([animal, share, price, sel]) => (
            <li
              key={animal}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${sel ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-soft'}`}
            >
              <span>
                <span className="font-semibold">{animal}</span> <span className="text-neutral-500">· {share}</span>
              </span>
              <span className="font-bold tabular-nums">{eur(price)}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card order={1} className="bottom-24 left-3 w-48 sm:-left-8 sm:bottom-28 sm:w-56">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold">{t('showcase.qurbani.order', { id: 'Q-1043' })}</span>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">{t('showcase.qurbani.allocated')}</span>
        </div>
        <div className="mt-2 text-[11px] text-neutral-600">{t('showcase.qurbani.orderDetail', { amount: eur(300) })}</div>
      </Card>
      <Card order={2} className="bottom-3 right-3 hidden w-56 sm:-right-4 sm:bottom-6 sm:block">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold">{t('showcase.qurbani.sharesAllocated')}</span>
          <span className="tabular-nums text-neutral-500">{t('mock.xOfY', { done: int(640), total: int(800) })}</span>
        </div>
        <Bar pct={80} className="mt-2" />
      </Card>
    </>
  );
}

function SchoolCards() {
  const { t, tx } = useCardKit();
  const feeStatus = tx<string[]>('showcase.school.feeStatus');
  return (
    <>
      <Card order={0} className="left-3 top-3 w-48 sm:-left-8 sm:top-8 sm:w-56">
        <CardTitle icon={GraduationCap}>{t('showcase.school.title')}</CardTitle>
        <div className="mt-3 flex items-end gap-1">
          {[24, 26, 25, 27, 26].map((v, i) => (
            <span key={i} className={`flex-1 rounded-t ${i === 4 ? 'bg-brand-600' : 'bg-brand-100'}`} style={{ height: `${10 + ((v - 22) / 6) * 30}px` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-neutral-600">{t('showcase.school.present')}</span>
          <span className="font-bold tabular-nums">{t('mock.xOfY', { done: 26, total: 28 })}</span>
        </div>
      </Card>
      <Card order={1} className="bottom-3 right-3 w-52 sm:-right-8 sm:bottom-10 sm:w-60">
        <div className="text-xs font-bold">{t('showcase.school.fees')}</div>
        <table className="mt-2 w-full text-[11px]">
          <tbody>
            {(
              [
                [21, 'bg-brand-600'],
                [5, 'bg-brand-200'],
                [2, 'bg-navy-950'],
              ] as const
            ).map(([n, dot], i) => [feeStatus[i], n, dot] as const).map(([label, n, dot]) => (
              <tr key={label}>
                <td className="py-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    {label}
                  </span>
                </td>
                <td className="py-0.5 text-right font-semibold tabular-nums">{t('showcase.school.students', { n })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card order={2} className="bottom-28 left-3 hidden w-52 sm:-left-6 sm:bottom-32 sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-800">SM</span>
          <div className="min-w-0 text-[11px]">
            <div className="truncate text-xs font-bold">{t('showcase.school.record', { name: 'Sara M.' })}</div>
            <div className="text-neutral-500">{t('showcase.school.recordSub')}</div>
          </div>
        </div>
      </Card>
    </>
  );
}

function MoneyPoolCards() {
  const { t, eur, int } = useCardKit();
  return (
    <>
      <Card order={0} className="right-3 top-3 w-52 sm:-right-8 sm:top-8 sm:w-60">
        <CardTitle icon={PiggyBank}>{t('showcase.moneypool.title')}</CardTitle>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="hv-display text-lg font-extrabold tabular-nums">{eur(8760)}</span>
          <span className="text-[11px] tabular-nums text-neutral-500">{t('mock.of', { amount: eur(12000) })}</span>
        </div>
        <Bar pct={73} className="mt-2" />
        <div className="mt-1.5 text-[11px] tabular-nums text-neutral-500">{t('showcase.moneypool.contributors', { n: int(143) })}</div>
      </Card>
      <Card order={1} className="bottom-3 left-3 w-48 sm:-left-8 sm:bottom-10 sm:w-56">
        <div className="text-xs font-bold">{t('showcase.moneypool.latest')}</div>
        <ul className="mt-2.5 space-y-1.5 text-[11px]">
          {(
            [
              ['Ali R.', 50],
              [t('showcase.moneypool.anonymous'), 20],
              ['Sara & Omar', 100],
            ] as const
          ).map(([n, a]) => (
            <li key={n} className="flex items-center justify-between">
              <span className="text-neutral-700">{n}</span>
              <span className="font-semibold tabular-nums text-brand-800">+{eur(a)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Slides                                                              */
/* ------------------------------------------------------------------ */

/* Names and alt texts live in home:showcase.slides.<key>. */

const ALL_SLIDES = [
  {
    key: 'membership',
    icon: IdCard,
    img: membershipImg,
    pos: '50% 60%',
    Cards: MembershipCards,
  },
  {
    key: 'sponsorship',
    icon: HeartHandshake,
    img: sponsorshipImg,
    pos: '55% 50%',
    w: 1600,
    h: 1200,
    Cards: SponsorshipCards,
  },
  {
    key: 'waterwell',
    icon: Droplets,
    img: waterwellImg,
    pos: '45% 50%',
    Cards: WaterWellCards,
  },
  {
    key: 'qurbani',
    icon: Moon,
    img: qurbaniImg,
    pos: '60% 55%',
    Cards: QurbaniCards,
  },
  {
    key: 'school',
    icon: GraduationCap,
    img: schoolImg,
    pos: '50% 45%',
    Cards: SchoolCards,
    /** Unlaunched: left out of the carousel while in HIDDEN_PRODUCTS. */
    hidden: isHiddenProduct('school-management'),
  },
  {
    key: 'moneypool',
    icon: PiggyBank,
    img: moneypoolImg,
    pos: '45% 30%',
    Cards: MoneyPoolCards,
  },
];

/** Slides shown in the carousel (unlaunched products removed). */
const SLIDES = ALL_SLIDES.filter((s) => !s.hidden);

/* ------------------------------------------------------------------ */
/* Carousel                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Rolling carousel                                                    */
/*                                                                     */
/* `pos` is a continuous float: integer values are resting positions,  */
/* fractions are in-between frames. Each slide's offset from the centre */
/* is wrapped into [-N/2, N/2), so the strip loops forever without the  */
/* track ever jumping. Transforms are written straight to the DOM from  */
/* one requestAnimationFrame loop — React only re-renders when the     */
/* centred product changes.                                            */
/* ------------------------------------------------------------------ */

const N = SLIDES.length;
const HOLD_MS = 1850; // resting time per product
const MOVE_MS = 820; // roll duration (≈2.67s per product — about 27% faster than before)
const SNAP_MS = 480; // settle after a drag
const SIDE_SCALE = 0.8; // side cards sit behind the centre card at 80% size
/** Pixels dragged per product (kept independent of layout so dragging feels the same everywhere). */
const DRAG_UNIT = 0.37;
/**
 * Side-card distance from centre, as a fraction of card width, so each side card
 * peeks out exactly `peek` pixels beyond the centre card.
 */
const spreadFor = (cardWidth: number, peek: number) => (1 - SIDE_SCALE) / 2 + peek / Math.max(1, cardWidth);

/** Quartic in-out: quick, energetic middle with soft starts and landings. */
const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 4;
/** Smoothstep for position-driven effects (scale, tilt, zoom). */
const smooth = (x: number) => x * x * (3 - 2 * x);
const wrap = (x: number) => ((((x + N / 2) % N) + N) % N) - N / 2;
const mod = (x: number) => ((Math.round(x) % N) + N) % N;

function initialIndex() {
  if (typeof window === 'undefined') return 0;
  const key = new URLSearchParams(window.location.search).get('product');
  const i = SLIDES.findIndex((s) => s.key === key);
  return i >= 0 ? i : 0;
}

type Mode = 'hold' | 'move' | 'drag';

export default function ProductShowcase() {
  const t = useT('home');
  const slideName = (i: number) => t(`showcase.slides.${SLIDES[i].key}.name`);
  const start = useRef(initialIndex()).current;
  const [center, setCenter] = useState(start);

  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const uiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spread = useRef(0.56);

  const s = useRef({
    pos: start,
    mode: 'hold' as Mode,
    from: start,
    to: start,
    t0: 0,
    dur: MOVE_MS,
    ease: easeInOut,
    holdUntil: 0,
    // drag
    pointerId: -1,
    startX: 0,
    startPos: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    // pause reasons (never hover)
    reduced: false,
    hidden: false,
    keyboard: false,
    center: start,
  });

  /* Paint every slide for the current pos. */
  const paint = useCallback(() => {
    const st = s.current;
    for (let i = 0; i < N; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;
      const o = wrap(i - st.pos);
      const a = Math.abs(o);
      const m = smooth(Math.min(a, 1)); // 0 at centre → 1 at the side positions
      const scale = 1 - (1 - SIDE_SCALE) * m - 0.06 * Math.max(0, a - 1);
      // Side cards turn slightly towards the centre, so they swing forward as they arrive.
      const tilt = -Math.sign(o) * 9 * m;
      // Linear up to the side positions, then accelerate so the next-but-one card waits fully off-stage.
      const dist = spread.current * Math.min(a, 1) + 1.25 * Math.max(0, a - 1);
      el.style.transform = `translate3d(calc(-50% + ${Math.sign(o) * dist * 100}%), 0, 0) perspective(1400px) rotateY(${tilt}deg) scale(${scale})`;
      el.style.zIndex = String(100 - Math.round(a * 10));
      // Off-stage slides (beyond the side positions) are never visible, so wrapping is invisible.
      el.style.visibility = a > 2.2 ? 'hidden' : 'visible';
      const shade = shadeRefs.current[i];
      if (shade) shade.style.opacity = String(m * 0.42);
      // The photo settles from a slight zoom as it reaches the centre.
      const img = imgRefs.current[i];
      if (img) img.style.transform = `scale(${1 + 0.07 * m})`;
      const glow = glowRefs.current[i];
      if (glow) glow.style.opacity = String((1 - m) ** 2);
      const ui = uiRefs.current[i];
      if (ui) {
        const k = Math.max(0, 1 - a * 1.6);
        ui.style.opacity = String(k);
        ui.style.transform = `translate3d(0, ${(1 - k) * 12}px, 0)`;
      }
    }
    const c = mod(st.pos);
    if (c !== st.center) {
      st.center = c;
      setCenter(c);
    }
  }, []);

  const paused = () => {
    const st = s.current;
    return st.reduced || st.hidden || st.keyboard;
  };

  /* Animate pos to a target. */
  const moveTo = useCallback((to: number, dur: number, ease = easeInOut) => {
    const st = s.current;
    st.mode = 'move';
    st.from = st.pos;
    st.to = to;
    st.t0 = performance.now();
    st.dur = st.reduced ? 1 : dur;
    st.ease = ease;
  }, []);

  /* Main loop. */
  useEffect(() => {
    const st = s.current;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => (st.reduced = mq.matches);
    const syncHidden = () => (st.hidden = document.hidden);
    syncMotion();
    syncHidden();
    mq.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncHidden);

    st.holdUntil = performance.now() + HOLD_MS;
    let raf = 0;
    const tick = (now: number) => {
      if (st.mode === 'move') {
        const t = Math.min(1, (now - st.t0) / st.dur);
        st.pos = st.from + (st.to - st.from) * st.ease(t);
        if (t >= 1) {
          st.pos = st.to;
          st.mode = 'hold';
          st.holdUntil = now + HOLD_MS;
        }
        paint();
      } else if (st.mode === 'hold') {
        if (paused()) st.holdUntil = now + HOLD_MS;
        else if (now >= st.holdUntil) moveTo(Math.round(st.pos) + 1, MOVE_MS);
      }
      raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(() => {
      const stage = stageRef.current;
      const card = slideRefs.current[0];
      if (stage && card) spread.current = spreadFor(card.offsetWidth, (stage.offsetWidth - card.offsetWidth) / 2);
      paint();
    });
    if (stageRef.current) ro.observe(stageRef.current);
    paint();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncHidden);
    };
  }, [paint, moveTo]);

  /* Pointer drag (mouse, touch and pen). */
  const cardWidth = () => {
    const el = slideRefs.current[0];
    return el ? el.offsetWidth : 300;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const st = s.current;
    st.mode = 'drag';
    st.pointerId = e.pointerId;
    st.startX = st.lastX = e.clientX;
    st.lastT = performance.now();
    st.startPos = st.pos;
    st.velocity = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (st.mode !== 'drag' || e.pointerId !== st.pointerId) return;
    const now = performance.now();
    const w = cardWidth() * DRAG_UNIT;
    st.pos = st.startPos - (e.clientX - st.startX) / w;
    const dt = now - st.lastT;
    if (dt > 0) st.velocity = 0.8 * ((st.lastX - e.clientX) / w / dt) + 0.2 * st.velocity; // positions per ms
    st.lastX = e.clientX;
    st.lastT = now;
    paint();
  };

  const endDrag = (e: React.PointerEvent) => {
    const st = s.current;
    if (st.mode !== 'drag' || e.pointerId !== st.pointerId) return;
    st.pointerId = -1;
    // Project a short flick forward, then settle on the nearest product.
    const base = Math.round(st.startPos);
    const moved = st.pos - st.startPos;
    let target = Math.round(st.pos + st.velocity * 90);
    if (target === base && Math.abs(moved) > 0.12) target += moved > 0 ? 1 : -1;
    // Never travel further than the distance actually dragged (minimum one product).
    const maxSteps = Math.max(1, Math.round(Math.abs(moved)));
    target = Math.min(base + maxSteps, Math.max(base - maxSteps, target));
    moveTo(target, SNAP_MS, easeOut);
  };

  /* Keyboard: focusing the stage stops autoplay; arrows step through products. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const st = s.current;
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    moveTo(Math.round(st.mode === 'move' ? st.to : st.pos) + step, MOVE_MS * 0.7);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t('showcase.sectionLabel')}
      className="relative mx-auto w-full max-w-[560px]"
    >
      <div
        ref={stageRef}
        tabIndex={0}
        aria-label={t('showcase.stageLabel', { name: slideName(center), n: center + 1, total: N })}
        onKeyDown={onKeyDown}
        onFocus={(e) => {
          if (e.currentTarget.matches(':focus-visible')) s.current.keyboard = true;
        }}
        onBlur={() => (s.current.keyboard = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="ps-stage relative -mx-[22px] cursor-grab touch-pan-y select-none overflow-x-clip active:cursor-grabbing lg:-mx-10"
      >
        {/* Sizes the stage: the centre card keeps the original 560px, 4:5 / 5:6 frame. */}
        <div aria-hidden="true" className="pointer-events-none invisible mx-[22px] aspect-[4/5] sm:aspect-[5/6] lg:mx-10" />
        {SLIDES.map((sl, i) => {
          const { Cards } = sl;
          const isCenter = i === center;
          return (
            <div
              key={sl.key}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={t('showcase.slideLabel', { n: i + 1, total: N, name: slideName(i) })}
              aria-hidden={!isCenter}
              inert={!isCenter ? true : undefined}
              className="ps-slide absolute left-1/2 top-0 h-full w-[calc(100%-44px)] will-change-transform lg:w-[calc(100%-80px)]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.75)] ring-1 ring-white/10">
                <img
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  src={sl.img}
                  alt={t(`showcase.slides.${sl.key}.alt`)}
                  width={sl.w ?? 1600}
                  height={sl.h ?? 1067}
                  draggable={false}
                  loading={i === start || i === mod(start + 1) || i === mod(start - 1) ? 'eager' : 'lazy'}
                  fetchPriority={i === start ? 'high' : 'auto'}
                  decoding="async"
                  className="h-full w-full object-cover will-change-transform"
                  style={{ objectPosition: sl.pos }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-950/10" />
                <div
                  aria-hidden="true"
                  ref={(el) => {
                    shadeRefs.current[i] = el;
                  }}
                  className="absolute inset-0 bg-navy-950"
                  style={{ opacity: 0 }}
                />
              </div>
              {/* Centre focus: soft turquoise rim + deeper shadow, faded in by position. */}
              <div
                aria-hidden="true"
                ref={(el) => {
                  glowRefs.current[i] = el;
                }}
                className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[0_60px_120px_-45px_rgb(0_160_160/0.45)] ring-1 ring-brand-300/40"
                style={{ opacity: 0 }}
              />
              <div
                ref={(el) => {
                  uiRefs.current[i] = el;
                }}
                className="ps-ui absolute inset-0"
              >
                <Cards />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm">
        <span className="font-semibold text-white">{slideName(center)}</span>
      </div>
    </section>
  );
}
