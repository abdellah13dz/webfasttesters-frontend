'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@/lib/router';
import { APP_LOGIN_URL, APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { usePricingPlans } from '@/lib/hooks/use-pricing-plans';
import { formatPlanPrice } from '@/lib/pricing';
import { apiFetch } from '@/lib/api';
import { useAnalytics } from '@/lib/analytics';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Link,
  ExternalLink,
  FileText,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ClientOnly } from '@/components/client-only';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { FullDemoCta } from '@/components/full-demo-cta';
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const plansFallback = [
  { value: 'basic', label: 'Basic - $15', price: '$15' },
  { value: 'standard', label: 'Standard - $29', price: '$29' },
  { value: 'premium', label: 'Premium - $49', price: '$49' },
];

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
    icon: Link,
    titleKey: 'submitApp.reqTestingLinkTitle',
    descKey: 'submitApp.reqTestingLinkDesc',
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
  {
    id: 'submit-faq-1',
    questionKey: 'submitApp.faq1Q',
    answerKey: 'submitApp.faq1A',
    icon: Package,
  },
  {
    id: 'submit-faq-2',
    questionKey: 'submitApp.faq2Q',
    answerKey: 'submitApp.faq2A',
    icon: Link,
  },
  {
    id: 'submit-faq-3',
    questionKey: 'submitApp.faq3Q',
    answerKey: 'submitApp.faq3A',
    icon: Clock,
  },
  {
    id: 'submit-faq-4',
    questionKey: 'submitApp.faq4Q',
    answerKey: 'submitApp.faq4A',
    icon: Shield,
  },
  {
    id: 'submit-faq-5',
    questionKey: 'submitApp.faq5Q',
    answerKey: 'submitApp.faq5A',
    icon: FileText,
  },
];

