import { COOKIE_STORAGE_KEY, hasAnalyticsConsent } from '@/lib/analytics-consent';

export { COOKIE_STORAGE_KEY, hasAnalyticsConsent };

export function getGtmId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return id || undefined;
}

/**
 * GA4 measurement ID for the site. Prefer the explicit GA id, but fall back to
 * the Firebase measurement ID so the website reports to the same GA4 stream as
 * the User Dashboard (enables unified realtime + cross-domain user stitching).
 */
export function getGaMeasurementId(): string | undefined {
  const id =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isGoogleTrackingConfigured(): boolean {
  return Boolean(getGtmId() || getGaMeasurementId());
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type Gtag = (...args: unknown[]) => void;

/** Ensure window.gtag exists and queues to dataLayer (same pattern as the dashboard). */
export function ensureGtag(): Gtag | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!Array.isArray(window.dataLayer)) {
      window.dataLayer = [];
    }
    if (typeof window.gtag !== 'function') {
      window.gtag = (...args: unknown[]) => {
        try {
          window.dataLayer!.push(args);
        } catch {
          /* analytics must never crash the site */
        }
      };
    }
    return window.gtag;
  } catch {
    return null;
  }
}

/** Call after user accepts cookies or on return visit with stored consent */
export function grantAnalyticsConsent(): void {
  try {
    const gtag = ensureGtag();
    if (!gtag) return;
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  } catch {
    /* analytics must never crash the site */
  }
}

/**
 * Send a GA4 page_view via gtag only.
 * Do not also push `page_view` to dataLayer — GTM would send a second hit
 * to the same GA4 property (G-X2WLH2X771).
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  try {
    const gaId = getGaMeasurementId();
    const gtag = ensureGtag();
    if (gaId && gtag) {
      gtag('event', 'page_view', {
        send_to: gaId,
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  } catch {
    /* analytics must never crash the site */
  }
}
