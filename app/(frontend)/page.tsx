import type { Metadata } from 'next';
import { Organization, WithContext } from 'schema-dts';
import Heading from '@/components/ui/heading';
import FeaturedPost from '@/components/FeaturedPost';
import { getAllPosts, getHomePage } from '@/sanity/lib/client';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  const posts = await getAllPosts({ limit: 6, removeFeatured: true });
  const homepage = await getHomePage();

  if (!homepage) {
    return null;
  }

  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: homepage.metadata?.title,
    url: process.env.CLIENT_URL,
    alternateName: 'Milanized!',
    description: homepage.metadata?.description,
    logo: `${process.env.CLIENT_URL}/opengraph-logo.png`,
    sameAs: [
      'https://www.facebook.com/MilanIzedOfficial',
      'https://www.instagram.com/milanize.me'
    ],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support' }]
  };

  return (
    <>
      <div className="group block w-full bg-neutral-950">
        <div className="text-white flex align-middle h-full flex-col max-w-7xl mx-auto px-4 pt-14 lg:pt-20 pb-14 lg:pb-20 relative">
          <div className="max-w-screen-sm">
            <span className="block text-gray-400 mb-4">
              Come explore Milan with us
            </span>
            <Heading
              as="h1"
              className="text-3xl lg:text-6xl mb-8 lg:mb-4 lg:leading-[1.2]"
            >
              We will be delighted to be your guide!
            </Heading>
          </div>
          <div>
            <p className="leading-7 lg:leading-normal mb-8 lg:m-0">
              Milanized! is an online guide to everything Milan, created by and
              for (not only) internationals who chose this amazing city as their
              base.
            </p>
            <p className="leading-7 lg:leading-normal mb-8">
              Find the resources you need for the perfect trip, look up
              information on life in Milan in general, and immerse yourself in
              Italian culture.
            </p>
            <Button
              asChild
              size="lg"
              className="text-md py-4 px-8 bg-blue-600 hover:bg-blue-700 h-auto"
            >
              <Link href="/blog">Start exploring</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:pt-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FeaturedPost />
        <hr className="my-4" />
        <Heading as="h2" className="text-xl lg:text-4xl py-2">
          Latest Posts
        </Heading>

        {!posts?.length ? (
          <p>there are no blogposts</p>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </>
  );
}
