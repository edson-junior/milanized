import { Blog } from '@/sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Heading from './ui/heading';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PostListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  posts: Blog[];
}

export default function PostList({
  posts,
  className,
  ...props
}: PostListProps) {
  return (
    <div
      className={cn('grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-6', className)}
      {...props}
    >
      {posts.map(
        ({
          _id,
          metadata,
          title,
          summary,
          featuredImage,
          _createdAt,
          author
        }) => {
          const publishedAt = _createdAt ? new Date(_createdAt) : undefined;

          return (
            <Link href={`/blog/${metadata?.slug}`} className="group" key={_id}>
              {featuredImage && (
                <Image
                  width={250}
                  height={250}
                  loading="lazy"
                  src={urlFor(featuredImage).width(600).url()}
                  alt={featuredImage.alt || ''}
                  className="block w-full object-cover h-52"
                />
              )}

              <div className="py-6">
                <Heading className="text-xl block mb-4 group-hover:text-blue-700">
                  {title}
                </Heading>

                <p className="text text-sm line-clamp-4 align-baseline mb-2">
                  {summary}
                </p>

                <p className="text text-xs align-baseline">
                  <strong>{author?.name}</strong>
                  <span>{` - `}</span>
                  <span className="text-gray-600">
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(publishedAt)}
                  </span>
                </p>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
}
