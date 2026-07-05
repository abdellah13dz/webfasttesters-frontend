'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { trackGa4Event } from '@/lib/ga4-events';
import { useAnalytics } from '@/lib/analytics';

const DISMISS_KEY = 'ft_exit_intent_dismissed';
const DISMISS_DAYS = 7;

function wasRecentlyDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function ExitIntentPopup() {
  const { t } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { trackCta } = useAnalytics();
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    markDismissed();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentPath.startsWith('/admin')) return;
    if (wasRecentlyDismissed()) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    let triggered = false;

    const onMouseLeave = (e: MouseEvent) => {
      if (triggered || e.clientY > 10) return;
      triggered = true;
      setVisible(true);
      trackGa4Event('exit_intent_shown', currentPath);
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [currentPath]);

  if (!visible) return null;

  const handleCta = () => {
    trackGa4Event('exit_intent_cta', currentPath);
    trackCta('hero_cta', undefined, 'signup_click');
    dismiss();
    navigate(APP_URL);
  };

  const handleChecklist = () => {
    trackGa4Event('checklist_download', currentPath);
    dismiss();
    navigate('/resources/google-play-checklist');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <Card className="relative w-full max-w-lg border-blue-500/30 bg-card shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 end-3 rounded-md p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <CardContent className="p-6 sm:p-8">
          <p className="text-sm font-medium text-blue-400 mb-2">{t('exitIntent.badge')}</p>
          <h2 id="exit-intent-title" className="text-2xl font-bold text-foreground mb-3">
            {t('exitIntent.title')}
          </h2>
          <p className="text-muted-foreground mb-5">{t('exitIntent.description')}</p>
          <ul className="space-y-2 mb-6">
            {(['item1', 'item2', 'item3'] as const).map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                {t(`exitIntent.${key}`)}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCta}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11"
            >
              {t('exitIntent.cta')}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              onClick={handleChecklist}
              className="flex-1 h-11 border-border/60"
            >
              <Download className="h-4 w-4 mr-1.5" />
              {t('exitIntent.checklist')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
