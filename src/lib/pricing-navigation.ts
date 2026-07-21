'use client';

import { useEffect } from 'react';

export const PRICING_SECTION_ID = 'pricing';

const SCROLL_KEY = 'ft-scroll-pricing-section';

export type PricingScrollTarget = 'home' | 'pricing';

export function scrollToPricingSection() {
  const el = document.getElementById(PRICING_SECTION_ID);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Homepage CTAs → home pricing block; all other site pages → pricing page cards section. */
export function goToGetStartedPricing(
  currentPath: string,
  navigate: (path: string) => void,
) {
  const target: PricingScrollTarget = currentPath === '/' ? 'home' : 'pricing';
  const targetPath = target === 'home' ? '/' : '/pricing';

  if (currentPath === targetPath) {
    scrollToPricingSection();
    return;
  }

  sessionStorage.setItem(SCROLL_KEY, target);
  navigate(targetPath);
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

    const timer = window.setTimeout(() => scrollToPricingSection(), 150);
    return () => clearTimeout(timer);
  }, [target]);
}
