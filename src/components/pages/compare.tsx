'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { PageFaqSection } from '@/components/page-faq-section';
import { AiEntityDefinition } from '@/components/ai-citation-summary';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  XCircle,
  Minus,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Globe,
  BarChart3,
  MessageSquare,
  Headphones,
  Trophy,
  Calculator,
  Quote,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Timer,
  UserCheck,
  FileText,
  Languages,
  LayoutDashboard,
  Bell,
  Award,
} from 'lucide-react';

// ──────────────────────────────────────────────
// Data structures
// ──────────────────────────────────────────────

type CellValue = { type: 'check' } | { type: 'x' } | { type: 'minus' } | { type: 'text'; key: string };

interface ComparisonRow {
  featureKey: string;
  icon: React.ComponentType<{ className?: string }>;
  ft: CellValue;
  manual: CellValue;
  freelance: CellValue;
  other: CellValue;
}

const comparisonRows: ComparisonRow[] = [
  {
    featureKey: 'compare.compTesterTime',
    icon: Timer,
    ft: { type: 'text', key: 'compare.compTesterTimeFT' },
    manual: { type: 'text', key: 'compare.compTesterTimeManual' },
    freelance: { type: 'text', key: 'compare.compTesterTimeFreelance' },
    other: { type: 'text', key: 'compare.compTesterTimeOther' },
  },
  {
    featureKey: 'compare.compNumTesters',
    icon: Users,
    ft: { type: 'text', key: 'compare.compNumTestersFT' },
    manual: { type: 'text', key: 'compare.compNumTestersManual' },
    freelance: { type: 'text', key: 'compare.compNumTestersFreelance' },
    other: { type: 'text', key: 'compare.compNumTestersOther' },
  },
  {
    featureKey: 'compare.compTestingPeriod',
    icon: Clock,
    ft: { type: 'text', key: 'compare.compTestingPeriodFT' },
    manual: { type: 'text', key: 'compare.compTestingPeriodManual' },
    freelance: { type: 'text', key: 'compare.compTestingPeriodFreelance' },
    other: { type: 'text', key: 'compare.compTestingPeriodOther' },
  },
  {
    featureKey: 'compare.compProductionAccess',
    icon: Shield,
    ft: { type: 'text', key: 'compare.compProductionAccessFT' },
    manual: { type: 'text', key: 'compare.compProductionAccessManual' },
    freelance: { type: 'text', key: 'compare.compProductionAccessFreelance' },
    other: { type: 'text', key: 'compare.compProductionAccessOther' },
  },
  {
    featureKey: 'compare.compReports',
    icon: FileText,
    ft: { type: 'text', key: 'compare.compReportsFT' },
    manual: { type: 'text', key: 'compare.compReportsManual' },
    freelance: { type: 'text', key: 'compare.compReportsFreelance' },
    other: { type: 'text', key: 'compare.compReportsOther' },
  },
  {
    featureKey: 'compare.compSupport',
    icon: Headphones,
    ft: { type: 'text', key: 'compare.compSupportFT' },
    manual: { type: 'x' },
    freelance: { type: 'text', key: 'compare.compSupportFreelance' },
    other: { type: 'text', key: 'compare.compSupportOther' },
  },
  {
    featureKey: 'compare.compPrice',
    icon: DollarSign,
    ft: { type: 'text', key: 'compare.compPriceFT' },
    manual: { type: 'text', key: 'compare.compPriceManual' },
    freelance: { type: 'text', key: 'compare.compPriceFreelance' },
    other: { type: 'text', key: 'compare.compPriceOther' },
  },
  {
    featureKey: 'compare.compMoneyBack',
    icon: Shield,
    ft: { type: 'check' },
    manual: { type: 'x' },
    freelance: { type: 'x' },
    other: { type: 'x' },
  },
  {
    featureKey: 'compare.compTesterQuality',
    icon: UserCheck,
    ft: { type: 'text', key: 'compare.compTesterQualityFT' },
    manual: { type: 'text', key: 'compare.compTesterQualityManual' },
    freelance: { type: 'text', key: 'compare.compTesterQualityFreelance' },
    other: { type: 'text', key: 'compare.compTesterQualityOther' },
  },
  {
    featureKey: 'compare.compLanguages',
    icon: Languages,
    ft: { type: 'text', key: 'compare.compLanguagesFT' },
    manual: { type: 'text', key: 'compare.compLanguagesManual' },
    freelance: { type: 'text', key: 'compare.compLanguagesFreelance' },
    other: { type: 'text', key: 'compare.compLanguagesOther' },
  },
  {
    featureKey: 'compare.compDashboard',
    icon: LayoutDashboard,
    ft: { type: 'check' },
    manual: { type: 'x' },
    freelance: { type: 'x' },
    other: { type: 'x' },
  },
  {
    featureKey: 'compare.compRealTimeUpdates',
    icon: Bell,
    ft: { type: 'check' },
    manual: { type: 'x' },
    freelance: { type: 'x' },
    other: { type: 'x' },
  },
];

