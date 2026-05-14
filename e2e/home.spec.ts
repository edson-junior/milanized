import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders the hero section', async ({ page }) => {
    await expect(page.getByTestId('home-hero')).toBeVisible();
  });

  test('renders the Plan Your Trip section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /plan your trip/i })
    ).toBeVisible();
  });

  test('Plan Your Trip cards link to the correct blog posts', async ({
    page
  }) => {
    const planSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: /plan your trip/i })
    });
    const expectedLinks = [
      { label: /first time in milan/i, href: '/blog/2-days-in-milan' },
      { label: /what to eat/i, href: '/blog/what-to-eat-in-milan' },
      { label: /getting around/i, href: '/blog/public-transport-in-milan' },
      { label: /day trips/i, href: '/blog/day-trips-from-milan' }
    ];

    for (const { label, href } of expectedLinks) {
      await expect(
        planSection.getByRole('link', { name: label })
      ).toHaveAttribute('href', href);
    }
  });

  test('renders the Explore By Category section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /explore milan by category/i })
    ).toBeVisible();
  });

  test('Explore By Category links navigate to the correct blog posts', async ({
    page
  }) => {
    const exploreSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: /explore milan by category/i })
    });
    const expectedLinks = [
      { label: /things to do/i, href: '/blog/best-attractions-in-milan' },
      { label: /food & drink/i, href: '/blog/what-to-eat-in-milan' },
      { label: /hidden gems/i, href: '/blog/hidden-gems-of-milan' },
      { label: /day trips/i, href: '/blog/day-trips-from-milan' },
      { label: /getting around/i, href: '/blog/public-transport-in-milan' },
      { label: /events/i, href: '/blog/christmas-in-milan' }
    ];

    for (const { label, href } of expectedLinks) {
      await expect(
        exploreSection.getByRole('link', { name: label })
      ).toHaveAttribute('href', href);
    }
  });

  test('renders the featured post section', async ({ page }) => {
    // FeaturedPost renders a <section> containing a 'Featured' badge span
    const featuredSection = page.locator('section').filter({
      has: page.locator('span', { hasText: 'Featured' })
    });
    await expect(featuredSection.first()).toBeVisible();
  });

  test('renders the footer', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('has a skip-to-content or main landmark', async ({ page }) => {
    // Skip link exists in the DOM and points to #main-content (sr-only but keyboard-focusable)
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // The skip link becomes visible on focus — verify it is focusable
    await skipLink.focus();
    await expect(skipLink).toBeVisible();

    // A proper <main> landmark with id="main-content" is present
    await expect(page.locator('main#main-content')).toBeAttached();
  });
});
