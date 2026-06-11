const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || 'https://webapi.fasttesters.com'
).replace(/\/$/, '');
const ADMIN_SESSION_KEY = 'ft-admin';

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  // Browser: same-origin /api/* proxied by Next.js (avoids CORS + mixed content).
  if (typeof window !== 'undefined') {
    return normalized;
  }
  return `${API_BASE}${normalized}`;
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as AdminSession;
    if (!parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getAdminToken(): string | null {
  return getAdminSession()?.token ?? null;
}

function isAdminApiPath(path: string): boolean {
  return path.startsWith('/api/admin/') && path !== '/api/admin/auth';
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);

  if (isAdminApiPath(path)) {
    const token = getAdminToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(apiUrl(path), { ...init, headers });

  if (typeof window !== 'undefined' && response.status === 401 && isAdminApiPath(path)) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    document.cookie = 'ft-admin-token=; path=/; max-age=0; SameSite=Lax';
    if (window.location.pathname.startsWith('/admin')) {
      window.dispatchEvent(new CustomEvent('ft-admin-session-expired'));
    }
  }

  return response;
}
