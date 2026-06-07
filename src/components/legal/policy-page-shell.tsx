'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Mail, type LucideIcon } from 'lucide-react';
import { BRAND_NAME, LEGAL_ENTITY_NAME } from '@/lib/business';
import { CONTACT_EMAIL } from '@/lib/contact';
import { BusinessLegalNotice } from '@/components/business-legal-notice';

export function legalText(t: (key: string) => string, key: string) {
  return t(key).replace(/\{brand\}/g, BRAND_NAME).replace(/\{entity\}/g, LEGAL_ENTITY_NAME);
}

export type PolicyItemBlock = {
  subtitleKey: string;
  descriptionKey: string;
};

export type PolicyItemsSection = {
  kind: 'items';
  id: string;
  icon: LucideIcon;
  titleKey: string;
  tocKey: string;
  items: PolicyItemBlock[];
  nestedCards?: boolean;
};

export type PolicyParagraphsSection = {
  kind: 'paragraphs';
  id: string;
  icon: LucideIcon;
  titleKey: string;
  tocKey: string;
  paragraphKeys?: string[];
  introKey?: string;
  bulletKeys?: string[];
};

export type PolicySection = PolicyItemsSection | PolicyParagraphsSection;

export type PolicyHighlightBanner = {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

export type PolicyFooterLink = {
  labelKey: string;
  path: string;
};

type PolicyPageShellProps = {
  badgeIcon: LucideIcon;
  badgeKey: string;
  titleKey: string;
  subtitleKey: string;
  lastUpdatedKey: string;
  lastUpdatedDateKey: string;
  highlightPill?: { icon: LucideIcon; labelKey: string };
  introKey: string;
  tableOfContentsKey: string;
  sections: PolicySection[];
  contactTitleKey: string;
  contactDescriptionKey: string;
  backToHomeKey: string;
  highlightBanner?: PolicyHighlightBanner;
  showBusinessNotice?: boolean;
  footerLinks: PolicyFooterLink[];
  children?: React.ReactNode;
};

function PolicySectionCard({
  section,
  index,
  t,
}: {
  section: PolicySection;
  index: number;
  t: (key: string) => string;
}) {
  const Icon = section.icon;

  return (
    <Card id={`section-${section.id}`} className="border-border/50 bg-card/50 scroll-mt-24">
      <CardContent className="p-6 sm:p-7">
        <div className="flex items-start gap-4 mb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mt-1.5">
            {index + 1}. {t(section.titleKey)}
          </h2>
        </div>

        <div className="ml-0 sm:ml-14 space-y-4">
          {section.kind === 'paragraphs' && section.introKey && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {legalText(t, section.introKey)}
            </p>
          )}

          {section.kind === 'paragraphs' &&
            section.paragraphKeys?.map((key) => (
              <p key={key} className="text-sm text-muted-foreground leading-relaxed">
                {legalText(t, key)}
              </p>
            ))}

          {section.kind === 'paragraphs' && section.bulletKeys && section.bulletKeys.length > 0 && (
            <ul className="space-y-2">
              {section.bulletKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {legalText(t, key)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {section.kind === 'items' &&
            (section.nestedCards
              ? section.items.map((item) => (
                  <div
                    key={item.subtitleKey}
                    className="rounded-lg border border-border/50 bg-background/50 p-4"
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      {t(item.subtitleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {legalText(t, item.descriptionKey)}
                    </p>
                  </div>
                ))
              : section.items.map((item) => (
                  <div key={item.subtitleKey}>
                    <h3 className="text-sm font-medium text-blue-400 mb-1">{t(item.subtitleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {legalText(t, item.descriptionKey)}
                    </p>
                  </div>
                )))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PolicyPageShell({
  badgeIcon: BadgeIcon,
  badgeKey,
  titleKey,
  subtitleKey,
  lastUpdatedKey,
  lastUpdatedDateKey,
  highlightPill,
  introKey,
  tableOfContentsKey,
  sections,
  contactTitleKey,
  contactDescriptionKey,
  backToHomeKey,
  highlightBanner,
  showBusinessNotice = true,
  footerLinks,
  children,
}: PolicyPageShellProps) {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const HighlightIcon = highlightBanner?.icon;
  const PillIcon = highlightPill?.icon;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <BadgeIcon className="mr-1 h-3 w-3" />
              {t(badgeKey)}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t(titleKey)}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {legalText(t, subtitleKey)}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t(lastUpdatedKey)}: {t(lastUpdatedDateKey)}
            </p>
            {highlightPill && PillIcon && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
                <PillIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">{t(highlightPill.labelKey)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t(backToHomeKey)}
          </button>
        </div>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Info className="h-5 w-5" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{legalText(t, introKey)}</p>
            </div>
          </CardContent>
        </Card>

        {showBusinessNotice && (
          <Card className="border-border/50 bg-card/50 mb-8">
            <CardContent className="p-6">
              <BusinessLegalNotice variant="footer" />
            </CardContent>
          </Card>
        )}

        {highlightBanner && HighlightIcon && (
          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <HighlightIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-400 mb-2">
                    {t(highlightBanner.titleKey)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {legalText(t, highlightBanner.descriptionKey)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {children}

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t(tableOfContentsKey)}</h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section, index) => {
                const TocIcon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#section-${section.id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-blue-400 hover:bg-blue-500/5 transition-colors"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                      <TocIcon className="h-3.5 w-3.5" />
                    </div>
                    <span>
                      {index + 1}. {t(section.tocKey)}
                    </span>
                  </a>
                );
              })}
              <a
                href="#section-contact"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-blue-400 hover:bg-blue-500/5 transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span>
                  {sections.length + 1}. {t(contactTitleKey)}
                </span>
              </a>
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <PolicySectionCard key={section.id} section={section} index={index} t={t} />
          ))}

          <Card id="section-contact" className="border-blue-500/20 bg-blue-500/5 scroll-mt-24">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">
                    {sections.length + 1}. {t(contactTitleKey)}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t(contactDescriptionKey)}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 opacity-30" />

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          {footerLinks.map((link) => (
            <Button
              key={link.path}
              variant="outline"
              onClick={() => navigate(link.path)}
              className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
            >
              {t(link.labelKey)}
            </Button>
          ))}
          <Button variant="outline" onClick={() => navigate('/')} className="cursor-pointer">
            {t(backToHomeKey)}
          </Button>
        </div>
      </section>
    </div>
  );
}

export const POLICY_FOOTER_LINKS = {
  terms: { labelKey: 'footer.termsAndConditions', path: '/terms-and-conditions' },
  privacy: { labelKey: 'footer.privacyPolicy', path: '/privacy-policy' },
  refund: { labelKey: 'footer.refundPolicy', path: '/refund-policy' },
  cancellation: { labelKey: 'footer.cancellationPolicy', path: '/cancellation-policy' },
  cookie: { labelKey: 'footer.cookiePolicy', path: '/cookie-policy' },
} as const;
