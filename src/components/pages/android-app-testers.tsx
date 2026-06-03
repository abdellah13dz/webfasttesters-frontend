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
  Zap,
  AlertTriangle,
  UserX,
  Timer,
} from 'lucide-react'

export default function AndroidAppTestersPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const challenges = [
    {
      icon: <AlertTriangle className="size-5 text-amber-400" />,
      title: 'Google Play Requires 12+ Testers for 14 Days',
      description:
        'New personal developer accounts must run closed testing with at least 12 testers for 14 consecutive days before publishing. Finding and managing that many reliable testers is a major hurdle.',
    },
    {
      icon: <UserX className="size-5 text-amber-400" />,
      title: 'Friends Don\'t Provide Real Feedback',
      description:
        'Your friends and family will install your app and say "it\'s great!" — but they won\'t find the bugs or give you the honest, detailed feedback you need to improve your app and pass review.',
    },
    {
      icon: <Clock className="size-5 text-amber-400" />,
      title: 'Reddit & Discord Testers Ghost',
      description:
        'You spend hours posting on Reddit and Discord, and testers initially seem interested. But within days, they stop responding, leave the testing track, and you\'re back to square one.',
    },
    {
      icon: <Timer className="size-5 text-amber-400" />,
      title: 'Managing Testers Manually Takes Too Much Time',
      description:
        'Coordinating with testers, sending reminders, tracking who\'s still active, and collecting feedback — it\'s a full-time job that takes you away from actually building your app.',
    },
  ]

  const features = [
    {
      icon: <Users className="size-6 text-blue-400" />,
      title: '14 Verified Testers',
      description:
        'We assign 14 professional testers to your app — more than the 12 minimum required by Google Play. This buffer ensures you always meet the requirement even if a few testers drop off.',
    },
    {
      icon: <Smartphone className="size-6 text-blue-400" />,
      title: 'Real Devices',
      description:
        'Our testers use real Android devices — not emulators. This means you get feedback from actual hardware with real network conditions, screen sizes, and Android versions.',
    },
    {
      icon: <MessageSquare className="size-6 text-blue-400" />,
      title: 'Genuine Feedback',
      description:
        'Each tester provides detailed, constructive feedback about your app\'s usability, performance, and bugs. No generic "looks good" reviews — real insights that help you improve.',
    },
    {
      icon: <Calendar className="size-6 text-blue-400" />,
      title: '14-Day Continuity',
      description:
        'Our testers stay active for the full 14-day period required by Google Play. We monitor participation daily and replace any testers who become inactive to ensure continuous coverage.',
    },
    {
      icon: <FileText className="size-6 text-blue-400" />,
      title: t('home.comprehensiveReports'),
      description:
        'Receive detailed testing reports including bug reports, UX feedback, device-specific issues, and screenshots. Everything you need to improve your app and pass Google Play review.',
    },
  ]

  const comparisonData = [
    { feature: 'Testers actually show up', free: false, professional: true },
    { feature: 'Stay for full 14 days', free: false, professional: true },
    { feature: 'Provide detailed feedback', free: false, professional: true },
    { feature: 'Real device testing', free: 'sometimes', professional: true },
    { feature: 'Bug reports with screenshots', free: false, professional: true },
    { feature: 'Active monitoring & replacement', free: false, professional: true },
    { feature: 'Guaranteed production access', free: false, professional: true },
    { feature: 'Time to set up', free: '5+ hours', professional: '5 minutes' },
    { feature: 'Ongoing management', free: 'You handle it', professional: 'We handle it' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Badge className="mb-6 border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
            <Smartphone className="mr-1 size-3" />
            Android App Testing
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Android App Testers Who Actually{' '}
            <span className="text-blue-400">Show Up</span> &amp; Stay for{' '}
            <span className="text-blue-400">14 Days</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Stop scrambling to find testers on Reddit, Discord, or among friends. Get 14 verified
            Android app testers assigned to your app within hours — real people, real devices, real
            feedback.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              Get 14 Android Testers for $15
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

      {/* The Android Developer Challenge */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            The Challenge
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">The Android Developer Challenge</h2>
          <p className="mt-4 text-muted-foreground">
            Every new Android developer faces the same frustrating cycle when trying to meet Google
            Play&apos;s testing requirements.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {challenges.map((challenge, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 transition-colors hover:border-border"
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-950/10 dark:bg-amber-950/50 p-2">{challenge.icon}</div>
                  <CardTitle className="text-base text-foreground">{challenge.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 text-blue-400">
              What You Get
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Everything You Need to Pass Closed Testing
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="mb-4 rounded-xl bg-blue-950/10 dark:bg-blue-950/50 p-3 w-fit transition-colors group-hover:bg-blue-950/50">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            Comparison
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Why Professional Testers Beat Free Options
          </h2>
          <p className="mt-4 text-muted-foreground">
            Free testers cost you time, and time is money. Here&apos;s the honest comparison.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Feature</th>
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Free Testers
                </th>
                <th className="px-6 py-4 text-center font-medium text-blue-400">
                  Professional Testers
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="px-6 py-4 text-foreground/80">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {row.free === true ? (
                      <CheckCircle2 className="mx-auto size-5 text-blue-400" />
                    ) : row.free === false ? (
                      <XCircle className="mx-auto size-5 text-red-400" />
                    ) : (
                      <span className="text-xs text-muted-foreground">{row.free}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.professional === true ? (
                      <CheckCircle2 className="mx-auto size-5 text-blue-400" />
                    ) : (
                      <span className="text-xs text-blue-400">{row.professional}</span>
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
              <div className="mb-2 text-3xl font-bold text-blue-400">1,500+</div>
              <p className="text-sm text-muted-foreground">{t('home.appsPublished')}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-400">99.9%</div>
              <p className="text-sm text-muted-foreground">{t('home.successRate')}</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-400">6 Hours</div>
              <p className="text-sm text-muted-foreground">Average Start Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-card/50">
          <CardContent className="p-8 sm:p-12 text-center">
            <Shield className="mx-auto mb-6 size-12 text-blue-400" />
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to Get Your App Published?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Stop wasting weeks chasing unreliable testers. Get 14 verified Android app testers
              assigned to your app within hours. Professional testing, guaranteed results, and
              production access — all for just $15.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate('/production-access')}
              >
                Get 14 Android Testers for $15
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              One-time payment · No subscriptions · 100% money-back guarantee
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
