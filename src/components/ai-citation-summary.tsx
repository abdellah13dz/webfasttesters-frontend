'use client';

import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';
import { CheckCircle2, BookOpen, Building2 } from 'lucide-react';

interface AiCitationSummaryProps {
  /** Short factual bullets LLMs can quote independently */
  takeaways: string[];
  /** Optional ISO date shown as “Last reviewed” */
  lastReviewed?: string;
  className?: string;
}

/**
 * Citation-friendly summary block for educational pages.
 * Placed near the top so AI Overviews / LLM retrieval get a dense factual passage.
 */
export function AiCitationSummary({
  takeaways,
  lastReviewed,
  className = '',
}: AiCitationSummaryProps) {
  const { t } = useLanguage();
  if (!takeaways.length) return null;

  return (
    <aside
      className={`rounded-xl border border-border/60 bg-muted/30 p-5 sm:p-6 ${className}`}
      aria-labelledby="ai-key-takeaways"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
          <BookOpen className="h-3.5 w-3.5 me-1.5" />
          {t('common.keyTakeaway')}
        </Badge>
        {lastReviewed ? (
          <span className="text-xs text-muted-foreground">
            {t('aiSeo.lastReviewed')}:{' '}
            <time dateTime={lastReviewed}>{lastReviewed}</time>
          </span>
        ) : null}
      </div>
      <h2 id="ai-key-takeaways" className="sr-only">
        {t('common.keyTakeaway')}
      </h2>
      <ul className="space-y-2.5">
        {takeaways.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Compact entity definition for AI visitors confirming they found the right service. */
export function AiEntityDefinition({ className = '' }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <aside
      className={`rounded-xl border border-border/50 bg-card/60 p-4 sm:p-5 ${className}`}
      aria-label={t('aiSeo.entityLabel')}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
          <Building2 className="h-4 w-4 text-blue-400" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-foreground">{t('aiSeo.entityTitle')}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('aiSeo.entityBody')}</p>
        </div>
      </div>
    </aside>
  );
}
