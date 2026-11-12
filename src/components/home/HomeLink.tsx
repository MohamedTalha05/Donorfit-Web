import React from 'react';
import { useModal } from '../../context/ModalContext.tsx';

type HomeLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/**
 * Real <a href> for internal routes (language-prefixed): keeps Cmd/Ctrl/middle-click working,
 * while plain clicks use the app's client-side navigateTo().
 */
export default function HomeLink({ to, onClick, children, ...rest }: HomeLinkProps) {
  const { navigateTo, localize } = useModal();
  return (
    <a
      href={localize(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigateTo(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
