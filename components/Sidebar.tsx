import React from 'react';
import Heading from './ui/heading';
import Link from 'next/link';
import Image from 'next/image';
import { Blog, Slug } from '@/sanity.types';
import { getAllPosts } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Toc from './Toc';

type SidebarProps = {
  slug: Slug;
} & Pick<Blog, 'headings'>;

export default async function Sidebar({ slug, headings }: SidebarProps) {
  const posts = await getAllPosts({ limit: 4, removeSlug: `${slug}` });
  const showTOC = !!headings?.length;

  if (!posts?.length) {
    return null;
  }

  return (
    <aside className="lg:w-96 h-auto lg:h-full lg:sticky lg:top-20">
      {showTOC && <Toc headings={headings} />}
      <div className="block lg:hidden">
        <Heading className="block text-xl lg:text-4xl mb-4">
          Latest Posts
        </Heading>
        <div className="flex flex-col gap-4 gap-y-6">
          {posts.map(({ _id, metadata, title, featuredImage, _createdAt }) => {
            const publishedAt = _createdAt ? new Date(_createdAt) : undefined;

            if (metadata?.slug === slug) {
              return null;
            }

            return (
              <Link
                href={`/blog/${metadata?.slug}`}
                className="group flex flex-row gap-4"
                key={_id}
              >
                {featuredImage && (
                  <div className="flex shrink-0 w-[100px] h-[100px] relative">
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      src={urlFor(featuredImage).width(300).url()}
                      alt={featuredImage.alt || ''}
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <Heading className="text-md block mb-2 group-hover:text-blue-700">
                    {title}
                  </Heading>

                  <p className="text text-xs line-clamp-4 align-baseline text-gray-600">
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(publishedAt)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
