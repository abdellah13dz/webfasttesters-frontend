'use client';

import { useEffect, useMemo, useState } from 'react';
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

export default function BlogPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ReturnType<typeof mapApiArticle>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <Newspaper className="mr-1 size-3" />
              {t('blog.weeklyUpdates')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
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
                className="w-full rounded-lg border border-border bg-card/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === category.key
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500/30'
                    : 'border border-border text-muted-foreground hover:border-border hover:text-foreground/80'
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
          <Card
            className="group cursor-pointer border-border bg-card/50 transition-all hover:border-blue-500/30 overflow-hidden"
            onClick={() => navigate(blogArticlePath(featuredPost.slug))}
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
                    className="border-blue-800 dark:border-blue-950/50 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/70 text-[10px] tracking-wider"
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
          <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
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
                <Card
                  key={post.slug}
                  className="group cursor-pointer border-border bg-card/50 transition-all hover:border-blue-500/20 hover:bg-card/50 flex flex-col overflow-hidden"
                  onClick={() => navigate(blogArticlePath(post.slug))}
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
              ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
