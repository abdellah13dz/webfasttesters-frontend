/** Main CRM dashboard — use for Get Started / Sign Up CTAs */
export const APP_URL = 'https://app.fasttesters.com/';

/** Hostname shown in UI (browser chrome, copy, etc.) */
export const APP_HOST = 'app.fasttesters.com';

export const APP_LOGIN_URL = 'https://app.fasttesters.com/login';

/** @deprecated Use APP_URL for sign-up CTAs */
export const APP_REGISTER_URL = APP_URL;

export function isExternalUrl(path: string): boolean {
  return /^https?:\/\//.test(path);
}
