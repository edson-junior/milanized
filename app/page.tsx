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

  const metaData: Metadata = {
    title: homepage.metadata?.title,
    description: homepage.metadata?.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}`
    }
  };

  return metaData;
}

export default async function Home() {
  const posts = await getPosts();
  const homepage = await getPage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
      <h1 className="absolute left-[-999em]">{`${homepage.metadata?.title} - ${homepage.title}`}</h1>
      {!posts?.length ? (
        <p>there are no blogposts</p>
      ) : (
        posts?.map(({ _id, slug, title, summary, featuredImage }) => {
          return (
            <Link
              href={`/${slug}`}
              className="group shadow-md rounded-sm overflow-hidden border border-border"
              key={_id}
            >
              {featuredImage && (
                <Image
                  width="250"
                  height="250"
                  src={urlFor(featuredImage).width(600).url()}
                  alt={featuredImage.alt || ''}
                  title={`${featuredImage.alt} `}
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
  );
}

async function getPage(): Promise<Page> {
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

  const data = await client.fetch(query);

  return data;
}

async function getPosts(): Promise<Blog[]> {
  const query = `*[_type == 'blog'] {
    _id,
    title,
    "slug": slug.current,
    summary,
    content,
    featuredImage
  }`;

  const data = await client.fetch(query);

  return data;
}
