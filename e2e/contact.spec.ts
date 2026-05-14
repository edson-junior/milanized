import { expect, test } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('has a document title', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test('renders the contact page heading', async ({ page }) => {
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test.describe('Contact form', () => {
    test('renders all required form fields', async ({ page }) => {
      await expect(page.getByLabel(/name/i)).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/message/i)).toBeVisible();
    });

    test('renders the submit button', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: /send|submit/i })
      ).toBeVisible();
    });

    test('name field has correct autocomplete attribute', async ({ page }) => {
      await expect(page.getByLabel(/name/i)).toHaveAttribute(
        'autocomplete',
        'name'
      );
    });

    test('email field has correct autocomplete and type attributes', async ({
      page
    }) => {
      const emailField = page.getByLabel(/email/i);
      await expect(emailField).toHaveAttribute('type', 'email');
      await expect(emailField).toHaveAttribute('autocomplete', 'email');
    });

    test('form fields are editable', async ({ page }) => {
      await page.getByLabel(/name/i).fill('Jane Doe');
      await page.getByLabel(/email/i).fill('jane@example.com');
      await page.getByLabel(/message/i).fill('Hello, I have a question.');

      await expect(page.getByLabel(/name/i)).toHaveValue('Jane Doe');
      await expect(page.getByLabel(/email/i)).toHaveValue('jane@example.com');
      await expect(page.getByLabel(/message/i)).toHaveValue(
        'Hello, I have a question.'
      );
    });
  });

  test.describe('Form success/error states', () => {
    test('success message is visible when ?success param is present', async ({
      page
    }) => {
      // The contact page checks success === '1' (not 'true')
      await page.goto('/contact?success=1');
      await expect(page.getByRole('alert').first()).toBeVisible();
      await expect(page.getByRole('alert').first()).toContainText(
        /sent|touch/i
      );
    });

    test('captcha error message is visible when ?error=captcha is present', async ({
      page
    }) => {
      await page.goto('/contact?error=captcha');
      await expect(page.getByRole('alert').first()).toBeVisible();
      await expect(page.getByRole('alert').first()).toContainText(
        /security check|captcha/i
      );
    });

    test('send error message is visible when ?error=send is present', async ({
      page
    }) => {
      await page.goto('/contact?error=send');
      await expect(page.getByRole('alert').first()).toBeVisible();
      await expect(page.getByRole('alert').first()).toContainText(
        /something went wrong/i
      );
    });

    test('validation error message is visible when ?error=validation is present', async ({
      page
    }) => {
      await page.goto('/contact?error=validation');
      await expect(page.getByRole('alert').first()).toBeVisible();
      await expect(page.getByRole('alert').first()).toContainText(
        /fill in all required/i
      );
    });

    test('form is hidden after successful submission', async ({ page }) => {
      // Page uses success === '1'; form is conditionally not rendered on success
      await page.goto('/contact?success=1');
      await expect(page.getByRole('main').locator('form')).toBeHidden();
    });
  });
});
