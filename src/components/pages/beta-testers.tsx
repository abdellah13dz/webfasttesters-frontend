'use client'

import { useState } from 'react'
import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { useStickyAside } from '@/lib/hooks/use-sticky-aside'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  DollarSign,
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
  Sparkles,
  Shield,
  Zap,
  Clock,
  Globe,
} from 'lucide-react'

export default function BetaTestersPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { containerRef, asideRef, style: asideStyle } = useStickyAside()

  const methods = [
    {
      number: '01',
      icon: <Users className="size-5 text-blue-400" />,
      title: 'Free Community Marketplace',
      subtitle: 'Use Fast Testers\'s free app',
      tag: 'Free',
      tagColor: 'blue',
      description:
        'Fast Testers offers a free app where developers can list their apps and community members volunteer to test. It\'s the fastest free option available, and you can get started within minutes.',
      pros: [
        'Completely free to use',
        'Active community of Android enthusiasts',
        'Quick setup — list your app in minutes',
        'Good for getting initial feedback',
      ],
      cons: [
        'Testers may not stay for the full 14 days',
        'Feedback quality varies',
        'No guarantee of meeting Google Play requirements',
        'You still need to manage testers yourself',
      ],
    },
    {
      number: '02',
      icon: <Shield className="size-5 text-blue-400" />,
      title: 'Professional Testing Service',
      subtitle: '$15 for 14 guaranteed testers',
      tag: 'Recommended',
      tagColor: 'blue',
      description:
        'For developers who want guaranteed results, professional testing services like Fast Testers provide 14 verified testers who stay for the full 14-day period. This is the most reliable way to meet Google Play\'s closed testing requirements.',
      pros: [
        '14 guaranteed testers (exceeds the 12 minimum)',
        'Testers stay for the full 14 days',
        'Detailed feedback and bug reports',
        '99.9% success rate for production access',
        'No management required — we handle everything',
      ],
      cons: [
        'Costs $15 (one-time fee)',
        'Not free — but saves dozens of hours',
      ],
    },
    {
      number: '03',
      icon: <MessageCircle className="size-5 text-blue-400" />,
      title: 'Reddit Communities',
      subtitle: 'r/androiddev, r/googleplayconsole',
      tag: 'Free',
      tagColor: 'blue',
      description:
        'Reddit has several communities where developers look for testers. Subreddits like r/androiddev, r/googleplayconsole, and r/AndroidQuestions have regular "testing exchange" threads where you can post your app.',
      pros: [
        'Free to post',
        'Large community of Android developers',
        'Some experienced testers available',
        'Can get helpful developer feedback',
      ],
      cons: [
        'Very low response rate',
        'Testers frequently ghost after a few days',
        'Against subreddit rules in some communities',
        'No guarantee of getting enough testers',
        'Time-consuming to manage responses',
      ],
    },
    {
      number: '04',
      icon: <MessageSquare className="size-5 text-indigo-400" />,
      title: 'Discord Servers',
      subtitle: 'Join Android developer communities',
      tag: 'Free',
      tagColor: 'indigo',
      description:
        'There are several Discord servers dedicated to Android development where you can find testers. Look for communities like AndroidDev, Google Play Developers, and indie developer groups.',
      pros: [
        'Real-time communication with testers',
        'Can build relationships with other developers',
        'Some servers have dedicated testing channels',
        'Free to join and participate',
      ],
      cons: [
        'Testers are not verified or vetted',
        'High ghost rate — testers stop responding quickly',
        'Server rules may restrict self-promotion',
        'Very time-consuming to coordinate',
        'Discord servers come and go',
      ],
    },
    {
      number: '05',
      icon: <Facebook className="size-5 text-blue-400" />,
      title: 'Facebook Groups',
      subtitle: 'Android developer groups',
      tag: 'Free',
      tagColor: 'blue',
      description:
        'Facebook has numerous groups for Android developers and app testers. You can post about your app and ask for volunteers to join your testing track.',
      pros: [
        'Large potential reach',
        'Some groups are very active',
        'Free to post in most groups',
        'Can find testers from diverse backgrounds',
      ],
      cons: [
        'Very low engagement rates',
        'Lots of spam and irrelevant posts',
        'Testers are not committed',
        'Group rules may prohibit promotions',
        'Facebook algorithm limits post visibility',
      ],
    },
    {
      number: '06',
      icon: <Heart className="size-5 text-pink-400" />,
      title: 'Friends & Family',
      subtitle: 'Quick but unreliable',
      tag: 'Free',
      tagColor: 'pink',
      description:
        'Asking friends and family to test your app is the easiest option — they\'re usually willing to help. However, this approach has significant limitations when it comes to meeting Google Play\'s requirements.',
      pros: [
        'Easiest to get started',
        'No cost involved',
        'People you can trust',
        'Quick initial setup',
      ],
      cons: [
        'They won\'t give honest, critical feedback',
        'Often stop testing after a few days',
        'May not have Android devices',
        'Can strain personal relationships',
        'Almost never meets 14-day requirement',
        'Generic "it\'s nice" reviews won\'t help',
      ],
    },
    {
      number: '07',
      icon: <Twitter className="size-5 text-sky-400" />,
      title: 'Social Media',
      subtitle: 'Twitter/X, LinkedIn outreach',
      tag: 'Free',
      tagColor: 'sky',
      description:
        'You can use Twitter/X, LinkedIn, and other social platforms to find beta testers. Share your app with relevant hashtags and reach out to Android enthusiast accounts.',
      pros: [
        'Can reach a wide audience',
        'Free to post',
        'May find passionate Android users',
        'Can build a following for your app',
      ],
      cons: [
        'Very low conversion rate',
        'Time-consuming to create posts and manage DMs',
        'No guarantee of quality testers',
        'Social media algorithms limit organic reach',
        'Hard to verify tester commitment',
      ],
    },
  ]

  const comparisonData = [
    { method: 'Free Community', cost: '$0', testers: 'Varies', guarantee: false, timeToSetup: '1 hour', quality: 'Medium' },
    { method: 'Professional Service', cost: '$15', testers: '14', guarantee: true, timeToSetup: '5 minutes', quality: 'High' },
    { method: 'Reddit', cost: '$0', testers: '3-8', guarantee: false, timeToSetup: '2-5 hours', quality: 'Low-Medium' },
    { method: 'Discord', cost: '$0', testers: '2-6', guarantee: false, timeToSetup: '3-6 hours', quality: 'Low' },
    { method: 'Facebook', cost: '$0', testers: '1-5', guarantee: false, timeToSetup: '2-4 hours', quality: 'Low' },
    { method: 'Friends & Family', cost: '$0', testers: '3-8', guarantee: false, timeToSetup: '30 minutes', quality: 'Low' },
    { method: 'Social Media', cost: '$0', testers: '1-4', guarantee: false, timeToSetup: '4-8 hours', quality: 'Low' },
  ]

  const faqs = [
    {
      question: 'How many beta testers do I need for Google Play?',
      answer:
        'Google Play requires a minimum of 12 testers for new personal developer accounts during the closed testing phase. These testers must remain active for 14 consecutive days. We recommend having at least 14 testers to provide a buffer in case some become inactive.',
    },
    {
      question: 'How long does the testing period need to be?',
      answer:
        'Google Play requires testers to be active for 14 consecutive days. This means all 12+ testers must have the app installed and provide meaningful interactions throughout this period. If a tester drops off, the 14-day counter may reset.',
    },
    {
      question: 'Can I use free testers for Google Play closed testing?',
      answer:
        'Yes, you can use free testers from Reddit, Discord, or other communities. However, free testers are often unreliable — they may ghost, provide low-quality feedback, or not stay for the full 14 days. This is why many developers opt for professional testing services.',
    },
    {
      question: 'What happens if my closed testing fails?',
      answer:
        'If your closed testing doesn\'t meet Google Play\'s requirements, you\'ll need to start over with a new testing period. This means finding new testers and running the 14-day period again. With professional testers, you get a guarantee that your testing will be successful.',
    },
    {
      question: 'How much do professional beta testers cost?',
      answer:
        'Professional testing services typically charge $15-50 for a complete testing package. Fast Testers offers 14 verified testers for $15, which includes the full 14-day testing period, detailed feedback, and a production access guarantee.',
    },
    {
      question: 'What kind of feedback do professional testers provide?',
      answer:
        'Professional testers provide detailed feedback including bug reports with steps to reproduce, UI/UX observations, performance issues on different devices, feature suggestions, and overall app quality assessment. This feedback is much more valuable than generic "it works" comments.',
    },
  ]

  const tocItems = methods.map((m) => m.title)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
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
            How to Find Beta Testers for Your{' '}
            <span className="text-blue-400">Android App</span> (2026)
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Finding reliable beta testers is one of the biggest hurdles for Android developers. This
            guide covers 7 proven methods — from free community options to professional testing
            services — so you can meet Google Play&apos;s closed testing requirements and get your
            app published.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              Get Professional Testers
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/android-app-testers')}
            >
              Try Free Community
            </Button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/beta-testers.png"
          alt="How to Find Beta Testers for Your Android App"
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
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {tocItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const el = document.getElementById(`method-${index}`)
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRight className="size-3 shrink-0" />
                    {item}
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
                              {method.title}
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
                              {method.tag}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{method.subtitle}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block">{method.icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground/80 leading-relaxed">{method.description}</p>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
                          Pros
                        </h4>
                        <ul className="space-y-2">
                          {method.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-red-400 uppercase tracking-wider">
                          Cons
                        </h4>
                        <ul className="space-y-2">
                          {method.cons.map((con, conIndex) => (
                            <li key={conIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                              <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                              {con}
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
                  Comparison
                </Badge>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Free vs Paid: At a Glance</h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Method</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">Cost</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">Testers</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">Guaranteed</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">Setup Time</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">Quality</th>
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
                          {row.guarantee && '⭐ '}{row.method}
                        </td>
                        <td className="px-4 py-3 text-center text-foreground/80">{row.cost}</td>
                        <td className="px-4 py-3 text-center text-foreground/80">{row.testers}</td>
                        <td className="px-4 py-3 text-center">
                          {row.guarantee ? (
                            <CheckCircle2 className="mx-auto size-5 text-blue-400" />
                          ) : (
                            <XCircle className="mx-auto size-5 text-red-400/50" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-foreground/80">{row.timeToSetup}</td>
                        <td className="px-4 py-3 text-center text-foreground/80">{row.quality}</td>
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
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Find Beta Testers?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose the method that works best for you. Professional testing gives you guaranteed
            results, or try our free community marketplace to get started at no cost.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              Get Professional Testers
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/android-app-testers')}
            >
              Try Free Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
