'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { useAnalytics } from '@/lib/analytics';
import { APP_URL } from '@/lib/app-urls';

export function MobileStickyCta() {
  const { t } = useLanguage();
  const { currentPath } = useRouter();
  const { trackCta } = useAnalytics();
  const [footerVisible, setFooterVisible] = useState(false);

  // Don't show on admin, login, signup, or forgot-password pages
  const hiddenRoutes = ['/admin'];
  const shouldHide = hiddenRoutes.some(route => currentPath.startsWith(route));

  // Auto-hide when footer is in view so footer links stay clickable
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

  if (shouldHide || footerVisible) return null;

  const handleGetStarted = () => {
    trackCta('mobile_sticky_cta');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden safe-area-bottom safe-area-x">
      <div className="border-t border-border/40 bg-background/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
          {/* Left: Price & Trust */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-foreground">$15</span>
              <span className="text-xs text-muted-foreground">/app</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-400" />
              <span className="text-[10px] text-muted-foreground leading-tight">{t('mobileCta.guarantee')}</span>
            </div>
          </div>
          {/* Right: CTA Button */}
          {/* Right: CTA Button */}
          <Button
            asChild
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold h-10 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <a
              href={APP_URL}
              onClick={handleGetStarted}
              rel="noopener noreferrer"
            >
              <Zap className="mr-1.5 h-4 w-4" />
              {t('mobileCta.getStarted')}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
