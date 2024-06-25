import type { Metadata } from 'next';
import client from '@/client';
import { Page } from '@/sanity.types';
import BlockRendererClient from '@/components/BlockRenderClient';
import Heading from '@/components/ui/heading';

export async function generateMetadata() {
  const homepage = await getPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}`
      }
    };

    return metaData;
  }
}

export default async function Home() {
  const data = await getPage();

  if (data) {
    return (
      <div>
        <Heading as="h1" className="text-2xl lg:text-5xl">
          {data.title}
        </Heading>
        {data.content && <BlockRendererClient value={data.content} />}
      </div>
    );
  }
}

async function getPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'about'][0] {
    _id,
    title,
    content,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}
