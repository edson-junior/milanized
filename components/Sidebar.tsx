import React from 'react';
import Heading from './ui/heading';
import { getAllPosts, urlFor } from '@/lib/sanity-utils';
import Link from 'next/link';
import Image from 'next/image';
import { Slug } from '@/sanity.types';

type SidebarProps = {
  slug: Slug;
};

export default async function Sidebar({ slug }: SidebarProps) {
  const posts = await getAllPosts();

  return (
    <aside className="lg:w-96">
      <Heading as="h2" className="text-xl lg:text-4xl py-2">
        Latest Posts
      </Heading>
      <div className="flex flex-col gap-4 gap-y-6">
        {!posts?.length ? (
          <p>there are no blogposts</p>
        ) : (
          posts?.map(
            ({ _id, metadata, title, summary, featuredImage, _createdAt }) => {
              const publishedAt = _createdAt ? new Date(_createdAt) : undefined;

              if (metadata?.slug === slug) {
                return null;
              }

              return (
                <Link href={`/${metadata?.slug}`} className="group" key={_id}>
                  {featuredImage && (
                    <Image
                      width={250}
                      height={250}
                      loading="lazy"
                      src={urlFor(featuredImage).width(600).url()}
                      alt={featuredImage.alt || ''}
                      className="w-full object-cover h-38"
                    />
                  )}

                  <div className="py-4 lg:py-6">
                    <Heading className="text-md lg:text-xl block mb-2 lg:mb-4 group-hover:text-blue-700">
                      {title}
                    </Heading>

                    <p className="text text-sm line-clamp-4 align-baseline mb-2">
                      {summary}
                    </p>

                    <p className="lg:hidden text text-xs line-clamp-4 align-baseline text-gray-600">
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(publishedAt)}
                    </p>
                  </div>
                </Link>
              );
            }
          )
        )}
      </div>
    </aside>
  );
}
