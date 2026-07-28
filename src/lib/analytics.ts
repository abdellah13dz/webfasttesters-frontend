'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from '@/lib/router';
import { getPublicApiBase } from '@/lib/api';
import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import { trackGa4Event, mapCtaToGa4Event, type Ga4EventName } from '@/lib/ga4-events';
import { utmToMetadata } from '@/lib/utm-tracking';

const VISITOR_KEY = 'ft_vid';
const SESSION_KEY = 'ft_sid';
const PAGE_VIEW_DEDUPE_PREFIX = 'ft_pv:';

const ANALYTICS_FLUSH_MS = 8000;
const ANALYTICS_MAX_BATCH = 20;

type QueuedAnalyticsEvent = {
  eventType: string;
  page: string;
  element: string | null;
  metadata: Record<string, string> | null;
  visitorId: string | null;
  sessionId: string | null;
  referrer: string | null;
  language: string | null;
};

const analyticsQueue: QueuedAnalyticsEvent[] = [];
let analyticsFlushTimer: ReturnType<typeof setTimeout> | null = null;
let analyticsFlushInFlight = false;

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ft_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateStorageId(storage: Storage, key: string): string {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const id = createId();
    storage.setItem(key, id);
    return id;
  } catch {
    return createId();
  }
}

function getVisitorContext() {
  if (typeof window === 'undefined') {
    return {
      visitorId: null as string | null,
      sessionId: null as string | null,
      referrer: null as string | null,
      language: null as string | null,
    };
  }

  return {
    visitorId: getOrCreateStorageId(window.localStorage, VISITOR_KEY),
    sessionId: getOrCreateStorageId(window.sessionStorage, SESSION_KEY),
    referrer: document.referrer || null,
    language: navigator.language || null,
  };
}

function isLikelyBot(): boolean {
  if (typeof navigator === 'undefined') return true;
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pagespeed/i.test(
    navigator.userAgent
  );
}

function shouldSendPageViewToBackend(page: string): boolean {
  try {
    const key = `${PAGE_VIEW_DEDUPE_PREFIX}${page}`;
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
    return true;
  } catch {
    return true;
  }
}

function scheduleAnalyticsFlush(): void {
  if (analyticsFlushTimer !== null) return;
  analyticsFlushTimer = setTimeout(() => {
    analyticsFlushTimer = null;
    void flushAnalyticsQueue();
  }, ANALYTICS_FLUSH_MS);
}

async function postAnalyticsPayload(body: string): Promise<void> {
  const init: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  };

  try {
    const sameOrigin = await fetch('/api/analytics', init);
    if (sameOrigin.ok || sameOrigin.status === 429) return;
    if (sameOrigin.status !== 404) return;
  } catch {
    // try direct API below
  }

  try {
    await fetch(`${getPublicApiBase()}/api/analytics`, init);
  } catch {
    // Silently fail
  }
}

async function flushAnalyticsQueue(): Promise<void> {
  if (analyticsFlushInFlight || analyticsQueue.length === 0) return;
  analyticsFlushInFlight = true;

  const batch = analyticsQueue.splice(0, ANALYTICS_MAX_BATCH);
  try {
    await postAnalyticsPayload(JSON.stringify({ events: batch }));
  } catch {
    // Silently fail - analytics should never break the site
  } finally {
    analyticsFlushInFlight = false;
    if (analyticsQueue.length > 0) {
      scheduleAnalyticsFlush();
    }
  }
}

function enqueueBackendAnalytics(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
): void {
  if (typeof window === 'undefined' || isLikelyBot()) return;

  if (eventType === 'page_view' && !shouldSendPageViewToBackend(page)) {
    return;
  }

  const context = getVisitorContext();
  analyticsQueue.push({
    eventType,
    page,
    element: element || null,
    metadata: { ...(metadata || {}), ...utmToMetadata() },
    visitorId: context.visitorId,
    sessionId: context.sessionId,
    referrer: context.referrer,
    language: context.language,
  });

  if (analyticsQueue.length >= ANALYTICS_MAX_BATCH) {
    if (analyticsFlushTimer !== null) {
      clearTimeout(analyticsFlushTimer);
      analyticsFlushTimer = null;
    }
    void flushAnalyticsQueue();
    return;
  }

  scheduleAnalyticsFlush();
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => {
    if (analyticsQueue.length === 0) return;
    const batch = analyticsQueue.splice(0, ANALYTICS_MAX_BATCH);
    const body = JSON.stringify({ events: batch });
    try {
      if (navigator.sendBeacon) {
        const sent = navigator.sendBeacon(
          '/api/analytics',
          new Blob([body], { type: 'application/json' })
        );
        if (sent) return;
      }
      void postAnalyticsPayload(body);
    } catch {
      // ignore
    }
  });
}

