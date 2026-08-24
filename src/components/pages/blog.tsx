'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { apiFetch } from '@/lib/api';
import { blogArticlePath, mapApiArticle, type ApiArticle } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  Newspaper,
  Loader2,
} from 'lucide-react';
import { NewsletterSection } from '@/components/newsletter-section';
import { SubmitAppTestingCta } from '@/components/submit-app-testing-cta';

const categoryLabelMap: Record<string, string> = {
  ALL: 'blog.categoryAll',
  'GOOGLE PLAY': 'blog.categoryGooglePlay',
  'APP TESTING': 'blog.categoryAppTesting',
  'BETA TESTING': 'blog.categoryBetaTesting',
  'CLOSED TESTING': 'blog.categoryClosedTesting',
  'APP REJECTION': 'blog.categoryAppRejection',
  INTERNATIONAL: 'blog.categoryInternational',
  PUBLISHING: 'blog.categoryPublishing',
};

interface BlogPageProps {
  initialArticles?: ApiArticle[];
}

export default function BlogPage({ initialArticles = [] }: BlogPageProps) {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ReturnType<typeof mapApiArticle>[]>(() =>
    initialArticles.map(mapApiArticle)
  );
  const [loading, setLoading] = useState(initialArticles.length === 0);

  useEffect(() => {
    if (initialArticles.length > 0) return;

    (async () => {
      try {
        const res = await apiFetch('/api/articles');
        if (!res.ok) return;
        const data = (await res.json()) as ApiArticle[];
        if (Array.isArray(data)) {
          setArticles(data.map(mapApiArticle));
        }
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [initialArticles.length]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.flatMap((post) => post.categories)));
    return [
      { key: 'ALL', labelKey: 'blog.categoryAll' },
      ...unique.map((key) => ({ key, labelKey: categoryLabelMap[key] || key })),
    ];
  }, [articles]);

  const filteredPosts = articles.filter((post) => {
    const matchesCategory =
      activeCategory === 'ALL' || post.categories.includes(activeCategory);
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = articles.find((post) => post.featured) ?? articles[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10 dark:from-blue-950/20 dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern opacity-30 dark:opacity-20" />
        <div className="absolute top-16 right-[12%] hidden sm:block animate-float opacity-[0.12] dark:opacity-10">
          <Newspaper className="h-10 w-10 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="absolute bottom-20 left-[8%] hidden sm:block animate-float-slow opacity-[0.08] dark:opacity-[0.06]">
          <BookOpen className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-400/30 bg-blue-400/10 text-blue-600 dark:border-blue-950/50 dark:bg-blue-950/50 dark:text-blue-400 hover:bg-blue-400/15 dark:hover:bg-blue-950/70 text-[13px] tracking-wider">
              <Newspaper className="mr-1 size-3" />
              {t('blog.weeklyUpdates')}
            </Badge>
            <Badge variant="outline" className="border-border bg-white/60 dark:bg-transparent text-muted-foreground">
              <Clock className="mr-1 size-3" />
              {t('blog.readTime')}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('blog.title')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('blog.subtitle')}
          </p>

          <div className="mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-white py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 dark:border-border dark:bg-card/50 dark:shadow-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 dark:bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === category.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-300 shadow-sm dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30 dark:shadow-none'
                    : 'border border-border bg-white/70 text-muted-foreground hover:border-blue-200 hover:text-foreground/80 dark:bg-transparent dark:hover:border-border'
                }`}
              >
                {category.key === category.labelKey ? category.key : t(category.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && activeCategory === 'ALL' && searchQuery === '' && (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('blog.featuredArticle')}</span>
          </div>
          <Link href={blogArticlePath(featuredPost.slug)} className="block">
          <Card
            className="group border-border bg-card shadow-md transition-all hover:border-blue-300 hover:shadow-lg dark:bg-card/50 dark:shadow-none dark:hover:border-blue-500/30 overflow-hidden"
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {featuredPost.categories.map((cat) => (
                  <Badge
                    key={cat}
                    className="border-blue-400/30 bg-blue-400/10 text-blue-700 dark:border-blue-950/50 dark:bg-blue-950/50 dark:text-blue-400 hover:bg-blue-400/15 dark:hover:bg-blue-950/70 text-[10px] tracking-wider"
                  >
                    {categoryLabelMap[cat] ? t(categoryLabelMap[cat]) : cat}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground">{t('blog.featured')}</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">
                {featuredPost.description}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featuredPost.readTime}
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                  {t('blog.readArticle')}
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </CardContent>
          </Card>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              {activeCategory === 'ALL'
                ? t('blog.allArticles')
                : categoryLabelMap[activeCategory]
                  ? t(categoryLabelMap[activeCategory])
                  : activeCategory}
            </h2>
            <span className="text-sm text-muted-foreground">({filteredPosts.length})</span>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center shadow-sm dark:bg-card/50 dark:shadow-none">
            <Search className="mx-auto size-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">{t('blog.noArticles')}</p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {t('blog.clearFilters')}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts
              .filter((p) => !(featuredPost && activeCategory === 'ALL' && searchQuery === '' && p.slug === featuredPost.slug))
              .map((post) => (
                <Link key={post.slug} href={blogArticlePath(post.slug)} className="block h-full">
                <Card
                  className="group h-full border-border bg-card shadow-sm transition-all hover:border-blue-200 hover:shadow-md flex flex-col overflow-hidden dark:bg-card/50 dark:shadow-none dark:hover:border-blue-500/20 dark:hover:shadow-none"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {post.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="bg-black/50 border-white/20 text-white text-[10px] tracking-wider px-2 py-0 backdrop-blur-sm"
                        >
                          {categoryLabelMap[cat] ? t(categoryLabelMap[cat]) : cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          <SubmitAppTestingCta />
          <NewsletterSection wide className="w-full" />
        </div>
      </section>
    </div>
  );
}
