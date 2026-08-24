'use client';

/**
 * CRO primary hero (above the fold).
 *
 * A/B test candidates (do not ship experiments automatically):
 * - Headline: "15 Real Android Testers" vs outcome-led "Get Production Access Faster"
 * - Primary CTA: "Start Closed Testing" vs "Get Real Android Testers" vs "Start for $15"
 * - Trust line placement: under CTAs (current) vs above CTAs
 * - Secondary CTA: How it works vs Reviews / Trustpilot
 *
 * Analytics: hero_cta → hero_cta_click + funnel_* ; hero_how_it_works → funnel_cta_click
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';

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
    trackCta('hero_cta');
    goToGetStartedPricing(currentPath, navigate);
    onSecondaryAction?.();
  };

  const handleSecondaryCta = () => {
    trackCta('hero_how_it_works');
    navigate('/how-it-works');
  };

  return (
    <>
      <div className="relative z-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Hero illustration — right on desktop, below text on mobile */}
          <div className="order-2 flex w-full min-w-0 justify-center py-2 sm:py-4 lg:order-2">
            <div className="relative mx-auto w-full max-w-[260px] px-2 sm:max-w-xs sm:px-0 md:max-w-sm lg:max-w-md xl:max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/5 blur-2xl" />
              <Image
                src="/images/illustrations/app-testing.png"
                alt="Google Play closed testing — Fast Testers assigns real Android app testers"
                width={1077}
                height={737}
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 512px"
                className="relative mx-auto h-auto w-full animate-float-slow drop-shadow-2xl"
                priority
                fetchPriority="high"
                decoding="async"
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

          {/* Text — left on desktop, above illustration on mobile */}
          <div className="order-1 w-full min-w-0 lg:order-1">
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

              <p className="text-subheading mx-auto mb-6 max-w-xl lg:mx-0">{t('croHero.paymentNote')}</p>

              <div className="mb-4 flex w-full flex-col items-stretch gap-3 self-center sm:w-auto sm:flex-row sm:items-center lg:self-start">
                <Button
                  size="lg"
                  onClick={handlePrimaryCta}
                  className="h-12 w-full bg-blue-500 px-6 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-blue-500/40 sm:w-auto sm:px-8"
                >
                  {t('croHero.cta')}
                  <ArrowRight className="h-4 w-4 ms-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSecondaryCta}
                  className="h-12 w-full border-border/60 px-6 text-base font-semibold text-foreground hover:bg-muted sm:w-auto sm:px-8"
                >
                  {t('croHero.secondaryCta')}
                </Button>
              </div>

              <p className="mx-auto max-w-xl text-sm text-muted-foreground lg:mx-0">
                {t('croHero.trustLine')}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground lg:mx-0">
                <Link href="/google-play-12-testers" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.requirementLink')}
                </Link>
                {' · '}
                <Link href="/google-play-14-day-testing" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.fourteenDayLink')}
                </Link>
                {' · '}
                <Link href="/google-play-testing-service" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.serviceLink')}
                </Link>
                {' · '}
                <Link href="/android-app-testers" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.testersLink')}
                </Link>
                {' · '}
                <Link href="/google-play-production-access-12-testers" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.productionLink')}
                </Link>
                {' · '}
                <Link href="/resources/google-play-checklist" className="underline-offset-4 hover:underline hover:text-foreground">
                  {t('croHero.checklistLink')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
