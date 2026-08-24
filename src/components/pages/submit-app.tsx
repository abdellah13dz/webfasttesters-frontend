'use client';

import React, { useState } from 'react';
import { useRouter } from '@/lib/router';
import { APP_LOGIN_URL, APP_SUBMIT_APP_URL, APP_URL } from '@/lib/app-urls';
import { getWhatsAppUrl } from '@/lib/contact';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Upload,
  CheckCircle,
  Clock,
  Shield,
  ArrowRight,
  LogIn,
  MessageCircle,
  Package,
  Link as LinkIcon,
  ExternalLink,
  FileText,
  HelpCircle,
  Smartphone,
  LayoutDashboard,
  CreditCard,
  ImageIcon,
} from 'lucide-react';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { FullDemoCta } from '@/components/full-demo-cta';
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta';
import { FastTestersTutorial } from '@/components/video-tutorial/fast-testers-tutorial';

const WHATSAPP_BULK_URL = getWhatsAppUrl(
  'Hi Fast Testers, I need a special offer for bulk / multiple apps.'
);

const DASHBOARD_STEP_IMAGES = [
  '/tuto/submit-app/step-1.gif',
  '/tuto/submit-app/step-2.gif',
  '/tuto/submit-app/step-3.gif',
  '/tuto/submit-app/step-4.gif',
] as const;

const requirements = [
  {
    icon: Smartphone,
    titleKey: 'submitApp.reqConsoleTitle',
    descKey: 'submitApp.reqConsoleDesc',
  },
  {
    icon: Upload,
    titleKey: 'submitApp.reqUploadedTitle',
    descKey: 'submitApp.reqUploadedDesc',
  },
  {
    icon: Package,
    titleKey: 'submitApp.reqPackageNameTitle',
    descKey: 'submitApp.reqPackageNameDesc',
  },
  {
    icon: LinkIcon,
    titleKey: 'submitApp.reqTestingLinkTitle',
    descKey: 'submitApp.reqTestingLinkDesc',
  },
];

const dashboardSteps = [
  {
    step: 1,
    icon: LogIn,
    titleKey: 'submitApp.dashStep1Title',
    descKey: 'submitApp.dashStep1Desc',
  },
  {
    step: 2,
    icon: CreditCard,
    titleKey: 'submitApp.dashStep2Title',
    descKey: 'submitApp.dashStep2Desc',
  },
  {
    step: 3,
    icon: Upload,
    titleKey: 'submitApp.dashStep3Title',
    descKey: 'submitApp.dashStep3Desc',
  },
  {
    step: 4,
    icon: LayoutDashboard,
    titleKey: 'submitApp.dashStep4Title',
    descKey: 'submitApp.dashStep4Desc',
  },
];

