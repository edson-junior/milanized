import BlockRendererClient from '@/components/BlockRenderClient';
import { getPosts } from '../../services/api';
import { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import CldImage from '@/components/CldImage';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BlogDetailsProps): Promise<Metadata> {
  const { data } = await getPosts(`filters[slug][$eq]=${params.slug}`);

  return {
    title: data[0]?.attributes?.title,
    description: data[0]?.attributes?.summary,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}/${params.slug}`
    }
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await getPosts(`filters[slug][$eq]=${params.slug}`);
  const cloudinaryImage = data[0]?.attributes?.cloudinaryImage;

  return (
    <>
      {data[0]?.attributes?.title && (
        <Heading as="h1" className="text-5xl mt-3 mb-2">
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

      {cloudinaryImage && (
        <CldImage
          width="800"
          height="800"
          src={cloudinaryImage.publicID}
          alt={cloudinaryImage.alt}
          title={cloudinaryImage.alt}
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
