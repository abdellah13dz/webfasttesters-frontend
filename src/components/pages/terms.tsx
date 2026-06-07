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
  FileText,
  Scale,
  Users,
  CreditCard,
  Shield,
  Brain,
  AlertTriangle,
  Ban,
  Gavel,
  Mail,
  ArrowLeft,
  XCircle,
  Building2,
  UserCheck,
  Truck,
  Handshake,
  type LucideIcon,
} from 'lucide-react';
import { LEGAL_ENTITY_NAME, BRAND_NAME } from '@/lib/business';
import { CONTACT_EMAIL } from '@/lib/contact';

const sectionConfig: {
  icon: LucideIcon;
  titleKey: string;
  paragraphKeys: string[];
}[] = [
  {
    icon: Building2,
    titleKey: 'termsPolicy.sections.about.title',
    paragraphKeys: [
      'termsPolicy.sections.about.p1',
      'termsPolicy.sections.about.p2',
      'termsPolicy.sections.about.p3',
    ],
  },
  {
    icon: Scale,
    titleKey: 'termsPolicy.sections.agreement.title',
    paragraphKeys: [
      'termsPolicy.sections.agreement.p1',
      'termsPolicy.sections.agreement.p2',
      'termsPolicy.sections.agreement.p3',
    ],
  },
  {
    icon: FileText,
    titleKey: 'termsPolicy.sections.definitions.title',
    paragraphKeys: [
      'termsPolicy.sections.definitions.p1',
      'termsPolicy.sections.definitions.p2',
      'termsPolicy.sections.definitions.p3',
      'termsPolicy.sections.definitions.p4',
      'termsPolicy.sections.definitions.p5',
    ],
  },
  {
    icon: Users,
    titleKey: 'termsPolicy.sections.services.title',
    paragraphKeys: [
      'termsPolicy.sections.services.p1',
      'termsPolicy.sections.services.p2',
      'termsPolicy.sections.services.p3',
      'termsPolicy.sections.services.p4',
    ],
  },
  {
    icon: UserCheck,
    titleKey: 'termsPolicy.sections.eligibility.title',
    paragraphKeys: [
      'termsPolicy.sections.eligibility.p1',
      'termsPolicy.sections.eligibility.p2',
      'termsPolicy.sections.eligibility.p3',
    ],
  },
  {
    icon: Users,
    titleKey: 'termsPolicy.sections.userAccounts.title',
    paragraphKeys: [
      'termsPolicy.sections.userAccounts.p1',
      'termsPolicy.sections.userAccounts.p2',
      'termsPolicy.sections.userAccounts.p3',
      'termsPolicy.sections.userAccounts.p4',
    ],
  },
  {
    icon: XCircle,
    titleKey: 'termsPolicy.sections.acceptableUse.title',
    paragraphKeys: [
      'termsPolicy.sections.acceptableUse.p1',
      'termsPolicy.sections.acceptableUse.p2',
      'termsPolicy.sections.acceptableUse.p3',
      'termsPolicy.sections.acceptableUse.p4',
      'termsPolicy.sections.acceptableUse.p5',
    ],
  },
  {
    icon: Truck,
    titleKey: 'termsPolicy.sections.orderFulfillment.title',
    paragraphKeys: [
      'termsPolicy.sections.orderFulfillment.p1',
      'termsPolicy.sections.orderFulfillment.p2',
      'termsPolicy.sections.orderFulfillment.p3',
      'termsPolicy.sections.orderFulfillment.p4',
    ],
  },
  {
    icon: CreditCard,
    titleKey: 'termsPolicy.sections.payment.title',
    paragraphKeys: [
      'termsPolicy.sections.payment.p1',
      'termsPolicy.sections.payment.p2',
      'termsPolicy.sections.payment.p3',
      'termsPolicy.sections.payment.p4',
      'termsPolicy.sections.payment.p5',
    ],
  },
  {
    icon: Ban,
    titleKey: 'termsPolicy.sections.cancellation.title',
    paragraphKeys: [
      'termsPolicy.sections.cancellation.p1',
      'termsPolicy.sections.cancellation.p2',
      'termsPolicy.sections.cancellation.p3',
      'termsPolicy.sections.cancellation.p4',
    ],
  },
  {
    icon: Shield,
    titleKey: 'termsPolicy.sections.guarantee.title',
    paragraphKeys: [
      'termsPolicy.sections.guarantee.p1',
      'termsPolicy.sections.guarantee.p2',
      'termsPolicy.sections.guarantee.p3',
      'termsPolicy.sections.guarantee.p4',
    ],
  },
  {
    icon: Brain,
    titleKey: 'termsPolicy.sections.intellectualProperty.title',
    paragraphKeys: [
      'termsPolicy.sections.intellectualProperty.p1',
      'termsPolicy.sections.intellectualProperty.p2',
      'termsPolicy.sections.intellectualProperty.p3',
      'termsPolicy.sections.intellectualProperty.p4',
    ],
  },
  {
    icon: AlertTriangle,
    titleKey: 'termsPolicy.sections.liability.title',
    paragraphKeys: [
      'termsPolicy.sections.liability.p1',
      'termsPolicy.sections.liability.p2',
      'termsPolicy.sections.liability.p3',
      'termsPolicy.sections.liability.p4',
      'termsPolicy.sections.liability.p5',
    ],
  },
  {
    icon: Handshake,
    titleKey: 'termsPolicy.sections.indemnification.title',
    paragraphKeys: [
      'termsPolicy.sections.indemnification.p1',
      'termsPolicy.sections.indemnification.p2',
    ],
  },
  {
    icon: AlertTriangle,
    titleKey: 'termsPolicy.sections.disclaimer.title',
    paragraphKeys: [
      'termsPolicy.sections.disclaimer.p1',
      'termsPolicy.sections.disclaimer.p2',
      'termsPolicy.sections.disclaimer.p3',
    ],
  },
  {
    icon: Ban,
    titleKey: 'termsPolicy.sections.termination.title',
    paragraphKeys: [
      'termsPolicy.sections.termination.p1',
      'termsPolicy.sections.termination.p2',
      'termsPolicy.sections.termination.p3',
      'termsPolicy.sections.termination.p4',
    ],
  },
  {
    icon: Gavel,
    titleKey: 'termsPolicy.sections.disputeResolution.title',
    paragraphKeys: [
      'termsPolicy.sections.disputeResolution.p1',
      'termsPolicy.sections.disputeResolution.p2',
      'termsPolicy.sections.disputeResolution.p3',
    ],
  },
  {
    icon: Gavel,
    titleKey: 'termsPolicy.sections.governingLaw.title',
    paragraphKeys: [
      'termsPolicy.sections.governingLaw.p1',
      'termsPolicy.sections.governingLaw.p2',
    ],
  },
  {
    icon: FileText,
    titleKey: 'termsPolicy.sections.generalProvisions.title',
    paragraphKeys: [
      'termsPolicy.sections.generalProvisions.p1',
      'termsPolicy.sections.generalProvisions.p2',
      'termsPolicy.sections.generalProvisions.p3',
      'termsPolicy.sections.generalProvisions.p4',
    ],
  },
];

