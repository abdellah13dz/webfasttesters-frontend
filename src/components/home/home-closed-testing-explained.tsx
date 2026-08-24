'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMMUNITY_URL } from '@/lib/app-urls';
import { useRouter } from '@/lib/router';
import { useAnalytics } from '@/lib/analytics';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';

type Chapter = {
  id: string;
  index: number;
  navLabel: string;
  pillLabel: string;
  title: string;
  body: React.ReactNode;
};

function RuleAtAGlance({ t }: { t: (key: string) => string }) {
  return (
    <div className="my-6 rounded-xl border border-blue-200/80 bg-blue-50/90 dark:border-blue-500/25 dark:bg-blue-500/10 p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground mb-3">
            {t('closedTestingGuide.ruleHeading')}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white"
                aria-hidden
              >
                <User className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
          <p className="text-lg font-bold text-foreground">{t('closedTestingGuide.testersTitle')}</p>
          <p className="text-sm text-muted-foreground">{t('closedTestingGuide.testersSub')}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-transparent select-none sm:invisible mb-3">
            spacer
          </p>
          <div className="grid grid-cols-7 gap-1 mb-3 max-w-[200px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded bg-blue-600/90 text-[10px] font-semibold text-white"
              >
                {i + 1}
              </span>
            ))}
          </div>
          <p className="text-lg font-bold text-foreground">{t('closedTestingGuide.daysTitle')}</p>
          <p className="text-sm text-muted-foreground">{t('closedTestingGuide.daysSub')}</p>
        </div>
      </div>
      <div className="mt-6 pt-5 border-t border-blue-200/70 dark:border-blue-500/20">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground mb-3">
          {t('closedTestingGuide.serviceHeading')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white"
                  aria-hidden
                >
                  <User className="h-3.5 w-3.5" />
                </span>
              ))}
            </div>
            <p className="text-lg font-bold text-foreground">{t('closedTestingGuide.serviceTestersTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('closedTestingGuide.serviceTestersSub')}</p>
          </div>
          <div>
            <div className="grid grid-cols-8 gap-1 mb-3 max-w-[230px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded bg-blue-600/90 text-[10px] font-semibold text-white"
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <p className="text-lg font-bold text-foreground">{t('closedTestingGuide.serviceDaysTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('closedTestingGuide.serviceDaysSub')}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/google-play-12-testers" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.twelveTesters')}
        </Link>
        {' · '}
        <Link href="/google-play-14-day-testing" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.fourteenDayTesting')}
        </Link>
        {' · '}
        <Link href="/google-play-testing-service" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.testingService')}
        </Link>
        {' · '}
        <Link href="/android-app-testers" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.androidTesters')}
        </Link>
        {' · '}
        <Link href="/google-play-production-access-12-testers" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.productionAccess')}
        </Link>
        {' · '}
        <Link href="/resources/google-play-checklist" className="text-blue-600 hover:underline dark:text-blue-400">
          {t('header.checklist')}
        </Link>
      </p>
    </div>
  );
}

