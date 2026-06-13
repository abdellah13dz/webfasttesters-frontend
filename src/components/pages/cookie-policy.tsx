'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { BusinessLegalNotice } from '@/components/business-legal-notice';
import { PolicyContactSection } from '@/components/legal/policy-page-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Cookie,
  Shield,
  Eye,
  Settings,
  Lock,
  ExternalLink,
  Mail,
  ArrowLeft,
  BarChart3,
  Puzzle,
  Megaphone,
  Chrome,
  CreditCard,
  Clock,
  RefreshCw,
  List,
  CheckCircle2,
  Info,
} from 'lucide-react';

const tocItems = [
  { key: 'whatAreCookies', icon: Cookie },
  { key: 'howWeUse', icon: Eye },
  { key: 'typesOfCookies', icon: Shield },
  { key: 'thirdParty', icon: ExternalLink },
  { key: 'managing', icon: Settings },
  { key: 'cookiePreferences', icon: List },
  { key: 'changes', icon: RefreshCw },
  { key: 'contact', icon: Mail },
];

const cookieTableData = [
  {
    name: 'ft-session',
    type: 'Essential',
    purpose: 'Maintains your logged-in session state',
    duration: 'Session',
  },
  {
    name: 'ft-csrf',
    type: 'Essential',
    purpose: 'Protects against Cross-Site Request Forgery attacks',
    duration: 'Session',
  },
  {
    name: 'ft-cookies-accepted',
    type: 'Essential',
    purpose: 'Stores your cookie consent preference',
    duration: '1 year',
  },
  {
    name: 'ft-lang',
    type: 'Functional',
    purpose: 'Remembers your language preference',
    duration: '1 year',
  },
  {
    name: '_ga',
    type: 'Analytics',
    purpose: 'Google Analytics — distinguishes unique visitors',
    duration: '2 years',
  },
  {
    name: '_ga_*',
    type: 'Analytics',
    purpose: 'Google Analytics — maintains session state',
    duration: '2 years',
  },
  {
    name: 'recaptcha-*',
    type: 'Functional',
    purpose: 'Google reCAPTCHA — spam and fraud prevention',
    duration: 'Session',
  },
  {
    name: 'stripe-*',
    type: 'Essential',
    purpose: 'Stripe — secure payment processing',
    duration: 'Session',
  },
];

