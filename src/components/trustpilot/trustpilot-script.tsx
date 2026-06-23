'use client';

import Script from 'next/script';
import { TRUSTPILOT_SCRIPT_URL } from '@/lib/trustpilot';

const readyCallbacks: Array<() => void> = [];

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, refresh?: boolean) => void;
    };
  }
}

export function onTrustpilotReady(callback: () => void) {
  if (typeof window !== 'undefined' && window.Trustpilot) {
    callback();
    return;
  }
  readyCallbacks.push(callback);
}

function flushReadyCallbacks() {
  while (readyCallbacks.length > 0) {
    const callback = readyCallbacks.shift();
    callback?.();
  }
}

export function TrustpilotScript() {
  return (
    <Script
      src={TRUSTPILOT_SCRIPT_URL}
      strategy="lazyOnload"
      onLoad={() => {
        flushReadyCallbacks();
      }}
    />
  );
}
