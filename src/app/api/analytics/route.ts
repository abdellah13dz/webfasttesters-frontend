import { NextRequest, NextResponse } from 'next/server';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || 'https://webapi.fasttesters.com'
).replace(/\/$/, '');

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code');
    const city =
      req.headers.get('x-vercel-ip-city') ||
      req.headers.get('cf-ipcity') ||
      req.headers.get('x-city');
    const region =
      req.headers.get('x-vercel-ip-country-region') ||
      req.headers.get('cf-region') ||
      req.headers.get('x-region');

    const enrichEvent = (event: Record<string, unknown>) => ({
      ...event,
      country: event.country || country || null,
      city: event.city || (city ? decodeURIComponent(city) : null),
      region: event.region || region || null,
    });

    const events = Array.isArray(body.events)
      ? (body.events as Record<string, unknown>[]).map(enrichEvent)
      : [enrichEvent(body)];

    const upstream = await fetch(`${API_BASE}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': req.headers.get('user-agent') || '',
        'Accept-Language': req.headers.get('accept-language') || '',
        ...(country ? { 'x-vercel-ip-country': country } : {}),
        ...(city ? { 'x-vercel-ip-city': city } : {}),
        ...(region ? { 'x-vercel-ip-country-region': region } : {}),
      },
      body: JSON.stringify({ events }),
      cache: 'no-store',
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Analytics proxy error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
