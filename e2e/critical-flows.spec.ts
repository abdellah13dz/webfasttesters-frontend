import { test, expect } from '@playwright/test';

const API_URL = process.env.PLAYWRIGHT_API_URL || 'http://localhost:4000';

test.describe('Admin auth API', () => {
  test('login returns token for default admin', async ({ request }) => {
    const res = await request.post(`${API_URL}/api/admin/auth`, {
      data: {
        email: 'admin@fasttesters.com',
        password: 'admin123',
      },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.token).toBeTruthy();
    expect(body.role).toBe('admin');
  });
});

test.describe('Contact submit API', () => {
  test('creates contact without recaptcha when secret not configured', async ({ request }) => {
    const res = await request.post(`${API_URL}/api/contact`, {
      data: {
        name: 'E2E Tester',
        email: 'e2e@example.com',
        subject: 'Playwright test',
        message: 'Automated contact form test',
      },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.id).toBeTruthy();
    expect(body.email).toBe('e2e@example.com');
  });
});

test.describe('Article publish flow API', () => {
  test('draft article is not returned on public API; published is', async ({ request }) => {
    const loginRes = await request.post(`${API_URL}/api/admin/auth`, {
      data: { email: 'admin@fasttesters.com', password: 'admin123' },
    });
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();

    const slug = `e2e-test-${Date.now()}`;
    const createRes = await request.post(`${API_URL}/api/admin/articles`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        slug,
        title: 'E2E Draft Article',
        description: 'Draft should not leak',
        content: 'Test content',
        category: 'GOOGLE PLAY',
        status: 'draft',
      },
    });
    expect(createRes.status()).toBe(201);
    const article = await createRes.json();

    const publicDraftRes = await request.get(`${API_URL}/api/articles?slug=${slug}`);
    expect(publicDraftRes.ok()).toBeTruthy();
    const publicDrafts = await publicDraftRes.json();
    expect(publicDrafts.find((a: { slug: string }) => a.slug === slug)).toBeFalsy();

    const publishRes = await request.put(`${API_URL}/api/admin/articles/${article.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { status: 'published' },
    });
    expect(publishRes.ok()).toBeTruthy();

    const publicPublishedRes = await request.get(`${API_URL}/api/articles?slug=${slug}`);
    const published = await publicPublishedRes.json();
    expect(published.some((a: { slug: string }) => a.slug === slug)).toBeTruthy();

    await request.delete(`${API_URL}/api/admin/articles/${article.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});
