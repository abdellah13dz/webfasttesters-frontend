'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { useAnalytics } from '@/lib/analytics';
import { goToGetStartedPricing, PRICING_SECTION_ID } from '@/lib/pricing-navigation';
import { usePricingPlans } from '@/lib/hooks/use-pricing-plans';
import { formatPlanPrice } from '@/lib/pricing';
import { useAppLoggedIn } from '@/lib/hooks/use-app-logged-in';
import { APP_URL } from '@/lib/app-urls';

/**
 * Mobile-only purchase CTA fixed to the bottom of the viewport.
 * Hidden on desktop (md+), admin/auth routes, when logged in, or when the
 * pricing card / footer is clearly in view (avoids covering the real CTA).
 */
export function MobileStickyCta() {
  const { t } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { trackCta } = useAnalytics();
  const { primaryPlan } = usePricingPlans();
  const isLoggedIn = useAppLoggedIn();
  const [hideForFooter, setHideForFooter] = useState(false);
  const [hideForPricing, setHideForPricing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hiddenRoutes = ['/admin', '/submit-app', '/login', '/signup', '/forgot-password'];
  const isPricingPage = currentPath === '/pricing' || currentPath.startsWith('/pricing/');
  const shouldHideRoute = hiddenRoutes.some((route) => currentPath.startsWith(route));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset hide flags on navigation so a previous page's intersection state
  // cannot keep the bar invisible after a client-side route change.
  useEffect(() => {
    setHideForFooter(false);
    setHideForPricing(false);

    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only hide when a meaningful share of the footer is on screen
        setHideForFooter(entry.isIntersecting && entry.intersectionRatio >= 0.15);
      },
      { threshold: [0, 0.15, 0.3], rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    setHideForPricing(false);

    const pricingEl =
      document.getElementById(PRICING_SECTION_ID) ||
      document.getElementById('pricing');
    if (!pricingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideForPricing(entry.isIntersecting && entry.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25, 0.5], rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(pricingEl);
    return () => observer.disconnect();
  }, [currentPath]);

  if (!mounted) return null;
  if (shouldHideRoute || isLoggedIn || hideForFooter || hideForPricing) return null;

  const priceLabel = primaryPlan ? formatPlanPrice(primaryPlan) : '$15';

  const handleGetStarted = () => {
    trackCta('mobile_sticky_cta');
    if (isPricingPage) {
      navigate(APP_URL);
      return;
    }
    goToGetStartedPricing(currentPath, navigate);
  };

  return (
    <div
      data-mobile-sticky-cta
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] md:hidden"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="mobile-sticky-cta-bar pointer-events-auto border-t border-border/50 bg-background/95 backdrop-blur-lg shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
          <div className="flex min-w-0 shrink-0 flex-col">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-foreground">{priceLabel}</span>
              <span className="text-xs text-muted-foreground">/app</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 shrink-0 text-blue-400" aria-hidden />
              <span className="truncate text-[10px] leading-tight text-muted-foreground">
                {t('mobileCta.subtitle')}
              </span>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleGetStarted}
            className="h-11 flex-1 bg-blue-500 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98]"
          >
            <Zap className="mr-1.5 h-4 w-4" aria-hidden />
            {t('mobileCta.getStarted')}
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
