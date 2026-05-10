import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Pagination from '@/components/Pagination';
import PostList from '@/components/PostList';
import Heading from '@/components/ui/heading';
import {
  getArticlesPage,
  getPagedPosts,
  getPostCount
} from '@/sanity/lib/client';

const PAGE_SIZE = 9;

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

interface ArticlesProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Articles({ searchParams }: ArticlesProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [posts, totalCount, articles] = await Promise.all([
    getPagedPosts(currentPage, PAGE_SIZE),
    getPostCount(),
    getArticlesPage()
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (!articles) {
    return notFound();
  }

  return (
    <main id="main-content" className="scroll-m-20">
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
        {/* TODO: make static filterlist */}
        {/* <FilterList /> */}
      </div>

      {!posts ? (
        <p>there are no blogposts</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <PostList posts={posts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      )}
    </main>
  );
}
