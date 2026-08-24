'use client';

import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Upload,
  Gift,
  Headphones,
  CreditCard,
  RotateCcw,
  User,
  Smartphone,
  Activity,
  FileText,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  MessageSquare,
  Shield,
  Copy,
  Zap,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type DemoTab = 'overview' | 'progress' | 'reports' | 'instructions';

const DEMO = {
  appName: 'QRMaker',
  developer: 'Cobrother Studio',
  packageName: 'com.cobrother.QRMaker',
  submittedOn: 'April 7, 2026',
  daysCompleted: 9,
  totalDays: 14,
  testers: 12,
  reportsReady: 2,
  totalReports: 2,
} as const;

const TABS: { id: DemoTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'progress', label: 'Progress', icon: Activity },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'instructions', label: 'Instructions', icon: BookOpen },
];

const SIDEBAR_MAIN = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Submit App', icon: Upload, active: false },
  { label: 'Referrals', icon: Gift, active: false },
];

const SIDEBAR_ACCOUNT = [
  { label: 'Support', icon: Headphones },
  { label: 'Billing', icon: CreditCard },
  { label: 'Profile', icon: User },
];

function MiniProgressBar({ value, color }: { value: number; color: 'blue' | 'green' }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700',
          color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function DayCell({ day, status }: { day: number; status: 'done' | 'current' | 'upcoming' }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border p-1.5 sm:p-2 min-h-[52px] sm:min-h-[64px] transition-all duration-300',
        status === 'done' && 'border-emerald-500/30 bg-emerald-500/10',
        status === 'current' && 'border-blue-500 bg-blue-500/15 shadow-[0_0_12px_rgba(59,130,246,0.25)] dark:shadow-[0_0_16px_rgba(59,130,246,0.35)]',
        status === 'upcoming' && 'border-border/60 bg-muted/30'
      )}
    >
      {status === 'done' ? (
        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
      ) : status === 'current' ? (
        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      ) : (
        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-muted-foreground/20" />
      )}
      <span
        className={cn(
          'mt-1 text-[9px] sm:text-[10px] font-medium',
          status === 'current' ? 'text-blue-500' : 'text-muted-foreground'
        )}
      >
        Day {day}
      </span>
    </div>
  );
}

