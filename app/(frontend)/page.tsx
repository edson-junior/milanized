import FeaturedPost from '@/components/FeaturedPost';
import PostList from '@/components/PostList';
import HomeHero from '@/components/homepage/HomeHero';
import Heading from '@/components/ui/heading';
import { getHomePage } from '@/sanity/lib/client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Organization, WithContext } from 'schema-dts';

export async function generateMetadata() {
  const homepage = await getHomePage();

  if (!homepage) {
    return notFound();
  }

  const metaData: Metadata = {
    title: homepage.metadata?.title,
    description: homepage.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
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
  const homepage = await getHomePage();

  if (!homepage) {
    return notFound();
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
      <main>
        <HomeHero />
        <FeaturedPost />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="max-w-7xl mx-auto p-4 lg:pt-12">
          <Heading as="h2" className="text-xl text-center lg:text-4xl py-2">
            Most Popular Articles
          </Heading>
          <PostList posts={homepage.mostRead} />
        </div>
        <hr />
        <div className="max-w-7xl mx-auto p-4 lg:pt-12">
          <Heading as="h2" className="text-xl text-center lg:text-4xl py-2">
            Latest Articles
          </Heading>

          {!homepage?.posts?.length ? (
            <p>there are no blogposts</p>
          ) : (
            <PostList posts={homepage.posts} />
          )}
        </div>
      </main>
    </>
  );
}
