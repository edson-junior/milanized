import type { Metadata } from 'next';
import BlockRendererClient from '@/components/BlockRenderClient';
import { getAboutPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';

export async function generateMetadata() {
  const homepage = await getAboutPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/about`,
        types: {
          'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
        }
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/about`,
        title: homepage.metadata?.title,
        description: homepage.metadata?.description,
        type: 'website',
        images: {
          url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          alt: homepage.metadata?.title,
          width: 360,
          height: 360,
          type: 'image'
        }
      }
    };

    return metaData;
  }

  return {};
}

export default async function Home() {
  const data = await getAboutPage();

  if (data) {
    return (
      <>
        {data.title && (
          <Hero
            mainTitle={data.title}
            subtitle="Allow us to introduce ourselves!"
            bgImage="/images/nir-himi-NP3anTPI5oA-unsplash.jpg"
            placeholder="data:image/webp;base64,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"
          />
        )}

        <div className="max-w-4xl lg:text-lg mx-auto px-4 py-4">
          {data.content && <BlockRendererClient value={data.content} />}
        </div>
      </>
    );
  }
}
