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

export default function AppRejectedPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const beforeItems = [
    { icon: <XCircle className="size-5 text-red-600 dark:text-red-400" />, text: 'App Rejected by Google Play' },
    { icon: <ThumbsDown className="size-5 text-red-600 dark:text-red-400" />, text: 'Generic, low-quality reviews' },
    { icon: <RotateCcw className="size-5 text-red-600 dark:text-red-400" />, text: 'Stuck in endless review loop' },
    { icon: <Clock className="size-5 text-red-600 dark:text-red-400" />, text: 'Weeks wasted finding new testers' },
    { icon: <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />, text: 'No clear path to production' },
  ]

  const afterItems = [
    { icon: <CheckCircle2 className="size-5 text-blue-600 dark:text-blue-400" />, text: 'Professional testing from day one' },
    { icon: <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />, text: 'Detailed, quality feedback' },
    { icon: <Shield className="size-5 text-blue-600 dark:text-blue-400" />, text: 'Production access granted' },
    { icon: <Zap className="size-5 text-blue-600 dark:text-blue-400" />, text: 'Results within 14 days' },
    { icon: <Star className="size-5 text-blue-600 dark:text-blue-400" />, text: 'Clear, proven process' },
  ]

  const rejectionReasons = [
    {
      icon: <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />,
      title: 'Insufficient Testing Quality',
      description:
        'Google detected that your testing didn\'t meet their quality standards. This could mean testers weren\'t genuinely using the app, or the testing period had gaps.',
      howWeFix:
        'Our professional testers are verified users who actively engage with your app and provide genuine, detailed feedback throughout the entire testing period.',
    },
    {
      icon: <ThumbsDown className="size-5 text-amber-600 dark:text-amber-400" />,
      title: 'Generic or Low-Quality Reviews',
      description:
        'If your testers left reviews like "good app" or "works fine," Google may flag these as low quality. They want to see detailed, meaningful feedback that shows genuine app usage.',
      howWeFix:
        'Our testers are trained to provide comprehensive reviews covering usability, features, bugs, and suggestions — the kind of feedback Google is looking for.',
    },
    {
      icon: <Users className="size-5 text-amber-600 dark:text-amber-400" />,
      title: 'Not Enough Testers',
      description:
        'You need at least 12 testers for the full 14-day period. If testers dropped off during testing, you may not have met the minimum requirement.',
      howWeFix:
        'We assign 14 testers — more than double the minimum. Even if some become inactive, you\'ll always have enough active testers to meet the requirement.',
    },
    {
      icon: <Clock className="size-5 text-amber-600 dark:text-amber-400" />,
      title: 'Testing Period Too Short',
      description:
        'If your testers didn\'t stay active for 14 consecutive days, your testing period may not count. Gaps in activity can invalidate the entire testing period.',
      howWeFix:
        'We run testing for 16 days (2 days buffer beyond the requirement) and actively monitor tester participation, replacing anyone who becomes inactive.',
    },
  ]

  const howWeFixSteps = [
    {
      icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Professional Testers',
      description:
        'We assign 14 verified, professional testers to your app. These are real people using real Android devices — not bots or emulators.',
    },
    {
      icon: <MessageSquare className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Detailed Feedback',
      description:
        'Every tester provides comprehensive feedback including bug reports, UX observations, feature suggestions, and honest app reviews.',
    },
    {
      icon: <Calendar className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Continuous Testing',
      description:
        'We monitor tester activity daily and replace inactive testers immediately. Your 14-day testing period will have zero gaps.',
    },
    {
      icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Quality Reports',
      description:
        'Receive detailed testing reports that you can submit with your production access application, demonstrating thorough testing to Google.',
    },
  ]

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
                App Rejected?
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                App Rejected? Get{' '}
                <span className="text-blue-600 dark:text-blue-400">Production Access</span> in 14 Days
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We&apos;ve helped 1,000+ rejected apps get production access on Google Play. Our
                professional testers provide the quality feedback Google is looking for — guaranteed.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 animate-glow-pulse-red"
                  onClick={() => navigate('/production-access')}
                >
                  Fix Your Rejection for $15
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground/80 hover:bg-muted"
                  onClick={() => navigate('/closed-testing')}
                >
                  Understand Closed Testing
                </Button>
              </div>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/app-rejected.png"
                alt="App Rejected by Google Play"
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
              <h2 className="text-2xl font-bold sm:text-3xl">Before &amp; After</h2>
              <p className="mt-2 text-muted-foreground">See the difference professional testing makes.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 relative">
              {/* Before */}
              <Card className="border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/10 transition-transform duration-500 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <XCircle className="size-5 text-red-600 dark:text-red-400" />
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Before</h3>
                  </div>
                  <ul className="space-y-4">
                    {beforeItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground/80">
                        {item.icon}
                        <span>{item.text}</span>
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
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">After</h3>
                  </div>
                  <ul className="space-y-4">
                    {afterItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground/80">
                        {item.icon}
                        <span>{item.text}</span>
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
              Common Issues
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Common Rejection Reasons
            </h2>
            <p className="mt-4 text-muted-foreground">
              These are the most common reasons Google rejects apps after closed testing — and how we
              fix each one.
            </p>
          </div>
          <div className="space-y-6">
            {rejectionReasons.map((reason, index) => (
              <Card key={index} className="border-border bg-card/50 hover:border-blue-500/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-lg bg-amber-100 dark:bg-amber-950/20 p-2">{reason.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{reason.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-11 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-blue-700 dark:text-blue-300/80">
                      <span className="font-medium">How we fix it:</span> {reason.howWeFix}
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
                Our Solution
              </Badge>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">How We Fix Your Rejection</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {howWeFixSteps.map((step, index) => (
                <div key={index} className="group hover-scale transition-transform duration-300">
                  <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
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
                We Guarantee Production Access
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                If your app doesn&apos;t get production access after our testing period, we&apos;ll
                run another round of testing completely free. We&apos;ll keep testing until your app
                is approved — that&apos;s our promise to you.
              </p>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <span>✓ No additional charges</span>
                <span>✓ Unlimited re-testing until approved</span>
                <span>✓ Full refund if we can&apos;t get you approved</span>
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
              Fix Your Rejection Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Stop going back and forth with Google Play review. Get professional testers who
              provide the quality feedback Google requires — and get your app to production.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 animate-glow-pulse"
                onClick={() => navigate('/production-access')}
              >
                Fix Your Rejection for $15
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              One-time payment · 100% guarantee · Unlimited re-testing
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
