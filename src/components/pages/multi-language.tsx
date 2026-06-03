'use client'

import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Globe,
  CheckCircle2,
  Users,
  MessageSquare,
  Shield,
  Languages,
  Smartphone,
} from 'lucide-react'

export default function MultiLanguagePage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const languages = [
    { name: 'Vietnamese', flag: '🇻🇳', code: 'VI' },
    { name: 'German', flag: '🇩🇪', code: 'DE' },
    { name: 'Russian', flag: '🇷🇺', code: 'RU' },
    { name: 'Portuguese', flag: '🇧🇷', code: 'PT' },
    { name: 'Spanish', flag: '🇪🇸', code: 'ES' },
    { name: 'French', flag: '🇫🇷', code: 'FR' },
    { name: 'Turkish', flag: '🇹🇷', code: 'TR' },
    { name: 'Thai', flag: '🇹🇭', code: 'TH' },
    { name: 'Polish', flag: '🇵🇱', code: 'PL' },
    { name: 'Japanese', flag: '🇯🇵', code: 'JA' },
    { name: 'Korean', flag: '🇰🇷', code: 'KO' },
    { name: 'Italian', flag: '🇮🇹', code: 'IT' },
    { name: 'Dutch', flag: '🇳🇱', code: 'NL' },
    { name: 'Hindi', flag: '🇮🇳', code: 'HI' },
    { name: 'Arabic', flag: '🇸🇦', code: 'AR' },
    { name: 'Indonesian', flag: '🇮🇩', code: 'ID' },
    { name: 'Malay', flag: '🇲🇾', code: 'MS' },
    { name: 'Ukrainian', flag: '🇺🇦', code: 'UK' },
    { name: 'Czech', flag: '🇨🇿', code: 'CS' },
    { name: 'Romanian', flag: '🇷🇴', code: 'RO' },
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Submit Your App',
      description:
        'Share your app\'s Play Store link and specify the language(s) you need testers for. We support 30+ languages and can provide testers who are native speakers.',
    },
    {
      step: '02',
      title: 'Language-Matched Testers',
      description:
        'We assign professional testers who speak your app\'s target language natively. This ensures feedback is relevant and reviews are written in the correct language.',
    },
    {
      step: '03',
      title: 'Testing Begins',
      description:
        'Within 6 hours, your assigned testers will start using your app. They\'ll test all features, navigate through your app in their native language, and provide detailed feedback.',
    },
    {
      step: '04',
      title: 'Production Access',
      description:
        'After the 14-day testing period, you\'ll have everything you need for production access — regardless of your app\'s language.',
    },
  ]

  const whyLanguageMatters = [
    {
      icon: <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />,
      title: 'Reviews in the Right Language',
      description:
        'Google Play expects reviews from testers to be in the language your app targets. If your app is in German but reviews are in English, it can raise red flags and lead to rejection.',
    },
    {
      icon: <Languages className="size-5 text-blue-600 dark:text-blue-400" />,
      title: 'Cultural Context Matters',
      description:
        'A tester who speaks the language natively understands cultural nuances, common UI patterns in their region, and can identify localization issues that a non-native speaker would miss.',
    },
    {
      icon: <Smartphone className="size-5 text-blue-600 dark:text-blue-400" />,
      title: 'Localized Device Testing',
      description:
        'Our testers use devices set to their native language and region. This means they can catch issues with date formats, currency symbols, text direction (RTL languages), and more.',
    },
    {
      icon: <Globe className="size-5 text-blue-600 dark:text-blue-400" />,
      title: 'Global App Market',
      description:
        'The Google Play Store is global. If your app targets users in specific countries, having testers from those regions gives you a significant advantage in understanding your market.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Badge className="mb-6 border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
            <Globe className="mr-1 size-3" />
            International Testing
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get 12+ Testers for 14 Days for{' '}
            <span className="text-blue-600 dark:text-blue-400">International Apps</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Google Play Console closed testing for international apps. Production access guaranteed
            in any language. We provide native-speaking testers who understand your app&apos;s
            target market.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate('/production-access')}
            >
              Get International Testers
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

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/multi-language.png"
          alt="Multi-Language App Testing Guide"
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Supported Languages Grid */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              <Languages className="mr-1 size-3" />
              30+ Languages Supported
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Supported Languages
            </h2>
            <p className="mt-4 text-muted-foreground">
              We provide native-speaking testers for all major languages. Here are some of our most
              popular options, plus 20+ more.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-3 transition-colors hover:border-blue-300 dark:hover:border-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/10"
              >
                <span className="text-lg">{lang.flag}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{lang.name}</p>
                  <p className="text-xs text-muted-foreground">{lang.code}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t see your language? Contact us — we support 30+ languages and can add more on request.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            How It Works
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            How It Works for International Apps
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {howItWorks.map((step, index) => (
            <Card key={index} className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30 text-lg font-bold text-blue-600 dark:text-blue-400">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Language Matters */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              Why It Matters
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Why Language Matters for Testing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Getting the language right isn&apos;t just about translation — it&apos;s about providing
              a testing experience that reflects how real users will interact with your app.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {whyLanguageMatters.map((item, index) => (
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

      {/* Trust Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">30+</div>
            <p className="text-sm text-muted-foreground">Languages Supported</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <p className="text-sm text-muted-foreground">Countries Covered</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
            <p className="text-sm text-muted-foreground">{t('home.successRate')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Globe className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get International Testers
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Whether your app is in Vietnamese, German, Russian, or any other language — we have
                native-speaking testers ready to help you get production access on Google Play.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/production-access')}
                >
                  Get International Testers for $15
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                One-time payment · 30+ languages · Native-speaking testers
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
