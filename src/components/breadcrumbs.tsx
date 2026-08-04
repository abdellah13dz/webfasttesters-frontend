'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/** Accessible HTML breadcrumbs with real links for crawlable internal PageRank. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();

  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap">
        <li className="flex items-center gap-1 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-blue-400 transition-colors"
            aria-label={t('breadcrumbs.home')}
          >
            <Home className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">{t('breadcrumbs.home')}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1 shrink-0">
              <ChevronRight className="size-3.5 text-muted-foreground/50" aria-hidden />
              {isLast || !item.path ? (
                <span
                  className="text-blue-400 font-medium truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-muted-foreground hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
