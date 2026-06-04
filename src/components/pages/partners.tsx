'use client';

import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Handshake,
  Globe,
  Code,
  Zap,
  MessageSquare,
  CreditCard,
  ArrowRight,
  Star,
  Building2,
  Users,
  Award,
  Mail,
} from 'lucide-react';

const partners = [
  {
    name: 'Google Play Console',
    description: 'Manage closed testing tracks and production rollout steps in Play Console while Fast Testers supplies real human testers—not bots or scripts.',
    icon: Globe,
    gradient: 'from-green-500 to-emerald-600',
    category: 'Integration Partner',
  },
  {
    name: 'Firebase',
    description: 'Optional crash and performance insights your team can review alongside feedback from our manual testers on real Android devices.',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    category: 'Developer Tools',
  },
  {
    name: 'Android Studio',
    description: 'Native integration with Android Studio development tools, enabling direct plugin support for test configuration and deployment.',
    icon: Code,
    gradient: 'from-blue-500 to-cyan-600',
    category: 'Development Tools',
  },
  {
    name: 'GitHub',
    description: 'Coordinate releases and testing milestones with your team. Our closed-testing service remains manual testing by real people.',
    icon: Handshake,
    gradient: 'from-gray-600 to-gray-800',
    category: 'Workflow Integration',
  },
  {
    name: 'Slack',
    description: 'Real-time team notifications for test results, reviewer feedback, and production access milestones directly in your channels.',
    icon: MessageSquare,
    gradient: 'from-purple-500 to-violet-600',
    category: 'Team Notifications',
  },
  {
    name: 'Stripe',
    description: 'Secure payment processing for subscription management, invoicing, and seamless billing integration for enterprise clients.',
    icon: CreditCard,
    gradient: 'from-indigo-500 to-blue-600',
    category: 'Payment Processing',
  },
];

const benefits = [
  {
    titleKey: 'partners.benefitCoMarketing',
    descriptionKey: 'partners.benefitCoMarketingDesc',
    icon: Award,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    titleKey: 'partners.benefitApiAccess',
    descriptionKey: 'partners.benefitApiAccessDesc',
    icon: Code,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    titleKey: 'partners.benefitRevenue',
    descriptionKey: 'partners.benefitRevenueDesc',
    icon: Star,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    titleKey: 'partners.benefitPrioritySupport',
    descriptionKey: 'partners.benefitPrioritySupportDesc',
    icon: Users,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
];

const testimonials = [
  {
    quote: 'partners.testimonial1Quote',
    author: 'partners.testimonial1Author',
    role: 'partners.testimonial1Role',
    company: 'DevStack Solutions',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote: 'partners.testimonial2Quote',
    author: 'partners.testimonial2Author',
    role: 'partners.testimonial2Role',
    company: 'MobileFirst Inc.',
    rating: 5,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    quote: 'partners.testimonial3Quote',
    author: 'partners.testimonial3Author',
    role: 'partners.testimonial3Role',
    company: 'AppVenture Labs',
    rating: 5,
    gradient: 'from-teal-500 to-green-500',
  },
];

export default function PartnersPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Handshake className="h-4 w-4 mr-1.5" />
            Our Partners
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Trusted by Leading{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Companies & Developers
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            We partner with industry leaders to support manual, human-led Google Play
            closed testing—real Android testers who install and use your app, never bots.
          </p>
        </div>
      </section>

      {/* Technology Partners Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-6 border-cyan-400/30 text-cyan-400 bg-cyan-400/10 px-4 py-1.5 text-sm"
            >
              <Building2 className="h-4 w-4 mr-1.5" />
              Technology Partners
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Integrated with the Tools You Love
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Tools many developers already use alongside our manual testing service—from
              Play Console setup to team notifications.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <Card
                  key={partner.name}
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${partner.gradient} shadow-lg shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors truncate">
                          {partner.name}
                        </h3>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {partner.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {partner.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Star className="h-4 w-4 mr-1.5" />
            Become a Partner
          </Badge>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Why Partner with Fast Testers?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Join our growing ecosystem and unlock exclusive benefits designed to
            help your business thrive.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.titleKey}
                className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl ${benefit.bg} shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                        {t(benefit.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Partner Testimonials Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-6 border-cyan-400/30 text-cyan-400 bg-cyan-400/10 px-4 py-1.5 text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              Partner Testimonials
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              What Our Partners Say
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Hear from the companies who have grown alongside us through our
              partnership program.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.company}
                className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-foreground/80 leading-relaxed mb-6 italic">
                    &ldquo;{t(testimonial.quote)}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} shrink-0`}
                    >
                      <span className="text-white text-sm font-bold">
                        {t(testimonial.author).charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {t(testimonial.author)}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {t(testimonial.role)}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <CardContent className="p-8 sm:p-12 text-center relative">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-400/10">
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                Interested in Partnering?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                We&apos;re always looking for innovative companies to join our
                ecosystem. Let&apos;s build something great together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/contact-us')}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                >
                  View Partnership Tiers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
