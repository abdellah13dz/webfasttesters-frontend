'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DailyStat {
  date: string;
  events: number;
  pageViews: number;
  ctaClicks: number;
}

interface AnalyticsData {
  totalEvents: number;
  eventsByType: Record<string, number>;
  pageViews: Record<string, number>;
  ctaClicks: Record<string, number>;
  dailyStats: DailyStat[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/api/admin/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Derived values
  const totalPageViews = data
    ? Object.values(data.pageViews).reduce((sum, c) => sum + c, 0)
    : 0;
  const totalCtaClicks = data
    ? Object.values(data.ctaClicks).reduce((sum, c) => sum + c, 0)
    : 0;
  const totalFormSubmissions = data?.eventsByType?.form_submit ?? 0;

  // Chart data – daily events
  const dailyChartData = (data?.dailyStats ?? []).map((d) => ({
    ...d,
    label: formatShortDate(d.date),
  }));

  // Chart data – events by type
  const eventsByTypeData = data
    ? Object.entries(data.eventsByType).map(([type, count]) => ({
        type: formatEventType(type),
        count,
      }))
    : [];

  // Top pages sorted by views
  const topPages = data
    ? Object.entries(data.pageViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
    : [];

  // Top CTAs sorted by clicks
  const topCTAs = data
    ? Object.entries(data.ctaClicks)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
    : [];

  // -------------------------------------------------------------------------
  // Stats cards configuration
  // -------------------------------------------------------------------------

  const statsCards = [
    {
      title: 'Total Events',
      value: data?.totalEvents ?? 0,
      icon: TrendingUp,
      bgClass: 'bg-blue-500/10',
      textClass: 'text-blue-500',
    },
    {
      title: 'Page Views',
      value: totalPageViews,
      icon: Eye,
      bgClass: 'bg-emerald-500/10',
      textClass: 'text-emerald-500',
    },
    {
      title: 'CTA Clicks',
      value: totalCtaClicks,
      icon: MousePointerClick,
      bgClass: 'bg-amber-500/10',
      textClass: 'text-amber-500',
    },
    {
      title: 'Form Submissions',
      value: totalFormSubmissions,
      icon: FileInput,
      bgClass: 'bg-purple-500/10',
      textClass: 'text-purple-500',
    },
  ];

  // -------------------------------------------------------------------------
  // Custom tooltip
  // -------------------------------------------------------------------------

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
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

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Stats Cards Row                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-3xl font-bold text-foreground">
                        {card.value.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgClass}`}
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

      {/* ----------------------------------------------------------------- */}
      {/* Charts Section – 2-column grid                                     */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Events Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Daily Events
            </CardTitle>
            <p className="text-xs text-muted-foreground">Events per day for the last 30 days</p>
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
                    dataKey="events"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#3b82f6' }}
                    name="Events"
                  />
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

        {/* Events by Type Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              Events by Type
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

      {/* ----------------------------------------------------------------- */}
      {/* Top Pages & Top CTAs – 2-column grid                               */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Pages */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-blue-500" />
              Top Pages
            </CardTitle>
            <p className="text-xs text-muted-foreground">Most visited pages by view count</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                ))}
              </div>
            ) : topPages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Globe className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No page view data available</p>
              </div>
            ) : (
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {topPages.map(([page, count], index) => (
                  <div
                    key={page}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-mono text-muted-foreground w-6 text-right shrink-0">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium text-foreground truncate">
                        {page}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[11px] bg-blue-500/10 text-blue-500 border-blue-500/20"
                    >
                      {count.toLocaleString()} views
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top CTAs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center gap-2 text-base">
              <MousePointerClick className="h-4 w-4 text-amber-500" />
              Top CTAs
            </CardTitle>
            <p className="text-xs text-muted-foreground">Most clicked CTA elements by click count</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                ))}
              </div>
            ) : topCTAs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <MousePointerClick className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No CTA click data available</p>
              </div>
            ) : (
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {topCTAs.map(([element, count], index) => (
                  <div
                    key={element}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-mono text-muted-foreground w-6 text-right shrink-0">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium text-foreground truncate">
                        {element}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[11px] bg-amber-500/10 text-amber-500 border-amber-500/20"
                    >
                      {count.toLocaleString()} clicks
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
