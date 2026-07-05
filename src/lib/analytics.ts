'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from '@/lib/router';
import { apiFetch } from '@/lib/api';
import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import {
  isFirebaseAnalyticsConfigured,
  trackFirebaseEvent,
  trackFirebasePageView,
} from '@/lib/firebase-analytics';
import { trackGa4Event, mapCtaToGa4Event, type Ga4EventName } from '@/lib/ga4-events';
import { utmToMetadata } from '@/lib/utm-tracking';
import { trackPageView as trackGaPageView } from '@/lib/google-tracking';

const VISITOR_KEY = 'ft_vid';
const SESSION_KEY = 'ft_sid';

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

function trackFirebaseFromEvent(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
): void {
  if (!isFirebaseAnalyticsConfigured() || !hasAnalyticsConsent()) return;
  if (eventType === 'page_view') return;

  const params: Record<string, string> = { page_path: page, ...(metadata ?? {}), ...utmToMetadata() };
  if (element) params.element = element;

  if (eventType === 'cta_click') {
    void trackFirebaseEvent('select_content', {
      content_type: 'cta',
      item_id: element ?? 'unknown',
      ...params,
    });
    return;
  }

  if (eventType === 'form_submit') {
    void trackFirebaseEvent('form_submit', {
      form_id: element ?? 'unknown',
      ...params,
    });
    return;
  }

  void trackFirebaseEvent(eventType, params);
}

function forwardToGa4(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
): void {
  if (!hasAnalyticsConsent()) return;

  if (eventType === 'page_view') {
    trackGa4Event('page_view', page, metadata);
    trackGaPageView(page);
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
  trackFirebaseFromEvent(eventType, page, element, metadata);

  try {
    const context = getVisitorContext();
    await apiFetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        page,
        element: element || null,
        metadata: { ...(metadata || null), ...utmToMetadata() },
        visitorId: context.visitorId,
        sessionId: context.sessionId,
        referrer: context.referrer,
        language: context.language,
      }),
    });
  } catch {
    // Silently fail - analytics should never break the site
  }
}

// Track page view
export function trackPageView(page: string) {
  if (hasAnalyticsConsent()) {
    void trackFirebasePageView(page);
  }
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
