'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Gavel,
  DollarSign,
  CreditCard,
  UserCheck,
  Ban,
  Settings,
  AlertOctagon,
  Mail,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';

const sectionConfig: {
  icon: LucideIcon;
  titleKey: string;
  paragraphKeys?: string[];
  introKey?: string;
  itemKeys?: string[];
}[] = [
  {
    icon: Gavel,
    titleKey: 'referralPolicyPage.sections.binding.title',
    paragraphKeys: [
      'referralPolicyPage.sections.binding.p1',
      'referralPolicyPage.sections.binding.p2',
    ],
  },
  {
    icon: DollarSign,
    titleKey: 'referralPolicyPage.sections.commission.title',
    paragraphKeys: [
      'referralPolicyPage.sections.commission.p1',
      'referralPolicyPage.sections.commission.p2',
      'referralPolicyPage.sections.commission.p3',
      'referralPolicyPage.sections.commission.p4',
      'referralPolicyPage.sections.commission.p5',
    ],
  },
  {
    icon: CreditCard,
    titleKey: 'referralPolicyPage.sections.payout.title',
    paragraphKeys: [
      'referralPolicyPage.sections.payout.p1',
      'referralPolicyPage.sections.payout.p2',
      'referralPolicyPage.sections.payout.p3',
      'referralPolicyPage.sections.payout.p4',
      'referralPolicyPage.sections.payout.p5',
    ],
  },
  {
    icon: UserCheck,
    titleKey: 'referralPolicyPage.sections.eligibility.title',
    paragraphKeys: [
      'referralPolicyPage.sections.eligibility.p1',
      'referralPolicyPage.sections.eligibility.p2',
      'referralPolicyPage.sections.eligibility.p3',
      'referralPolicyPage.sections.eligibility.p4',
    ],
  },
  {
    icon: Ban,
    titleKey: 'referralPolicyPage.sections.prohibited.title',
    introKey: 'referralPolicyPage.sections.prohibited.p1',
    itemKeys: [
      'referralPolicyPage.sections.prohibited.item1',
      'referralPolicyPage.sections.prohibited.item2',
      'referralPolicyPage.sections.prohibited.item3',
      'referralPolicyPage.sections.prohibited.item4',
      'referralPolicyPage.sections.prohibited.item5',
      'referralPolicyPage.sections.prohibited.item6',
      'referralPolicyPage.sections.prohibited.item7',
    ],
  },
  {
    icon: Settings,
    titleKey: 'referralPolicyPage.sections.modifications.title',
    paragraphKeys: [
      'referralPolicyPage.sections.modifications.p1',
      'referralPolicyPage.sections.modifications.p2',
      'referralPolicyPage.sections.modifications.p3',
      'referralPolicyPage.sections.modifications.p4',
    ],
  },
  {
    icon: AlertOctagon,
    titleKey: 'referralPolicyPage.sections.termination.title',
    paragraphKeys: [
      'referralPolicyPage.sections.termination.p1',
      'referralPolicyPage.sections.termination.p2',
      'referralPolicyPage.sections.termination.p3',
      'referralPolicyPage.sections.termination.p4',
      'referralPolicyPage.sections.termination.p5',
    ],
  },
];

export default function ReferralPolicyPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <FileText className="mr-1 h-3 w-3" />
              {t('referralPolicyPage.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.referralPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t('referralPolicyPage.lastUpdated')}: {t('referralPolicyPage.lastUpdatedDate')}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <button
            onClick={() => navigate('/referral-program')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('referralPolicyPage.backToReferralProgram')}
          </button>
        </div>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {t('referralPolicyPage.intro')}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {sectionConfig.map((section, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mt-1.5">
                    {index + 1}. {t(section.titleKey)}
                  </h2>
                </div>
                <div className="ml-14 space-y-3">
                  {section.introKey && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(section.introKey)}
                    </p>
                  )}
                  {section.paragraphKeys?.map((key) => (
                    <p key={key} className="text-sm text-muted-foreground leading-relaxed">
                      {t(key)}
                    </p>
                  ))}
                  {section.itemKeys?.map((key) => (
                    <p key={key} className="text-sm text-muted-foreground leading-relaxed">
                      • {t(key)}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">
                    {sectionConfig.length + 1}. {t('referralPolicyPage.contact.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t('referralPolicyPage.contact.description')}
                  </p>
                  <a
                    href="mailto:contact@fasttesters.com"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    contact@fasttesters.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="outline"
            onClick={() => navigate('/referral-program')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.affiliateProgram')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/terms')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.termsAndConditions')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            {t('termsPolicy.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}
