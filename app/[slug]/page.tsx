import BlockRendererClient from '@/components/BlockRenderClient';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import parse from 'html-react-parser';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import Image from 'next/image';
import { Blog } from '@/sanity.types';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const data = await getPosts(params.slug);

  if (!data?.featuredImage) {
    return {};
  }

  return {
    title: data.title,
    description: data.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/${params.slug}`
    },
    keywords: data.metadata?.keywords,
    openGraph: {
      url: `${process.env.CLIENT_URL}/${params.slug}`,
      siteName: 'Milanized',
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
  const data = await getPosts(params.slug);

  if (data) {
    return (
      <>
        <Heading as="h1" className="text-2xl lg:text-5xl mb-8">
          {data.title}
        </Heading>

        {/* TODO: implement this */}
        {/* <div className="flex gap-2 py-4">
            <div>{data[0]?.attributes.category}</div>
            <span>-</span>
            <div>December 5, 2018</div>
            <span>-</span>
            <div>3 minute read</div>
          </div> */}

        {data?.featuredImage && (
          <FeaturedImage featuredImage={data.featuredImage} />
        )}

        <main className="flex flex-col md:flex-row gap-8">
          <article className="flex-1 md:w-64">
            {data?.content && <BlockRendererClient value={data?.content} />}
          </article>
          {/* TODO: sidebar goes here */}
        </main>
      </>
    );
  }
}

type FeaturedImageProps = {
  featuredImage: Blog['featuredImage'];
};

function FeaturedImage({ featuredImage }: FeaturedImageProps) {
  if (!featuredImage) {
    return;
  }

  if (featuredImage.caption) {
    return (
      <figure>
        <Image
          width="1280"
          height="1280"
          src={urlFor(featuredImage).width(1280).url()}
          alt={featuredImage.alt || ''}
          loading="eager"
          priority
          className="block h-full w-full object-cover mb-2"
        />
        <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 hover:[&>a]:underline mb-4">
          {parse(featuredImage?.caption)}
        </figcaption>
      </figure>
    );
  }

  return (
    <Image
      width="800"
      height="800"
      src={urlFor(featuredImage).width(800).url()}
      alt={featuredImage.alt || ''}
      loading="eager"
      priority
      className="block h-full w-full object-cover"
    />
  );
}

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

async function getPosts(slug: string): Promise<Blog | undefined> {
  const query = `*[_type == 'blog' && metadata.slug.current == "${slug}"][0] {
    _id,
    title,
    summary,
    content,
    featuredImage,
    metadata {
      'slug': slug.current,
      slug,
      description,
      keywords,
      image
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}
