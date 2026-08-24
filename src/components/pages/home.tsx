'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from '@/lib/router';
import { APP_HOST, APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { fetchPublicReviews } from '@/lib/reviews-api';
import type { Review } from '@/lib/types/review';
import { ReviewCard } from '@/components/reviews/review-card';
import { CaseStudyCard } from '@/components/reviews/case-study-card';
import { usePricingPlans } from '@/lib/hooks/use-pricing-plans';
import { formatPlanPrice, parsePlanFeatures } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Star,
  Users,
  Globe,
  CheckCircle,
  Shield,
  Clock,
  Zap,
  FileText,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Smartphone,
  CreditCard,
  ChevronRight,
  Upload,
  ExternalLink,
  Trophy,
  Briefcase,
  Heart,
  GraduationCap,
  Gamepad2,
  Wallet,
  Wrench,
  ShoppingBag,
} from 'lucide-react';
import { NewsletterSection } from '@/components/newsletter-section';
import { FullDemoCta } from '@/components/full-demo-cta';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { CroHero } from '@/components/home/cro-hero';
import { HeroDecorBackground } from '@/components/home/hero-video-embed';
import { HomeTrustBar } from '@/components/home/home-trust-bar';
import { HomeFaqSection } from '@/components/home/home-faq-section';
import { HeroVideoEmbed } from '@/components/home/hero-video-embed';
import { useSectionViewTracking } from '@/hooks/use-section-view-tracking';
import {
  goToGetStartedPricing,
  PRICING_SECTION_ID,
  usePricingSectionScroll,
} from '@/lib/pricing-navigation';

// ─── Animated Section Wrapper ──────────────────────────────────────────
type AnimationDirection = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';

