'use client';

import { apiFetch } from '@/lib/api';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  FileInput,
  BarChart3,
  Globe,
  Users,
  Monitor,
  Languages,
  Link2,
  MapPin,
  RefreshCw,
  CalendarRange,
  Download,
} from 'lucide-react';
import { downloadAnalyticsCsv } from '@/lib/analytics-csv-export';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DailyStat {
  date: string;
  events: number;
  pageViews: number;
  ctaClicks: number;
  uniqueVisitors: number;
}

interface NamedCount {
  name: string;
  count: number;
}

interface CountryStat {
  code: string;
  name: string;
  visits: number;
  uniqueVisitors: number;
}

interface AnalyticsData {
  range: { from: string; to: string };
  summary: {
    totalEvents: number;
    pageViews: number;
    uniqueVisitors: number;
    uniqueSessions: number;
    ctaClicks: number;
    formSubmissions: number;
    avgPagesPerVisitor: number;
    bounceRate: number;
    trackedWithVisitorId: number;
  };
  eventsByType: Record<string, number>;
  pageViews: Record<string, number>;
  ctaClicks: Record<string, number>;
  dailyStats: DailyStat[];
  countries: CountryStat[];
  devices: NamedCount[];
  browsers: NamedCount[];
  referrers: NamedCount[];
  languages: NamedCount[];
  cities: NamedCount[];
}

type Preset = '7d' | '30d' | '90d' | 'custom';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - (days - 1));
  return toDateInputValue(d);
}

function formatShortDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatEventType(type: string): string {
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatRangeLabel(from: string, to: string): string {
  return `${formatShortDate(from)} – ${formatShortDate(to)}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState<Preset>('30d');
  const [from, setFrom] = useState(() => daysAgo(30));
  const [to, setTo] = useState(() => toDateInputValue(new Date()));

  const applyPreset = useCallback((next: Preset) => {
    setPreset(next);
    if (next === 'custom') return;
    const days = next === '7d' ? 7 : next === '90d' ? 90 : 30;
    setFrom(daysAgo(days));
    setTo(toDateInputValue(new Date()));
  }, []);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to });
      const res = await apiFetch(`/api/admin/analytics?${params.toString()}`);
      if (res.ok) {
        const json = (await res.json()) as AnalyticsData;
        setData(json);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    void fetchAnalytics();
  }, [fetchAnalytics]);

  const handleExportCsv = useCallback(() => {
    if (!data) return;
    downloadAnalyticsCsv(data);
  }, [data]);

  const dailyChartData = useMemo(
    () =>
      (data?.dailyStats ?? []).map((d) => ({
        ...d,
        label: formatShortDate(d.date),
      })),
    [data]
  );

  const eventsByTypeData = useMemo(
    () =>
      data
        ? Object.entries(data.eventsByType).map(([type, count]) => ({
            type: formatEventType(type),
            count,
          }))
        : [],
    [data]
  );

  const topPages = useMemo(
    () =>
      data
        ? Object.entries(data.pageViews)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 15)
        : [],
    [data]
  );

  const topCTAs = useMemo(
    () =>
      data
        ? Object.entries(data.ctaClicks)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 15)
        : [],
    [data]
  );

  const statsCards = [
    {
      title: 'Unique Visitors',
      value: data?.summary.uniqueVisitors ?? 0,
      icon: Users,
      bgClass: 'bg-cyan-500/10',
      textClass: 'text-cyan-500',
      hint: 'Distinct visitor IDs in range',
    },
    {
      title: 'Page Views',
      value: data?.summary.pageViews ?? 0,
      icon: Eye,
      bgClass: 'bg-emerald-500/10',
      textClass: 'text-emerald-500',
      hint: 'Total page_view events',
    },
    {
      title: 'Sessions',
      value: data?.summary.uniqueSessions ?? 0,
      icon: CalendarRange,
      bgClass: 'bg-blue-500/10',
      textClass: 'text-blue-500',
      hint: 'Distinct browser sessions',
    },
    {
      title: 'CTA Clicks',
      value: data?.summary.ctaClicks ?? 0,
      icon: MousePointerClick,
      bgClass: 'bg-amber-500/10',
      textClass: 'text-amber-500',
      hint: 'Tracked call-to-action clicks',
    },
    {
      title: 'Form Submissions',
      value: data?.summary.formSubmissions ?? 0,
      icon: FileInput,
      bgClass: 'bg-purple-500/10',
      textClass: 'text-purple-500',
      hint: 'Contact / submit events',
    },
    {
      title: 'Bounce Rate',
      value: data?.summary.bounceRate ?? 0,
      icon: TrendingUp,
      bgClass: 'bg-rose-500/10',
      textClass: 'text-rose-500',
      hint: 'Single-page sessions',
      suffix: '%',
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  };

  const RankList = ({
    items,
    emptyIcon: EmptyIcon,
    emptyLabel,
    badgeClass,
    badgeLabel,
  }: {
    items: Array<[string, number] | NamedCount | CountryStat>;
    emptyIcon: React.ComponentType<{ className?: string }>;
    emptyLabel: string;
    badgeClass: string;
    badgeLabel: (count: number) => string;
  }) => {
    if (loading) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <EmptyIcon className="h-10 w-10 mb-2 opacity-40" />
          <p className="text-sm">{emptyLabel}</p>
        </div>
      );
    }

    return (
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {items.map((item, index) => {
          let key: string;
          let label: string;
          let count: number;
          let extra: string | null = null;

          if (Array.isArray(item)) {
            [key, count] = item;
            label = key;
          } else if ('code' in item) {
            key = item.code;
            label = `${item.name} (${item.code})`;
            count = item.visits;
            extra = `${item.uniqueVisitors.toLocaleString()} unique`;
          } else {
            key = item.name;
            label = item.name;
            count = item.count;
          }

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-mono text-muted-foreground w-6 text-right shrink-0">
                  {index + 1}.
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{label}</p>
                  {extra && <p className="text-[11px] text-muted-foreground">{extra}</p>}
                </div>
              </div>
              <Badge variant="outline" className={`shrink-0 text-[11px] ${badgeClass}`}>
                {badgeLabel(count)}
              </Badge>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Date range controls */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarRange className="h-4 w-4 text-blue-500" />
                Date range
              </div>
              <p className="text-xs text-muted-foreground">
                {data
                  ? `Showing ${formatRangeLabel(data.range.from, data.range.to)} · ${data.summary.totalEvents.toLocaleString()} events`
                  : 'Filter visitor analytics by period'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['7d', '7 days'],
                    ['30d', '30 days'],
                    ['90d', '90 days'],
                    ['custom', 'Custom'],
                  ] as const
                ).map(([id, label]) => (
                  <Button
                    key={id}
                    type="button"
                    size="sm"
                    variant={preset === id ? 'default' : 'outline'}
                    onClick={() => applyPreset(id)}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap items-end gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground" htmlFor="analytics-from">
                    From
                  </label>
                  <Input
                    id="analytics-from"
                    type="date"
                    value={from}
                    max={to}
                    onChange={(e) => {
                      setPreset('custom');
                      setFrom(e.target.value);
                    }}
                    className="w-[150px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground" htmlFor="analytics-to">
                    To
                  </label>
                  <Input
                    id="analytics-to"
                    type="date"
                    value={to}
                    min={from}
                    max={toDateInputValue(new Date())}
                    onChange={(e) => {
                      setPreset('custom');
                      setTo(e.target.value);
                    }}
                    className="w-[150px]"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void fetchAnalytics()}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={handleExportCsv}
                  disabled={loading || !data}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          {data && data.summary.trackedWithVisitorId < data.summary.totalEvents && (
            <p className="mt-3 text-xs text-muted-foreground">
              Unique visitors/sessions are counted from events that include visitor IDs. Older events
              without IDs still contribute to page views and totals.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-3xl font-bold text-foreground">
                        {card.value.toLocaleString()}
                        {card.suffix ?? ''}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{card.hint}</p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${card.bgClass}`}
                    >
                      <Icon className={`h-6 w-6 ${card.textClass}`} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secondary metrics */}
      {!loading && data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Avg pages / visitor</p>
              <p className="text-2xl font-semibold mt-1">{data.summary.avgPagesPerVisitor}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total events</p>
              <p className="text-2xl font-semibold mt-1">
                {data.summary.totalEvents.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Countries detected</p>
              <p className="text-2xl font-semibold mt-1">{data.countries.length}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Traffic over time
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Page views, unique visitors, and CTA clicks per day
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : dailyChartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <BarChart3 className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No event data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dailyChartData}>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#10b981' }}
                    name="Page Views"
                  />
                  <Line
                    type="monotone"
                    dataKey="uniqueVisitors"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#06b6d4' }}
                    name="Unique Visitors"
                  />
                  <Line
                    type="monotone"
                    dataKey="ctaClicks"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#f59e0b' }}
                    name="CTA Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              Events by type
            </CardTitle>
            <p className="text-xs text-muted-foreground">Event counts grouped by type</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : eventsByTypeData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <BarChart3 className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No event type data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventsByTypeData}>
                  <XAxis
                    dataKey="type"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Count" radius={[6, 6, 0, 0]}>
                    {eventsByTypeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Countries + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-blue-500" />
              Countries
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Visits by country (from CDN / edge headers when available)
            </p>
          </CardHeader>
          <CardContent>
            <RankList
              items={data?.countries ?? []}
              emptyIcon={Globe}
              emptyLabel="No country data yet — new visits will populate this"
              badgeClass="bg-blue-500/10 text-blue-500 border-blue-500/20"
              badgeLabel={(count) => `${count.toLocaleString()} visits`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Monitor className="h-4 w-4 text-violet-500" />
              Devices & browsers
            </CardTitle>
            <p className="text-xs text-muted-foreground">Visitor device and browser breakdown</p>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Devices</p>
              <RankList
                items={data?.devices ?? []}
                emptyIcon={Monitor}
                emptyLabel="No device data yet"
                badgeClass="bg-violet-500/10 text-violet-500 border-violet-500/20"
                badgeLabel={(count) => count.toLocaleString()}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Browsers</p>
              <RankList
                items={data?.browsers ?? []}
                emptyIcon={Monitor}
                emptyLabel="No browser data yet"
                badgeClass="bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                badgeLabel={(count) => count.toLocaleString()}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrers + languages + cities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Link2 className="h-4 w-4 text-amber-500" />
              Top referrers
            </CardTitle>
            <p className="text-xs text-muted-foreground">Where visitors came from</p>
          </CardHeader>
          <CardContent>
            <RankList
              items={data?.referrers ?? []}
              emptyIcon={Link2}
              emptyLabel="No referrer data yet"
              badgeClass="bg-amber-500/10 text-amber-500 border-amber-500/20"
              badgeLabel={(count) => count.toLocaleString()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Languages className="h-4 w-4 text-emerald-500" />
              Languages
            </CardTitle>
            <p className="text-xs text-muted-foreground">Browser language preferences</p>
          </CardHeader>
          <CardContent>
            <RankList
              items={data?.languages ?? []}
              emptyIcon={Languages}
              emptyLabel="No language data yet"
              badgeClass="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              badgeLabel={(count) => count.toLocaleString()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-rose-500" />
              Cities
            </CardTitle>
            <p className="text-xs text-muted-foreground">Top cities when edge headers provide them</p>
          </CardHeader>
          <CardContent>
            <RankList
              items={data?.cities ?? []}
              emptyIcon={MapPin}
              emptyLabel="No city data yet"
              badgeClass="bg-rose-500/10 text-rose-500 border-rose-500/20"
              badgeLabel={(count) => count.toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top pages & CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-blue-500" />
              Top pages
            </CardTitle>
            <p className="text-xs text-muted-foreground">Most visited pages by view count</p>
          </CardHeader>
          <CardContent>
            <RankList
              items={topPages}
              emptyIcon={Globe}
              emptyLabel="No page view data available"
              badgeClass="bg-blue-500/10 text-blue-500 border-blue-500/20"
              badgeLabel={(count) => `${count.toLocaleString()} views`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <MousePointerClick className="h-4 w-4 text-amber-500" />
              Top CTAs
            </CardTitle>
            <p className="text-xs text-muted-foreground">Most clicked CTA elements</p>
          </CardHeader>
          <CardContent>
            <RankList
              items={topCTAs}
              emptyIcon={MousePointerClick}
              emptyLabel="No CTA click data available"
              badgeClass="bg-amber-500/10 text-amber-500 border-amber-500/20"
              badgeLabel={(count) => `${count.toLocaleString()} clicks`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
