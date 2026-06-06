'use client'

import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  ArrowRight,
  Shield,
  Users,
  Calendar,
  FileText,
  Headphones,
  Star,
  CreditCard,
  Send,
  Trophy,
} from 'lucide-react'

const steps = [
  {
    icon: <CreditCard className="size-6 text-blue-600 dark:text-blue-400" />,
    stepKey: 'productionAccess.step1Label',
    titleKey: 'productionAccess.step1Title',
    descriptionKey: 'productionAccess.step1Description',
  },
  {
    icon: <Send className="size-6 text-blue-600 dark:text-blue-400" />,
    stepKey: 'productionAccess.step2Label',
    titleKey: 'productionAccess.step2Title',
    descriptionKey: 'productionAccess.step2Description',
  },
  {
    icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
    stepKey: 'productionAccess.step3Label',
    titleKey: 'productionAccess.step3Title',
    descriptionKey: 'productionAccess.step3Description',
  },
  {
    icon: <Trophy className="size-6 text-blue-600 dark:text-blue-400" />,
    stepKey: 'productionAccess.step4Label',
    titleKey: 'productionAccess.step4Title',
    descriptionKey: 'productionAccess.step4Description',
  },
]

const includes = [
  {
    icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'home.professionalTesters',
    descriptionKey: 'productionAccess.include1Desc',
  },
  {
    icon: <Calendar className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'productionAccess.include2Title',
    descriptionKey: 'productionAccess.include2Desc',
  },
  {
    icon: <Shield className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'home.productionAccessGuarantee',
    descriptionKey: 'productionAccess.include3Desc',
  },
  {
    icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'home.comprehensiveReports',
    descriptionKey: 'productionAccess.include4Desc',
  },
  {
    icon: <Headphones className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'productionAccess.include5Title',
    descriptionKey: 'productionAccess.include5Desc',
  },
]

const requirements = [
  { textKey: 'productionAccess.requirement1' },
  { textKey: 'productionAccess.requirement2' },
  { textKey: 'productionAccess.requirement3' },
  { textKey: 'productionAccess.requirement4' },
  { textKey: 'productionAccess.requirement5' },
]

const stats = [
  { valueKey: 'productionAccess.stat1Value', labelKey: 'home.successRate', descriptionKey: 'productionAccess.stat1Desc' },
  { valueKey: 'productionAccess.stat2Value', labelKey: 'productionAccess.stat2Label', descriptionKey: 'productionAccess.stat2Desc' },
  { valueKey: 'productionAccess.stat3Value', labelKey: 'home.appsPublished', descriptionKey: 'productionAccess.stat3Desc' },
]

export default function ProductionAccessPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <CheckCircle2 className="mr-1 size-3" />
              {t('productionAccess.heroBadgeTesters')}
            </Badge>
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <CreditCard className="mr-1 size-3" />
              {t('productionAccess.heroBadgePrice')}
            </Badge>
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <Star className="mr-1 size-3" />
              {t('productionAccess.heroBadgeApproval')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('productionAccess.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('productionAccess.heroTitleHighlight')}</span>
          </h1>
          <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
            {t('productionAccess.heroSubtitle')}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t('productionAccess.heroDescription')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              {t('productionAccess.ctaGetProductionAccess')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/closed-testing')}
            >
              {t('productionAccess.ctaLearnClosedTesting')}
            </Button>
          </div>
        </div>
      </section>

      {/* What is Production Access */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Badge variant="outline" className="border-border text-muted-foreground">
                {t('productionAccess.understandingBadge')}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('productionAccess.whatIsTitle')}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t('productionAccess.whatIsP1')}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t('productionAccess.whatIsP2')}
              </p>
            </div>
            <div>
              <Card className="border-border bg-card/50 h-full">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">{t('productionAccess.requirementsTitle')}</h3>
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        {t(req.textKey)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            {t('productionAccess.howItWorksBadge')}
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            {t('productionAccess.howItWorksTitle')}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-border bg-card/50 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3">{step.icon}</div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {t(step.stepKey)}
                      </p>
                      <h3 className="font-semibold text-foreground">{t(step.titleKey)}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(step.descriptionKey)}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden sm:block">
                  <ArrowRight className="size-5 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              {t('productionAccess.whatsIncludedBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('productionAccess.whatsIncludedTitle')}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item, index) => (
              <div key={index} className="group">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t(item.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(item.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">{t(stat.valueKey)}</div>
              <p className="text-lg font-medium text-foreground">{t(stat.labelKey)}</p>
              <p className="text-sm text-muted-foreground">{t(stat.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Shield className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('productionAccess.ctaTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t('productionAccess.ctaDescription')}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/production-access')}
                >
                  {t('productionAccess.ctaGetProductionAccess')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {t('productionAccess.ctaFootnote')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
