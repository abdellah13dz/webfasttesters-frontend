'use client'

import { useRouter } from '@/lib/router'
import { APP_URL } from '@/lib/app-urls'
import { useLanguage } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Globe,
  MessageSquare,
  Languages,
  Smartphone,
} from 'lucide-react'

const languages = [
  { nameKey: 'multiLanguage.language1Name', codeKey: 'multiLanguage.language1Code', flag: '🇻🇳' },
  { nameKey: 'multiLanguage.language2Name', codeKey: 'multiLanguage.language2Code', flag: '🇩🇪' },
  { nameKey: 'multiLanguage.language3Name', codeKey: 'multiLanguage.language3Code', flag: '🇷🇺' },
  { nameKey: 'multiLanguage.language4Name', codeKey: 'multiLanguage.language4Code', flag: '🇧🇷' },
  { nameKey: 'multiLanguage.language5Name', codeKey: 'multiLanguage.language5Code', flag: '🇪🇸' },
  { nameKey: 'multiLanguage.language6Name', codeKey: 'multiLanguage.language6Code', flag: '🇫🇷' },
  { nameKey: 'multiLanguage.language7Name', codeKey: 'multiLanguage.language7Code', flag: '🇹🇷' },
  { nameKey: 'multiLanguage.language8Name', codeKey: 'multiLanguage.language8Code', flag: '🇹🇭' },
  { nameKey: 'multiLanguage.language9Name', codeKey: 'multiLanguage.language9Code', flag: '🇵🇱' },
  { nameKey: 'multiLanguage.language10Name', codeKey: 'multiLanguage.language10Code', flag: '🇯🇵' },
  { nameKey: 'multiLanguage.language11Name', codeKey: 'multiLanguage.language11Code', flag: '🇰🇷' },
  { nameKey: 'multiLanguage.language12Name', codeKey: 'multiLanguage.language12Code', flag: '🇮🇹' },
  { nameKey: 'multiLanguage.language13Name', codeKey: 'multiLanguage.language13Code', flag: '🇳🇱' },
  { nameKey: 'multiLanguage.language14Name', codeKey: 'multiLanguage.language14Code', flag: '🇮🇳' },
  { nameKey: 'multiLanguage.language15Name', codeKey: 'multiLanguage.language15Code', flag: '🇸🇦' },
  { nameKey: 'multiLanguage.language16Name', codeKey: 'multiLanguage.language16Code', flag: '🇮🇩' },
  { nameKey: 'multiLanguage.language17Name', codeKey: 'multiLanguage.language17Code', flag: '🇲🇾' },
  { nameKey: 'multiLanguage.language18Name', codeKey: 'multiLanguage.language18Code', flag: '🇺🇦' },
  { nameKey: 'multiLanguage.language19Name', codeKey: 'multiLanguage.language19Code', flag: '🇨🇿' },
  { nameKey: 'multiLanguage.language20Name', codeKey: 'multiLanguage.language20Code', flag: '🇷🇴' },
]

const howItWorks = [
  {
    step: '01',
    titleKey: 'multiLanguage.step1Title',
    descriptionKey: 'multiLanguage.step1Description',
  },
  {
    step: '02',
    titleKey: 'multiLanguage.step2Title',
    descriptionKey: 'multiLanguage.step2Description',
  },
  {
    step: '03',
    titleKey: 'multiLanguage.step3Title',
    descriptionKey: 'multiLanguage.step3Description',
  },
  {
    step: '04',
    titleKey: 'multiLanguage.step4Title',
    descriptionKey: 'multiLanguage.step4Description',
  },
]

const whyLanguageMatters = [
  {
    icon: <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />,
    titleKey: 'multiLanguage.benefit1Title',
    descriptionKey: 'multiLanguage.benefit1Desc',
  },
  {
    icon: <Languages className="size-5 text-blue-600 dark:text-blue-400" />,
    titleKey: 'multiLanguage.benefit2Title',
    descriptionKey: 'multiLanguage.benefit2Desc',
  },
  {
    icon: <Smartphone className="size-5 text-blue-600 dark:text-blue-400" />,
    titleKey: 'multiLanguage.benefit3Title',
    descriptionKey: 'multiLanguage.benefit3Desc',
  },
  {
    icon: <Globe className="size-5 text-blue-600 dark:text-blue-400" />,
    titleKey: 'multiLanguage.benefit4Title',
    descriptionKey: 'multiLanguage.benefit4Desc',
  },
]

export default function MultiLanguagePage() {
  const { navigate } = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Badge className="mb-6 border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
            <Globe className="mr-1 size-3" />
            {t('multiLanguage.heroBadge')}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('multiLanguage.heroTitlePrefix')}{' '}
            <span className="text-blue-600 dark:text-blue-400">{t('multiLanguage.heroTitleHighlight')}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('multiLanguage.heroDescription')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('multiLanguage.ctaGetInternationalTesters')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/blog/google-play-closed-testing')}
            >
              {t('multiLanguage.ctaLearnClosedTesting')}
            </Button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/multi-language.png"
          alt={t('multiLanguage.coverImageAlt')}
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Supported Languages Grid */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              <Languages className="mr-1 size-3" />
              {t('multiLanguage.languagesBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('multiLanguage.languagesTitle')}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t('multiLanguage.languagesSubtitle')}
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
                  <p className="text-sm font-medium text-foreground">{t(lang.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(lang.codeKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('multiLanguage.languagesFooter')}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            {t('multiLanguage.howItWorksBadge')}
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            {t('multiLanguage.howItWorksTitle')}
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
                  <h3 className="font-semibold text-foreground">{t(step.titleKey)}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(step.descriptionKey)}</p>
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
              {t('multiLanguage.whyItMattersBadge')}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t('multiLanguage.whyItMattersTitle')}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t('multiLanguage.whyItMattersSubtitle')}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {whyLanguageMatters.map((item, index) => (
              <div key={index} className="group">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{t(item.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(item.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('multiLanguage.statLanguages')}</div>
            <p className="text-sm text-muted-foreground">{t('multiLanguage.statLanguagesLabel')}</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('multiLanguage.statCountries')}</div>
            <p className="text-sm text-muted-foreground">{t('multiLanguage.statCountriesLabel')}</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{t('multiLanguage.statSuccessRate')}</div>
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
                {t('multiLanguage.ctaTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t('multiLanguage.ctaDescription')}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('multiLanguage.ctaButton')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {t('multiLanguage.ctaFootnote')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
