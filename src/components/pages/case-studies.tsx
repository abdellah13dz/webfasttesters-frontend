'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { fetchPublicReviews } from '@/lib/reviews-api';
import type { Review } from '@/lib/types/review';
import { CaseStudyCard } from '@/components/reviews/case-study-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

// ─── Main component ─────────────────────────────────────────────────────────

export default function CaseStudies() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  useAnalytics();
  const [caseStudies, setCaseStudies] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPublicReviews({ caseStudy: true });
        setCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featuredStudy = caseStudies[0];
  const moreStudies = caseStudies.slice(1);

  const featuredInitials = featuredStudy
    ? featuredStudy.author
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

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
      {loading ? (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
          </div>
        </section>
      ) : featuredStudy ? (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 via-card to-blue-500/10 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 sm:px-8 sm:py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    {t('caseStudies.featuredBadge')}
                  </Badge>
                  {featuredStudy.category && (
                    <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                      {featuredStudy.category}
                    </Badge>
                  )}
                  {featuredStudy.result && (
                    <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {featuredStudy.result}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                  {featuredStudy.avatarUrl ? (
                    <img
                      src={featuredStudy.avatarUrl}
                      alt={featuredStudy.author}
                      className="w-14 h-14 rounded-full object-cover shrink-0 shadow-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white font-bold text-lg shrink-0 shadow-lg shadow-blue-500/25">
                      {featuredInitials}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {featuredStudy.author}
                    </h2>
                    {featuredStudy.appName && (
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-muted-foreground">{t('caseStudies.featuredAppLabel')}</span>
                        <span className="font-semibold text-blue-500">{featuredStudy.appName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-5 sm:p-6 mb-6">
                  <Quote className="h-5 w-5 text-blue-400/40 mb-3" />
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    &ldquo;{featuredStudy.text}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <StarRating rating={featuredStudy.rating} size="md" />
                  {featuredStudy.result && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle className="h-4 w-4" />
                      {featuredStudy.result}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

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

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
            </div>
          ) : moreStudies.length === 0 && !featuredStudy ? (
            <p className="text-center text-muted-foreground py-12">{t('reviews.noReviewsYet')}</p>
          ) : (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreStudies.map((study) => (
                <CaseStudyCard key={study.id} review={study} />
              ))}
            </div>
          )}
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
