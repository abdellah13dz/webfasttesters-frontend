'use client'

import { useState } from 'react'
import { useRouter } from '@/lib/router'
import { APP_URL } from '@/lib/app-urls'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  Shield,
  HelpCircle,
  Clock,
  Eye,
  Lock,
  Globe,
  UserPlus,
  Bug,
  RefreshCw,
  Zap,
  BookOpen,
} from 'lucide-react'
import { FullDemoCta } from '@/components/full-demo-cta'
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta'

const tocItems = [
  { textKey: 'closedTesting.tocItem1' },
  { textKey: 'closedTesting.tocItem2' },
  { textKey: 'closedTesting.tocItem3' },
  { textKey: 'closedTesting.tocItem4' },
  { textKey: 'closedTesting.tocItem5' },
  { textKey: 'closedTesting.tocItem6' },
  { textKey: 'closedTesting.tocItem7' },
]

const testingComparison = [
  {
    typeKey: 'closedTesting.internalType',
    whoKey: 'closedTesting.internalWho',
    visibilityKey: 'closedTesting.internalVisibility',
    reviewKey: 'closedTesting.internalReview',
    useCaseKey: 'closedTesting.internalUseCase',
    requirementKey: 'closedTesting.internalRequirement',
    icon: <Lock className="size-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    typeKey: 'closedTesting.closedType',
    whoKey: 'closedTesting.closedWho',
    visibilityKey: 'closedTesting.closedVisibility',
    reviewKey: 'closedTesting.closedReview',
    useCaseKey: 'closedTesting.closedUseCase',
    requirementKey: 'closedTesting.closedRequirement',
    icon: <Eye className="size-5 text-blue-600 dark:text-blue-400" />,
    required: true,
  },
  {
    typeKey: 'closedTesting.openType',
    whoKey: 'closedTesting.openWho',
    visibilityKey: 'closedTesting.openVisibility',
    reviewKey: 'closedTesting.openReview',
    useCaseKey: 'closedTesting.openUseCase',
    requirementKey: 'closedTesting.openRequirement',
    icon: <Globe className="size-5 text-amber-600 dark:text-amber-400" />,
  },
]

const setupSteps = [
  {
    step: 1,
    titleKey: 'closedTesting.setupStep1Title',
    descriptionKey: 'closedTesting.setupStep1Description',
    tipKey: 'closedTesting.setupStep1Tip',
  },
  {
    step: 2,
    titleKey: 'closedTesting.setupStep2Title',
    descriptionKey: 'closedTesting.setupStep2Description',
    tipKey: 'closedTesting.setupStep2Tip',
  },
  {
    step: 3,
    titleKey: 'closedTesting.setupStep3Title',
    descriptionKey: 'closedTesting.setupStep3Description',
    tipKey: 'closedTesting.setupStep3Tip',
  },
  {
    step: 4,
    titleKey: 'closedTesting.setupStep4Title',
    descriptionKey: 'closedTesting.setupStep4Description',
    tipKey: 'closedTesting.setupStep4Tip',
  },
  {
    step: 5,
    titleKey: 'closedTesting.setupStep5Title',
    descriptionKey: 'closedTesting.setupStep5Description',
    tipKey: 'closedTesting.setupStep5Tip',
  },
  {
    step: 6,
    titleKey: 'closedTesting.setupStep6Title',
    descriptionKey: 'closedTesting.setupStep6Description',
    tipKey: 'closedTesting.setupStep6Tip',
  },
]

const commonIssues = [
  {
    icon: <UserPlus className="size-5 text-red-600 dark:text-red-400" />,
    titleKey: 'closedTesting.issue1Title',
    descriptionKey: 'closedTesting.issue1Description',
    solutionKey: 'closedTesting.issue1Solution',
  },
  {
    icon: <Clock className="size-5 text-red-600 dark:text-red-400" />,
    titleKey: 'closedTesting.issue2Title',
    descriptionKey: 'closedTesting.issue2Description',
    solutionKey: 'closedTesting.issue2Solution',
  },
  {
    icon: <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />,
    titleKey: 'closedTesting.issue3Title',
    descriptionKey: 'closedTesting.issue3Description',
    solutionKey: 'closedTesting.issue3Solution',
  },
  {
    icon: <Bug className="size-5 text-red-600 dark:text-red-400" />,
    titleKey: 'closedTesting.issue4Title',
    descriptionKey: 'closedTesting.issue4Description',
    solutionKey: 'closedTesting.issue4Solution',
  },
  {
    icon: <RefreshCw className="size-5 text-red-600 dark:text-red-400" />,
    titleKey: 'closedTesting.issue5Title',
    descriptionKey: 'closedTesting.issue5Description',
    solutionKey: 'closedTesting.issue5Solution',
  },
]

