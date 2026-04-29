import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prev = currentPage - 1;
  const next = currentPage + 1;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  // Build a window of page numbers: always show first, last, current ±1, with ellipsis gaps
  const pages: (number | '…')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-10"
    >
      <Link
        href={pageHref(prev)}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
        className={cn(
          'px-3 py-2 rounded text-sm font-medium transition-colors',
          currentPage === 1
            ? 'pointer-events-none text-zinc-400'
            : 'hover:bg-zinc-100 text-zinc-700'
        )}
      >
        ← Prev
      </Link>

      {pages.map((p, i) =>
        p === '…' ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-2 text-sm text-zinc-400 select-none"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? 'page' : undefined}
            className={cn(
              'px-3 py-2 rounded text-sm font-medium transition-colors',
              p === currentPage
                ? 'bg-zinc-800 text-white pointer-events-none'
                : 'hover:bg-zinc-100 text-zinc-700'
            )}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={pageHref(next)}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
        className={cn(
          'px-3 py-2 rounded text-sm font-medium transition-colors',
          currentPage === totalPages
            ? 'pointer-events-none text-zinc-400'
            : 'hover:bg-zinc-100 text-zinc-700'
        )}
      >
        Next →
      </Link>
    </nav>
  );
}
