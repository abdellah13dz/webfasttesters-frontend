'use client';

import { ArrowRight, CheckCircle, Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { APP_SETUP_GUIDE_URL, APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { trackGa4Event } from '@/lib/ga4-events';

const DEFAULT_EXPLAINER_VIDEO_ID = '585wKYGtXAk';
const VIDEO_ID =
  process.env.NEXT_PUBLIC_EXPLAINER_VIDEO_ID?.trim() || DEFAULT_EXPLAINER_VIDEO_ID;

interface CroHeroProps {
  onSecondaryAction?: () => void;
}

export function CroHero({ onSecondaryAction }: CroHeroProps) {
  const { t } = useLanguage();
  const { navigate, currentPath } = useRouter();
  const { trackCta } = useAnalytics();

  const headlineGet = t('croHero.headlineGet');
  const headlineHighlight1 = t('croHero.headlineHighlight1');
  const headlineConnector = t('croHero.headlineConnector');
  const headlineHighlight2 = t('croHero.headlineHighlight2');
  const subPrefix = t('croHero.subheadlinePrefix');
  const subHighlight = t('croHero.subheadlineHighlight');
  const subSuffix = t('croHero.subheadlineSuffix');

  const handlePrimaryCta = () => {
    trackCta('hero_cta', undefined, 'hero_cta_click');
    trackCta('hero_cta', undefined, 'signup_click');
    navigate(APP_URL);
    onSecondaryAction?.();
  };

  const handleVideoClick = () => {
    trackGa4Event('youtube_click', currentPath, { location: 'cro_hero' });
    window.open(APP_SETUP_GUIDE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-x-hidden hero-y border-b border-border/40">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 -z-10 hero-grid-pattern opacity-50" />

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/3 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-[15%] left-[8%] animate-float" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="4" fill="rgba(59,130,246,0.12)" /></svg>
        <svg className="absolute top-[25%] right-[12%] animate-float-delay" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="rgba(59,130,246,0.1)" /></svg>
        <svg className="absolute top-[60%] left-[5%] animate-float-slow" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="5" fill="rgba(59,130,246,0.08)" /></svg>
        <svg className="absolute top-[45%] right-[6%] animate-float" width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="2.5" fill="rgba(59,130,246,0.1)" /></svg>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Video — left on desktop, below text on mobile */}
          <div className="order-2 w-full min-w-0 lg:order-1">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              {VIDEO_ID ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-black shadow-xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                    title={t('croHero.videoTitle')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="pointer-events-none absolute top-2 end-2 sm:top-3 sm:end-3 rounded-xl border border-border/60 bg-card/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-foreground">{t('croHero.badgeApproved')}</span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-2 start-2 sm:bottom-3 sm:start-3 rounded-xl border border-border/60 bg-card/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-foreground">{t('croHero.badgeTesters')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVideoClick}
                  className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-blue-500/10 to-card shadow-xl"
                >
                  <div className="flex flex-col items-center gap-3 px-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform group-hover:scale-105">
                      <Play className="h-7 w-7 ms-1" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{t('croHero.videoTitle')}</span>
                    <span className="text-xs text-muted-foreground">{t('croHero.videoDuration')}</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Text — right on desktop, above video on mobile */}
          <div className="order-1 w-full min-w-0 lg:order-2">
            <div className="flex w-full flex-col text-center lg:text-start">
              <Badge
                variant="outline"
                className="mb-6 w-fit self-center px-4 py-1.5 text-sm font-medium border-blue-500/30 text-blue-400 bg-gradient-to-r from-blue-500/10 via-blue-500/15 to-cyan-500/10 animate-shimmer hover:from-blue-500/15 hover:via-blue-500/20 hover:to-cyan-500/15 transition-colors lg:self-start"
              >
                <CheckCircle className="h-3.5 w-3.5 me-1.5" />
                {t('croHero.badge')}
              </Badge>

              <h1 className="text-display mb-4 sm:mb-6">
                {headlineGet ? <>{headlineGet} </> : null}
                <span className="gradient-text">{headlineHighlight1}</span>
                {(headlineConnector || headlineHighlight2) && (
                  <>
                    <br />
                    {headlineConnector ? <>{headlineConnector} </> : null}
                    {headlineHighlight2 ? (
                      <span className="gradient-text">{headlineHighlight2}</span>
                    ) : null}
                  </>
                )}
              </h1>

              <p className="mx-auto mb-3 max-w-2xl text-lg sm:text-xl font-medium text-foreground/90 lg:mx-0">
                {subPrefix}{' '}
                <span className="gradient-text">{subHighlight}</span>
                {subSuffix ? <> {subSuffix}</> : null}
              </p>

              <p className="text-subheading mx-auto mb-8 max-w-xl lg:mx-0">{t('croHero.paymentNote')}</p>

              <Button
                size="lg"
                onClick={handlePrimaryCta}
                className="h-12 w-full self-center bg-blue-500 px-6 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-blue-500/40 sm:w-auto sm:px-8 lg:self-start"
              >
                {t('croHero.cta')}
                <ArrowRight className="h-4 w-4 ms-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
