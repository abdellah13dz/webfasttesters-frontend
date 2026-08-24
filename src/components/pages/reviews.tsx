'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useLanguage } from '@/lib/i18n/context';
import { fetchPublicReviews } from '@/lib/reviews-api';
import type { Review } from '@/lib/types/review';
import { ReviewCard } from '@/components/reviews/review-card';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Star,
  ArrowRight,
  Trophy,
  Globe,
  Quote,
  Search,
  X,
  Users,
} from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

type StarFilter = 'all' | '5' | '4' | '3';
type SortOption = 'recent' | 'highest' | 'lowest';

export default function Reviews() {
  const { navigate, currentPath } = useRouter();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [starFilter, setStarFilter] = useState<StarFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  // Compute stats from all reviews
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return { average: 0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        distribution[r.rating]++;
      }
    });
    return { average: Math.round(average * 10) / 10, total, distribution };
  }, [reviews]);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Star filter
    if (starFilter !== 'all') {
      const filterRating = parseInt(starFilter, 10);
      result = result.filter((r) => r.rating === filterRating);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.author.toLowerCase().includes(query) ||
          (r.appName && r.appName.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortOption) {
      case 'highest':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'recent':
      default:
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [reviews, starFilter, sortOption, searchQuery]);

  const hasActiveFilters = starFilter !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setStarFilter('all');
    setSearchQuery('');
  };

  const starFilterOptions: { value: StarFilter; labelKey: string }[] = [
    { value: 'all', labelKey: 'reviews.filterAll' },
    { value: '5', labelKey: 'reviews.filter5Stars' },
    { value: '4', labelKey: 'reviews.filter4Stars' },
    { value: '3', labelKey: 'reviews.filter3Stars' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        {/* Floating star decorations */}
        <div className="absolute top-20 left-[8%] animate-float opacity-15">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400/30" />
        </div>
        <div className="absolute top-28 right-[12%] animate-float-slow opacity-10">
          <Star className="h-12 w-12 text-yellow-400 fill-yellow-400/20" />
        </div>
        <div className="absolute bottom-24 left-[22%] animate-float-delay opacity-12">
          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400/25" />
        </div>
        <div className="absolute top-40 left-[48%] animate-float opacity-[0.08]">
          <Star className="h-10 w-10 text-yellow-400 fill-yellow-400/20" />
        </div>
        <div className="absolute bottom-16 right-[20%] animate-float-slow opacity-10">
          <Star className="h-7 w-7 text-yellow-400 fill-yellow-400/25" />
        </div>
        <div className="absolute top-14 right-[35%] animate-float-delay opacity-[0.07]">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400/20" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <AnimatedSection>
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Trophy className="h-4 w-4 mr-1" />
              {t('reviews.trustedByDevelopers')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('reviews.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t('reviews.subtitle')}
            </p>
            <div className="mx-auto mt-8 flex max-w-md justify-center">
              <TrustpilotWidget className="w-full" align="center" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section with Rating Distribution */}
      <AnimatedSection>
        <section className="relative border-y border-border bg-card/50 gradient-bg-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Average rating + totals */}
              <div className="flex items-center gap-6 sm:gap-8">
                {/* Large average number */}
                <div className="text-center shrink-0">
                  <div className="text-5xl sm:text-6xl font-bold text-foreground">
                    {stats.average}
                  </div>
                  <StarRating rating={Math.round(stats.average)} />
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('reviews.averageRating')}
                  </div>
                </div>
                {/* Quick stats */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/10">
                      <Star className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {stats.average}/5
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t('reviews.averageRating')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/10">
                      <Users className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {stats.total}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t('reviews.totalReviews')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/10">
                      <Trophy className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">15 testers</div>
                      <div className="text-xs text-muted-foreground">
                        {t('reviews.appsPublished')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Rating distribution */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  {t('reviews.ratingDistribution')}
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.distribution[star] || 0;
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 shrink-0 w-14">
                          <span className="text-sm text-foreground font-medium">{star}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2 flex-1"
                        />
                        <span className="text-xs text-muted-foreground w-10 text-right shrink-0">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Filters & Reviews */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        {/* Filter Bar */}
        <AnimatedSection>
          <div className="flex flex-col gap-4 mb-8">
            {/* Search + Sort row */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('reviews.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Sort Select */}
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">{t('reviews.sortMostRecent')}</SelectItem>
                  <SelectItem value="highest">{t('reviews.sortHighestRated')}</SelectItem>
                  <SelectItem value="lowest">{t('reviews.sortLowestRated')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4 mr-1" />
                  {t('reviews.clearFilters')}
                </Button>
              )}
            </div>

            {/* Star Filter Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {starFilterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={starFilter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStarFilter(option.value)}
                  className={`cursor-pointer ${
                    starFilter === option.value
                      ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                      : 'hover:border-blue-400/30 hover:text-blue-400'
                  }`}
                >
                  {option.value !== 'all' && (
                    <Star className="h-3.5 w-3.5 mr-1 fill-current" />
                  )}
                  {t(option.labelKey)}
                </Button>
              ))}
              {/* Results count */}
              <span className="text-sm text-muted-foreground ml-2">
                {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Reviews Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
              <p className="text-sm text-muted-foreground">{t('reviews.loading')}</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Quote className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-medium">{t('reviews.noReviewsYet')}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {t('reviews.checkBackSoon')}
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-medium">
              {t('reviews.noReviewsFound')}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {t('reviews.noReviewsFoundDesc')}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="mt-4 cursor-pointer"
            >
              {t('reviews.clearFilters')}
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={Math.min(index * 80, 400)}>
                <ReviewCard review={review} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('reviews.readyToJoin')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('reviews.ctaDescription')}
              </p>
              <Button
                onClick={() => goToGetStartedPricing(currentPath, navigate)}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                {t('reviews.startJourney')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </div>
  );
}
