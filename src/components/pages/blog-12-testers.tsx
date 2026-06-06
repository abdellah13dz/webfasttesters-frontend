'use client';

import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  Lightbulb,
  MessageSquare,
  Shield,
  Users,
  XCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

const relatedPosts = [
  {
    id: 'how-to-find-beta-testers-for-android-apps',
    titleKey: 'blog12Testers.relatedPost1Title',
    readTimeKey: 'blog12Testers.relatedPost1ReadTime',
  },
  {
    id: 'google-play-closed-testing',
    titleKey: 'blog12Testers.relatedPost2Title',
    readTimeKey: 'blog12Testers.relatedPost2ReadTime',
  },
  {
    id: 'app-rejected-google-play',
    titleKey: 'blog12Testers.relatedPost3Title',
    readTimeKey: 'blog12Testers.relatedPost3ReadTime',
  },
];

const keyRequirements = [
  { textKey: 'blog12Testers.keyRequirement1' },
  { textKey: 'blog12Testers.keyRequirement2' },
  { textKey: 'blog12Testers.keyRequirement3' },
  { textKey: 'blog12Testers.keyRequirement4' },
];

const notRequiredItems = [
  { textKey: 'blog12Testers.notRequiredItem1' },
  { textKey: 'blog12Testers.notRequiredItem2' },
  { textKey: 'blog12Testers.notRequiredItem3' },
];

const requiredItems = [
  { textKey: 'blog12Testers.requiredItem1' },
  { textKey: 'blog12Testers.requiredItem2' },
  { textKey: 'blog12Testers.requiredItem3' },
];

const section3Benefits = [
  { labelKey: 'blog12Testers.section3Benefit1Label', textKey: 'blog12Testers.section3Benefit1Text' },
  { labelKey: 'blog12Testers.section3Benefit2Label', textKey: 'blog12Testers.section3Benefit2Text' },
  { labelKey: 'blog12Testers.section3Benefit3Label', textKey: 'blog12Testers.section3Benefit3Text' },
];

const testerCriteria = [
  { titleKey: 'blog12Testers.testerCriteria1Title', descriptionKey: 'blog12Testers.testerCriteria1Description' },
  { titleKey: 'blog12Testers.testerCriteria2Title', descriptionKey: 'blog12Testers.testerCriteria2Description' },
  { titleKey: 'blog12Testers.testerCriteria3Title', descriptionKey: 'blog12Testers.testerCriteria3Description' },
  { titleKey: 'blog12Testers.testerCriteria4Title', descriptionKey: 'blog12Testers.testerCriteria4Description' },
];

const misconceptions = [
  {
    titleKey: 'blog12Testers.misconception1Title',
    realityLabelKey: 'blog12Testers.misconception1RealityLabel',
    realityKey: 'blog12Testers.misconception1Reality',
  },
  {
    titleKey: 'blog12Testers.misconception2Title',
    realityLabelKey: 'blog12Testers.misconception2RealityLabel',
    realityKey: 'blog12Testers.misconception2Reality',
  },
  {
    titleKey: 'blog12Testers.misconception3Title',
    realityLabelKey: 'blog12Testers.misconception3RealityLabel',
    realityKey: 'blog12Testers.misconception3Reality',
  },
];

const meetRequirementOptions = [
  { titleKey: 'blog12Testers.option1Title', descriptionKey: 'blog12Testers.option1Description', showCta: true, badge: 'guaranteed' as const },
  { titleKey: 'blog12Testers.option2Title', descriptionKey: 'blog12Testers.option2Description', showCta: false, badge: 'free' as const },
  { titleKey: 'blog12Testers.option3Title', descriptionKey: 'blog12Testers.option3Description', showCta: false, badge: 'free' as const },
];

