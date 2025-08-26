import BlockRendererClient from '@/components/BlockRenderClient';
import { socialLinks } from '@/components/Footer';
import Hero from '@/components/Hero';
import Heading from '@/components/ui/heading';
import { Skeleton } from '@/components/ui/skeleton';
import { Slug } from '@/sanity.types';
import { getAuthor } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface AuthorProps {
  params: Promise<{ slug: Slug }>;
}

const Paginated = dynamic(() => import('./../../blog/Paginated'), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-9">
        {Array.from({ length: 6 }).map((_, i) => (
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
  )
});

export async function generateMetadata({ params }: AuthorProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    return notFound();
  }

  const metaData: Metadata = {
    title: author.metadata?.title,
    description: author.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/author/${slug}`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/author/${slug}`,
      title: author.metadata?.title,
      description: author.metadata?.description,
      type: 'website',
      images: {
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        alt: author.metadata?.title,
        width: 360,
        height: 360,
        type: 'image'
      }
    }
  };

  return metaData;
}

export default async function Author({ params }: AuthorProps) {
  const { slug } = await params;
  const itemsPerPage = 9;
  const author = await getAuthor(slug);

  if (!author) {
    return notFound();
  }

  return (
    <>
      <Hero
        mainTitle={
          <Heading
            as="h1"
            className="text-3xl lg:text-5xl text-center [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black] mb-2 lg:mb-4"
          >
            {author?.name}
          </Heading>
        }
        className="h-auto lg:mb-12 lg:h-auto [&>div]:h-auto [&>div]:pt-6 [&>div]:px-8 [&>div]:lg:pt-8 [&>div]:pb-8 [&>div]:lg:pb-10 [&>div>h1]:mb-4"
      >
        {author.image && (
          <Image
            className="size-[100px] inline-flex self-center rounded-full overflow-hidden border-2 border-white -order-1 mb-4"
            width={100}
            height={100}
            priority
            src={urlFor(author.image).width(200).url()}
            alt={author.name || ''}
          />
        )}
        {author.bio && (
          <div className="max-w-4xl mx-auto text-center lg:text-lg">
            <div className="flex text-lg justify-center items-center gap-4 mb-4">
              {socialLinks
                .filter(
                  (item) =>
                    !item.text.includes('Feed') && !item.text.includes('Coffee')
                )
                .map(({ href, text, icon }) => {
                  return (
                    <Link
                      className="text-2xl"
                      key={text}
                      href={href}
                      target="_blank"
                      aria-label={text}
                    >
                      {icon}
                    </Link>
                  );
                })}
            </div>
            <BlockRendererClient value={author.bio} />
          </div>
        )}
      </Hero>
      {!author?.posts ? (
        <p>there are no blogposts</p>
      ) : (
        <>
          <Heading
            as="h2"
            className="text-xl text-center lg:text-4xl py-0 lg:py-2 mb-4 scroll-m-20"
          >{`Articles by ${author?.name}`}</Heading>
          <Paginated posts={author?.posts} itemsPerPage={itemsPerPage} />
        </>
      )}
    </>
  );
}
