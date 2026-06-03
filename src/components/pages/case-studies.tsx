'use client';

import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Trophy,
  Zap,
  BarChart3,
  ThumbsUp,
  Smartphone,
  Target,
  Award,
  Quote,
  CircleCheck,
  CircleX,
} from 'lucide-react';

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sizeClasses[size]} ${
            s <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

function MetricBar({
  label,
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  label: string;
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
}) {
  const max = Math.max(before, after, 1);
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-16 shrink-0">{beforeLabel}</span>
          <div className="flex-1 h-2.5 rounded-full bg-destructive/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-destructive/40 transition-all duration-700"
              style={{ width: `${(before / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-destructive/70 w-10 text-right">{before}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-16 shrink-0">{afterLabel}</span>
          <div className="flex-1 h-2.5 rounded-full bg-emerald-500/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${(after / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 w-10 text-right">{after}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────

const dashboardMetrics = [
  { labelKey: 'caseStudies.metricSuccessRate', value: '99.9%', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { labelKey: 'caseStudies.metricAvgTime', value: '16 days', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { labelKey: 'caseStudies.metricAppsPublished', value: '1,500+', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { labelKey: 'caseStudies.metricAvgRating', value: '4.8★', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { labelKey: 'caseStudies.metricFirstAttempt', value: '94%', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { labelKey: 'caseStudies.metricCountries', value: '120+', icon: Globe, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
];

const appCategories = [
  { labelKey: 'caseStudies.catFinance', icon: BarChart3 },
  { labelKey: 'caseStudies.catProductivity', icon: Zap },
  { labelKey: 'caseStudies.catEducation', icon: Target },
  { labelKey: 'caseStudies.catHealth', icon: Shield },
  { labelKey: 'caseStudies.catSocial', icon: Users },
  { labelKey: 'caseStudies.catUtilities', icon: Smartphone },
  { labelKey: 'caseStudies.catLifestyle', icon: ThumbsUp },
  { labelKey: 'caseStudies.catEntertainment', icon: Trophy },
];

const caseStudies = [
  {
    nameKey: 'caseStudies.study2Name',
    appKey: 'caseStudies.study2App',
    categoryKey: 'caseStudies.catProductivity',
    quoteKey: 'caseStudies.study2Quote',
    resultKey: 'caseStudies.study2Result',
    rating: 5,
    approvedFirst: true,
    icon: CheckCircle,
  },
  {
    nameKey: 'caseStudies.study3Name',
    appKey: 'caseStudies.study3App',
    categoryKey: 'caseStudies.catUtilities',
    quoteKey: 'caseStudies.study3Quote',
    resultKey: 'caseStudies.study3Result',
    rating: 5,
    approvedFirst: false,
    icon: Shield,
  },
  {
    nameKey: 'caseStudies.study4Name',
    appKey: 'caseStudies.study4App',
    categoryKey: 'caseStudies.catEducation',
    quoteKey: 'caseStudies.study4Quote',
    resultKey: 'caseStudies.study4Result',
    rating: 5,
    approvedFirst: false,
    icon: Award,
  },
  {
    nameKey: 'caseStudies.study5Name',
    appKey: 'caseStudies.study5App',
    categoryKey: 'caseStudies.catLifestyle',
    quoteKey: 'caseStudies.study5Quote',
    resultKey: 'caseStudies.study5Result',
    rating: 5,
    rejectedBefore: 5,
    icon: TrendingUp,
  },
  {
    nameKey: 'caseStudies.study6Name',
    appKey: 'caseStudies.study6App',
    categoryKey: 'caseStudies.catUtilities',
    quoteKey: 'caseStudies.study6Quote',
    resultKey: 'caseStudies.study6Result',
    rating: 5,
    rejectedBefore: 5,
    icon: Zap,
  },
  {
    nameKey: 'caseStudies.study7Name',
    appKey: 'caseStudies.study7App',
    categoryKey: 'caseStudies.catProductivity',
    quoteKey: 'caseStudies.study7Quote',
    resultKey: 'caseStudies.study7Result',
    rating: 5,
    approvedFirst: true,
    icon: Globe,
  },
];

// ─── Main component ─────────────────────────────────────────────────────────

export default function CaseStudies() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  useAnalytics();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Trophy className="h-4 w-4 mr-1" />
            {t('caseStudies.heroBadge')}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('caseStudies.heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t('caseStudies.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── Featured Case Study ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 via-card to-blue-500/10 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 sm:px-8 sm:py-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                  <Star className="h-3 w-3 mr-1 fill-white" />
                  {t('caseStudies.featuredBadge')}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                  {t('caseStudies.catFinance')}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t('caseStudies.featuredApproved')}
                </Badge>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Developer info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white font-bold text-lg shrink-0 shadow-lg shadow-blue-500/25">
                  MP
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {t('caseStudies.featuredName')}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-muted-foreground">{t('caseStudies.featuredAppLabel')}</span>
                    <span className="font-semibold text-blue-500">{t('caseStudies.featuredAppName')}</span>
                    <span className="text-muted-foreground/50">•</span>
                    <Badge variant="outline" className="border-blue-400/20 text-blue-400 text-xs">
                      {t('caseStudies.catFinance')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Challenge / Solution / Results */}
              <div className="grid gap-6 lg:grid-cols-3 mb-8">
                {/* Challenge */}
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CircleX className="h-5 w-5 text-destructive/70" />
                    <h3 className="font-semibold text-foreground">{t('caseStudies.featuredChallengeTitle')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('caseStudies.featuredChallenge')}
                  </p>
                </div>

                {/* Solution */}
                <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-foreground">{t('caseStudies.featuredSolutionTitle')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('caseStudies.featuredSolution')}
                  </p>
                </div>

                {/* Results */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CircleCheck className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold text-foreground">{t('caseStudies.featuredResultsTitle')}</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {t('caseStudies.featuredResult1')}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {t('caseStudies.featuredResult2')}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {t('caseStudies.featuredResult3')}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Before/After Metrics */}
              <div className="rounded-xl border border-border bg-card/50 p-5 sm:p-6">
                <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  {t('caseStudies.featuredMetricsTitle')}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <MetricBar
                    label={t('caseStudies.metricTesterCoverage')}
                    before={20}
                    after={100}
                    beforeLabel={t('caseStudies.beforeLabel')}
                    afterLabel={t('caseStudies.afterLabel')}
                  />
                  <MetricBar
                    label={t('caseStudies.metricTestingCompletion')}
                    before={0}
                    after={100}
                    beforeLabel={t('caseStudies.beforeLabel')}
                    afterLabel={t('caseStudies.afterLabel')}
                  />
                  <MetricBar
                    label={t('caseStudies.metricApprovalChance')}
                    before={5}
                    after={99}
                    beforeLabel={t('caseStudies.beforeLabel')}
                    afterLabel={t('caseStudies.afterLabel')}
                  />
                  <MetricBar
                    label={t('caseStudies.metricPlayStoreRating')}
                    before={0}
                    after={96}
                    beforeLabel={t('caseStudies.beforeLabel')}
                    afterLabel={t('caseStudies.afterLabel')}
                  />
                </div>

                {/* Star rating & summary */}
                <Separator className="my-5" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{t('caseStudies.featuredPlayStoreRating')}</span>
                    <StarRating rating={5} size="md" />
                    <span className="font-bold text-foreground">4.8</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {t('caseStudies.featuredProductionGranted')}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── More Case Studies ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Users className="h-4 w-4 mr-1" />
              {t('caseStudies.moreStoriesBadge')}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t('caseStudies.moreStoriesTitle')}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t('caseStudies.moreStoriesSubtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, idx) => {
              const Icon = study.icon;
              const initials = t(study.nameKey)
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              return (
                <Card
                  key={idx}
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
                >
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-sm shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors truncate">
                          {t(study.nameKey)}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground truncate">{t(study.appKey)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category & Status badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <Badge variant="outline" className="text-xs border-blue-400/20 text-blue-400">
                        {t(study.categoryKey)}
                      </Badge>
                      {study.approvedFirst && (
                        <Badge variant="outline" className="text-xs border-emerald-400/20 text-emerald-500">
                          <CheckCircle className="h-3 w-3 mr-0.5" />
                          {t('caseStudies.approvedFirstAttempt')}
                        </Badge>
                      )}
                      {study.rejectedBefore && (
                        <Badge variant="outline" className="text-xs border-amber-400/20 text-amber-500">
                          {t('caseStudies.rejectedBeforeCount', `${study.rejectedBefore}×`)}
                        </Badge>
                      )}
                    </div>

                    {/* Quote */}
                    <div className="flex-1 mb-4">
                      <Quote className="h-4 w-4 text-blue-400/30 mb-2" />
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        &ldquo;{t(study.quoteKey)}&rdquo;
                      </p>
                    </div>

                    {/* Result */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {t(study.resultKey)}
                          </span>
                        </div>
                        <StarRating rating={study.rating} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Metrics Dashboard ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            {t('caseStudies.metricsBadge')}
          </Badge>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t('caseStudies.metricsTitle')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('caseStudies.metricsSubtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.labelKey}
                className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${metric.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground sm:text-4xl mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t(metric.labelKey)}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── App Categories ────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Smartphone className="h-4 w-4 mr-1" />
              {t('caseStudies.categoriesBadge')}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t('caseStudies.categoriesTitle')}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t('caseStudies.categoriesSubtitle')}
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
            {appCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={cat.labelKey}
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
                >
                  <CardContent className="p-4 sm:p-5 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-blue-400 transition-colors">
                      {t(cat.labelKey)}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10">
                  <Award className="h-7 w-7 text-blue-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('caseStudies.ctaTitle')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('caseStudies.ctaDescription')}
              </p>
              <Button
                onClick={() => navigate(APP_URL)}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                {t('caseStudies.ctaButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
