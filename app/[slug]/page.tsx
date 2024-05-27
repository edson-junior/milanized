import BlockRendererClient from '@/components/BlockRenderClient';
import { blogPosts } from '../../services/blogPosts';
import Image from 'next/image';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);

  return {
    title: data[0]?.attributes?.title,
    description: data[0]?.attributes?.summary,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}/${params.slug}`
    }
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);
  const featuredImage = data[0]?.attributes.featuredImage.data?.attributes;

  return (
    <>
      <Heading as="h1" className="text-5xl mt-3 mb-2">
        {data[0]?.attributes?.title}
      </Heading>

      {/* TODO: implement this */}
      {/* <div className="flex gap-2 py-4">
        <div>{data[0]?.attributes.category}</div>
        <span>-</span>
        <div>December 5, 2018</div>
        <span>-</span>
        <div>3 minute read</div>
      </div> */}

      <Image
        src={featuredImage?.url}
        width={featuredImage?.width}
        height={featuredImage?.height}
        alt={featuredImage?.alternativeText || ''}
        title={featuredImage?.alternativeText || ''}
      />

      <br />
      <main className="flex flex-col md:flex-row gap-8">
        <article className="flex-1 md:w-64">
          <BlockRendererClient content={data[0]?.attributes.content} />
        </article>
        {/* TODO: sidebar goes here */}
      </main>
    </>
  );
}
