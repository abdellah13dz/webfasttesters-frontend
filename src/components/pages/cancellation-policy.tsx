'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Ban,
  Clock,
  CreditCard,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  UserX,
  RefreshCw,
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
    icon: CreditCard,
    titleKey: 'cancellationPolicyPage.sections.noSubscriptions.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.noSubscriptions.p1',
      'cancellationPolicyPage.sections.noSubscriptions.p2',
      'cancellationPolicyPage.sections.noSubscriptions.p3',
    ],
  },
  {
    icon: Clock,
    titleKey: 'cancellationPolicyPage.sections.beforeTesting.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.beforeTesting.p1',
      'cancellationPolicyPage.sections.beforeTesting.p2',
      'cancellationPolicyPage.sections.beforeTesting.p3',
      'cancellationPolicyPage.sections.beforeTesting.p4',
    ],
  },
  {
    icon: Ban,
    titleKey: 'cancellationPolicyPage.sections.cannotCancel.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.cannotCancel.p1',
      'cancellationPolicyPage.sections.cannotCancel.p2',
      'cancellationPolicyPage.sections.cannotCancel.p3',
      'cancellationPolicyPage.sections.cannotCancel.p4',
    ],
  },
  {
    icon: RefreshCw,
    titleKey: 'cancellationPolicyPage.sections.vsRefunds.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.vsRefunds.p1',
      'cancellationPolicyPage.sections.vsRefunds.p2',
      'cancellationPolicyPage.sections.vsRefunds.p3',
    ],
  },
  {
    icon: UserX,
    titleKey: 'cancellationPolicyPage.sections.accountClosure.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.accountClosure.p1',
      'cancellationPolicyPage.sections.accountClosure.p2',
      'cancellationPolicyPage.sections.accountClosure.p3',
      'cancellationPolicyPage.sections.accountClosure.p4',
    ],
  },
  {
    icon: AlertTriangle,
    titleKey: 'cancellationPolicyPage.sections.chargebacks.title',
    paragraphKeys: [
      'cancellationPolicyPage.sections.chargebacks.p1',
      'cancellationPolicyPage.sections.chargebacks.p2',
      'cancellationPolicyPage.sections.chargebacks.p3',
    ],
  },
];

function legalText(t: (key: string) => string, key: string) {
  return t(key).replace(/\{brand\}/g, BRAND_NAME).replace(/\{entity\}/g, LEGAL_ENTITY_NAME);
}

export default function CancellationPolicyPage() {
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
              <Ban className="mr-1 h-3 w-3" />
              {t('cancellationPolicyPage.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.cancellationPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t('cancellationPolicyPage.lastUpdated')}: {t('cancellationPolicyPage.lastUpdatedDate')}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">
                {t('cancellationPolicyPage.noSubscriptions')}
              </span>
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
            {t('cancellationPolicyPage.backToHome')}
          </button>
        </div>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {legalText(t, 'cancellationPolicyPage.intro')}{' '}
              <button
                type="button"
                onClick={() => navigate('/refund-policy')}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                {t('cancellationPolicyPage.linkRefund')}
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => navigate('/terms-and-conditions')}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                {t('cancellationPolicyPage.linkTerms')}
              </button>
              .
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
                  <h2 className="text-lg font-semibold text-foreground mt-1.5">
                    {index + 1}. {t(section.titleKey)}
                  </h2>
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
                    {sectionConfig.length + 1}. {t('cancellationPolicyPage.contact.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t('cancellationPolicyPage.contact.description')}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                  <p className="text-sm text-muted-foreground mt-3">
                    {t('cancellationPolicyPage.contact.responseTime')}
                  </p>
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
          <Button variant="outline" onClick={() => navigate('/')} className="cursor-pointer">
            {t('cancellationPolicyPage.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}
