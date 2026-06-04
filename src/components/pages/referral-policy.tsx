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
} from 'lucide-react';

const sections = [
  {
    icon: Gavel,
    title: 'Binding Agreement',
    content: [
      'By participating in the Fast Testers Referral Program ("Program"), you agree to be bound by these Referral Program Policy ("Policy"). This Policy is in addition to and incorporates by reference our Terms and Conditions and Privacy Policy.',
      'We reserve the right to modify this Policy at any time. Continued participation in the Program after any changes constitutes your acceptance of the revised terms. We will notify active participants of material changes via email.',
    ],
  },
  {
    icon: DollarSign,
    title: 'Commission Structure',
    content: [
      'You will earn a commission of 10% of the first purchase amount made by any user who signs up through your unique referral link ("Referred User").',
      'The commission is calculated based on the total amount paid by the Referred User, excluding any taxes, fees, or refunds.',
      'A qualifying purchase occurs when a Referred User completes payment for any Fast Testers service for the first time.',
      'Commissions are only earned on the Referred User\'s first purchase. Subsequent purchases by the same Referred User do not generate additional commissions.',
      'The minimum commission payout is $10. If your balance is below $10, it will carry over to the next payout period.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payout Terms',
    content: [
      'Commissions are paid out on a monthly basis, typically within the first 10 business days of each month for the previous month\'s earnings.',
      'A minimum balance of $10 is required before a payout will be processed. Balances below $10 will accumulate until the threshold is met.',
      'Payouts can be received via PayPal or bank transfer. You must provide valid payment details in your account settings before payouts can be processed.',
      'You are responsible for any taxes owed on commissions received. Fast Testers does not withhold taxes from commission payments and will issue applicable tax documentation as required by law.',
      'Processing times for payouts may vary depending on the payment method selected. PayPal transfers typically take 1-3 business days, while bank transfers may take 5-7 business days.',
    ],
  },
  {
    icon: UserCheck,
    title: 'Eligibility',
    content: [
      'To participate in the Referral Program, you must have an active Fast Testers account in good standing.',
      'You must be at least 18 years of age to participate in the Program.',
      'You cannot refer yourself. Self-referrals, including creating multiple accounts to generate referral commissions, are strictly prohibited and will result in immediate disqualification from the Program.',
      'You may not use the Program to earn commissions on purchases made by individuals in the same household or using the same payment method.',
    ],
  },
  {
    icon: Ban,
    title: 'Prohibited Activities',
    content: [
      'The following activities are strictly prohibited and may result in immediate termination from the Program and forfeiture of any unpaid commissions:',
      '• Sending spam or unsolicited emails to promote your referral link. All communications must comply with applicable anti-spam laws.',
      '• Creating fake or fraudulent referrals, including bots, scripts, or fake sign-up farms (our testing service uses only real human testers).',
      '• Self-referrals or referring individuals within the same household or using the same payment method.',
      '• Making misleading or deceptive claims about Fast Testers\'s services, pricing, or guarantees.',
      '• Using your referral link in any way that could damage Fast Testers\'s reputation or brand.',
      '• Advertising or promoting your referral link on platforms or in contexts that violate those platforms\' terms of service.',
      '• Using paid advertising (e.g., Google Ads, Facebook Ads) that targets Fast Testers branded keywords.',
    ],
  },
  {
    icon: Settings,
    title: 'Program Modifications',
    content: [
      'Fast Testers reserves the right to modify, suspend, or discontinue the Referral Program at any time, with or without notice.',
      'We may change the commission rate, payout terms, or eligibility requirements with 30 days\' advance notice to active participants.',
      'In the event of Program discontinuation, all earned and unpaid commissions will be paid out within 60 days of the discontinuation date.',
      'We will make reasonable efforts to notify participants of material changes via email or through dashboard notifications.',
    ],
  },
  {
    icon: AlertOctagon,
    title: 'Termination',
    content: [
      'Fast Testers reserves the right to terminate your participation in the Referral Program at any time, with or without cause.',
      'Grounds for termination include, but are not limited to: violation of this Policy, engagement in prohibited activities, fraudulent activity, or behavior that is harmful to Fast Testers or its users.',
      'Upon termination for cause (violation of this Policy), any unpaid commissions may be forfeited.',
      'Upon termination without cause, unpaid commissions earned prior to the termination date will be paid out in the next regular payout cycle, subject to the minimum payout threshold.',
      'You may voluntarily withdraw from the Referral Program at any time by contacting us at contact@fasttesters.com.',
    ],
  },
];

export default function ReferralPolicyPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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
              Legal
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.referralPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: 1st March 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <button
            onClick={() => navigate('/referral-program')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Referral Program
          </button>
        </div>

        {/* Intro */}
        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              This Referral Program Policy governs your participation in the Fast Testers
              Referral Program. Please read this Policy carefully before participating. By
              participating in the Program, you acknowledge that you have read, understood, and agree
              to be bound by the terms outlined below.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mt-1.5">
                    {index + 1}. {section.title}
                  </h2>
                </div>
                <div className="ml-14 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Contact Section */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">
                    {sections.length + 1}. Contact
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    If you have any questions about this Referral Program Policy, please contact us:
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

        {/* Footer navigation */}
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
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
}
