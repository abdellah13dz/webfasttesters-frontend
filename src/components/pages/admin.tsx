'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from '@/lib/router';
import AdminLayout from '@/components/admin/admin-layout';
import AdminLogin from '@/components/admin/admin-login';
import { PageLoading } from '@/components/page-loading';
import { clearAdminSession, getStoredAdminSession } from '@/lib/admin-session';
import type { AdminSession } from '@/lib/api';

// Lazy load admin sub-pages
const AdminDashboard = lazy(() => import('@/components/admin/admin-dashboard'));
const AdminArticles = lazy(() => import('@/components/admin/admin-articles'));
const AdminReviews = lazy(() => import('@/components/admin/admin-reviews'));
const AdminPricing = lazy(() => import('@/components/admin/admin-pricing'));
const AdminContacts = lazy(() => import('@/components/admin/admin-contacts'));
const AdminFeedback = lazy(() => import('@/components/admin/admin-feedback'));
const AdminNewsletters = lazy(() => import('@/components/admin/admin-newsletters'));
const AdminAnalytics = lazy(() => import('@/components/admin/admin-analytics'));
const AdminSmtp = lazy(() => import('@/components/admin/admin-smtp'));
const AdminSettings = lazy(() => import('@/components/admin/admin-settings'));
const AdminSubmissions = lazy(() => import('@/components/admin/admin-submissions'));
const AdminMaintenance = lazy(() => import('@/components/admin/admin-maintenance'));
const AdminPages = lazy(() => import('@/components/admin/admin-pages'));
const AdminFaq = lazy(() => import('@/components/admin/admin-faq'));
const AdminChangelog = lazy(() => import('@/components/admin/admin-changelog'));
const AdminStatus = lazy(() => import('@/components/admin/admin-status'));
const AdminSiteSettings = lazy(() => import('@/components/admin/admin-site-settings'));
const AdminNavigation = lazy(() => import('@/components/admin/admin-navigation'));
const AdminTranslations = lazy(() => import('@/components/admin/admin-translations'));
const AdminAuditLog = lazy(() => import('@/components/admin/admin-audit-log'));
const AdminArticleEditor = lazy(() => import('@/components/admin/admin-article-editor'));

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
}

function readStoredAdmin(): AdminData | null {
  const session = getStoredAdminSession();
  if (!session) return null;
  const { token: _token, ...admin } = session;
  return admin;
}

function AdminPageLoader() {
  return <PageLoading variant="minimal" label="Loading…" className="py-20" />;
}

// Map hash paths to admin sub-pages
const pathToPage: Record<string, string> = {
  '/admin': 'dashboard',
  '/admin/dashboard': 'dashboard',
  '/admin/articles': 'articles',
  '/admin/articles/new': 'article-new',
  '/admin/pages': 'pages',
  '/admin/faq': 'faq',
  '/admin/changelog': 'changelog',
  '/admin/status': 'status',
  '/admin/site': 'site',
  '/admin/navigation': 'navigation',
  '/admin/translations': 'translations',
  '/admin/audit-log': 'audit-log',
  '/admin/reviews': 'reviews',
  '/admin/pricing': 'pricing',
  '/admin/contacts': 'contacts',
  '/admin/feedback': 'feedback',
  '/admin/submissions': 'submissions',
  '/admin/newsletters': 'newsletters',
  '/admin/analytics': 'analytics',
  '/admin/smtp': 'smtp',
  '/admin/maintenance': 'maintenance',
  '/admin/settings': 'settings',
};

const pageToPath: Record<string, string> = Object.fromEntries(
  Object.entries(pathToPage).map(([k, v]) => [v, k])
);

interface AdminPageProps {
  initialPage?: string;
}

export default function AdminPage({ initialPage }: AdminPageProps = {}) {
  const { currentPath, navigate } = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      const loginRequired = new URLSearchParams(window.location.search).get('login') === 'required';
      if (loginRequired) {
        clearAdminSession();
        setAdmin(null);
      } else {
        setAdmin(readStoredAdmin());
      }
      setAuthReady(true);
    };

    syncAuth();

    const onSessionExpired = () => {
      clearAdminSession();
      setAdmin(null);
      if (window.location.pathname !== '/admin') {
        navigate('/admin?login=required');
      }
    };

    window.addEventListener('ft-admin-session-expired', onSessionExpired);
    return () => window.removeEventListener('ft-admin-session-expired', onSessionExpired);
  }, [navigate]);

  const getActivePage = () => {
    if (initialPage) return initialPage;
    if (currentPath.startsWith('/admin/articles/edit/')) {
      return 'article-edit';
    }
    return pathToPage[currentPath] || 'dashboard';
  };
  const activePage = getActivePage();

  // Extract article ID from edit path
  const getArticleId = (): string | undefined => {
    if (currentPath.startsWith('/admin/articles/edit/')) {
      return currentPath.replace('/admin/articles/edit/', '');
    }
    return undefined;
  };

  const handleLogin = (data: AdminSession) => {
    setAdmin(data);
    if (currentPath === '/admin') {
      navigate('/admin/dashboard');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setAdmin(null);
  };

  const handleNavigate = (page: string) => {
    const path = pageToPath[page] || '/admin';
    navigate(path);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <AdminPageLoader />
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'articles':
        return <AdminArticles />;
      case 'pages':
        return <AdminPages />;
      case 'faq':
        return <AdminFaq />;
      case 'changelog':
        return <AdminChangelog />;
      case 'status':
        return <AdminStatus />;
      case 'site':
        return <AdminSiteSettings />;
      case 'navigation':
        return <AdminNavigation />;
      case 'translations':
        return <AdminTranslations />;
      case 'audit-log':
        return <AdminAuditLog />;
      case 'article-new':
        return <AdminArticleEditor />;
      case 'article-edit':
        return <AdminArticleEditor articleId={getArticleId()} />;
      case 'reviews':
        return <AdminReviews />;
      case 'pricing':
        return <AdminPricing />;
      case 'contacts':
        return <AdminContacts />;
      case 'feedback':
        return <AdminFeedback />;
      case 'submissions':
        return <AdminSubmissions />;
      case 'newsletters':
        return <AdminNewsletters />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'smtp':
        return <AdminSmtp />;
      case 'maintenance':
        return <AdminMaintenance />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout
      admin={admin}
      onLogout={handleLogout}
      activePage={activePage}
      onNavigate={handleNavigate}
    >
      <Suspense fallback={<AdminPageLoader />}>
        {renderPage()}
      </Suspense>
    </AdminLayout>
  );
}
