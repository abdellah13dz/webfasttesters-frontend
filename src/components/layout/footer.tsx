'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { NewsletterSection } from '@/components/newsletter-section';
import { useSiteNavigation } from '@/lib/hooks/use-site-navigation';
import { resolveNavLabel, resolveSectionTitle, FALLBACK_NAVIGATION } from '@/lib/navigation';
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/contact';
import { BrandLogo } from '@/components/brand-logo';
import { BusinessLegalNotice } from '@/components/business-legal-notice';
import { LEGAL_ENTITY_NAME } from '@/lib/business';
import { Facebook, Instagram } from 'lucide-react';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';

export function Footer() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const navigation = useSiteNavigation();
  const footerSections = navigation.footerSections?.length ? navigation.footerSections : FALLBACK_NAVIGATION.footerSections;
  const footerLegal = navigation.footerLegal?.length ? navigation.footerLegal : FALLBACK_NAVIGATION.footerLegal;

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(path);
  };

  return (
    <footer className="border-t border-border/40 bg-background mt-auto relative safe-area-x">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 md:pb-0">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1 mb-2 sm:mb-4 lg:mb-0 min-w-0 w-full">
            <button
              type="button"
              suppressHydrationWarning
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center gap-2 mb-4 cursor-pointer"
            >
              <BrandLogo size="md" />
              <span className="text-lg font-bold">{t('footer.brandName')}</span>
            </button>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t('footer.helpingDevelopers')} {t('footer.appsPublished')}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse-blue" />
                {t('footer.successRate')}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            
          </div>

          {/* Link Columns */}
          {footerSections.map((section, index) => (
            <div key={section.titleKey || section.title || index}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{resolveSectionTitle(section, t)}</h3>
              <ul className="space-y-0.5">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={(e) => handleNavClick(e, link.path)}
                      className="text-sm text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer w-full text-left py-2 px-2 -mx-2 rounded-md hover:bg-blue-500/5 active:bg-blue-500/10 min-h-[44px] flex items-center"
                    >
                      {resolveNavLabel(link, t)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        

        {/* Business & customer service (Stripe website verification) */}
        <div className="border-t border-border/40 py-6">
          <BusinessLegalNotice />
        </div>

        {/* Newsletter Row */}
        <div className="flex gap-5 items-center justify-between flex-col lg:flex-row w-full border-t border-border/40 py-6">
          <NewsletterSection
            variant="inline"
            title={t('footer.newsletterTitle')}
          />
          <TrustpilotWidget className="w-full md:max-w-sm lg:max-w-md mx-auto" variant="compact" align="start" />

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left safe-area-bottom">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            © {new Date().getFullYear()} {LEGAL_ENTITY_NAME}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 order-1 sm:order-2 sm:gap-x-4">
            {footerLegal.map((link) => (
              <button
                type="button"
                suppressHydrationWarning
                key={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-xs text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer hover:underline underline-offset-2 min-h-[32px] flex items-center"
              >
                {resolveNavLabel(link, t)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
