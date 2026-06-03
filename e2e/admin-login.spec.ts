import { test, expect } from '@playwright/test';

test.describe('Admin login UI', () => {
  test('admin can sign in and reach dashboard', async ({ page }) => {
    await page.goto('/admin');

    await page.getByPlaceholder('admin@fasttesters.com').fill('admin@fasttesters.com');
    await page.getByPlaceholder('Enter your password').fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText(/dashboard/i).first()).toBeVisible({ timeout: 15_000 });
  });
});
