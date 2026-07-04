import { getMetaCapiProxyUrl } from './config';
import { metaDebug, metaWarn } from './debug';
import type { MetaCapiProxyPayload } from './types';

export async function sendMetaServerEvent(payload: MetaCapiProxyPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const url = getMetaCapiProxyUrl();
  const body = {
    ...payload,
    eventTime: payload.eventTime ?? Math.floor(Date.now() / 1000),
    eventSourceUrl: payload.eventSourceUrl ?? window.location.href,
    actionSource: payload.actionSource ?? 'website',
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
      keepalive: true,
    });

    if (!res.ok) {
      metaWarn('CAPI proxy failed', { status: res.status });
      return;
    }

    metaDebug('CAPI proxy sent', { eventName: payload.eventName, eventId: payload.eventId });
  } catch (error) {
    metaWarn('CAPI proxy error', error);
  }
}
