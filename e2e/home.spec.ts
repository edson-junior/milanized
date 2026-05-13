import { expect, test } from '@playwright/test';

test('homepage loads and shows header', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
  await expect(page.getByRole('banner')).toBeVisible();
});

test('navigation links are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /articles/i })).toBeVisible();
});
