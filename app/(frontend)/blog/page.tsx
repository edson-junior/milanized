import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import { getAllPosts, getArticlesPage } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Hero from '@/components/Hero';

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
  const articles = await getArticlesPage();

  if (articles) {
    return (
      <>
        {articles?.title && (
          <Hero
            title={articles?.title}
            subtitle="Our latest posts from old to new! 🚀"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
            {!posts?.length ? (
              <p>there are no blogposts</p>
            ) : (
              posts?.map(({ _id, metadata, title, summary, featuredImage }) => {
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
                        priority
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
              })
            )}
          </div>
        </div>
      </>
    );
  }
}
