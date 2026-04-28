import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlockRendererClient from '@/components/BlockRenderClient';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { socialLinks } from '@/lib/social-links';
import { getAuthor } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Slug } from '@/sanity.types';

interface AuthorProps {
  params: Promise<{ slug: Slug }>;
}

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
      <div className="flex flex-col max-w-3xl mx-auto px-4 mb-20">
        <Button asChild variant="outline">
          <a
            className="text-2xl mb-2"
            target="_blank"
            aria-label="Facebook"
            href="https://www.facebook.com/MilanIzedOfficial"
          >
            Facebook
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            className="text-2xl mb-2"
            target="_blank"
            aria-label="Instagram"
            href="https://www.instagram.com/milanize.me"
          >
            Instagram
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            className="text-2xl mb-2"
            target="_blank"
            aria-label="Threads"
            href="https://www.threads.net/@milanize.me"
          >
            Threads
          </a>
        </Button>

        <Button asChild variant="outline">
          <a
            className="text-2xl mb-2"
            target="_blank"
            aria-label="Pinterest"
            href="https://www.pinterest.com/milanizedofficial/"
          >
            Pinterest
          </a>
        </Button>

        <Button asChild variant="outline">
          <a
            className="text-2xl mb-2"
            target="_blank"
            aria-label="Buy me a Coffee"
            href="https://buymeacoffee.com/milanized"
          >
            Put a smile on my face and buy me a coffee! :)
          </a>
        </Button>
      </div>
    </>
  );
}
