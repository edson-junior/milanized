import Heading from '@/components/ui/heading';
import Image from 'next/image';
import { Slug } from '@/sanity.types';
import type { Metadata } from 'next';
import BlockRendererClient from '@/components/BlockRenderClient';
import { getAuthor } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Suspense } from 'react';
import Paginated from '../../blog/Paginated';
import { Skeleton } from '@/components/ui/skeleton';
import Hero from '@/components/Hero';
import { socialLinks } from '@/components/Footer';
import Link from 'next/link';

interface AuthorProps {
  params: Promise<{ slug: Slug }>;
}

export async function generateMetadata({ params }: AuthorProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    return {};
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
    return null;
  }

  return (
    <>
      <Hero
        mainTitle={author?.name}
        bgImage="/images/federico-di-dio-photography-J0xFABbh9hA-unsplash.jpg"
        className="h-auto lg:mb-12 lg:h-auto [&>div]:h-auto [&>div]:pt-6 [&>div]:px-8 [&>div]:lg:pt-8 [&>div]:pb-8 [&>div]:lg:pb-10 [&>div>h1]:mb-4"
        placeholder="data:image/webp;base64,UklGRt4DAABXRUJQVlA4WAoAAAAgAAAAAwEAoAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg8AEAALAWAJ0BKgQBoQA+7W6vUb+3M6KndBtj8B2JaW7gAO2OxVeHy/xAab+C5MX65FBfBcmYyJZE/FNfr29NNpekGdA1c03o/XRTPUWXb/KwRVxlYxrqsyTpjdVnVA3milQGiHm8IGv8Rkh/4pI6ispwIcNT4a/xhH3Vcv+ArKG7IuiFAiqynENbV78nFedX/Q9bg2+FBvEbYVHSUDDwldaspxDWoPVFt4OBVIbwb4ZgFeS/78VlInf5zpwYyTciPoAA/uSLXwefJ1FG2J34C554ya1o2q0AhbvJGH2qSWeBEObb/HvO9BmLY2C1HbJ5oYyp2L/IOFxWSBYOQeNkjv1LjBOYo2qag8NpWBIwNsdTRnobJ48WcVQNoVohJhQfi0D2I15FyPsHi96uCdSV/ek6m4ITXCHL0syjdXrU/HkNtWdp3aRH3qUsrFlum4k7gKNxoQWswfIo9MmcJjayizUFHNhnzacWumusKFUlkK//9VX2P1qtrObgZu43G0uDpZjrKAACb1NBznma6/E4fTEE+bWBuXnm9AmmB9S5trUsYTgoKfTTodz3/1dPxEk8v6UnTvydvzeq2cKgnS+Uw6a9T9VK93mxB3Bb+Pt8S1q6DpL0r77LgU3iQtwb2epZZTzpAYqiDd9mY5zVapirYiIAAAA="
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
          <div className="max-w-4xl mx-auto lg:text-lg">
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
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-6">
                {Array.from({ length: itemsPerPage ?? 6 }).map((_, i) => (
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
          }
        >
          <Heading
            as="h2"
            className="text-xl text-center lg:text-4xl py-0 lg:py-2 mb-4 scroll-m-20"
          >{`Articles by ${author?.name}`}</Heading>
          <Paginated posts={author?.posts} itemsPerPage={itemsPerPage} />
        </Suspense>
      )}
    </>
  );
}
