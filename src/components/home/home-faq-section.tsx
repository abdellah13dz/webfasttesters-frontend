'use client';

import { useEffect, useState } from 'react';
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

const FALLBACK_FAQ = [
  {
    id: 'home-faq-1',
    question: 'Will Google accept this?',
    answer:
      'Yes. Fast Testers provides real Android users who install your app through Google Play closed testing — exactly what Google requires for the 14-day, 12-tester production access rule for personal developer accounts.',
  },
  {
    id: 'home-faq-2',
    question: 'Are testers real?',
    answer:
      'Yes. Every tester is a real person with a genuine Android device and Google account. They install your app from the Play Store closed testing track and use it during the 14-day period.',
  },
  {
    id: 'home-faq-3',
    question: 'Do testers install my app?',
    answer:
      'Yes. Testers join your closed testing track and install your app from Google Play — the same flow Google monitors when reviewing your production access request.',
  },
  {
    id: 'home-faq-4',
    question: 'Can I publish immediately?',
    answer:
      'You must complete 14 consecutive days of closed testing with at least 12 testers before requesting production access. Fast Testers assigns testers in about one hour so you can start the clock immediately.',
  },
  {
    id: 'home-faq-5',
    question: 'Do I need to invite testers?',
    answer:
      'No manual recruiting. Submit your closed testing link after payment and our team assigns professional testers to your track automatically.',
  },
  {
    id: 'home-faq-6',
    question: 'What if production is rejected?',
    answer:
      'Fast Testers includes a production access guarantee. If your app does not reach production after our testing period, you receive a full refund per our refund policy.',
  },
];

function pickHomeFaqItems(cmsItems: FaqItem[]): { id: string; question: string; answer: string }[] {
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

  for (const item of FALLBACK_FAQ) {
    if (matched.some((m) => m.question === item.question)) continue;
    matched.push(item);
    if (matched.length >= 8) break;
  }

  return matched;
}

export function HomeFaqSection() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const { trackFaq } = useAnalytics();
  const [items, setItems] = useState(FALLBACK_FAQ);

  useEffect(() => {
    (async () => {
      try {
        const cms = await fetchPublicFaq();
        if (cms.length > 0) {
          setItems(pickHomeFaqItems(cms));
        }
      } catch {
        /* use fallback */
      }
    })();
  }, []);

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
