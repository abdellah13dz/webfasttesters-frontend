'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { usePricingPlans } from '@/lib/hooks/use-pricing-plans';
import { formatPlanPrice, parsePlanFeatures } from '@/lib/pricing';
import { StripePoweredBadge } from '@/components/stripe-powered-badge';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Check,
  ArrowRight,
  Star,
  Smartphone,
  Shield,
  Zap,
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Building2,
  Phone,
  UserCheck,
  FileText,
  Settings,
  Code,
  Sparkles,
} from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const androidFeatureKeys = [
  'pricing.featureProfessionals',
  'pricing.featureGuarantee',
  'pricing.featureFastest',
  'pricing.featureReports',
  'pricing.featurePeriod',
  'pricing.featureSupport',
];

const faqItemKeys = [
  {
    questionKey: 'pricing.faq1Q',
    answerKey: 'pricing.faq1A',
  },
  {
    questionKey: 'pricing.faq2Q',
    answerKey: 'pricing.faq2A',
  },
  {
    questionKey: 'pricing.faq3Q',
    answerKey: 'pricing.faq3A',
  },
];

const comparisonRows = [
  {
    featureKey: 'pricing.compCost',
    ftKey: 'pricing.compCostFT',
    freelanceKey: 'pricing.compCostFreelance',
    otherKey: 'pricing.compCostOther',
    diyKey: 'pricing.compCostDiy',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
  },
  {
    featureKey: 'pricing.compTime',
    ftKey: 'pricing.compTimeFT',
    freelanceKey: 'pricing.compTimeFreelance',
    otherKey: 'pricing.compTimeOther',
    diyKey: 'pricing.compTimeDiy',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
  },
  {
    featureKey: 'pricing.compGuaranteed',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
    isYesNo: true,
  },
  {
    featureKey: 'pricing.compTesters',
    ftKey: 'pricing.compTestersFT',
    freelanceKey: 'pricing.compTestersFreelance',
    otherKey: 'pricing.compTestersOther',
    diyKey: 'pricing.compTestersDiy',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
  },
  {
    featureKey: 'pricing.compReports',
    ftKey: 'pricing.compReportsFT',
    freelanceKey: 'pricing.compReportsFreelance',
    otherKey: 'pricing.compReportsOther',
    diyKey: 'pricing.compReportsDiy',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
  },
  {
    featureKey: 'pricing.compMoneyBack',
    ftPositive: true,
    freelancePositive: false,
    otherPositive: false,
    diyPositive: false,
    isYesNo: true,
  },
];

const enterpriseFeatureKeys = [
  { key: 'pricing.entVolumeDiscount', icon: Building2 },
  { key: 'pricing.entDedicatedManager', icon: UserCheck },
  { key: 'pricing.entPriorityAssignment', icon: Clock },
  { key: 'pricing.entCustomPlans', icon: Settings },
  { key: 'pricing.entApiIntegration', icon: Code },
];

