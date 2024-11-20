import Hero from '@/components/Hero';
import Heading from '@/components/ui/heading';
import { Blog } from '@/sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const searchString = (await searchParams).query;
  const query = `${process.env.CLIENT_URL}/api/search?query=${searchString}`;
  const response = await fetch(query, {
    method: 'GET'
  });

  try {
    const posts: Blog[] = await response.json();

    return (
      <>
        <Hero
          title="Search results"
          subtitle={`Your search results for: ${searchString}`}
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
              {posts?.map(
                ({ _id, metadata, title, summary, featuredImage }) => {
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
                }
              )}
            </div>
          )}
        </div>
      </>
    );
  } catch (error) {
    throw new Error(String(error));
  }
}
