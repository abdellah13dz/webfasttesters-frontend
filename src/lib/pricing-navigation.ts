'use client';

import { useEffect } from 'react';
import { APP_URL } from '@/lib/app-urls';

/** Anchors the price card + Get Started Now CTA (centered in the viewport on scroll). */
export const PRICING_SECTION_ID = 'pricing';

const SCROLL_KEY = 'ft-scroll-pricing-section';

export type PricingScrollTarget = 'home' | 'pricing';

/** Scroll so the price card sits in the vertical center of the viewport. */
export function scrollToPricingSection() {
  const el = document.getElementById(PRICING_SECTION_ID);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const targetY = absoluteTop - window.innerHeight / 2 + rect.height / 2;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: 'smooth',
  });
}

/** BUY CTAs go to checkout on the app. Pricing page remains for people who want to confirm $15. */
export function goToGetStartedPricing(
  _currentPath: string,
  navigate: (path: string) => void,
) {
  navigate(APP_URL);
}

export function usePricingSectionScroll(target: PricingScrollTarget) {
  useEffect(() => {
    const pending = sessionStorage.getItem(SCROLL_KEY);
    const hashMatch = window.location.hash === `#${PRICING_SECTION_ID}`;
    const shouldScroll = hashMatch || pending === target;
    if (!shouldScroll) return;

    if (pending === target) {
      sessionStorage.removeItem(SCROLL_KEY);
    }

    let attempts = 0;
    let timer = 0;

    const tryScroll = () => {
      const el = document.getElementById(PRICING_SECTION_ID);
      if (el) {
        scrollToPricingSection();
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        timer = window.setTimeout(tryScroll, 50);
      }
    };

    // Wait for layout after route change + RouterProvider's scroll-to-top
    timer = window.setTimeout(tryScroll, 120);
    return () => clearTimeout(timer);
  }, [target]);
}
