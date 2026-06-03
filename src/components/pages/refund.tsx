'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Shield,
  CheckCircle2,
  CreditCard,
  Mail,
  Clock,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

export default function RefundPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Shield className="mr-1 h-3 w-3" />
              Your Investment is Protected
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.refundPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: 1st April 2025
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{t('home.productionAccessGuarantee')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        {/* Production Access Guarantee Highlight */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400 mb-2">
                  {t('home.productionAccessGuarantee')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are so confident in our testing service that we offer a full refund if Google
                  rejects your app after you have used our service. If your app meets Google
                  Play&apos;s basic requirements and has completed our full testing period, but still
                  gets rejected, we&apos;ll refund your entire $15 payment — no questions asked.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Eligibility for Refund */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  1. Eligibility for Refund
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be eligible for a refund under our Production Access Guarantee, you must meet
                  the following criteria:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      You must have used our paid testing service for the app in question
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      Your app must meet Google Play&apos;s basic requirements and content policies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      The full testing period (14-16 days) must have been completed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      You must have addressed all critical feedback provided by our testers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      The refund request must be submitted within 30 days of testing period completion
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How to Request a Refund */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  2. How to Request a Refund
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To request a refund, please follow these steps:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Email us at{' '}
                      <a
                        href="mailto:contact@fasttesters.com"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        contact@fasttesters.com
                      </a>{' '}
                      with the subject line &quot;Refund Request&quot;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                      2
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Include your app package name (e.g., com.yourcompany.yourapp)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                      3
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Include the Google Play rejection notice or details about the rejection reason
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                      4
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Provide the email address associated with your Fast Testers account
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refund Timeline */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  3. Refund Timeline
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once we receive your refund request, we follow this timeline:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Review:</strong> We will review your request within 1-2 business days
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Confirmation:</strong> You will receive an email confirmation once your refund is approved
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Processing:</strong> Refunds are processed within 5-7 business days from approval
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Refund Method:</strong> Refunds are issued to the original payment method used during purchase
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Non-Refundable Items */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1.5">
                  4. Non-Refundable Items
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Refunds will not be issued in the following circumstances:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-muted-foreground">
                      Apps that have been rejected due to Google Play policy violations (e.g., inappropriate content, spam, impersonation)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-muted-foreground">
                      Apps that do not meet Google Play&apos;s basic technical requirements (e.g., crashes on launch, missing core functionality)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-muted-foreground">
                      Refund requests submitted more than 30 days after the testing period completion
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-muted-foreground">
                      Apps where critical tester feedback was not addressed before submission to Google Play
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-400 mb-2">5. Contact</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    If you have any questions about our Refund Policy or need assistance with a refund
                    request, please don&apos;t hesitate to contact us:
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
            onClick={() => navigate('/terms')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.termsAndConditions')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/privacy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.privacyPolicy')}
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
