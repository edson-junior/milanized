import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import { Blog, Page } from '@/sanity.types';

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

export async function generateMetadata() {
  const homepage = await getPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      alternates: {
        canonical: `${process.env.CLIENT_URL}`
      }
    };

    return metaData;
  }
}

export default async function Articles() {
  const posts = await getPosts();
  const homepage = await getPage();

  if (homepage) {
    return (
      <>
        <Heading as="h1" className="text-2xl lg:text-5xl">
          Articles
        </Heading>
        <p className="leading-7 mb-8">{`All our latest posts in one single place :)`}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
          {!posts?.length ? (
            <p>there are no blogposts</p>
          ) : (
            posts?.map(({ _id, metadata, title, summary, featuredImage }) => {
              return (
                <Link
                  href={`/${metadata?.slug}`}
                  className="group shadow-md rounded-sm overflow-hidden border border-border"
                  key={_id}
                >
                  {featuredImage && (
                    <Image
                      width="250"
                      height="250"
                      src={urlFor(featuredImage).width(600).url()}
                      alt={featuredImage.alt || ''}
                      loading="eager"
                      priority
                      className="block w-full object-cover h-52"
                    />
                  )}

                  <div className="p-4 pb-6">
                    <Heading className="text-xl block mb-4 group-hover:text-blue-700">
                      {title}
                    </Heading>

                    <p className="text text-sm line-clamp-4 align-baseline">
                      {summary}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </>
    );
  }
}

async function getPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'homepage'][0] {
    _id,
    title,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPosts(): Promise<Blog[] | undefined> {
  const query = `*[_type == 'blog' && !(_id in path('drafts.**'))] {
    _id,
    title,
    summary,
    content,
    featuredImage,
    metadata {
      'slug': slug.current
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}
