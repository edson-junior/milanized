'use client';

import { Blog } from '@/sanity.types';
import { useQueryState, parseAsInteger } from 'nuqs';
import { ReactNode } from 'react';
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

type PaginationProps = React.ComponentProps<'div'> &
  Partial<{
    buttonClassName: string;
    prevClassName: string;
    nextClassName: string;
    prev: React.ReactNode;
    next: React.ReactNode;
    hidePage: boolean;
    onClick: () => void;
  }>;

export function usePagination({
  items = [],
  itemsPerPage = 3
}: {
  items: Blog[] | undefined;
  itemsPerPage?: number;
}) {
  const { page, setPage } = usePageState();

  const atStart = page === 1;
  const atEnd = page === Math.ceil(items.length / itemsPerPage);

  const onPrev = () => setPage(Math.max(1, page - 1));
  const onNext = () =>
    setPage(Math.min(Math.ceil(items.length / itemsPerPage), page + 1));

  const paginatedItems = items.slice(
    itemsPerPage * (page - 1),
    itemsPerPage * page
  );

  const currentPage = page;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const Pagination = ({
    // buttonClassName,
    // prevClassName,
    // nextClassName,
    prev = 'Previous',
    next = 'Next',
    hidePage,
    onClick = () => {},
    ...props
  }: PaginationProps) => {
    if ((atStart && atEnd) || !paginatedItems?.length) return null;

    const renderPageNumbers = () => {
      const items: ReactNode[] = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem
              key={i}
              onClick={() => {
                setPage(i);
                onClick();
              }}
              className={`${page === i && 'text-red-50'}`}
            >
              <PaginationLink href="#" isActive={page === i}>
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        items.push(
          <PaginationItem
            onClick={() => {
              setPage(1);
              onClick();
            }}
            className={`${page === 1 && 'text-red-50'}`}
          >
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        );

        if (page > 3) {
          items.push(
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
          items.push(
            <button
              onClick={() => {
                setPage(i);
                onClick();
              }}
              className={`${page === i && 'text-red-50'}`}
            >
              {i}
            </button>
          );
        }

        if (page < totalPages - 2) {
          items.push(
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        items.push(
          <button
            onClick={() => {
              setPage(totalPages);
              onClick();
            }}
            className={`${page === totalPages && 'text-red-50'}`}
          >
            {totalPages}
          </button>
        );
      }

      return items;
    };

    return (
      <PaginationComponent {...props}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? 'hidden' : undefined}
              onClick={() => {
                onPrev();
                onClick();
              }}
            >
              {prev}
            </PaginationPrevious>
          </PaginationItem>

          {!hidePage && renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : undefined}
              className={page === totalPages ? 'hidden' : undefined}
              onClick={() => {
                onNext();
                onClick();
              }}
            >
              {next}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    );
  };

  return {
    atStart,
    atEnd,
    onPrev,
    onNext,
    paginatedItems,
    Pagination,
    currentPage,
    totalPages
  };
}

export function usePageState() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  return { page, setPage };
}
