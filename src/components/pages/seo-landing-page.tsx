'use client';

import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useAnalytics } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n/context';
import type { SeoLandingPageConfig } from '@/lib/seo-landing-pages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { FullDemoCta } from '@/components/full-demo-cta';
import ReactMarkdown from 'react-markdown';

function renderMarkdown(text: string) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
        h2: ({ children }) => <h2 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h2>,
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} className="text-blue-400 hover:underline font-medium">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border/60 rounded-lg">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border border-border/60 px-3 py-2 bg-muted/50 text-start font-semibold">{children}</th>,
        td: ({ children }) => <td className="border border-border/60 px-3 py-2 text-muted-foreground">{children}</td>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

interface SeoLandingPageProps {
  config: SeoLandingPageConfig;
}

export function SeoLandingPage({ config }: SeoLandingPageProps) {
  const { navigate, currentPath } = useRouter();
  const { trackCta, trackFaq } = useAnalytics();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/40 bg-gradient-to-b from-blue-500/5 to-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {t('seoLanding.badge')}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">{config.h1}</h1>
          <div className="text-lg text-muted-foreground mb-8">{renderMarkdown(config.intro)}</div>
          <Button
            size="lg"
            onClick={() => { trackCta('hero_cta', undefined, 'signup_click'); goToGetStartedPricing(currentPath, navigate); }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 px-8"
          >
            {t('croHero.cta')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert max-w-none">
          {config.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
              {renderMarkdown(section.body)}
            </section>
          ))}
        </div>
      </article>

      <section className="py-12 border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">{t('seoLanding.faqTitle')}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {config.faq.map((item, idx) => (
              <AccordionItem key={item.question} value={`faq-${idx}`} className="border border-border/60 rounded-lg px-4 bg-card/50">
                <AccordionTrigger
                  className="text-start font-semibold hover:no-underline py-4"
                  onClick={() => trackFaq(`seo-${config.slug}-${idx}`)}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {config.relatedSlugs.length > 0 && (
        <section className="py-12 border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-4">{t('seoLanding.relatedTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.relatedSlugs.map((slug) => (
                <Card key={slug} className="card-hover cursor-pointer border-border/60" onClick={() => navigate(`/${slug}`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{slug.replace(/-/g, ' ')}</span>
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 border-t border-border/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FullDemoCta trackingId="seo_landing_demo" />
        </div>
      </section>

      <section className="py-12 border-t border-border/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-card p-8">
            <h2 className="text-2xl font-bold mb-3">{t('seoLanding.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-6">{t('seoLanding.ctaSubtitle')}</p>
            <ul className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
              {(['seoLanding.bullet1', 'seoLanding.bullet2', 'seoLanding.bullet3', 'seoLanding.bullet4'] as const).map((key) => (
                <li key={key} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {t(key)}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              onClick={() => { trackCta('pricing_cta', undefined, 'pricing_cta_click'); goToGetStartedPricing(currentPath, navigate); }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              {t('croHero.cta')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
