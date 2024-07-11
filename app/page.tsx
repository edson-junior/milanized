import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import { Blog, Page } from '@/sanity.types';
import FeaturedPost from '@/components/FeaturedPost';

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

export default async function Home() {
  const posts = await getPosts();
  const homepage = await getPage();

  if (homepage) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="absolute left-[-999em]">{`${homepage.metadata?.title} - ${homepage.title}`}</h1>
        {posts
          ?.filter((post) => post.isFeatured)
          .map(({ _id, metadata, title, summary, featuredImage }) => {
            return (
              <FeaturedPost
                key={_id}
                metadata={metadata}
                title={title}
                summary={summary}
                featuredImage={featuredImage}
              />
            );
          })}
        <Heading as="h2" className="text-xl lg:text-4xl py-0 lg:py-2">
          Latest Posts
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
          {!posts?.length ? (
            <p>there are no blogposts</p>
          ) : (
            posts?.map(({ _id, metadata, title, summary, featuredImage }) => {
              return (
                <Link
                  href={`/${metadata?.slug}`}
                  className="group md:shadow-md md:rounded-sm md:overflow-hidden md:border md:border-border"
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
                      className="block w-full object-cover h-38 md:h-52"
                    />
                  )}

                  <div className="pt-4 md:p-4 md:pb-6">
                    <Heading className="text-md md:text-xl block md:mb-4 group-hover:text-blue-700">
                      {title}
                    </Heading>

                    <p className="hidden md:block text text-sm line-clamp-4 align-baseline">
                      {summary}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
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
  const query = `*[_type == 'blog' && !(_id in path('drafts.**'))]|order(_createdAt desc) {
    _id,
    title,
    summary,
    content,
    featuredImage,
    isFeatured,
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
