'use client'

import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Settings,
  UserPlus,
  Play,
  FileCheck,
  CreditCard,
  Smartphone,
  Users,
  Calendar,
  Zap,
  BookOpen,
  XCircle,
} from 'lucide-react'

export default function SetupGuidePage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const steps = [
    {
      step: 1,
      icon: <CreditCard className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Create Google Play Developer Account',
      subtitle: '$25 one-time fee',
      description:
        'Visit the Google Play Console and sign up for a developer account. You\'ll need a Google account and a one-time $25 registration fee. Fill in your developer profile, including your developer name and contact information.',
      tips: [
        'Use a Gmail account you check regularly — Google sends important notifications',
        'Choose your developer name carefully — it\'s visible to users on the Play Store',
        'Personal accounts require closed testing; organization accounts do not',
      ],
      mistakes: [
        'Using an email you don\'t check regularly',
        'Choosing a developer name you might want to change later (it\'s hard to change)',
        'Setting up as a personal account when you have an organization',
      ],
    },
    {
      step: 2,
      icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Set Up Your App Listing',
      subtitle: 'Store listing information',
      description:
        'Create a new app in the Play Console and fill in all required store listing information. This includes your app name, short and full descriptions, screenshots, feature graphic, app icon, content rating, and privacy policy URL.',
      tips: [
        'Your privacy policy URL must be accessible — a broken or missing URL is a common rejection reason',
        'Screenshots should represent actual app functionality, not mockups',
        'Write descriptions that accurately describe what your app does',
        'Complete the content rating questionnaire honestly',
      ],
      mistakes: [
        'Using placeholder screenshots or descriptions',
        'Forgetting to add a privacy policy URL',
        'Inaccurate content rating that gets flagged later',
        'Copying descriptions from other apps',
      ],
    },
    {
      step: 3,
      icon: <Settings className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Configure Closed Testing',
      subtitle: 'Set up your testing track',
      description:
        'Navigate to Testing → Closed Testing in the Play Console. Create a new testing track and upload your app bundle (AAB) or APK. Fill in the release notes and configure your testing settings.',
      tips: [
        'Use Android App Bundle (AAB) instead of APK for smaller download sizes',
        'Write clear release notes explaining what\'s in this version',
        'You can update your app during testing without resetting the 14-day counter',
        'Make sure your app is functional — don\'t upload a half-finished product',
      ],
      mistakes: [
        'Uploading a debug build instead of a release build',
        'Forgetting to sign your app with your production keystore',
        'Not testing the uploaded build yourself first',
      ],
    },
    {
      step: 4,
      icon: <UserPlus className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Add Testers',
      subtitle: 'This is where we help',
      description:
        'In the Closed Testing section, add testers by creating email lists or Google Groups. You need at least 12 testers who will stay active for 14 consecutive days. This is the step where most developers get stuck — finding reliable testers is challenging.',
      tips: [
        'Use Fast Testers to get 14 guaranteed professional testers for $15',
        'If using free methods, recruit significantly more than 12 to account for drop-offs',
        'Send welcome emails to your testers explaining what you need from them',
        'Consider offering incentives for testers who stay the full period',
      ],
      mistakes: [
        'Only adding 12 testers with no buffer — you\'ll likely fall short',
        'Not communicating with testers about expectations',
        'Relying only on friends and family who won\'t provide honest feedback',
        'Waiting too long to add testers after uploading your app',
      ],
    },
    {
      step: 5,
      icon: <Play className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Run 14-Day Testing Period',
      subtitle: 'Monitor and maintain participation',
      description:
        'Once testers join and install your app, the 14-day testing period begins. Monitor tester activity in the Play Console to ensure all testers remain active throughout the period. You can release updates during this time without resetting the counter.',
      tips: [
        'Check tester activity daily in the Play Console',
        'If testers become inactive, add replacements immediately',
        'Release updates if testers find bugs — this shows active development',
        'Engage with tester feedback and respond to their concerns',
      ],
      mistakes: [
        'Not monitoring tester activity — you may not realize testers have dropped off',
        'Ignoring tester feedback instead of addressing their concerns',
        'Making major changes to your testing track that could reset the counter',
        'Not releasing updates for bugs that testers report',
      ],
    },
    {
      step: 6,
      icon: <FileCheck className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'Apply for Production Access',
      subtitle: 'The final step',
      description:
        'After successfully completing the 14-day testing period, you can apply for production access through the Play Console. Google will review your testing data, app quality, and tester feedback. If everything meets their requirements, you\'ll be granted access to publish your app.',
      tips: [
        'Make sure your app listing is complete and accurate before applying',
        'Review all tester feedback and address any major issues',
        'Ensure your privacy policy and content rating are up to date',
        'Be patient — Google\'s review process can take a few days',
      ],
      mistakes: [
        'Applying before the 14-day period is truly complete',
        'Not addressing critical bugs reported by testers',
        'Having incomplete store listing information',
        'Submitting with low-quality or suspicious tester reviews',
      ],
    },
  ]

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
              Updated March 2026
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Google Play Console{' '}
            <span className="text-blue-600 dark:text-blue-400">Setup Guide</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A complete step-by-step guide to setting up your Google Play Developer account,
            configuring closed testing, and getting your app published. Follow these steps and
            you&apos;ll be on the Play Store in no time.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={index} className={`border-border ${index === 3 ? 'border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/5' : 'bg-card/50'}`}>
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Step {step.step}
                      </p>
                      {index === 3 && (
                        <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs">
                          We Help Here
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{step.title}</h2>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Tips */}
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <CheckCircle2 className="size-4" />
                      Tips
                    </h3>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mistakes */}
                  <div className="rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/20 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                      <XCircle className="size-4" />
                      Common Mistakes
                    </h3>
                    <ul className="space-y-2">
                      {step.mistakes.map((mistake, mistakeIndex) => (
                        <li key={mistakeIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-600 dark:bg-red-400" />
                          {mistake}
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
                Need Testers? We&apos;ve Got You Covered
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Step 4 is where most developers get stuck. Finding 12+ reliable testers who stay
                for 14 days is harder than it sounds. Let us handle it — get 14 professional
                testers for just $15.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/production-access')}
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
                  Free Tester Options
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Quick Reference</h2>
          <p className="mt-2 text-muted-foreground">Everything you need at a glance.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <CreditCard className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">$25</div>
              <p className="text-sm text-muted-foreground">Developer Account Fee</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <Users className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">12+</div>
              <p className="text-sm text-muted-foreground">Testers Required</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-5 text-center">
              <Calendar className="mx-auto mb-3 size-8 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-foreground">14</div>
              <p className="text-sm text-muted-foreground">Days of Testing</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Set Up Your App?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Follow this guide step by step, and when you get to Step 4, let us handle the
            testers. 14 professional testers for $15 — it&apos;s the easiest part of the process.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              {t('blog.getTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            One-time payment · 14 guaranteed testers · Production access guarantee
          </p>
        </div>
      </section>
    </div>
  )
}
