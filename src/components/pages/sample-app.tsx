'use client'

import { useRouter } from '@/lib/router'
import { openAppDemo } from '@/lib/app-urls'
import { useLanguage } from '@/lib/i18n/context'
import { useAnalytics } from '@/lib/analytics'
import { FullDemoCta } from '@/components/full-demo-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Smartphone,
  Star,
  Download,
  CheckCircle,
  Clock,
  Bug,
  Zap,
  Eye,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  Circle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

const timelineSteps = [
  {
    day: 'Day 1',
    title: 'App Submitted',
    description: 'QuickNote was submitted to Fast Testers with all required metadata and APK/AAB file.',
    icon: Smartphone,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    day: 'Day 1-3',
    title: 'Testers Join & Install',
    description: '14 verified testers joined the closed testing track and installed the app on their devices.',
    icon: Users,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    day: 'Day 3-7',
    title: 'Active Testing Phase',
    description: 'Testers actively used all app features daily, creating notes, setting reminders, and managing tasks.',
    icon: Zap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    day: 'Day 7-10',
    title: 'Bug Reports & Feedback',
    description: 'Testers submitted detailed bug reports with steps to reproduce and provided UI/UX improvement suggestions.',
    icon: Bug,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    day: 'Day 10-13',
    title: 'Final Testing & Stability',
    description: 'Developer fixed reported issues, and testers verified the fixes. App stability confirmed across devices.',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    day: 'Day 14',
    title: 'Production Access Granted',
    description: 'All requirements met — 14 testers active for 14 days with meaningful interactions. Production access approved!',
    icon: CheckCircle,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
]

const feedbackCards = [
  {
    icon: Eye,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    category: 'UI/UX Suggestions',
    items: [
      'Dark mode toggle needs better visibility in settings',
      'Swipe gestures for task completion would improve flow',
      'Note editor toolbar should be more compact on small screens',
      'Add haptic feedback for task completion actions',
    ],
  },
  {
    icon: Zap,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    category: 'Performance Notes',
    items: [
      'App loads in 1.2s — excellent cold start time',
      'Slight lag when opening notes with 500+ characters',
      'Search indexing could be optimized for large datasets',
      'Memory usage stable at ~45MB during normal use',
    ],
  },
  {
    icon: Bug,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    category: 'Crash Reports',
    items: [
      'Crash on Samsung A12 when rotating during edit (fixed)',
      'ANR on Pixel 6 with widget + notification active (fixed)',
      'Null pointer on empty category deletion (fixed)',
      '0 crashes reported after Day 10 patch',
    ],
  },
  {
    icon: Shield,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    category: 'Accessibility Improvements',
    items: [
      'Increase touch target size for checkbox buttons',
      'Add content descriptions for icon-only actions',
      'Improve color contrast for secondary text',
      'Support TalkBack navigation for task lists',
    ],
  },
]

const metricsBefore = [
  { label: 'Crashes', value: '3.2%', highlight: false },
  { label: 'ANR Rate', value: '1.8%', highlight: false },
  { label: 'User Rating', value: '3.9', highlight: false },
  { label: 'Accessibility Score', value: '62/100', highlight: false },
  { label: 'Test Coverage', value: '0 devices', highlight: false },
  { label: 'Tester Retention', value: 'N/A', highlight: false },
]

const metricsAfter = [
  { label: 'Crashes', value: '0.1%', highlight: true },
  { label: 'ANR Rate', value: '0.0%', highlight: true },
  { label: 'User Rating', value: '4.8', highlight: true },
  { label: 'Accessibility Score', value: '94/100', highlight: true },
  { label: 'Test Coverage', value: '14 devices', highlight: true },
  { label: 'Tester Retention', value: '100%', highlight: true },
]

const testingTimelineEntries = [
  {
    day: 1,
    titleKey: 'sampleApp.day1Title',
    descKey: 'sampleApp.day1Desc',
    status: 'completed' as const,
  },
  {
    day: 3,
    titleKey: 'sampleApp.day3Title',
    descKey: 'sampleApp.day3Desc',
    status: 'completed' as const,
  },
  {
    day: 7,
    titleKey: 'sampleApp.day7Title',
    descKey: 'sampleApp.day7Desc',
    status: 'completed' as const,
  },
  {
    day: 10,
    titleKey: 'sampleApp.day10Title',
    descKey: 'sampleApp.day10Desc',
    status: 'completed' as const,
  },
  {
    day: 14,
    titleKey: 'sampleApp.day14Title',
    descKey: 'sampleApp.day14Desc',
    status: 'completed' as const,
  },
  {
    day: 15,
    titleKey: 'sampleApp.day15Title',
    descKey: 'sampleApp.day15Desc',
    status: 'current' as const,
  },
  {
    day: 16,
    titleKey: 'sampleApp.day16Title',
    descKey: 'sampleApp.day16Desc',
    status: 'upcoming' as const,
  },
]

export default function SampleAppPage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()
  const { trackCta } = useAnalytics()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Smartphone className="mr-1.5 size-3.5" />
            Live Demo
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            See Our Testing{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Download a sample app that was tested through Fast Testers and follow its complete 14-day
            journey from submission to production access. See exactly what happens when you choose
            professional testing.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/pricing')}
            >
              Start Your Testing
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => {
                trackCta('sample_app_full_demo')
                openAppDemo()
              }}
            >
              <ExternalLink className="mr-2 size-4" />
              {t('fullDemo.cta')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => {
                const el = document.getElementById('timeline-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Clock className="mr-2 size-4" />
              View 14-Day Timeline
            </Button>
          </div>
        </div>
      </section>

      <FullDemoCta trackingId="sample_app_full_demo" />

      {/* Sample App Details Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            Sample App
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Sample App Details</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            A real example of an app that went through our complete testing process
          </p>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {/* App Icon */}
              <div className="flex shrink-0 justify-center sm:justify-start">
                <div className="flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20 sm:size-28">
                  <Smartphone className="size-12 text-white sm:size-14" />
                </div>
              </div>

              {/* App Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    QuickNote - Todo &amp; Tasks
                  </h3>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    com.demo.quicknote
                  </p>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="size-4 text-blue-400" />
                    Productivity
                  </span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500" />
                    <span className="font-semibold text-foreground">4.8</span>
                    <span>(142 reviews)</span>
                  </span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1">
                    <Download className="size-4 text-blue-400" />
                    10K+ downloads
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                    <CheckCircle className="mr-1 size-3" />
                    Production Access ✓
                  </Badge>
                  <Badge className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20">
                    <Clock className="mr-1 size-3" />
                    14-Day Testing Complete
                  </Badge>
                  <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                    <Shield className="mr-1 size-3" />
                    14 Verified Testers
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">14</div>
                    <div className="text-xs text-muted-foreground">Testers</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                    <div className="text-xl font-bold text-cyan-400">14</div>
                    <div className="text-xs text-muted-foreground">Days</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">47</div>
                    <div className="text-xs text-muted-foreground">Bug Reports</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                    <div className="text-xl font-bold text-cyan-400">100%</div>
                    <div className="text-xs text-muted-foreground">Retention</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testing Timeline Section */}
      <section id="timeline-section" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="border-border text-muted-foreground">
              Timeline
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Testing Timeline</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Follow QuickNote&apos;s 14-day journey from submission to production access
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-blue-400/40 via-cyan-400/40 to-blue-400/40 sm:left-8 sm:block" />

            <div className="space-y-6 sm:space-y-8">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-8">
                    {/* Timeline node */}
                    <div className="relative z-10 flex shrink-0 items-start justify-center sm:items-center">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl border ${step.bgColor} ${step.borderColor} sm:size-16`}
                      >
                        <Icon className={`size-5 ${step.color} sm:size-6`} />
                      </div>
                    </div>

                    {/* Content card */}
                    <Card className="flex-1 border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`border-border/50 text-xs ${step.color}`}
                          >
                            {step.day}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed sm:text-base">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What Testers Found Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="border-border text-muted-foreground">
            Feedback
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">What Testers Found</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Real examples of the detailed feedback our professional testers provide
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {feedbackCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card
                key={index}
                className="border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg ${card.iconBg}`}
                    >
                      <Icon className={`size-5 ${card.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg text-foreground">{card.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {card.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Before & After Section */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="border-border text-muted-foreground">
              Results
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Before &amp; After Testing</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              See the measurable impact of professional testing on QuickNote&apos;s quality metrics
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Before */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-red-500/10">
                    <TrendingUp className="size-4 text-red-400 rotate-180" />
                  </div>
                  <CardTitle className="text-lg text-foreground">Before Testing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metricsBefore.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-4 py-3"
                    >
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className="font-mono text-sm font-semibold text-red-400">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10">
                    <TrendingUp className="size-4 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg text-foreground">After Testing</CardTitle>
                  <Badge className="ml-auto border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs">
                    +98% improvement
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metricsAfter.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-blue-500/10 bg-blue-500/5 px-4 py-3"
                    >
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className="font-mono text-sm font-semibold text-blue-400">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Improvement Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 sm:text-3xl">97%</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">Crash Reduction</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">23%</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">Rating Increase</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 sm:text-3xl">52%</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">Better Accessibility</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">14</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">Devices Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Timeline Section */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="mb-10 text-center">
            <Badge
              variant="outline"
              className="border-blue-400/30 text-blue-400 bg-blue-400/10"
            >
              <Clock className="mr-1.5 h-3 w-3" />
              {t('sampleApp.testingTimeline')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('sampleApp.dayByDayProgress')}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Track each milestone from tester installation to production access
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-green-400/40 via-blue-400/40 to-gray-400/40 sm:left-8 sm:block" />

            <div className="space-y-6 sm:space-y-8">
              {testingTimelineEntries.map((entry, index) => {
                const statusConfig = {
                  completed: {
                    circleBg: 'bg-green-500/10',
                    circleBorder: 'border-green-500/30',
                    circleText: 'text-green-400',
                    indicator: <CheckCircle2 className="h-4 w-4 text-green-400" />,
                  },
                  current: {
                    circleBg: 'bg-blue-500/10',
                    circleBorder: 'border-blue-500/30',
                    circleText: 'text-blue-400',
                    indicator: (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                      </span>
                    ),
                  },
                  upcoming: {
                    circleBg: 'bg-gray-500/10',
                    circleBorder: 'border-gray-500/30',
                    circleText: 'text-gray-400',
                    indicator: <Circle className="h-4 w-4 text-gray-400" />,
                  },
                }
                const config = statusConfig[entry.status]

                return (
                  <div key={index} className="relative flex gap-4 sm:gap-8">
                    {/* Timeline node */}
                    <div className="relative z-10 flex shrink-0 items-start justify-center sm:items-center">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl border ${config.circleBg} ${config.circleBorder} sm:size-16`}
                      >
                        <span className={`text-sm font-bold ${config.circleText} sm:text-base`}>
                          {entry.day}
                        </span>
                      </div>
                    </div>

                    {/* Content card */}
                    <Card className={`flex-1 border-border bg-card/50 backdrop-blur-sm transition-all duration-300 ${entry.status === 'current' ? 'border-blue-400/30 shadow-md shadow-blue-500/5' : entry.status === 'completed' ? 'hover:border-green-400/20' : 'opacity-60'}`}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`border-border/50 text-xs ${config.circleText}`}
                          >
                            Day {entry.day}
                          </Badge>
                          {config.indicator}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                          {t(entry.titleKey)}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed sm:text-base">
                          {t(entry.descKey)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/10 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                <Smartphone className="size-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Test Your App?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">
              Join thousands of developers who have successfully launched their apps on Google Play
              with Fast Testers. Get 14 verified testers, detailed feedback, and guaranteed
              production access — all in just 14 days.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate('/pricing')}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                View Pricing Plans
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                onClick={() => navigate('/how-it-works')}
                size="lg"
                variant="outline"
                className="border-border text-foreground/80 hover:bg-muted px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Starting at just <span className="font-semibold text-foreground">$15</span> —
              99.9% success rate — 15,000+ apps tested
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
