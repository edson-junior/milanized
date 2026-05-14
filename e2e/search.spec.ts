import { expect, test } from '@playwright/test';

test.describe('Search page', () => {
  test('renders the search hero heading', async ({ page }) => {
    await page.goto('/search');
    await expect(
      page.getByRole('heading', { name: /search/i }).first()
    ).toBeVisible();
  });

  test('renders the search page with no query', async ({ page }) => {
    await page.goto('/search');
    // With no query the page title is 'Search', not 'Search results for: X'
    await expect(
      page.getByRole('heading', { name: /^search$/i }).first()
    ).toBeVisible();
    // The subtitle prompt is always shown regardless of query
    await expect(
      page.getByText(/not what you're looking for/i).first()
    ).toBeVisible();
  });

  test('searching via the header navigates to the correct URL', async ({
    page
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /open search/i }).click();
    // Input is type="text" (role: textbox), targeted via its label
    await page.getByLabel('Search articles').fill('aperitivo');
    await page.getByLabel('Search articles').press('Enter');
    await expect(page).toHaveURL('/search?query=aperitivo');
  });

  test('search results page shows the query in the heading', async ({
    page
  }) => {
    await page.goto('/search?query=milan');
    await expect(
      page.getByRole('heading', { name: /milan/i }).first()
    ).toBeVisible();
  });

  test('search results page shows article cards when results exist', async ({
    page
  }) => {
    await page.goto('/search?query=milan');
    const links = page.getByRole('main').getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    await expect(links.first()).toBeVisible();
  });

  test('search result links point to blog posts', async ({ page }) => {
    await page.goto('/search?query=milan');
    const links = page.getByRole('main').getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    const href = await links.first().getAttribute('href');
    expect(href, 'Expected search result link to have an href').not.toBeNull();
    expect(href).toMatch(/\/blog\/.+/);
  });

  test('shows "no results" message for a nonsense query', async ({ page }) => {
    await page.goto('/search?query=xyznonexistentterm12345');
    await expect(page.getByText(/no results/i).first()).toBeVisible();
  });

  test('search results page has a noindex meta robots tag', async ({
    page
  }) => {
    await page.goto('/search?query=test');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /noindex/);
  });
});
