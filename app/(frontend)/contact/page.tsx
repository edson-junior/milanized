import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { getContactPage } from '@/sanity/lib/client';
import Hero from '@/components/Hero';

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
          title={contact.title}
          subtitle="We'll reply as soon as possible! 📨"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <ContactForm />
      </div>
    </>
  );
}
