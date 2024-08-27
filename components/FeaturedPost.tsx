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
      className="group block lg:shadow-md mb-6 relative"
    >
      {featuredImage && (
        <Image
          width={1280}
          height={1280}
          src={urlFor(featuredImage).width(1280).url()}
          alt={featuredImage.alt || ''}
          priority
          className="block lg:w-full object-cover h-38 lg:h-[36rem]"
        />
      )}

      <div className="pt-4 lg:pb-6 lg:p-4 lg:absolute lg:bottom-0 lg:left-0 bg-white lg:w-96">
        <Heading className="text-md lg:text-xl block mb-4 group-hover:text-blue-700">
          {title}
        </Heading>

        <p className="text text-sm line-clamp-4 align-baseline">{summary}</p>
      </div>
    </Link>
  );
}
