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
  Shield,
  UserCheck,
  Eye,
  Database,
  Lock,
  Cookie,
  Mail,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    items: [
      {
        subtitle: 'Personal Information',
        description:
          'When you create an account or use our Services, we collect personal information such as your name, email address, and payment information. This information is necessary to provide our Services and communicate with you.',
      },
      {
        subtitle: 'App Testing Data',
        description:
          'When you submit an app for testing, we collect information related to the testing process, including app package names, testing links, tester feedback, and testing results. This data is used solely for the purpose of providing our testing services.',
      },
      {
        subtitle: 'Usage Data',
        description:
          'We may also collect certain technical information when you use our Services, including your IP address, browser type, device information, pages visited, and the dates and times of your visits. This information helps us understand how our Services are being used and improve the user experience.',
      },
    ],
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    items: [
      {
        subtitle: 'Provide Testing Services',
        description:
          'We use your personal information to deliver the app testing services you have requested, including assigning testers, collecting feedback, and communicating results.',
      },
      {
        subtitle: 'Improve Our Services',
        description:
          'We analyze usage data to understand how our Services are being used, identify trends, and make improvements to our platform, features, and user experience.',
      },
      {
        subtitle: 'Communication',
        description:
          'We use your email address to send you service-related notifications, testing updates, and important account information. We will not send you marketing emails without your explicit consent.',
      },
    ],
  },
  {
    icon: UserCheck,
    title: 'Data Sharing',
    items: [
      {
        subtitle: 'We Don\'t Sell Your Data',
        description:
          'We do not sell, rent, or trade your personal information to third parties. Your data is yours, and we respect that.',
      },
      {
        subtitle: 'Sharing with Testers',
        description:
          'We share your app testing link and relevant app information with assigned testers solely for the purpose of conducting testing services. Testers are bound by confidentiality agreements and are prohibited from sharing your app information with third parties.',
      },
      {
        subtitle: 'Service Providers',
        description:
          'We may share limited information with trusted third-party service providers who assist us in operating our platform and processing payments (e.g., Stripe for payment processing). These providers are contractually obligated to protect your data.',
      },
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    items: [
      {
        subtitle: 'Encryption',
        description:
          'We use industry-standard encryption (SSL/TLS) to protect data transmitted between your device and our servers. Sensitive information such as payment details is encrypted at rest.',
      },
      {
        subtitle: 'Secure Servers',
        description:
          'Our infrastructure is hosted on secure cloud servers with robust access controls, firewalls, and intrusion detection systems. Access to personal data is restricted to authorized personnel only.',
      },
      {
        subtitle: 'Regular Audits',
        description:
          'We conduct regular security audits and vulnerability assessments to identify and address potential security risks. We stay up to date with the latest security best practices and industry standards.',
      },
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Your Rights',
    items: [
      {
        subtitle: 'Access Your Data',
        description:
          'You have the right to request a copy of the personal information we hold about you. We will provide this information within 30 days of receiving your request.',
      },
      {
        subtitle: 'Delete Your Data',
        description:
          'You have the right to request the deletion of your personal information. Upon verification of your identity, we will delete your data from our active systems within 30 days, except where retention is required by law.',
      },
      {
        subtitle: 'Modify Your Data',
        description:
          'You have the right to request corrections to any inaccurate or incomplete personal information we hold about you. You can update most of your information directly through your account settings.',
      },
    ],
  },
  {
    icon: Cookie,
    title: 'Cookies',
    items: [
      {
        subtitle: 'Essential Cookies Only',
        description:
          'We use only essential cookies that are necessary for the operation of our Services. These cookies enable core functionality such as authentication, security, and session management.',
      },
      {
        subtitle: 'No Tracking Cookies',
        description:
          'We do not use tracking cookies, advertising cookies, or third-party analytics cookies. We respect your privacy and believe in minimal data collection.',
      },
      {
        subtitle: 'Cookie Management',
        description:
          'You can control and manage cookies through your browser settings. Please note that disabling essential cookies may affect the functionality of our Services.',
      },
    ],
  },
];

function PrivacyPageContent() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Shield className="mr-1 h-3 w-3" />
              Your Privacy Matters
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('footer.privacyPolicy')}
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: 1st April 2025
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">GDPR Compliant</span>
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

        {/* Intro */}
        <Card className="border-border/50 bg-card/50 mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              At Fast Testers, we are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy explains how we collect, use,
              share, and protect your data when you use our Services. We comply with the General Data
              Protection Regulation (GDPR) and are dedicated to transparency in our data practices.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mt-1.5">
                    {index + 1}. {section.title}
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  {section.items.map((item, pIndex) => (
                    <div key={pIndex}>
                      <h3 className="text-sm font-medium text-blue-400 mb-1">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
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
                    If you have any questions about this Privacy Policy or wish to exercise your data
                    rights, please contact our Data Protection Officer:
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

export default function PrivacyPage() {
  return (
    <CmsPageOrFallback slug="privacy-policy" badge="Privacy Policy">
      <PrivacyPageContent />
    </CmsPageOrFallback>
  );
}
