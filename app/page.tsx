import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import FeaturedPost from '@/components/FeaturedPost';
import { getAllPosts, getHomePage, urlFor } from '@/lib/sanity-utils';

export async function generateMetadata() {
  const homepage = await getHomePage();

  if (!homepage) {
    return {};
  }

  const metaData: Metadata = {
    title: homepage.metadata?.title,
    description: homepage.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}`
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}`,
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      type: 'website',
      images: {
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        alt: homepage.metadata?.title,
        width: 360,
        height: 360,
        type: 'image'
      }
    }
  };

  return metaData;
}

export default async function Home() {
  const posts = await getAllPosts();
  const homepage = await getHomePage();

  if (!homepage) {
    return null;
  }

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
      <hr className="my-4" />
      <Heading as="h2" className="text-xl lg:text-4xl py-2">
        Latest Posts
      </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
        {!posts?.length ? (
          <p>there are no blogposts</p>
        ) : (
          posts
            ?.slice(0, 4)
            .map(
              ({
                _id,
                metadata,
                title,
                summary,
                featuredImage,
                _createdAt
              }) => {
                const publishedAt = _createdAt
                  ? new Date(_createdAt)
                  : undefined;

                return (
                  <Link href={`/${metadata?.slug}`} className="group" key={_id}>
                    {featuredImage && (
                      <Image
                        width={250}
                        height={250}
                        loading="lazy"
                        src={urlFor(featuredImage).width(600).url()}
                        alt={featuredImage.alt || ''}
                        className="hidden lg:block w-full object-cover h-38 lg:h-52"
                      />
                    )}

                    <div className="py-4 lg:py-6">
                      <Heading className="text-md lg:text-xl block mb-2 lg:mb-4 group-hover:text-blue-700">
                        {title}
                      </Heading>

                      <p className="text text-sm line-clamp-4 align-baseline mb-2">
                        {summary}
                      </p>

                      <p className="lg:hidden text text-xs line-clamp-4 align-baseline text-gray-600">
                        {new Intl.DateTimeFormat('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).format(publishedAt)}
                      </p>
                    </div>
                  </Link>
                );
              }
            )
        )}
      </div>
    </div>
  );
}