function forwardToGa4(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
): void {
  if (!hasAnalyticsConsent()) return;

  if (eventType === 'page_view') {
    // GA4 page_view is owned by GoogleTracking (avoids double-counting and
    // matches the dashboard: hits fire even before cookie accept via Consent Mode).
    return;
  }

  if (eventType === 'cta_click' && element) {
    const ga4Event = mapCtaToGa4Event(element);
    if (ga4Event) {
      trackGa4Event(ga4Event, page, { element, ...metadata });
    }
    if (element.includes('signup') || element.includes('get_started') || element === 'hero_cta' || element === 'bottom_cta') {
      trackGa4Event('funnel_cta_click', page, { element, ...metadata });
    }
    if (element.includes('signup') || element === 'hero_cta' || element === 'bottom_cta' || element === 'pricing_cta') {
      trackGa4Event('funnel_signup_click', page, { element, ...metadata });
    }
    return;
  }

  if (eventType === 'form_submit' && element === 'contact_form') {
    trackGa4Event('contact_form_submit', page, metadata);
    return;
  }

  if (eventType === 'form_start' && element === 'contact_form') {
    trackGa4Event('contact_form_start', page, metadata);
    return;
  }

  trackGa4Event(eventType as Ga4EventName, page, { element: element ?? '', ...metadata });
}

// Track a single analytics event
export async function trackEvent(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
) {
  forwardToGa4(eventType, page, element, metadata);
  enqueueBackendAnalytics(eventType, page, element, metadata);
}

// Track page view
export function trackPageView(page: string) {
  return trackEvent('page_view', page);
}

// Track CTA click
export function trackCtaClick(page: string, element: string, metadata?: Record<string, string>) {
  return trackEvent('cta_click', page, element, metadata);
}

// Track form submission
export function trackFormSubmit(page: string, element: string, metadata?: Record<string, string>) {
  return trackEvent('form_submit', page, element, metadata);
}

// Track form interaction start
export function trackFormStart(page: string, element: string, metadata?: Record<string, string>) {
  return trackEvent('form_start', page, element, metadata);
}

// Track FAQ accordion expand
export function trackFaqExpand(page: string, questionId: string) {
  return trackEvent('faq_expand', page, questionId);
}

// Hook that tracks page views on route changes
export function useAnalytics() {
  const { currentPath } = useRouter();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    if (currentPath && currentPath !== lastTrackedPath.current) {
      lastTrackedPath.current = currentPath;
      const timer = setTimeout(() => {
        trackPageView(currentPath);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPath]);

  const trackCta = useCallback(
    (element: string, metadata?: Record<string, string>, ga4Override?: Ga4EventName) => {
      if (ga4Override && hasAnalyticsConsent()) {
        trackGa4Event(ga4Override, currentPath, { element, ...metadata });
      }
      trackCtaClick(currentPath, element, metadata);
    },
    [currentPath]
  );

  const trackForm = useCallback(
    (element: string, metadata?: Record<string, string>) => {
      trackFormSubmit(currentPath, element, metadata);
    },
    [currentPath]
  );

  const trackFormInteractionStart = useCallback(
    (element: string, metadata?: Record<string, string>) => {
      trackFormStart(currentPath, element, metadata);
    },
    [currentPath]
  );

  const trackFaq = useCallback(
    (questionId: string) => {
      trackFaqExpand(currentPath, questionId);
    },
    [currentPath]
  );

  return { trackCta, trackForm, trackFormInteractionStart, trackFaq, trackEvent };
}

export { trackGa4Event };
