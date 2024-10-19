import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import { Blog } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

type FeaturedPostProps = Pick<
  Blog,
  'metadata' | 'title' | 'summary' | 'featuredImage'
>;

export default function FeaturedPost({
  metadata,
  title,
  summary,
  featuredImage
}: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${metadata?.slug}`}
      className="group block lg:shadow-md mb-6 relative"
    >
      {featuredImage && (
        <div className="w-full h-52 lg:h-[36rem] relative">
          <Image
            fill
            sizes="100vw"
            src={urlFor(featuredImage).width(1280).url()}
            alt={featuredImage.alt || ''}
            priority
            className="object-cover"
          />
        </div>
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
