import BlockRendererClient from '@/components/BlockRenderClient';
import { blogPosts } from '../../services/blogPosts';
import { Heading } from '@chakra-ui/react';
import Image from 'next/image';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);

  return {
    title: data[0]?.attributes?.title,
    description: data[0]?.attributes?.summary
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);
  const featuredImage = data[0]?.attributes.featuredImage.data?.attributes;

  return (
    <>
      <Heading as="h1" size="2xl" paddingTop="3" paddingBottom="2">
        {data[0]?.attributes?.title}
      </Heading>

      <div className="flex gap-2 py-4">
        <div>{data[0]?.attributes.category}</div>
        <span>-</span>
        <div>December 5, 2018</div>
        <span>-</span>
        <div>3 minute read</div>
      </div>

      <Image
        src={featuredImage?.url}
        width={featuredImage?.width}
        height={featuredImage?.height}
        alt={featuredImage?.alternativeText || ''}
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
