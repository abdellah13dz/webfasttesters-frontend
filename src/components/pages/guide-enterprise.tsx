'use client';

import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  LayoutDashboard,
  Mail,
  Phone,
  Shield,
  UserCog,
  Users,
  Zap,
  Calendar,
  Award,
  Briefcase,
  Globe,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <UserCog className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Create Your Account',
    description: 'Sign up and set up your agency or company profile in minutes.',
    details: [
      'Create your Fast Testers account',
      'Set up your agency profile with company details',
      'Configure billing and notification preferences',
      'Invite team members to your workspace',
    ],
  },
  {
    number: 2,
    icon: <Briefcase className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Add Client Apps',
    description: 'Submit multiple apps and let volume pricing work in your favor.',
    details: [
      'Submit your first client app in under 2 minutes',
      'Add as many apps as you need — no limits',
      'Volume pricing kicks in automatically at 5+ apps',
      'Each app gets its own testing track and dashboard',
    ],
  },
  {
    number: 3,
    icon: <LayoutDashboard className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Track Progress',
    description: 'Monitor all client apps from a single dashboard with automated reporting.',
    details: [
      'View all client apps on a unified dashboard',
      'Track testing progress, tester counts, and status in real-time',
      'Download automated reports for each client app',
      'Receive notifications when testing milestones are reached',
    ],
  },
];

const benefits = [
  {
    icon: <FileText className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'White-Label Reports',
    description:
      'Download professional testing reports branded with your agency\'s logo and colors. Present them directly to your clients as your own work.',
  },
  {
    icon: <Zap className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Volume Pricing',
    description:
      'The more apps you submit, the less you pay per app. Volume discounts start at just 5 apps, with custom pricing for 10+ apps.',
  },
  {
    icon: <Headphones className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Priority Support',
    description:
      'Skip the queue with priority access to our support team. Get faster responses and dedicated assistance for any issues with your client apps.',
  },
  {
    icon: <UserCog className="size-6 text-blue-600 dark:text-blue-400" />,
    title: 'Dedicated Account Manager',
    description:
      'For agencies with 10+ apps, get a dedicated account manager who understands your business needs and ensures smooth onboarding for every client.',
  },
];

const pricingTiers = [
  {
    range: '1\u20134 apps',
    price: '$15',
    priceNote: 'per app',
    features: [
      '14 professional testers per app',
      '16-day testing period',
      'Production access guarantee',
      'Standard support',
    ],
    highlighted: false,
  },
  {
    range: '5\u20139 apps',
    price: '$12',
    priceNote: 'per app',
    features: [
      'Everything in the standard plan',
      '20% volume discount',
      'Priority support',
      'White-label reports',
    ],
    highlighted: true,
  },
  {
    range: '10+ apps',
    price: 'Custom',
    priceNote: 'contact us',
    features: [
      'Everything in volume plan',
      'Custom pricing',
      'Dedicated account manager',
      'Agency dashboard',
      'SLA guarantees',
    ],
    highlighted: false,
  },
];

export default function GuideEnterprisePage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 dark:from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="border-blue-800 dark:border-blue-950/50 bg-blue-200/50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-[13px] tracking-wider">
              <Building2 className="mr-1 size-3" />
              Enterprise
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              <Clock className="mr-1 size-3" />
              &lt; 10 min setup
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Agency &amp; Enterprise{' '}
            <span className="text-blue-600 dark:text-blue-400">Onboarding Guide</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Everything your agency or company needs to start using Fast Testers for your
            clients&apos; apps.
          </p>

          {/* Timeline */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Zap className="size-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-foreground">3 simple steps</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2">
              <Clock className="size-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-foreground">&lt; 10 min setup</span>
            </div>
          </div>

          {/* Alert */}
          <Alert className="mt-8 border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20">
            <Phone className="size-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200/80 text-sm">
              <strong className="text-blue-900 dark:text-blue-300">Launching multiple client apps?</strong>{' '}
              Book a 30-Minute Call with our founder to discuss your agency needs and get set up
              quickly.
              <button
                onClick={() => navigate('/contact-us')}
                className="ml-1 text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300"
              >
                Book a call →
              </button>
            </AlertDescription>
          </Alert>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(APP_URL)}
            >
              {t('pricing.getStartedNow')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground/80 hover:bg-muted"
              onClick={() => navigate('/contact-us')}
            >
              <Phone className="mr-2 size-4" />
              Book a 30-Minute Call
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              Getting Started
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Onboard in <span className="text-blue-600 dark:text-blue-400">3 Simple Steps</span>
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={step.number} className="border-border bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="flex justify-center -mt-3 mb-3">
                    <ChevronRight className="size-5 text-muted-foreground rotate-90" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            Why Agencies Choose Us
          </Badge>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Built for <span className="text-blue-600 dark:text-blue-400">Agencies</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            We understand the unique needs of agencies managing multiple client apps.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-border bg-card/50 group hover:border-blue-500/20 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-950/30 p-3 w-fit group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-blue-800 dark:border-blue-800 text-blue-600 dark:text-blue-400">
              Agency Pricing
            </Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Volume <span className="text-blue-600 dark:text-blue-400">Discounts</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              The more apps you test, the more you save. Volume pricing starts at 5 apps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative border-border bg-card/50 flex flex-col ${
                  tier.highlighted
                    ? 'border-blue-300 dark:border-blue-500/30 bg-blue-100/50 dark:bg-blue-950/10 ring-1 ring-blue-300/50 dark:ring-blue-500/20'
                    : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white border-0 px-3 text-xs">
                      {t('pricing.mostPopular')}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">{tier.range}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{tier.priceNote}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      tier.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                    onClick={() =>
                      tier.price === 'Custom'
                        ? navigate('/contact-us')
                        : navigate(APP_URL)
                    }
                  >
                    {tier.price === 'Custom' ? 'Contact Sales' : t('common.getStarted')}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-100/50 dark:from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Building2 className="mx-auto mb-6 size-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to Scale Your Agency?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Join hundreds of agencies who trust Fast Testers to handle their client
                app testing. Get started in under 10 minutes, or book a call to discuss your
                specific needs.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  {t('pricing.getStartedNow')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground/80 hover:bg-muted"
                  onClick={() => navigate('/contact-us')}
                >
                  <Calendar className="mr-2 size-4" />
                  Book a 30-Minute Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
