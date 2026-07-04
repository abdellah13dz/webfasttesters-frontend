import { NextResponse } from 'next/server';
import { sendMetaEvent } from '../../../../../../../shared/meta-tracking/server';

export const runtime = 'nodejs';

const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Lead',
  'CompleteRegistration',
  'AddPaymentInfo',
  'InitiateCheckout',
  'Purchase',
  'Login',
  'SubmitClosedTesting',
  'FeedbackReportViewed',
  'QuestionnaireCompleted',
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventName = String(body.eventName || '').trim();
    const eventId = String(body.eventId || '').trim();

    if (!eventName || !eventId || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ success: false, message: 'Invalid event payload' }, { status: 400 });
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const clientIpAddress = forwarded?.split(',')[0]?.trim() || undefined;
    const clientUserAgent = request.headers.get('user-agent') || undefined;

    const result = await sendMetaEvent(
      {
        eventName,
        eventId,
        eventTime: body.eventTime,
        eventSourceUrl: body.eventSourceUrl,
        actionSource: 'website',
        userData: {
          email: body.userData?.email,
          phone: body.userData?.phone,
          firstName: body.userData?.firstName,
          lastName: body.userData?.lastName,
          externalId: body.userData?.externalId,
          fbp: body.fbp,
          fbc: body.fbc,
          clientIpAddress,
          clientUserAgent,
        },
        customData: body.customData,
      },
      // Express-compatible request shape for IP / UA enrichment
      { headers: { 'user-agent': clientUserAgent }, ip: clientIpAddress } as never,
    );

    if (result.skipped) {
      return NextResponse.json({ success: true, skipped: true });
    }

    if (!result.ok) {
      return NextResponse.json({ success: false, message: 'Meta event delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}
