import type { Metadata } from 'next';
import { getAllPosts, getArticlesPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';
import { Suspense } from 'react';
import Paginated from './Paginated';
import { Skeleton } from '@/components/ui/skeleton';

export async function generateMetadata() {
  const articles = await getArticlesPage();

  if (articles) {
    const metaData: Metadata = {
      title: articles.metadata?.title,
      description: articles.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/blog`
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
  const itemsPerPage = 8;
  const articles = await getArticlesPage();

  return (
    <>
      {articles?.title && (
        <Hero
          title={articles?.title}
          subtitle="Our latest posts from old to new! 🚀"
        />
      )}

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
    </>
  );
}