const postSubmissionSteps = [
  {
    step: 1,
    icon: CheckCircle,
    titleKey: 'submitApp.postStep1Title',
    descKey: 'submitApp.postStep1Desc',
    timeKey: 'submitApp.postStep1Time',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  {
    step: 2,
    icon: Smartphone,
    titleKey: 'submitApp.postStep2Title',
    descKey: 'submitApp.postStep2Desc',
    timeKey: 'submitApp.postStep2Time',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  {
    step: 3,
    icon: Clock,
    titleKey: 'submitApp.postStep3Title',
    descKey: 'submitApp.postStep3Desc',
    timeKey: 'submitApp.postStep3Time',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  {
    step: 4,
    icon: Shield,
    titleKey: 'submitApp.postStep4Title',
    descKey: 'submitApp.postStep4Desc',
    timeKey: 'submitApp.postStep4Time',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
];

const faqItems = [
  { id: 'submit-faq-1', questionKey: 'submitApp.faq1Q', answerKey: 'submitApp.faq1A', icon: Package },
  { id: 'submit-faq-2', questionKey: 'submitApp.faq2Q', answerKey: 'submitApp.faq2A', icon: LinkIcon },
  { id: 'submit-faq-3', questionKey: 'submitApp.faq3Q', answerKey: 'submitApp.faq3A', icon: Clock },
  { id: 'submit-faq-4', questionKey: 'submitApp.faq4Q', answerKey: 'submitApp.faq4A', icon: Shield },
  { id: 'submit-faq-5', questionKey: 'submitApp.faq5Q', answerKey: 'submitApp.faq5A', icon: FileText },
];

function DashboardScreenshotSlot({
  step,
  src,
  alt,
}: {
  step: number;
  src?: string;
  alt: string;
}) {
  if (src) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-lg shadow-blue-500/5">
        {/* Native img keeps GIF animation (next/image can flatten it). */}
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-contain object-top"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5 px-4 text-center">
      <ImageIcon className="mb-2 h-8 w-8 text-blue-400/50" />
      <p className="text-xs font-medium text-muted-foreground">Dashboard screenshot — step {step}</p>
      <p className="mt-1 text-[11px] text-muted-foreground/70">Add image when ready</p>
    </div>
  );
}

export default function SubmitAppPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400"
            >
              <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />
              {t('submitApp.heroBadge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('submitApp.heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('submitApp.heroTitle2')}
              </span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t('submitApp.heroSubtitle')}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="border-0 bg-blue-500/10 text-blue-400">
                <CheckCircle className="mr-1 h-3 w-3" />
                {t('submitApp.testers')}
              </Badge>
              <Badge variant="secondary" className="border-0 bg-cyan-500/10 text-cyan-400">
                <Clock className="mr-1 h-3 w-3" />
                {t('submitApp.startsIn6Hours')}
              </Badge>
              <Badge variant="secondary" className="border-0 bg-blue-500/10 text-blue-400">
                <Shield className="mr-1 h-3 w-3" />
                {t('submitApp.productionAccess')}
              </Badge>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-blue-500 px-8 font-semibold text-white hover:bg-blue-600"
                onClick={() => navigate(APP_URL)}
              >
                {t('submitApp.openDashboard')}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                onClick={() => navigate(APP_LOGIN_URL)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {t('submitApp.login')}
              </Button>
            </div>
            <div className="mt-8 flex justify-center">
              <TrustpilotWidget className="w-full max-w-md" align="center" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <FastTestersTutorial variant="cta" analyticsLocation="submit_app_tutorial" />
      </section>

      <AppSetupGuideCta trackingId="submit_app_setup_guide" />

      <FullDemoCta trackingId="submit_app_full_demo" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            {t('submitApp.requirementsBadge')}
          </Badge>
          <h2 className="text-2xl font-bold sm:text-3xl">{t('submitApp.requirementsTitle')}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            {t('submitApp.requirementsSubtitle')}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {requirements.map((req) => {
            const Icon = req.icon;
            return (
              <Card
                key={req.titleKey}
                className="group border-border/50 bg-card/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CheckCircle className="ml-auto h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="mb-1 font-semibold">{t(req.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(req.descKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/40 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
            >
              <LayoutDashboard className="mr-1 h-3 w-3" />
              {t('submitApp.dashStepsBadge')}
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">{t('submitApp.dashStepsTitle')}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              {t('submitApp.dashStepsSubtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {dashboardSteps.map((item, index) => {
              const Icon = item.icon;
              const screenshot = DASHBOARD_STEP_IMAGES[index];
              return (
                <div
                  key={item.step}
                  className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                        {t('submitApp.step')} {item.step}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold">{t(item.titleKey)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t(item.descKey)}
                    </p>
                  </div>
                  <DashboardScreenshotSlot
                    step={item.step}
                    src={screenshot}
                    alt={t(item.titleKey)}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="bg-blue-500 px-8 font-semibold text-white hover:bg-blue-600"
              onClick={() => navigate(APP_SUBMIT_APP_URL)}
            >
              {t('submitApp.goToSubmitInDashboard')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Card className="overflow-hidden border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-card to-blue-500/5">
          <CardContent className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              >
                <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                {t('submitApp.whatsappBulkBadge')}
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('submitApp.whatsappBulkTitle')}</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">{t('submitApp.whatsappBulkDesc')}</p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 px-8 font-semibold text-white hover:bg-emerald-700"
              >
                <a href={WHATSAPP_BULK_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('submitApp.whatsappBulkCta')}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
            >
              <Clock className="mr-1 h-3 w-3" />
              {t('submitApp.afterSubmissionBadge')}
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">{t('submitApp.afterSubmissionTitle')}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              {t('submitApp.afterSubmissionSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {postSubmissionSteps.map((step) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.step}
                  className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-blue-500/5" />
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className={`${step.border} ${step.color} bg-transparent text-xs`}>
                        {t('submitApp.step')} {step.step}
                      </Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{t(step.titleKey)}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400">
                      <Clock className="h-3 w-3" />
                      {t(step.timeKey)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            {t('submitApp.faqBadge')}
          </Badge>
          <h2 className="text-2xl font-bold sm:text-3xl">{t('submitApp.faqTitle')}</h2>
          <p className="mt-2 text-muted-foreground">{t('submitApp.faqSubtitle')}</p>
        </div>

        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <Accordion
              type="single"
              collapsible
              value={openFaq}
              onValueChange={setOpenFaq}
              className="w-full"
            >
              {faqItems.map((faq) => {
                const Icon = faq.icon;
                return (
                  <AccordionItem key={faq.id} value={faq.id} className="border-border">
                    <AccordionTrigger className="cursor-pointer py-5 transition-colors hover:text-blue-400 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-400/10">
                          <Icon className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          {t(faq.questionKey)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 pr-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">{t(faq.answerKey)}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/10 backdrop-blur-sm">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10">
                <Upload className="h-7 w-7 text-blue-400" />
              </div>
            </div>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{t('submitApp.ctaTitle')}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              {t('submitApp.ctaDescription')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => navigate(APP_URL)}
                size="lg"
                className="cursor-pointer bg-blue-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t('submitApp.openDashboard')}
              </Button>
              <Button
                onClick={() => navigate('/how-it-works')}
                size="lg"
                variant="outline"
                className="cursor-pointer border-blue-500/30 px-8 py-6 text-base text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
              >
                {t('submitApp.learnHowItWorks')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
