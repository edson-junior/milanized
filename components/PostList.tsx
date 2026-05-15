import Image from 'next/image';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { Blog } from '@/sanity.types';
import Heading from './ui/heading';

interface PostListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  posts: Blog[];
  variant?: 'col' | 'row';
}

export default function PostList({
  posts,
  className,
  variant = 'row',
  ...props
}: PostListProps) {
  return (
    <div
      className={cn(
        variant === 'row' && 'grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-6',
        variant === 'col' && 'flex flex-col gap-8',
        className
      )}
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
          publishDate
        }) => {
          const publishedAt =
            publishDate || _createdAt
              ? new Date(publishDate || _createdAt)
              : undefined;

          return (
            <Link
              href={`/blog/${metadata?.slug}`}
              className={cn(
                variant === 'col' &&
                  'flex flex-col lg:flex-row gap-4 items-center',
                'group'
              )}
              key={_id}
            >
              {featuredImage && (
                <figure
                  className={cn(
                    variant === 'row' &&
                      'relative aspect-video overflow-hidden bg-neutral-50 rounded-md',
                    variant === 'col' &&
                      'relative overflow-hidden aspect-video w-full lg:w-[140px] lg:h-[120px] shrink-0 bg-neutral-50 rounded-md'
                  )}
                >
                  <Image
                    width={250}
                    height={250}
                    loading="lazy"
                    src={
                      variant === 'col'
                        ? urlFor(featuredImage).width(300).url()
                        : urlFor(featuredImage).width(600).url()
                    }
                    alt={featuredImage.alt || ''}
                    blurDataURL={featuredImage.lqip}
                    placeholder="blur"
                    sizes={
                      variant === 'col'
                        ? '(min-width: 768px) 140px, 250px'
                        : '(min-width: 1024px) 33vw, 100vw'
                    }
                    className={cn(
                      variant === 'row' &&
                        'object-cover w-full aspect-video transition duration-200 ease-in-out transform group-hover:scale-110',
                      variant === 'col' &&
                        'object-cover w-full h-full transition duration-200 ease-in-out transform group-hover:scale-110'
                    )}
                  />
                </figure>
              )}

              <div className={cn(variant === 'row' && 'py-6')}>
                <Heading
                  as="h2"
                  className={cn(
                    'block group-hover:text-blue-700',
                    variant === 'row' && 'text-xl mb-4',
                    variant === 'col' && 'text-lg mb-2 line-clamp-1'
                  )}
                >
                  {title}
                </Heading>

                <p
                  className={cn(
                    'text text-sm line-clamp-4 align-baseline mb-2',
                    variant === 'col' && 'line-clamp-2'
                  )}
                >
                  {summary}
                </p>

                {publishedAt && (
                  <p className="text text-xs align-baseline">
                    <span className="text-gray-600">
                      {formatDate(publishedAt)}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
}