const compareRows = [
  {
    featureKey: 'blog12Testers.compareRowCost',
    freeKey: 'blog12Testers.compareRowCostFree',
    professionalKey: 'blog12Testers.compareRowCostProfessional',
    professionalHighlight: true,
  },
  {
    featureKey: 'blog12Testers.compareRowTesters',
    freeKey: 'blog12Testers.compareRowTestersFree',
    professionalKey: 'blog12Testers.compareRowTestersProfessional',
    professionalHighlight: true,
  },
  {
    featureKey: 'blog12Testers.compareRowRetention',
    freeKey: 'blog12Testers.compareRowRetentionFree',
    professionalKey: 'blog12Testers.compareRowRetentionProfessional',
    professionalHighlight: true,
  },
  {
    featureKey: 'blog12Testers.compareRowFeedback',
    freeKey: 'blog12Testers.compareRowFeedbackFree',
    professionalKey: 'blog12Testers.compareRowFeedbackProfessional',
    professionalHighlight: true,
  },
  {
    featureKey: 'blog12Testers.compareRowGuarantee',
    isGuaranteeRow: true,
  },
  {
    featureKey: 'blog12Testers.compareRowTime',
    freeKey: 'blog12Testers.compareRowTimeFree',
    professionalKey: 'blog12Testers.compareRowTimeProfessional',
    professionalHighlight: true,
  },
];

const tips = [
  { titleKey: 'blog12Testers.tip1Title', descriptionKey: 'blog12Testers.tip1Description', icon: Lightbulb },
  { titleKey: 'blog12Testers.tip2Title', descriptionKey: 'blog12Testers.tip2Description', icon: MessageSquare },
  { titleKey: 'blog12Testers.tip3Title', descriptionKey: 'blog12Testers.tip3Description', icon: Users },
  { titleKey: 'blog12Testers.tip4Title', descriptionKey: 'blog12Testers.tip4Description', icon: Sparkles },
];

