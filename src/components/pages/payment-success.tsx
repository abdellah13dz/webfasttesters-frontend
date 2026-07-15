'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { APP_SUBMIT_APP_URL } from '@/lib/app-urls';
import {
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  trackPageView,
} from '@/lib/google-tracking';

/** Brief pause so Google Ads / GTM conversion tags can fire before redirect. */
const REDIRECT_DELAY_MS = 2000;

function trackPurchaseConversion(
  transactionId: string | null,
  value: number | null,
  currency: string,
): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  const page = '/payment-success';
  const params: Record<string, string | number> = {
    page_path: page,
    page_location: window.location.href,
    currency,
    ...(transactionId ? { transaction_id: transactionId } : {}),
    ...(value !== null && value > 0 ? { value } : {}),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'purchase', ...params });

  if (window.gtag) {
    window.gtag('event', 'purchase', params);
  }
}

export function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const transactionId = searchParams.get('transaction_id');
    const valueRaw = searchParams.get('value');
    const currency = (searchParams.get('currency') || 'USD').toUpperCase();
    const parsedValue = valueRaw ? Number(valueRaw) : null;
    const value =
      parsedValue !== null && Number.isFinite(parsedValue) && parsedValue > 0
        ? parsedValue
        : null;

    if (hasAnalyticsConsent()) {
      grantAnalyticsConsent();
      trackPageView('/payment-success');
      trackPurchaseConversion(transactionId, value, currency);
    }

    const timer = window.setTimeout(() => {
      window.location.replace(APP_SUBMIT_APP_URL);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-9 w-9 text-emerald-400" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-white">Payment successful</h1>
        <p className="mt-3 text-sm text-gray-300">
          Thank you for your purchase. Your credits are ready — we&apos;re taking you to submit
          your app now.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span>Redirecting to submit app...</span>
        </div>
      </div>
    </section>
  );
}
