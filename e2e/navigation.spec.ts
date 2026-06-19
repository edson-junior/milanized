import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the site header', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('logo links back to the homepage', async ({ page }) => {
    const logo = page
      .getByRole('banner')
      .getByRole('link', { name: /milanized/i });
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('renders main navigation links on desktop', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', {
      name: 'Main navigation'
    });
    await expect(desktopNav).toBeVisible();
    await expect(
      desktopNav.getByRole('link', { name: /articles/i })
    ).toBeVisible();
    await expect(
      desktopNav.getByRole('link', { name: /about/i })
    ).toBeVisible();
    await expect(
      desktopNav.getByRole('link', { name: /contact/i })
    ).toBeVisible();
  });

  test('Articles link navigates to the blog listing page', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', {
      name: 'Main navigation'
    });
    await desktopNav.getByRole('link', { name: /articles/i }).click();
    await expect(page).toHaveURL('/blog');
  });

  test('About link navigates to the about page', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', {
      name: 'Main navigation'
    });
    await desktopNav.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('Contact link navigates to the contact page', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', {
      name: 'Main navigation'
    });
    await desktopNav.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test.describe('Search', () => {
    test('search button is visible in the header', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: /open search/i })
      ).toBeVisible();
    });

    test('clicking search button opens the search input', async ({ page }) => {
      await page.getByRole('button', { name: /open search/i }).click();
      // Input is type="text" (role: textbox), targeted via its visible label
      await expect(page.getByLabel('Search articles')).toBeVisible();
    });

    test('typing a query and submitting navigates to search results', async ({
      page
    }) => {
      await page.getByRole('button', { name: /open search/i }).click();
      await page.getByLabel('Search articles').fill('milan');
      await page.getByLabel('Search articles').press('Enter');
      await expect(page).toHaveURL(/\/search\?query=milan/);
    });
  });
});
