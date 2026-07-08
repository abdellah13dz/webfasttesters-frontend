import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import { utmToMetadata } from '@/lib/utm-tracking';

export const GA4_EVENTS = [
  'page_view',
  'hero_cta_click',
  'sticky_cta_click',
  'pricing_cta_click',
  'reviews_cta_click',
  'dashboard_demo_click',
  'signup_click',
  'login_click',
  'contact_form_start',
  'contact_form_submit',
  'faq_expand',
  'pricing_view',
  'reviews_view',
  'case_studies_view',
  'youtube_click',
  'trustpilot_click',
  'outbound_link_click',
  'funnel_cta_click',
  'funnel_signup_click',
  'newsletter_signup',
  'exit_intent_shown',
  'exit_intent_cta',
  'checklist_download',
] as const;

export type Ga4EventName = (typeof GA4_EVENTS)[number];

function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|iphone|android/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getBrowserName(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

function buildEventParams(
  page: string,
  extra?: Record<string, string | number | boolean | null | undefined>
): Record<string, string | number> {
  const params: Record<string, string | number> = {
    page,
    page_path: page,
    page_location: typeof window !== 'undefined' ? window.location.href : page,
    referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
    device: getDeviceType(),
    browser: getBrowserName(),
    timestamp: new Date().toISOString(),
    ...utmToMetadata(),
  };

  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (value !== null && value !== undefined) {
        params[key] = typeof value === 'boolean' ? (value ? '1' : '0') : value;
      }
    }
  }

  return params;
}

function pushDataLayer(event: string, params: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Send a GA4 custom event with standard attribution params. */
export function trackGa4Event(
  eventName: Ga4EventName | string,
  page: string,
  extra?: Record<string, string | number | boolean | null | undefined>
): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  const params = buildEventParams(page, extra);

  pushDataLayer(eventName, params);

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/** Map legacy cta_click element ids to GA4 event names. */
export function mapCtaToGa4Event(element: string): Ga4EventName | null {
  const map: Record<string, Ga4EventName> = {
    hero_cta: 'hero_cta_click',
    hero_reviews: 'reviews_cta_click',
    mobile_sticky_cta: 'sticky_cta_click',
    pricing_cta: 'pricing_cta_click',
    pricing_get_started: 'pricing_cta_click',
    pricing_bottom_cta: 'pricing_cta_click',
    sample_app_full_demo: 'dashboard_demo_click',
    full_demo_cta: 'dashboard_demo_click',
    dashboard_demo: 'dashboard_demo_click',
    signup: 'signup_click',
    login: 'login_click',
    view_all_stories: 'case_studies_view',
    bottom_cta: 'hero_cta_click',
    compare_get_started: 'signup_click',
  };
  return map[element] ?? null;
}

export const GA4_LINKED_DOMAINS = [
  'fasttesters.com',
  'www.fasttesters.com',
  'app.fasttesters.com',
];