export default function Blog12TestersPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <button
            onClick={() => navigate('/blog')}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            {t('common.backToBlog')}
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Badge className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-950/70 text-[10px] tracking-wider">
              {t('blog.categoryGooglePlay')}
            </Badge>
            <Badge className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-950/70 text-[10px] tracking-wider">
              {t('blog.categoryAppTesting')}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            {t('blog12Testers.heroTitlePrefix')}{' '}
            <span className="text-blue-400">{t('blog12Testers.heroTitleHighlight')}</span>{' '}
            {t('blog12Testers.heroTitleSuffix')}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {t('blog12Testers.metaDate')}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {t('blog12Testers.metaReadTime')}
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="size-3.5" />
              {t('blog12Testers.metaViews')}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/blog-12-testers.png"
          alt={t('blog12Testers.coverImageAlt')}
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose-custom space-y-8">
          <section>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t('blog12Testers.introP1')}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {t('blog12Testers.introP2')}
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                1
              </div>
              {t('blog12Testers.section1Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('blog12Testers.section1P1')}
            </p>
            <Card className="mt-4 border-border bg-card/50">
              <CardContent className="p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3">{t('blog12Testers.keyRequirementsTitle')}</h4>
                <ul className="space-y-2">
                  {keyRequirements.map((item) => (
                    <li key={item.textKey} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                      {t(item.textKey)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                2
              </div>
              {t('blog12Testers.section2Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('blog12Testers.section2P1')}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="size-5 text-red-400" />
                    <span className="text-sm font-semibold text-foreground">{t('blog12Testers.notRequiredLabel')}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {notRequiredItems.map((item) => (
                      <li key={item.textKey}>{t(item.textKey)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="size-5 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">{t('blog12Testers.requiredLabel')}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {requiredItems.map((item) => (
                      <li key={item.textKey}>{t(item.textKey)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                3
              </div>
              {t('blog12Testers.section3Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('blog12Testers.section3P1')}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {t('blog12Testers.section3P2')}
            </p>
            <ul className="mt-3 space-y-2">
              {section3Benefits.map((item) => (
                <li key={item.labelKey} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <span>
                    <strong className="text-foreground">{t(item.labelKey)}</strong> {t(item.textKey)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                4
              </div>
              {t('blog12Testers.section4Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('blog12Testers.section4P1')}
            </p>
            <Card className="mt-4 border-border bg-card/50">
              <CardContent className="p-5 space-y-3">
                {testerCriteria.map((item) => (
                  <div key={item.titleKey} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{t(item.titleKey)}</p>
                      <p className="text-xs text-muted-foreground">{t(item.descriptionKey)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                5
              </div>
              {t('blog12Testers.section5Title')}
            </h2>
            <div className="space-y-4">
              {misconceptions.map((item) => (
                <Card key={item.titleKey} className="border-red-900/30 bg-red-950/10">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <XCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{t(item.titleKey)}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong className="text-foreground/80">{t(item.realityLabelKey)}</strong>{' '}
                          {t(item.realityKey)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                6
              </div>
              {t('blog12Testers.section6Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('blog12Testers.section6P1')}
            </p>
            <div className="mt-4 space-y-4">
              {meetRequirementOptions.map((option, index) => (
                <Card key={option.titleKey} className="border-border bg-card/50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {index === 0 ? (
                        <Shield className="size-5 text-blue-400" />
                      ) : index === 1 ? (
                        <Users className="size-5 text-muted-foreground" />
                      ) : (
                        <Globe className="size-5 text-muted-foreground" />
                      )}
                      <h4 className="text-sm font-semibold text-foreground">{t(option.titleKey)}</h4>
                      <Badge
                        className={
                          option.badge === 'guaranteed'
                            ? 'border-blue-800 bg-blue-950/50 text-blue-400 text-[10px]'
                            : 'border-border text-muted-foreground text-[10px]'
                        }
                        variant={option.badge === 'guaranteed' ? 'default' : 'outline'}
                      >
                        {option.badge === 'guaranteed' ? t('common.guaranteed') : t('common.free')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(option.descriptionKey)}</p>
                    {option.showCta && (
                      <Button
                        className="mt-3 bg-blue-600 text-white hover:bg-blue-700 h-8 text-xs"
                        onClick={() => navigate(APP_URL)}
                      >
                        {t('blog12Testers.option1Cta')}
                        <ArrowRight className="ml-1 size-3" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                7
              </div>
              {t('blog12Testers.section7Title')}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {t('blog12Testers.compareHeaderFeature')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                      {t('blog12Testers.compareHeaderFree')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-blue-400">
                      {t('blog12Testers.compareHeaderProfessional')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, index) => (
                    <tr
                      key={row.featureKey}
                      className={index < compareRows.length - 1 ? 'border-b border-border/50' : ''}
                    >
                      <td className="px-4 py-3 text-foreground/80">{t(row.featureKey)}</td>
                      <td className="px-4 py-3 text-center text-foreground/80">
                        {'isGuaranteeRow' in row && row.isGuaranteeRow ? (
                          <XCircle className="mx-auto size-4 text-red-400/50" />
                        ) : (
                          t(row.freeKey!)
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {'isGuaranteeRow' in row && row.isGuaranteeRow ? (
                          <CheckCircle2 className="mx-auto size-4 text-blue-400" />
                        ) : (
                          <span className={row.professionalHighlight ? 'text-blue-400 font-medium' : 'text-blue-400'}>
                            {t(row.professionalKey!)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                8
              </div>
              {t('blog12Testers.section8Title')}
            </h2>
            <div className="space-y-4">
              {tips.map((tip) => {
                const TipIcon = tip.icon;
                return (
                  <div
                    key={tip.titleKey}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-950/30">
                      <TipIcon className="size-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{t(tip.titleKey)}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t(tip.descriptionKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <Card className="border-blue-800/30 bg-blue-950/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">{t('common.keyTakeaway')}</h3>
                <p className="text-foreground/80 leading-relaxed">{t('blog12Testers.summaryText')}</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </article>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <Users className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t('blog12Testers.authorName')}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t('blog12Testers.authorRole')}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {t('blog12Testers.authorBio')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">{t('common.relatedArticles')}</h3>
          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer border-border bg-card/50 hover:border-blue-500/20 transition-colors"
                onClick={() => navigate(`/${post.id}`)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <BookOpen className="size-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{t(post.titleKey)}</p>
                      <p className="text-xs text-muted-foreground">{t(post.readTimeKey)}</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-10 text-center">
              <Shield className="mx-auto mb-5 size-10 text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">{t('blog12Testers.ctaTitle')}</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                {t('blog12Testers.ctaDescription')}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('blog12Testers.ctaButton')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
