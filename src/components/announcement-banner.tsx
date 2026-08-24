'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { X } from 'lucide-react';
import { fetchSiteSettings, DEFAULT_ANNOUNCEMENT_BANNER } from '@/lib/site-settings';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { APP_DASHBOARD_URL } from '@/lib/app-urls';
import { useAppLoggedIn } from '@/lib/hooks/use-app-logged-in';

const BANNER_DISMISSED_KEY = 'ft-banner-dismissed';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function readBannerVisibility(): boolean {
  try {
    const dismissedAt = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < SEVEN_DAYS_MS) {
        return false;
      }
      localStorage.removeItem(BANNER_DISMISSED_KEY);
    }
    return true;
  } catch {
    return true;
  }
}

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [enabled, setEnabled] = useState(DEFAULT_ANNOUNCEMENT_BANNER.enabled);
  const { t, dir } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const isLoggedIn = useAppLoggedIn();

  useEffect(() => {
    setVisible(readBannerVisibility());

    (async () => {
      const settings = await fetchSiteSettings();
      if (settings?.announcementBanner) {
        setEnabled(settings.announcementBanner.enabled);
      }
    })();
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, Date.now().toString());
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, []);

  const handleCta = useCallback(() => {
    if (isLoggedIn) {
      navigate(APP_DASHBOARD_URL);
      return;
    }
    goToGetStartedPricing(currentPath, navigate);
  }, [isLoggedIn, currentPath, navigate]);

  if (!visible || !enabled) return null;

  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        dismissed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
      }`}
      dir={dir}
    >
      <div className="overflow-hidden">
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white safe-area-x safe-area-top animate-banner-slide-down">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="relative py-2.5 sm:py-2">
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleDismiss}
                className="absolute top-2 end-2 z-10 touch-target rounded p-1.5 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 sm:top-1/2 sm:-translate-y-1/2"
                aria-label={t('banner.dismiss')}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-2 pe-9 sm:flex-row sm:items-center sm:gap-4 sm:pe-12">
                <p
                  className="min-w-0 flex-1 text-start text-xs font-medium leading-relaxed sm:text-sm sm:leading-snug sm:truncate"
                  suppressHydrationWarning
                >
                  {t('banner.message')}
                </p>
                <button
                  type="button"
                  onClick={handleCta}
                  className="inline-flex min-h-9 shrink-0 items-center self-start text-xs font-semibold underline underline-offset-2 transition-colors hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 rounded sm:self-center sm:text-sm"
                  suppressHydrationWarning
                >
                  {isLoggedIn ? t('banner.dashboardCta') : t('banner.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
