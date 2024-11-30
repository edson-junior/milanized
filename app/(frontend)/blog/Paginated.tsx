'use client';

import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import { urlFor } from '@/sanity/lib/image';
import { usePagination } from '@/hooks/usePagination';
import { Blog } from '@/sanity.types';

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
      <div
        id="blog-list"
        className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6"
      >
        {!paginatedItems?.length ? (
          <p>there are no blogposts</p>
        ) : (
          paginatedItems?.map(
            ({ _id, metadata, title, summary, featuredImage }) => {
              return (
                <Link
                  href={`/blog/${metadata?.slug}`}
                  className="group"
                  key={_id}
                >
                  {featuredImage && (
                    <Image
                      width={250}
                      height={250}
                      priority
                      src={urlFor(featuredImage).width(600).url()}
                      alt={featuredImage.alt || ''}
                      className="block w-full object-cover h-52"
                    />
                  )}

                  <div className="py-6">
                    <Heading className="text-xl block mb-4 group-hover:text-blue-700">
                      {title}
                    </Heading>

                    <p className="text text-sm line-clamp-4 align-baseline">
                      {summary}
                    </p>
                  </div>
                </Link>
              );
            }
          )
        )}
      </div>
      <Pagination
        className="flex items-center justify-center gap-4 bg-canvas p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] [&_span]:tabular-nums"
        buttonClassName="hover:underline disabled:opacity-20"
        onClick={scrollToList}
      />
    </div>
  );
}
