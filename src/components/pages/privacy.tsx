'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { CmsPageOrFallback } from '@/lib/hooks/use-cms-page';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Shield,
  UserCheck,
  Eye,
  Database,
  Lock,
  Cookie,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Scale,
  Globe,
  Clock,
  Baby,
  CreditCard,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { LEGAL_ENTITY_NAME, BRAND_NAME } from '@/lib/business';
import { CONTACT_EMAIL } from '@/lib/contact';

const sectionConfig: {
  icon: LucideIcon;
  titleKey: string;
  items: { subtitleKey: string; descriptionKey: string }[];
}[] = [
  {
    icon: Building2,
    titleKey: 'privacyPolicy.sections.whoWeAre.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.whoWeAre.dataController.subtitle',
        descriptionKey: 'privacyPolicy.sections.whoWeAre.dataController.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.whoWeAre.scope.subtitle',
        descriptionKey: 'privacyPolicy.sections.whoWeAre.scope.description',
      },
    ],
  },
  {
    icon: Database,
    titleKey: 'privacyPolicy.sections.informationWeCollect.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.personalInfo.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.personalInfo.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.appTestingData.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.appTestingData.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.usageData.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.usageData.description',
      },
    ],
  },
  {
    icon: Eye,
    titleKey: 'privacyPolicy.sections.howWeUse.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.provideServices.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.provideServices.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.improveServices.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.improveServices.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.communication.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.communication.description',
      },
    ],
  },
  {
    icon: UserCheck,
    titleKey: 'privacyPolicy.sections.dataSharing.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.noSelling.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.noSelling.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.testers.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.testers.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.serviceProviders.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.serviceProviders.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.stripe.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.stripe.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.legalRequirements.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.legalRequirements.description',
      },
    ],
  },
  {
    icon: Scale,
    titleKey: 'privacyPolicy.sections.legalBasis.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.contract.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.contract.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.legitimateInterests.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.legitimateInterests.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.legalObligation.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.legalObligation.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.consent.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.consent.description',
      },
    ],
  },
  {
    icon: Lock,
    titleKey: 'privacyPolicy.sections.dataSecurity.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.encryption.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.encryption.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.secureServers.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.secureServers.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.regularAudits.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.regularAudits.description',
      },
    ],
  },
  {
    icon: CheckCircle2,
    titleKey: 'privacyPolicy.sections.yourRights.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.access.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.access.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.delete.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.delete.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.modify.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.modify.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.portability.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.portability.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.object.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.object.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.restrict.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.restrict.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.complain.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.complain.description',
      },
    ],
  },
  {
    icon: Clock,
    titleKey: 'privacyPolicy.sections.dataRetention.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.account.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.account.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.transactions.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.transactions.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.testing.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.testing.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.support.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.support.description',
      },
    ],
  },
  {
    icon: Globe,
    titleKey: 'privacyPolicy.sections.internationalTransfers.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.internationalTransfers.global.subtitle',
        descriptionKey: 'privacyPolicy.sections.internationalTransfers.global.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.internationalTransfers.safeguards.subtitle',
        descriptionKey: 'privacyPolicy.sections.internationalTransfers.safeguards.description',
      },
    ],
  },
  {
    icon: Baby,
    titleKey: 'privacyPolicy.sections.childrenPrivacy.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.childrenPrivacy.ageRestriction.subtitle',
        descriptionKey: 'privacyPolicy.sections.childrenPrivacy.ageRestriction.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.childrenPrivacy.parentalContact.subtitle',
        descriptionKey: 'privacyPolicy.sections.childrenPrivacy.parentalContact.description',
      },
    ],
  },
  {
    icon: CreditCard,
    titleKey: 'privacyPolicy.sections.ccpa.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToKnow.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToKnow.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToDelete.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToDelete.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToOptOut.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToOptOut.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.nonDiscrimination.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.nonDiscrimination.description',
      },
    ],
  },
  {
    icon: Cookie,
    titleKey: 'privacyPolicy.sections.cookies.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.cookies.essentialOnly.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.essentialOnly.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.cookies.analytics.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.analytics.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.cookies.management.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.management.description',
      },
    ],
  },
  {
    icon: RefreshCw,
    titleKey: 'privacyPolicy.sections.changes.title',
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.changes.updates.subtitle',
        descriptionKey: 'privacyPolicy.sections.changes.updates.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.changes.materialChanges.subtitle',
        descriptionKey: 'privacyPolicy.sections.changes.materialChanges.description',
      },
    ],
  },
];

function legalText(t: (key: string) => string, key: string) {
  return t(key).replace(/\{brand\}/g, BRAND_NAME).replace(/\{entity\}/g, LEGAL_ENTITY_NAME);
}

function PrivacyPageContent() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Shield className="mr-1 h-3 w-3" />
              {t('privacyPolicy.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.privacyPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t('privacyPolicy.lastUpdated')}: {t('privacyPolicy.lastUpdatedDate')}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{t('privacyPolicy.gdprCompliant')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('privacyPolicy.backToHome')}
          </button>
        </div>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {legalText(t, 'privacyPolicy.intro')}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {sectionConfig.map((section, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mt-1.5">
                    {index + 1}. {t(section.titleKey)}
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  {section.items.map((item, pIndex) => (
                    <div key={pIndex}>
                      <h3 className="text-sm font-medium text-blue-400 mb-1">
                        {t(item.subtitleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {legalText(t, item.descriptionKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">
                    {sectionConfig.length + 1}. {t('privacyPolicy.contact.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t('privacyPolicy.contact.description')}
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
          <Button
            variant="outline"
            onClick={() => navigate('/terms-and-conditions')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.termsAndConditions')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/refund-policy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.refundPolicy')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/cancellation-policy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.cancellationPolicy')}
          </Button>
          <Button variant="outline" onClick={() => navigate('/')} className="cursor-pointer">
            {t('privacyPolicy.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <CmsPageOrFallback slug="privacy-policy" badge={t('privacyPolicy.cmsBadge')}>
      <PrivacyPageContent />
    </CmsPageOrFallback>
  );
}
