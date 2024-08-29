import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/ui/heading';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import { getAllPosts, getArticlesPage } from '@/lib/sanity-utils';

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

export async function generateMetadata() {
  const articles = await getArticlesPage();

  if (articles) {
    const metaData: Metadata = {
      title: articles.metadata?.title,
      description: articles.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/articles`
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/articles`,
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
        <div
          className={`group block shadow-md mb-6 relative bg-[url(/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqua4h5qu%2Fproduction%2F2d2b8abbcbce0ee0c69e4ef6a411fa4d92ec9a09-2048x1152.jpg%3Fw%3D1280&w=3840&q=75)] bg-no-repeat w-full h-52 lg:h-80 bg-cover bg-center bg-blend-darken before:block before:w-full before:h-full before:absolute before:backdrop-blur-sm before:bg-black/70`}
        >
          {/* TODO:

          fix hero image on every single page, add hero image to contact
          page as well, each with it's own background image */}
          <div className="text-white flex align-middle h-full flex-col justify-center max-w-7xl mx-auto px-4 py-4 relative">
            <Heading as="h1" className="text-2xl lg:text-5xl">
              Read our newest articles
            </Heading>
            <p className="leading-7 mb-8">{`Our latest posts from old to new! 🚀`}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* <Heading as="h1" className="text-2xl lg:text-5xl">
          Articles
        </Heading>
        <p className="leading-7 mb-8">{`All our latest posts in one single place :)`}</p> */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
            {!posts?.length ? (
              <p>there are no blogposts</p>
            ) : (
              posts?.map(({ _id, metadata, title, summary, featuredImage }) => {
                return (
                  <Link
                    href={`/${metadata?.slug}`}
                    className="group shadow-md rounded-sm overflow-hidden border border-border"
                    key={_id}
                  >
                    {featuredImage && (
                      <Image
                        width={250}
                        height={250}
                        priority
                        src={urlFor(featuredImage).width(250).url()}
                        alt={featuredImage.alt || ''}
                        className="block w-full object-cover h-52"
                      />
                    )}

                    <div className="p-4 pb-6">
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
