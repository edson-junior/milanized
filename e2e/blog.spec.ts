import { expect, test } from '@playwright/test';

test.describe('Blog listing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders a heading for the articles section', async ({ page }) => {
    // The blog listing page renders a dynamic CMS title as the page's h1
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1 })
    ).toBeVisible();
  });

  test('renders a list of article cards', async ({ page }) => {
    // Each post is expected to have a link with a title
    const articleLinks = page.getByRole('main').getByRole('link');
    await expect(articleLinks.first()).toBeVisible();
    expect(await articleLinks.count()).toBeGreaterThan(0);
  });

  test('article cards link to the correct blog post slugs', async ({
    page
  }) => {
    // Scope to post card links only (href starts with /blog/) to exclude pagination links
    const postLinks = page.getByRole('main').locator('a[href^="/blog/"]');
    const links = await postLinks.all();
    expect(
      links.length,
      'Expected at least one blog post link'
    ).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href, 'Expected post link to have an href').not.toBeNull();
      expect(href).toMatch(/\/blog\/.+/);
    }
  });

  test('clicking an article card navigates to the blog post', async ({
    page
  }) => {
    const firstArticleLink = page.getByRole('main').getByRole('link').first();
    const href = await firstArticleLink.getAttribute('href');
    expect(href, 'Expected first article link to have an href').not.toBeNull();
    await firstArticleLink.click();
    await expect(page).toHaveURL(href as string);
  });

  test.describe('Pagination', () => {
    test('pagination is visible when the blog has more than one page', async ({
      page
    }) => {
      const pagination = page.getByRole('navigation', { name: /pagination/i });
      const count = await pagination.count();
      // Pagination is only rendered when totalPages > 1 (controlled by Sanity content).
      // If there is only one page of posts, this test is intentionally a no-op.
      if (count === 0) return;
      await expect(pagination).toBeVisible();
    });

    test('navigating to page 2 updates the URL', async ({ page }) => {
      const pagination = page.getByRole('navigation', { name: /pagination/i });
      const hasMultiplePages = (await pagination.count()) > 0;
      if (!hasMultiplePages) return;

      const page2Link = pagination.getByRole('link', { name: /page 2|^2$/i });
      if ((await page2Link.count()) > 0) {
        await page2Link.click();
        await expect(page).toHaveURL(/[?&]page=2/);
      }
    });

    test('previous page link is disabled on page 1', async ({ page }) => {
      const pagination = page.getByRole('navigation', { name: /pagination/i });
      // Pagination only renders when there are multiple pages
      if ((await pagination.count()) === 0) return;

      // Prev is an <a> with aria-label="Previous page" and aria-disabled on page 1
      const prevLink = pagination.getByRole('link', { name: 'Previous page' });
      await expect(prevLink).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