const overviewCards = [
  {
    titleKey: 'compare.overviewFTTitle',
    descKey: 'compare.overviewFTDesc',
    icon: Zap,
    isHighlighted: true,
  },
  {
    titleKey: 'compare.overviewManualTitle',
    descKey: 'compare.overviewManualDesc',
    icon: Users,
    isHighlighted: false,
  },
  {
    titleKey: 'compare.overviewFreelanceTitle',
    descKey: 'compare.overviewFreelanceDesc',
    icon: MessageSquare,
    isHighlighted: false,
  },
  {
    titleKey: 'compare.overviewOtherTitle',
    descKey: 'compare.overviewOtherDesc',
    icon: Globe,
    isHighlighted: false,
  },
];

const advantages = [
  {
    titleKey: 'compare.adv1Title',
    descKey: 'compare.adv1Desc',
    icon: Timer,
  },
  {
    titleKey: 'compare.adv2Title',
    descKey: 'compare.adv2Desc',
    icon: Shield,
  },
  {
    titleKey: 'compare.adv3Title',
    descKey: 'compare.adv3Desc',
    icon: DollarSign,
  },
  {
    titleKey: 'compare.adv4Title',
    descKey: 'compare.adv4Desc',
    icon: BarChart3,
  },
  {
    titleKey: 'compare.adv5Title',
    descKey: 'compare.adv5Desc',
    icon: Headphones,
  },
  {
    titleKey: 'compare.adv6Title',
    descKey: 'compare.adv6Desc',
    icon: Award,
  },
];

const costItems = [
  {
    labelKey: 'compare.costItemService',
    ftKey: 'compare.costItemServiceFT',
    manualKey: 'compare.costItemServiceManual',
    freelanceKey: 'compare.costItemServiceFreelance',
    otherKey: 'compare.costItemServiceOther',
  },
  {
    labelKey: 'compare.costItemTime',
    ftKey: 'compare.costItemTimeFT',
    manualKey: 'compare.costItemTimeManual',
    freelanceKey: 'compare.costItemTimeFreelance',
    otherKey: 'compare.costItemTimeOther',
  },
  {
    labelKey: 'compare.costItemCoordination',
    ftKey: 'compare.costItemCoordinationFT',
    manualKey: 'compare.costItemCoordinationManual',
    freelanceKey: 'compare.costItemCoordinationFreelance',
    otherKey: 'compare.costItemCoordinationOther',
  },
  {
    labelKey: 'compare.costItemRisk',
    ftKey: 'compare.costItemRiskFT',
    manualKey: 'compare.costItemRiskManual',
    freelanceKey: 'compare.costItemRiskFreelance',
    otherKey: 'compare.costItemRiskOther',
  },
];

