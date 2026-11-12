import React from 'react';
import { CreditCard, Calculator, Users, Globe2 } from 'lucide-react';
import BrandLogo from '../BrandLogo.tsx';
import { useTx } from '../../i18n/index.tsx';

/** Icons per group; titles and items come from home:integrations.groups (same order). */
const GROUP_ICONS = [CreditCard, Calculator, Users, Globe2];

type Group = { title: string; items: string[]; icon: typeof CreditCard };

function GroupCard({ g }: { g: Group }) {
  const Icon = g.icon;
  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <h3 className="text-sm font-bold text-neutral-900">{g.title}</h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {g.items.map((i) => (
          <li key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700" translate="no">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IntegrationHub() {
  const tx = useTx('home');
  const GROUPS: Group[] = tx<{ title: string; items: string[] }[]>('integrations.groups').map((g, i) => ({ ...g, icon: GROUP_ICONS[i] }));
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
      <div className="space-y-6">
        <GroupCard g={GROUPS[0]} />
        <GroupCard g={GROUPS[1]} />
      </div>

      {/* Hub illustration */}
      <div aria-hidden="true" className="relative mx-auto hidden h-72 w-72 lg:block">
        <svg viewBox="0 0 288 288" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="hub-glow">
              <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="144" cy="144" r="140" fill="url(#hub-glow)" />
          <circle cx="144" cy="144" r="128" fill="none" stroke="var(--color-brand-200)" strokeDasharray="2 6" />
          <circle cx="144" cy="144" r="92" fill="none" stroke="var(--color-brand-200)" />
          {/* connectors to the side cards */}
          <path d="M0 80 C 60 80, 70 130, 100 138" fill="none" stroke="var(--color-brand-300)" strokeWidth="1.5" />
          <path d="M0 208 C 60 208, 70 158, 100 150" fill="none" stroke="var(--color-brand-300)" strokeWidth="1.5" />
          <path d="M288 80 C 228 80, 218 130, 188 138" fill="none" stroke="var(--color-brand-300)" strokeWidth="1.5" />
          <path d="M288 208 C 228 208, 218 158, 188 150" fill="none" stroke="var(--color-brand-300)" strokeWidth="1.5" />
          {[[0, 80], [0, 208], [288, 80], [288, 208]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--color-brand-400)" />
          ))}
          {[[144, 16], [272, 144], [144, 272], [16, 144]].map(([x, y]) => (
            <circle key={`o-${x}-${y}`} cx={x} cy={y} r="3" fill="var(--color-brand-300)" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-brand-100 bg-white shadow-[0_20px_50px_-20px_rgb(0_122_128/0.45)]">
          <BrandLogo variant="icon" className="h-12" alt="" />
        </div>
      </div>

      <div className="space-y-6">
        <GroupCard g={GROUPS[2]} />
        <GroupCard g={GROUPS[3]} />
      </div>
    </div>
  );
}
