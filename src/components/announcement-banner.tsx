'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { X } from 'lucide-react';
import { APP_URL } from '@/lib/app-urls';
import { fetchSiteSettings, DEFAULT_ANNOUNCEMENT_BANNER } from '@/lib/site-settings';

function bannerCtaHref(ctaLink?: string): string {
  if (!ctaLink || ctaLink === '/submit-app') return APP_URL;
  return ctaLink;
}

const BANNER_DISMISSED_KEY = 'ft-banner-dismissed';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getInitialVisibility(): boolean {
  if (typeof window === 'undefined') return false;
  const dismissedAt = localStorage.getItem(BANNER_DISMISSED_KEY);
  if (dismissedAt) {
    const elapsed = Date.now() - parseInt(dismissedAt, 10);
    if (elapsed < SEVEN_DAYS_MS) {
      return false;
    }
    localStorage.removeItem(BANNER_DISMISSED_KEY);
  }
  return true;
}

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(getInitialVisibility);
  const [dismissed, setDismissed] = useState(false);
  const [banner, setBanner] = useState(DEFAULT_ANNOUNCEMENT_BANNER);
  const { t } = useLanguage();
  const { navigate } = useRouter();

  useEffect(() => {
    (async () => {
      const settings = await fetchSiteSettings();
      if (settings?.announcementBanner) {
        setBanner(settings.announcementBanner);
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

  const handleCtaClick = useCallback(() => {
    navigate(bannerCtaHref(banner.ctaLink));
  }, [navigate, banner.ctaLink]);

  if (!visible || !banner.enabled) return null;

  return (
    <div
      className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all duration-300 ease-out overflow-hidden safe-area-x ${
        dismissed ? 'max-h-0 opacity-0' : 'max-h-24 sm:max-h-16 opacity-100 animate-banner-slide-down'
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {/* Message */}
          <p className="text-xs sm:text-sm font-medium leading-snug sm:truncate sm:flex-1 sm:min-w-0">
            {banner.message || t('banner.message')}
          </p>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:shrink-0">
            {/* CTA */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleCtaClick}
              className="shrink-0 text-xs sm:text-sm font-semibold underline underline-offset-2 hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded min-h-9 px-1"
            >
              {banner.ctaText || t('banner.cta')}
            </button>

            {/* Dismiss */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleDismiss}
              className="shrink-0 touch-target p-1 rounded hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
