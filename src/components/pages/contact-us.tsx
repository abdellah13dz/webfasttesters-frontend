'use client';

import { apiFetch } from '@/lib/api';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';
import {
  LEGAL_ENTITY_NAME,
  BRAND_NAME,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  formatBusinessAddress,
  hasBusinessAddress,
} from '@/lib/business';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { trackMetaLead } from '@/lib/meta';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Info,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';

// reCAPTCHA v3 site key - configure via NEXT_PUBLIC_RECAPTCHA_SITE_KEY env var
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

// Declare grecaptcha type for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

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

export default function ContactUsPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const { trackForm } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA v3 script dynamically
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    // Avoid duplicate script tags
    if (document.querySelector('script[src*="recaptcha"]')) {
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setRecaptchaLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
    };
    document.head.appendChild(script);
  }, []);

  // Get reCAPTCHA token
  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY) {
      // If no site key configured, skip reCAPTCHA (development mode)
      return null;
    }

    try {
      if (!window.grecaptcha || !recaptchaLoaded) {
        console.warn('reCAPTCHA not loaded yet');
        return null;
      }

      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const result = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: 'contact_form',
            });
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      });

      return token;
    } catch (error) {
      console.error('reCAPTCHA execute error:', error);
      return null;
    }
  }, [recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setRecaptchaError(null);

    try {
      // Get reCAPTCHA token before submission
      const recaptchaToken = await getRecaptchaToken();

      // If reCAPTCHA is configured but we couldn't get a token, show error
      if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
        setRecaptchaError('reCAPTCHA verification could not be completed. Please refresh the page and try again.');
        setSubmitting(false);
        return;
      }

      // Save contact to database via API
      const response = await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(recaptchaToken ? { recaptchaToken } : {}),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403 && errorData.error?.includes('reCAPTCHA')) {
          setRecaptchaError('Spam verification failed. Please try again.');
          setSubmitting(false);
          return;
        }
        // For other errors, still proceed (don't block the user)
        console.warn('Contact form submission returned non-OK status:', response.status);
      }

      trackForm('contact_form', { subject: formData.subject });
      trackMetaLead('Contact Form', {
        userData: { email: formData.email, firstName: formData.name },
        customData: { content_name: 'Contact Form', subject: formData.subject },
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      // Still show success even if API fails
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const quickLinks = [
    { label: t('contact.faq'), path: '/faq', icon: HelpCircle },
    { label: t('contact.supportCenter'), path: '/support', icon: MessageCircle },
    { label: t('contact.appRejected'), path: '/app-rejected-google-play', icon: Info },
    { label: t('contact.howItWorks'), path: '/how-it-works', icon: ArrowRight },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/3 to-cyan-500/8" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Floating chat bubble decorations */}
        <div className="absolute top-16 left-[10%] animate-float opacity-15">
          <MessageCircle className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-32 right-[15%] animate-float-delayed opacity-10">
          <Mail className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="absolute bottom-20 left-[20%] animate-float-slow opacity-10">
          <MessageCircle className="h-10 w-10 text-blue-300" />
        </div>
        <div className="absolute bottom-16 right-[25%] animate-float opacity-12">
          <Phone className="h-5 w-5 text-cyan-400" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Text on left */}
            <div className="flex-1 text-center lg:text-left w-full">
              <Badge
                variant="outline"
                className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
              >
                <MessageCircle className="mr-1 h-3 w-3" />
                {t('contact.badge')}
              </Badge>
              <h1 className="text-display">
                {t('contact.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('contact.title').split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="mt-4 text-subheading">
                {t('contact.subtitle')}
              </p>

              {/* Typing indicator + response time badge */}
              <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-2 sm:px-4">
                {/* Animated typing dots */}
                <div className="flex shrink-0 items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce-dot-1" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce-dot-2" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce-dot-3" />
                </div>
                <span className="text-xs sm:text-sm text-blue-400 font-medium text-center sm:text-left">
                  Typical response time: Under 2 hours
                </span>
              </div>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/contact-us.png"
                alt="Contact Us"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <AnimatedSection>
        <section className="page-container section-y-sm">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.sendMessage')}</CardTitle>
                  <CardDescription>
                    {t('contact.sendMessageDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 mb-4">
                        <CheckCircle2 className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold">{t('contact.messageSent')}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t('contact.messageSentDesc')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('contact.nameLabel')}</Label>
                          <Input
                            id="name"
                            placeholder={t('contact.namePlaceholder')}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-muted/30 border-border/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('contact.emailPlaceholder')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-muted/30 border-border/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">{t('contact.subjectLabel')}</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                        >
                          <SelectTrigger className="w-full bg-muted/30 border-border/50">
                            <SelectValue placeholder={t('contact.subjectPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="general">{t('contact.subjectGeneral')}</SelectItem>
                            <SelectItem value="app-testing">{t('contact.subjectAppTesting')}</SelectItem>
                            <SelectItem value="technical-support">{t('contact.subjectTechnicalSupport')}</SelectItem>
                            <SelectItem value="billing">{t('contact.subjectBilling')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t('contact.messageLabel')}</Label>
                        <Textarea
                          id="message"
                          placeholder={t('contact.messagePlaceholder')}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          style={{ height: '200px' }}
                          className="bg-muted/30 border-border/50 resize-none dark:bg-muted/30 dark:border-border/50"
                        />
                      </div>

                      {recaptchaError && (
                        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>{recaptchaError}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {submitting ? 'Sending...' : t('contact.send')}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t('contact.contactInformation')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {LEGAL_ENTITY_NAME} — {BRAND_NAME}
                  </p>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t('contact.emailField')}</p>
                      <a
                        href={CONTACT_MAILTO}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <Separator className="opacity-50" />

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t('legal.phoneLabel')}</p>
                      <a
                        href={`tel:${SUPPORT_PHONE_TEL}`}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {SUPPORT_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <Separator className="opacity-50" />

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t('contact.responseTime')}</p>
                      <p className="text-sm text-muted-foreground">{t('contact.responseTimeDesc')}</p>
                    </div>
                  </div>

                  <Separator className="opacity-50" />

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t('legal.businessAddressTitle')}</p>
                      {hasBusinessAddress() ? (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {formatBusinessAddress()}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">{t('legal.addressOnRequest')}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-5">
                  <TrustpilotWidget className="w-full" variant="compact" />
                </CardContent>
              </Card>

              {/* Pro Tip Card */}
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-400">{t('contact.proTip')}</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {t('contact.proTipDesc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links Card */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t('contact.quickLinks')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => navigate(link.path)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                    >
                      <link.icon className="h-4 w-4 shrink-0" />
                      {link.label}
                      <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
