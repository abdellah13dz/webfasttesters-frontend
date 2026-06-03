'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { apiFetch } from '@/lib/api';
import { blogArticlePath, mapApiArticle, type ApiArticle } from '@/lib/blog';
import { applyClientSeo } from '@/lib/hooks/use-seo';
import { BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSection } from '@/components/newsletter-section';
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

export default function BlogArticlePage() {
  const { currentPath, navigate } = useRouter();
  const { t, language } = useLanguage();

  const [article, setArticle] = useState<ReturnType<typeof mapApiArticle> | null>(null);
  const [rawArticle, setRawArticle] = useState<ApiArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ReturnType<typeof mapApiArticle>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const slug = currentPath.replace('/blog/', '');

  useEffect(() => {
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
  }, [slug]);

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
        keywords: `${rawArticle.category}, google play testing, android app testing, ${rawArticle.title}`,
        ogImage: rawArticle.coverImage || BRAND_OG_IMAGE_PATH,
        type: 'article',
      },
      currentPath,
      language
    );
  }, [rawArticle, currentPath, language]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="relative overflow-hidden rounded-xl aspect-video mb-8">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {article.categories.map((cat) => (
                <Badge
                  key={cat}
                  className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-950/70 text-[10px] tracking-wider"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {article.date}
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
                className="flex items-center gap-1.5 ml-auto hover:text-blue-400 transition-colors"
              >
                <Share2 className="size-3.5" />
                Share
              </button>
            </div>

            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:text-blue-300">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button onClick={() => navigate('/blog')} variant="outline" className="gap-2">
                <ArrowLeft className="size-4" />
                {t('blogArticle.backToBlog')}
              </Button>
            </div>
          </article>

          <aside className="lg:w-80 shrink-0 space-y-6">
            <Card className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="size-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-foreground">{t('blogArticle.relatedArticles')}</h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {relatedArticles.map((related) => (
                    <button
                      key={related.slug}
                      onClick={() => navigate(blogArticlePath(related.slug))}
                      className="w-full text-left group block"
                    >
                      <div className="rounded-lg p-2 hover:bg-blue-500/5 transition-colors">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{related.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Send className="size-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-foreground">{t('blogArticle.submitApp')}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{t('blogArticle.submitAppDesc')}</p>
                <Button
                  onClick={() => navigate(APP_URL)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
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
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
