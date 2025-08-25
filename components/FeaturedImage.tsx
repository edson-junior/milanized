import { Blog } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import parse from 'html-react-parser';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type FeaturedImageProps = {
  featuredImage: Blog['featuredImage'];
  image: Blog['image'];
} & HTMLAttributes<HTMLElement>;

export function FeaturedImage({
  featuredImage,
  image,
  ...props
}: FeaturedImageProps) {
  if (!featuredImage) {
    return;
  }

  if (featuredImage.caption) {
    return (
      <figure {...props}>
        <div className="w-full aspect-video relative mb-2 overflow-hidden lg:rounded-md">
          <Image
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1340px) 832px, (min-width: 1040px) calc(85.71vw - 299px), 50vw"
            src={urlFor(featuredImage).width(1280).url()}
            alt={featuredImage.alt || ''}
            blurDataURL={featuredImage.lqip}
            placeholder="blur"
            className="object-cover transition duration-200 ease-in-out transform hover:scale-110"
          />
        </div>
        <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 [&>a]:underline mb-4 mx-4 lg:mx-0">
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