function legalText(t: (key: string) => string, key: string) {
  return t(key).replace(/\{brand\}/g, BRAND_NAME).replace(/\{entity\}/g, LEGAL_ENTITY_NAME);
}

function TermsPageContent() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <FileText className="mr-1 h-3 w-3" />
              {t('termsPolicy.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.termsAndConditions')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t('termsPolicy.lastUpdated')}: {t('termsPolicy.lastUpdatedDate')}
            </p>
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
            {t('termsPolicy.backToHome')}
          </button>
        </div>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {legalText(t, 'termsPolicy.intro')}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {sectionConfig.map((section, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {index + 1}. {t(section.titleKey)}
                    </h2>
                  </div>
                </div>
                <div className="ml-14 space-y-3">
                  {section.paragraphKeys.map((key) => (
                    <p key={key} className="text-sm text-muted-foreground leading-relaxed">
                      {legalText(t, key)}
                    </p>
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
                    {sectionConfig.length + 1}. {t('termsPolicy.contact.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t('termsPolicy.contact.description')}
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
            onClick={() => navigate('/privacy-policy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.privacyPolicy')}
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
            {t('termsPolicy.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <CmsPageOrFallback slug="terms-and-conditions" badge={t('termsPolicy.cmsBadge')}>
      <TermsPageContent />
    </CmsPageOrFallback>
  );
}
