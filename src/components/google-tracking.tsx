'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import {
  getGaMeasurementId,
  getGtmId,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  isGoogleTrackingConfigured,
  trackPageView,
} from '@/lib/google-tracking';

export function GoogleTracking() {
  const gtmId = getGtmId();
  const gaId = getGaMeasurementId();
  // Always load gtag.js when a GA4 id resolves so window.gtag is defined and
  // events reach GA4 directly (mirrors the User Dashboard setup).
  const useGa = Boolean(gaId);
  const { currentPath } = useRouter();

  useEffect(() => {
    if (!isGoogleTrackingConfigured()) return;
    if (hasAnalyticsConsent()) {
      grantAnalyticsConsent();
      trackPageView(currentPath);
    }
  }, [currentPath]);

  if (!gtmId && !useGa) return null;

  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {useGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-4" strategy="afterInteractive">
            {`
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
            `}
          </Script>
        </>
      )}

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
