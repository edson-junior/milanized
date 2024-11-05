import BlockRendererClient from '@/components/BlockRenderClient';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import { LuClock2 } from 'react-icons/lu';
import { FeaturedImage } from '@/components/FeaturedImage';
// import Sidebar from '@/components/Sidebar';
import { Slug } from '@/sanity.types';
import { BlogPosting, WithContext } from 'schema-dts';
import { getPostBySlug } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Sidebar from '@/components/Sidebar';

interface BlogDetailsProps {
  params: { slug: Slug };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const data = await getPostBySlug(params.slug);

  if (!data?.featuredImage) {
    return {};
  }

  return {
    title: data.metadata?.title,
    description: data.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/blog/${params.slug}`
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/blog/${params.slug}`,
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
  const data = await getPostBySlug(params.slug);

  if (!data) {
    return;
  }

  const publishedAt = data ? new Date(data?._createdAt) : undefined;
  const updatedAt = data ? new Date(data?._updatedAt) : undefined;
  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${process.env.CLIENT_URL}/blog/${params.slug}/#BlogPosting`,
    mainEntityOfPage: `${process.env.CLIENT_URL}/blog/${params.slug}/`,
    headline: data.metadata?.title,
    name: data.metadata?.title,
    description: data.metadata?.description,
    datePublished: `${publishedAt}`,
    dateModified: `${updatedAt}`,
    url: `${process.env.CLIENT_URL}/blog/${params.slug}/`,
    inLanguage: 'en-GB',
    author: {
      '@type': 'Person',
      '@id': `${process.env.CLIENT_URL}/author/${data?.author?.slug?.current}/#Person`,
      name: data?.author?.name,
      url: `${process.env.CLIENT_URL}/author/${data?.author?.slug?.current}`,
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

  // TODO: create our own types files and not depend on typegen as much. Use typegen just to generate the files, then delete afterwards. Add it to the gitignore, even.

  // author name will be re-enabled when author page is created
  // const authorName = data?.author.name;
  // @ts-expect-error: sanity's typegen doesn't create expanded refence types
  const estimatedReadingTime = data.estimatedReadingTime;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <main className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 lg:w-64">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="flex flex-col gap-8 lg:mb-8">
            <div className="w-full">
              <Heading as="h1" className="text-2xl lg:text-5xl mb-8">
                {data.title}
              </Heading>

              <p className="mb-8 font-bold">{data.summary}</p>

              <div className="flex gap-2 flex-col">
                {/* {authorName && <p>{authorName}</p>} */}
                {publishedAt && (
                  <div>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(publishedAt)}
                  </div>
                )}
                {updatedAt && (
                  <div className="text-xs">
                    {'Last updated: '}
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(updatedAt)}
                  </div>
                )}
                {estimatedReadingTime && (
                  <div className="text-xs flex items-center gap-2">
                    <LuClock2 className="w-4" />
                    {`${Math.ceil(estimatedReadingTime)} minute read`}
                  </div>
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
          {data?.content && <BlockRendererClient value={data?.content} />}
        </article>
        <Sidebar slug={params.slug} headings={data.headings} />
      </main>
    </div>
  );
}
