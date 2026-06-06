'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { fetchPublicChangelog, parseChangelogTags, formatChangelogDate } from '@/lib/cms';
import { getCmsIcon } from '@/lib/cms-icons';
import type { ChangelogEntry } from '@/lib/cms';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Zap,
  Bug,
  ArrowRight,
  Mail,
  Rocket,
  Globe,
  Users,
  LayoutDashboard,
  Gift,
} from 'lucide-react';
import { NewsletterSection } from '@/components/newsletter-section';

const changelogEntries = [
  {
    dateKey: 'changelog.entry1Date',
    versionKey: 'changelog.entry1Version',
    titleKey: 'changelog.entry1Title',
    tags: ['newFeature', 'improvement'],
    descriptionKey: 'changelog.entry1Description',
    icon: LayoutDashboard,
  },
  {
    dateKey: 'changelog.entry2Date',
    versionKey: 'changelog.entry2Version',
    titleKey: 'changelog.entry2Title',
    tags: ['newFeature'],
    descriptionKey: 'changelog.entry2Description',
    icon: Globe,
  },
  {
    dateKey: 'changelog.entry3Date',
    versionKey: 'changelog.entry3Version',
    titleKey: 'changelog.entry3Title',
    tags: ['improvement'],
    descriptionKey: 'changelog.entry3Description',
    icon: Zap,
  },
  {
    dateKey: 'changelog.entry4Date',
    versionKey: 'changelog.entry4Version',
    titleKey: 'changelog.entry4Title',
    tags: ['newFeature'],
    descriptionKey: 'changelog.entry4Description',
    icon: Gift,
  },
  {
    dateKey: 'changelog.entry5Date',
    versionKey: 'changelog.entry5Version',
    titleKey: 'changelog.entry5Title',
    tags: ['improvement'],
    descriptionKey: 'changelog.entry5Description',
    icon: Users,
  },
  {
    dateKey: 'changelog.entry6Date',
    versionKey: 'changelog.entry6Version',
    titleKey: 'changelog.entry6Title',
    tags: ['bugFix'],
    descriptionKey: 'changelog.entry6Description',
    icon: Bug,
  },
];

type ChangelogDisplayEntry = {
  date?: string;
  version?: string;
  title?: string;
  description?: string;
  dateKey?: string;
  versionKey?: string;
  titleKey?: string;
  descriptionKey?: string;
  tags: string[];
  icon: typeof Sparkles;
};

const tagConfig: Record<string, { color: string; icon: typeof Sparkles }> = {
  newFeature: { color: 'border-green-500/30 text-green-500 bg-green-500/10', icon: Sparkles },
  improvement: { color: 'border-blue-400/30 text-blue-400 bg-blue-400/10', icon: Zap },
  bugFix: { color: 'border-amber-500/30 text-amber-500 bg-amber-500/10', icon: Bug },
};

export default function ChangelogPage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [entries, setEntries] = useState<ChangelogDisplayEntry[]>(changelogEntries);

  useEffect(() => {
    (async () => {
      const data = await fetchPublicChangelog();
      if (data.length === 0) return;
      setEntries(
        data.map((entry: ChangelogEntry) => ({
          date: formatChangelogDate(entry.publishedAt),
          version: entry.version,
          title: entry.title,
          tags: parseChangelogTags(entry.tags),
          description: entry.description,
          icon: getCmsIcon(entry.icon),
        }))
      );
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Rocket className="h-4 w-4 mr-1" />
            {t('changelog.whatsNewBadge')}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('changelog.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t('changelog.subtitle')}
          </p>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/50 via-blue-400/20 to-transparent" />

          <div className="space-y-8">
            {entries.map((entry, index) => {
              const EntryIcon = entry.icon;
              const date = entry.dateKey ? t(entry.dateKey) : entry.date ?? '';
              const version = entry.versionKey ? t(entry.versionKey) : entry.version ?? '';
              const title = entry.titleKey ? t(entry.titleKey) : entry.title ?? '';
              const description = entry.descriptionKey ? t(entry.descriptionKey) : entry.description ?? '';
              return (
                <div key={index} className="relative pl-14 sm:pl-20">
                  {/* Timeline node */}
                  <div className="absolute left-2.5 sm:left-5 top-4 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 border-4 border-background shadow-lg shadow-blue-500/20" />

                  {/* Date & version label */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-blue-400">{date}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {version}
                    </span>
                  </div>

                  <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <EntryIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                              {title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => {
                                const config = tagConfig[tag];
                                const TagIcon = config.icon;
                                return (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className={`text-xs ${config.color}`}
                                  >
                                    <TagIcon className="h-3 w-3 mr-1" />
                                    {t(`changelog.${tag}`)}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="max-w-lg mx-auto text-center mb-8">
            <Badge
              variant="outline"
              className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Mail className="h-4 w-4 mr-1" />
              {t('changelog.stayUpdatedBadge')}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-2">
              {t('changelog.neverMissUpdate')}
            </h2>
            <p className="text-muted-foreground">
              {t('changelog.newsletterDesc')}
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <NewsletterSection variant="card" />
          </div>
          <div className="text-center mt-8">
            <Button
              onClick={() => navigate(APP_URL)}
              variant="outline"
              size="lg"
              className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 font-semibold px-8 cursor-pointer"
            >
              {t('changelog.getStartedNow')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
