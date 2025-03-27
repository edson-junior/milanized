import type { Metadata } from 'next';
import { Organization, WithContext } from 'schema-dts';
import Heading from '@/components/ui/heading';
import FeaturedPost from '@/components/FeaturedPost';
import { getHomePage } from '@/sanity/lib/client';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

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
      <main>
        <section className="bg-neutral-950 relative">
          <Image
            src="/images/nir-himi-L6C8EFsJbzo-unsplash.jpg"
            fill
            alt="mountains"
            sizes="(min-width: 680px) 100vw, (min-width: 520px) calc(30vw + 462px), (min-width: 400px) 684px, calc(-148.75vw + 1233px)"
            className="object-cover brightness-[0.40]"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,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"
          />
          <div className="text-white h-full flex-col max-w-7xl text-center mx-auto px-4 pt-14 lg:pt-20 pb-14 lg:pb-20 relative">
            <Heading
              as="h1"
              className="inline-block text-3xl lg:text-6xl mb-8 lg:mb-4 lg:leading-[1.2] max-w-screen-sm [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black]"
            >
              We are here to inspire your next adventure!
            </Heading>

            <p className="leading-7 lg:text-lg lg:leading-normal mb-8 [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black]">
              We are your ultimate online guide to attractions, food and drink,
              and things to do to inspire you when planning your holiday!
            </p>

            <Button
              asChild
              size="lg"
              className="text-md bg-green-600 hover:bg-green-700"
            >
              <Link href="/blog">Start exploring</Link>
            </Button>
          </div>
        </section>

        <div className="max-w-7xl mx-auto p-4 lg:pt-12">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <FeaturedPost />
          <hr className="my-4" />
          <Heading as="h2" className="text-xl lg:text-4xl py-2">
            Most Popular Posts
          </Heading>
          <PostList posts={homepage.mostRead} />
        </div>
        <Hero
          mainTitle={
            <Heading as="h2" className="text-2xl lg:text-5xl">
              Connect with us
            </Heading>
          }
          subtitle="and stay up to date with our latest content"
          className="[&>div]:items-center h-80 lg:h-96 lg:bg-bottom"
          bgImage="/images/gae-aulenti-landscape.jpg"
          placeholder="data:image/webp;base64,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"
        >
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-rose-600 hover:bg-rose-700 lg:text-lg lg:px-8 lg:py-6"
            >
              <Link
                href="https://www.instagram.com/milanize.me"
                target="_blank"
              >
                <FaInstagram /> Instagram
              </Link>
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 lg:text-lg lg:px-8 lg:py-6"
            >
              <Link
                href="https://www.facebook.com/MilanIzedOfficial"
                target="_blank"
              >
                <FaFacebookSquare /> Facebook
              </Link>
            </Button>
          </div>
        </Hero>
        <div className="max-w-7xl mx-auto p-4 lg:pt-12">
          <Heading as="h2" className="text-xl lg:text-4xl py-2">
            Latest Posts
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
