import React from 'react';
import { Globe2, MapPin, Navigation } from 'lucide-react';
import { useT } from '../../i18n/index.tsx';

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

/**
 * Homepage trust element: where the Donorfit platform is hosted.
 * Frankfurt, Germany was confirmed by the client on 2026-11-17 (the platform runs on Google Cloud,
 * app.donorfit.com sits behind a Google Cloud load balancer; the region is not visible from outside).
 * Deliberately makes no certification, uptime or GDPR claims. Text: home:hosting.
 */
export default function HostingLocation({ id = 'hosting-title' }: { id?: string }) {
  const t = useT('home');
  const tags = [
    { Icon: MapPin, text: t('hosting.city') },
    { Icon: Globe2, text: t('hosting.region') },
    { Icon: Navigation, text: t('hosting.coords') },
  ];

  return (
    <section aria-labelledby={id} className="py-10 sm:py-14">
      <div className={CONTAINER}>
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-white to-aqua ring-1 ring-brand-200 shadow-[0_24px_60px_-44px_rgb(0_24_64/0.45)]"
        >
          {/* faint dot grid, right side */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 w-2/3 opacity-60 [background-image:radial-gradient(rgb(0_24_64/0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_left,black,transparent)]"
          />

          <div className="grid items-center gap-7 p-6 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-8 lg:px-12 lg:py-10">
            {/* Location marker */}
            <div role="img" aria-label={t('hosting.graphicLabel')} className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0 sm:h-32 sm:w-32">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border border-brand-200" />
              <span aria-hidden="true" className="absolute inset-[18%] rounded-full border border-brand-300/70" />
              <span aria-hidden="true" className="absolute inset-[18%] rounded-full bg-brand-300/30 motion-safe:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span aria-hidden="true" className="absolute inset-[32%] flex items-center justify-center rounded-full bg-navy-950 text-brand-300 shadow-[0_10px_30px_-8px_rgb(0_24_64/0.6)]">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </span>
            </div>

            {/* Message */}
            <div className="min-w-0 text-center sm:text-left">
              <h2 id={id} className="text-2xl font-extrabold leading-tight text-navy-950 [text-wrap:balance] sm:text-3xl">
                {t('hosting.titleBefore')} <span className="text-brand-600">{t('hosting.highlight')}</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:mx-0 sm:text-base">{t('hosting.body')}</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                {tags.map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-950 ring-1 ring-brand-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
                    <span className="tabular-nums">{text}</span>
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
