'use client';

import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { APP_SETUP_GUIDE_URL, APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { trackGa4Event } from '@/lib/ga4-events';

const VIDEO_ID = process.env.NEXT_PUBLIC_EXPLAINER_VIDEO_ID?.trim() || '';

interface CroHeroProps {
  onSecondaryAction?: () => void;
}

export function CroHero({ onSecondaryAction }: CroHeroProps) {
  const { t } = useLanguage();
  const { navigate, currentPath } = useRouter();
  const { trackCta } = useAnalytics();

  const handlePrimaryCta = () => {
    trackCta('hero_cta', undefined, 'hero_cta_click');
    trackCta('hero_cta', undefined, 'signup_click');
    navigate(APP_URL);
    onSecondaryAction?.();
  };

  const handleVideoClick = () => {
    trackGa4Event('youtube_click', currentPath, { location: 'cro_hero' });
    if (VIDEO_ID) return;
    window.open(APP_SETUP_GUIDE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden hero-y border-b border-border/40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/5 via-background to-background" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-start">
            <Badge
              variant="outline"
              className="mb-5 px-4 py-1.5 text-sm font-medium border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              {t('croHero.badge')}
            </Badge>

            <h1 className="text-display mb-4 sm:mb-5 leading-tight">
              {t('croHero.headline')}
            </h1>

            <p className="text-lg sm:text-xl text-foreground/90 font-medium mb-2">
              {t('croHero.subheadline')}
            </p>

            <p className="text-subheading mb-8 max-w-xl mx-auto lg:mx-0">
              {t('croHero.paymentNote')}
            </p>

            <Button
              size="lg"
              onClick={handlePrimaryCta}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base px-8 h-12 shadow-lg shadow-blue-500/25"
            >
              {t('croHero.cta')}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="relative">
            {VIDEO_ID ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/60 shadow-xl bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                  title={t('croHero.videoTitle')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleVideoClick}
                className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-blue-500/10 to-card shadow-xl flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="h-7 w-7 ml-1" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{t('croHero.videoTitle')}</span>
                  <span className="text-xs text-muted-foreground">{t('croHero.videoDuration')}</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
