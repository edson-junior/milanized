import FilterList from '@/components/FilterList';
import Heading from '@/components/ui/heading';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPosts, getArticlesPage } from '@/sanity/lib/client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Paginated from './Paginated';

export async function generateMetadata() {
  const articles = await getArticlesPage();

  if (!articles) {
    return notFound();
  }

  const metaData: Metadata = {
    title: articles.metadata?.title,
    description: articles.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/blog`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/blog`,
      title: articles.metadata?.title,
      description: articles.metadata?.description,
      type: 'website',
      images: {
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        alt: articles.metadata?.title,
        width: 360,
        height: 360,
        type: 'image'
      }
    }
  };

  return metaData;
}

export default async function Articles() {
  const posts = await getAllPosts();
  const itemsPerPage = 9;
  const articles = await getArticlesPage();

  if (!articles) {
    return notFound();
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <Heading as="h1" className="text-3xl lg:text-5xl mb-4 lg:mb-6">
          {articles?.title}
        </Heading>
        <p className="max-w-4xl text-sm/7 lg:text-base/7 mb-8">
          Stories about life in Milan and beyond that will inspire you! Find
          guides on where to eat and drink, seasonal events, things to do in the
          city, and travel ideas. Read our insider tips, curated
          recommendations, and fresh takes on everyday experiences!
        </p>
        <FilterList />
      </div>

      {!posts ? (
        <p>there are no blogposts</p>
      ) : (
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-9">
                {Array.from({ length: itemsPerPage ?? 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-[200px]" />
                    <div className="space-y-2 mt-8">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <div className="space-y-2 mt-8">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <Paginated posts={posts} itemsPerPage={itemsPerPage} />
        </Suspense>
      )}
    </>
  );
}
