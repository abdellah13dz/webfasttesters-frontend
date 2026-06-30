'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { grantAnalyticsConsent, trackPageView as trackGooglePageView } from '@/lib/google-tracking';
import { trackPageView } from '@/lib/analytics';

const STORAGE_KEY = 'ft-cookies-accepted';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const { t } = useLanguage();
  const { navigate } = useRouter();

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const preference = localStorage.getItem(STORAGE_KEY);
    if (!preference) {
      // Small delay for smoother appearance after page load
      const timer = setTimeout(() => {
        setVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // On mobile, push the cookie bar above the footer when footer is visible
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
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    grantAnalyticsConsent();
    trackGooglePageView(window.location.pathname);
    trackPageView(window.location.pathname);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/cookie-policy');
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-x-0 z-40 p-3 sm:p-6 transition-all duration-300 ${footerVisible ? 'bottom-16 md:bottom-6' : 'bottom-0'}`}>
      <Card className="mx-auto max-w-3xl border-border/60 bg-card/95 backdrop-blur-md shadow-xl">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
          {/* Text content */}
          <div className="flex-1 space-y-1">
            <p className="text-sm text-foreground leading-relaxed">
              {t('cookies.message')}{' '}
              <button
                type="button"
                onClick={handleLearnMore}
                className="text-blue-500 underline underline-offset-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {t('cookies.learnMore')}
              </button>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t('cookies.decline')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-blue-500 text-xs text-white hover:bg-blue-600 sm:text-sm cursor-pointer"
            >
              {t('cookies.acceptAll')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
