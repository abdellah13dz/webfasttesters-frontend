import { apiFetch } from './api';

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  pageType: string;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: string | null;
  sortOrder: number;
  published: boolean;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  tags: string;
  icon: string;
  publishedAt: string;
  sortOrder: number;
  published: boolean;
}

export interface StatusService {
  id: string;
  name: string;
  icon: string;
  uptime30Day: string;
  status: string;
  sortOrder: number;
  active: boolean;
}

export interface StatusIncident {
  id: string;
  title: string;
  description: string;
  status: string;
  occurredAt: string;
  duration: string | null;
  sortOrder: number;
  published: boolean;
}

export interface StatusData {
  services: StatusService[];
  incidents: StatusIncident[];
}

export async function fetchPublicPage(slug: string): Promise<CmsPage | null> {
  try {
    const res = await apiFetch(`/api/pages/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchPublicFaq(): Promise<FaqItem[]> {
  try {
    const res = await apiFetch('/api/faq');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchPublicChangelog(): Promise<ChangelogEntry[]> {
  try {
    const res = await apiFetch('/api/changelog');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchPublicStatus(): Promise<StatusData | null> {
  try {
    const res = await apiFetch('/api/status');
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function parseChangelogTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function formatChangelogDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  } catch {
    return dateStr;
  }
}

export function formatIncidentDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
