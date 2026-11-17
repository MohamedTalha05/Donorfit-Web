/**
 * Retired URLs → their replacement routes (language-neutral; /de/… is mapped the same way).
 * Used by the router (ModalContext) and by scripts/prerender-routes.mjs, which writes a static
 * redirect page (canonical + meta refresh) for each one, because GitHub Pages cannot send 301s.
 * Keep this file free of imports so the build script can read it.
 */
export const LEGACY_ROUTE_REDIRECTS: Record<string, string> = {
  '/solutions/ngos': '/solutions/for-ngos',
  '/solutions/charities': '/solutions/for-charities',
  '/solutions/foundations': '/solutions/for-foundations',
  '/solutions/sponsorship-organizations': '/solutions/for-sponsorship-orgs',
  '/solutions/membership-organizations': '/solutions/for-membership-orgs',
  '/solutions/international-organizations': '/solutions/for-international-orgs',
  // Old recurring giving page (2026-11-14): replaced by the Recurring Management page.
  '/recurring-giving': '/recurring-management',
  // Donor Management page (2026-11-17): replaced by the Donor Portal page.
  '/donor-management': '/donor-portal',
};
