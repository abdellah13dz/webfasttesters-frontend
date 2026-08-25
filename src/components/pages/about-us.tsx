'use client';

import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Star,
  Download,
  Smartphone,
  Shield,
  Users,
  Heart,
  Eye,
  Lightbulb,
  Quote,
  Rocket,
  Target,
  Globe,
  Clock,
  Languages,
  CheckCircle,
  Linkedin,
} from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';


const stats = [
  { labelKey: 'aboutUs.appsPublished', value: '15 testers', icon: Smartphone },
  { labelKey: 'aboutUs.starRating', value: '4.6', icon: Star },
  { labelKey: 'aboutUs.downloads', value: '16 days', icon: Download },
];

const values = [
  {
    titleKey: 'aboutUs.value1Title',
    descriptionKey: 'aboutUs.value1Desc',
    icon: Shield,
  },
  {
    titleKey: 'aboutUs.value2Title',
    descriptionKey: 'aboutUs.value2Desc',
    icon: Target,
  },
  {
    titleKey: 'aboutUs.value3Title',
    descriptionKey: 'aboutUs.value3Desc',
    icon: Eye,
  },
  {
    titleKey: 'aboutUs.value4Title',
    descriptionKey: 'aboutUs.value4Desc',
    icon: Heart,
  },
];

const teamMembers = [
  {
    nameKey: 'aboutUs.teamAlex',
    roleKey: 'aboutUs.teamAlexRole',
    bioKey: 'aboutUs.teamAlexBio',
    initials: 'AB',
    color: 'bg-blue-500',
    linkedin: 'https://www.linkedin.com/in/abdellah-benahmed-03a1601a2/',
  },
  {
    nameKey: 'aboutUs.teamSarah',
    roleKey: 'aboutUs.teamSarahRole',
    bioKey: 'aboutUs.teamSarahBio',
    initials: 'SM',
    color: 'bg-cyan-500',
  },
  {
    nameKey: 'aboutUs.teamDavid',
    roleKey: 'aboutUs.teamDavidRole',
    bioKey: 'aboutUs.teamDavidBio',
    initials: 'DP',
    color: 'bg-blue-500',
  },
  {
    nameKey: 'aboutUs.teamEmma',
    roleKey: 'aboutUs.teamEmmaRole',
    bioKey: 'aboutUs.teamEmmaBio',
    initials: 'EW',
    color: 'bg-cyan-500',
  },
];

const globalStats = [
  {
    statKey: 'aboutUs.countriesStat',
    descKey: 'aboutUs.countriesStatDesc',
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    statKey: 'aboutUs.testersStat',
    descKey: 'aboutUs.testersStatDesc',
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    statKey: 'aboutUs.supportStat',
    descKey: 'aboutUs.supportStatDesc',
    icon: Clock,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    statKey: 'aboutUs.languagesStat',
    descKey: 'aboutUs.languagesStatDesc',
    icon: Languages,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
];

export default function AboutUs() {
  const { navigate, currentPath } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[8%] w-3 h-3 rounded-full bg-blue-400/20 animate-float" />
        <div className="absolute top-28 right-[12%] w-2 h-2 rounded-full bg-cyan-400/20 animate-float-slow" />
        <div className="absolute bottom-20 left-[25%] w-4 h-4 rounded-full bg-blue-400/15 animate-float-delay" />
        <div className="absolute top-40 left-[50%] w-2 h-2 rounded-full bg-cyan-400/25 animate-float" />
        <div className="absolute bottom-12 right-[18%] w-3 h-3 rounded-full bg-blue-400/15 animate-float-slow" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                {t('aboutUs.ourStory')}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('aboutUs.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl">
                {t('aboutUs.subtitle')}
              </p>
            </div>
            {/* Team Illustration */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />
                <img
                  src="/images/illustrations/team-testers.png"
                  alt="Our team of testers"
                  className="relative w-full h-auto rounded-2xl shadow-2xl shadow-blue-500/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection>
        <section className="relative border-y border-border bg-card/50 gradient-bg-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.labelKey} className="text-center hover-scale">
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-400/10">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              {t('aboutUs.ourMission')}
            </Badge>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              {t('aboutUs.missionText')}
            </p>
          </div>

          {/* Quote */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm gradient-border">
              <CardContent className="p-6 sm:p-8">
                <Quote className="h-8 w-8 text-blue-400/30 mx-auto mb-4" />
                <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic leading-relaxed">
                  {t('aboutUs.quote')}
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Values Section */}
      <section className="relative border-t border-border bg-card/50 gradient-bg-section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Heart className="h-4 w-4 mr-1" />
                {t('aboutUs.ourValues')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('aboutUs.whatWeStandFor')}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                {t('aboutUs.valuesDescription')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.titleKey} delay={index * 100}>
                  <Card
                    className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group hover-scale gradient-border overflow-hidden"
                  >
                    <CardContent className="relative p-6 z-10">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-400/10 shrink-0 group-hover:bg-blue-400/20 transition-colors">
                          <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                            {t(value.titleKey)}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {t(value.descriptionKey)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Users className="h-4 w-4 mr-1" />
                {t('aboutUs.ourTeam')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('aboutUs.builtByDevelopers')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member.nameKey} delay={index * 100}>
                <Card
                  className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group hover-scale"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${member.color} text-white text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {member.initials}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                      {t(member.nameKey)}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-400">
                      {t(member.roleKey)}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {t(member.bioKey)}
                    </p>
                    {'linkedin' in member && member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label={`${t(member.nameKey)} LinkedIn`}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 gradient-bg-section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Rocket className="h-4 w-4 mr-1" />
                {t('aboutUs.ourStory')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('aboutUs.fromFrustrationToSolution')}
              </h2>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                {t('aboutUs.storyP1')}
              </p>
              <p>
                {t('aboutUs.storyP2')}
              </p>
              <p>
                {t('aboutUs.storyP3')}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Global Presence Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Globe className="h-4 w-4 mr-1" />
                {t('aboutUs.globalReach')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('aboutUs.servingWorldwide')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {globalStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={stat.statKey} delay={index * 100}>
                  <Card
                    className="border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group hover-scale"
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-blue-400 transition-colors">
                        {t(stat.statKey)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t(stat.descKey)}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
            <Card className="border-blue-400/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-sm">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                  {t('aboutUs.joinDevelopers')}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  {t('aboutUs.ctaDescription')}
                </p>
                <Button
                  onClick={() => goToGetStartedPricing(currentPath, navigate)}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base rounded-xl cursor-pointer"
                >
                  {t('aboutUs.startJourney')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
