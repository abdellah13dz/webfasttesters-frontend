'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage, type Language } from '@/lib/i18n/context';
import { TRUSTPILOT_LOCALES, TRUSTPILOT_REVIEW_COLLECTOR } from '@/lib/trustpilot';
import { onTrustpilotReady } from '@/components/trustpilot/trustpilot-script';
import { cn } from '@/lib/utils';

interface TrustpilotWidgetProps {
  className?: string;
  height?: string;
  width?: string;
}

function resolveLocale(language: Language): string {
  return TRUSTPILOT_LOCALES[language] ?? TRUSTPILOT_LOCALES.en;
}

export function TrustpilotWidget({
  className,
  height = '52px',
  width = '100%',
}: TrustpilotWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { currentPath } = useRouter();
  const locale = resolveLocale(language);

  useEffect(() => {
    const loadWidget = () => {
      if (widgetRef.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(widgetRef.current, true);
      }
    };

    onTrustpilotReady(loadWidget);
  }, [currentPath, locale]);

  return (
    <div className={cn('trustpilot-widget-container', className)}>
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={TRUSTPILOT_REVIEW_COLLECTOR.templateId}
        data-businessunit-id={TRUSTPILOT_REVIEW_COLLECTOR.businessUnitId}
        data-style-height={height}
        data-style-width={width}
        data-token={TRUSTPILOT_REVIEW_COLLECTOR.token}
      >
        <a
          href={TRUSTPILOT_REVIEW_COLLECTOR.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}