const testerOptions = [
  {
    rankKey: 'closedTesting.rankBest',
    titleKey: 'closedTesting.testerOption1Title',
    descriptionKey: 'closedTesting.testerOption1Description',
    highlight: true,
  },
  {
    rankKey: 'closedTesting.rankGood',
    titleKey: 'closedTesting.testerOption2Title',
    descriptionKey: 'closedTesting.testerOption2Description',
    highlight: false,
  },
  {
    rankKey: 'closedTesting.rankOk',
    titleKey: 'closedTesting.testerOption3Title',
    descriptionKey: 'closedTesting.testerOption3Description',
    highlight: false,
  },
  {
    rankKey: 'closedTesting.rankRisky',
    titleKey: 'closedTesting.testerOption4Title',
    descriptionKey: 'closedTesting.testerOption4Description',
    highlight: false,
  },
]

const faqs = [
  { questionKey: 'closedTesting.faq1Question', answerKey: 'closedTesting.faq1Answer' },
  { questionKey: 'closedTesting.faq2Question', answerKey: 'closedTesting.faq2Answer' },
  { questionKey: 'closedTesting.faq3Question', answerKey: 'closedTesting.faq3Answer' },
  { questionKey: 'closedTesting.faq4Question', answerKey: 'closedTesting.faq4Answer' },
  { questionKey: 'closedTesting.faq5Question', answerKey: 'closedTesting.faq5Answer' },
  { questionKey: 'closedTesting.faq6Question', answerKey: 'closedTesting.faq6Answer' },
  { questionKey: 'closedTesting.faq7Question', answerKey: 'closedTesting.faq7Answer' },
  { questionKey: 'closedTesting.faq8Question', answerKey: 'closedTesting.faq8Answer' },
]

