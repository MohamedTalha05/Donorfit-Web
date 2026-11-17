import React from 'react';
import { useT } from '../i18n/index.tsx';
import { CONTENT_PHOTOS, type ContentPhotoKey } from '../data/contentPhotos.ts';

/** A rounded 4:3 (or wider) photograph used inside page sections. Lazy-loaded; alt text from photos.json. */
export default function ContentPhoto({
  photo,
  aspect = 'aspect-[4/3]',
  className = '',
}: {
  photo: ContentPhotoKey;
  aspect?: string;
  className?: string;
}) {
  const t = useT('photos');
  const p = CONTENT_PHOTOS[photo];
  return (
    <figure className={`overflow-hidden rounded-[1.75rem] bg-soft shadow-[0_30px_60px_-40px_rgb(0_24_64/0.5)] ${className}`}>
      <img
        src={p.src}
        alt={t(photo)}
        width={p.w}
        height={p.h}
        loading="lazy"
        decoding="async"
        className={`${aspect} h-auto w-full object-cover`}
        style={{ objectPosition: p.pos }}
      />
    </figure>
  );
}
