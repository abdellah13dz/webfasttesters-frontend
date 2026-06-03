'use client';

import React from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { CmsPageOrFallback } from '@/lib/hooks/use-cms-page';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Scale,
  Users,
  CreditCard,
  Shield,
  Brain,
  AlertTriangle,
  Ban,
  Gavel,
  Mail,
  ArrowLeft,
} from 'lucide-react';

const sections = [
  {
    icon: Scale,
    title: 'Legally Binding Agreement',
    content: [
      'Welcome to Fast Testers. By accessing or using our website, mobile application, or any related services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms").',
      'If you do not agree to these Terms, you must not use our Services. These Terms constitute a legally binding agreement between you ("User", "you", or "your") and Fast Testers ("we", "us", or "our").',
      'We reserve the right to modify these Terms at any time. Continued use of the Services after any such changes constitutes your acceptance of the new Terms.',
    ],
  },
  {
    icon: FileText,
    title: 'Definitions',
    content: [
      '"Services" refers to the app testing and quality assurance services provided by Fast Testers, including but not limited to professional app testing, feedback collection, and production access support.',
      '"User" refers to any individual or entity that accesses or uses the Services, including developers who submit apps for testing and testers who participate in testing programs.',
      '"App" refers to any mobile application submitted to Fast Testers for testing purposes.',
      '"Testing Period" refers to the 14-16 day duration during which assigned testers evaluate and test a submitted app.',
      '"Production Access Guarantee" refers to our commitment to provide a full refund if Google Play rejects your app after completing our testing service.',
    ],
  },
  {
    icon: Users,
    title: 'Services Description',
    content: [
      'Fast Testers provides professional app testing services designed to help developers meet Google Play Store\'s testing requirements for production access.',
      'Our core service includes assigning 14 professional testers to evaluate your app over a 14-16 day testing period. Testers will install, use, and provide feedback on your application.',
      'We strive to begin tester assignment within 6 hours of payment confirmation, though actual timing may vary based on demand and app complexity.',
      'We reserve the right to refuse service to any app that contains illegal content, malware, or violates Google Play Store policies.',
    ],
  },
  {
    icon: Users,
    title: 'User Accounts',
    content: [
      'To use certain features of our Services, you must create an account. You are responsible for maintaining the confidentiality of your account credentials.',
      'You must provide accurate, current, and complete information during the registration process and keep your account information updated.',
      'You are responsible for all activities that occur under your account. If you suspect unauthorized use of your account, you must notify us immediately.',
      'We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent purposes.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    content: [
      'Our standard service fee is $15 per app, charged as a one-time payment. There are no recurring charges or hidden fees.',
      'All payments are processed securely through Stripe. We do not store your credit card information on our servers.',
      'Payment is required in full before testing services commence. No partial payments or installments are accepted.',
      'Prices are subject to change with notice. Any price changes will apply to new orders only and will not affect existing orders.',
      'All fees are quoted in US Dollars (USD). Currency conversion charges, if applicable, are the responsibility of the user.',
    ],
  },
  {
    icon: Shield,
    title: 'Production Access Guarantee',
    content: [
      'We offer a Production Access Guarantee: if Google Play rejects your app after you have completed our full testing service, we will provide a full refund of the $15 service fee.',
      'To qualify for the guarantee, you must have completed the full testing period and addressed all critical feedback provided by our testers.',
      'Refund requests must be submitted within 30 days of the testing period completion and must include the Google Play rejection notice.',
      'This guarantee does not apply to apps rejected due to policy violations, content guideline breaches, or issues unrelated to testing requirements.',
    ],
  },
  {
    icon: Brain,
    title: 'Intellectual Property',
    content: [
      'All content, features, and functionality of our website and Services, including but not limited to text, graphics, logos, and software, are the exclusive property of Fast Testers.',
      'You retain all intellectual property rights to your app. We do not claim any ownership or rights to your app, code, or content submitted for testing.',
      'Our testers agree to maintain confidentiality regarding your app and its contents. However, we cannot guarantee absolute confidentiality and recommend not submitting apps containing highly sensitive trade secrets.',
      'You grant us a limited, non-exclusive license to distribute your app to assigned testers for the sole purpose of conducting testing services.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: [
      'Fast Testers provides testing services on an "as is" and "as available" basis. We do not guarantee that our services will result in Google Play approval.',
      'We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.',
      'Our total liability for any claims arising from the Services shall not exceed the amount you paid for the specific service in question.',
      'We are not responsible for any loss of data, revenue, or business opportunities resulting from your use of the Services.',
      'We are not liable for delays or failures in performance resulting from circumstances beyond our reasonable control (force majeure).',
    ],
  },
  {
    icon: Ban,
    title: 'Termination',
    content: [
      'We reserve the right to terminate or suspend your account and access to the Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or our business.',
      'You may terminate your account at any time by contacting us at contact@fasttesters.com.',
      'Upon termination, your right to use the Services will immediately cease. Provisions of these Terms that by their nature should survive termination shall remain in effect.',
      'We are not liable for any damages or losses resulting from account termination.',
    ],
  },
  {
    icon: Gavel,
    title: 'Governing Law',
    content: [
      'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Fast Testers is registered, without regard to its conflict of law provisions.',
      'Any disputes arising from these Terms or the Services shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the exclusive jurisdiction of the courts in the applicable jurisdiction.',
    ],
  },
];

function TermsPageContent() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
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
              {t('footer.termsAndConditions')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: 1st April 2025
            </p>
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

        {/* Intro */}
        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              Please read these Terms and Conditions carefully before using the services provided by
              Fast Testers. By using our services, you acknowledge that you have read, understood,
              and agree to be bound by these terms.
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
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
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
                    If you have any questions about these Terms and Conditions, please contact us:
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
            onClick={() => navigate('/privacy')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.privacyPolicy')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/refund')}
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 cursor-pointer"
          >
            {t('footer.refundPolicy')}
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

export default function TermsPage() {
  return (
    <CmsPageOrFallback slug="terms-and-conditions" badge="Terms & Conditions">
      <TermsPageContent />
    </CmsPageOrFallback>
  );
}
