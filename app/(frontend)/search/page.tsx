import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import PostList from '@/components/PostList';
import Heading from '@/components/ui/heading';
import { getSearchResults } from '@/sanity/lib/client';
import { Blog } from '@/sanity.types';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { query: searchString } = await searchParams;
  const safeQuery = typeof searchString === 'string' ? searchString : '';

  const pageUrl = new URL('/search', process.env.CLIENT_URL);

  if (safeQuery) {
    pageUrl.searchParams.set('query', safeQuery);
  }

  const pageUrlString = pageUrl.toString();

  const metaData: Metadata = {
    title: safeQuery ? `Search results for ${safeQuery}` : 'Search',
    description: safeQuery ? `Search results for ${safeQuery}` : 'Search',
    robots: 'noindex, follow',
    alternates: {
      canonical: pageUrlString,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: pageUrlString,
      title: safeQuery ? `Search results for ${safeQuery}` : 'Search',
      description: safeQuery ? `Search results for ${safeQuery}` : 'Search',
      type: 'website',
      images: {
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        alt: safeQuery ? `Search results for ${safeQuery}` : 'Search results',
        width: 360,
        height: 360,
        type: 'image'
      }
    }
  };

  return metaData;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { query: searchString } = await searchParams;
  const safeQuery = typeof searchString === 'string' ? searchString : '';
  const posts: Blog[] | undefined = await getSearchResults(safeQuery);

  return (
    <main id="main-content" className="scroll-m-20">
      <Hero
        mainTitle={safeQuery ? `Search results for: ${safeQuery}` : 'Search'}
        subtitle={`Not what you're looking for? Give it another go! `}
      />
      <div className="max-w-7xl mx-auto px-4 py-4 mb-20">
        {!posts?.length ? (
          <>
            <Heading
              as="h2"
              className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
            >
              There are no results for your search!
            </Heading>
            <Heading as="h2" className="text-lg">
              Tips for better search results:
            </Heading>
            <ul className="text-sm mb-8">
              <li>Make sure all words are spelled correctly.</li>
              <li>Try different keywords.</li>
              <li>Try more general keywords.</li>
            </ul>
          </>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
}
