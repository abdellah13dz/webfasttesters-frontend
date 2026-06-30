import {
  getAnalytics,
  isSupported,
  logEvent,
  setAnalyticsCollectionEnabled,
  type Analytics,
} from 'firebase/analytics';
import { getFirebaseApp, isFirebaseConfigured } from '@/lib/firebase';
import { hasAnalyticsConsent } from '@/lib/analytics-consent';

let analyticsInstance: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

export function isFirebaseAnalyticsConfigured(): boolean {
  return isFirebaseConfigured();
}

async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined' || !isFirebaseConfigured() || !hasAnalyticsConsent()) {
    return null;
  }

  if (analyticsInstance) return analyticsInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    if (!(await isSupported())) return null;

    const app = getFirebaseApp();
    if (!app) return null;

    analyticsInstance = getAnalytics(app);
    setAnalyticsCollectionEnabled(analyticsInstance, true);
    return analyticsInstance;
  })();

  return initPromise;
}

export async function enableFirebaseAnalytics(): Promise<void> {
  await initAnalytics();
}

export async function trackFirebasePageView(path: string): Promise<void> {
  const analytics = await initAnalytics();
  if (!analytics) return;

  logEvent(analytics, 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export async function trackFirebaseEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  const analytics = await initAnalytics();
  if (!analytics) return;

  logEvent(analytics, eventName, params);
}
