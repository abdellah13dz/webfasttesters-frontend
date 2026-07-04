'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
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
import type { MetaUserDataInput } from '@meta-tracking/types';

interface MetaPixelProps {
  currentPath?: string;
  userData?: MetaUserDataInput | null;
  /** When false, pixel waits for consent before loading. */
  requireConsent?: boolean;
}

export function MetaPixel({
  currentPath,
  userData,
  requireConsent = false,
}: MetaPixelProps) {
  const pixelId = getMetaPixelId();
  const scriptReadyRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    captureFbclidFromUrl();
    captureMetaParamsFromUrl();
  }, []);

  useEffect(() => {
    if (!isMetaPixelConfigured() || !scriptReadyRef.current) return;
    if (requireConsent && !hasMetaTrackingConsent()) return;
    updateMetaUserData(userData);
  }, [userData, requireConsent]);

  useEffect(() => {
    if (!isMetaPixelConfigured() || !scriptReadyRef.current) return;
    if (requireConsent && !hasMetaTrackingConsent()) return;
    if (!currentPath || lastPathRef.current === currentPath) return;
    lastPathRef.current = currentPath;
    trackMetaPageView(userData ?? undefined);
  }, [currentPath, userData, requireConsent]);

  if (!pixelId) return null;

  const canLoad = !requireConsent || hasMetaTrackingConsent();

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
            onLoad={() => {
              scriptReadyRef.current = true;
              if (requireConsent && !hasMetaTrackingConsent()) return;
              initMetaPixel(userData ?? undefined);
              if (currentPath) {
                lastPathRef.current = currentPath;
                trackMetaPageView(userData ?? undefined);
              }
            }}
          />
        </>
      )}
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

/** Re-initialize pixel after cookie consent is granted (marketing site). */
export function activateMetaPixelAfterConsent(
  userData?: MetaUserDataInput | null,
  currentPath?: string,
): void {
  if (!isMetaPixelConfigured() || !hasMetaTrackingConsent()) return;

  if (typeof window !== 'undefined' && !window.fbq) {
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
}
