import BlockRendererClient from '@/components/BlockRenderClient';
import Hero from '@/components/Hero';
import { getDisclaimerPage } from '@/sanity/lib/client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const homepage = await getDisclaimerPage();

  if (!homepage) {
    return notFound();
  }

  const metaData: Metadata = {
    title: homepage.metadata?.title,
    description: homepage.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/disclaimer`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/disclaimer`,
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

export default async function Home() {
  const data = await getDisclaimerPage();

  if (!data) {
    return notFound();
  }

  return (
    <>
      {data.title && (
        <Hero
          mainTitle={data.title}
          subtitle="We use affiliate links. Learn what this means for you 😉"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        {data.content && <BlockRendererClient value={data.content} />}
      </div>
    </>
  );
}
