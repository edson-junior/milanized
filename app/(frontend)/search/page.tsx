import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Heading from '@/components/ui/heading';
import { Blog } from '@/sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const articles = await getSearchResults({ searchParams });
  const searchString = (await searchParams).query;

  if (articles) {
    const metaData: Metadata = {
      title: `Search results for ${searchString}`,
      description: `Search results for ${searchString}`,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/search?query=${searchString}`,
        types: {
          'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
        }
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/search?query=${searchString}`,
        title: `Search results for ${searchString}`,
        description: `Search results for ${searchString}`,
        type: 'website',
        images: {
          url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          alt: `Search results for ${searchString}`,
          width: 360,
          height: 360,
          type: 'image'
        }
      }
    };

    return metaData;
  }
}

async function getSearchResults({
  searchParams
}: SearchPageProps): Promise<Blog[] | undefined> {
  try {
    const searchString = (await searchParams).query;
    const query = `${process.env.CLIENT_URL}/api/search?query=${searchString}`;
    const response = await fetch(query, {
      method: 'GET'
    });

    if (response.status === 200) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function Search({ searchParams }: SearchPageProps) {
  const posts = await getSearchResults({ searchParams });
  const searchString = (await searchParams).query;

  return (
    <>
      <Hero
        mainTitle={`Search results for: ${searchString}`}
        subtitle={`Not what you're looking for? Give it another go! `}
      />
      <div className="max-w-7xl mx-auto px-4 py-4">
        {!posts?.length ? (
          <>
            <Heading
              as="h2"
              className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
            >
              There are no results for your search!
            </Heading>
            <Heading as="strong" className="text-lg">
              Tips for better search results:
            </Heading>
            <ul className="text-sm mb-8">
              <li>Make sure all words are spelled correctly.</li>
              <li>Try different keywords.</li>
              <li>Try more general keywords.</li>
            </ul>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
            {posts?.map(({ _id, metadata, title, summary, featuredImage }) => {
              return (
                <Link
                  href={`/blog/${metadata?.slug}`}
                  className="group"
                  key={_id}
                >
                  {featuredImage && (
                    <Image
                      width={250}
                      height={250}
                      loading="lazy"
                      src={urlFor(featuredImage).width(600).url()}
                      alt={featuredImage.alt || ''}
                      className="block w-full object-cover h-52"
                    />
                  )}

                  <div className="py-6">
                    <Heading className="text-xl block mb-4 group-hover:text-blue-700">
                      {title}
                    </Heading>

                    <p className="text text-sm line-clamp-4 align-baseline">
                      {summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
