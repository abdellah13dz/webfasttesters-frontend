'use client';

import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap">
        {/* Home link */}
        <li className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-muted-foreground hover:text-blue-400 transition-colors"
            aria-label={t('breadcrumbs.home')}
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">{t('breadcrumbs.home')}</span>
          </button>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1 shrink-0">
              <ChevronRight className="size-3.5 text-muted-foreground/50" />
              {isLast || !item.path ? (
                <span className="text-blue-400 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(item.path!)}
                  className="text-muted-foreground hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
