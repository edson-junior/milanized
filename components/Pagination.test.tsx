import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

// next/link renders a plain <a> in the test environment
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

const BASE = '/blog';

describe('Pagination', () => {
  describe('when totalPages <= 1', () => {
    it('renders nothing for 0 pages', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={0} basePath={BASE} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing for 1 page', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={1} basePath={BASE} />
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('navigation links', () => {
    it('renders a nav with aria-label "Pagination"', () => {
      render(<Pagination currentPage={2} totalPages={5} basePath={BASE} />);
      expect(
        screen.getByRole('navigation', { name: 'Pagination' })
      ).toBeInTheDocument();
    });

    it('renders a Previous page link', () => {
      render(<Pagination currentPage={2} totalPages={5} basePath={BASE} />);
      expect(
        screen.getByRole('link', { name: 'Previous page' })
      ).toBeInTheDocument();
    });

    it('renders a Next page link', () => {
      render(<Pagination currentPage={2} totalPages={5} basePath={BASE} />);
      expect(
        screen.getByRole('link', { name: 'Next page' })
      ).toBeInTheDocument();
    });
  });

  describe('disabled states', () => {
    it('marks the Previous link as aria-disabled on page 1', () => {
      render(<Pagination currentPage={1} totalPages={3} basePath={BASE} />);
      const prev = screen.getByRole('link', { name: 'Previous page' });
      expect(prev).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not disable Previous link on page > 1', () => {
      render(<Pagination currentPage={2} totalPages={3} basePath={BASE} />);
      const prev = screen.getByRole('link', { name: 'Previous page' });
      expect(prev).toHaveAttribute('aria-disabled', 'false');
    });

    it('marks the Next link as aria-disabled on the last page', () => {
      render(<Pagination currentPage={3} totalPages={3} basePath={BASE} />);
      const next = screen.getByRole('link', { name: 'Next page' });
      expect(next).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not disable Next link when not on the last page', () => {
      render(<Pagination currentPage={2} totalPages={3} basePath={BASE} />);
      const next = screen.getByRole('link', { name: 'Next page' });
      expect(next).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('href generation', () => {
    it('links page 1 to basePath without a query string', () => {
      render(<Pagination currentPage={2} totalPages={3} basePath={BASE} />);
      const page1 = screen.getByRole('link', { name: 'Page 1' });
      expect(page1).toHaveAttribute('href', BASE);
    });

    it('links page 2+ with ?page=N query parameter', () => {
      render(<Pagination currentPage={1} totalPages={3} basePath={BASE} />);
      const page2 = screen.getByRole('link', { name: 'Page 2' });
      expect(page2).toHaveAttribute('href', `${BASE}?page=2`);
    });

    it('Previous href points to the previous page', () => {
      render(<Pagination currentPage={3} totalPages={5} basePath={BASE} />);
      const prev = screen.getByRole('link', { name: 'Previous page' });
      expect(prev).toHaveAttribute('href', `${BASE}?page=2`);
    });

    it('Next href points to the next page', () => {
      render(<Pagination currentPage={2} totalPages={5} basePath={BASE} />);
      const next = screen.getByRole('link', { name: 'Next page' });
      expect(next).toHaveAttribute('href', `${BASE}?page=3`);
    });
  });

  describe('page window and ellipsis', () => {
    it('marks the current page link as aria-current="page"', () => {
      render(<Pagination currentPage={3} totalPages={5} basePath={BASE} />);
      const current = screen.getByRole('link', { name: 'Page 3' });
      expect(current).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark other pages as aria-current', () => {
      render(<Pagination currentPage={3} totalPages={5} basePath={BASE} />);
      const page1 = screen.getByRole('link', { name: 'Page 1' });
      expect(page1).not.toHaveAttribute('aria-current', 'page');
    });

    it('renders all pages without ellipsis for a small range', () => {
      render(<Pagination currentPage={1} totalPages={3} basePath={BASE} />);
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 3' })).toBeInTheDocument();
    });

    it('inserts ellipsis for large page ranges', () => {
      render(<Pagination currentPage={1} totalPages={10} basePath={BASE} />);
      // Should show 1, 2, …, 10 (current ±1 = pages 1 and 2, plus first and last)
      expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    });
  });
});
