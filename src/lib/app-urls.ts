/** Main CRM dashboard — use for Get Started / Sign Up CTAs */
export const APP_URL = 'https://app.fasttesters.com/';

/** Logged-in user home in the CRM app */
export const APP_DASHBOARD_URL = 'https://app.fasttesters.com/dashboard';

/** Dashboard submit-app page — post-payment destination */
export const APP_SUBMIT_APP_URL = 'https://app.fasttesters.com/dashboard/submit-app';

/** Interactive full-screen closed testing dashboard demo */
export const APP_DEMO_URL = 'https://app.fasttesters.com/demo';

/** Play Console closed-testing setup guide with screenshots and video */
export const APP_SETUP_GUIDE_URL = 'https://app.fasttesters.com/guide/app-setup';

export function openAppDemo(): void {
  if (typeof window === 'undefined') return;
  window.open(APP_DEMO_URL, '_blank', 'noopener,noreferrer');
}

export function openAppSetupGuide(): void {
  if (typeof window === 'undefined') return;
  window.open(APP_SETUP_GUIDE_URL, '_blank', 'noopener,noreferrer');
}

/** Free testers community — peer-to-peer closed testing help */
export const COMMUNITY_URL = 'https://community.fasttesters.com/';

/** Hostname shown in UI (browser chrome, copy, etc.) */
export const APP_HOST = 'app.fasttesters.com';

export const COMMUNITY_HOST = 'community.fasttesters.com';

export const APP_LOGIN_URL = 'https://app.fasttesters.com/login';

/** @deprecated Use APP_URL for sign-up CTAs */
export const APP_REGISTER_URL = APP_URL;

export function isExternalUrl(path: string): boolean {
  return /^https?:\/\//.test(path);
}
