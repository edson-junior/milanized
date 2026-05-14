import { expect, test } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders a heading', async ({ page }) => {
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('renders the main content area', async ({ page }) => {
    await expect(page.getByRole('main')).not.toBeEmpty();
  });
});

test.describe('Privacy Policy page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy-policy');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders a heading', async ({ page }) => {
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('renders the main content area', async ({ page }) => {
    await expect(page.getByRole('main')).not.toBeEmpty();
  });
});

test.describe('Disclaimer page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/disclaimer');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders a heading', async ({ page }) => {
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('renders the main content area', async ({ page }) => {
    await expect(page.getByRole('main')).not.toBeEmpty();
  });
});

test.describe('404 page', () => {
  test('renders a not-found page for an unknown route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-xyz');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('main')).toBeVisible();
  });
});

test.describe('RSS feed', () => {
  test('rss.xml returns a valid XML response', async ({ page }) => {
    const response = await page.request.get('/blog/rss.xml');
    expect(response.status()).toBe(200);
    const headers = response.headers();
    const contentTypeKey = Object.keys(headers).find(
      (k) => k.toLowerCase() === 'content-type'
    );
    const contentType = contentTypeKey ? headers[contentTypeKey] : undefined;
    expect(contentType, 'Expected a content-type header').toBeDefined();
    expect(contentType).toMatch(/xml/);
    const text = await response.text();
    expect(text).toContain('<rss');
  });
});
