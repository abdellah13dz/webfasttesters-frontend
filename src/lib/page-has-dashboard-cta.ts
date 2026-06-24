/** Paths where the page already includes a primary CTA linking to the CRM dashboard. */
const PAGE_DASHBOARD_CTA_PATHS = new Set([
  '/',
  '/pricing',
  '/how-it-works',
  '/submit-app',
  '/reviews',
  '/case-studies',
  '/compare',
  '/about-us',
  '/referral-program',
  '/changelog',
  '/guides/publish-app-google-play',
  '/guides/enterprise-onboarding',
  '/blog/google-play-12-testers-policy',
]);

function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0]?.split('#')[0] ?? '/';
  if (path === '/') return '/';
  return path.replace(/\/$/, '');
}

export function pageHasDashboardCta(pathname: string): boolean {
  return PAGE_DASHBOARD_CTA_PATHS.has(normalizePath(pathname));
}

/** Footer CTA: skip when the page already has an in-page dashboard CTA or blog inline CTA. */
export function shouldShowFooterSubmitCta(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (pageHasDashboardCta(path)) return false;
  if (path === '/blog' || path.startsWith('/blog/')) return false;
  return true;
}
