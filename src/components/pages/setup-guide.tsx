'use client'

import { useRouter } from '@/lib/router'
import { APP_URL } from '@/lib/app-urls'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Settings,
  UserPlus,
  Play,
  FileCheck,
  CreditCard,
  Smartphone,
  Users,
  Calendar,
  BookOpen,
  XCircle,
} from 'lucide-react'
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta'

const steps = [
  {
    step: 1,
    icon: <CreditCard className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step1Title',
    subtitleKey: 'setupGuide.step1Subtitle',
    descriptionKey: 'setupGuide.step1Description',
    tipKeys: [
      'setupGuide.step1Tip1',
      'setupGuide.step1Tip2',
      'setupGuide.step1Tip3',
    ],
    mistakeKeys: [
      'setupGuide.step1Mistake1',
      'setupGuide.step1Mistake2',
      'setupGuide.step1Mistake3',
    ],
  },
  {
    step: 2,
    icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step2Title',
    subtitleKey: 'setupGuide.step2Subtitle',
    descriptionKey: 'setupGuide.step2Description',
    tipKeys: [
      'setupGuide.step2Tip1',
      'setupGuide.step2Tip2',
      'setupGuide.step2Tip3',
      'setupGuide.step2Tip4',
    ],
    mistakeKeys: [
      'setupGuide.step2Mistake1',
      'setupGuide.step2Mistake2',
      'setupGuide.step2Mistake3',
      'setupGuide.step2Mistake4',
    ],
  },
  {
    step: 3,
    icon: <Settings className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step3Title',
    subtitleKey: 'setupGuide.step3Subtitle',
    descriptionKey: 'setupGuide.step3Description',
    tipKeys: [
      'setupGuide.step3Tip1',
      'setupGuide.step3Tip2',
      'setupGuide.step3Tip3',
      'setupGuide.step3Tip4',
    ],
    mistakeKeys: [
      'setupGuide.step3Mistake1',
      'setupGuide.step3Mistake2',
      'setupGuide.step3Mistake3',
    ],
  },
  {
    step: 4,
    icon: <UserPlus className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step4Title',
    subtitleKey: 'setupGuide.step4Subtitle',
    descriptionKey: 'setupGuide.step4Description',
    tipKeys: [
      'setupGuide.step4Tip1',
      'setupGuide.step4Tip2',
      'setupGuide.step4Tip3',
      'setupGuide.step4Tip4',
    ],
    mistakeKeys: [
      'setupGuide.step4Mistake1',
      'setupGuide.step4Mistake2',
      'setupGuide.step4Mistake3',
      'setupGuide.step4Mistake4',
    ],
  },
  {
    step: 5,
    icon: <Play className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step5Title',
    subtitleKey: 'setupGuide.step5Subtitle',
    descriptionKey: 'setupGuide.step5Description',
    tipKeys: [
      'setupGuide.step5Tip1',
      'setupGuide.step5Tip2',
      'setupGuide.step5Tip3',
      'setupGuide.step5Tip4',
    ],
    mistakeKeys: [
      'setupGuide.step5Mistake1',
      'setupGuide.step5Mistake2',
      'setupGuide.step5Mistake3',
      'setupGuide.step5Mistake4',
    ],
  },
  {
    step: 6,
    icon: <FileCheck className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'setupGuide.step6Title',
    subtitleKey: 'setupGuide.step6Subtitle',
    descriptionKey: 'setupGuide.step6Description',
    tipKeys: [
      'setupGuide.step6Tip1',
      'setupGuide.step6Tip2',
      'setupGuide.step6Tip3',
      'setupGuide.step6Tip4',
    ],
    mistakeKeys: [
      'setupGuide.step6Mistake1',
      'setupGuide.step6Mistake2',
      'setupGuide.step6Mistake3',
      'setupGuide.step6Mistake4',
    ],
  },
]

export default function SetupGuidePage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              {t('header.setupGuide')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {t('setupGuide.heroBadgeUpdated')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('setupGuide.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('setupGuide.heroTitleHighlight')}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('setupGuide.heroDescription')}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={step.step} className={`border-border ${index === 3 ? 'border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/5' : 'bg-card/50'}`}>
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {t('setupGuide.stepLabel')} {step.step}
                      </p>
                      {index === 3 && (
                        <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs">
                          {t('setupGuide.weHelpHereBadge')}
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{t(step.titleKey)}</h2>
                    <p className="text-sm text-muted-foreground">{t(step.subtitleKey)}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{t(step.descriptionKey)}</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Tips */}
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <CheckCircle2 className="size-4" />
                      {t('setupGuide.tipsHeading')}
                    </h3>
                    <ul className="space-y-2">
                      {step.tipKeys.map((tipKey) => (
                        <li key={tipKey} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                          {t(tipKey)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mistakes */}
                  <div className="rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/20 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                      <XCircle className="size-4" />
                      {t('setupGuide.mistakesHeading')}
                    </h3>
                    <ul className="space-y-2">
                      {step.mistakeKeys.map((mistakeKey) => (
                        <li key={mistakeKey} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-600 dark:bg-red-400" />
                          {t(mistakeKey)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Highlight Box for Step 4 */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('setupGuide.step4HighlightTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t('setupGuide.step4HighlightDescription')}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('blog.getTesters')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground/80 hover:bg-muted"
                  onClick={() => navigate('/beta-testers')}
                >
                  {t('setupGuide.ctaFreeTesterOptions')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t('setupGuide.quickRefTitle')}</h2>
          <p className="mt-2 text-muted-foreground">{t('setupGuide.quickRefSubtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <CreditCard className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">{t('setupGuide.quickRefFee')}</div>
              <p className="text-sm text-muted-foreground">{t('setupGuide.quickRefFeeLabel')}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <Users className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">{t('setupGuide.quickRefTesters')}</div>
              <p className="text-sm text-muted-foreground">{t('setupGuide.quickRefTestersLabel')}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <Calendar className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">{t('setupGuide.quickRefDays')}</div>
              <p className="text-sm text-muted-foreground">{t('setupGuide.quickRefDaysLabel')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <AppSetupGuideCta trackingId="setup_guide_setup_guide" />

      {/* CTA */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t('setupGuide.ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t('setupGuide.ctaDescription')}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('blog.getTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t('setupGuide.ctaFootnote')}
          </p>
        </div>
      </section>
    </div>
  )
}
