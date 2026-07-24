/**
 * Detect whether the visitor is logged into app.fasttesters.com.
 *
 * The dashboard sets a non-secret `ft_logged_in` cookie with Domain=.fasttesters.com
 * on login (and clears it on logout). Marketing can read that flag but never the JWT.
 */

export const APP_LOGGED_IN_COOKIE = 'ft_logged_in';

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** True when the dashboard presence cookie is set. */
export function isAppLoggedIn(): boolean {
  const value = readCookie(APP_LOGGED_IN_COOKIE);
  return value === '1' || value === 'true';
}
