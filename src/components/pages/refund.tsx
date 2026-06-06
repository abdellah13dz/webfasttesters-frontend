'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Shield,
  CheckCircle2,
  Mail,
  Clock,
  AlertTriangle,
  ArrowLeft,
  XCircle,
} from 'lucide-react';
import { LEGAL_ENTITY_NAME, BRAND_NAME } from '@/lib/business';

function legalText(t: (key: string) => string, key: string) {
  return t(key).replace('{brand}', BRAND_NAME).replace('{entity}', LEGAL_ENTITY_NAME);
}

export default function RefundPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const eligibilityItems = [
    'refundPolicyPage.eligibility.item1',
    'refundPolicyPage.eligibility.item2',
    'refundPolicyPage.eligibility.item3',
    'refundPolicyPage.eligibility.item4',
    'refundPolicyPage.eligibility.item5',
  ];

  const requestSteps = [
    'refundPolicyPage.request.step1',
    'refundPolicyPage.request.step2',
    'refundPolicyPage.request.step3',
    'refundPolicyPage.request.step4',
  ];

  const timelineItems = [
    { labelKey: 'refundPolicyPage.timeline.review.label', textKey: 'refundPolicyPage.timeline.review.text' },
    { labelKey: 'refundPolicyPage.timeline.confirmation.label', textKey: 'refundPolicyPage.timeline.confirmation.text' },
    { labelKey: 'refundPolicyPage.timeline.processing.label', textKey: 'refundPolicyPage.timeline.processing.text' },
    { labelKey: 'refundPolicyPage.timeline.method.label', textKey: 'refundPolicyPage.timeline.method.text' },
  ];

  const nonRefundableItems = [
    'refundPolicyPage.nonRefundable.item1',
    'refundPolicyPage.nonRefundable.item2',
    'refundPolicyPage.nonRefundable.item3',
    'refundPolicyPage.nonRefundable.item4',
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Shield className="mr-1 h-3 w-3" />
              {t('refundPolicyPage.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.refundPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t('refundPolicyPage.lastUpdated')}: {t('refundPolicyPage.lastUpdatedDate')}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{t('home.productionAccessGuarantee')}</span>
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
            {t('refundPolicyPage.backToHome')}
          </button>
        </div>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400 mb-2">
                  {t('home.productionAccessGuarantee')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.guaranteeHighlight')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {legalText(t, 'refundPolicyPage.intro')}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <XCircle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  1. {t('legal.cancellationPolicyTitle')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('legal.cancellationPolicyDesc')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.cancellationHowTo')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  2. {t('refundPolicyPage.eligibility.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.eligibility.intro')}
                </p>
                <ul className="space-y-2">
                  {eligibilityItems.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-muted-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  3. {t('refundPolicyPage.request.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.request.intro')}
                </p>
                <ul className="space-y-3">
                  {requestSteps.map((key, index) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                        {index + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  4. {t('refundPolicyPage.timeline.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.timeline.intro')}
                </p>
                <ul className="space-y-2">
                  {timelineItems.map((item) => (
                    <li key={item.labelKey} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-muted-foreground">
                        <strong className="text-foreground">{t(item.labelKey)}</strong> {t(item.textKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  5. {t('refundPolicyPage.nonRefundable.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('refundPolicyPage.nonRefundable.intro')}
                </p>
                <ul className="space-y-2">
                  {nonRefundableItems.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      <span className="text-sm text-muted-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">
                    6. {t('refundPolicyPage.contact.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t('refundPolicyPage.contact.description')}
                  </p>
                  <a
                    href="mailto:contact@fasttesters.com"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    contact@fasttesters.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="outline"
            onClick={() => navigate('/terms')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.termsAndConditions')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/privacy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.privacyPolicy')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            {t('refundPolicyPage.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}
