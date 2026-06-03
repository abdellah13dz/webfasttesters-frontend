'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Globe,
  LayoutGrid,
  Megaphone,
  Shield,
  Smartphone,
  Store,
  Users,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Rocket,
  ClipboardCheck,
  UserPlus,
  TestTube,
  Send,
  ChevronRight,
} from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <UserPlus className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Create a Google Play Developer Account',
    timeline: '~15 minutes',
    description:
      'Start by creating your Google Play Developer account. This is your gateway to publishing apps on the Play Store.',
    details: [
      'Visit the Google Play Console and sign in with your Google account',
      'Pay the one-time $25 registration fee',
      'Complete your developer profile with your name and contact info',
      'Agree to the Developer Distribution Agreement',
    ],
    tip: 'Use the Google account you want permanently associated with your developer profile. You cannot change it later.',
    link: { label: 'Register at Google Play Console', url: 'https://play.google.com/console' },
  },
  {
    number: 2,
    icon: <LayoutGrid className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Set Up Your App Listing',
    timeline: '~1-2 hours',
    description:
      'Create your app in the Play Console and fill in all the essential listing information that users will see.',
    details: [
      'Create a new app in the Play Console',
      'Add your app name (max 30 characters)',
      'Write a compelling short description (max 80 characters)',
      'Write a full description (max 4000 characters)',
      'Upload app icon (512x512 PNG), feature graphic (1024x500), and screenshots',
      'Select your app category and tags',
    ],
    tip: 'Invest time in your screenshots and feature graphic — they significantly impact your conversion rate. Use high-quality images showing real app functionality.',
    link: null,
  },
  {
    number: 3,
    icon: <ClipboardCheck className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Prepare Store Listing',
    timeline: '~30-60 minutes',
    description:
      'Complete the required questionnaires and declarations for your app to be eligible for distribution.',
    details: [
      'Complete the Content Rating questionnaire (IARC) — required for all apps',
      'Fill out the Data Safety form — declare what user data your app collects',
      'Select your target audience and content settings',
      'Set pricing and distribution countries',
      'Add privacy policy URL (required if your app collects any data)',
    ],
    tip: 'Be accurate with the Data Safety form. Google can remove apps with incorrect declarations. When in doubt, declare that you collect the data.',
    link: null,
  },
  {
    number: 4,
    icon: <TestTube className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Set Up Closed Testing',
    timeline: '14 days minimum',
    description:
      'New personal accounts must run closed testing with at least 12 testers for 14 consecutive days before applying for production access.',
    details: [
      'Create a closed testing track in the Play Console',
      'Upload your app bundle (AAB) or APK to the testing track',
      'Add testers via email lists or Google Groups',
      'Ensure at least 12 testers install and actively use your app',
      'Wait 14 consecutive days with testers remaining active',
      'Respond to tester feedback and address any reported issues',
    ],
    tip: 'Use our professional testing service to get 14 guaranteed testers who stay for the full period. This eliminates the risk of testers dropping off and having to restart.',
    link: { label: 'Get 14 Professional Testers', url: null, internal: APP_URL },
  },
  {
    number: 5,
    icon: <Send className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Apply for Production Access',
    timeline: '3-7 days review',
    description:
      'After successfully completing closed testing, submit your app for review to gain production access.',
    details: [
      'Go to the Production section in your Play Console',
      'Click "Start rollout to Production"',
      'Review and confirm your app details',
      'Submit for Google\'s review process',
      'Wait for approval — typically 3-7 days for new accounts',
    ],
    tip: 'Make sure your closed testing data shows genuine engagement. Google reviews the quality of your testing period before granting production access.',
    link: null,
  },
  {
    number: 6,
    icon: <Rocket className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Publish Your App',
    timeline: 'Immediate after approval',
    description:
      'Once approved, your app is live on the Google Play Store for billions of users to discover and download.',
    details: [
      'After approval, your app goes live on the Play Store',
      'Your app becomes searchable and discoverable',
      'You can now manage updates, track analytics, and respond to reviews',
      'Consider promoting your app through various channels',
    ],
    tip: 'The first 30 days after launch are critical. Monitor reviews closely, fix bugs quickly, and iterate based on user feedback to improve your ratings.',
    link: null,
  },
];

export default function GuidePublishPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <BookOpen className="mr-1 size-3" />
              Step-by-Step Guide
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              Updated April 2026
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How to Publish an App on{' '}
            <span className="text-blue-600 dark:text-blue-400">Google Play Store</span>{' '}
            <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl">(2026 Guide)</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
            A straightforward, step-by-step guide to getting your Android app live on the Play Store.
          </p>

          {/* Timeline */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">New Personal Accounts</p>
                <p className="text-sm font-medium text-foreground">2\u20133 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Organizations</p>
                <p className="text-sm font-medium text-foreground">3\u20137 days</p>
              </div>
            </div>
          </div>

          {/* Alert */}
          <Alert className="mt-8 border-amber-300 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30">
            <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200/80 text-sm">
              <strong className="text-amber-900 dark:text-amber-300">New Personal Account? You Need Testers First.</strong>{' '}
              If your account was created after November 2023, you must run closed testing with 12+
              testers for 14 days before publishing.{' '}
              <button
                onClick={() => navigate(APP_URL)}
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-300"
              >
                Get testers now
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/guide-publish.png"
          alt="How to Publish an App on Google Play Store"
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {steps.map((step) => (
            <Card
              key={step.number}
              className={`border-border bg-card/50 transition-colors ${
                expandedStep === step.number ? 'border-blue-500/30 bg-card/50' : ''
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() =>
                  setExpandedStep(expandedStep === step.number ? null : step.number)
                }
                className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30 text-lg font-bold text-blue-600 dark:text-blue-400">
                  {step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs text-muted-foreground">{step.timeline}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1">
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block">{step.icon}</div>
                  <ChevronDown
                    className={`size-5 text-muted-foreground transition-transform ${
                      expandedStep === step.number ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Step Content */}
              {expandedStep === step.number && (
                <div className="border-t border-border px-5 sm:px-6 pb-6 pt-5">
                  <p className="text-foreground/80 leading-relaxed mb-5">{step.description}</p>

                  {/* Checklist */}
                  <div className="rounded-xl bg-muted border border-border/50 p-5 mb-5">
                    <h4 className="text-sm font-semibold text-foreground/80 mb-3">What you need to do:</h4>
                    <ul className="space-y-2.5">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tip */}
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="size-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Pro Tip
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{step.tip}</p>
                  </div>

                  {/* Link */}
                  {step.link && (
                    <div>
                      {step.link.internal ? (
                        <Button
                          onClick={() => navigate(step.link.internal!)}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {step.link.label}
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      ) : (
                        <a
                          href={step.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                        >
                          {step.link.label}
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400">
                ✓
              </span>
              <span className="text-sm font-medium text-foreground/80">Typical Timeline</span>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center gap-1.5 rounded-lg bg-muted p-3 text-center"
              >
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{step.number}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{step.timeline}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                Need Testers? Get 14 Professional Testers for $15
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Skip the hassle of finding testers yourself. Our professional testing service
                guarantees 14 testers who stay for the full 14-day period, with comprehensive
                feedback and a production access guarantee.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  Get 14 Testers for $15
                  <ArrowRight className="ml-2 size-4" />
                </Button>

              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                One-time payment &middot; No subscriptions &middot; 100% money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
