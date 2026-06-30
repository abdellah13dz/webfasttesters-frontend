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

function trackFirebaseFromEvent(
  eventType: string,
  page: string,
  element?: string,
  metadata?: Record<string, string>
): void {
  if (!isFirebaseAnalyticsConfigured() || !hasAnalyticsConsent()) return;
  if (eventType === 'page_view') return;

  const params: Record<string, string> = { page_path: page, ...(metadata ?? {}) };
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

// Track a single analytics event
export async function trackEvent(eventType: string, page: string, element?: string, metadata?: Record<string, string>) {
  trackFirebaseFromEvent(eventType, page, element, metadata);

  try {
    await apiFetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        page,
        element: element || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
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

// Hook that tracks page views on route changes
export function useAnalytics() {
  const { currentPath } = useRouter();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    if (currentPath && currentPath !== lastTrackedPath.current) {
      lastTrackedPath.current = currentPath;
      // Debounce tracking slightly to avoid double-fires
      const timer = setTimeout(() => {
        trackPageView(currentPath);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPath]);

  const trackCta = useCallback((element: string, metadata?: Record<string, string>) => {
    trackCtaClick(currentPath, element, metadata);
  }, [currentPath]);

  const trackForm = useCallback((element: string, metadata?: Record<string, string>) => {
    trackFormSubmit(currentPath, element, metadata);
  }, [currentPath]);

  return { trackCta, trackForm, trackEvent };
}
