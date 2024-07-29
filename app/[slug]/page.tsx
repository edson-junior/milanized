import BlockRendererClient from '@/components/BlockRenderClient';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import parse from 'html-react-parser';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import Image from 'next/image';
import { Blog } from '@/sanity.types';
import { HTMLAttributes } from 'react';
import { Clock2Icon } from 'lucide-react';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const data = await getPosts(params.slug);

  if (!data?.featuredImage) {
    return {};
  }

  return {
    title: data.metadata?.title,
    description: data.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/${params.slug}`
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/${params.slug}`,
      siteName: 'Milanized!',
      locale: 'en_GB',
      type: 'article',
      title: data.title,
      description: data.metadata?.description,
      images: {
        url: urlFor(data.featuredImage).width(1200).url(),
        secureUrl: urlFor(data.featuredImage).width(1200).url(),
        alt: data.featuredImage.alt,
        width: 1200,
        height: 675,
        type: 'image'
      }
    }
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const data = await getPosts(params.slug);

  if (!data) {
    return;
  }

  const publishedAt = data ? new Date(data?._createdAt) : undefined;
  const updatedAt = data ? new Date(data?._updatedAt) : undefined;

  // TODO: create our own types files and not depend on typegen as much. Use typegen just to generate the files, then delete afterwards. Add it to the gitignore, even.

  // author name will be re-enabled when author page is created
  // const authorName = data?.author.name;
  // @ts-expect-error: sanity's typegen doesn't create expanded refence types
  const estimatedReadingTime = data.estimatedReadingTime;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="max-w-md">
          <Heading as="h1" className="text-2xl lg:text-5xl mb-8">
            {data.title}
          </Heading>

          <div className="flex gap-2 flex-col">
            {/* {authorName && <p>{authorName}</p>} */}
            {publishedAt && (
              <>
                <div>
                  {new Intl.DateTimeFormat('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(publishedAt)}
                </div>
              </>
            )}
            {updatedAt && (
              <div className="text-xs">
                {'Last updated: '}
                {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).format(updatedAt)}
              </div>
            )}
            {estimatedReadingTime && (
              <div className="text-xs flex items-center gap-2">
                <Clock2Icon className="w-4" />
                {`${Math.ceil(estimatedReadingTime)} minute read`}
              </div>
            )}
          </div>
        </div>
        {data?.featuredImage && (
          <FeaturedImage
            className="flex flex-col lg:shrink-0 grow"
            featuredImage={data.featuredImage}
          />
        )}
      </div>

      <main className="flex flex-col md:flex-row gap-8">
        <article className="flex-1 md:w-64">
          {data?.content && <BlockRendererClient value={data?.content} />}
        </article>
      </main>
    </div>
  );
}

type FeaturedImageProps = {
  featuredImage: Blog['featuredImage'];
} & HTMLAttributes<HTMLElement>;

function FeaturedImage({ featuredImage, ...props }: FeaturedImageProps) {
  if (!featuredImage) {
    return;
  }

  if (featuredImage.caption) {
    return (
      <figure {...props}>
        <Image
          width="1280"
          height="1280"
          src={urlFor(featuredImage).width(1280).url()}
          alt={featuredImage.alt || ''}
          loading="eager"
          priority
          className="block h-full w-full object-cover mb-2"
        />
        <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 hover:[&>a]:underline mb-4">
          {parse(featuredImage?.caption)}
        </figcaption>
      </figure>
    );
  }

  return (
    <Image
      width="800"
      height="800"
      src={urlFor(featuredImage).width(800).url()}
      alt={featuredImage.alt || ''}
      loading="eager"
      priority
      className="block h-full w-full object-cover"
    />
  );
}

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

async function getPosts(slug: string): Promise<Blog | undefined> {
  const query = `*[_type == 'blog' && metadata.slug.current == "${slug}"][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    summary,
    content,
    featuredImage,
    author->,
    "authorImage": author->image,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
    metadata {
      'slug': slug.current,
      slug,
      description,
      image,
      title
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}
