'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { fetchPublicFaq } from '@/lib/cms';
import { getCmsIcon } from '@/lib/cms-icons';
import type { FaqItem } from '@/lib/cms';
import { getFullFaqI18nItems } from '@/lib/faq-i18n-items';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ArrowRight,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const faqItems = getFullFaqI18nItems();

export default function FAQ() {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();
  const [cmsItems, setCmsItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    (async () => {
      const items = await fetchPublicFaq();
      if (items.length > 0) setCmsItems(items);
    })();
  }, []);

  const displayItems = useMemo(() => {
    if (cmsItems.length > 0 && language === 'en') {
      return cmsItems.map((item) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        icon: getCmsIcon(item.icon),
      }));
    }
    return faqItems.map((faq) => ({
      id: faq.id,
      question: t(faq.questionKey),
      answer: t(faq.answerKey),
      icon: faq.icon,
    }));
  }, [cmsItems, language, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        {/* Decorative floating question marks */}
        <div className="absolute top-20 left-[8%] animate-float opacity-10">
          <HelpCircle className="h-10 w-10 text-blue-400" />
        </div>
        <div className="absolute top-32 right-[10%] animate-float-slow opacity-[0.07]">
          <HelpCircle className="h-14 w-14 text-cyan-400" />
        </div>
        <div className="absolute bottom-24 left-[20%] animate-float-delay opacity-[0.08]">
          <HelpCircle className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-44 left-[55%] animate-float opacity-[0.06]">
          <HelpCircle className="h-12 w-12 text-cyan-400" />
        </div>
        <div className="absolute bottom-16 right-[22%] animate-float-slow opacity-[0.09]">
          <HelpCircle className="h-9 w-9 text-blue-400" />
        </div>
        <div className="absolute top-16 left-[40%] animate-float-delay opacity-[0.05]">
          <HelpCircle className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <AnimatedSection>
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {t('faq.badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('faq.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t('faq.subtitle')}
            </p>

            {/* Search-like decorative bar */}
            <div className="mx-auto mt-8 max-w-lg">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 hover:border-blue-400/30 transition-colors">
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  {t('faq.searchPlaceholder')}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <AnimatedSection delay={100}>
          <Card className="border border-border bg-card/50 backdrop-blur-sm gradient-border overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <Accordion type="single" collapsible className="w-full">
                {displayItems.map((faq, index) => {
                  const Icon = faq.icon;
                  return (
                    <AnimatedSection key={faq.id} delay={index * 80}>
                      <AccordionItem
                        value={faq.id}
                        className="border-border hover:bg-blue-400/[0.03] transition-colors duration-200 rounded-lg px-2"
                      >
                        <AccordionTrigger className="hover:no-underline hover:text-blue-400 transition-colors py-5">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/10 shrink-0">
                              <Icon className="h-4 w-4 text-blue-400" />
                            </div>
                            <span className="text-sm sm:text-base font-medium text-foreground">
                              {faq.question}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-11 pr-2">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </AnimatedSection>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-400/10">
                  <MessageSquare className="h-7 w-7 text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">
                {t('faq.stillHaveQuestions')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('faq.supportTeamHelp')}
              </p>
              <Button
                onClick={() => navigate('/contact-us')}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                {t('faq.contactSupportTeam')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </div>
  );
}
