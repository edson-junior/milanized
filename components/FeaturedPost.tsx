import Heading from '@/components/ui/heading';
import { formatDate } from '@/lib/utils';
import { Blog } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import groq from 'groq';
import Image from 'next/image';
import Link from 'next/link';
const query = groq`*[_type == 'blog' && !(_id in path('drafts.**')) && isFeatured]|order(_createdAt desc) [0...1] [0] {
  _id,
  _createdAt,
  _publishedAt,
  title,
  summary,
  categories[]->{
    title,
    slug
  },
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
    }
  },
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

  const {
    _createdAt,
    metadata,
    featuredImage,
    title,
    summary,
    categories,
    publishDate
  } = data;

  const publishedAt = new Date(publishDate || _createdAt);

  return (
    <section
      className="bg-no-repeat bg-cover relative after:bg-black/60 after:absolute after:w-full after:h-full after:top-0 after:left-0 z-0 text-white"
      style={{
        backgroundImage: `url("${featuredImage?.lqip}")`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 z-10 relative border border-l-0 border-r-0 border-b-gray-800 border-t-gray-800">
        <Link
          href={`/blog/${metadata?.slug}`}
          className="relative group grid items-center gap-8 md:grid-cols-2"
        >
          <div className="space-y-4">
            <p className="text-sm text-stone-400">{categories[0].title}</p>
            <div className="leading-[2.4] lg:leading-[3.6]">
              <Heading className="text-xl lg:text-3xl mb-4 text-black group-hover:text-blue-700 bg-white box-decoration-clone px-2 rounded-md">
                {title}
              </Heading>
            </div>
            <p className="text-sm lg:text-lg line-clamp-4 align-baseline">
              {summary}
            </p>
            <p className="text-sm text-stone-400">{formatDate(publishedAt)}</p>
          </div>

          {featuredImage && (
            <figure className="max-md:full-bleed relative aspect-video overflow-hidden rounded-md -order-1 lg:order-none border border-gray-800 shadow-xl shadow-black/50">
              <Image
                fill
                sizes="(min-width: 1360px) 608px, (min-width: 780px) 44.64vw, calc(100vw - 32px)"
                src={urlFor(featuredImage).width(800).url()}
                alt={featuredImage.alt || ''}
                priority
                fetchPriority="high"
                className="object-cover transition duration-200 ease-in-out transform group-hover:scale-105"
                blurDataURL={featuredImage.lqip}
                placeholder="blur"
              />
              <span className="absolute text-white bg-black/70 top-0 right-4 rounded-t-none leading-7 px-4 rounded-br-sm rounded-bl-sm text-xs">
                Featured
              </span>
            </figure>
          )}
        </Link>
      </div>
    </section>
  );
}
