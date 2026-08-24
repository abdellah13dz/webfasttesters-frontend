'use client';

import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Handshake,
  Building2,
  Users,
  ArrowRight,
  Star,
  Mail,
  Gift,
  Package,
  MessageSquare,
} from 'lucide-react';

const audienceCards = [
  {
    nameKey: 'partners.partner1Name',
    descriptionKey: 'partners.partner1Description',
    categoryKey: 'partners.partner1Category',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    nameKey: 'partners.partner2Name',
    descriptionKey: 'partners.partner2Description',
    categoryKey: 'partners.partner2Category',
    icon: Handshake,
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    nameKey: 'partners.partner3Name',
    descriptionKey: 'partners.partner3Description',
    categoryKey: 'partners.partner3Category',
    icon: Package,
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    nameKey: 'partners.partner5Name',
    descriptionKey: 'partners.partner5Description',
    categoryKey: 'partners.partner5Category',
    icon: Gift,
    gradient: 'from-indigo-500 to-blue-600',
  },
];

const benefits = [
  {
    titleKey: 'partners.benefitRevenue',
    descriptionKey: 'partners.benefitRevenueDesc',
    icon: Gift,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    titleKey: 'partners.benefitCoMarketing',
    descriptionKey: 'partners.benefitCoMarketingDesc',
    icon: Users,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    titleKey: 'partners.benefitPrioritySupport',
    descriptionKey: 'partners.benefitPrioritySupportDesc',
    icon: MessageSquare,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    titleKey: 'partners.benefitApiAccess',
    descriptionKey: 'partners.benefitApiAccessDesc',
    icon: Star,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
];

export default function PartnersPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Handshake className="h-4 w-4 mr-1.5" />
            {t('partners.heroBadge')}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('partners.heroTitlePrefix')}{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('partners.heroTitleHighlight')}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t('partners.heroDescription')}
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-6 border-cyan-400/30 text-cyan-400 bg-cyan-400/10 px-4 py-1.5 text-sm"
            >
              <Building2 className="h-4 w-4 mr-1.5" />
              {t('partners.techPartnersBadge')}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t('partners.techPartnersTitle')}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t('partners.techPartnersSubtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.nameKey}
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors truncate">
                          {t(card.nameKey)}
                        </h3>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {t(card.categoryKey)}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(card.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Star className="h-4 w-4 mr-1.5" />
            {t('partners.becomePartnerBadge')}
          </Badge>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t('partners.becomePartnerTitle')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('partners.becomePartnerSubtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.titleKey}
                className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl ${benefit.bg} shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                        {t(benefit.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 backdrop-blur-sm overflow-hidden relative">
            <CardContent className="p-8 sm:p-12 text-center relative">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-400/10">
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                {t('partners.ctaTitle')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('partners.ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/contact-us')}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                >
                  {t('partners.ctaGetInTouch')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                  onClick={() => navigate('/app-testing-referral-program')}
                >
                  {t('partners.ctaViewTiers')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
