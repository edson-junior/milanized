import type { Metadata } from 'next';
import { getAllPosts, getArticlesPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';
import { Suspense } from 'react';
import Paginated from './Paginated';
import { Skeleton } from '@/components/ui/skeleton';
import FilterList from '@/components/FilterList';

export async function generateMetadata() {
  const articles = await getArticlesPage();

  if (articles) {
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
}

export default async function Articles() {
  const posts = await getAllPosts();
  const itemsPerPage = 9;
  const articles = await getArticlesPage();

  return (
    <>
      {articles?.title && (
        <Hero
          mainTitle={articles?.title}
          subtitle="Our latest posts from old to new. New articles every week."
          bgImage="/images/nir-himi-02LrPeeNzsA-unsplash.jpg"
        />
      )}

      <FilterList />

      {!posts ? (
        <p>there are no blogposts</p>
      ) : (
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
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
