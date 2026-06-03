'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Users,
  TrendingUp,
  Wallet,
  Link2,
  Share2,
  Gift,
  Zap,
  Clock,
  Infinity,
  Video,
  MessageSquare,
  Code2,
  Briefcase,
  ArrowRight,
  Sparkles,
  BarChart3,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Earned',
    value: '$847.20',
    icon: DollarSign,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Referrals',
    value: '47 signups',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Converted',
    value: '12 (25.5%)',
    icon: TrendingUp,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Balance',
    value: '$64.20',
    icon: Wallet,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Get your referral link',
    description: 'Sign in to your dashboard and copy your unique referral link. It takes just 10 seconds.',
    icon: Link2,
  },
  {
    step: 2,
    title: 'Share with developers',
    description: 'Share your link on social media, in communities, or directly with fellow developers who need testing.',
    icon: Share2,
  },
  {
    step: 3,
    title: 'Earn 10% when they purchase',
    description: 'When someone signs up through your link and makes their first purchase, you earn 10% of their order value.',
    icon: Gift,
  },
];

const benefits = [
  {
    title: 'Free to join',
    description: 'No fees, no minimum audience size required',
    icon: Gift,
  },
  {
    title: 'No minimum audience',
    description: 'Whether you have 10 followers or 10,000, you can participate',
    icon: Users,
  },
  {
    title: 'Activate in 10 seconds',
    description: 'Just sign in, grab your link, and start sharing immediately',
    icon: Zap,
  },
  {
    title: 'No caps on earnings',
    description: 'Earn unlimited commissions — the more you refer, the more you earn',
    icon: Infinity,
  },
];

const whoItsFor = [
  {
    title: 'YouTubers',
    description: 'Share in video descriptions or community posts',
    icon: Video,
  },
  {
    title: 'Community Builders',
    description: 'Share in Discord, Slack, or Facebook groups',
    icon: MessageSquare,
  },
  {
    title: 'No-Code Agencies',
    description: 'Recommend to clients who need app testing',
    icon: Briefcase,
  },
  {
    title: 'Developers',
    description: 'Share with colleagues and fellow developers',
    icon: Code2,
  },
];

export default function ReferralProgramPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-10 right-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {t('footer.affiliateProgram')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              App Testing Referral Program —{' '}
              <span className="text-blue-400">Earn 10% Commission</span>
            </h1>
            <p className="mt-6 text-xl text-blue-400 font-semibold">
              Share a link, get 10% of every sale
            </p>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Recommend Fast Testers to fellow developers. When they purchase, you earn 10% of
              their first order. No caps, no approvals, paid out fast.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate(APP_URL)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 px-8 text-base cursor-pointer"
              >
                Get your referral link
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/referral-policy')}
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 font-semibold h-12 px-8 text-base cursor-pointer"
              >
                Read the terms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center mb-8">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 mb-3">
            <BarChart3 className="mr-1 h-3 w-3" />
            Your Dashboard Preview
          </Badge>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Track Your Earnings
          </h2>
          <p className="mt-2 text-muted-foreground">
            See your referral performance at a glance
          </p>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Referral Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-background/50 p-4 text-center"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            {/* Mini chart placeholder */}
            <div className="mt-6 rounded-xl border border-border/30 bg-background/30 p-6">
              <div className="flex items-end justify-between gap-2 h-24">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-blue-500/30 transition-all hover:bg-blue-500/50"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Jan</span>
                <span className="text-xs text-muted-foreground">Dec</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Three simple steps to start earning
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step) => (
              <Card key={step.step} className="border-border/50 bg-card/80 relative">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold">
                      {step.step}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Why <span className="text-blue-400">Join?</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Benefits that make our referral program stand out
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Who Is This <span className="text-blue-400">For?</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Perfect for anyone who connects with app developers
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoItsFor.map((item) => (
              <Card key={item.title} className="border-border/50 bg-card/80 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="p-8 sm:p-12 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join our referral program today and earn 10% commission on every developer you refer.
              No caps, no minimums — just simple, fast earnings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate(APP_URL)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 px-8 text-base cursor-pointer"
              >
                Get your referral link
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/referral-policy')}
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 font-semibold cursor-pointer"
              >
                Read the terms
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
