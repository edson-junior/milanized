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
          placeholder="data:image/webp;base64,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"
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
