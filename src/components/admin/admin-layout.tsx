'use client';

import { apiFetch } from '@/lib/api';
import { useRouter } from '@/lib/router';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  FileText,
  Star,
  DollarSign,
  Mail,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  Eye,
  Clock,
  MessageSquare,
  MessageSquareHeart,
  Sun,
  Moon,
  Upload,
  Wrench,
  HelpCircle,
  Rocket,
  Activity,
  Layout,
  Globe2,
  Languages,
  Navigation,
  ScrollText,
} from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminLayoutProps {
  admin: AdminData;
  onLogout: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'articles', label: 'Articles', icon: FileText },
  { id: 'pages', label: 'Pages', icon: Layout },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'changelog', label: 'Changelog', icon: Rocket },
  { id: 'status', label: 'Status', icon: Activity },
  { id: 'site', label: 'Site Settings', icon: Globe2 },
  { id: 'navigation', label: 'Navigation', icon: Navigation },
  { id: 'translations', label: 'Translations', icon: Languages },
  { id: 'audit-log', label: 'Audit Log', icon: ScrollText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'submissions', label: 'Submissions', icon: Upload },
  { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart },
  { id: 'newsletters', label: 'Newsletters', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'smtp', label: 'SMTP Config', icon: MessageSquare },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ admin, onLogout, activePage, onNavigate, children }: AdminLayoutProps) {
  const { navigate } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Normalize article sub-routes so sidebar highlights "Articles"
  const sidebarActivePage = activePage === 'article-new' || activePage === 'article-edit' ? 'articles' : activePage;

  // Get display title for header
  const getPageTitle = () => {
    if (activePage === 'article-new') return 'New Article';
    if (activePage === 'article-edit') return 'Edit Article';
    if (activePage === 'smtp') return 'SMTP Configuration';
    return activePage;
  };
  const { theme, setTheme } = useTheme();
  const [stats, setStats] = useState({
    articles: 0,
    reviews: 0,
    contacts: 0,
    feedback: 0,
    newsletters: 0,
    pendingContacts: 0,
    newFeedback: 0,
    pendingSubmissions: 0,
    publishedArticles: 0,
  });

  useEffect(() => {
    if (!sidebarOpen) return;
    document.body.classList.add('mobile-nav-open');
    return () => document.body.classList.remove('mobile-nav-open');
  }, [sidebarOpen]);

  useEffect(() => {
    (async () => {
      try {
        const [articlesRes, reviewsRes, contactsRes, submissionsRes, feedbackRes, newslettersRes] = await Promise.all([
          apiFetch('/api/admin/articles'),
          apiFetch('/api/admin/reviews'),
          apiFetch('/api/admin/contacts'),
          apiFetch('/api/admin/submissions?pageSize=100'),
          apiFetch('/api/admin/feedback'),
          apiFetch('/api/admin/newsletters'),
        ]);

        const articles = articlesRes.ok ? await articlesRes.json() : [];
        const reviews = reviewsRes.ok ? await reviewsRes.json() : [];
        const contacts = contactsRes.ok ? await contactsRes.json() : {};
        const submissions = submissionsRes.ok ? await submissionsRes.json() : {};
        const feedback = feedbackRes.ok ? await feedbackRes.json() : {};
        const newsletters = newslettersRes.ok ? await newslettersRes.json() : {};

        const feedbackList = Array.isArray(feedback) ? feedback : feedback.data || [];
        const submissionsList = Array.isArray(submissions) ? submissions : submissions.data || [];

        setStats({
          articles: Array.isArray(articles) ? articles.length : 0,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
          contacts: contacts.total || (Array.isArray(contacts) ? contacts.length : 0),
          feedback: feedback.total || feedbackList.length,
          newsletters: newsletters.total || (Array.isArray(newsletters) ? newsletters.length : 0),
          pendingContacts: Array.isArray(contacts.data) ? contacts.data.filter((c: { status: string }) => c.status === 'pending').length : 0,
          newFeedback: feedbackList.filter((f: { status: string }) => f.status === 'new').length,
          pendingSubmissions: submissionsList.filter((s: { status: string }) => s.status === 'pending').length,
          publishedArticles: Array.isArray(articles) ? articles.filter((a: { status: string }) => a.status === 'published').length : 0,
        });
      } catch (e) {
        console.error('Failed to load stats', e);
      }
    })();
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/admin?login=required');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — fixed on all breakpoints; main content uses lg:pl-64 offset */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(85vw,16rem)] max-w-xs flex-col border-r border-border bg-card transition-transform duration-300 ease-out lg:w-64 safe-area-top safe-area-bottom ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Logo */}
          <div className="flex shrink-0 items-center justify-between px-4 h-14 sm:h-16 border-b border-border">
            <div className="flex items-center gap-2">
              <BrandLogo size="md" />
              <span className="font-bold text-foreground text-sm sm:text-base truncate">Admin Panel</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex min-h-11 items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    sidebarActivePage === item.id
                      ? 'bg-blue-500/10 text-blue-500 font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {item.id === 'contacts' && stats.pendingContacts > 0 && (
                    <Badge className="ml-auto bg-blue-500 text-white text-[10px] px-1.5 py-0 h-5">
                      {stats.pendingContacts}
                    </Badge>
                  )}
                  {item.id === 'submissions' && stats.pendingSubmissions > 0 && (
                    <Badge className="ml-auto bg-blue-500 text-white text-[10px] px-1.5 py-0 h-5">
                      {stats.pendingSubmissions}
                    </Badge>
                  )}
                  {item.id === 'feedback' && stats.newFeedback > 0 && (
                    <Badge className="ml-auto bg-blue-500 text-white text-[10px] px-1.5 py-0 h-5">
                      {stats.newFeedback}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-semibold text-sm">
                {admin.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{admin.name}</p>
                <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate('/')}
              >
                <Home className="h-3 w-3 mr-1" />
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-card/95 px-3 backdrop-blur-sm supports-[backdrop-filter]:bg-card/80 sm:h-16 sm:px-4 lg:px-6 safe-area-x">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0 touch-target"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="truncate text-base sm:text-lg mx-6 font-semibold text-foreground capitalize">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Badge variant="outline" className="hidden min-[380px]:inline-flex border-blue-500/30 text-blue-400 text-xs">
              Admin
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
