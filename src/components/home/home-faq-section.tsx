'use client';

import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { ArrowRight, HelpCircle, Search } from 'lucide-react';

import { HOME_FAQ_COUNT } from '@/lib/faq-i18n-items';

function buildFallbackFaq(t: (key: string) => string) {
  return Array.from({ length: HOME_FAQ_COUNT }, (_, index) => {
    const i = index + 1;
    return {
      id: `home-faq-${i}`,
      question: t(`homeFaq.fallback${i}Q`),
      answer: t(`homeFaq.fallback${i}A`),
    };
  });
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

export function HomeFaqSection() {
  const { t, language } = useLanguage();
  const { navigate } = useRouter();
  const { trackFaq } = useAnalytics();
  const fallbackFaq = useMemo(() => buildFallbackFaq(t), [t, language]);
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return fallbackFaq;
    return fallbackFaq.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [fallbackFaq, query]);

  return (
    <section className="py-16 sm:py-20 border-t border-border/40" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            {t('homeFaq.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('homeFaq.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('homeFaq.subtitle')}</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('homeFaq.searchPlaceholder')}
            className="ps-9 h-11 bg-card/50 border-border/60"
            aria-label={t('homeFaq.searchPlaceholder')}
          />
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{t('homeFaq.noResults')}</p>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border/60 rounded-lg px-4 bg-card/50 data-[state=open]:border-blue-500/25 data-[state=open]:shadow-sm transition-colors"
              >
                <AccordionTrigger
                  className="text-start font-semibold hover:no-underline py-4 gap-3"
                  onClick={() => trackFaq(item.id)}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-400"
            onClick={() => navigate('/faq')}
          >
            {t('homeFaq.viewAll')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
