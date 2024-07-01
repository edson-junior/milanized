import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Blog } from '@/sanity.types';
import client from '@/client';

type FeaturedPostProps = Pick<
  Blog,
  'metadata' | 'title' | 'summary' | 'featuredImage'
>;

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

export default function FeaturedPost({
  metadata,
  title,
  summary,
  featuredImage
}: FeaturedPostProps) {
  return (
    <Link
      href={`/${metadata?.slug}`}
      className="group block shadow-md mb-6 relative"
    >
      {featuredImage && (
        <Image
          width="1280"
          height="1280"
          src={urlFor(featuredImage).width(1280).url()}
          alt={featuredImage.alt || ''}
          loading="eager"
          priority
          className="block w-full object-cover h-96 sm:h-[36rem]"
        />
      )}

      <div className="p-4 pb-6 absolute bottom-0 left-0 bg-white sm:w-96">
        {/* TODO: turn this tag into dynamic tag on sanity */}
        <Heading className="text-sm block mb-2 text-gray-500">
          LIFE IN ITALY
        </Heading>
        <Heading className="text-xl block mb-4 group-hover:text-blue-700">
          {title}
        </Heading>

        <p className="text text-sm line-clamp-4 align-baseline">{summary}</p>
      </div>
    </Link>
  );
}
