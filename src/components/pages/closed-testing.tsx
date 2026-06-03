'use client'

import { useState } from 'react'
import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Shield,
  Settings,
  HelpCircle,
  Search,
  Clock,
  Smartphone,
  Eye,
  Lock,
  Globe,
  UserPlus,
  Play,
  FileCheck,
  Bug,
  RefreshCw,
  Zap,
} from 'lucide-react'

export default function ClosedTestingPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const tocItems = [
    'What is Closed Testing?',
    'Internal vs Closed vs Open Testing',
    'The 12+14 Requirement',
    'Step-by-Step Setup Guide',
    'Common Issues & Troubleshooting',
    'Where to Find Testers',
    'FAQ',
  ]

  const testingComparison = [
    {
      type: 'Internal Testing',
      icon: <Lock className="size-5 text-blue-600 dark:text-blue-400" />,
      who: 'Up to 100 testers you choose by email',
      visibility: 'Not visible on Play Store',
      review: 'No Google review needed',
      useCase: 'Quick internal QA before broader testing',
      requirement: 'Not sufficient for production access',
    },
    {
      type: 'Closed Testing',
      icon: <Eye className="size-5 text-blue-600 dark:text-blue-400" />,
      who: '12+ testers via email lists or Google Groups',
      visibility: 'Not visible on Play Store',
      review: 'Google reviews your app',
      useCase: 'Required for new developer accounts',
      requirement: '✓ Required for production access',
    },
    {
      type: 'Open Testing',
      icon: <Globe className="size-5 text-amber-600 dark:text-amber-400" />,
      who: 'Anyone with the link can join',
      visibility: 'Listed on Play Store (optional)',
      review: 'Google reviews your app',
      useCase: 'Large-scale beta before production launch',
      requirement: 'Can also qualify for production access',
    },
  ]

  const setupSteps = [
    {
      step: 1,
      title: 'Create a Google Play Developer Account',
      description:
        'Go to the Google Play Console and sign up for a developer account. There\'s a one-time $25 registration fee. Make sure your account is set up as a personal account (not organization) since the closed testing requirement applies to personal accounts.',
      tip: 'Use a Gmail account you check regularly — Google will send important notifications about your testing status.',
    },
    {
      step: 2,
      title: 'Create Your App Listing',
      description:
        'In the Play Console, create a new app and fill in all the required store listing information: app name, description, screenshots, feature graphic, content rating, and privacy policy. Your app doesn\'t need to be perfect yet, but it should be functional.',
      tip: 'Make sure your privacy policy URL is accessible — a missing or broken privacy policy is one of the most common reasons for rejection.',
    },
    {
      step: 3,
      title: 'Upload Your App to Closed Testing',
      description:
        'Navigate to Testing → Closed Testing in the Play Console. Create a new release and upload your app bundle (AAB) or APK. Fill in the release notes explaining what\'s in this version.',
      tip: 'You can update your app during the testing period without resetting the 14-day counter, as long as you don\'t change the testing track.',
    },
    {
      step: 4,
      title: 'Add Testers to Your Track',
      description:
        'In the Closed Testing section, add testers by creating email lists or Google Groups. You need at least 12 testers. This is where many developers get stuck — finding reliable testers who will actually stay for 14 days is challenging.',
      tip: 'Consider using a professional testing service like Fast Testers to ensure you have reliable testers who won\'t ghost during the testing period.',
    },
    {
      step: 5,
      title: 'Run the 14-Day Testing Period',
      description:
        'Once testers join your track and install your app, the 14-day testing period begins. All 12+ testers must remain active throughout the entire period. Monitor tester activity in the Play Console to ensure participation.',
      tip: 'If a tester drops out, you may need to add a replacement. The 14-day period requires continuous testing — gaps can disqualify your testing period.',
    },
    {
      step: 6,
      title: 'Apply for Production Access',
      description:
        'After successfully completing the 14-day closed testing period, you can apply for production access. Google will review your testing data and, if everything meets their requirements, grant you access to publish your app to all users on the Play Store.',
      tip: 'Make sure your testers have provided genuine, meaningful feedback. Generic or suspicious reviews can lead to rejection even after completing the testing period.',
    },
  ]

  const commonIssues = [
    {
      icon: <UserPlus className="size-5 text-red-600 dark:text-red-400" />,
      title: 'Not Enough Testers',
      description:
        'You need at least 12 testers, but finding that many reliable people is harder than it sounds. Friends drop off, Reddit testers ghost, and you\'re left scrambling.',
      solution: 'Use Fast Testers to get 14 guaranteed testers for $15.',
    },
    {
      icon: <Clock className="size-5 text-red-600 dark:text-red-400" />,
      title: 'Testers Don\'t Stay for 14 Days',
      description:
        'Even if you find 12 testers initially, many will stop testing within a few days. The 14-day requirement means ALL testers must remain active throughout.',
      solution: 'Professional testers are committed to the full period. We monitor and replace anyone who becomes inactive.',
    },
    {
      icon: <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />,
      title: 'Low-Quality Reviews',
      description:
        'Google flags generic reviews like "good app" or "works fine" as low quality. Testers need to provide detailed, meaningful feedback about their experience.',
      solution: 'Our testers provide detailed reviews covering usability, performance, bugs, and suggestions.',
    },
    {
      icon: <Bug className="size-5 text-red-600 dark:text-red-400" />,
      title: 'App Crashes During Testing',
      description:
        'If your app has critical bugs that cause crashes, testers may not be able to provide meaningful feedback. This can also affect your testing data quality.',
      solution: 'Do thorough internal testing first, then use closed testing for real-world validation.',
    },
    {
      icon: <RefreshCw className="size-5 text-red-600 dark:text-red-400" />,
      title: 'Testing Period Resets',
      description:
        'If too many testers drop off or if you make significant changes to your testing track, the 14-day counter might reset, forcing you to start over.',
      solution: 'Having 14+ testers provides a buffer so drops don\'t affect your minimum requirement.',
    },
  ]

  const faqs = [
    {
      question: 'Who needs to do closed testing?',
      answer:
        'All new personal Google Play developer accounts created after a certain date must complete closed testing before they can publish apps to production. Organization accounts are exempt from this requirement.',
    },
    {
      question: 'How many testers do I need for closed testing?',
      answer:
        'You need a minimum of 12 testers in your closed testing track. They must all be active for 14 consecutive days. We recommend having 14+ testers as a safety buffer.',
    },
    {
      question: 'How long does closed testing take?',
      answer:
        'The minimum testing period is 14 consecutive days. All 12+ testers must remain active throughout this entire period. If there are gaps, the counter may reset.',
    },
    {
      question: 'Can I update my app during closed testing?',
      answer:
        'Yes, you can release updates to your app during the closed testing period. This won\'t reset the 14-day counter as long as you\'re updating within the same testing track.',
    },
    {
      question: 'What happens after closed testing is complete?',
      answer:
        'After successfully completing the 14-day testing period, you can apply for production access through the Google Play Console. Google will review your testing data and, if it meets their requirements, grant you access to publish your app.',
    },
    {
      question: 'Can I skip closed testing?',
      answer:
        'No, closed testing is mandatory for new personal developer accounts. You cannot publish to production without completing this requirement. The only exception is if you have an organization account.',
    },
    {
      question: 'What counts as "active" testing?',
      answer:
        'Google considers a tester active if they have installed your app and are using it regularly. Testers should provide meaningful interactions and feedback. Simply installing and never opening the app does not count.',
    },
    {
      question: 'Can I use emulators for testing?',
      answer:
        'Google prefers testers using real devices. While emulators technically work, testing on real devices provides more accurate results and is more likely to satisfy Google\'s quality requirements.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              Developer Guide
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              Updated March 2026
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Google Play Closed Testing:{' '}
            <span className="text-blue-600 dark:text-blue-400">Complete Guide 2026</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Every new personal Google Play developer account must pass closed testing before
            publishing an app. This guide explains everything you need to know about the
            requirement, how to set it up, and how to find reliable testers.
          </p>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/closed-testing.png"
          alt="Google Play Closed Testing Complete Guide"
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Content with TOC */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Sticky TOC - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {tocItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const el = document.getElementById(`section-${index}`)
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRight className="size-3 shrink-0" />
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-20 pb-16">
            {/* What is Closed Testing? */}
            <div id="section-0">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                Overview
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">What is Closed Testing?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Closed testing is a mandatory phase for all new personal Google Play developer
                  accounts. Before you can publish your app to the Google Play Store for all users,
                  you must first run a closed testing period where a group of testers uses your app
                  and provides feedback.
                </p>
                <p>
                  This requirement was introduced by Google to improve app quality on the Play Store
                  and ensure that new developers are committed to building quality apps. The closed
                  testing process helps identify bugs, usability issues, and other problems before
                  an app reaches the general public.
                </p>
                <p>
                  During closed testing, your app is not publicly visible on the Play Store. Only
                  testers you specifically invite can access and install your app. This creates a
                  controlled environment where you can gather feedback without risking your app&apos;s
                  public reputation.
                </p>
              </div>
            </div>

            {/* Internal vs Closed vs Open */}
            <div id="section-1">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                Comparison
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">
                Internal vs Closed vs Open Testing
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Google Play offers three types of testing tracks. Understanding the differences is
                crucial for meeting the production access requirement.
              </p>
              <div className="space-y-6">
                {testingComparison.map((item, index) => (
                  <Card key={index} className={`border-border ${index === 1 ? 'border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/10' : 'bg-card/50'}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <CardTitle className="text-xl text-foreground">{item.type}</CardTitle>
                        {index === 1 && (
                          <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Who Can Test
                          </p>
                          <p className="text-sm text-foreground/80">{item.who}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Visibility
                          </p>
                          <p className="text-sm text-foreground/80">{item.visibility}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Review Process
                          </p>
                          <p className="text-sm text-foreground/80">{item.review}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Use Case
                          </p>
                          <p className="text-sm text-foreground/80">{item.useCase}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Production Access
                          </p>
                          <p className={`text-sm font-medium ${index === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>
                            {item.requirement}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* The 12+14 Requirement */}
            <div id="section-2">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                The Core Requirement
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">The 12+14 Requirement</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The closed testing requirement for new personal Google Play developer accounts
                  can be summarized as the <strong className="text-foreground">12+14 rule</strong>:
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="border-blue-300 dark:border-blue-800/30 bg-blue-100/50 dark:bg-blue-950/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">12+</div>
                    <h3 className="font-semibold text-foreground">Testers Required</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You must have at least 12 testers in your closed testing track. More is
                      better — having 14+ provides a safety buffer.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-blue-300 dark:border-blue-800/30 bg-blue-100/50 dark:bg-blue-950/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">14</div>
                    <h3 className="font-semibold text-foreground">Consecutive Days</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      All 12+ testers must remain active for 14 consecutive days. Any gap in
                      testing may reset the counter.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This means you need to find at least 12 people who are willing to install your
                  app, use it regularly, and provide feedback for two full weeks. For many
                  developers — especially solo indie developers — this is the hardest part of
                  getting their app on the Play Store.
                </p>
                <p>
                  The testers must provide genuine, meaningful feedback. Google has systems to
                  detect low-quality or fake reviews, and if your testers leave generic comments
                  like &quot;nice app&quot; or &quot;works great,&quot; your testing period may
                  not count.
                </p>
              </div>
            </div>

            {/* Step-by-Step Setup */}
            <div id="section-3">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                Setup Guide
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">
                Step-by-Step Setup Guide
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Follow these steps to set up closed testing in your Google Play Console.
              </p>
              <div className="space-y-6">
                {setupSteps.map((step, index) => (
                  <Card key={index} className="border-border bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30 text-lg font-bold text-blue-600 dark:text-blue-400">
                          {step.step}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                          {step.tip && (
                            <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 p-3">
                              <Zap className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                              <p className="text-sm text-blue-700 dark:text-blue-300/80">
                                <span className="font-medium">Tip:</span> {step.tip}
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

            {/* Common Issues */}
            <div id="section-4">
              <Badge variant="outline" className="border-amber-800 text-amber-600 dark:text-amber-400 mb-4">
                Troubleshooting
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">
                Common Issues &amp; Troubleshooting
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                These are the most common problems developers face during closed testing, and how
                to solve them.
              </p>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <Card key={index} className="border-border bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="rounded-lg bg-red-100 dark:bg-red-950/20 p-2">{issue.icon}</div>
                        <div>
                          <h3 className="font-semibold text-foreground">{issue.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {issue.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-11 flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/20 p-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <p className="text-sm text-blue-700 dark:text-blue-300/80">
                          <span className="font-medium">Solution:</span> {issue.solution}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Where to Find Testers */}
            <div id="section-5">
              <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4">
                Finding Testers
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">Where to Find Testers</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Finding reliable testers is the biggest challenge in closed testing. Here are your
                options, ranked by reliability:
              </p>
              <div className="space-y-4">
                <Card className="border-blue-300 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-950/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge className="shrink-0 bg-blue-600 text-white">Best</Badge>
                      <div>
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                          Professional Testing Service (Fast Testers)
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          $15 for 14 guaranteed testers who stay for the full period. Most reliable
                          option — saves hours of coordination and comes with a production access
                          guarantee.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="shrink-0 border-border text-muted-foreground">
                        Good
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-foreground/80">Free Community Marketplace</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Fast Testers&apos;s free app lets you list your app and find volunteer
                          testers. No cost, but testers may not stay for the full 14 days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="shrink-0 border-border text-muted-foreground">
                        OK
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-foreground/80">Reddit &amp; Discord Communities</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Post on r/androiddev and Android Discord servers. Free but unreliable —
                          expect high ghost rates and generic feedback.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="shrink-0 border-border text-muted-foreground">
                        Risky
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-foreground/80">Friends &amp; Family</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Quick to set up, but they rarely provide honest feedback and almost never
                          stay for the full 14 days. Not recommended as your primary testing group.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div id="section-6">
              <Badge variant="outline" className="border-border text-muted-foreground mb-4">
                <HelpCircle className="mr-1 size-3" />
                {t('support.faq')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl mb-6">
                {t('faq.title')}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-xl border border-border bg-card/50">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-foreground pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Shield className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get Professional Testers for Closed Testing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Don&apos;t waste weeks struggling to find reliable testers. Get 14 professional
                testers assigned to your app within hours — guaranteed to meet Google Play&apos;s
                closed testing requirements.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/production-access')}
                >
                  Get Professional Testers for $15
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                One-time payment · 14 guaranteed testers · Production access guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
