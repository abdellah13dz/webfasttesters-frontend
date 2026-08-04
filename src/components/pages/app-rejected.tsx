'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Shield,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Users,
  MessageSquare,
  Calendar,
  FileText,
  ThumbsDown,
  Clock,
  Star,
  RotateCcw,
  Zap,
  Sparkles,
} from 'lucide-react'

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

const beforeItems = [
  { icon: <XCircle className="size-5 text-red-600 dark:text-red-400" />, textKey: 'appRejected.beforeItem1' },
  { icon: <ThumbsDown className="size-5 text-red-600 dark:text-red-400" />, textKey: 'appRejected.beforeItem2' },
  { icon: <RotateCcw className="size-5 text-red-600 dark:text-red-400" />, textKey: 'appRejected.beforeItem3' },
  { icon: <Clock className="size-5 text-red-600 dark:text-red-400" />, textKey: 'appRejected.beforeItem4' },
  { icon: <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />, textKey: 'appRejected.beforeItem5' },
]

const afterItems = [
  { icon: <CheckCircle2 className="size-5 text-blue-600 dark:text-blue-400" />, textKey: 'appRejected.afterItem1' },
  { icon: <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />, textKey: 'appRejected.afterItem2' },
  { icon: <Shield className="size-5 text-blue-600 dark:text-blue-400" />, textKey: 'appRejected.afterItem3' },
  { icon: <Zap className="size-5 text-blue-600 dark:text-blue-400" />, textKey: 'appRejected.afterItem4' },
  { icon: <Star className="size-5 text-blue-600 dark:text-blue-400" />, textKey: 'appRejected.afterItem5' },
]

const rejectionReasons = [
  {
    icon: <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />,
    titleKey: 'appRejected.reason1Title',
    descriptionKey: 'appRejected.reason1Description',
    howWeFixKey: 'appRejected.reason1HowWeFix',
  },
  {
    icon: <ThumbsDown className="size-5 text-amber-600 dark:text-amber-400" />,
    titleKey: 'appRejected.reason2Title',
    descriptionKey: 'appRejected.reason2Description',
    howWeFixKey: 'appRejected.reason2HowWeFix',
  },
  {
    icon: <Users className="size-5 text-amber-600 dark:text-amber-400" />,
    titleKey: 'appRejected.reason3Title',
    descriptionKey: 'appRejected.reason3Description',
    howWeFixKey: 'appRejected.reason3HowWeFix',
  },
  {
    icon: <Clock className="size-5 text-amber-600 dark:text-amber-400" />,
    titleKey: 'appRejected.reason4Title',
    descriptionKey: 'appRejected.reason4Description',
    howWeFixKey: 'appRejected.reason4HowWeFix',
  },
]

const howWeFixSteps = [
  {
    icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'appRejected.fixStep1Title',
    descriptionKey: 'appRejected.fixStep1Description',
  },
  {
    icon: <MessageSquare className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'appRejected.fixStep2Title',
    descriptionKey: 'appRejected.fixStep2Description',
  },
  {
    icon: <Calendar className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'appRejected.fixStep3Title',
    descriptionKey: 'appRejected.fixStep3Description',
  },
  {
    icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
    titleKey: 'appRejected.fixStep4Title',
    descriptionKey: 'appRejected.fixStep4Description',
  },
]

const guaranteeBullets = [
  { textKey: 'appRejected.guaranteeBullet1' },
  { textKey: 'appRejected.guaranteeBullet2' },
  { textKey: 'appRejected.guaranteeBullet3' },
]

