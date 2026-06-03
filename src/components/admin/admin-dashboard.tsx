'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FileText,
  Star,
  Mail,
  Users,
  Plus,
  BarChart3,
  MessageSquare,
  ArrowRight,
  Clock,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Article {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
}

interface Review {
  id: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'pending' | 'replied' | 'closed';
  createdAt: string;
}

interface NewsletterResponse {
  total: number;
  data?: unknown[];
}

interface DashboardStats {
  totalArticles: number;
  totalReviews: number;
  pendingContacts: number;
  newsletterSubscribers: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const articleStatusConfig: Record<string, { label: string; className: string }> = {
  published: { label: 'Published', className: 'bg-green-500/15 text-green-600 border-green-500/25' },
  draft: { label: 'Draft', className: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/25' },
  hidden: { label: 'Hidden', className: 'bg-red-500/15 text-red-600 border-red-500/25' },
};

const contactStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-orange-500/15 text-orange-600 border-orange-500/25' },
  replied: { label: 'Replied', className: 'bg-green-500/15 text-green-600 border-green-500/25' },
  closed: { label: 'Closed', className: 'bg-gray-500/15 text-gray-500 border-gray-500/25' },
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminDashboard() {
  const { navigate } = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [articlesRes, reviewsRes, contactsRes, newslettersRes] = await Promise.all([
        apiFetch('/api/admin/articles'),
        apiFetch('/api/admin/reviews'),
        apiFetch('/api/admin/contacts?pageSize=5'),
        apiFetch('/api/admin/newsletters?pageSize=1'),
      ]);

      // Articles
      const articlesData = articlesRes.ok ? await articlesRes.json() : [];
      const articlesList: Article[] = Array.isArray(articlesData) ? articlesData : [];
      setRecentArticles(articlesList.slice(0, 5));

      // Reviews
      const reviewsData = reviewsRes.ok ? await reviewsRes.json() : [];
      const reviewsList: Review[] = Array.isArray(reviewsData) ? reviewsData : [];

      // Contacts
      const contactsData = contactsRes.ok ? await contactsRes.json() : {};
      const contactsList: Contact[] = Array.isArray(contactsData)
        ? contactsData
        : contactsData.data
          ? (contactsData.data as Contact[])
          : [];
      setRecentContacts(contactsList.slice(0, 5));

      // Newsletters
      const newslettersData: NewsletterResponse = newslettersRes.ok ? await newslettersRes.json() : {};

      const pendingCount = Array.isArray(contactsData)
        ? contactsData.filter((c: Contact) => c.status === 'pending').length
        : contactsData.pendingCount ?? 0;

      setStats({
        totalArticles: articlesList.length,
        totalReviews: reviewsList.length,
        pendingContacts: pendingCount,
        newsletterSubscribers: newslettersData.total ?? (Array.isArray(newslettersData) ? newslettersData.length : 0),
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // -------------------------------------------------------------------------
  // Stats cards configuration
  // -------------------------------------------------------------------------

  const statsCards = [
    {
      title: 'Total Articles',
      value: stats?.totalArticles ?? 0,
      icon: FileText,
      color: 'blue',
      bgClass: 'bg-blue-500/10',
      textClass: 'text-blue-500',
    },
    {
      title: 'Total Reviews',
      value: stats?.totalReviews ?? 0,
      icon: Star,
      color: 'cyan',
      bgClass: 'bg-cyan-500/10',
      textClass: 'text-cyan-500',
    },
    {
      title: 'Pending Contacts',
      value: stats?.pendingContacts ?? 0,
      icon: Mail,
      color: 'orange',
      bgClass: 'bg-orange-500/10',
      textClass: 'text-orange-500',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats?.newsletterSubscribers ?? 0,
      icon: Users,
      color: 'green',
      bgClass: 'bg-green-500/10',
      textClass: 'text-green-500',
    },
  ];

  // -------------------------------------------------------------------------
  // Quick actions configuration
  // -------------------------------------------------------------------------

  const quickActions = [
    { label: 'New Article', icon: Plus, className: 'bg-blue-500 hover:bg-blue-600 text-white', action: () => navigate('/admin/articles/new') },
    { label: 'Add Review', icon: Star, className: 'bg-cyan-500 hover:bg-cyan-600 text-white', action: () => navigate('/admin/reviews') },
    { label: 'View Contacts', icon: MessageSquare, className: 'bg-orange-500 hover:bg-orange-600 text-white', action: () => navigate('/admin/contacts') },
    { label: 'Check Analytics', icon: BarChart3, className: 'bg-green-500 hover:bg-green-600 text-white', action: () => navigate('/admin/analytics') },
  ];

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
                      <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgClass}`}>
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
      {/* Quick Actions                                                      */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  onClick={action.action}
                  className={`${action.className} h-auto py-4 flex-col gap-2 rounded-xl shadow-sm`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* Recent Activity                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Articles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Recent Articles
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs gap-1" onClick={() => navigate('/admin/articles')}>
              View all
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentArticles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <FileText className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No articles yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentArticles.map((article) => {
                  const statusCfg = articleStatusConfig[article.status] ?? articleStatusConfig.draft;
                  return (
                    <div
                      key={article.id}
                      className="flex items-center justify-between gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" />
                          {formatDate(article.createdAt)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[11px] ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-500" />
              Recent Contacts
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs gap-1" onClick={() => navigate('/admin/contacts')}>
              View all
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Mail className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No contacts yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentContacts.map((contact) => {
                  const statusCfg = contactStatusConfig[contact.status] ?? contactStatusConfig.pending;
                  return (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {contact.subject || contact.name}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" />
                          {contact.name} &middot; {formatDate(contact.createdAt)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[11px] ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
