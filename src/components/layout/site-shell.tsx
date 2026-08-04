'use client';

import React from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { FixedSiteHeader } from '@/components/layout/fixed-site-header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider, useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useMetaPageEvents } from '@/hooks/use-meta-page-events';
import { BackToTop } from '@/components/back-to-top';
import { FloatingChat } from '@/components/floating-chat';
import { CookieConsent } from '@/components/cookie-consent';
import { GoogleTracking } from '@/components/google-tracking';
import { MetaPixel } from '@/components/meta-pixel';
import { MobileStickyCta } from '@/components/mobile-sticky-cta';
import { PageProgress } from '@/components/page-progress';
import { RouteLoadingBar } from '@/components/route-loading-bar';
import { useSeo } from '@/lib/hooks/use-seo';
import { useUtmInit } from '@/hooks/use-utm-init';
import { ExitIntentPopup } from '@/components/exit-intent-popup';

function SiteShellInner({ children }: { children: React.ReactNode }) {
  const { dir } = useLanguage();
  const { currentPath } = useRouter();

  useSeo();
  useAnalytics();
  useMetaPageEvents();
  useUtmInit();

  return (
    <div className="min-h-screen flex flex-col" dir={dir} suppressHydrationWarning>
      <a
        href="#main-content"
        className="absolute left-4 top-0 z-[100] -translate-y-full rounded-md bg-background px-4 py-2 text-sm font-medium shadow-lg outline-none ring-2 ring-blue-500 transition-transform focus:translate-y-4"
      >
        Skip to main content
      </a>
      <GoogleTracking />
      <MetaPixel currentPath={currentPath} requireConsent />
      <RouteLoadingBar />
      <PageProgress />
      <FixedSiteHeader />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-clip mobile-cta-spacer md:pb-0" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
      <FloatingChat />
      <CookieConsent />
      <MobileStickyCta />
      <ExitIntentPopup />
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RouterProvider>
        <SiteShellInner>{children}</SiteShellInner>
      </RouterProvider>
    </LanguageProvider>
  );
}
