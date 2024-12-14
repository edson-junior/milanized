'use client';

import { usePagination } from '@/hooks/usePagination';
import { Blog } from '@/sanity.types';
import List from './List';

export default function Paginated({
  posts,
  itemsPerPage = 8
}: {
  posts: Blog[] | undefined;
  itemsPerPage?: number;
}) {
  const { paginatedItems, Pagination } = usePagination({
    items: posts,
    itemsPerPage
  });

  function scrollToList() {
    if (typeof window !== 'undefined')
      document
        .querySelector('#blog-list')
        ?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {!paginatedItems?.length ? (
        <p>there are no blogposts</p>
      ) : (
        <List posts={paginatedItems} />
      )}

      <Pagination
        className="flex items-center justify-center gap-4 bg-canvas p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] [&_span]:tabular-nums"
        buttonClassName="hover:underline disabled:opacity-20"
        onClick={scrollToList}
      />
    </div>
  );
}