function OverviewPanel() {
  const progressPct = Math.round((DEMO.daysCompleted / DEMO.totalDays) * 100);
  const testerPct = 100;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          App Information
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
          {[
            ['Submitted On', DEMO.submittedOn],
            ['Developer', DEMO.developer],
            ['Platform', 'Android'],
            ['Testing Status', 'In Progress'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-muted-foreground text-[10px] sm:text-xs">{label}</p>
              <p
                className={cn(
                  'font-medium mt-0.5',
                  label === 'Testing Status' && 'text-blue-500 flex items-center gap-1'
                )}
              >
                {label === 'Testing Status' && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: 'Days', value: DEMO.daysCompleted, total: DEMO.totalDays, pct: progressPct, color: 'blue' as const },
          { label: 'Testers', value: DEMO.testers, total: DEMO.testers, pct: testerPct, color: 'green' as const },
          { label: 'Reports', value: DEMO.reportsReady, total: DEMO.totalReports, pct: 100, color: 'green' as const, suffix: ' ready' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn(
              'rounded-xl border p-2.5 sm:p-3',
              stat.color === 'blue'
                ? 'border-blue-500/20 bg-blue-500/5'
                : 'border-emerald-500/20 bg-emerald-500/5'
            )}
          >
            <p className="text-lg sm:text-2xl font-bold text-foreground">
              {stat.value}
              <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                /{stat.total}{stat.suffix ?? ''}
              </span>
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">{stat.label}</p>
            <MiniProgressBar value={stat.pct} color={stat.color} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Status
        </p>
        <div className="space-y-2 text-xs sm:text-sm">
          {[
            ['Status', 'Active', 'text-blue-500'],
            ['Days', `${DEMO.daysCompleted}/${DEMO.totalDays}`, ''],
            ['Testers', `${DEMO.testers}/${DEMO.testers}`, ''],
            ['Reports', `${DEMO.reportsReady}/${DEMO.totalReports} ready`, 'text-emerald-500'],
          ].map(([label, value, colorClass]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className={cn('font-medium', colorClass)}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressPanel({ animatedProgress }: { animatedProgress: number }) {
  const daysLeft = DEMO.totalDays - DEMO.daysCompleted;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
            Overall Progress
          </p>
          <span className="text-lg sm:text-xl font-bold text-foreground">{animatedProgress}%</span>
        </div>
        <Progress value={animatedProgress} className="h-2.5 bg-muted [&>div]:bg-blue-500" />
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5">
          {daysLeft} days remaining
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          14-Day Timeline
        </p>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {Array.from({ length: DEMO.totalDays }, (_, i) => {
            const day = i + 1;
            const status =
              day <= DEMO.daysCompleted
                ? 'done'
                : day === DEMO.daysCompleted + 1
                  ? 'current'
                  : 'upcoming';
            return <DayCell key={day} day={day} status={status} />;
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { value: DEMO.daysCompleted, label: 'days completed', color: 'text-blue-500' },
          { value: DEMO.testers, label: 'active testers', color: 'text-violet-500' },
          { value: daysLeft, label: 'days left', color: 'text-emerald-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card p-2.5 sm:p-3 text-center"
          >
            <p className={cn('text-xl sm:text-2xl font-bold', stat.color)}>{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPanel() {
  const reports = [
    {
      title: 'Feedback Report',
      desc: 'Tester feedback on app improvements',
      icon: Download,
    },
    {
      title: 'Production Access Report',
      desc: 'Pre-filled answers for production access form',
      icon: Download,
    },
  ];

  return (
    <div className="grid sm:grid-cols-5 gap-3 sm:gap-4">
      <div className="sm:col-span-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Your Reports
        </p>
        {reports.map((report) => (
          <div
            key={report.title}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <report.icon className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-foreground">{report.title}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{report.desc}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
              Available
            </span>
          </div>
        ))}
      </div>
      <div className="sm:col-span-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          What You&apos;ll Receive
        </p>
        <div className="space-y-2">
          <div className="rounded-xl border border-border/60 bg-card p-3">
            <div className="flex gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Feedback Report</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  UI/UX suggestions, performance issues, and improvement recommendations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-3">
            <div className="flex gap-2">
              <FileText className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">Production Access Report</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  Pre-filled answers to Google Play production access questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructionsPanel() {
  return (
    <div className="grid sm:grid-cols-5 gap-3 sm:gap-4">
      <div className="sm:col-span-3 space-y-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4">
          <div className="flex gap-2 mb-2">
            <Shield className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Closed testing coverage</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">
                Fast Testers assigns 15 testers for 16 days, covering Google’s 12 testers / 14 consecutive
                days. Google decides production access; refund terms are on the refund policy page.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Testing Instructions
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            Testers should focus on core features: QR code generation, scanning, history management,
            and sharing. Report any crashes, UI issues, or usability problems. Test on different
            Android versions and screen sizes.
          </p>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 p-4 text-white h-full">
          <p className="text-sm sm:text-base font-bold mb-3">
            Production access, or your money back.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { icon: Zap, text: '15 testers assigned instantly' },
              { icon: Clock, text: 'Full 14-day managed cycle' },
              { icon: RotateCcw, text: '100% refund if rejected' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] sm:text-xs"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {text}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/60">
            5,000+ apps published · 180+ countries
          </p>
        </div>
      </div>
    </div>
  );
}

function AppSidebarCards() {
  const progressPct = Math.round((DEMO.daysCompleted / DEMO.totalDays) * 100);

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="rounded-xl border border-border/60 bg-card p-3">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-sm">
            QR
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{DEMO.appName}</p>
            <span className="inline-flex items-center rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-500">
              Active
            </span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">Testing Progress</span>
              <span className="font-medium text-foreground">{progressPct}%</span>
            </div>
            <MiniProgressBar value={progressPct} color="blue" />
            <p className="text-[9px] text-muted-foreground mt-1">
              Day {DEMO.daysCompleted} of {DEMO.totalDays}
            </p>
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">Active Testers</span>
              <span className="font-medium text-foreground">
                {DEMO.testers}/{DEMO.testers}
              </span>
            </div>
            <MiniProgressBar value={100} color="green" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/60 bg-card p-2 text-center">
          <p className="text-base font-bold text-foreground">{DEMO.totalDays}</p>
          <p className="text-[9px] text-muted-foreground">Days</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card p-2 text-center">
          <p className="text-base font-bold text-foreground">{DEMO.testers}</p>
          <p className="text-[9px] text-muted-foreground">Total Testers</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-2.5">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Package Name
        </p>
        <div className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5">
          <code className="text-[9px] sm:text-[10px] text-muted-foreground truncate flex-1">
            {DEMO.packageName}
          </code>
          <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function LiveDemoDashboard() {
  const [activeTab, setActiveTab] = useState<DemoTab>('overview');
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const targetProgress = Math.round((DEMO.daysCompleted / DEMO.totalDays) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(targetProgress), 400);
    return () => clearTimeout(timer);
  }, [activeTab, targetProgress]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const idx = TABS.findIndex((t) => t.id === current);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="device-frame overflow-hidden rounded-xl border border-border/40 bg-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 mx-1">
          <div className="rounded-md bg-background/60 px-3 py-1 text-[10px] sm:text-xs text-muted-foreground text-center truncate">
            dashboard.fasttesters.com/app-details/qrmaker
          </div>
        </div>
      </div>

      <div className="flex min-h-[420px] sm:min-h-[480px]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[168px] lg:w-[190px] shrink-0 flex-col border-r border-border/40 bg-muted/30">
          <div className="flex items-center gap-2 px-3 py-3 border-b border-border/40">
            <Smartphone className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-foreground">Fast Testers</span>
          </div>

          <nav className="flex-1 px-2 py-3 space-y-3 overflow-hidden">
            <div>
              <p className="px-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Main
              </p>
              {SIDEBAR_MAIN.map(({ label, icon: Icon, active }) => (
                <div
                  key={label}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] mb-0.5',
                    active
                      ? 'bg-blue-500/10 text-blue-500 font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="px-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Account
              </p>
              {SIDEBAR_ACCOUNT.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground mb-0.5"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="border-t border-border/40 p-2 space-y-2">
            <div className="rounded-lg bg-card border border-border/40 p-2">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center text-[10px] font-bold text-violet-500">
                  D
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium truncate">Demo Developer</p>
                  <p className="text-[9px] text-muted-foreground truncate">dev@example.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-blue-500 text-white text-center py-1.5 text-[10px] font-semibold">
              Submit New App
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* App header */}
          <div className="flex items-center justify-between gap-2 border-b border-border/40 px-3 sm:px-4 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold">
                QR
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold truncate">{DEMO.appName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{DEMO.developer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-blue-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                In Progress
              </span>
              <div className="rounded-md bg-foreground text-background px-2 py-1 text-[9px] sm:text-[10px] font-medium">
                Play Store
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto border-b border-border/40 px-2 sm:px-3 py-1.5 scrollbar-none">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all',
                  activeTab === id
                    ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.15)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="flex-1 p-2 sm:p-3 lg:p-4 overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,200px)_1fr] gap-3 sm:gap-4 h-full">
              <div className="hidden lg:block">
                <AppSidebarCards />
              </div>
              <div className="min-h-0 overflow-y-auto">
                {activeTab === 'overview' && <OverviewPanel />}
                {activeTab === 'progress' && (
                  <ProgressPanel animatedProgress={animatedProgress} />
                )}
                {activeTab === 'reports' && <ReportsPanel />}
                {activeTab === 'instructions' && <InstructionsPanel />}
              </div>
            </div>
          </div>

          {/* Mobile sidebar stats */}
          <div className="lg:hidden border-t border-border/40 px-3 py-2 flex gap-4 text-[10px]">
            <div className="flex-1">
              <div className="flex justify-between text-muted-foreground mb-0.5">
                <span>Days</span>
                <span>
                  {DEMO.daysCompleted}/{DEMO.totalDays}
                </span>
              </div>
              <MiniProgressBar
                value={(DEMO.daysCompleted / DEMO.totalDays) * 100}
                color="blue"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-muted-foreground mb-0.5">
                <span>Testers</span>
                <span>
                  {DEMO.testers}/{DEMO.testers}
                </span>
              </div>
              <MiniProgressBar value={100} color="green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
