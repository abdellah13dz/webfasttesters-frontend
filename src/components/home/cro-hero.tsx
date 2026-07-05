'use client';

import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { HeroDecorBackground } from '@/components/home/hero-video-embed';

interface CroHeroProps {
  onSecondaryAction?: () => void;
}

export function CroHero({ onSecondaryAction }: CroHeroProps) {
  const { t } = useLanguage();
  const { navigate } = useRouter();
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

  return (
    <section className="relative overflow-x-hidden hero-y border-b border-border/40">
      <HeroDecorBackground />

      <div className="relative z-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Hero illustration — left on desktop, below text on mobile (original hero visual) */}
          <div className="order-2 flex w-full min-w-0 justify-center lg:order-1">
            <div className="relative mx-auto w-full max-w-[280px] px-2 sm:max-w-xs sm:px-0 md:max-w-sm lg:max-w-md xl:max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/5 blur-2xl" />
              <img
                src="/images/illustrations/app-testing.png"
                alt="App Testing Illustration"
                className="relative mx-auto h-auto w-full animate-float-slow drop-shadow-2xl"
              />
              <div className="absolute -top-2 end-0 animate-float rounded-xl border border-border/60 bg-card px-2.5 py-1.5 shadow-lg sm:-top-4 sm:-end-4 sm:px-3 sm:py-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-green-400 sm:h-4 sm:w-4" />
                  <span className="text-[10px] font-semibold text-foreground sm:text-xs">{t('croHero.badgeApproved')}</span>
                </div>
              </div>
              <div className="absolute -bottom-1 start-0 animate-float-delay rounded-xl border border-border/60 bg-card px-2.5 py-1.5 shadow-lg sm:-bottom-2 sm:-start-4 sm:px-3 sm:py-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="h-3.5 w-3.5 text-blue-400 sm:h-4 sm:w-4" />
                  <span className="text-[10px] font-semibold text-foreground sm:text-xs">{t('croHero.badgeTesters')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text — right on desktop, above illustration on mobile */}
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
