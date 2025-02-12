import type { Metadata } from 'next';
import BlockRendererClient from '@/components/BlockRenderClient';
import { getDisclaimerPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';

export async function generateMetadata() {
  const homepage = await getDisclaimerPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/affiliate-link-disclaimer`,
        types: {
          'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
        }
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/affiliate-link-disclaimer`,
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
  const data = await getDisclaimerPage();

  if (data) {
    return (
      <>
        {data.title && (
          <Hero
            title={data.title}
            subtitle="We use affiliate links. Learn what this means for you 😉"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 py-4">
          {data.content && <BlockRendererClient value={data.content} />}
        </div>
      </>
    );
  }
}
