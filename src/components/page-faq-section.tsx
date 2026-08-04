'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { HelpCircle } from 'lucide-react';

interface PageFaqSectionProps {
  /** i18n key prefix, e.g. "compare.faq" → compare.faq1Q / compare.faq1A */
  keyPrefix: string;
  count: number;
  titleKey: string;
  subtitleKey?: string;
  badgeKey?: string;
  trackingPrefix: string;
  className?: string;
}

/** Visible FAQ accordion that stays in sync with JSON-LD schema entries. */
export function PageFaqSection({
  keyPrefix,
  count,
  titleKey,
  subtitleKey,
  badgeKey,
  trackingPrefix,
  className = '',
}: PageFaqSectionProps) {
  const { t } = useLanguage();
  const { trackFaq } = useAnalytics();

  const items = Array.from({ length: count }, (_, index) => {
    const i = index + 1;
    return {
      id: `${trackingPrefix}-${i}`,
      question: t(`${keyPrefix}${i}Q`),
      answer: t(`${keyPrefix}${i}A`),
    };
  }).filter((item) => item.question && !item.question.startsWith(keyPrefix));

  if (!items.length) return null;

  return (
    <section className={`border-t border-border/40 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          {badgeKey ? (
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400"
            >
              <HelpCircle className="me-1.5 h-3.5 w-3.5" />
              {t(badgeKey)}
            </Badge>
          ) : null}
          <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">{t(titleKey)}</h2>
          {subtitleKey ? (
            <p className="mx-auto max-w-2xl text-muted-foreground">{t(subtitleKey)}</p>
          ) : null}
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-lg border border-border/60 bg-card/50 px-4"
            >
              <AccordionTrigger
                className="py-4 text-start font-semibold hover:no-underline"
                onClick={() => trackFaq(item.id)}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
