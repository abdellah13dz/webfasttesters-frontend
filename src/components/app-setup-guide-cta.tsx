'use client';

import {
  BookOpen,
  ExternalLink,
  FileCheck,
  Globe,
  Play,
  UserPlus,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { openAppSetupGuide } from '@/lib/app-urls';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const FEATURES = [
  { icon: UserPlus, key: 'appSetupGuide.feature1' },
  { icon: Globe, key: 'appSetupGuide.feature2' },
  { icon: FileCheck, key: 'appSetupGuide.feature3' },
  { icon: Play, key: 'appSetupGuide.feature4' },
] as const;

interface AppSetupGuideCtaProps {
  className?: string;
  /** `section` wraps in a full-width page section; `card` is the inner card only */
  variant?: 'section' | 'card';
  /** Passed to analytics as the CTA element id */
  trackingId?: string;
}

export function AppSetupGuideCta({
  className,
  variant = 'section',
  trackingId = 'app_setup_guide_open',
}: AppSetupGuideCtaProps) {
  const { t } = useLanguage();
  const { trackCta } = useAnalytics();

  const handleOpenGuide = () => {
    trackCta(trackingId);
    openAppSetupGuide();
  };

  const card = (
    <Card
      className={cn(
        'relative overflow-hidden border-emerald-400/25 bg-gradient-to-br from-emerald-500/8 via-card to-blue-500/5 shadow-lg shadow-emerald-500/5',
        'dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-card dark:to-blue-950/10',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardContent className="relative p-6 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            >
              <BookOpen className="mr-1.5 size-3.5" />
              {t('appSetupGuide.badge')}
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t('appSetupGuide.title')}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t('appSetupGuide.subtitle')}
            </p>
            <p className="mt-3 text-sm text-muted-foreground/90">{t('appSetupGuide.note')}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={handleOpenGuide}
                className="bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                {t('appSetupGuide.cta')}
                <ExternalLink className="ml-2 size-4" />
              </Button>
              <span className="text-xs text-muted-foreground sm:text-sm">{t('appSetupGuide.ctaHint')}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURES.map((feature) => (
              <div
                key={feature.key}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <feature.icon className="size-5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{t(feature.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (variant === 'card') {
    return card;
  }

  return (
    <section className="border-t border-border/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{card}</div>
    </section>
  );
}
