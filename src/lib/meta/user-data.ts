import { getFbc, getFbp } from './cookies';
import type { MetaUserDataInput } from './types';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function splitName(fullName?: string | null): { firstName?: string; lastName?: string } {
  if (!fullName?.trim()) return {};
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

/** Build advanced matching object for fbq('init', ...) — Meta hashes PII automatically. */
export function buildAdvancedMatchingParams(
  input?: MetaUserDataInput | null,
): Record<string, string> {
  if (!input) return {};

  const params: Record<string, string> = {};
  const firstName = input.firstName;
  const lastName = input.lastName;

  if (input.email) params.em = normalizeEmail(input.email);
  if (input.phone) params.ph = normalizePhone(input.phone);
  if (firstName) params.fn = normalizeName(firstName);
  if (lastName) params.ln = normalizeName(lastName);
  if (input.externalId) params.external_id = String(input.externalId).trim();

  return params;
}

export function buildAdvancedMatchingFromNameEmail(
  name?: string | null,
  email?: string | null,
  externalId?: string | null,
): Record<string, string> {
  const { firstName, lastName } = splitName(name);
  return buildAdvancedMatchingParams({
    email,
    firstName,
    lastName,
    externalId,
  });
}

export function getBrowserAttributionIds(): { fbp: string | null; fbc: string | null } {
  return { fbp: getFbp(), fbc: getFbc() };
}
