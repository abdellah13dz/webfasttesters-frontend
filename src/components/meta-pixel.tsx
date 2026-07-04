'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getMetaPixelId,
  isMetaPixelConfigured,
  initMetaPixel,
  trackMetaPageView,
  updateMetaUserData,
  captureFbclidFromUrl,
  captureMetaParamsFromUrl,
  hasMetaTrackingConsent,
} from '@/lib/meta';
import type { MetaUserDataInput } from '@/lib/meta';

interface MetaPixelProps {
  currentPath?: string;
  userData?: MetaUserDataInput | null;
  /** When false, pixel waits for consent before loading. */
  requireConsent?: boolean;
}

function MetaPageViewTracker({
  currentPath,
  pixelReady,
  userData,
  requireConsent,
}: {
  currentPath?: string;
  pixelReady: boolean;
  userData?: MetaUserDataInput | null;
  requireConsent: boolean;
}) {
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pixelReady || !isMetaPixelConfigured()) return;
    if (requireConsent && !hasMetaTrackingConsent()) return;
    if (!currentPath || lastTrackedPathRef.current === currentPath) return;
    lastTrackedPathRef.current = currentPath;
    trackMetaPageView(userData ?? undefined);
  }, [currentPath, pixelReady, userData, requireConsent]);

  return null;
}

export function MetaPixel({
  currentPath,
  userData,
  requireConsent = false,
}: MetaPixelProps) {
  const pixelId = getMetaPixelId();
  const [pixelReady, setPixelReady] = useState(false);
  const [consentTick, setConsentTick] = useState(0);

  useEffect(() => {
    captureFbclidFromUrl();
    captureMetaParamsFromUrl();
  }, []);

  useEffect(() => {
    if (!requireConsent) return;
    const refresh = () => setConsentTick((n) => n + 1);
    window.addEventListener('ft-meta-consent', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('ft-meta-consent', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [requireConsent]);

  const canLoad = !requireConsent || hasMetaTrackingConsent();
  void consentTick;

  useEffect(() => {
    if (!pixelReady || !isMetaPixelConfigured()) return;
    if (requireConsent && !hasMetaTrackingConsent()) return;
    updateMetaUserData(userData);
  }, [userData, pixelReady, requireConsent]);

  const handlePixelReady = useCallback(() => {
    if (requireConsent && !hasMetaTrackingConsent()) return;
    initMetaPixel(userData ?? undefined);
    setPixelReady(true);
  }, [userData, requireConsent]);

  if (!pixelId) return null;

  return (
    <>
      {canLoad && (
        <>
          <Script id="meta-pixel-bootstrap" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window,document,'script');
            `}
          </Script>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            src="https://connect.facebook.net/en_US/fbevents.js"
            onReady={handlePixelReady}
            onLoad={handlePixelReady}
          />
        </>
      )}
      {canLoad && pixelReady ? (
        <MetaPageViewTracker
          currentPath={currentPath}
          pixelReady={pixelReady}
          userData={userData}
          requireConsent={requireConsent}
        />
      ) : null}
      {canLoad && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}

function installFbqBootstrap(): void {
  if (typeof window === 'undefined' || window.fbq) return;
  const stub = function (...args: unknown[]) {
    if (stub.callMethod) {
      stub.callMethod(...args);
    } else {
      stub.queue.push(args);
    }
  } as Window['fbq'] & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; loaded?: boolean; version?: string; push?: Window['fbq'] };
  stub.queue = [];
  stub.loaded = true;
  stub.version = '2.0';
  stub.push = stub;
  window.fbq = stub;
  window._fbq = stub;
}

/** Re-initialize pixel after cookie consent is granted (marketing site). */
export function activateMetaPixelAfterConsent(
  userData?: MetaUserDataInput | null,
  currentPath?: string,
): void {
  if (!isMetaPixelConfigured() || !hasMetaTrackingConsent()) return;

  installFbqBootstrap();

  if (typeof window !== 'undefined' && !document.getElementById('meta-pixel') && !document.getElementById('meta-pixel-deferred')) {
    const script = document.createElement('script');
    script.id = 'meta-pixel-deferred';
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.onload = () => {
      initMetaPixel(userData ?? undefined);
      trackMetaPageView(userData ?? undefined);
    };
    document.head.appendChild(script);
    return;
  }

  initMetaPixel(userData ?? undefined);
  trackMetaPageView(userData ?? undefined);
  window.dispatchEvent(new Event('ft-meta-consent'));
}