function PlayConsoleChecklist({ t }: { t: (key: string) => string }) {
  const items = [
    { done: true, text: t('closedTestingGuide.checklist1') },
    { done: true, text: t('closedTestingGuide.checklist2') },
    { done: false, text: t('closedTestingGuide.checklist3') },
  ];
  return (
    <div className="my-6 space-y-3">
      <p className="text-sm font-medium text-foreground">{t('closedTestingGuide.checklistIntro')}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 text-sm">
            {item.done ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" aria-hidden />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" aria-hidden />
            )}
            <span
              className={cn(
                'text-muted-foreground leading-relaxed',
                item.done && 'line-through decoration-muted-foreground/60'
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildChapters(t: (key: string) => string): Chapter[] {
  const p = (key: string) => (
    <p className="text-muted-foreground leading-relaxed mb-4">{t(key)}</p>
  );
  const pLast = (key: string) => (
    <p className="text-muted-foreground leading-relaxed">{t(key)}</p>
  );

  return [
    {
      id: 'requirement',
      index: 1,
      navLabel: t('closedTestingGuide.ch1.nav'),
      pillLabel: t('closedTestingGuide.ch1.pill'),
      title: t('closedTestingGuide.ch1.title'),
      body: (
        <>
          {p('closedTestingGuide.ch1.p1')}
          <RuleAtAGlance t={t} />
          <PlayConsoleChecklist t={t} />
          {pLast('closedTestingGuide.ch1.p2')}
        </>
      ),
    },
    {
      id: 'why-google',
      index: 2,
      navLabel: t('closedTestingGuide.ch2.nav'),
      pillLabel: t('closedTestingGuide.ch2.pill'),
      title: t('closedTestingGuide.ch2.title'),
      body: (
        <>
          {p('closedTestingGuide.ch2.p1')}
          <ul className="space-y-2 text-sm text-muted-foreground list-disc ps-5 mb-4">
            <li>{t('closedTestingGuide.ch2.li1')}</li>
            <li>{t('closedTestingGuide.ch2.li2')}</li>
            <li>{t('closedTestingGuide.ch2.li3')}</li>
          </ul>
          {pLast('closedTestingGuide.ch2.p2')}
        </>
      ),
    },
    {
      id: 'who-we-are',
      index: 3,
      navLabel: t('closedTestingGuide.ch3.nav'),
      pillLabel: t('closedTestingGuide.ch3.pill'),
      title: t('closedTestingGuide.ch3.title'),
      body: (
        <>
          {p('closedTestingGuide.ch3.p1')}
          {p('closedTestingGuide.ch3.p2')}
          {pLast('closedTestingGuide.ch3.p3')}
        </>
      ),
    },
    {
      id: 'free-or-managed',
      index: 4,
      navLabel: t('closedTestingGuide.ch4.nav'),
      pillLabel: t('closedTestingGuide.ch4.pill'),
      title: t('closedTestingGuide.ch4.title'),
      body: (
        <>
          {p('closedTestingGuide.ch4.p1')}
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="font-semibold text-foreground mb-2">{t('closedTestingGuide.ch4.freeTitle')}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('closedTestingGuide.ch4.freeDesc')}
              </p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
              <p className="font-semibold text-foreground mb-2">
                {t('closedTestingGuide.ch4.managedTitle')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('closedTestingGuide.ch4.managedDesc')}
              </p>
            </div>
          </div>
          {pLast('closedTestingGuide.ch4.p2')}
        </>
      ),
    },
    {
      id: 'plans',
      index: 5,
      navLabel: t('closedTestingGuide.ch5.nav'),
      pillLabel: t('closedTestingGuide.ch5.pill'),
      title: t('closedTestingGuide.ch5.title'),
      body: (
        <>
          {p('closedTestingGuide.ch5.p1')}
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{t(`closedTestingGuide.ch5.li${n}`)}</span>
              </li>
            ))}
          </ul>
          {pLast('closedTestingGuide.ch5.p2')}
        </>
      ),
    },
    {
      id: 'timeline',
      index: 6,
      navLabel: t('closedTestingGuide.ch6.nav'),
      pillLabel: t('closedTestingGuide.ch6.pill'),
      title: t('closedTestingGuide.ch6.title'),
      body: (
        <>
          <ol className="space-y-4 my-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n} className="flex gap-3">
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 w-20 pt-0.5">
                  {t(`closedTestingGuide.ch6.step${n}Label`)}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {t(`closedTestingGuide.ch6.step${n}Text`)}
                </span>
              </li>
            ))}
          </ol>
          {pLast('closedTestingGuide.ch6.p2')}
        </>
      ),
    },
    {
      id: 'real-testers',
      index: 7,
      navLabel: t('closedTestingGuide.ch7.nav'),
      pillLabel: t('closedTestingGuide.ch7.pill'),
      title: t('closedTestingGuide.ch7.title'),
      body: (
        <>
          {p('closedTestingGuide.ch7.p1')}
          {p('closedTestingGuide.ch7.p2')}
          {pLast('closedTestingGuide.ch7.p3')}
        </>
      ),
    },
    {
      id: 'what-you-get',
      index: 8,
      navLabel: t('closedTestingGuide.ch8.nav'),
      pillLabel: t('closedTestingGuide.ch8.pill'),
      title: t('closedTestingGuide.ch8.title'),
      body: (
        <>
          <ul className="space-y-3 text-sm text-muted-foreground mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">
                    {t(`closedTestingGuide.ch8.item${n}Title`)}
                  </strong>{' '}
                  — {t(`closedTestingGuide.ch8.item${n}Desc`)}
                </span>
              </li>
            ))}
          </ul>
          {pLast('closedTestingGuide.ch8.p1')}
        </>
      ),
    },
    {
      id: 'why-choose-us',
      index: 9,
      navLabel: t('closedTestingGuide.ch9.nav'),
      pillLabel: t('closedTestingGuide.ch9.pill'),
      title: t('closedTestingGuide.ch9.title'),
      body: (
        <>
          {p('closedTestingGuide.ch9.p1')}
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border/60 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground"> </th>
                  <th className="p-3 font-semibold text-blue-600">{t('closedTestingGuide.ch9.colFt')}</th>
                  <th className="p-3 font-medium text-muted-foreground">
                    {t('closedTestingGuide.ch9.colDiy')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border/60">
                  <td className="p-3 font-medium text-foreground">{t('closedTestingGuide.ch9.rowTime')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.rowTimeFt')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.rowTimeDiy')}</td>
                </tr>
                <tr className="border-t border-border/60 bg-muted/20">
                  <td className="p-3 font-medium text-foreground">{t('closedTestingGuide.ch9.rowCost')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.rowCostFt')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.rowCostDiy')}</td>
                </tr>
                <tr className="border-t border-border/60">
                  <td className="p-3 font-medium text-foreground">{t('closedTestingGuide.ch9.rowRefund')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.yes')}</td>
                  <td className="p-3">{t('closedTestingGuide.ch9.no')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {pLast('closedTestingGuide.ch9.p2')}
        </>
      ),
    },
    {
      id: 'experience',
      index: 10,
      navLabel: t('closedTestingGuide.ch10.nav'),
      pillLabel: t('closedTestingGuide.ch10.pill'),
      title: t('closedTestingGuide.ch10.title'),
      body: (
        <>
          {p('closedTestingGuide.ch10.p1')}
          {p('closedTestingGuide.ch10.p2')}
          {pLast('closedTestingGuide.ch10.p3')}
        </>
      ),
    },
    {
      id: 'rejected-before',
      index: 11,
      navLabel: t('closedTestingGuide.ch11.nav'),
      pillLabel: t('closedTestingGuide.ch11.pill'),
      title: t('closedTestingGuide.ch11.title'),
      body: (
        <>
          {p('closedTestingGuide.ch11.p1')}
          {p('closedTestingGuide.ch11.p2')}
          {pLast('closedTestingGuide.ch11.p3')}
        </>
      ),
    },
    {
      id: 'going-live',
      index: 12,
      navLabel: t('closedTestingGuide.ch12.nav'),
      pillLabel: t('closedTestingGuide.ch12.pill'),
      title: t('closedTestingGuide.ch12.title'),
      body: (
        <>
          {p('closedTestingGuide.ch12.p1')}
          <ol className="list-decimal ps-5 space-y-2 text-sm text-muted-foreground mb-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>{t(`closedTestingGuide.ch12.ol${n}`)}</li>
            ))}
          </ol>
          {pLast('closedTestingGuide.ch12.p2')}
        </>
      ),
    },
  ];
}

