import BlockRendererClient from '@/components/BlockRenderClient';
import CallOutMessage from '@/components/CallOutMessage';
import { FeaturedImage } from '@/components/FeaturedImage';
import { socialLinks } from '@/components/Footer';
import PostList from '@/components/PostList';
import Toc from '@/components/Toc';
import Heading from '@/components/ui/heading';
import { formatDate } from '@/lib/utils';
import { getPostBySlug, sanityFetch } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LuClock2 } from 'react-icons/lu';
import { BlogPosting, WithContext } from 'schema-dts';

interface BlogDetailsProps {
  params: { slug: string };
}

interface SlugList {
  metadata: {
    slug: string;
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs: SlugList[] = await sanityFetch({
    query: groq`*[_type == "blog" && !(_id in path('drafts.**'))] | order(_createdAt desc) [0...10] {
      metadata {
        'slug': slug.current
      }
    }`
  });

  return slugs.map(({ metadata }) => metadata.slug);
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug(slug[0] as string);

  if (!data?.featuredImage) {
    return {};
  }

  return {
    title: data.metadata?.title,
    description: data.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/blog/${slug[0]}`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/blog/${slug[0]}`,
      siteName: 'Milanized!',
      locale: 'en_GB',
      type: 'article',
      title: data.title,
      description: data.metadata?.description,
      images: {
        url: urlFor(data.featuredImage).width(1200).url(),
        secureUrl: urlFor(data.featuredImage).width(1200).url(),
        alt: data.featuredImage.alt,
        width: 1200,
        height: 675,
        type: 'image'
      }
    }
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { slug } = await params;
  const data = await getPostBySlug(slug[0] as string);

  if (!data) {
    return;
  }

  const publishedAt = data
    ? new Date(data?.publishDate || data._createdAt)
    : undefined;
  const updatedAt = data ? new Date(data._updatedAt) : undefined;
  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${process.env.CLIENT_URL}/blog/${slug[0] as string}/#BlogPosting`,
    mainEntityOfPage: `${process.env.CLIENT_URL}/blog/${slug[0] as string}/`,
    headline: data.metadata?.title,
    name: data.metadata?.title,
    description: data.metadata?.description,
    datePublished: `${publishedAt}`,
    dateModified: `${updatedAt}`,
    url: `${process.env.CLIENT_URL}/blog/${slug[0] as string}/`,
    inLanguage: 'en-GB',
    author: {
      '@type': 'Person',
      '@id': `${process.env.CLIENT_URL}/author/${data?.author?.metadata?.slug}/#Person`,
      name: data?.author?.name,
      url: `${process.env.CLIENT_URL}/author/${data?.author?.metadata?.slug}`,
      image: {
        '@type': 'ImageObject',
        '@id': data?.author?.image
          ? urlFor(data?.author?.image).width(200).url()
          : '',
        url: data?.author?.image
          ? urlFor(data?.author?.image).width(200).url()
          : '',
        width: '200',
        height: '200'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Milanized!',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        width: '360',
        height: '360'
      },
      sameAs: [
        'https://www.facebook.com/MilanIzedOfficial',
        'https://www.instagram.com/milanize.me'
      ]
    },
    image: {
      '@type': 'ImageObject',
      url: data.featuredImage
        ? urlFor(data.featuredImage).width(1200).url()
        : ''
    }
  };

  // @ts-expect-error: sanity's typegen doesn't create expanded refence types
  const estimatedReadingTime = data.estimatedReadingTime;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-16 pb-4">
        <main className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:w-64">
            <article>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              <div className="flex flex-col gap-8 lg:mb-8">
                <div className="w-full">
                  <Heading as="h1" className="text-2xl lg:text-5xl mb-8">
                    {data.title}
                  </Heading>

                  <p className="mb-8">{data.summary}</p>

                  <div className="flex text-xs items-center [&>span]:inline-flex [&>span]:after:inline-flex [&>span]:after:self-center [&>span]:after:mx-2 [&>span:last-child]:after:hidden [&>span]:after:w-1 [&>span]:after:h-1 [&>span]:after:bg-black [&>span]:after:rounded-full">
                    {updatedAt &&
                    publishedAt?.getDate() !== updatedAt?.getDate() ? (
                      <span>Last updated: {formatDate(updatedAt)}</span>
                    ) : publishedAt ? (
                      <span>{formatDate(publishedAt)}</span>
                    ) : null}
                    {estimatedReadingTime && (
                      <span className="flex items-center">
                        <LuClock2 className="w-4" />
                        {`${Math.ceil(estimatedReadingTime)} minute read`}
                      </span>
                    )}
                  </div>
                </div>
                {data?.featuredImage && (
                  <FeaturedImage
                    className="flex flex-col lg:shrink-0 grow"
                    featuredImage={data.featuredImage}
                  />
                )}
              </div>
              {data.hasAffiliateLinks && (
                <CallOutMessage messageType="success">
                  <p className="text-xs leading-5 font-semibold">
                    This post might have affiliate links. By purchasing anything
                    through our links, you will be helping support us, at no
                    extra cost to you. <br />
                    <Link
                      href="/disclaimer"
                      target="_blank"
                      className="text-blue-700 underline hover:no-underline text-xs leading-5"
                    >
                      Read our statement
                    </Link>
                  </p>
                </CallOutMessage>
              )}

              {data?.content && <BlockRendererClient value={data?.content} />}
              {data?.author && (
                <div className="flex flex-col lg:flex-row items-center lg:items-start border shadow-sm p-6 mb-8 gap-6">
                  {data?.author?.image && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/author/${data?.author?.metadata?.slug}`}
                    >
                      <Image
                        className="block rounded-full overflow-hidden"
                        width={100}
                        height={100}
                        src={urlFor(data?.author?.image).width(100).url()}
                        alt={data?.author?.name || ''}
                      />
                    </Link>
                  )}

                  <div className="text-center text-sm lg:text-left">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/author/${data?.author?.metadata?.slug}`}
                      className="inline-flex font-bold mb-4"
                    >
                      {data?.author?.name}
                    </Link>
                    {data?.author?.bio && (
                      <PortableText value={data?.author?.bio} />
                    )}
                    <div className="flex justify-center text-lg lg:justify-start items-center gap-4 mt-4">
                      {/*
                      temporary solution for adding socials to the main author.
                      if there are multiple authors one day, this will break. good luck! ;-)
                    */}
                      {socialLinks
                        .filter(
                          (item) =>
                            !item.text.includes('Feed') &&
                            !item.text.includes('Coffee')
                        )
                        .map(({ href, text, icon }) => {
                          return (
                            <Link
                              className="text-lg"
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
                  </div>
                </div>
              )}
            </article>
            {data.relatedArticles && (
              <section>
                <Heading
                  as="h3"
                  className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
                >
                  Related Articles
                </Heading>
                <PostList
                  variant="col"
                  className="gap-8 mb-8"
                  posts={data.relatedArticles}
                />
              </section>
            )}
          </div>
          {data.headings && (
            <aside className="lg:w-96 max-h-auto lg:max-h-[calc(100vh-5rem)] overflow-auto lg:sticky lg:top-20">
              <Toc headings={data.headings} />
            </aside>
          )}
        </main>
      </div>
    </>
  );
}
