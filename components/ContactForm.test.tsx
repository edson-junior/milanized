import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactForm from './ContactForm';

// Mock dependencies that require server/browser APIs unavailable in the test environment
vi.mock('@/app/actions/contact', () => ({
  sendContactEmail: vi.fn()
}));

vi.mock('./TurnstileWidget', () => ({
  default: () => <div data-testid="turnstile-mock" />
}));

vi.mock('./SubmitButton', () => ({
  default: ({ label = 'Submit' }: { label?: string }) => (
    <button type="submit">{label}</button>
  )
}));

describe('ContactForm', () => {
  describe('success state', () => {
    it('shows the success alert when success=true', () => {
      render(<ContactForm success={true} />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(/message has been sent/i);
    });

    it('hides the form when success=true', () => {
      render(<ContactForm success={true} />);
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
    });
  });

  describe('error states', () => {
    it('shows the captcha error alert when errorType="captcha"', () => {
      render(<ContactForm errorType="captcha" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(/security check failed/i);
    });

    it('shows the send error alert when errorType="send"', () => {
      render(<ContactForm errorType="send" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(/something went wrong sending/i);
    });

    it('shows the validation error alert when errorType="validation"', () => {
      render(<ContactForm errorType="validation" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(/fill in all required fields/i);
    });

    it('renders the form alongside an error alert', () => {
      render(<ContactForm errorType="captcha" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      // form fields should still be present
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
  });

  describe('default state (no props)', () => {
    it('renders named form fields', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders no alert', () => {
      render(<ContactForm />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renders the submit button', () => {
      render(<ContactForm />);
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
    });
  });
});
