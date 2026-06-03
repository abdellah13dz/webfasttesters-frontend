'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { fetchPublicStatus, formatIncidentDate } from '@/lib/cms';
import { getCmsIcon } from '@/lib/cms-icons';
import type { StatusService, StatusIncident } from '@/lib/cms';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  Smartphone,
  Users,
  BarChart3,
  CreditCard,
  Mail,
  Code,
  Shield,
} from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const services = [
  { nameKey: 'status.appTesting', icon: Smartphone, uptime: '99.98%' },
  { nameKey: 'status.testerAssignment', icon: Users, uptime: '99.95%' },
  { nameKey: 'status.dashboard', icon: BarChart3, uptime: '99.99%' },
  { nameKey: 'status.payments', icon: CreditCard, uptime: '99.97%' },
  { nameKey: 'status.email', icon: Mail, uptime: '99.93%' },
  { nameKey: 'status.api', icon: Code, uptime: '99.96%' },
];

const incidents = [
  {
    title: 'Brief API Latency',
    date: 'Feb 28, 2026',
    status: 'Resolved',
    duration: '15 minutes',
    description: 'Some API requests experienced higher than normal latency. Root cause identified and resolved.',
  },
  {
    title: 'Payment Gateway Maintenance',
    date: 'Feb 15, 2026',
    status: 'Scheduled',
    duration: '30 minutes',
    description: 'Scheduled maintenance for payment gateway upgrade. All services remained available.',
  },
  {
    title: 'Dashboard Loading Slow',
    date: 'Jan 22, 2026',
    status: 'Resolved',
    duration: '45 minutes',
    description: 'Dashboard pages experienced slow loading times due to database optimization. Issue resolved.',
  },
];

