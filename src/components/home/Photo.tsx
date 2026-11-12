import React from 'react';

type PhotoProps = {
  src: string;
  /** Describe what the photo shows; pass "" only when it is purely decorative. */
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the crop. */
  pos?: string;
  /** Above-the-fold images load eagerly with high priority; everything else lazy-loads. */
  priority?: boolean;
  /** Wrapper classes: positioning (relative/absolute), size/aspect, radius, shadow. */
  className?: string;
  /** Optional overlay gradient classes (e.g. "bg-gradient-to-t from-navy-950/60 to-transparent"). */
  overlay?: string;
  children?: React.ReactNode;
};

/**
 * Reusable section photo: fixed intrinsic size (no layout shift), lazy loading
 * below the fold, rounded frame with an optional tinted overlay.
 */
export default function Photo({ src, alt, width, height, pos, priority = false, className = '', overlay, children }: PhotoProps) {
  return (
    <div className={`overflow-hidden bg-navy-900 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="h-full w-full object-cover"
        style={pos ? { objectPosition: pos } : undefined}
      />
      {overlay && <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${overlay}`} />}
      {children}
    </div>
  );
}
