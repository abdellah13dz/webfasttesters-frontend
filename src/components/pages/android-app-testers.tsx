'use client'

import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Smartphone,
  Users,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  ArrowRight,
  AlertTriangle,
  UserX,
  Timer,
} from 'lucide-react'
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta'

export default function AndroidAppTestersPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const challenges = [
    {
      icon: <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />,
      titleKey: 'androidAppTesters.challenge1Title',
      descriptionKey: 'androidAppTesters.challenge1Desc',
    },
    {
      icon: <UserX className="size-5 text-amber-600 dark:text-amber-400" />,
      titleKey: 'androidAppTesters.challenge2Title',
      descriptionKey: 'androidAppTesters.challenge2Desc',
    },
    {
      icon: <Clock className="size-5 text-amber-600 dark:text-amber-400" />,
      titleKey: 'androidAppTesters.challenge3Title',
      descriptionKey: 'androidAppTesters.challenge3Desc',
    },
    {
      icon: <Timer className="size-5 text-amber-600 dark:text-amber-400" />,
      titleKey: 'androidAppTesters.challenge4Title',
      descriptionKey: 'androidAppTesters.challenge4Desc',
    },
  ]

  const features = [
    {
      icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
      titleKey: 'androidAppTesters.feature1Title',
      descriptionKey: 'androidAppTesters.feature1Desc',
    },
    {
      icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
      titleKey: 'androidAppTesters.feature2Title',
      descriptionKey: 'androidAppTesters.feature2Desc',
    },
    {
      icon: <MessageSquare className="size-6 text-blue-600 dark:text-blue-400" />,
      titleKey: 'androidAppTesters.feature3Title',
      descriptionKey: 'androidAppTesters.feature3Desc',
    },
    {
      icon: <Calendar className="size-6 text-blue-600 dark:text-blue-400" />,
      titleKey: 'androidAppTesters.feature4Title',
      descriptionKey: 'androidAppTesters.feature4Desc',
    },
    {
      icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
      titleKey: 'home.comprehensiveReports',
      descriptionKey: 'androidAppTesters.feature5Desc',
    },
  ]

  const comparisonData = [
    { featureKey: 'androidAppTesters.compare1', free: false, professional: true },
    { featureKey: 'androidAppTesters.compare2', free: false, professional: true },
    { featureKey: 'androidAppTesters.compare3', free: false, professional: true },
    {
      featureKey: 'androidAppTesters.compare4',
      freeKey: 'androidAppTesters.compare4Free',
      professional: true,
    },
    { featureKey: 'androidAppTesters.compare5', free: false, professional: true },
    { featureKey: 'androidAppTesters.compare6', free: false, professional: true },
    { featureKey: 'androidAppTesters.compare7', free: false, professional: true },
    {
      featureKey: 'androidAppTesters.compare8',
      freeKey: 'androidAppTesters.compare8Free',
      proKey: 'androidAppTesters.compare8Pro',
    },
    {
      featureKey: 'androidAppTesters.compare9',
      freeKey: 'androidAppTesters.compare9Free',
      proKey: 'androidAppTesters.compare9Pro',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Badge className="mb-6 border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
            <Smartphone className="mr-1 size-3" />
            {t('androidAppTesters.heroBadge')}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('androidAppTesters.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('androidAppTesters.heroTitleShowUp')}</span> {t('androidAppTesters.heroTitleAndStayFor')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('androidAppTesters.heroTitleStayFor')}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('androidAppTesters.heroDescription')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              onClick={() => navigate('/production-access')}
            >
              {t('androidAppTesters.ctaGetTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
              onClick={() => navigate('/closed-testing')}
            >
              {t('androidAppTesters.ctaLearnClosedTesting')}
            </Button>
          </div>
        </div>
      </section>

      {/* The Android Developer Challenge */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            {t('androidAppTesters.challengeBadge')}
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('androidAppTesters.challengeTitle')}</h2>
          <p className="mt-4 text-muted-foreground">{t('androidAppTesters.challengeSubtitle')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {challenges.map((challenge, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 transition-colors hover:border-border"
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/50 p-2">{challenge.icon}</div>
                  <CardTitle className="text-base text-foreground">{t(challenge.titleKey)}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(challenge.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              {t('androidAppTesters.whatYouGetBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('androidAppTesters.whatYouGetTitle')}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/50 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/70">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t(feature.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            {t('androidAppTesters.comparisonBadge')}
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('androidAppTesters.comparisonTitle')}</h2>
          <p className="mt-4 text-muted-foreground">{t('androidAppTesters.comparisonSubtitle')}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                  {t('androidAppTesters.tableFeature')}
                </th>
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  {t('androidAppTesters.tableFreeTesters')}
                </th>
                <th className="px-6 py-4 text-center font-medium text-blue-600 dark:text-blue-400">
                  {t('androidAppTesters.tableProfessionalTesters')}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="px-6 py-4 text-foreground/80">{t(row.featureKey)}</td>
                  <td className="px-6 py-4 text-center">
                    {row.freeKey ? (
                      <span className="text-xs text-muted-foreground">{t(row.freeKey)}</span>
                    ) : row.free === true ? (
                      <CheckCircle2 className="mx-auto size-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <XCircle className="mx-auto size-5 text-red-500 dark:text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.proKey ? (
                      <span className="text-xs text-blue-600 dark:text-blue-400">{t(row.proKey)}</span>
                    ) : row.professional === true ? (
                      <CheckCircle2 className="mx-auto size-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <span className="text-xs text-blue-600 dark:text-blue-400">{row.professional}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('androidAppTesters.statAppsPublished')}</div>
              <p className="text-sm text-muted-foreground">{t('home.appsPublished')}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('androidAppTesters.statSuccessRate')}</div>
              <p className="text-sm text-muted-foreground">{t('home.successRate')}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('androidAppTesters.statStartTime')}</div>
              <p className="text-sm text-muted-foreground">{t('androidAppTesters.statAvgStartTime')}</p>
            </div>
          </div>
        </div>
      </section>

      <AppSetupGuideCta trackingId="android_app_testers_setup_guide" />

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-blue-300/50 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/80 dark:from-blue-950/30 to-card/50">
          <CardContent className="p-8 sm:p-12 text-center">
            <Shield className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold sm:text-3xl">{t('androidAppTesters.ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('androidAppTesters.ctaDescription')}</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                onClick={() => navigate('/production-access')}
              >
                {t('androidAppTesters.ctaGetTesters')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t('androidAppTesters.ctaFootnote')}</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