const testimonials = [
  {
    quoteKey: 'compare.testimonial1Quote',
    nameKey: 'compare.testimonial1Name',
    roleKey: 'compare.testimonial1Role',
    rating: 5,
  },
  {
    quoteKey: 'compare.testimonial2Quote',
    nameKey: 'compare.testimonial2Name',
    roleKey: 'compare.testimonial2Role',
    rating: 5,
  },
  {
    quoteKey: 'compare.testimonial3Quote',
    nameKey: 'compare.testimonial3Name',
    roleKey: 'compare.testimonial3Role',
    rating: 5,
  },
];

// ──────────────────────────────────────────────
// Cell renderer
// ──────────────────────────────────────────────

function CellRenderer({ cell, t, isFT }: { cell: CellValue; t: (k: string) => string; isFT: boolean }) {
  const baseClass = 'flex items-center justify-center gap-1.5 text-sm';
  if (cell.type === 'check') {
    return (
      <span className={baseClass}>
        <CheckCircle2 className={`h-5 w-5 ${isFT ? 'text-blue-400' : 'text-green-400'} shrink-0`} />
      </span>
    );
  }
  if (cell.type === 'x') {
    return (
      <span className={baseClass}>
        <XCircle className="h-5 w-5 text-red-400/60 shrink-0" />
      </span>
    );
  }
  if (cell.type === 'minus') {
    return (
      <span className={baseClass}>
        <Minus className="h-5 w-5 text-yellow-400 shrink-0" />
      </span>
    );
  }
  return (
    <span className={`${baseClass} font-medium ${isFT ? 'text-blue-400' : 'text-muted-foreground'}`}>
      {t(cell.key)}
    </span>
  );
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

export default function ComparePage() {
  const { navigate, currentPath } = useRouter();
  const { t } = useLanguage();
  const { trackCta } = useAnalytics();
  const [expandedCost, setExpandedCost] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {t('compare.badge')}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('compare.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t('compare.subtitle')}
          </p>

          {/* Quick Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">15</p>
                <p className="text-xs text-muted-foreground">{t('compare.statSuccessRate')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">Instant</p>
                <p className="text-xs text-muted-foreground">{t('compare.statAssignment')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                <DollarSign className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">$15</p>
                <p className="text-xs text-muted-foreground">{t('compare.statOneTime')}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => { trackCta('compare_hero_cta'); goToGetStartedPricing(currentPath, navigate); }}
              size="lg"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 px-8 shadow-lg shadow-blue-500/25"
            >
              {t('compare.ctaButton')}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => { trackCta('compare_hero_how'); navigate('/how-it-works'); }}
              className="w-full sm:w-auto border-border/60 h-12 px-8 font-semibold"
            >
              {t('compare.ctaSecondary')}
            </Button>
          </div>
          <div className="mt-8 mx-auto max-w-2xl">
            <AiEntityDefinition />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OVERVIEW CARDS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
              <Target className="h-3.5 w-3.5 mr-1.5" />
              {t('compare.overviewBadge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('compare.overviewTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('compare.overviewSubtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.titleKey}
                  className={`relative border backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1 ${
                    card.isHighlighted
                      ? 'border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/5 via-card/80 to-blue-500/10 shadow-lg shadow-blue-500/10'
                      : 'border-border bg-card/50 hover:border-blue-400/20'
                  }`}
                >
                  {card.isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold border-0 shadow-lg shadow-blue-500/25">
                        {t('compare.recommended')}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2 pt-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
                      card.isHighlighted ? 'bg-blue-500/15' : 'bg-muted'
                    }`}>
                      <Icon className={`h-6 w-6 ${card.isHighlighted ? 'text-blue-400' : 'text-muted-foreground'}`} />
                    </div>
                    <CardTitle className={`text-lg ${card.isHighlighted ? 'text-blue-400' : 'text-foreground'}`}>
                      {t(card.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {t(card.descKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/free-testers" className="text-blue-600 hover:underline dark:text-blue-400">
              {t('compare.freeTestersLink')}
            </Link>
            {' · '}
            <Link href="/blog/fast-testers-vs-facebook-groups" className="text-blue-600 hover:underline dark:text-blue-400">
              {t('compare.vsFacebook')}
            </Link>
            {' · '}
            <Link href="/blog/fast-testers-vs-telegram-communities" className="text-blue-600 hover:underline dark:text-blue-400">
              {t('compare.vsTelegram')}
            </Link>
            {' · '}
            <Link href="/blog/fast-testers-vs-reddit-testers" className="text-blue-600 hover:underline dark:text-blue-400">
              {t('compare.vsReddit')}
            </Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DETAILED COMPARISON TABLE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              {t('compare.tableBadge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('compare.tableTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('compare.tableSubtitle')}
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Card className="bg-card/80 border-border/60 overflow-hidden min-w-[760px]">
              <CardContent className="p-0">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground w-[22%]">
                        {t('compare.colFeature')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-blue-400 bg-blue-500/10 w-[19.5%]">
                        {t('compare.colFastTesters')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19.5%]">
                        {t('compare.colManual')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19.5%]">
                        {t('compare.colFreelance')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19.5%]">
                        {t('compare.colOther')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => {
                      const Icon = row.icon;
                      return (
                        <tr key={row.featureKey} className={`${idx % 2 === 0 ? 'bg-background/40' : ''} hover:bg-blue-500/5 transition-colors`}>
                          <td className="py-3.5 px-4 text-sm font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                              {t(row.featureKey)}
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-center bg-blue-500/5">
                            <CellRenderer cell={row.ft} t={t} isFT />
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <CellRenderer cell={row.manual} t={t} isFT={false} />
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <CellRenderer cell={row.freelance} t={t} isFT={false} />
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <CellRenderer cell={row.other} t={t} isFT={false} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row) => {
              const Icon = row.icon;
              return (
                <Card key={row.featureKey} className="bg-card/80 border-border/60">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-blue-400 shrink-0" />
                      {t(row.featureKey)}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-blue-500/10 px-3 py-2">
                        <span className="text-xs font-medium text-blue-400">{t('compare.colFastTesters')}</span>
                        <CellRenderer cell={row.ft} t={t} isFT />
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('compare.colManual')}</span>
                        <CellRenderer cell={row.manual} t={t} isFT={false} />
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('compare.colFreelance')}</span>
                        <CellRenderer cell={row.freelance} t={t} isFT={false} />
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">{t('compare.colOther')}</span>
                        <CellRenderer cell={row.other} t={t} isFT={false} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY FAST TESTERS WINS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
              <Trophy className="h-3.5 w-3.5 mr-1.5" />
              {t('compare.whyWinsBadge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('compare.whyWinsTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('compare.whyWinsSubtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <Card
                  key={adv.titleKey}
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h3 className="text-base font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                            {t(adv.titleKey)}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(adv.descKey)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COST CALCULATOR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
              <Calculator className="h-3.5 w-3.5 mr-1.5" />
              {t('compare.costBadge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('compare.costTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('compare.costSubtitle')}
            </p>
          </div>

          {/* Desktop Cost Table */}
          <div className="hidden md:block">
            <Card className="bg-card/80 border-border/60 overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground w-[24%]">
                        {t('compare.costColItem')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-blue-400 bg-blue-500/10 w-[19%]">
                        {t('compare.colFastTesters')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19%]">
                        {t('compare.colManual')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19%]">
                        {t('compare.colFreelance')}
                      </th>
                      <th className="text-center py-4 px-3 text-sm font-semibold text-muted-foreground w-[19%]">
                        {t('compare.colOther')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {costItems.map((item, idx) => (
                      <tr key={item.labelKey} className={`${idx % 2 === 0 ? 'bg-background/40' : ''}`}>
                        <td className="py-3.5 px-4 text-sm font-medium text-foreground">{t(item.labelKey)}</td>
                        <td className="py-3.5 px-3 text-center bg-blue-500/5">
                          <span className="text-sm font-semibold text-blue-400">{t(item.ftKey)}</span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="text-sm text-muted-foreground">{t(item.manualKey)}</span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="text-sm text-muted-foreground">{t(item.freelanceKey)}</span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="text-sm text-muted-foreground">{t(item.otherKey)}</span>
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="border-t-2 border-border bg-card">
                      <td className="py-4 px-4 text-sm font-bold text-foreground">{t('compare.costTotal')}</td>
                      <td className="py-4 px-3 text-center bg-blue-500/10">
                        <span className="text-lg font-bold text-blue-400">{t('compare.costTotalFT')}</span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span className="text-sm font-semibold text-red-400">{t('compare.costTotalManual')}</span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span className="text-sm font-semibold text-red-400">{t('compare.costTotalFreelance')}</span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span className="text-sm font-semibold text-yellow-500">{t('compare.costTotalOther')}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Cost Cards */}
          <div className="md:hidden space-y-3">
            {costItems.map((item) => (
              <Card key={item.labelKey} className="bg-card/80 border-border/60">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">{t(item.labelKey)}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-blue-500/10 px-3 py-2">
                      <span className="text-xs font-medium text-blue-400">{t('compare.colFastTesters')}</span>
                      <span className="text-sm font-semibold text-blue-400">{t(item.ftKey)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                      <span className="text-xs font-medium text-muted-foreground">{t('compare.colManual')}</span>
                      <span className="text-sm text-muted-foreground">{t(item.manualKey)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                      <span className="text-xs font-medium text-muted-foreground">{t('compare.colFreelance')}</span>
                      <span className="text-sm text-muted-foreground">{t(item.freelanceKey)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                      <span className="text-xs font-medium text-muted-foreground">{t('compare.colOther')}</span>
                      <span className="text-sm text-muted-foreground">{t(item.otherKey)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Mobile Total Card */}
            <Card className="border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
              <CardContent className="p-4">
                <h4 className="text-sm font-bold text-foreground mb-3">{t('compare.costTotal')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-blue-500/15 px-3 py-2">
                    <span className="text-xs font-medium text-blue-400">{t('compare.colFastTesters')}</span>
                    <span className="text-lg font-bold text-blue-400">{t('compare.costTotalFT')}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">{t('compare.colManual')}</span>
                    <span className="text-sm font-semibold text-red-400">{t('compare.costTotalManual')}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">{t('compare.colFreelance')}</span>
                    <span className="text-sm font-semibold text-red-400">{t('compare.costTotalFreelance')}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">{t('compare.colOther')}</span>
                    <span className="text-sm font-semibold text-yellow-500">{t('compare.costTotalOther')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Savings callout */}
          <div className="mt-8 text-center">
            <Card className="inline-block border-green-500/30 bg-green-500/5">
              <CardContent className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {t('compare.savingsCallout')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm">
              <Quote className="h-3.5 w-3.5 mr-1.5" />
              {t('compare.testimonialsBadge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('compare.testimonialsTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('compare.testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.quoteKey}
                className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-blue-400/20 mb-4" />
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t(testimonial.quoteKey)}&rdquo;
                  </p>
                  <Separator className="bg-border/60 mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                        {t(testimonial.nameKey)}
                      </p>
                      <p className="text-xs text-muted-foreground">{t(testimonial.roleKey)}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PageFaqSection
        keyPrefix="compare.faq"
        count={6}
        titleKey="compare.faqTitle"
        subtitleKey="compare.faqSubtitle"
        badgeKey="compare.faqBadge"
        trackingPrefix="compare-faq"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <CardContent className="relative p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('compare.ctaTitle')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('compare.ctaDescription')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => { trackCta('compare_get_started'); goToGetStartedPricing(currentPath, navigate); }}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer w-full sm:w-auto"
                >
                  {t('compare.ctaButton')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => { trackCta('compare_how_it_works'); navigate('/how-it-works'); }}
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-blue-500/10 font-semibold px-8 py-6 text-base rounded-xl cursor-pointer w-full sm:w-auto"
                >
                  {t('compare.ctaSecondary')}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span>{t('compare.ctaGuarantee')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-blue-400" />
                  <span>{t('compare.ctaMoneyBack')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>{t('compare.ctaSixHours')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
