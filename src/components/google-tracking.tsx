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
    if (!isGoogleTrackingConfigured()) return;
    if (!gaReady && getGaMeasurementId()) return;

    if (hasAnalyticsConsent()) {
      grantAnalyticsConsent();
    }

    trackPageView(currentPath);
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
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('ft-cookies-accepted') === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            }
          } catch (e) {}
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
          <Script
            id="google-analytics-4"
            strategy="afterInteractive"
            onReady={() => setGaReady(true)}
          >
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
