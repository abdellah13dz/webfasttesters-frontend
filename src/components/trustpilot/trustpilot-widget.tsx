'use client';

import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { TRUSTPILOT_BRAND_GREEN, TRUSTPILOT_REVIEW_URL } from '@/lib/trustpilot';
import { cn } from '@/lib/utils';

interface TrustpilotWidgetProps {
  className?: string;
  align?: 'start' | 'center';
  variant?: 'compact' | 'default';
  /** @deprecated Use variant="compact" — kept for existing call sites */
  fitContainer?: boolean;
}

function TrustpilotStars({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const starClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className={cn(starClass, 'shrink-0')}
          fill={TRUSTPILOT_BRAND_GREEN}
        >
          <path d="M12 2l2.9 6.26 6.8.59-5.15 4.48 1.55 6.63L12 17.77l-6.1 3.59 1.55-6.63L2.3 8.85l6.8-.59L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TrustpilotWidget({
  className,
  align = 'start',
  variant,
  fitContainer = false,
}: TrustpilotWidgetProps) {
  const { t } = useLanguage();
  const resolvedVariant = variant ?? (fitContainer ? 'compact' : 'default');

  const wrapperClass = cn(
    'w-full min-w-0',
    align === 'center' && 'flex justify-center',
    className
  );

  if (resolvedVariant === 'compact') {
    return (
      <div className={wrapperClass}>
        <a
          href={TRUSTPILOT_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group inline-flex w-full max-w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors',
            'border-border/60 bg-card/60 hover:border-[#00b67a]/40 hover:bg-card/80',
            'dark:border-border/50 dark:bg-muted/25 dark:hover:border-[#00b67a]/35 dark:hover:bg-muted/40'
          )}
        >
          <img
            src="/trusted/trustpilot.png"
            alt=""
            className="h-7 w-7 shrink-0 rounded-md object-contain"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <TrustpilotStars size="sm" />
              <span className="text-xs font-semibold text-foreground">{t('trustpilot.ratingLabel')}</span>
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-muted-foreground group-hover:text-foreground/80">
              {t('trustpilot.reviewUs')}
            </span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <a
        href={TRUSTPILOT_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex w-full max-w-md items-center gap-3 rounded-xl border px-4 py-3.5 transition-all sm:gap-4 sm:px-5 sm:py-4',
          'border-border/60 bg-card/70 shadow-sm hover:border-[#00b67a]/40 hover:shadow-md',
          'dark:border-border/50 dark:bg-muted/20 dark:hover:border-[#00b67a]/35 dark:hover:bg-muted/35'
        )}
      >
        <img
          src="/trusted/trustpilot.png"
          alt=""
          className="h-9 w-9 shrink-0 rounded-lg object-contain sm:h-10 sm:w-10"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 text-left">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <TrustpilotStars />
            <span className="text-sm font-semibold text-foreground sm:text-base">
              {t('trustpilot.ratingLabel')}
            </span>
          </span>
          <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
            {t('trustpilot.reviewUs')}
          </span>
          <span className="mt-0.5 block text-[11px] text-muted-foreground/80 sm:text-xs">
            {t('trustpilot.shareExperience')}
          </span>
        </span>
        <span
          className={cn(
            'hidden shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex',
            'bg-[#00b67a]/10 text-[#00b67a] group-hover:bg-[#00b67a]/15',
            'dark:bg-[#00b67a]/15 dark:text-[#34d399] dark:group-hover:bg-[#00b67a]/20'
          )}
        >
          {t('trustpilot.cta')}
          <ExternalLink className="h-3 w-3" />
        </span>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground sm:hidden" />
      </a>
    </div>
  );
}
