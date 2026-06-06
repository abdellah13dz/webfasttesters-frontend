'use client';

import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  LayoutDashboard,
  Phone,
  UserCog,
  Zap,
  Calendar,
  Briefcase,
} from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <UserCog className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.step1Title',
    descriptionKey: 'guideEnterprise.step1Description',
    detailKeys: [
      'guideEnterprise.step1Detail1',
      'guideEnterprise.step1Detail2',
      'guideEnterprise.step1Detail3',
      'guideEnterprise.step1Detail4',
    ],
  },
  {
    number: 2,
    icon: <Briefcase className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.step2Title',
    descriptionKey: 'guideEnterprise.step2Description',
    detailKeys: [
      'guideEnterprise.step2Detail1',
      'guideEnterprise.step2Detail2',
      'guideEnterprise.step2Detail3',
      'guideEnterprise.step2Detail4',
    ],
  },
  {
    number: 3,
    icon: <LayoutDashboard className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.step3Title',
    descriptionKey: 'guideEnterprise.step3Description',
    detailKeys: [
      'guideEnterprise.step3Detail1',
      'guideEnterprise.step3Detail2',
      'guideEnterprise.step3Detail3',
      'guideEnterprise.step3Detail4',
    ],
  },
];

const benefits = [
  {
    icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.benefit1Title',
    descriptionKey: 'guideEnterprise.benefit1Desc',
  },
  {
    icon: <Zap className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.benefit2Title',
    descriptionKey: 'guideEnterprise.benefit2Desc',
  },
  {
    icon: <Headphones className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.benefit3Title',
    descriptionKey: 'guideEnterprise.benefit3Desc',
  },
  {
    icon: <UserCog className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guideEnterprise.benefit4Title',
    descriptionKey: 'guideEnterprise.benefit4Desc',
  },
];

const pricingTiers = [
  {
    rangeKey: 'guideEnterprise.tier1Range',
    priceKey: 'guideEnterprise.tier1Price',
    priceNoteKey: 'guideEnterprise.tier1PriceNote',
    featureKeys: [
      'guideEnterprise.tier1Feature1',
      'guideEnterprise.tier1Feature2',
      'guideEnterprise.tier1Feature3',
      'guideEnterprise.tier1Feature4',
    ],
    highlighted: false,
    isCustom: false,
  },
  {
    rangeKey: 'guideEnterprise.tier2Range',
    priceKey: 'guideEnterprise.tier2Price',
    priceNoteKey: 'guideEnterprise.tier2PriceNote',
    featureKeys: [
      'guideEnterprise.tier2Feature1',
      'guideEnterprise.tier2Feature2',
      'guideEnterprise.tier2Feature3',
      'guideEnterprise.tier2Feature4',
    ],
    highlighted: true,
    isCustom: false,
  },
  {
    rangeKey: 'guideEnterprise.tier3Range',
    priceKey: 'guideEnterprise.tier3Price',
    priceNoteKey: 'guideEnterprise.tier3PriceNote',
    featureKeys: [
      'guideEnterprise.tier3Feature1',
      'guideEnterprise.tier3Feature2',
      'guideEnterprise.tier3Feature3',
      'guideEnterprise.tier3Feature4',
      'guideEnterprise.tier3Feature5',
    ],
    highlighted: false,
    isCustom: true,
  },
];

export default function GuideEnterprisePage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <Building2 className="mr-1 size-3" />
              {t('guideEnterprise.heroBadge')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              <Clock className="mr-1 size-3" />
              {t('guideEnterprise.heroBadgeSetup')}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('guideEnterprise.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('guideEnterprise.heroTitleHighlight')}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('guideEnterprise.heroDescription')}
          </p>

          {/* Timeline */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Zap className="size-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-foreground">{t('guideEnterprise.heroTimelineSteps')}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-foreground">{t('guideEnterprise.heroTimelineSetup')}</span>
            </div>
          </div>

          {/* Alert */}
          <Alert className="mt-8 border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20">
            <Phone className="size-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200/80 text-sm">
              <strong className="text-blue-900 dark:text-blue-300">{t('guideEnterprise.alertTitle')}</strong>{' '}
              {t('guideEnterprise.alertText')}
              <button
                onClick={() => navigate('/contact-us')}
                className="ml-1 text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300"
              >
                {t('guideEnterprise.alertLink')}
              </button>
            </AlertDescription>
          </Alert>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('pricing.getStartedNow')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/contact-us')}
            >
              <Phone className="mr-2 size-4" />
              {t('guideEnterprise.ctaBookCall')}
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              {t('guideEnterprise.gettingStartedBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('guideEnterprise.stepsTitle').replace(t('guideEnterprise.stepsHighlight'), '')}
              <span className="text-blue-600 dark:text-blue-400">{t('guideEnterprise.stepsHighlight')}</span>
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={step.number} className="border-border bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {t('setupGuide.stepLabel')} {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t(step.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t(step.descriptionKey)}</p>
                      <ul className="space-y-2">
                        {step.detailKeys.map((detailKey) => (
                          <li key={detailKey} className="flex items-start gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                            {t(detailKey)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="flex justify-center -mt-3 mb-3">
                    <ChevronRight className="size-5 text-muted-foreground rotate-90" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            {t('guideEnterprise.benefitsBadge')}
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            {t('guideEnterprise.benefitsTitle').replace(t('guideEnterprise.benefitsHighlight'), '')}
            <span className="text-blue-600 dark:text-blue-400">{t('guideEnterprise.benefitsHighlight')}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t('guideEnterprise.benefitsSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.titleKey} className="border-border bg-card/50 group hover:border-blue-500/20 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(benefit.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(benefit.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              {t('guideEnterprise.pricingBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('guideEnterprise.pricingTitle').replace(t('guideEnterprise.pricingHighlight'), '')}
              <span className="text-blue-600 dark:text-blue-400">{t('guideEnterprise.pricingHighlight')}</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {t('guideEnterprise.pricingSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.rangeKey}
                className={`relative border-border bg-card/50 flex flex-col ${
                  tier.highlighted
                    ? 'border-blue-300 dark:border-blue-500/30 bg-blue-100/50 dark:bg-blue-950/10 ring-1 ring-blue-300/50 dark:ring-blue-500/20'
                    : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white border-0 px-3 text-xs">
                      {t('pricing.mostPopular')}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">{t(tier.rangeKey)}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{t(tier.priceKey)}</span>
                    <span className="text-sm text-muted-foreground ml-1">{t(tier.priceNoteKey)}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {tier.featureKeys.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      tier.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                    onClick={() =>
                      tier.isCustom
                        ? navigate('/contact-us')
                        : navigate(APP_URL)
                    }
                  >
                    {tier.isCustom ? t('guideEnterprise.tier3Cta') : t('common.getStarted')}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Building2 className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('guideEnterprise.ctaTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t('guideEnterprise.ctaDescription')}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('pricing.getStartedNow')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground/80 hover:bg-muted"
                  onClick={() => navigate('/contact-us')}
                >
                  <Calendar className="mr-2 size-4" />
                  {t('guideEnterprise.ctaBookCall')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
