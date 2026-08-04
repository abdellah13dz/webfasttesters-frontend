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

export function MobileStickyCta() {
  const { t } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { trackCta } = useAnalytics();
  const { primaryPlan } = usePricingPlans();
  const isLoggedIn = useAppLoggedIn();
  const [footerVisible, setFooterVisible] = useState(false);
  const [pricingInView, setPricingInView] = useState(false);

  const hiddenRoutes = ['/admin', '/submit-app', '/login', '/signup', '/forgot-password'];
  const isPricingPage = currentPath === '/pricing' || currentPath.startsWith('/pricing/');
  const shouldHideRoute = hiddenRoutes.some((route) => currentPath.startsWith(route));

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    const pricingEl =
      document.getElementById(PRICING_SECTION_ID) ||
      document.getElementById('pricing');
    if (!pricingEl) {
      setPricingInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPricingInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(pricingEl);
    return () => observer.disconnect();
  }, [currentPath]);

  if (shouldHideRoute || isLoggedIn || footerVisible || pricingInView) return null;

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
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      <div className="mobile-sticky-cta-bar border-t border-border/40 bg-background/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
          <div className="flex flex-col shrink-0 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-foreground">{priceLabel}</span>
              <span className="text-xs text-muted-foreground">/app</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-400 shrink-0" />
              <span className="text-[10px] text-muted-foreground leading-tight truncate">
                {t('mobileCta.subtitle')}
              </span>
            </div>
          </div>
          <Button
            onClick={handleGetStarted}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Zap className="mr-1.5 h-4 w-4" />
            {t('mobileCta.getStarted')}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
