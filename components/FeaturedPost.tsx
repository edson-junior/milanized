import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/client';
import groq from 'groq';
import { Blog } from '@/sanity.types';
const query = groq`*[_type == 'blog' && !(_id in path('drafts.**')) && isFeatured]|order(_createdAt desc) [0...1] [0] {
  _id,
  _createdAt,
  _publishedAt,
  title,
  summary,
  featuredImage,
  author-> {
    name,
  },
  metadata {
    'slug': slug.current
  }
}`;

export default async function FeaturedPost() {
  const data: Blog | undefined = await sanityFetch({
    query
  });

  if (!data) {
    return null;
  }

  const { _createdAt, metadata, featuredImage, title, summary } = data;

  const publishedAt = new Date(_createdAt);

  return (
    <Link
      href={`/blog/${metadata?.slug}`}
      className="mb-12 relative group grid items-center gap-x-8 gap-y-4 md:grid-cols-2"
    >
      {featuredImage && (
        <figure className="max-md:full-bleed relative aspect-video overflow-hidden">
          <Image
            fill
            sizes="(min-width: 1360px) 608px, (min-width: 780px) 44.64vw, calc(100vw - 32px)"
            src={urlFor(featuredImage).width(800).url()}
            alt={featuredImage.alt || ''}
            priority
            className="object-cover transition duration-200 ease-in-out transform group-hover:scale-110 group-hover:brightness-110"
          />
        </figure>
      )}

      <div className="max-w-lg space-y-4">
        <Heading className="text-md lg:text-4xl block mb-4 group-hover:text-blue-700">
          {title}
        </Heading>
        <p className="text-sm lg:text-lg line-clamp-4 align-baseline">
          {summary}
        </p>
        <p className="text-sm">
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
