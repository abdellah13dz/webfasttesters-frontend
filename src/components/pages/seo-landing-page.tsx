'use client';

import Link from 'next/link';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useAnalytics } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n/context';
import type { SeoLandingPageConfig } from '@/lib/seo-landing-pages';
import { getSeoLandingPage } from '@/lib/seo-landing-pages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  DollarSign,
  Shield,
  Users,
} from 'lucide-react';
import { AiCitationSummary, AiEntityDefinition } from '@/components/ai-citation-summary';
import { FullDemoCta } from '@/components/full-demo-cta';
import { NewsletterSection } from '@/components/newsletter-section';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function renderMarkdown(text: string) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-4 text-base leading-relaxed text-muted-foreground last:mb-0 sm:text-[17px]">
            {children}
          </p>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-8 text-xl font-bold text-foreground first:mt-0">{children}</h2>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} className="font-medium text-blue-400 hover:underline">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="article-table-scroll mb-6 overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-border/60 bg-muted/50 px-4 py-2.5 text-start font-semibold text-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-border/40 px-4 py-2.5 text-muted-foreground">{children}</td>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

const HERO_STATS = [
  { icon: Users, key: 'seoLanding.bullet1' as const },
  { icon: Clock, key: 'seoLanding.bullet2' as const },
  { icon: Shield, key: 'seoLanding.bullet3' as const },
  { icon: DollarSign, key: 'seoLanding.bullet4' as const },
];

interface SeoLandingPageProps {
  config: SeoLandingPageConfig;
}

export function SeoLandingPage({ config }: SeoLandingPageProps) {
  const { navigate, currentPath } = useRouter();
  const { trackCta, trackFaq } = useAnalytics();
  const { t } = useLanguage();

  const startTesting = () => {
    trackCta('hero_cta', undefined, 'signup_click');
    goToGetStartedPricing(currentPath, navigate);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/12 via-background to-cyan-500/10" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Badge variant="outline" className="mb-5 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-400">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            {t('seoLanding.badge')}
          </Badge>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {config.h1}
          </h1>
          <div className="mt-5 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            {renderMarkdown(config.intro)}
          </div>
          <AiEntityDefinition className="mt-6 max-w-3xl" />
          {config.keyTakeaways?.length ? (
            <AiCitationSummary
              takeaways={config.keyTakeaways}
              lastReviewed={config.lastReviewed}
              className="mt-6 max-w-3xl"
            />
          ) : null}

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {config.heroCta ? (
              <Button
                asChild
                size="lg"
                className="h-12 bg-blue-500 px-8 font-semibold text-white hover:bg-blue-600"
              >
                <a
                  href={config.heroCta.href}
                  {...(config.heroCta.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={() => trackCta('hero_cta', undefined, 'signup_click')}
                >
                  {config.heroCta.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={startTesting}
                className="h-12 bg-blue-500 px-8 font-semibold text-white hover:bg-blue-600"
              >
                {t('croHero.cta')}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
            {config.heroSecondaryCta ? (
              <Button asChild variant="outline" size="lg" className="h-12 px-8 font-semibold">
                <a
                  href={config.heroSecondaryCta.href}
                  {...(config.heroSecondaryCta.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={() => trackCta('hero_secondary')}
                >
                  {config.heroSecondaryCta.label}
                </a>
              </Button>
            ) : null}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO_STATS.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-3 py-3 backdrop-blur-sm sm:px-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <Icon className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                  {t(key)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <article className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {config.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm sm:p-8"
              >
                <h2 className="mb-4 text-2xl font-bold text-foreground">{section.heading}</h2>
                <div className="max-w-none">{renderMarkdown(section.body)}</div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-border/40 bg-muted/20 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{t('seoLanding.faqTitle')}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {config.faq.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={`faq-${idx}`}
                className="rounded-xl border border-border/60 bg-card/70 px-4 sm:px-5"
              >
                <AccordionTrigger
                  className="py-4 text-start font-semibold hover:no-underline"
                  onClick={() => trackFaq(`seo-${config.slug}-${idx}`)}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {config.relatedSlugs.length > 0 && (
        <section className="border-t border-border/40 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold sm:text-2xl">{t('seoLanding.relatedTitle')}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {config.relatedSlugs.map((slug) => {
                const related = getSeoLandingPage(slug);
                return (
                  <Link key={slug} href={`/${slug}`} className="block">
                    <Card className="card-hover h-full border-border/60 transition-colors hover:border-blue-500/40">
                      <CardContent className="flex items-center justify-between gap-4 p-5">
                        <span className="text-sm font-medium leading-snug text-foreground">
                          {related?.h1 ?? slug.replace(/-/g, ' ')}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FullDemoCta trackingId="seo_landing_demo" />

      <section className="border-t border-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsletterSection wide className="w-full" />
        </div>
      </section>

      <section className="border-t border-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card p-8 text-center sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{t('seoLanding.ctaTitle')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground sm:text-lg">
              {t('seoLanding.ctaSubtitle')}
            </p>
            <ul className="mb-8 mt-6 flex flex-wrap justify-center gap-3 text-sm sm:gap-4">
              {(['seoLanding.bullet1', 'seoLanding.bullet2', 'seoLanding.bullet3', 'seoLanding.bullet4'] as const).map(
                (key) => (
                  <li
                    key={key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    {t(key)}
                  </li>
                )
              )}
            </ul>
            <Button
              size="lg"
              onClick={() => {
                trackCta('pricing_cta', undefined, 'pricing_cta_click');
                goToGetStartedPricing(currentPath, navigate);
              }}
              className="h-12 bg-blue-500 px-8 font-semibold text-white hover:bg-blue-600"
            >
              {t('croHero.cta')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SeoLandingPage;
