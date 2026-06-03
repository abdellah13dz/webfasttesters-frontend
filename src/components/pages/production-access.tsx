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
  Clock,
  Headphones,
  Zap,
  Star,
  CreditCard,
  Send,
  Smartphone,
  Trophy,
} from 'lucide-react'

export default function ProductionAccessPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const steps = [
    {
      icon: <CreditCard className="size-6 text-blue-600 dark:text-blue-400" />,
      step: 'Step 1',
      title: 'Pay $15',
      description:
        'Make a one-time payment of $15. No subscriptions, no hidden fees. Just a simple, upfront payment for professional testing services.',
    },
    {
      icon: <Send className="size-6 text-blue-600 dark:text-blue-400" />,
      step: 'Step 2',
      title: 'Submit Your App',
      description:
        'Share your app\'s Play Store link or APK with us. We\'ll set everything up on our end and get your testing track configured.',
    },
    {
      icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
      step: 'Step 3',
      title: '14 Testers Start',
      description:
        'Within 6 hours, 14 professional testers will be assigned to your app. They\'ll install your app and begin the 14-day testing period.',
    },
    {
      icon: <Trophy className="size-6 text-blue-600 dark:text-blue-400" />,
      step: 'Step 4',
      title: 'Production Access',
      description:
        'After the testing period completes successfully, you\'ll be eligible for production access on Google Play. We guarantee it — or your money back.',
    },
  ]

  const includes = [
    {
      icon: <Users className="size-6 text-blue-600 dark:text-blue-400" />,
      title: t('home.professionalTesters'),
      description:
        'More than double the required 12 testers. This buffer ensures you always meet Google Play\'s requirements, even if some testers become inactive.',
    },
    {
      icon: <Calendar className="size-6 text-blue-600 dark:text-blue-400" />,
      title: '16-Day Testing Period',
      description:
        'We run testing for 16 days — 2 days beyond the 14-day requirement. This extra buffer ensures there are no gaps in your testing continuity.',
    },
    {
      icon: <Shield className="size-6 text-blue-600 dark:text-blue-400" />,
      title: t('home.productionAccessGuarantee'),
      description:
        'If your app doesn\'t get production access after our testing period, we\'ll run another round of testing for free. That\'s how confident we are in our service.',
    },
    {
      icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
      title: t('home.comprehensiveReports'),
      description:
        'Get detailed testing reports including bug reports, usability feedback, device compatibility notes, and suggestions for improvement.',
    },
    {
      icon: <Headphones className="size-6 text-blue-600 dark:text-blue-400" />,
      title: '24/7 Support',
      description:
        'Our support team is available around the clock to answer your questions, troubleshoot issues, and ensure your testing runs smoothly.',
    },
  ]

  const stats = [
    { value: '99.9%', label: t('home.successRate'), description: 'Apps get production access' },
    { value: '6 Hours', label: 'Start Time', description: 'Average time to begin testing' },
    { value: '1,500+', label: t('home.appsPublished'), description: 'Successfully launched on Play Store' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <CheckCircle2 className="mr-1 size-3" />
              12 testers for 14 days
            </Badge>
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <CreditCard className="mr-1 size-3" />
              $15 one-time
            </Badge>
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <Star className="mr-1 size-3" />
              99% approval rate
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get Google Play{' '}
            <span className="text-blue-600 dark:text-blue-400">Production Access</span>
          </h1>
          <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
            Google Play Closed Testing $15 | 12 Testers for Production Access
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            New Google Play developer accounts require closed testing before publishing. We provide
            14 verified testers who stay for 16 days — guaranteed to meet Google Play&apos;s
            requirements and get your app to production.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              Get Production Access for $15
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/closed-testing')}
            >
              Learn About Closed Testing
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
                Understanding the Requirement
              </Badge>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">What is Production Access?</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Since 2024, Google Play requires all new personal developer accounts to complete a
                closed testing phase before they can publish apps to production. This means you need
                at least <strong className="text-foreground">12 testers</strong> who actively test
                your app for <strong className="text-foreground">14 consecutive days</strong>.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Only after successfully completing this testing period can you apply for production
                access and publish your app to the Google Play Store for all users to download.
              </p>
            </div>
            <div>
              <Card className="border-border bg-card/50 h-full">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Google Play Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      New personal accounts must complete closed testing
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      Minimum 12 testers required
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      Testing must last 14 consecutive days
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      Testers must provide genuine feedback
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      Low-quality reviews may be flagged
                    </li>
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
            How It Works
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Get Production Access in 4 Simple Steps
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
                        {step.step}
                      </p>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
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
              What&apos;s Included
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Everything You Need for Production Access
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item, index) => (
              <div key={index} className="group">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <p className="text-lg font-medium text-foreground">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
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
                Get Production Access for $15
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Stop struggling with Google Play&apos;s closed testing requirements. Get 14
                professional testers, 16 days of testing, and a guaranteed path to production
                access — all for a one-time payment of $15.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/production-access')}
                >
                  Get Production Access for $15
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                One-time payment · No subscriptions · 100% money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
