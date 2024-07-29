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
      className="group block md:shadow-md mb-6 relative"
    >
      {featuredImage && (
        <Image
          width="1280"
          height="1280"
          src={urlFor(featuredImage).width(1280).url()}
          alt={featuredImage.alt || ''}
          loading="eager"
          priority
          className="block md:w-full object-cover h-38 md:h-96 lg:h-[36rem]"
        />
      )}

      <div className="pt-4 md:pb-6 md:p-4 md:absolute md:bottom-0 md:left-0 bg-white md:w-96">
        <Heading className="text-md md:text-xl block mb-4 group-hover:text-blue-700">
          {title}
        </Heading>

        <p className="hidden md:block text text-sm line-clamp-4 align-baseline">
          {summary}
        </p>
      </div>
    </Link>
  );
}
