/** Cookie preference key — must match cookie-consent.tsx */
export const COOKIE_STORAGE_KEY = 'ft-cookies-accepted';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_STORAGE_KEY) === 'accepted';
}
