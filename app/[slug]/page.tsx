import BlockRendererClient from '@/components/BlockRenderClient';
import { getPosts } from '../../services/api';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import CldImage from '@/components/CldImage';
import parse from 'html-react-parser';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const { data } = await getPosts(`filters[slug][$eq]=${params.slug}`);
  const featuredImage = data[0]?.attributes?.featuredImage;

  return {
    title: data[0]?.attributes?.title,
    description: data[0]?.attributes?.summary,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}/${params.slug}`
    },
    keywords: data[0]?.attributes.seo.keywords,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}/${params.slug}`,
      siteName: 'Milanized',
      locale: 'en_GB',
      type: 'article',
      title: data[0]?.attributes?.title,
      description: data[0]?.attributes?.summary,
      images: {
        url: featuredImage?.data.attributes.formats.thumbnail.url,
        secureUrl: featuredImage?.data.attributes.formats.thumbnail.url,
        alt: featuredImage?.data.attributes.alternativeText || '',
        width: featuredImage?.data.attributes.formats.thumbnail.width,
        height: featuredImage?.data.attributes.formats.thumbnail.height
      }
    }
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await getPosts(`filters[slug][$eq]=${params.slug}`);
  const featuredImage = data[0]?.attributes?.featuredImage;

  if (featuredImage?.data) {
    return (
      <>
        {data[0]?.attributes?.title && (
          <Heading as="h1" className="text-2xl lg:text-5xl mt-3 mb-2">
            {data[0]?.attributes?.title}
          </Heading>
        )}

        {/* TODO: implement this */}
        {/* <div className="flex gap-2 py-4">
          <div>{data[0]?.attributes.category}</div>
          <span>-</span>
          <div>December 5, 2018</div>
          <span>-</span>
          <div>3 minute read</div>
        </div> */}

        {featuredImage.data.attributes.caption ? (
          <figure>
            <CldImage
              width="800"
              height="800"
              src={featuredImage.data.attributes.url}
              alt={featuredImage.data.attributes.alternativeText || ''}
              loading="eager"
              priority
              crop="fit"
              className="block h-full w-full object-cover mb-2"
            />
            <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 hover:[&>a]:underline mb-4">
              {parse(featuredImage.data.attributes.caption)}
            </figcaption>
          </figure>
        ) : (
          <CldImage
            width="800"
            height="800"
            src={featuredImage.data.attributes.url}
            alt={featuredImage.data.attributes.alternativeText || ''}
            loading="eager"
            priority
            crop="fit"
            className="block h-full w-full object-cover"
          />
        )}

        <br />
        <main className="flex flex-col md:flex-row gap-8">
          <article className="flex-1 md:w-64">
            <BlockRendererClient content={data[0]?.attributes?.content} />
          </article>
          {/* TODO: sidebar goes here */}
        </main>
      </>
    );
  }
}