export default function Pricing() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const { trackCta } = useAnalytics();
  const { primaryPlan } = usePricingPlans();

  const planFeatures = primaryPlan ? parsePlanFeatures(primaryPlan.features) : [];
  const featureItems = planFeatures.length > 0
    ? planFeatures
    : androidFeatureKeys.map((key) => t(key));
  const planPriceLabel = primaryPlan ? formatPlanPrice(primaryPlan) : '$15';
  const planTitle = primaryPlan?.name ?? t('pricing.androidApps');
  const planSubtitle = primaryPlan?.description ?? t('pricing.fastestWay');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        {/* Floating decorative elements */}
        <div className="absolute top-24 left-[8%] w-3 h-3 rounded-full bg-blue-400/20 animate-float" />
        <div className="absolute top-16 right-[12%] w-2 h-2 rounded-full bg-cyan-400/20 animate-float-slow" />
        <div className="absolute bottom-20 left-[30%] w-2 h-2 rounded-full bg-blue-400/15 animate-float-delay" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <AnimatedSection>
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              {t('pricing.badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('pricing.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t('pricing.subtitle')}
            </p>

            {/* Google Play Rating */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-foreground font-semibold text-lg">4.6</span>
              <span className="text-muted-foreground text-sm">{t('pricing.onGooglePlayStore')}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative mx-auto w-full px-4 sm:px-6 py-16 gradient-bg-section">
        <div className="max-w-lg mx-auto relative">
          {/* Sparkle decorations */}
          <div className="absolute -top-6 -left-8 text-blue-400/40 animate-sparkle">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute -top-2 -right-6 text-cyan-400/30 animate-sparkle-delayed">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="absolute -bottom-4 right-0 text-blue-400/25 animate-sparkle">
            <Sparkles className="h-4 w-4" />
          </div>

          <AnimatedSection delay={200}>
            {/* Android Apps Card */}
            <Card className="relative overflow-hidden border-2 border-blue-400/40 bg-card/50 backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300 hover-scale gradient-border">
              {/* Gradient border glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-50 pointer-events-none" />

              {/* Most Popular Badge */}
              <div className="mt-2 items-center justify-center mx-auto">
                <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-semibold border-0 shadow-lg shadow-blue-500/25">
                  {t('pricing.mostPopular')}
                </Badge>
              </div>
              <CardHeader className="relative pb-0 pt-8 z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-400/10">
                    <Smartphone className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {planTitle}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground text-sm">
                  {planSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-6 z-10">
                {/* Price with glow */}
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-400/15 blur-xl rounded-full scale-150" />
                    <div className="relative flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">{planPriceLabel}</span>
                      <span className="text-muted-foreground text-sm">{t('pricing.perOneTime')}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('pricing.noSubscriptions')}
                  </p>
                </div>

                <Separator className="bg-muted mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {featureItems.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Secure Payment */}
                <div className="flex flex-col gap-2 mb-6 text-muted-foreground text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{t('home.securePayments')}</span>
                  </div>
                  <StripePoweredBadge label={t('legal.poweredByStripe')} />
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => { trackCta('pricing_get_started'); navigate(APP_URL); }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 text-base rounded-xl cursor-pointer"
                >
                  {t('pricing.getStartedNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* VALUE COMPARISON SECTION */}
      <AnimatedSection>
        <section className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
                {t('pricing.valueComparison')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {t('pricing.seeHowMuchSave')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('pricing.comparisonSubtitle')}
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Card className="bg-card/80 border-border/60 overflow-hidden">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground"></th>
                        <th className="text-center py-4 px-3 text-sm font-semibold text-blue-400 bg-blue-500/10">{t('pricing.fastTestersCol')}</th>
                        <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground">{t('pricing.freelanceCol')}</th>
                        <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground">{t('pricing.otherServicesCol')}</th>
                        <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground">{t('pricing.diyCol')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, idx) => (
                        <tr key={row.featureKey} className={idx % 2 === 0 ? 'bg-background/40' : ''}>
                          <td className="py-3.5 px-4 text-sm font-medium text-foreground">{t(row.featureKey)}</td>
                          <td className="py-3.5 px-3 text-center bg-blue-500/5">
                            <span className="text-sm font-semibold text-blue-400 flex items-center justify-center gap-1.5">
                              {row.isYesNo && row.ftPositive && <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />}
                              {row.isYesNo && !row.ftPositive && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                              {!row.isYesNo && row.ftPositive && <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
                              {!row.isYesNo && t(row.ftKey!)}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                              {row.isYesNo && row.freelancePositive && <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />}
                              {row.isYesNo && !row.freelancePositive && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                              {!row.isYesNo && t(row.freelanceKey!)}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                              {row.isYesNo && row.otherPositive && <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />}
                              {row.isYesNo && !row.otherPositive && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                              {!row.isYesNo && t(row.otherKey!)}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                              {row.isYesNo && row.diyPositive && <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />}
                              {row.isYesNo && !row.diyPositive && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                              {!row.isYesNo && t(row.diyKey!)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {comparisonRows.map((row) => (
                <Card key={row.featureKey} className="bg-card/80 border-border/60">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3">{t(row.featureKey)}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-blue-500/10 px-3 py-2">
                        <span className="text-xs font-medium text-blue-400">{t('pricing.fastTestersCol')}</span>
                        <span className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                          {row.isYesNo ? (
                            row.ftPositive ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <XCircle className="h-3.5 w-3.5 text-red-400" />
                          ) : t(row.ftKey!)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('pricing.freelanceCol')}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          {row.isYesNo ? (
                            row.freelancePositive ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <XCircle className="h-3.5 w-3.5 text-red-400" />
                          ) : t(row.freelanceKey!)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('pricing.otherServicesCol')}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          {row.isYesNo ? (
                            row.otherPositive ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <XCircle className="h-3.5 w-3.5 text-red-400" />
                          ) : t(row.otherKey!)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('pricing.diyCol')}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          {row.isYesNo ? (
                            row.diyPositive ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <XCircle className="h-3.5 w-3.5 text-red-400" />
                          ) : t(row.diyKey!)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">
                {t('pricing.faqTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('pricing.faqSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqItemKeys.map((faq, index) => (
              <AnimatedSection key={faq.questionKey} delay={index * 100}>
                <Card
                  className="border border-border bg-card/50 hover:border-blue-400/20 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-foreground font-semibold mb-2">
                      {t(faq.questionKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(faq.answerKey)}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE SECTION */}
      <AnimatedSection>
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
            <Card className="relative overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-card/80 to-blue-500/10 backdrop-blur-sm">
              {/* Gradient border glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/20 opacity-30 pointer-events-none" />

              <CardContent className="relative p-6 sm:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Text content */}
                  <div>
                    <Badge variant="outline" className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm">
                      <Building2 className="h-3.5 w-3.5 mr-1.5" />
                      {t('pricing.enterprise')}
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      {t('pricing.multipleApps')}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t('pricing.enterpriseDesc')}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-3 mb-8">
                      {enterpriseFeatureKeys.map(({ key, icon: Icon }) => (
                        <li key={key} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 shrink-0">
                            <Icon className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-foreground/80 text-sm">{t(key)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => { trackCta('pricing_enterprise_contact'); navigate('/contact-us'); }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      {t('pricing.contactSales')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  {/* Right side - Visual emphasis */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-xl" />
                      <div className="relative bg-card/80 border border-border/60 rounded-2xl p-8 space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                            <Building2 className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{t('pricing.enterprise')}</p>
                            <p className="text-xs text-muted-foreground">{t('pricing.enterpriseDesc').slice(0, 40)}...</p>
                          </div>
                        </div>
                        <Separator className="bg-border/60" />
                        <div className="space-y-3">
                          {['5+ apps', 'Dedicated manager', 'Priority testing'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0" />
                              <span className="text-sm text-foreground/80">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2">
                          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-medium bg-blue-500/10 px-3 py-1.5 rounded-full">
                            <Zap className="h-3 w-3" />
                            Custom pricing
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Bottom CTA */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-8 flex justify-center">
            <TrustpilotWidget className="w-full max-w-md" />
          </div>
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('pricing.readyForAccess')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('pricing.ctaDescription')}
              </p>
              <Button
                onClick={() => { trackCta('pricing_bottom_cta'); navigate(APP_URL); }}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
              >
                {t('pricing.startJourney')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </div>
  );
}
