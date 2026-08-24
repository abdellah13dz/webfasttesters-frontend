'use client'

import { useState } from 'react'
import { useRouter } from '@/lib/router'
import { APP_URL } from '@/lib/app-urls'
import { useLanguage } from '@/lib/i18n/context'
import { useStickyAside } from '@/lib/hooks/use-sticky-aside'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  MessageCircle,
  MessageSquare,
  Facebook,
  Heart,
  Twitter,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta'

const methods = [
  {
    number: '01',
    icon: <Users className="size-5 text-blue-400" />,
    titleKey: 'betaTesters.method1Title',
    subtitleKey: 'betaTesters.method1Subtitle',
    tagKey: 'betaTesters.method1Tag',
    tagColor: 'blue',
    descriptionKey: 'betaTesters.method1Description',
    proKeys: [
      'betaTesters.method1Pro1',
      'betaTesters.method1Pro2',
      'betaTesters.method1Pro3',
      'betaTesters.method1Pro4',
    ],
    conKeys: [
      'betaTesters.method1Con1',
      'betaTesters.method1Con2',
      'betaTesters.method1Con3',
      'betaTesters.method1Con4',
    ],
  },
  {
    number: '02',
    icon: <Shield className="size-5 text-blue-400" />,
    titleKey: 'betaTesters.method2Title',
    subtitleKey: 'betaTesters.method2Subtitle',
    tagKey: 'betaTesters.method2Tag',
    tagColor: 'blue',
    descriptionKey: 'betaTesters.method2Description',
    proKeys: [
      'betaTesters.method2Pro1',
      'betaTesters.method2Pro2',
      'betaTesters.method2Pro3',
      'betaTesters.method2Pro4',
      'betaTesters.method2Pro5',
    ],
    conKeys: ['betaTesters.method2Con1', 'betaTesters.method2Con2'],
  },
  {
    number: '03',
    icon: <MessageCircle className="size-5 text-blue-400" />,
    titleKey: 'betaTesters.method3Title',
    subtitleKey: 'betaTesters.method3Subtitle',
    tagKey: 'betaTesters.method3Tag',
    tagColor: 'blue',
    descriptionKey: 'betaTesters.method3Description',
    proKeys: [
      'betaTesters.method3Pro1',
      'betaTesters.method3Pro2',
      'betaTesters.method3Pro3',
      'betaTesters.method3Pro4',
    ],
    conKeys: [
      'betaTesters.method3Con1',
      'betaTesters.method3Con2',
      'betaTesters.method3Con3',
      'betaTesters.method3Con4',
      'betaTesters.method3Con5',
    ],
  },
  {
    number: '04',
    icon: <MessageSquare className="size-5 text-indigo-400" />,
    titleKey: 'betaTesters.method4Title',
    subtitleKey: 'betaTesters.method4Subtitle',
    tagKey: 'betaTesters.method4Tag',
    tagColor: 'indigo',
    descriptionKey: 'betaTesters.method4Description',
    proKeys: [
      'betaTesters.method4Pro1',
      'betaTesters.method4Pro2',
      'betaTesters.method4Pro3',
      'betaTesters.method4Pro4',
    ],
    conKeys: [
      'betaTesters.method4Con1',
      'betaTesters.method4Con2',
      'betaTesters.method4Con3',
      'betaTesters.method4Con4',
      'betaTesters.method4Con5',
    ],
  },
  {
    number: '05',
    icon: <Facebook className="size-5 text-blue-400" />,
    titleKey: 'betaTesters.method5Title',
    subtitleKey: 'betaTesters.method5Subtitle',
    tagKey: 'betaTesters.method5Tag',
    tagColor: 'blue',
    descriptionKey: 'betaTesters.method5Description',
    proKeys: [
      'betaTesters.method5Pro1',
      'betaTesters.method5Pro2',
      'betaTesters.method5Pro3',
      'betaTesters.method5Pro4',
    ],
    conKeys: [
      'betaTesters.method5Con1',
      'betaTesters.method5Con2',
      'betaTesters.method5Con3',
      'betaTesters.method5Con4',
      'betaTesters.method5Con5',
    ],
  },
  {
    number: '06',
    icon: <Heart className="size-5 text-pink-400" />,
    titleKey: 'betaTesters.method6Title',
    subtitleKey: 'betaTesters.method6Subtitle',
    tagKey: 'betaTesters.method6Tag',
    tagColor: 'pink',
    descriptionKey: 'betaTesters.method6Description',
    proKeys: [
      'betaTesters.method6Pro1',
      'betaTesters.method6Pro2',
      'betaTesters.method6Pro3',
      'betaTesters.method6Pro4',
    ],
    conKeys: [
      'betaTesters.method6Con1',
      'betaTesters.method6Con2',
      'betaTesters.method6Con3',
      'betaTesters.method6Con4',
      'betaTesters.method6Con5',
      'betaTesters.method6Con6',
    ],
  },
  {
    number: '07',
    icon: <Twitter className="size-5 text-sky-400" />,
    titleKey: 'betaTesters.method7Title',
    subtitleKey: 'betaTesters.method7Subtitle',
    tagKey: 'betaTesters.method7Tag',
    tagColor: 'sky',
    descriptionKey: 'betaTesters.method7Description',
    proKeys: [
      'betaTesters.method7Pro1',
      'betaTesters.method7Pro2',
      'betaTesters.method7Pro3',
      'betaTesters.method7Pro4',
    ],
    conKeys: [
      'betaTesters.method7Con1',
      'betaTesters.method7Con2',
      'betaTesters.method7Con3',
      'betaTesters.method7Con4',
      'betaTesters.method7Con5',
    ],
  },
]

