import type { Metadata } from 'next';
import { Organization, WithContext } from 'schema-dts';
import Heading from '@/components/ui/heading';
import FeaturedPost from '@/components/FeaturedPost';
import { getAllPosts, getHomePage } from '@/sanity/lib/client';
import PostList from '@/components/PostList';

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
    <div className="max-w-7xl mx-auto p-4 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="absolute left-[-999em]">{`${homepage.metadata?.title} - ${homepage.title}`}</h1>
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
  );
}
