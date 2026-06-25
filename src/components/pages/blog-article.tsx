'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { apiFetch } from '@/lib/api';
import {
  blogArticleKeywords,
  blogArticlePath,
  mapApiArticle,
  type ApiArticle,
} from '@/lib/blog';
import { applyClientSeo } from '@/lib/hooks/use-seo';
import { isHtmlArticleContent } from '@/lib/article-content';
import { BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSection } from '@/components/newsletter-section';
import { SubmitAppTestingCta } from '@/components/submit-app-testing-cta';
import ReactMarkdown from 'react-markdown';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  Loader2,
  AlertCircle,
  Send,
} from 'lucide-react';

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

function toIsoDate(createdAt: string): string {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? createdAt : date.toISOString();
}

interface BlogArticlePageProps {
  slug?: string;
  initialArticle?: ApiArticle | null;
  initialRelated?: ApiArticle[];
}

export default function BlogArticlePage({
  slug: slugProp,
  initialArticle = null,
  initialRelated = [],
}: BlogArticlePageProps) {
  const { currentPath, navigate } = useRouter();
  const { t, language } = useLanguage();

  const slug = slugProp ?? currentPath.replace('/blog/', '');

  const [article, setArticle] = useState<ReturnType<typeof mapApiArticle> | null>(() =>
    initialArticle ? mapApiArticle(initialArticle) : null
  );
  const [rawArticle, setRawArticle] = useState<ApiArticle | null>(initialArticle);
  const [relatedArticles, setRelatedArticles] = useState<ReturnType<typeof mapApiArticle>[]>(() =>
    initialRelated.map(mapApiArticle)
  );
  const [loading, setLoading] = useState(!initialArticle);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialArticle) return;

    async function fetchArticle() {
      setLoading(true);
      setError(false);

      try {
        const response = await apiFetch('/api/articles');
        if (!response.ok) {
          setError(true);
          return;
        }

        const apiArticles = (await response.json()) as ApiArticle[];
        const mapped = apiArticles.map(mapApiArticle);
        const current = apiArticles.find((a) => a.slug === slug);

        if (!current) {
          setError(true);
          return;
        }

        setRawArticle(current);
        setArticle(mapApiArticle(current));
        setRelatedArticles(mapped.filter((a) => a.slug !== slug).slice(0, 3));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchArticle();
    }
  }, [slug, initialArticle]);

  useEffect(() => {
    if (!rawArticle) return;
    applyClientSeo(
      {
        title:
          rawArticle.seoTitle?.trim() ||
          `${rawArticle.title} - Fast Testers Blog`,
        description: (
          rawArticle.seoDescription?.trim() ||
          rawArticle.description ||
          ''
        ).slice(0, 160),
        keywords: blogArticleKeywords(rawArticle),
        ogImage: rawArticle.coverImage || BRAND_OG_IMAGE_PATH,
        type: 'article',
        publishedTime: rawArticle.createdAt,
        modifiedTime: rawArticle.createdAt,
        section: rawArticle.category,
        tags: [rawArticle.category, 'Google Play', 'Android app testing'],
      },
      `/blog/${slug}`,
      language
    );
  }, [rawArticle, slug, language]);

  const breadcrumbItems = [
    { label: t('header.blog'), path: '/blog' },
    ...(article ? [{ label: article.title }] : []),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              <p className="text-sm text-muted-foreground">Loading article...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('blogArticle.articleNotFound')}</h1>
            <p className="text-muted-foreground mb-6">{t('blogArticle.articleNotFoundDesc')}</p>
            <Button onClick={() => navigate('/blog')} variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              {t('blogArticle.backToBlog')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="relative overflow-hidden rounded-xl aspect-video mb-8 ring-1 ring-border shadow-lg dark:shadow-none">
            <img
              src={article.image}
              alt={`${article.title} - Google Play app testing guide`}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/40" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article
            className="flex-1 max-w-3xl"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {article.categories.map((cat) => (
                <Badge
                  key={cat}
                  className="border-blue-400/30 bg-blue-400/10 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 hover:bg-blue-400/15 dark:hover:bg-blue-950/70 text-[10px] tracking-wider"
                >
                  {categoryLabelMap[cat] ? t(categoryLabelMap[cat]) : cat}
                </Badge>
              ))}
            </div>

            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              itemProp="headline"
            >
              {article.title}
            </h1>
            <meta itemProp="description" content={rawArticle?.description || ''} />

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                <time
                  dateTime={rawArticle ? toIsoDate(rawArticle.createdAt) : undefined}
                  itemProp="datePublished"
                >
                  {article.date}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {article.readTime}
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, url: window.location.href });
                  }
                }}
                className="flex items-center gap-1.5 ml-auto text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Share2 className="size-3.5" />
                Share
              </button>
            </div>

            <div itemProp="articleBody">
              {isHtmlArticleContent(article.content) ? (
                <div
                  className="tiptap-editor-content blog-article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="tiptap-editor-content blog-article-content">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button onClick={() => navigate('/blog')} variant="outline" className="gap-2">
                <ArrowLeft className="size-4" />
                {t('blogArticle.backToBlog')}
              </Button>
            </div>
          </article>

          <aside className="lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100dvh-5rem)] lg:overflow-y-auto">
            <Card className="border-border bg-card shadow-sm dark:bg-card/50 dark:shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="size-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-semibold text-foreground">{t('blogArticle.relatedArticles')}</h3>
                </div>
                <div className="space-y-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={blogArticlePath(related.slug)}
                      className="w-full text-left group block"
                    >
                      <div className="rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-colors">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{related.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-400/30 bg-gradient-to-br from-blue-50 via-white to-blue-50/80 shadow-sm dark:border-blue-500/30 dark:from-blue-950/20 dark:via-card dark:to-blue-950/10 dark:shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Send className="size-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-semibold text-foreground">{t('blogArticle.submitApp')}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{t('blogArticle.submitAppDesc')}</p>
                <Button
                  onClick={() => navigate(APP_URL)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600 dark:shadow-blue-500/20"
                  size="sm"
                >
                  {t('blogArticle.getStarted')}
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          <SubmitAppTestingCta />
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