const PILL_KEYS = [
  'closedTestingGuide.pill1',
  'closedTestingGuide.pill2',
  'closedTestingGuide.pill3',
] as const;

export function HomeClosedTestingExplained() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, language } = useLanguage();
  const chapters = useMemo(() => buildChapters(t), [t, language]);
  const chapter = chapters[activeIndex];
  const { navigate, currentPath } = useRouter();
  const { trackCta } = useAnalytics();

  return (
    <section
      className="py-16 sm:py-20 border-t border-border/40 bg-[#eef2f7] dark:bg-slate-950/50"
      aria-labelledby="closed-testing-explained-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4">
            {t('closedTestingGuide.eyebrow')}
          </p>
          <h2
            id="closed-testing-explained-title"
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4"
          >
            {t('closedTestingGuide.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
            {t('closedTestingGuide.subtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PILL_KEYS.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/80 dark:bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" aria-hidden />
                {t(key)}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-white dark:bg-card shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[480px]">
            <aside className="lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-e border-border/40 bg-slate-50/80 dark:bg-muted/20 p-4 sm:p-5">
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-3 px-2">
                {t('closedTestingGuide.indexLabel')}
              </p>
              <nav
                className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0"
                aria-label={t('closedTestingGuide.navAriaLabel')}
              >
                {chapters.map((ch, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm whitespace-nowrap lg:whitespace-normal transition-colors shrink-0 lg:shrink',
                        active
                          ? 'bg-blue-100/90 dark:bg-blue-500/15 text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                          active ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {String(ch.index).padStart(2, '0')}
                      </span>
                      <span>{ch.navLabel}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
              <div className="relative flex-1 p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
                    {chapter.pillLabel}
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                    {t('closedTestingGuide.chapterPrefix')}{' '}
                    {String(chapter.index).padStart(2, '0')} / 12
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-5 leading-tight">
                  {chapter.title}
                </h3>
                <div className="relative max-h-[420px] overflow-y-auto pe-1 scrollbar-thin">
                  {chapter.body}
                  {activeIndex === chapters.length - 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        onClick={() => {
                          trackCta('closed_testing_guide_start');
                          goToGetStartedPricing(currentPath, navigate);
                        }}
                      >
                        {t('closedTestingGuide.ctaStart')}
                        <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          trackCta('closed_testing_guide_community');
                          navigate(COMMUNITY_URL);
                        }}
                      >
                        {t('closedTestingGuide.ctaCommunity')}
                      </Button>
                    </div>
                  )}
                </div>
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-card to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