export default function ClosedTestingPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              {t('closedTesting.heroBadgeGuide')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {t('closedTesting.heroBadgeUpdated')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('closedTesting.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('closedTesting.heroTitleHighlight')}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('closedTesting.heroDescription')}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/closed-testing.png"
          alt={t('closedTesting.coverImageAlt')}
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {t('closedTesting.tocTitle')}
              </h3>
              <nav className="space-y-1">
                {tocItems.map((item, index) => (
                  <button
                    key={item.textKey}
                    onClick={() => {
                      const el = document.getElementById(`section-${index}`)
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRight className="size-3 shrink-0" />
                    {t(item.textKey)}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-20 pb-16">
            <div id="section-0">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                {t('closedTesting.overviewBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.whatIsTitle')}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('closedTesting.whatIsP1')}</p>
                <p>{t('closedTesting.whatIsP2')}</p>
                <p>{t('closedTesting.whatIsP3')}</p>
              </div>
            </div>

            <div id="section-1">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                {t('closedTesting.comparisonBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.testingTypesTitle')}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t('closedTesting.testingTypesSubtitle')}</p>
              <div className="space-y-6">
                {testingComparison.map((item, index) => (
                  <Card
                    key={item.typeKey}
                    className={`border-border ${index === 1 ? 'border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/10' : 'bg-card/50'}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <CardTitle className="text-xl text-foreground">{t(item.typeKey)}</CardTitle>
                        {'required' in item && item.required && (
                          <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs">
                            {t('closedTesting.requiredBadge')}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            {t('closedTesting.labelWhoCanTest')}
                          </p>
                          <p className="text-sm text-foreground/80">{t(item.whoKey)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            {t('closedTesting.labelVisibility')}
                          </p>
                          <p className="text-sm text-foreground/80">{t(item.visibilityKey)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            {t('closedTesting.labelReviewProcess')}
                          </p>
                          <p className="text-sm text-foreground/80">{t(item.reviewKey)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            {t('closedTesting.labelUseCase')}
                          </p>
                          <p className="text-sm text-foreground/80">{t(item.useCaseKey)}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            {t('closedTesting.labelProductionAccess')}
                          </p>
                          <p
                            className={`text-sm font-medium ${index === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}
                          >
                            {t(item.requirementKey)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div id="section-2">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                {t('closedTesting.coreRequirementBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.requirementTitle')}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('closedTesting.requirementP1')}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="border-blue-300 dark:border-blue-800/30 bg-blue-100/50 dark:bg-blue-950/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">12+</div>
                    <h3 className="font-semibold text-foreground">{t('closedTesting.requirement12Label')}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t('closedTesting.requirement12Description')}</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-300 dark:border-blue-800/30 bg-blue-100/50 dark:bg-blue-950/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">14</div>
                    <h3 className="font-semibold text-foreground">{t('closedTesting.requirement14Label')}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t('closedTesting.requirement14Description')}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('closedTesting.requirementP2')}</p>
                <p>{t('closedTesting.requirementP3')}</p>
              </div>
            </div>

            <div id="section-3">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                {t('closedTesting.setupBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.setupTitle')}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t('closedTesting.setupSubtitle')}</p>
              <div className="space-y-6">
                {setupSteps.map((step) => (
                  <Card key={step.step} className="border-border bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30 text-lg font-bold text-blue-600 dark:text-blue-400">
                          {step.step}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{t(step.titleKey)}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.descriptionKey)}</p>
                          {step.tipKey && (
                            <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 p-3">
                              <Zap className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                              <p className="text-sm text-blue-700 dark:text-blue-300/80">
                                <span className="font-medium">{t('closedTesting.tipLabel')}</span> {t(step.tipKey)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div id="section-4">
              <Badge variant="outline" className="border-amber-800 text-amber-600 dark:text-amber-400 mb-4">
                {t('closedTesting.troubleshootingBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.issuesTitle')}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t('closedTesting.issuesSubtitle')}</p>
              <div className="space-y-4">
                {commonIssues.map((issue) => (
                  <Card key={issue.titleKey} className="border-border bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="rounded-lg bg-red-100 dark:bg-red-950/20 p-2">{issue.icon}</div>
                        <div>
                          <h3 className="font-semibold text-foreground">{t(issue.titleKey)}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(issue.descriptionKey)}</p>
                        </div>
                      </div>
                      <div className="ml-11 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <p className="text-sm text-blue-700 dark:text-blue-300/80">
                          <span className="font-medium">{t('closedTesting.solutionLabel')}</span> {t(issue.solutionKey)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div id="section-5">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                {t('closedTesting.findingTestersBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('closedTesting.findingTestersTitle')}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t('closedTesting.findingTestersSubtitle')}</p>
              <div className="space-y-4">
                {testerOptions.map((option) => (
                  <Card
                    key={option.titleKey}
                    className={
                      option.highlight
                        ? 'border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/10'
                        : 'border-border bg-card/50'
                    }
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Badge
                          className={
                            option.highlight
                              ? 'shrink-0 bg-blue-600 text-white'
                              : 'shrink-0 border-border text-muted-foreground'
                          }
                          variant={option.highlight ? 'default' : 'outline'}
                        >
                          {t(option.rankKey)}
                        </Badge>
                        <div>
                          <h3
                            className={
                              option.highlight
                                ? 'font-semibold text-blue-600 dark:text-blue-400'
                                : 'font-semibold text-foreground/80'
                            }
                          >
                            {t(option.titleKey)}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">{t(option.descriptionKey)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div id="section-6">
              <Badge variant="outline" className="border-border text-muted-foreground mb-4">
                <HelpCircle className="mr-1 size-3" />
                {t('support.faq')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">{t('faq.title')}</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={faq.questionKey} className="rounded-xl border border-border bg-card/50">
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

      <AppSetupGuideCta trackingId="closed_testing_setup_guide" />

      <FullDemoCta trackingId="closed_testing_full_demo" />

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Shield className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">{t('closedTesting.ctaTitle')}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('closedTesting.ctaDescription')}</p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('closedTesting.ctaButton')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t('closedTesting.ctaFootnote')}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
