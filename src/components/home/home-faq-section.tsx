'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchPublicFaq } from '@/lib/cms';
import type { FaqItem } from '@/lib/cms';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { ArrowRight, HelpCircle } from 'lucide-react';

const PRIORITY_QUESTIONS = [
  'Will Google accept this?',
  'Are testers real?',
  'Do testers install my app?',
  'Can I publish immediately?',
  'Do I need to invite testers?',
  'What if production is rejected?',
];

function buildFallbackFaq(t: (key: string) => string) {
  return [1, 2, 3, 4, 5, 6].map((i) => ({
    id: `home-faq-${i}`,
    question: t(`homeFaq.fallback${i}Q`),
    answer: t(`homeFaq.fallback${i}A`),
  }));
}

function pickHomeFaqItems(
  cmsItems: FaqItem[],
  fallback: { id: string; question: string; answer: string }[]
): { id: string; question: string; answer: string }[] {
  const matched: { id: string; question: string; answer: string }[] = [];

  for (const priority of PRIORITY_QUESTIONS) {
    const found = cmsItems.find((item) =>
      item.question.toLowerCase().includes(priority.toLowerCase().slice(0, 20))
    );
    if (found) {
      matched.push({ id: found.id, question: found.question, answer: found.answer });
    }
  }

  if (matched.length >= 4) return matched.slice(0, 8);

  const seen = new Set(matched.map((m) => m.id));
  for (const item of cmsItems) {
    if (seen.has(item.id)) continue;
    matched.push({ id: item.id, question: item.question, answer: item.answer });
    if (matched.length >= 8) break;
  }

  if (matched.length >= 4) return matched;

  for (const item of fallback) {
    if (matched.some((m) => m.question === item.question)) continue;
    matched.push(item);
    if (matched.length >= 8) break;
  }

  return matched;
}

export function HomeFaqSection() {
  const { t, language } = useLanguage();
  const { navigate } = useRouter();
  const { trackFaq } = useAnalytics();
  const fallbackFaq = useMemo(() => buildFallbackFaq(t), [t, language]);
  const [items, setItems] = useState(fallbackFaq);

  useEffect(() => {
    (async () => {
      try {
        const cms = await fetchPublicFaq();
        if (cms.length > 0) {
          setItems(pickHomeFaqItems(cms, fallbackFaq));
        } else {
          setItems(fallbackFaq);
        }
      } catch {
        setItems(fallbackFaq);
      }
    })();
  }, [fallbackFaq]);

  return (
    <section className="py-16 sm:py-20 border-t border-border/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            {t('homeFaq.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('homeFaq.title')}</h2>
          <p className="text-muted-foreground">{t('homeFaq.subtitle')}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border/60 rounded-lg px-4 bg-card/50"
            >
              <AccordionTrigger
                className="text-start font-semibold hover:no-underline py-4"
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

        <div className="text-center mt-8">
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
