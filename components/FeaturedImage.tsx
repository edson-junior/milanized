import parse from 'html-react-parser';
import Image from 'next/image';
import { Blog } from '@/sanity.types';
import { HTMLAttributes } from 'react';
import { urlFor } from '@/lib/sanity-utils';

type FeaturedImageProps = {
  featuredImage: Blog['featuredImage'];
} & HTMLAttributes<HTMLElement>;

export function FeaturedImage({ featuredImage, ...props }: FeaturedImageProps) {
  if (!featuredImage) {
    return;
  }

  if (featuredImage.caption) {
    return (
      <figure {...props}>
        <div className="w-full h-52 lg:h-[36rem] relative mb-2">
          <Image
            fill
            priority
            sizes="100vw"
            src={urlFor(featuredImage).width(1280).url()}
            alt={featuredImage.alt || ''}
            className="object-cover"
          />
        </div>
        <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 [&>a]:underline mb-4">
          {parse(featuredImage?.caption)}
        </figcaption>
      </figure>
    );
  }

  return (
    <Image
      width={800}
      height={800}
      src={urlFor(featuredImage).width(800).url()}
      alt={featuredImage.alt || ''}
      priority
      className="block h-full w-full object-cover"
    />
  );
}