export default function SubmitAppPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const { trackForm } = useAnalytics();
  const { plans: apiPlans } = usePricingPlans();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [appName, setAppName] = useState('');
  const [packageName, setPackageName] = useState('');
  const [playUrl, setPlayUrl] = useState('');
  const [testingLink, setTestingLink] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const plans = apiPlans.length > 0
    ? apiPlans.map((plan) => ({
        value: plan.id,
        label: `${plan.name} - ${formatPlanPrice(plan)}`,
        price: formatPlanPrice(plan),
      }))
    : plansFallback;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.querySelector('script[src*="recaptcha"]')) {
      setRecaptchaLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY || !recaptchaLoaded || !window.grecaptcha) return null;
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          resolve(await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_app' }));
        } catch {
          resolve(null);
        }
      });
    });
  }, [recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    if (!selectedPlan) {
      setSubmitStatus('error');
      setSubmitMessage('Please select a plan.');
      setSubmitting(false);
      return;
    }

    const whatsappDigits = whatsapp.replace(/\D/g, '');
    if (whatsappDigits.length < 8 || whatsappDigits.length > 15) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid WhatsApp number with country code.');
      setSubmitting(false);
      return;
    }

    try {
      const recaptchaToken = await getRecaptchaToken();
      if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
        setSubmitStatus('error');
        setSubmitMessage('Security verification failed. Please try again.');
        return;
      }

      const selectedPlanData = plans.find((p) => p.value === selectedPlan);

      const response = await apiFetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          appName: appName.trim(),
          packageName: packageName.trim(),
          playUrl: playUrl.trim() || undefined,
          testingLink: testingLink.trim(),
          pricingPlanId: selectedPlan || undefined,
          planLabel: selectedPlanData?.label,
          instructions: instructions.trim() || undefined,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Submission failed. Please try again.');
        return;
      }

      trackForm('submit_app');
      setSubmitStatus('success');
      setSubmitMessage('App submitted successfully! Our team will review your submission within 2 hours.');
      setName('');
      setEmail('');
      setWhatsapp('');
      setAppName('');
      setPackageName('');
      setPlayUrl('');
      setTestingLink('');
      setInstructions('');
      setSelectedPlan('');
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
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
              className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1.5 text-sm"
            >
              <Upload className="mr-1.5 h-3.5 w-3.5" />
              {t('submitApp.heroBadge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('submitApp.heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('submitApp.heroTitle2')}
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {t('submitApp.heroSubtitle')}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-400 border-0"
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                {t('submitApp.testers')}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-cyan-500/10 text-cyan-400 border-0"
              >
                <Clock className="mr-1 h-3 w-3" />
                {t('submitApp.startsIn6Hours')}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-400 border-0"
              >
                <Shield className="mr-1 h-3 w-3" />
                {t('submitApp.productionAccess')}
              </Badge>
            </div>
            <div className="mt-8 flex justify-center">
              <TrustpilotWidget className="w-full max-w-md" align="center" />
            </div>
          </div>
        </div>
      </section>

      <AppSetupGuideCta trackingId="submit_app_setup_guide" />

      <FullDemoCta trackingId="submit_app_full_demo" />

      {/* ═══════════════════════════════════════════════════════════════════
          REQUIREMENTS CHECKLIST SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-3 py-1 text-xs"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            {t('submitApp.requirementsBadge')}
          </Badge>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t('submitApp.requirementsTitle')}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CheckCircle className="ml-auto h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-1">{t(req.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(req.descKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          APP SUBMISSION FORM
          ═══════════════════════════════════════════════════════════════════ */}
      {/* APP SUBMISSION FORM */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Upload className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{t('submitApp.formTitle')}</h2>
                <p className="text-sm text-muted-foreground">{t('submitApp.formSubtitle')}</p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-blue-500/25 bg-blue-500/5 p-4 sm:p-5">
              <p className="text-sm font-medium text-foreground">{t('submitApp.dashboardBannerTitle')}</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {t('submitApp.dashboardBannerDesc')}
              </p>
              <Button
                type="button"
                size="sm"
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigate(APP_URL)}
              >
                {t('submitApp.openDashboard')}
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>

            <ClientOnly
              fallback={
                <div className="space-y-6 animate-pulse" aria-hidden>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="h-10 rounded-md bg-muted/40" />
                    <div className="h-10 rounded-md bg-muted/40" />
                  </div>
                  <div className="h-10 rounded-md bg-muted/40" />
                  <div className="h-10 rounded-md bg-muted/40" />
                  <div className="h-10 rounded-md bg-muted/40" />
                  <div className="h-24 rounded-md bg-muted/40" />
                  <div className="h-12 rounded-md bg-muted/40" />
                </div>
              }
            >
            {submitStatus === 'success' && (
              <div className="mb-6 flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{submitMessage}</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{submitMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-sm font-medium">
                    Your name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-sm font-medium">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium">
                  {t('submitApp.whatsappLabel')}{' '}
                  <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t('submitApp.whatsappPlaceholder')}
                    required
                    autoComplete="tel"
                    className="pl-10 bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('submitApp.whatsappHelp')}</p>
              </div>

              {/* App Name */}
                <div className="space-y-2">
                  <Label htmlFor="appName" className="text-sm font-medium">
                    {t('submitApp.appNameLabel')}{' '}
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder={t('submitApp.appNamePlaceholder')}
                    required
                    className="bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>

                {/* Package Name */}
                <div className="space-y-2">
                  <Label htmlFor="packageName" className="text-sm font-medium">
                    {t('submitApp.packageNameLabel')}{' '}
                    <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="packageName"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      placeholder={t('submitApp.packageNamePlaceholder')}
                      required
                      className="pl-10 bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Google Play URL */}
                <div className="space-y-2">
                  <Label htmlFor="playUrl" className="text-sm font-medium">
                    {t('submitApp.playUrlLabel')}{' '}
                    <span className="text-muted-foreground text-xs">
                      ({t('submitApp.optional')})
                    </span>
                  </Label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="playUrl"
                      value={playUrl}
                      onChange={(e) => setPlayUrl(e.target.value)}
                      placeholder={t('submitApp.playUrlPlaceholder')}
                      className="pl-10 bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Testing Track Link */}
                <div className="space-y-2">
                  <Label htmlFor="testingLink" className="text-sm font-medium">
                    {t('submitApp.testingLinkLabel')}{' '}
                    <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="testingLink"
                      value={testingLink}
                      onChange={(e) => setTestingLink(e.target.value)}
                      placeholder={t('submitApp.testingLinkPlaceholder')}
                      required
                      className="pl-10 bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('submitApp.testingLinkHelp')}
                  </p>
                </div>

                {/* Select Plan */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    {t('submitApp.selectPlanLabel')}{' '}
                    <span className="text-red-400">*</span>
                  </Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger className="w-full bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20">
                      <SelectValue placeholder={t('submitApp.selectPlanPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.value}
                        type="button"
                        onClick={() => setSelectedPlan(plan.value)}
                        className={`rounded-lg border p-3 text-center transition-all cursor-pointer ${
                          selectedPlan === plan.value
                            ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-sm shadow-blue-500/10'
                            : 'border-border/50 bg-card/30 text-muted-foreground hover:border-blue-500/30 hover:bg-blue-500/5'
                        }`}
                      >
                        <span className="text-xs font-medium block">{plan.value.charAt(0).toUpperCase() + plan.value.slice(1)}</span>
                        <span className="text-lg font-bold block mt-0.5">{plan.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-sm font-medium">
                    {t('submitApp.instructionsLabel')}
                  </Label>
                  <Textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder={t('submitApp.instructionsPlaceholder')}
                    rows={4}
                    className="bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                {/* reCAPTCHA Notice */}
                <div className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/30 p-3">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('submitApp.recaptchaNotice')}
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || !selectedPlan}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 text-base shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-5 w-5" />
                  )}
                  {submitting ? 'Submitting...' : t('submitApp.submitButton')}
                  {!submitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {t('submitApp.standardTestingNote')}{' '}
                <button type="button" onClick={() => navigate(APP_URL)} className="text-blue-400 hover:underline">
                  {t('submitApp.openDashboard')}
                </button>
                {' · '}
                <button type="button" onClick={() => navigate(APP_LOGIN_URL)} className="text-blue-400 hover:underline">
                  {t('submitApp.login')}
                </button>
              </p>
            </ClientOnly>
            </CardContent>
          </Card>
        </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS AFTER SUBMISSION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 text-xs"
            >
              <Clock className="mr-1 h-3 w-3" />
              {t('submitApp.afterSubmissionBadge')}
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t('submitApp.afterSubmissionTitle')}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              {t('submitApp.afterSubmissionSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {postSubmissionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.step}>
                  <Card
                    className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
                  >
                    <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-blue-500/5" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className={`${step.border} ${step.color} bg-transparent text-xs`}
                        >
                          {t('submitApp.step')} {step.step}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {t(step.descKey)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                        <Clock className="h-3 w-3" />
                        {t(step.timeKey)}
                      </div>
                    </CardContent>
                  </Card>
                  {/* Connector arrow between cards on large screens */}
                  {index < postSubmissionSteps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center absolute" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Progress connector line for desktop */}
          <div className="hidden lg:block relative mt-[-260px] mb-[200px] mx-auto max-w-4xl pointer-events-none">
            <div className="flex items-center justify-between px-12">
              {[1, 2, 3].map((i) => (
                <ArrowRight
                  key={i}
                  className="h-5 w-5 text-blue-500/30"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-3 py-1 text-xs"
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            {t('submitApp.faqBadge')}
          </Badge>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t('submitApp.faqTitle')}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t('submitApp.faqSubtitle')}
          </p>
        </div>

        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <ClientOnly
              fallback={
                <div className="space-y-3 animate-pulse" aria-hidden>
                  {faqItems.map((faq) => (
                    <div key={faq.id} className="h-14 rounded-lg bg-muted/40" />
                  ))}
                </div>
              }
            >
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
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border-border"
                    >
                      <AccordionTrigger className="hover:no-underline hover:text-blue-400 transition-colors py-5 cursor-pointer">
                        <div className="flex items-center gap-3 text-left">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/10 shrink-0">
                            <Icon className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-sm sm:text-base font-medium text-foreground">
                            {t(faq.questionKey)}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-11 pr-2">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {t(faq.answerKey)}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </ClientOnly>
          </CardContent>
        </Card>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/10 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-400/10">
                <Upload className="h-7 w-7 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl mb-3">
              {t('submitApp.ctaTitle')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {t('submitApp.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate(APP_URL)}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t('submitApp.openDashboard')}
              </Button>
              <Button
                onClick={() => navigate('/how-it-works')}
                size="lg"
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 px-8 py-6 text-base cursor-pointer"
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
