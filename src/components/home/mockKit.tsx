import React from 'react';
import { fmt, useT } from '../../i18n/index.tsx';

/** Locale-aware formatters that follow the active language (de: "48.320 €"). */
export const eur = (n: number) => fmt.eur(n);
export const eurCents = (n: number) => fmt.eurCents(n);
export const int = (n: number) => fmt.int(n);

/** Small pill that marks a product mockup as illustrative, not real customer data. */
export function SampleBadge({ className = '', label }: { className?: string; label?: string }) {
  const tc = useT('common');
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 ${className}`}
    >
      {label ?? tc('labels.sampleData')}
    </span>
  );
}

/** Light browser chrome around a product mockup. */
export function BrowserFrame({
  url,
  children,
  className = '',
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_40px_80px_-32px_rgb(23_23_23/0.28),0_0_0_1px_rgb(23_23_23/0.02)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-neutral-200/80 bg-neutral-50/90 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-1 text-[11px] text-neutral-500">
          <span className="truncate" translate="no">{url}</span>
        </div>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
