'use client';

import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  HelpCircle,
  MessageCircle,
  AlertTriangle,
  Info,
  DollarSign,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Rocket,
  Settings,
  Users,
  Lock,
  Upload,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { AppSetupGuideCta } from '@/components/app-setup-guide-cta';
import { AnimatedSection } from '@/components/animated-section';


export default function SupportPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const faqQuestions = [
    t('support.q1'),
    t('support.q2'),
    t('support.q3'),
    t('support.q4'),
  ];

  const guideCards = [
    {
      icon: Rocket,
      titleKey: 'support.guideGettingStarted',
      descKey: 'support.guideGettingStartedDesc',
      path: '/how-it-works',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      popular: true,
    },
    {
      icon: Settings,
      titleKey: 'support.guideSetup',
      descKey: 'support.guideSetupDesc',
      path: '/google-play-setup-guide',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      popular: false,
    },
    {
      icon: Users,
      titleKey: 'support.guide12Testers',
      descKey: 'support.guide12TestersDesc',
      path: '/google-play-12-testers',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      popular: false,
    },
    {
      icon: Lock,
      titleKey: 'support.guideClosedTesting',
      descKey: 'support.guideClosedTestingDesc',
      path: '/blog/google-play-closed-testing',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      popular: false,
    },
    {
      icon: AlertTriangle,
      titleKey: 'support.guideAppRejection',
      descKey: 'support.guideAppRejectionDesc',
      path: '/blog/app-rejected-google-play',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      popular: false,
    },
    {
      icon: Upload,
      titleKey: 'support.guidePublishApp',
      descKey: 'support.guidePublishAppDesc',
      path: '/blog/publish-app-google-play',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      popular: false,
    },
  ];

  const helpLinks = [
    {
      icon: AlertTriangle,
      label: t('support.appRejected'),
      description: t('support.appRejectedDesc'),
      path: '/blog/app-rejected-google-play',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      icon: Info,
      label: t('support.howItWorks'),
      description: t('support.howItWorksDesc'),
      path: '/how-it-works',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: DollarSign,
      label: t('support.pricing'),
      description: t('support.pricingDesc'),
      path: '/pricing',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Phone,
      label: t('support.contactUs'),
      description: t('support.contactUsDesc'),
      path: '/contact-us',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Floating dots/particles */}
        <div className="absolute top-16 left-[15%] h-2 w-2 rounded-full bg-blue-400/30 animate-float" />
        <div className="absolute top-32 right-[20%] h-3 w-3 rounded-full bg-cyan-400/20 animate-float-delayed" />
        <div className="absolute bottom-20 left-[25%] h-1.5 w-1.5 rounded-full bg-blue-400/25 animate-float-slow" />
        <div className="absolute top-24 left-[45%] h-2.5 w-2.5 rounded-full bg-blue-300/20 animate-float" />
        <div className="absolute bottom-16 right-[35%] h-2 w-2 rounded-full bg-cyan-400/15 animate-float-delayed" />
        <div className="absolute top-40 left-[70%] h-1.5 w-1.5 rounded-full bg-blue-400/20 animate-float-slow" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text on left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
              >
                <Shield className="mr-1 h-3 w-3" />
                {t('support.badge')}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('support.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('support.title').split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                {t('support.subtitle')}
              </p>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/support-center.png"
                alt="Support Center"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Cards */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {/* Email Support Card */}
            <Card className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover-scale">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-blue-500/5 transition-all group-hover:bg-blue-500/10" />
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-br-full" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t('support.emailSupport')}</CardTitle>
                    <CardDescription>{t('support.directAssistance')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('support.emailSupportDesc')}
                </p>
                <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">{t('support.emailUs')}</span>
                  </div>
                  <a
                    href="mailto:contact@fasttesters.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    contact@fasttesters.com
                  </a>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-blue-400 font-medium">{t('support.proTip')}</span> {t('support.proTipDesc')}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/contact-us')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t('support.sendEmail')}
                </Button>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover-scale">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-blue-500/5 transition-all group-hover:bg-blue-500/10" />
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-br-full" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t('support.faq')}</CardTitle>
                    <CardDescription>{t('support.instantAnswers')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('support.faqDesc')}
                </p>
                <div className="space-y-3">
                  {faqQuestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => navigate('/faq')}
                      className="flex w-full items-center gap-3 rounded-lg border border-border/50 bg-muted/20 px-4 py-3 text-left text-sm text-muted-foreground hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-foreground transition-all"
                    >
                      <HelpCircle className="h-4 w-4 text-blue-400 shrink-0" />
                      {question}
                      <ArrowRight className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => navigate('/faq')}
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {t('support.viewAllFaqs')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Knowledge Base Section */}
      <AnimatedSection delay={100}>
        <section className="relative grid-pattern mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <BookOpen className="mr-1 h-3 w-3" />
              {t('support.knowledgeBase')}
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t('support.quickStartGuides')}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Step-by-step guides to help you navigate the app testing process
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guideCards.map((guide) => (
              <button
                key={guide.path}
                onClick={() => navigate(guide.path)}
                className="card-hover group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-card/50 p-6 text-left transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover-scale overflow-hidden"
              >
                {/* Decorative accent border at top */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                {guide.popular && (
                  <Badge className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] px-2 py-0.5 border-0">
                    <TrendingUp className="mr-1 h-2.5 w-2.5" />
                    Popular
                  </Badge>
                )}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${guide.bg} ${guide.color}`}>
                  <guide.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                    {t(guide.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(guide.descKey)}</p>
                </div>
                <ArrowRight className="mt-auto h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Response Time Banner */}
      <AnimatedSection delay={200}>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center animate-glow-pulse">
            <div className="flex items-center justify-center gap-2 mb-2">
              {/* Animated pulse dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400" />
              </span>
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="font-semibold text-blue-400">{t('support.fastResponseTime')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('support.responseTimeDesc')}
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Additional Help Links */}
      <AnimatedSection delay={300}>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t('support.needMoreHelp').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('support.needMoreHelp').split(' ').slice(-1)[0].replace(/[!?]$/, '')}</span>{t('support.needMoreHelp').match(/[!?]$/)?.[0] || ''}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('support.exploreResources')}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {helpLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-6 text-center transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover-scale"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${link.bg} ${link.color}`}>
                  <link.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <Separator className="mx-auto max-w-7xl" />

      <AppSetupGuideCta trackingId="support_setup_guide" />

      {/* CTA Section */}
      <AnimatedSection delay={400}>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('support.stillNeedHelp')}</h2>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              {t('support.stillNeedHelpDesc')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/contact-us')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('support.contactUs')}
              </Button>
              <Button
                onClick={() => navigate('/faq')}
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 px-8"
              >
                {t('support.browseFaq')}
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