const comparisonData = [
  {
    methodKey: 'betaTesters.comparisonRow1Method',
    costKey: 'betaTesters.comparisonRow1Cost',
    testersKey: 'betaTesters.comparisonRow1Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow1SetupTime',
    qualityKey: 'betaTesters.comparisonRow1Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow2Method',
    costKey: 'betaTesters.comparisonRow2Cost',
    testersKey: 'betaTesters.comparisonRow2Testers',
    guarantee: true,
    setupTimeKey: 'betaTesters.comparisonRow2SetupTime',
    qualityKey: 'betaTesters.comparisonRow2Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow3Method',
    costKey: 'betaTesters.comparisonRow3Cost',
    testersKey: 'betaTesters.comparisonRow3Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow3SetupTime',
    qualityKey: 'betaTesters.comparisonRow3Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow4Method',
    costKey: 'betaTesters.comparisonRow4Cost',
    testersKey: 'betaTesters.comparisonRow4Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow4SetupTime',
    qualityKey: 'betaTesters.comparisonRow4Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow5Method',
    costKey: 'betaTesters.comparisonRow5Cost',
    testersKey: 'betaTesters.comparisonRow5Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow5SetupTime',
    qualityKey: 'betaTesters.comparisonRow5Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow6Method',
    costKey: 'betaTesters.comparisonRow6Cost',
    testersKey: 'betaTesters.comparisonRow6Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow6SetupTime',
    qualityKey: 'betaTesters.comparisonRow6Quality',
  },
  {
    methodKey: 'betaTesters.comparisonRow7Method',
    costKey: 'betaTesters.comparisonRow7Cost',
    testersKey: 'betaTesters.comparisonRow7Testers',
    guarantee: false,
    setupTimeKey: 'betaTesters.comparisonRow7SetupTime',
    qualityKey: 'betaTesters.comparisonRow7Quality',
  },
]

const faqs = [
  { questionKey: 'betaTesters.faq1Question', answerKey: 'betaTesters.faq1Answer' },
  { questionKey: 'betaTesters.faq2Question', answerKey: 'betaTesters.faq2Answer' },
  { questionKey: 'betaTesters.faq3Question', answerKey: 'betaTesters.faq3Answer' },
  { questionKey: 'betaTesters.faq4Question', answerKey: 'betaTesters.faq4Answer' },
  { questionKey: 'betaTesters.faq5Question', answerKey: 'betaTesters.faq5Answer' },
  { questionKey: 'betaTesters.faq6Question', answerKey: 'betaTesters.faq6Answer' },
]

