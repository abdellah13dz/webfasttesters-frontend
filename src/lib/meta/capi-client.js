const crypto = require('crypto');

function getConfig() {
  return {
    pixelId: (process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '').trim(),
    accessToken: (process.env.META_ACCESS_TOKEN || '').trim(),
    apiVersion: (process.env.META_API_VERSION || 'v23.0').trim(),
    testEventCode: (process.env.META_TEST_EVENT_CODE || '').trim(),
  };
}

function isMetaCapiConfigured() {
  const { pixelId, accessToken } = getConfig();
  return Boolean(pixelId && accessToken);
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function normalizePhone(phone) {
  return String(phone).replace(/\D/g, '');
}

function normalizeName(name) {
  return String(name).trim().toLowerCase();
}

function hashSha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hashField(value, normalizer) {
  if (!value) return undefined;
  const normalized = normalizer(value);
  if (!normalized) return undefined;
  return hashSha256(normalized);
}

function buildHashedUserData(input = {}, req = null) {
  const userData = {};

  const em = hashField(input.email, normalizeEmail);
  if (em) userData.em = [em];

  const ph = hashField(input.phone, normalizePhone);
  if (ph) userData.ph = [ph];

  const fn = hashField(input.firstName, normalizeName);
  if (fn) userData.fn = [fn];

  const ln = hashField(input.lastName, normalizeName);
  if (ln) userData.ln = [ln];

  if (input.externalId) {
    const ext = hashSha256(String(input.externalId).trim());
    userData.external_id = [ext];
  }

  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const ip = input.clientIpAddress || req?.ip || req?.headers?.['x-forwarded-for']?.split(',')[0]?.trim();
  if (ip) userData.client_ip_address = ip;

  const ua = input.clientUserAgent || req?.headers?.['user-agent'];
  if (ua) userData.client_user_agent = ua;

  return userData;
}

function sanitizeCustomData(data) {
  if (!data || typeof data !== 'object') return undefined;
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'number' && (Number.isNaN(value) || value === 0)) {
      if (key !== 'value') continue;
    }
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function splitName(fullName) {
  if (!fullName?.trim()) return {};
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postWithRetry(url, body, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        return { ok: true, data: json };
      }

      lastError = new Error(json.error?.message || `Meta CAPI HTTP ${res.status}`);
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        break;
      }
    } catch (error) {
      lastError = error;
    }

    if (attempt < maxAttempts) {
      await sleep(attempt * 500);
    }
  }

  return { ok: false, error: lastError };
}

/** Send a single event to Meta Conversions API. */
async function sendMetaEvent(eventPayload, req = null) {
  if (!isMetaCapiConfigured()) {
    return { ok: false, skipped: true };
  }

  const { pixelId, accessToken, apiVersion, testEventCode } = getConfig();
  const {
    eventName,
    eventId,
    eventTime,
    eventSourceUrl,
    actionSource = 'website',
    userData: rawUserData = {},
    customData,
  } = eventPayload;

  if (!eventName || !eventId) {
    return { ok: false, error: new Error('eventName and eventId are required') };
  }

  const userData = buildHashedUserData(rawUserData, req);
  const custom_data = sanitizeCustomData(customData);

  const event = {
    event_name: eventName,
    event_id: eventId,
    event_time: eventTime || Math.floor(Date.now() / 1000),
    action_source: actionSource,
    user_data: userData,
  };

  if (eventSourceUrl) event.event_source_url = eventSourceUrl;
  if (custom_data) event.custom_data = custom_data;

  const body = {
    data: [event],
    access_token: accessToken,
  };

  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events`;

  const result = await postWithRetry(url, body);

  if (!result.ok && !result.skipped) {
    const message = result.error?.message || 'Meta CAPI request failed';
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Meta CAPI]', message);
    } else {
      console.error('[Meta CAPI] Event delivery failed:', eventName);
    }
  }

  return result;
}

module.exports = {
  getConfig,
  isMetaCapiConfigured,
  sendMetaEvent,
  buildHashedUserData,
  hashSha256,
  splitName,
};
