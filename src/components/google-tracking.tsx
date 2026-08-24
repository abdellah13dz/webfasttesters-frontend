'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import {
  getGaMeasurementId,
  getGtmId,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  isGoogleTrackingConfigured,
  trackPageView,
} from '@/lib/google-tracking';

function PageViewTracker({ gaReady }: { gaReady: boolean }) {
  const { currentPath } = useRouter();

  useEffect(() => {
    try {
      if (!isGoogleTrackingConfigured()) return;
      if (!gaReady && getGaMeasurementId()) return;

      if (hasAnalyticsConsent()) {
        grantAnalyticsConsent();
      }

      trackPageView(currentPath);
    } catch {
      /* analytics must never crash the site */
    }
  }, [currentPath, gaReady]);

  return null;
}

/**
 * Loads GTM + GA4 gtag and logs page_view on route changes.
 * Mirrors the User Dashboard FirebaseAnalytics provider so marketing-site
 * visits appear in the same GA4 property.
 */
export function GoogleTracking() {
  const gtmId = getGtmId();
  const gaId = getGaMeasurementId();
  const useGa = Boolean(gaId);
  const [gaReady, setGaReady] = useState(!useGa);

  if (!gtmId && !useGa) return null;

  return (
    <>
      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            try {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            } catch (e) {}
          `}
        </Script>
      )}

      {useGa && (
        <>
          <Script
            id="google-gtag-js"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-4"
            strategy="afterInteractive"
            onReady={() => setGaReady(true)}
          >
            {`
              try {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  send_page_view: false,
                  linker: {
                    domains: ['fasttesters.com', 'www.fasttesters.com', 'app.fasttesters.com'],
                    accept_incoming: true
                  }
                });
              } catch (e) {}
            `}
          </Script>
        </>
      )}

      <PageViewTracker gaReady={gaReady} />

      {gtmId && (
        <noscript>
          <iframe
            title="Google Tag Manager"
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}
    </>
  );
}
