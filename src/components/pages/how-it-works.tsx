'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Send,
  Users,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Star,
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

const steps = [
  {
    number: 1,
    titleKey: 'howItWorks.step1Title',
    descriptionKey: 'howItWorks.step1Desc',
    icon: CreditCard,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  {
    number: 2,
    titleKey: 'howItWorks.step2Title',
    descriptionKey: 'howItWorks.step2Desc',
    icon: Send,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
  },
  {
    number: 3,
    titleKey: 'howItWorks.step3Title',
    descriptionKey: 'howItWorks.step3Desc',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  {
    number: 4,
    titleKey: 'howItWorks.step4Title',
    descriptionKey: 'howItWorks.step4Desc',
    icon: Rocket,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
  },
];

const stats = [
  { labelKey: 'howItWorks.statSuccessRate', value: '99%', icon: Shield },
  { labelKey: 'howItWorks.statTesterAssignment', value: '6 Hours', icon: Clock },
  { labelKey: 'howItWorks.statTestingPeriod', value: '16 Days', icon: Star },
  { labelKey: 'howItWorks.statProfessionalTesters', value: '14', icon: Users },
];

export default function HowItWorks() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 hero-grid-pattern opacity-30" />
        {/* Floating decorative dots */}
        <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-blue-400/20 animate-float" />
        <div className="absolute top-32 right-[15%] w-2 h-2 rounded-full bg-cyan-400/20 animate-float-slow" />
        <div className="absolute bottom-24 left-[20%] w-4 h-4 rounded-full bg-blue-400/15 animate-float-delay" />
        <div className="absolute top-40 left-[60%] w-2 h-2 rounded-full bg-cyan-400/25 animate-float" />
        <div className="absolute bottom-16 right-[25%] w-3 h-3 rounded-full bg-blue-400/15 animate-float-slow" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                {t('howItWorks.badge')}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('howItWorks.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl">
                {t('howItWorks.subtitle')}
              </p>
            </div>
            {/* Hero Illustration */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />
                <img
                  src="/images/illustrations/how-it-works.png"
                  alt="How it works illustration"
                  className="relative w-full h-auto rounded-2xl shadow-2xl shadow-blue-500/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="grid gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedSection key={step.number} delay={index * 150}>
                <div className="relative">
                  <Card
                    className={`relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300 group gradient-border`}
                  >
                    <CardContent className="relative p-6 sm:p-8 z-10">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        {/* Step Number & Icon */}
                        <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                          <div
                            className={`flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} ${step.borderColor} border group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className={`h-8 w-8 ${step.color}`} />
                          </div>
                          <span
                            className={`text-3xl font-bold ${step.color} opacity-50`}
                          >
                            {String(step.number).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground sm:text-2xl mb-2 group-hover:text-blue-400 transition-colors">
                            {t(step.titleKey)}
                          </h3>
                          <p className="text-muted-foreground text-base leading-relaxed">
                            {t(step.descriptionKey)}
                          </p>
                        </div>

                        {/* Check indicator */}
                        <CheckCircle2
                          className={`h-6 w-6 ${step.color} opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-2 sm:mt-0`}
                        />
                      </div>
                    </CardContent>
                    {/* Floating dot near card */}
                    <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${step.bgColor} animate-float opacity-60`} />
                  </Card>

                  {/* Animated connector line between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="relative flex flex-col items-center">
                        <div className="w-px h-8 bg-gradient-to-b from-blue-400/30 to-cyan-400/20" />
                        <div className="w-2 h-2 rounded-full bg-blue-400/40 animate-pulse-ring" />
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Stats Bar */}
      <AnimatedSection>
        <section className="relative border-y border-border bg-card/30 gradient-bg-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.labelKey} className="text-center hover-scale">
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-400/10">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{t(stat.labelKey)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('howItWorks.readyToStart')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('howItWorks.ctaDescription')}
              </p>
              <Button
                onClick={() => navigate(APP_URL)}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                {t('howItWorks.startJourney')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </div>
  );
}
