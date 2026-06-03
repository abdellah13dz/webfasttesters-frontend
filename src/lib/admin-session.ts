import type { AdminSession } from '@/lib/api';

const SESSION_KEY = 'ft-admin';
const TOKEN_COOKIE = 'ft-admin-token';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export function setAdminSession(session: AdminSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(session.token)}; path=/; max-age=${TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearAdminSession(): void {
  localStorage.removeItem(SESSION_KEY);
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function getStoredAdmin(): Omit<AdminSession, 'token'> | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as AdminSession;
    if (!parsed.token) return null;
    const { token: _token, ...admin } = parsed;
    return admin;
  } catch {
    return null;
  }
}

export function getStoredAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as AdminSession;
    if (!parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}
