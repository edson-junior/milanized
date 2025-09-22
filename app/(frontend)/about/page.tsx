import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlockRendererClient from '@/components/BlockRenderClient';
import Hero from '@/components/Hero';
import { getAboutPage } from '@/sanity/lib/client';

export async function generateMetadata() {
  const homepage = await getAboutPage();

  if (!homepage) {
    return notFound();
  }

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

export default async function Home() {
  const data = await getAboutPage();

  if (!data) {
    return notFound();
  }

  return (
    <>
      {data.title && (
        <Hero
          mainTitle={data.title}
          subtitle={
            <>
              <p className="max-w-5xl text-sm/7 lg:text-lg/7 mb-6">
                Milanized began in April 2024, intending to be a go-to guide in
                English for exploring the city. As someone who had recently
                moved to Milan, I found it very challenging to find quality
                websites in English that helped me explore the city. Since I
                knew a thing or two about building websites, I thought to
                myself, why not build one to solve this problem?
              </p>
              <p className="max-w-5xl text-sm/7 lg:text-lg/7">
                Since then, it has become my passion to write about the best of
                Milan, and also travel tips. Not just about Milan, or Italy, but
                also Europe and other parts of the world!
              </p>
            </>
          }
        />
      )}

      <div className="max-w-7xl lg:text-lg mx-auto px-4 py-4 mb-20">
        {data.content && <BlockRendererClient value={data.content} />}
      </div>
    </>
  );
}
