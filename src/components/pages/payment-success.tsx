'use client';

import { useEffect, useRef } from 'react';
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
const PURCHASE_TRACKED_PREFIX = 'ft_mkt_purchase_tracked_';

function hasPurchaseBeenTracked(transactionId: string): boolean {
  if (typeof window === 'undefined' || !transactionId) return false;
  try {
    return sessionStorage.getItem(`${PURCHASE_TRACKED_PREFIX}${transactionId}`) === '1';
  } catch {
    return false;
  }
}

function markPurchaseTracked(transactionId: string): void {
  if (typeof window === 'undefined' || !transactionId) return;
  try {
    sessionStorage.setItem(`${PURCHASE_TRACKED_PREFIX}${transactionId}`, '1');
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Marketing-site conversion beacon for Ads/GTM.
 * Only fires when transaction_id + value are present (completed checkout redirect).
 * Deduped per transaction so React Strict Mode / reloads cannot double-count.
 */
function trackPurchaseConversion(
  transactionId: string | null,
  value: number | null,
  currency: string,
): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  if (!transactionId || value === null || value <= 0) return;
  if (hasPurchaseBeenTracked(transactionId)) return;

  markPurchaseTracked(transactionId);

  const page = '/payment-success';
  const params: Record<string, string | number> = {
    page_path: page,
    page_location: window.location.href,
    currency,
    transaction_id: transactionId,
    value,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'purchase', ...params });

  if (window.gtag) {
    window.gtag('event', 'purchase', params);
  }
}

export function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

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
    <section className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/15">
          <CheckCircle2 className="h-9 w-9 text-emerald-600 dark:text-emerald-400" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for your purchase. Your credits have been added to your account and are ready
          to use.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden />
          <span>Redirecting you to submit your app...</span>
        </div>
      </div>
    </section>
  );
}
