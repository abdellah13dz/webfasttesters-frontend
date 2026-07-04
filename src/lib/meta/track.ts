import { sendMetaServerEvent } from './capi-proxy';
import { getFbc, getFbp } from './cookies';
import { createMetaEventId } from './event-id';
import { initMetaPixel, trackMetaPixelEvent } from './pixel';
import { metaDebug } from './debug';
import type {
  MetaConsentChecker,
  MetaEventName,
  MetaTrackOptions,
  MetaUserDataInput,
} from './types';

let consentChecker: MetaConsentChecker | null = null;

/** Register consent gate (marketing site). Dashboard can omit for always-on tracking. */
export function setMetaConsentChecker(checker: MetaConsentChecker | null): void {
  consentChecker = checker;
}

export function hasMetaTrackingConsent(): boolean {
  if (!consentChecker) return true;
  return consentChecker.hasConsent();
}

function sanitizeCustomData(
  data?: Record<string, string | number | boolean | null | undefined>,
): Record<string, string | number | boolean> | undefined {
  if (!data) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'number' && Number.isNaN(value)) continue;
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function ensureMetaReady(userData?: MetaUserDataInput | null): boolean {
  if (!hasMetaTrackingConsent()) return false;
  return initMetaPixel(userData);
}

export function trackMetaEvent(
  eventName: MetaEventName,
  options: MetaTrackOptions = {},
): string | null {
  if (!hasMetaTrackingConsent()) return null;

  const eventId = options.eventId ?? createMetaEventId(eventName.toLowerCase());
  const customData = sanitizeCustomData(options.customData);

  if (!ensureMetaReady(options.userData)) return null;

  trackMetaPixelEvent(eventName, customData, eventId);

  if (options.serverMirror !== false) {
    void sendMetaServerEvent({
      eventName,
      eventId,
      userData: options.userData,
      customData,
      fbp: getFbp(),
      fbc: getFbc(),
    });
  }

  metaDebug('Tracked event', { eventName, eventId });
  return eventId;
}

export function trackMetaPageView(userData?: MetaUserDataInput | null): void {
  if (!hasMetaTrackingConsent()) return;
  const eventId = createMetaEventId('pageview');
  if (!ensureMetaReady(userData)) return;
  trackMetaPixelEvent('PageView', undefined, eventId);
  void sendMetaServerEvent({
    eventName: 'PageView',
    eventId,
    userData: userData ?? undefined,
    fbp: getFbp(),
    fbc: getFbc(),
  });
}

export function updateMetaUserData(userData?: MetaUserDataInput | null): void {
  if (!userData || !hasMetaTrackingConsent()) return;
  ensureMetaReady(userData);
}

export function trackMetaViewContent(
  contentName: string,
  options: MetaTrackOptions = {},
): string | null {
  return trackMetaEvent('ViewContent', {
    ...options,
    customData: {
      content_name: contentName,
      content_type: 'product',
      ...options.customData,
    },
  });
}

export function trackMetaLead(
  contentName: string,
  options: MetaTrackOptions = {},
): string | null {
  return trackMetaEvent('Lead', {
    ...options,
    customData: {
      content_name: contentName,
      ...options.customData,
    },
  });
}

export function trackMetaPurchase(
  params: {
    value: number;
    currency: string;
    orderId: string;
    numItems?: number;
    contentName?: string;
  },
  options: MetaTrackOptions = {},
): string | null {
  const { value, currency, orderId, numItems, contentName } = params;
  if (!value || value <= 0) return null;

  const eventId = options.eventId ?? `purchase_${orderId}`;
  return trackMetaEvent('Purchase', {
    ...options,
    eventId,
    serverMirror: options.serverMirror ?? true,
    customData: {
      value,
      currency: currency.toUpperCase(),
      order_id: orderId,
      content_type: 'product',
      num_items: numItems ?? 1,
      ...(contentName ? { content_name: contentName } : {}),
      ...options.customData,
    },
  });
}

export function trackMetaInitiateCheckout(
  params: {
    value: number;
    currency: string;
    orderId: string;
    numItems?: number;
    contentName?: string;
  },
  options: MetaTrackOptions = {},
): string | null {
  const { value, currency, orderId, numItems, contentName } = params;
  if (!value || value <= 0) return null;

  return trackMetaEvent('InitiateCheckout', {
    ...options,
    eventId: options.eventId ?? `checkout_${orderId}`,
    customData: {
      value,
      currency: currency.toUpperCase(),
      order_id: orderId,
      content_type: 'product',
      num_items: numItems ?? 1,
      ...(contentName ? { content_name: contentName } : {}),
      ...options.customData,
    },
  });
}

export { initMetaPixel, isMetaPixelInitialized } from './pixel';
export { createMetaEventId, purchaseEventId } from './event-id';

export { appendMetaCrossDomainParams, captureMetaParamsFromUrl } from './cross-domain';
export { captureFbclidFromUrl } from './cookies';
export { getMetaPixelId, isMetaPixelConfigured } from './config';
