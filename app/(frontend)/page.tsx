import type { Metadata } from 'next';
import { Organization, WithContext } from 'schema-dts';
import Heading from '@/components/ui/heading';
import FeaturedPost from '@/components/FeaturedPost';
import { getAllPosts, getHomePage } from '@/sanity/lib/client';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Script from 'next/script';

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
      <main>
        <section className="bg-neutral-950 relative">
          <Image
            src="/images/nir-himi-L6C8EFsJbzo-unsplash.jpg"
            fill
            alt="mountains"
            sizes="(min-width: 680px) 100vw, (min-width: 520px) calc(30vw + 462px), (min-width: 400px) 684px, calc(-148.75vw + 1233px)"
            className="object-cover brightness-[0.40]"
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

          {!posts?.length ? (
            <p>there are no blogposts</p>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </main>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
