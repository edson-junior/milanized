import BlockRendererClient from '@/components/BlockRenderClient';
import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import { getContactPage } from '@/sanity/lib/client';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const contact = await getContactPage();

  if (contact) {
    const metaData: Metadata = {
      title: contact.metadata?.title,
      description: contact.metadata?.description,
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/contact`,
        types: {
          'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
        }
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/contact`,
        title: contact.metadata?.title,
        description: contact.metadata?.description,
        type: 'website',
        images: {
          url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
          alt: 'Contact',
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

export default async function Contact() {
  const contact = await getContactPage();

  return (
    <>
      {contact?.title && (
        <Hero
          mainTitle={contact.title}
          subtitle="We'll reply as soon as possible!"
          bgImage="/images/nir-himi-tPvnpMkzET8-unsplash.jpg"
          placeholder="data:image/webp;base64,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"
        />
      )}

      <div className="max-w-4xl lg:text-lg mx-auto px-4 py-4">
        {contact?.content && (
          <div className="mb-16">
            <BlockRendererClient value={contact?.content} />
          </div>
        )}
        <ContactForm />
      </div>
    </>
  );
}