export default function StatusPage() {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState('');
  const [serviceList, setServiceList] = useState(services);
  const [incidentList, setIncidentList] = useState(incidents);

  useEffect(() => {
    (async () => {
      const data = await fetchPublicStatus();
      if (!data) return;
      if (data.services.length > 0) {
        setServiceList(
          data.services.map((s: StatusService) => ({
            nameKey: s.name,
            name: s.name,
            icon: getCmsIcon(s.icon),
            uptime: s.uptime30Day,
            status: s.status,
          }))
        );
      }
      if (data.incidents.length > 0) {
        setIncidentList(
          data.incidents.map((i: StatusIncident) => ({
            title: i.title,
            date: formatIncidentDate(i.occurredAt),
            status: i.status === 'resolved' ? 'Resolved' : i.status === 'scheduled' ? 'Scheduled' : 'Investigating',
            duration: i.duration || '',
            description: i.description,
          }))
        );
      }
    })();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />

        {/* Pulsing radar animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full border border-green-500/10 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full border border-green-500/10 animate-pulse-ring-delayed" />
            <div className="absolute inset-0 rounded-full border border-green-500/10 animate-pulse-ring-slow" />
            <div className="absolute inset-[30%] rounded-full border border-green-500/5" />
            <div className="absolute inset-[55%] rounded-full border border-green-500/5" />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text on left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 border-green-500/30 text-green-400 bg-green-500/10 px-4 py-1.5 text-sm"
              >
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />
                {t('status.allSystemsOperational').split(' ').slice(0, 2).join(' ')}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('status.title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
                {t('status.subtitle')}
              </p>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/status-monitoring.png"
                alt="Status Monitoring"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overall Status Banner */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 -mt-4 mb-12">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-500/5 to-green-500/10 animate-glow-pulse-green">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {t('status.allSystemsOperational')}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last checked: {currentTime || '...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-500">{t('status.operational')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>

      {/* Service Components */}
      <AnimatedSection delay={100}>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t('status.operational')} Services
          </h2>
          <div className="grid gap-3">
            {serviceList.map((service, index) => {
              const Icon = service.icon;
              const label = 'name' in service && service.name ? service.name : t(service.nameKey);
              return (
                <Card
                  key={service.nameKey + String(index)}
                  className="border-border bg-card/50 backdrop-blur-sm hover:border-green-500/20 transition-colors relative overflow-hidden"
                >
                  {/* Subtle network line connecting to next */}
                  {index < serviceList.length - 1 && (
                    <div className="absolute bottom-0 left-[22px] w-px h-3 bg-gradient-to-b from-blue-500/20 to-transparent" />
                  )}
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 shrink-0">
                          <Icon className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="font-medium text-foreground">
                          {label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6">
                        <span className="text-sm text-muted-foreground hidden sm:inline">
                          {t('status.30dayUptime')}: <span className="font-semibold text-foreground">{service.uptime}</span>
                        </span>
                        <Badge
                          variant="outline"
                          className="border-green-500/30 text-green-500 bg-green-500/10 text-xs"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                          {t('status.operational')}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2 sm:hidden text-xs text-muted-foreground">
                      {t('status.30dayUptime')}: <span className="font-semibold text-foreground">{service.uptime}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* Uptime Summary */}
      <AnimatedSection delay={200}>
        <section className="border-t border-border bg-gradient-to-b from-transparent via-blue-500/3 to-transparent">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
            <div className="text-center mb-8">
              <Badge
                variant="outline"
                className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Shield className="h-4 w-4 mr-1" />
                {t('status.30dayUptime')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('status.30dayUptime')}
              </h2>
            </div>
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-sm font-semibold text-foreground p-4">Service</th>
                        <th className="text-right text-sm font-semibold text-foreground p-4">{t('status.uptime')}</th>
                        <th className="text-right text-sm font-semibold text-foreground p-4 hidden sm:table-cell">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceList.map((service, index) => {
                        const Icon = service.icon;
                        const label = 'name' in service && service.name ? service.name : t(service.nameKey);
                        return (
                          <tr
                            key={service.nameKey + String(index)}
                            className={index < serviceList.length - 1 ? 'border-b border-border/50' : ''}
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Icon className="h-4 w-4 text-blue-400 shrink-0" />
                                <span className="text-sm font-medium text-foreground">{label}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-sm font-semibold text-green-500">{service.uptime}</span>
                            </td>
                            <td className="p-4 text-right hidden sm:table-cell">
                              <div className="flex items-center justify-end gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-500">{t('status.operational')}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Recent Incidents */}
      <AnimatedSection delay={300}>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="text-center mb-8">
            <Badge
              variant="outline"
              className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
            >
              <Clock className="h-4 w-4 mr-1" />
              {t('status.recentIncidents')}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t('status.recentIncidents')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border sm:left-6" />

            <div className="space-y-6">
              {incidentList.map((incident, index) => (
                <div key={index} className="relative pl-14 sm:pl-16">
                  {/* Timeline dot with pulse */}
                  <div className="absolute left-3 sm:left-4 top-2 flex items-center justify-center w-4 h-4 rounded-full border-2 border-background animate-timeline-dot-pulse"
                    style={{
                      backgroundColor: incident.status === 'Resolved' ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)',
                    }}
                  >
                    {incident.status === 'Resolved' ? (
                      <CheckCircle className="h-3 w-3 text-green-500 absolute" />
                    ) : (
                      <Wrench className="h-3 w-3 text-blue-400 absolute" />
                    )}
                  </div>

                  <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-blue-500/20 transition-colors">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{incident.title}</h3>
                        <Badge
                          variant="outline"
                          className={`text-xs w-fit ${
                            incident.status === 'Resolved'
                              ? 'border-green-500/30 text-green-500 bg-green-500/10'
                              : 'border-blue-400/30 text-blue-400 bg-blue-400/10'
                          }`}
                        >
                          {incident.status === 'Resolved' ? t('status.resolved') : incident.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {incident.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {t('status.incidentDuration')}: {incident.duration}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Scheduled Maintenance */}
      <AnimatedSection delay={400}>
        <section className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
            <div className="text-center mb-8">
              <Badge
                variant="outline"
                className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
              >
                <Wrench className="h-4 w-4 mr-1" />
                {t('status.scheduledMaintenance')}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('status.scheduledMaintenance')}
              </h2>
            </div>

            <Card className="border-dashed border-border bg-card/30">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-blue-400" />
                </div>
                <p className="text-muted-foreground text-lg">
                  {t('status.noMaintenance')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
