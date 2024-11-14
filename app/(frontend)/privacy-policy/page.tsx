import type { Metadata } from 'next';
import BlockRendererClient from '@/components/BlockRenderClient';
import { getPrivacyPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';

export async function generateMetadata() {
  const homepage = await getPrivacyPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/privacy-policy`
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/privacy-policy`,
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

export default async function PrivacyPolicy() {
  const data = await getPrivacyPage();

  if (data) {
    return (
      <>
        {data.title && (
          <Hero title={data.title} subtitle="Last Updated: 18/07/2024" />
        )}
        <div className="max-w-7xl mx-auto px-4 py-4">
          {data.content && <BlockRendererClient value={data.content} />}
        </div>
      </>
    );
  }
}
