'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { StaticBlogCover } from '@/components/blog-cover-image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  LayoutGrid,
  Shield,
  Users,
  BookOpen,
  ExternalLink,
  Rocket,
  ClipboardCheck,
  UserPlus,
  TestTube,
  Send,
} from 'lucide-react';
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta';

const steps = [
  {
    number: 1,
    icon: <UserPlus className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step1Title',
    timelineKey: 'guidePublish.step1Timeline',
    descriptionKey: 'guidePublish.step1Description',
    detailKeys: [
      'guidePublish.step1Detail1',
      'guidePublish.step1Detail2',
      'guidePublish.step1Detail3',
      'guidePublish.step1Detail4',
    ],
    tipKey: 'guidePublish.step1Tip',
    link: { labelKey: 'guidePublish.step1LinkLabel', url: 'https://play.google.com/console' },
  },
  {
    number: 2,
    icon: <LayoutGrid className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step2Title',
    timelineKey: 'guidePublish.step2Timeline',
    descriptionKey: 'guidePublish.step2Description',
    detailKeys: [
      'guidePublish.step2Detail1',
      'guidePublish.step2Detail2',
      'guidePublish.step2Detail3',
      'guidePublish.step2Detail4',
      'guidePublish.step2Detail5',
      'guidePublish.step2Detail6',
    ],
    tipKey: 'guidePublish.step2Tip',
    link: null,
  },
  {
    number: 3,
    icon: <ClipboardCheck className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step3Title',
    timelineKey: 'guidePublish.step3Timeline',
    descriptionKey: 'guidePublish.step3Description',
    detailKeys: [
      'guidePublish.step3Detail1',
      'guidePublish.step3Detail2',
      'guidePublish.step3Detail3',
      'guidePublish.step3Detail4',
      'guidePublish.step3Detail5',
    ],
    tipKey: 'guidePublish.step3Tip',
    link: null,
  },
  {
    number: 4,
    icon: <TestTube className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step4Title',
    timelineKey: 'guidePublish.step4Timeline',
    descriptionKey: 'guidePublish.step4Description',
    detailKeys: [
      'guidePublish.step4Detail1',
      'guidePublish.step4Detail2',
      'guidePublish.step4Detail3',
      'guidePublish.step4Detail4',
      'guidePublish.step4Detail5',
      'guidePublish.step4Detail6',
    ],
    tipKey: 'guidePublish.step4Tip',
    link: { labelKey: 'guidePublish.step4LinkLabel', url: null, internal: '/pricing' },
  },
  {
    number: 5,
    icon: <Send className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step5Title',
    timelineKey: 'guidePublish.step5Timeline',
    descriptionKey: 'guidePublish.step5Description',
    detailKeys: [
      'guidePublish.step5Detail1',
      'guidePublish.step5Detail2',
      'guidePublish.step5Detail3',
      'guidePublish.step5Detail4',
      'guidePublish.step5Detail5',
    ],
    tipKey: 'guidePublish.step5Tip',
    link: null,
  },
  {
    number: 6,
    icon: <Rocket className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'guidePublish.step6Title',
    timelineKey: 'guidePublish.step6Timeline',
    descriptionKey: 'guidePublish.step6Description',
    detailKeys: [
      'guidePublish.step6Detail1',
      'guidePublish.step6Detail2',
      'guidePublish.step6Detail3',
      'guidePublish.step6Detail4',
    ],
    tipKey: 'guidePublish.step6Tip',
    link: null,
  },
];

export default function GuidePublishPage() {
  const { navigate, currentPath } = useRouter();
  const { t } = useLanguage();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              {t('guidePublish.heroBadgeGuide')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {t('guidePublish.heroBadgeUpdated')}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('guidePublish.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('guidePublish.heroTitleHighlight')}</span>{' '}
            <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl">
              {t('guidePublish.heroTitleYear')}
            </span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">{t('guidePublish.heroSubtitle')}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">{t('guidePublish.timelineNewAccountsLabel')}</p>
                <p className="text-sm font-medium text-foreground">{t('guidePublish.timelineNewAccountsValue')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">{t('guidePublish.timelineOrganizationsLabel')}</p>
                <p className="text-sm font-medium text-foreground">{t('guidePublish.timelineOrganizationsValue')}</p>
              </div>
            </div>
          </div>

          <Alert className="mt-8 border-amber-300 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30">
            <AlertDescription className="text-amber-800 dark:text-amber-200/80 text-sm">
              <strong className="text-amber-900 dark:text-amber-300">{t('guidePublish.alertTitle')}</strong>{' '}
              {t('guidePublish.alertDescription')}{' '}
              <button
                onClick={() => goToGetStartedPricing(currentPath, navigate)}
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-300"
              >
                {t('guidePublish.alertLink')}
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <StaticBlogCover
          src="/images/blog/guide-publish.png"
          alt={t('guidePublish.coverImageAlt')}
        />
      </div>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {steps.map((step) => (
            <Card
              key={step.number}
              className={`border-border bg-card/50 transition-colors ${
                expandedStep === step.number ? 'border-blue-500/30 bg-card/50' : ''
              }`}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30 text-lg font-bold text-blue-600 dark:text-blue-400">
                  {step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{t(step.titleKey)}</h3>
                    <span className="text-xs text-muted-foreground">{t(step.timelineKey)}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1">
                    {t(step.descriptionKey)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block">{step.icon}</div>
                  <ChevronDown
                    className={`size-5 text-muted-foreground transition-transform ${
                      expandedStep === step.number ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedStep === step.number && (
                <div className="border-t border-border px-5 sm:px-6 pb-6 pt-5">
                  <p className="text-foreground/80 leading-relaxed mb-5">{t(step.descriptionKey)}</p>

                  <div className="rounded-xl bg-muted border border-border/50 p-5 mb-5">
                    <h4 className="text-sm font-semibold text-foreground/80 mb-3">{t('guidePublish.checklistHeading')}</h4>
                    <ul className="space-y-2.5">
                      {step.detailKeys.map((detailKey) => (
                        <li key={detailKey} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                          {t(detailKey)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="size-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {t('guidePublish.proTipLabel')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{t(step.tipKey)}</p>
                  </div>

                  {step.link && (
                    <div>
                      {'internal' in step.link && step.link.internal ? (
                        <Button
                          onClick={() => goToGetStartedPricing(currentPath, navigate)}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {t(step.link.labelKey)}
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      ) : (
                        <a
                          href={step.link.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                        >
                          {t(step.link.labelKey)}
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400">
                ✓
              </span>
              <span className="text-sm font-medium text-foreground/80">{t('guidePublish.timelineHeading')}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center gap-1.5 rounded-lg bg-muted p-3 text-center"
              >
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{step.number}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{t(step.timelineKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppSetupGuideCta trackingId="guide_publish_setup_guide" />

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">{t('guidePublish.ctaTitle')}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('guidePublish.ctaDescription')}</p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => goToGetStartedPricing(currentPath, navigate)}
                >
                  {t('guidePublish.ctaButton')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t('guidePublish.ctaFootnote')}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
