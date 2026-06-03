import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const TOKEN_COOKIE = 'ft-admin-token';
const DEFAULT_JWT_SECRET = 'dev-secret-change-in-production';

function getJwtSecret(): string {
  return process.env.AUTH_JWT_SECRET || process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/admin', request.url);
  loginUrl.searchParams.set('login', 'required');
  return NextResponse.redirect(loginUrl);
}

function withPathnameHeader(request: NextRequest, response: NextResponse) {
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') {
      return withPathnameHeader(request, NextResponse.next());
    }

    const token = request.cookies.get(TOKEN_COOKIE)?.value;
    if (!token) {
      return redirectToLogin(request);
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(getJwtSecret()));
      if (payload.role !== 'admin') {
        return redirectToLogin(request);
      }
      return withPathnameHeader(request, NextResponse.next());
    } catch {
      return redirectToLogin(request);
    }
  }

  return withPathnameHeader(request, NextResponse.next());
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|txt|xml|webmanifest)$).*)',
  ],
};