export default function BetaTestersPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { containerRef, asideRef, style: asideStyle } = useStickyAside()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
          <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              {t('betaTesters.heroBadgeGuide')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {t('betaTesters.heroBadgeUpdated')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('betaTesters.heroTitlePrefix')}{' '}
            <span className="text-blue-400">{t('betaTesters.heroTitleHighlight')}</span>{' '}
            {t('betaTesters.heroTitleSuffix')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('betaTesters.heroDescription')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('betaTesters.ctaGetProfessionalTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/android-app-testers')}
            >
              {t('betaTesters.ctaTryFreeCommunity')}
            </Button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/beta-testers.png"
          alt={t('betaTesters.coverImageAlt')}
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Content with TOC sidebar */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="relative flex items-start gap-12">
          {/* Sticky TOC - Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <aside
              ref={asideRef}
              style={asideStyle}
              className="text-foreground"
            >
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {t('betaTesters.tocTitle')}
              </h3>
              <nav className="space-y-1">
                {methods.map((method, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const el = document.getElementById(`method-${index}`)
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRight className="size-3 shrink-0" />
                    {t(method.titleKey)}
                  </button>
                ))}
              </nav>
            </aside>
          </div>

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-16 pb-16">
            {/* Methods */}
            {methods.map((method, index) => (
              <div key={index} id={`method-${index}`}>
                <Card className="border-border bg-card/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-bold text-blue-400">
                          {method.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-xl text-foreground">
                              {t(method.titleKey)}
                            </CardTitle>
                            <Badge
                              className={`${
                                method.tagColor === 'blue'
                                  ? 'border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider'
                                  : method.tagColor === 'indigo'
                                      ? 'border-indigo-800 dark:border-indigo-950/50 bg-indigo-200/50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 text-[13px] tracking-wider'
                                      : method.tagColor === 'pink'
                                        ? 'border-pink-800 dark:border-pink-950/50 bg-pink-200/50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-800/50 text-[13px] tracking-wider'
                                        : 'border-sky-800 dark:border-sky-950/50 bg-sky-200/50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-800/50 text-[13px] tracking-wider'
                              }`}
                            >
                              {t(method.tagKey)}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{t(method.subtitleKey)}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block">{method.icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground/80 leading-relaxed">{t(method.descriptionKey)}</p>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
                          {t('betaTesters.prosLabel')}
                        </h4>
                        <ul className="space-y-2">
                          {method.proKeys.map((proKey, proIndex) => (
                            <li key={proIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                              {t(proKey)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-red-400 uppercase tracking-wider">
                          {t('betaTesters.consLabel')}
                        </h4>
                        <ul className="space-y-2">
                          {method.conKeys.map((conKey, conIndex) => (
                            <li key={conIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                              <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                              {t(conKey)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Comparison Table */}
            <div>
              <div className="mb-8 text-center">
                <Badge variant="outline" className="border-border text-muted-foreground">
                  {t('betaTesters.comparisonBadge')}
                </Badge>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('betaTesters.comparisonTitle')}</h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">{t('betaTesters.tableHeaderMethod')}</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">{t('betaTesters.tableHeaderCost')}</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">{t('betaTesters.tableHeaderTesters')}</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">{t('betaTesters.tableHeaderGuaranteed')}</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">{t('betaTesters.tableHeaderSetupTime')}</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">{t('betaTesters.tableHeaderQuality')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b border-border/50 ${
                          row.guarantee ? 'bg-blue-950/10' : ''
                        }`}
                      >
                        <td className={`px-4 py-3 ${row.guarantee ? 'font-medium text-blue-400' : 'text-foreground/80'}`}>
                          {row.guarantee && '⭐ '}{t(row.methodKey)}
                        </td>
                        <td className="px-4 py-3 text-center text-foreground/80">{t(row.costKey)}</td>
                        <td className="px-4 py-3 text-center text-foreground/80">{t(row.testersKey)}</td>
                        <td className="px-4 py-3 text-center">
                          {row.guarantee ? (
                            <CheckCircle2 className="mx-auto size-5 text-blue-400" />
                          ) : (
                            <XCircle className="mx-auto size-5 text-red-400/50" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-foreground/80">{t(row.setupTimeKey)}</td>
                        <td className="px-4 py-3 text-center text-foreground/80">{t(row.qualityKey)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="mb-8 text-center">
                <Badge variant="outline" className="border-border text-muted-foreground">
                  {t('support.faq')}
                </Badge>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('faq.title')}</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-xl border border-border bg-card/50">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-foreground pr-4">{t(faq.questionKey)}</span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{t(faq.answerKey)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppSetupGuideCta trackingId="beta_testers_setup_guide" />

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t('betaTesters.ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t('betaTesters.ctaDescription')}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('betaTesters.ctaGetProfessionalTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/android-app-testers')}
            >
              {t('betaTesters.ctaTryFreeCommunity')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
