import client from '@/client';
import BlockRendererClient from '@/components/BlockRenderClient';
import Heading from '@/components/ui/heading';
import { Page } from '@/sanity.types';

export default async function PrivacyPolicy() {
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
  const query = `*[_type == 'page' && metadata.slug.current == 'privacy-policy'][0] {
    _id,
    title,
    content,
    metadata {
      'slug': slug.current,
    }
  }`;

  try {
    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
}
