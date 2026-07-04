import { getMetaPixelId } from './config';
import { metaDebug, metaWarn } from './debug';
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

/** Attempt init before each track — fbq stub queues calls before fbevents.js finishes loading. */
function ensurePixelReady(userData?: MetaUserDataInput | null): boolean {
  if (!getMetaPixelId()) return false;
  if (initialized) return true;
  return initMetaPixel(userData ?? undefined);
}

export function trackMetaPixelEvent(
  eventName: string,
  customData?: Record<string, unknown>,
  eventId?: string,
  userData?: MetaUserDataInput | null,
): boolean {
  if (!ensurePixelReady(userData)) {
    metaWarn('Pixel not ready — browser event skipped', { eventName, eventId });
    return false;
  }

  const fbq = getFbq();
  if (!fbq) {
    metaWarn('fbq unavailable — browser event skipped', { eventName, eventId });
    return false;
  }

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
  return true;
}

export function trackMetaPixelPageView(eventId?: string, userData?: MetaUserDataInput | null): boolean {
  return trackMetaPixelEvent('PageView', undefined, eventId, userData);
}
