'use client';

import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SubmitAppTestingCtaProps {
  className?: string;
  /** `card` for page sections; `banner` for footer / compact rows */
  variant?: 'card' | 'banner';
}

function RequirementLink({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <Link
      href="/google-play-12-testers"
      className={cn('text-blue-600 hover:underline dark:text-blue-400', className)}
    >
      {t('blogArticle.requirementLink')}
    </Link>
  );
}

export function SubmitAppTestingCta({ className, variant = 'card' }: SubmitAppTestingCtaProps) {
  const { t } = useLanguage();
  const { navigate, currentPath } = useRouter();

  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'rounded-lg border border-blue-400/30 bg-gradient-to-r from-blue-50 via-white to-blue-50/80 p-4 sm:p-5',
          'dark:border-blue-500/30 dark:from-blue-950/20 dark:via-card dark:to-blue-950/10',
          className
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <Send className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-foreground">{t('blogArticle.submitApp')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t('blogArticle.submitAppDesc')}</p>
            <p className="mt-2 text-sm">
              <RequirementLink />
            </p>
          </div>
          <Button
            onClick={() => goToGetStartedPricing(currentPath, navigate)}
            className="shrink-0 bg-blue-600 text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t('blogArticle.getStarted')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        'border-blue-400/30 bg-gradient-to-br from-blue-50 via-white to-blue-50/80 shadow-sm',
        'dark:border-blue-500/30 dark:from-blue-950/20 dark:via-card dark:to-blue-950/10 dark:shadow-none',
        className
      )}
    >
      <CardContent className="p-6 text-center sm:p-8">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Send className="size-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('submitApp.badge')}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">{t('blogArticle.submitApp')}</h3>
        <p className="mx-auto mb-2 max-w-md text-sm text-muted-foreground sm:text-base">
          {t('blogArticle.submitAppDesc')}
        </p>
        <p className="mb-6 text-sm">
          <RequirementLink />
        </p>
        <Button
          onClick={() => goToGetStartedPricing(currentPath, navigate)}
          size="lg"
          className="bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {t('blogArticle.getStarted')}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
