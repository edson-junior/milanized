import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CTA from './CTA';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

const SITE_URL = 'https://example.com';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_CLIENT_URL', SITE_URL);
});

const makeLink = (overrides: Record<string, unknown> = {}) => ({
  _type: 'link',
  type: 'internal',
  label: 'Click me',
  internal: { metadata: { slug: 'test-post' } },
  external: undefined as string | undefined,
  blank: false,
  ...overrides
});

describe('CTA', () => {
  describe('internal link', () => {
    it('renders an anchor pointing to the internal slug URL', () => {
      render(<CTA link={makeLink()}>Click me</CTA>);
      const link = screen.getByRole('link', { name: 'Click me' });
      expect(link).toHaveAttribute('href', `${SITE_URL}/blog/test-post`);
    });

    it('does not add target=_blank for internal links', () => {
      render(<CTA link={makeLink()}>Click me</CTA>);
      expect(screen.getByRole('link')).not.toHaveAttribute('target');
    });

    it('renders null when internal metadata is missing', () => {
      const { container } = render(
        <CTA link={makeLink({ internal: null })}>Click me</CTA>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('external link with blank=true', () => {
    const externalBlankLink = makeLink({
      type: 'external',
      external: 'https://other.com',
      blank: true
    });

    it('renders an anchor with the external href', () => {
      render(<CTA link={externalBlankLink}>Visit</CTA>);
      expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute(
        'href',
        'https://other.com'
      );
    });

    it('opens in a new tab', () => {
      render(<CTA link={externalBlankLink}>Visit</CTA>);
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });

    it('has rel="noreferrer noopener"', () => {
      render(<CTA link={externalBlankLink}>Visit</CTA>);
      expect(screen.getByRole('link')).toHaveAttribute(
        'rel',
        'noreferrer noopener'
      );
    });
  });

  describe('external link with blank=false', () => {
    const externalLink = makeLink({
      type: 'external',
      external: 'https://other.com',
      blank: false
    });

    it('renders an anchor with the external href', () => {
      render(<CTA link={externalLink}>Visit</CTA>);
      expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute(
        'href',
        'https://other.com'
      );
    });

    it('does not open in a new tab', () => {
      render(<CTA link={externalLink}>Visit</CTA>);
      expect(screen.getByRole('link')).not.toHaveAttribute('target');
    });

    it('renders null when external URL is missing', () => {
      const { container } = render(
        <CTA link={makeLink({ type: 'external', external: undefined })}>
          Visit
        </CTA>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('unknown link type', () => {
    it('renders nothing', () => {
      const { container } = render(
        <CTA link={makeLink({ type: 'unknown' })}>Noop</CTA>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });
});
