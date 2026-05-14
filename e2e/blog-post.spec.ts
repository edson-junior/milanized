import { expect, test } from '@playwright/test';

// Use a known-stable blog post slug for all post-level tests
const POST_SLUG = '2-days-in-milan';
const POST_URL = `/blog/${POST_SLUG}`;

test.describe('Blog post page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(POST_URL);
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders the post heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders the featured image', async ({ page }) => {
    const image = page.getByRole('main').getByRole('img').first();
    await expect(image).toBeVisible();
  });

  test('renders the post body content', async ({ page }) => {
    const main = page.getByRole('main');
    await expect(main).not.toBeEmpty();
  });

  test('renders the table of contents when present', async ({ page }) => {
    // TOC is expected to exist when the post has headings
    const toc = page
      .locator('nav[aria-label*="contents" i], [class*="toc" i]')
      .first();
    const count = await toc.count();
    if (count > 0) {
      await expect(toc).toBeVisible();
    }
  });

  test('renders the reading time indicator when present', async ({ page }) => {
    // Rendered as a clock icon + text, check for any time-related text
    const timeIndicator = page
      .getByRole('main')
      .locator('[aria-label*="read" i], time, [class*="read"]')
      .first();
    const count = await timeIndicator.count();
    if (count > 0) {
      await expect(timeIndicator).toBeVisible();
    }
  });

  test('renders a related posts section when present', async ({ page }) => {
    const relatedHeading = page.getByRole('heading', {
      name: /related|you might also|more articles/i
    });
    const count = await relatedHeading.count();
    if (count > 0) {
      await expect(relatedHeading).toBeVisible();
    }
  });

  test('contains valid structured data (JSON-LD)', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.innerHTML();
    expect(() => JSON.parse(content)).not.toThrow();
    const data = JSON.parse(content);
    expect(data['@type']).toBeTruthy();
  });

  test('navigating back from a post returns to the blog listing', async ({
    page
  }) => {
    // Start on the blog listing, navigate into a post, then go back
    await page.goto('/blog');
    const firstLink = page.getByRole('main').getByRole('link').first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    await page.goBack();
    await expect(page).toHaveURL('/blog');
  });
});
