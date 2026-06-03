/** Cookie preference key — must match cookie-consent.tsx */
export const COOKIE_STORAGE_KEY = 'ft-cookies-accepted';

export function getGtmId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return id || undefined;
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isGoogleTrackingConfigured(): boolean {
  return Boolean(getGtmId() || getGaMeasurementId());
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_STORAGE_KEY) === 'accepted';
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args as unknown as Record<string, unknown>);
}

/** Call after user accepts cookies or on return visit with stored consent */
export function grantAnalyticsConsent(): void {
  if (typeof window === 'undefined') return;
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
  });
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  const gaId = getGaMeasurementId();
  if (gaId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
}