function AnimatedSection({ children, className = '', delay = 0, direction = 'fade-up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: AnimationDirection }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClasses = () => {
    switch (direction) {
      case 'fade-left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
      case 'fade-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
      case 'scale-in':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      case 'fade-up':
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Android Plan Features ─────────────────────────────────────────────
const androidFeatures = [
  { icon: Users, text: 'home.professionalTesters' },
  { icon: Shield, text: 'home.productionAccessGuarantee' },
  { icon: Zap, text: 'home.instantTesterAccess' },
  { icon: FileText, text: 'home.comprehensiveReports' },
  { icon: Clock, text: 'home.testingPeriod' },
  { icon: MessageSquare, text: 'home.prioritySupport' },
];


// ─── Main Component ────────────────────────────────────────────────────
export default function HomePage() {
  const { navigate, currentPath } = useRouter();
  const { t } = useLanguage();
  const { trackCta } = useAnalytics();
  const { primaryPlan } = usePricingPlans();
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([]);
  const [caseStudyReviews, setCaseStudyReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [dashboardProgress, setDashboardProgress] = useState(0);
  const pricingSectionRef = useSectionViewTracking('pricing_view', '/');
  const reviewsSectionRef = useSectionViewTracking('reviews_view', '/');
  const caseStudiesSectionRef = useSectionViewTracking('case_studies_view', '/');
  usePricingSectionScroll('home');

  useEffect(() => {
    const timer = setTimeout(() => setDashboardProgress(56), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setReviewsLoading(true);
        const [featured, caseStudies] = await Promise.all([
          fetchPublicReviews({ featured: true, limit: 3 }),
          fetchPublicReviews({ caseStudy: true, excludeFeatured: true, limit: 1 }),
        ]);
        setFeaturedReviews(featured);
        setCaseStudyReviews(caseStudies);
      } catch {
        // Sections show empty state when no reviews
      } finally {
        setReviewsLoading(false);
      }
    })();
  }, []);

  const planFeatures = primaryPlan ? parsePlanFeatures(primaryPlan.features) : [];
  const displayFeatures = planFeatures.length > 0
    ? planFeatures.map((text) => ({ icon: CheckCircle, text }))
    : androidFeatures;
  const planPriceLabel = primaryPlan ? formatPlanPrice(primaryPlan) : '$15';
  const planName = primaryPlan?.name ?? t('home.androidPlan');
  const planDescription = primaryPlan?.description ?? t('home.productionAccessGuaranteed');

  return (
    <div className="min-h-screen bg-background text-foreground">
     
      {/* ═══════════════════════════════════════════════════════════════════
          CRO HERO — Primary conversion section (above the fold)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-x-clip border-b border-border/40 hero-y">
        <HeroDecorBackground />
        <CroHero />
      </section>

      <HomeTrustBar />

      {/* ═══════════════════════════════════════════════════════════════════
          PLATFORM OVERVIEW — SEO copy + explainer video (two-column on lg)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-x-hidden border-t border-border/40 bg-muted/25">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Copy */}
            <div className="flex-1 text-center lg:text-left w-full">
              <AnimatedSection>
                <div className="mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <Badge
                    variant="outline"
                    className="border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {t('home.legacyHeroBadge')}
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    {t('home.productionGuarantee')}
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={80}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug mb-4">
                  {t('home.overviewTitlePrefix')}{' '}
                  <span className="text-blue-500 dark:text-blue-400">15</span>{' '}
                  {t('home.overviewTitleTesters')}{' '}
                  <span className="text-muted-foreground font-medium">{t('home.overviewTitleFor')}</span>{' '}
                  <span className="text-blue-500 dark:text-blue-400">16</span>{' '}
                  {t('home.overviewTitleDays')}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={140}>
                <p className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                  {t('home.heroDescription')}{' '}
                  {t('home.heroDescriptionJoin')}
                </p>
              </AnimatedSection>

              {/* Mobile: 2 compact rows — chips, then CTAs + social proof */}
              <AnimatedSection delay={180}>
                <div className="space-y-2.5 sm:space-y-5">
                  {/* Line 1 — fact chips */}
                  <ul className="flex flex-nowrap items-center justify-center lg:justify-start gap-x-0 overflow-x-auto scrollbar-none text-[10px] leading-tight text-foreground/80 sm:flex-wrap sm:gap-2 sm:text-xs sm:leading-normal">
                    {[
                      { icon: Users, label: t('home.overviewChipTesters') },
                      { icon: Clock, label: t('home.overviewChipDays') },
                      { icon: Shield, label: t('home.overviewChipGuarantee') },
                    ].map(({ icon: Icon, label }, index) => (
                      <li key={label} className="inline-flex items-center shrink-0">
                        {index > 0 ? (
                          <span className="mx-1.5 text-muted-foreground/45 sm:hidden" aria-hidden>
                            ·
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1 font-medium sm:gap-1.5 sm:rounded-full sm:border sm:border-border/60 sm:bg-background/70 sm:px-3 sm:py-1.5">
                          <Icon className="hidden h-3.5 w-3.5 text-blue-400 sm:block" aria-hidden />
                          <span className="whitespace-nowrap">{label}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Line 2 — CTAs; trust sits on its own row on mobile */}
                  <div className="flex flex-col items-center lg:items-start gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start sm:gap-3">
                    <div className="flex flex-nowrap items-center justify-center gap-x-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          trackCta('overview_pricing');
                          goToGetStartedPricing(currentPath, navigate);
                        }}
                        className="h-8 shrink-0 border-border/70 bg-background px-2.5 text-[11px] font-semibold hover:bg-muted sm:h-11 sm:px-6 sm:text-sm"
                      >
                        {t('home.seeWhatYouGet')}
                        <ArrowRight className="ms-0.5 h-3 w-3 sm:ms-1 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          trackCta('overview_reviews');
                          navigate('/reviews');
                        }}
                        className="h-8 shrink-0 px-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground sm:h-11 sm:px-4 sm:text-sm"
                      >
                        {t('home.joinDevelopers')}
                        <ChevronRight className="ms-0.5 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                    <p className="inline-flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-blue sm:h-2 sm:w-2" aria-hidden />
                      <span className="whitespace-nowrap">{t('home.developersTrustUs')}</span>
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Explainer video — slightly larger on desktop, still not full-bleed */}
            <AnimatedSection delay={160} className="w-full flex-1 max-w-2xl lg:max-w-none">
              <div className="rounded-2xl border border-border/50 bg-background/60 p-2 sm:p-3 shadow-sm">
                <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t('croHero.videoTitle')}
                  </p>
                  <span className="shrink-0 text-[10px] sm:text-xs text-muted-foreground/80">
                    {t('croHero.videoDuration')}
                  </span>
                </div>
                <HeroVideoEmbed analyticsLocation="overview_video" className="max-w-none" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GLOBAL IMPACT STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 border-t border-border/40 gradient-bg-section overflow-hidden">
        {/* Floating decorative dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-[20%] left-[10%] animate-float" width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="2" fill="rgba(59,130,246,0.1)" /></svg>
          <svg className="absolute top-[60%] right-[8%] animate-float-delay" width="6" height="6" viewBox="0 0 6 6" fill="none"><circle cx="3" cy="3" r="1.5" fill="rgba(59,130,246,0.08)" /></svg>
          <svg className="absolute bottom-[15%] left-[20%] animate-float-slow" width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="2.5" fill="rgba(59,130,246,0.06)" /></svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <AnimatedSection delay={0}>
              <Card className="card-hover glow-blue bg-card/80 border-border/60 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    $15
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{t('home.statPrice')}</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="card-hover glow-blue bg-card/80 border-border/60 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Smartphone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    15
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{t('home.statTesters')}</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Card className="card-hover glow-blue bg-card/80 border-border/60 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Globe className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    16 Days
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{t('home.statCycle')}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          AS SEEN ON / SOCIAL PROOF
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {t('home.socialProofTitle')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('home.socialProofSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6 max-w-xs mx-auto">
              {[
                {
                  nameKey: 'home.socialProofTrustpilot',
                  icon: '/trusted/trustpilot.png',
                  href: 'https://www.trustpilot.com/review/fasttesters.com',
                },
              ].map((brand) => (
                <a
                  key={brand.nameKey}
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-card/60 border-border/40 hover:border-border/80 hover:shadow-md transition-all scale-hover h-full min-h-[120px] sm:min-h-[140px]">
                    <CardContent className="p-5 sm:p-8 flex flex-col items-center justify-center gap-3 sm:gap-4">
                      <Image
                        src={brand.icon}
                        alt={t(brand.nameKey)}
                        width={140}
                        height={140}
                        loading="lazy"
                        sizes="140px"
                        className="h-12 sm:h-16 w-auto max-w-[120px] sm:max-w-[140px] object-contain"
                      />
                      <span className="text-sm sm:text-base font-semibold text-muted-foreground/80 whitespace-nowrap">
                        {t(brand.nameKey)}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 border-t border-border/40 overflow-hidden">
        {/* Side illustration — subtle on mobile, stronger on desktop */}
        <div className="absolute inset-0 sm:inset-auto sm:right-0 sm:top-0 sm:bottom-0 sm:w-2/5 lg:w-1/3 pointer-events-none opacity-[0.05] sm:opacity-[0.06]">
          <Image
            src="/images/illustrations/how-it-works.png"
            alt=""
            fill
            loading="lazy"
            quality={45}
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-contain object-center sm:object-right"
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
                {t('home.howItWorks')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="gradient-text">{t('home.howItWorks')}</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Connector line - horizontal on desktop, vertical on mobile */}
            <div className="absolute top-6 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-0.5 bg-blue-500/20 hidden md:block" />
            <div className="absolute top-6 bottom-6 left-6 w-0.5 bg-blue-500/20 md:hidden" />

            <div className="flex flex-col md:flex-row items-start justify-start md:items-center md:justify-center gap-8 md:gap-0">
              {[
                { num: 1, icon: Upload, titleKey: 'home.step1Title', descKey: 'home.step1Desc' },
                { num: 2, icon: Users, titleKey: 'home.step2Title', descKey: 'home.step2Desc' },
                { num: 3, icon: Clock, titleKey: 'home.step3Title', descKey: 'home.step3Desc' },
                { num: 4, icon: CheckCircle, titleKey: 'home.step4Title', descKey: 'home.step4Desc' },
              ].map((step, idx) => (
                <AnimatedSection key={step.num} delay={idx * 120}>
                  <div className="relative flex md:flex-1 flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 md:px-4">
                    {/* Number badge */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                      {step.num}
                    </div>
                    {/* Subtle floating icon near step */}
                    <svg className="absolute -top-3 -right-2 md:top-[-12px] md:right-[-8px] animate-float opacity-30" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="rgba(59,130,246,0.5)" /></svg>
                    {/* Icon + Text */}
                    <div className="flex flex-col items-start md:items-center md:mt-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 mb-2">
                        <step.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1 text-left md:text-center">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] text-left md:text-center">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST BADGES / CERTIFICATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-muted-foreground">{t('home.trustedCompliance')}</h3>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                { icon: Shield, labelKey: 'home.googlePlayCompliant' },
                { icon: Clock, labelKey: 'home.fourteenDayTesting' },
                { icon: CheckCircle, labelKey: 'home.hundredPercentAccess' },
                { icon: CreditCard, labelKey: 'home.securePaymentsBadge' },
                { icon: MessageSquare, labelKey: 'home.support247' },
                { icon: Shield, labelKey: 'home.moneyBack' },
              ].map((badge, idx) => (
                <div
                  key={badge.labelKey}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <badge.icon className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">{t(badge.labelKey)}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          APP CATEGORIES WE TEST
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
                {t('home.weTestAllApps')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="gradient-text">{t('home.allAndroidCategories')}</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, nameKey: 'home.catProductivity', descKey: 'home.catProductivityDesc' },
              { icon: MessageSquare, nameKey: 'home.catSocial', descKey: 'home.catSocialDesc' },
              { icon: Heart, nameKey: 'home.catHealth', descKey: 'home.catHealthDesc' },
              { icon: GraduationCap, nameKey: 'home.catEducation', descKey: 'home.catEducationDesc' },
              { icon: Gamepad2, nameKey: 'home.catEntertainment', descKey: 'home.catEntertainmentDesc' },
              { icon: Wallet, nameKey: 'home.catFinance', descKey: 'home.catFinanceDesc' },
              { icon: Wrench, nameKey: 'home.catUtilities', descKey: 'home.catUtilitiesDesc' },
              { icon: ShoppingBag, nameKey: 'home.catLifestyle', descKey: 'home.catLifestyleDesc' },
            ].map((cat, idx) => (
              <AnimatedSection key={cat.nameKey} delay={idx * 70}>
                <Card className="card-hover bg-card/80 border-border/60 h-full">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 mb-3">
                      <cat.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{t(cat.nameKey)}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t(cat.descKey)}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Requirement + compare teasers (full pages own the long copy) */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="gradient-text">{t('home.requirementTeaserTitle')}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.requirementTeaserBody')}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={() => navigate('/google-play-12-testers')}>{t('croHero.requirementLink')}</Button>
                <Button variant="outline" onClick={() => navigate('/google-play-14-day-testing')}>{t('croHero.fourteenDayLink')}</Button>
                <Button variant="outline" onClick={() => navigate('/google-play-production-access-12-testers')}>{t('croHero.productionLink')}</Button>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Card className="bg-card/80 border-border/60">
              <CardContent className="p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">{t('home.whyDevelopersChoose')}</h3>
                <p className="text-sm text-muted-foreground mb-5">15 testers · 16 days · $15 one-time · Google decides production access</p>
                <Button onClick={() => { trackCta('home_compare_teaser'); navigate('/compare'); }} className="bg-blue-500 hover:bg-blue-600 text-white">
                  {t('home.compareTeaserCta')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <FullDemoCta trackingId="home_full_demo" />

      {/* ═══════════════════════════════════════════════════════════════════
          DASHBOARD PREVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
                {t('home.liveDashboard')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                Track Your <span className="gradient-text">{t('home.testingProgress')}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t('home.trackDescription')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative">
              {/* Floating particles around dashboard */}
              <div className="absolute -inset-8 pointer-events-none">
                <svg className="absolute top-0 left-[20%] animate-particle" width="6" height="6" viewBox="0 0 6 6" fill="none"><circle cx="3" cy="3" r="2" fill="rgba(59,130,246,0.15)" /></svg>
                <svg className="absolute top-[30%] right-[5%] animate-particle" style={{ animationDelay: '1s' }} width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="2.5" fill="rgba(59,130,246,0.12)" /></svg>
                <svg className="absolute bottom-[10%] left-[8%] animate-particle" style={{ animationDelay: '2s' }} width="5" height="5" viewBox="0 0 5 5" fill="none"><circle cx="2.5" cy="2.5" r="1.5" fill="rgba(59,130,246,0.1)" /></svg>
                <svg className="absolute top-[60%] right-[15%] animate-particle" style={{ animationDelay: '0.5s' }} width="4" height="4" viewBox="0 0 4 4" fill="none"><circle cx="2" cy="2" r="1" fill="rgba(34,211,238,0.12)" /></svg>
              </div>

              {/* Device frame wrapper */}
              <div className="device-frame">
                <Card className="bg-card/90 border-0 max-w-4xl mx-auto overflow-hidden">
                  {/* Browser-like top bar */}
                  <div className="bg-muted/50 px-4 py-2.5 flex items-center gap-2 border-b border-border/40">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground text-center truncate">
                        {APP_HOST}
                      </div>
                    </div>
                  </div>
                  {/* Dashboard Header */}
                  <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                        <Smartphone className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{t('home.myAndroidApp')}</CardTitle>
                        <p className="text-xs text-muted-foreground">com.example.myapp</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse-blue" />
                      <span className="text-xs font-medium text-blue-400">{t('home.activeTesting')}</span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Progress Row */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{t('home.testingProgress')}</span>
                        <span className="text-sm font-semibold text-blue-400">{t('home.dayOf')}</span>
                      </div>
                      <Progress value={dashboardProgress} className="h-3 bg-secondary [&>div]:bg-blue-500" />
                      <p className="text-xs text-muted-foreground mt-1.5">56% {t('home.complete')}</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="rounded-xl bg-background/80 border border-border/40 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-muted-foreground">{t('home.activeTesters')}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">15<span className="text-sm text-muted-foreground font-normal">/15</span></p>
                      </div>
                      <div className="rounded-xl bg-background/80 border border-border/40 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-muted-foreground">{t('home.daysCompleted')}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">9</p>
                      </div>
                      <div className="rounded-xl bg-background/80 border border-border/40 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-muted-foreground">{t('home.reports')}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">2</p>
                      </div>
                      <div className="rounded-xl bg-background/80 border border-border/40 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-muted-foreground">{t('home.status')}</span>
                        </div>
                        <p className="text-lg font-bold text-blue-400">{t('home.onTrack')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={pricingSectionRef as React.RefObject<HTMLElement>}
        className="relative py-16 sm:py-20 border-t border-border/40 gradient-bg-section overflow-hidden"
      >
        {/* Sparkle decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-[15%] left-[8%] animate-sparkle" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0L7.41 4.59L12 6L7.41 7.41L6 12L4.59 7.41L0 6L4.59 4.59L6 0Z" fill="rgba(59,130,246,0.15)" /></svg>
          <svg className="absolute top-[25%] right-[10%] animate-sparkle" style={{ animationDelay: '1s' }} width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="rgba(34,211,238,0.12)" /></svg>
          <svg className="absolute bottom-[20%] left-[15%] animate-sparkle" style={{ animationDelay: '0.5s' }} width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0L4.94 3.06L8 4L4.94 4.94L4 8L3.06 4.94L0 4L3.06 3.06L4 0Z" fill="rgba(59,130,246,0.1)" /></svg>
          <svg className="absolute bottom-[30%] right-[5%] animate-sparkle" style={{ animationDelay: '1.5s' }} width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 0L8.65 5.35L14 7L8.65 8.65L7 14L5.35 8.65L0 7L5.35 5.35L7 0Z" fill="rgba(59,130,246,0.08)" /></svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="relative mx-auto max-w-3xl text-center mb-10 sm:mb-12 rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-500/[0.08] via-card/40 to-transparent px-5 py-8 sm:px-8 sm:py-10 shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              <Badge className="mb-5 border-0 bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25">
                {t('home.simplePricing')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-3 leading-tight tracking-tight">
                <span className="gradient-text">{t('home.onePlanEverythingIncluded')}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                {t('home.noHiddenFees')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-7">
                {[t('home.oneTimePayment'), t('home.startInOneHour'), t('home.realTestersHighlight'), t('home.productionAccessGuarantee')].map((label) => (
                  <Badge
                    key={label}
                    className="inline-flex items-center gap-1.5 border-0 bg-blue-500 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                  >
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-white/90" />
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div id={PRICING_SECTION_ID} className="max-w-lg mx-auto scroll-mt-0">
            {/* Android Plan — Get Started CTAs scroll here, centered in the viewport */}
            <AnimatedSection delay={0}>
              <Card className="card-hover glow-blue bg-card/90 border-blue-500/30 relative overflow-hidden h-full flex flex-col">
                {/* Popular badge */}
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {t('home.popular')}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Smartphone className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{planName}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{planPriceLabel}</span>
                      <span className="text-muted-foreground text-sm">{t('home.perApp')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{planDescription}</p>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {displayFeatures.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        <feature.icon className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/90">
                          {planFeatures.length > 0 ? feature.text : t(feature.text)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mb-4 px-1">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{t('home.securePayments')}</span>
                  </div>

                  <Button
                    onClick={() => { trackCta('pricing_cta'); navigate(APP_URL); }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                  >
                    {t('home.startNow')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          REVIEWS / TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={reviewsSectionRef as React.RefObject<HTMLElement>} className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
                <Star className="h-3.5 w-3.5 mr-1" />
                {t('home.rating')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                {t('home.trustedByDevelopers')}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t('home.helpedDevelopers')}
              </p>
              <div className="mt-6 flex justify-center">
                <TrustpilotWidget className="w-full max-w-md" align="center" />
              </div>
            </div>
          </AnimatedSection>

          {reviewsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
            </div>
          ) : featuredReviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t('reviews.noReviewsYet')}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredReviews.map((review, index) => (
                  <AnimatedSection key={review.id} delay={index * 80}>
                    <ReviewCard review={review} />
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={300}>
                <div className="text-center mt-10">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/reviews')}
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold px-8 h-11"
                  >
                    {t('home.seeMoreReviews')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </AnimatedSection>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SUCCESS STORIES PREVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={caseStudiesSectionRef as React.RefObject<HTMLElement>} className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10">
                <Trophy className="h-3.5 w-3.5 mr-1" />
                {t('home.successStoriesBadge')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="gradient-text">{t('home.successStoriesTitle')}</span>
              </h2>
            </div>
          </AnimatedSection>

          {reviewsLoading ? (
            <div className="flex items-center justify-center py-12 mb-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
            </div>
          ) : caseStudyReviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 mb-8">{t('reviews.noReviewsYet')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {caseStudyReviews.map((review, idx) => (
                <AnimatedSection key={review.id} delay={idx * 100}>
                  <CaseStudyCard
                    review={review}
                    compact
                    readMoreLabel={t('home.successStoriesReadMore')}
                    onReadMore={() => navigate('/case-studies')}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection delay={300}>
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => { trackCta('view_all_stories'); navigate('/case-studies'); }}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold px-8 h-11"
              >
                {t('home.successStoriesViewAll')}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FREE TESTERS COMMUNITY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-t border-border/40 bg-gradient-to-b from-emerald-500/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-card p-8 sm:p-12 lg:p-14">
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 end-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
              </div>
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-start lg:gap-10">
                <div className="mb-6 flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/20 lg:mb-0">
                  <Users className="size-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge
                    variant="outline"
                    className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  >
                    {t('home.communityBadge')}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
                    {t('home.communityTitle')}
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-3">
                    {t('home.communityDescription')}
                  </p>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 font-medium">
                    {t('home.communityNote')}
                  </p>
                </div>
                <div className="mt-8 shrink-0 lg:mt-0">
                  <Button
                    size="lg"
                    onClick={() => {
                      trackCta('community_join');
                      navigate('/free-testers');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 h-12 shadow-lg shadow-emerald-500/20"
                  >
                    {t('home.communityCta')}
                    <ExternalLink className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <HomeFaqSection />

      {/* ═══════════════════════════════════════════════════════════════════
          NEWSLETTER SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="scale-in">
            <NewsletterSection wide className="w-full" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="scale-in">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card border border-blue-500/20 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
              {/* Background illustration — visible on mobile at lower opacity */}
              <div className="absolute end-0 bottom-0 w-1/2 sm:w-2/5 lg:w-1/3 h-full pointer-events-none opacity-[0.06] sm:opacity-[0.07] lg:opacity-[0.08]">
                <Image
                  src="/images/illustrations/success-approved.png"
                  alt=""
                  fill
                  loading="lazy"
                  quality={45}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-contain object-right-bottom"
                  aria-hidden="true"
                />
              </div>

              {/* Background glow */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse-blue" />
                <span className="text-sm font-medium text-blue-400">{t('home.availableNow')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('home.readyForAccess')}
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
                {t('home.joinThousands')}{' '}{t('home.ourProfessionalTesters')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => { trackCta('bottom_cta'); goToGetStartedPricing(currentPath, navigate); }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base px-8 h-12 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                >
                  {t('home.startTestingNow')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/how-it-works')}
                  className="border-border/60 text-foreground hover:bg-muted font-semibold text-base px-8 h-12"
                >
                  {t('home.learnHowItWorks')}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