export default function CookiePolicyPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Cookie className="mr-1 h-3 w-3" />
              {t('cookiePolicy.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('cookiePolicy.title')}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t('cookiePolicy.subtitle')}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t('cookiePolicy.lastUpdated')}: {t('cookiePolicy.lastUpdatedDate')}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{t('cookiePolicy.gdprCompliant')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('cookiePolicy.backToHome')}
          </button>
        </div>

        {/* Introduction */}
        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Info className="h-5 w-5" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('cookiePolicy.intro')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <BusinessLegalNotice variant="footer" />
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t('cookiePolicy.tableOfContents')}
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tocItems.map((item, index) => (
                <a
                  key={item.key}
                  href={`#section-${item.key}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-blue-400 hover:bg-blue-500/5 transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>
                    {index + 1}. {t(`cookiePolicy.toc.${item.key}`)}
                  </span>
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Section 1: What Are Cookies? */}
          <Card id="section-whatAreCookies" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Cookie className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  1. {t('cookiePolicy.whatAreCookies.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.whatAreCookies.p1')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.whatAreCookies.p2')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.whatAreCookies.p3')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: How We Use Cookies */}
          <Card id="section-howWeUse" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  2. {t('cookiePolicy.howWeUse.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.howWeUse.p1')}
                </p>
                <ul className="space-y-2">
                  {[
                    'cookiePolicy.howWeUse.use1',
                    'cookiePolicy.howWeUse.use2',
                    'cookiePolicy.howWeUse.use3',
                    'cookiePolicy.howWeUse.use4',
                  ].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-muted-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Types of Cookies We Use */}
          <Card id="section-typesOfCookies" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  3. {t('cookiePolicy.typesOfCookies.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-5">
                {/* Essential */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.typesOfCookies.essential.title')}
                    </h3>
                    <Badge variant="outline" className="ml-auto border-blue-500/30 text-blue-400 bg-blue-500/10 text-[10px] px-1.5 py-0">
                      {t('cookiePolicy.typesOfCookies.required')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.typesOfCookies.essential.desc')}
                  </p>
                </div>

                {/* Analytics */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.typesOfCookies.analytics.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.typesOfCookies.analytics.desc')}
                  </p>
                </div>

                {/* Functional */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Puzzle className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.typesOfCookies.functional.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.typesOfCookies.functional.desc')}
                  </p>
                </div>

                {/* Marketing */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.typesOfCookies.marketing.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.typesOfCookies.marketing.desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types Table */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <List className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  {t('cookiePolicy.cookieTable.title')}
                </h2>
              </div>
              <div className="ml-14">
                <div className="rounded-lg border border-border/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-500/5 hover:bg-blue-500/5">
                        <TableHead className="text-foreground font-semibold">
                          {t('cookiePolicy.cookieTable.name')}
                        </TableHead>
                        <TableHead className="text-foreground font-semibold">
                          {t('cookiePolicy.cookieTable.type')}
                        </TableHead>
                        <TableHead className="text-foreground font-semibold">
                          {t('cookiePolicy.cookieTable.purpose')}
                        </TableHead>
                        <TableHead className="text-foreground font-semibold">
                          {t('cookiePolicy.cookieTable.duration')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cookieTableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs text-blue-400">
                            {row.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 py-0 ${
                                row.type === 'Essential'
                                  ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                  : row.type === 'Analytics'
                                  ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                                  : row.type === 'Functional'
                                  ? 'border-purple-500/30 text-purple-400 bg-purple-500/10'
                                  : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                              }`}
                            >
                              {row.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-normal">
                            {row.purpose}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {row.duration}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Third-Party Cookies */}
          <Card id="section-thirdParty" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  4. {t('cookiePolicy.thirdParty.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.thirdParty.p1')}
                </p>

                {/* Google Analytics */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Chrome className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.thirdParty.googleAnalytics.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.thirdParty.googleAnalytics.desc')}
                  </p>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {t('cookiePolicy.thirdParty.googleAnalytics.policy')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* reCAPTCHA */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.thirdParty.recaptcha.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.thirdParty.recaptcha.desc')}
                  </p>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {t('cookiePolicy.thirdParty.recaptcha.policy')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Stripe */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.thirdParty.stripe.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('cookiePolicy.thirdParty.stripe.desc')}
                  </p>
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {t('cookiePolicy.thirdParty.stripe.policy')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Managing Cookies */}
          <Card id="section-managing" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Settings className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  5. {t('cookiePolicy.managing.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.managing.p1')}
                </p>
                <ul className="space-y-2">
                  {[
                    'cookiePolicy.managing.browser1',
                    'cookiePolicy.managing.browser2',
                    'cookiePolicy.managing.browser3',
                    'cookiePolicy.managing.browser4',
                  ].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-muted-foreground">{t(key)}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t('cookiePolicy.managing.warning')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Cookie Preferences */}
          <Card id="section-cookiePreferences" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <List className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  6. {t('cookiePolicy.cookiePreferences.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.cookiePreferences.p1')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.cookiePreferences.p2')}
                </p>
                <div className="mt-4 rounded-lg border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('cookiePolicy.cookiePreferences.yourRights.title')}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'cookiePolicy.cookiePreferences.yourRights.right1',
                      'cookiePolicy.cookiePreferences.yourRights.right2',
                      'cookiePolicy.cookiePreferences.yourRights.right3',
                    ].map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                        <span className="text-sm text-muted-foreground">{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Changes to This Policy */}
          <Card id="section-changes" className="border-border/50 bg-card/50 scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  7. {t('cookiePolicy.changes.title')}
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.changes.p1')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookiePolicy.changes.p2')}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>{t('cookiePolicy.changes.reviewDate')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Contact Us */}
          <Card id="section-contact" className="border-blue-500/20 bg-blue-500/5 scroll-mt-20">
            <CardContent className="p-6">
              <PolicyContactSection
                title={`8. ${t('cookiePolicy.contact.title')}`}
                description={t('cookiePolicy.contact.p1')}
              />
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 opacity-30" />

        {/* Footer navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="outline"
            onClick={() => navigate('/terms-and-conditions')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.termsAndConditions')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/privacy-policy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.privacyPolicy')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/refund-policy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.refundPolicy')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            {t('cookiePolicy.backToHome')}
          </Button>
        </div>
      </section>
    </div>
  );
}