export default function AppRejectedPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/60 via-red-50/30 to-blue-100/50 dark:from-red-950/30 dark:via-red-950/10 dark:to-blue-950/20" />

        {/* Floating warning triangles */}
        <div className="absolute top-20 left-[8%] animate-warning-float">
          <AlertTriangle className="h-8 w-8 text-red-500/20" />
        </div>
        <div className="absolute top-40 right-[12%] animate-warning-float" style={{ animationDelay: '1s' }}>
          <AlertTriangle className="h-6 w-6 text-red-500/15" />
        </div>
        <div className="absolute bottom-24 left-[25%] animate-warning-float" style={{ animationDelay: '2s' }}>
          <AlertTriangle className="h-10 w-10 text-amber-500/15" />
        </div>
        <div className="absolute top-28 left-[55%] animate-warning-float" style={{ animationDelay: '3s' }}>
          <AlertTriangle className="h-5 w-5 text-red-500/10" />
        </div>
        <div className="absolute bottom-16 right-[30%] animate-warning-float" style={{ animationDelay: '1.5s' }}>
          <AlertTriangle className="h-7 w-7 text-amber-500/12" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text on left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 border-red-800 dark:border-red-950/50 bg-red-100/50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/50 text-[13px] tracking-wider">
                <XCircle className="mr-1 size-3" />
                {t('appRejected.heroBadge')}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('appRejected.heroTitlePrefix')}{' '}
                <span className="text-blue-600 dark:text-blue-400">{t('appRejected.heroTitleHighlight')}</span>{' '}
                {t('appRejected.heroTitleSuffix')}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {t('appRejected.heroDescription')}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 animate-glow-pulse-red"
                  onClick={() => navigate('/production-access')}
                >
                  {t('appRejected.ctaFixRejection')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground/80 hover:bg-muted"
                  onClick={() => navigate('/blog/google-play-closed-testing')}
                >
                  {t('appRejected.ctaUnderstandClosedTesting')}
                </Button>
              </div>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/app-rejected.png"
                alt={t('appRejected.heroImageAlt')}
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <AnimatedSection>
        <section className="border-y border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">{t('appRejected.beforeAfterTitle')}</h2>
              <p className="mt-2 text-muted-foreground">{t('appRejected.beforeAfterSubtitle')}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 relative">
              {/* Before */}
              <Card className="border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/10 transition-transform duration-500 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <XCircle className="size-5 text-red-600 dark:text-red-400" />
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">{t('appRejected.beforeLabel')}</h3>
                  </div>
                  <ul className="space-y-4">
                    {beforeItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground/80">
                        {item.icon}
                        <span>{t(item.textKey)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Animated arrow between cards */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-md">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-arrow-bounce" />
                </div>
              </div>

              {/* After */}
              <Card className="border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/10 transition-transform duration-500 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{t('appRejected.afterLabel')}</h3>
                  </div>
                  <ul className="space-y-4">
                    {afterItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground/80">
                        {item.icon}
                        <span>{t(item.textKey)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Common Rejection Reasons */}
      <AnimatedSection delay={100}>
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-amber-800 text-amber-600 dark:text-amber-400">
              {t('appRejected.commonIssuesBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('appRejected.rejectionReasonsTitle')}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t('appRejected.rejectionReasonsSubtitle')}
            </p>
          </div>
          <div className="space-y-6">
            {rejectionReasons.map((reason, index) => (
              <Card key={index} className="border-border bg-card/50 hover:border-blue-500/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-lg bg-amber-100 dark:bg-amber-950/20 p-2">{reason.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t(reason.titleKey)}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t(reason.descriptionKey)}
                      </p>
                    </div>
                  </div>
                  <div className="ml-11 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-blue-700 dark:text-blue-300/80">
                      <span className="font-medium">{t('appRejected.howWeFixItLabel')}</span> {t(reason.howWeFixKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* How We Fix It */}
      <AnimatedSection delay={200}>
        <section className="border-y border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                {t('appRejected.ourSolutionBadge')}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('appRejected.howWeFixTitle')}</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {howWeFixSteps.map((step, index) => (
                <div key={index} className="group hover-scale transition-transform duration-300">
                  <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(step.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(step.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Guarantee */}
      <AnimatedSection delay={300}>
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="gradient-border border-blue-300 dark:border-blue-800/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center relative">
              {/* Sparkle effects */}
              <div className="absolute top-8 right-[15%]">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-sparkle" />
              </div>
              <div className="absolute top-16 left-[20%]">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-sparkle-delayed" />
              </div>
              <div className="absolute bottom-12 right-[25%]">
                <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-300 animate-sparkle" style={{ animationDelay: '1.2s' }} />
              </div>

              <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-600/30 animate-glow-pulse">
                <Shield className="size-10 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm mb-4">
                {t('home.productionGuarantee')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('appRejected.guaranteeTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t('appRejected.guaranteeDescription')}
              </p>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                {guaranteeBullets.map((bullet, index) => (
                  <span key={index}>{t(bullet.textKey)}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={400}>
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t('appRejected.ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t('appRejected.ctaDescription')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 animate-glow-pulse"
                onClick={() => navigate('/production-access')}
              >
                {t('appRejected.ctaFixRejection')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {t('appRejected.ctaFootnote')}
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
