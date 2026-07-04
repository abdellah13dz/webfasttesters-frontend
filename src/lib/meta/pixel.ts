import { getMetaPixelId } from './config';
import { metaDebug } from './debug';
import { buildAdvancedMatchingParams } from './user-data';
import type { MetaUserDataInput } from './types';

let initialized = false;
let initPixelId: string | null = null;

function getFbq(): Window['fbq'] | null {
  if (typeof window === 'undefined') return null;
  return window.fbq ?? null;
}

export function isMetaPixelInitialized(): boolean {
  return initialized;
}

export function initMetaPixel(userData?: MetaUserDataInput | null): boolean {
  const pixelId = getMetaPixelId();
  if (!pixelId || typeof window === 'undefined') return false;

  const fbq = getFbq();
  if (!fbq) return false;

  if (initialized && initPixelId === pixelId) {
    if (userData) {
      const advanced = buildAdvancedMatchingParams(userData);
      if (Object.keys(advanced).length > 0) {
        fbq('init', pixelId, advanced);
      }
    }
    return true;
  }

  const advanced = buildAdvancedMatchingParams(userData);
  fbq('init', pixelId, advanced, { autoConfig: true });
  initialized = true;
  initPixelId = pixelId;
  metaDebug('Pixel initialized', { pixelId });
  return true;
}

export function trackMetaPixelEvent(
  eventName: string,
  customData?: Record<string, unknown>,
  eventId?: string,
): void {
  const fbq = getFbq();
  if (!fbq || !initialized) return;

  const payload = customData && Object.keys(customData).length > 0 ? customData : undefined;
  const options = eventId ? { eventID: eventId } : undefined;

  if (payload && options) {
    fbq('track', eventName, payload, options);
  } else if (payload) {
    fbq('track', eventName, payload);
  } else if (options) {
    fbq('track', eventName, {}, options);
  } else {
    fbq('track', eventName);
  }

  metaDebug('Pixel event', { eventName, eventId });
}

export function trackMetaPixelPageView(eventId?: string): void {
  trackMetaPixelEvent('PageView', undefined, eventId);
}
