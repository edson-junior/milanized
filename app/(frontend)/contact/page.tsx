import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlockRendererClient from '@/components/BlockRenderClient';
import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import Heading from '@/components/ui/heading';
import { getContactPage } from '@/sanity/lib/client';

export async function generateMetadata() {
  const contact = await getContactPage();

  if (!contact) {
    return notFound();
  }

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

interface ContactProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function Contact({ searchParams }: ContactProps) {
  const contact = await getContactPage();
  const { success, error } = await searchParams;

  if (!contact) {
    return notFound();
  }

  return (
    <>
      <Hero
        mainTitle={contact.title}
        className="bg-[#119a91]"
        subtitle={
          <p className="max-w-5xl text-sm/7 lg:text-lg/7">
            We’re always happy to hear from our readers, contributors, and
            collaborators! If you’ve got something on your mind, don’t hesitate
            to reach out. Got a big idea? A small suggestion? Wanna chat? We’re
            here and ready to listen! Check below for a few ways you can connect
            with us.
          </p>
        }
      />
      <div className="max-w-7xl lg:text-lg mx-auto px-4 py-4">
        {contact?.content && (
          <div className="mb-16">
            <BlockRendererClient value={contact?.content} />
          </div>
        )}
      </div>
      <div className="bg-zinc-200 pt-10 pb-20 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Heading
            as="h2"
            className="text-xl text-center lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
          >
            Let's talk!
          </Heading>
          <p className="text-center leading-7 mb-8">
            Whatever you would like to share with us, we are here to listen. So
            don't be shy! <br /> We will reply as soon as possible!
          </p>
          <div className="bg-white rounded-lg shadow-md lg:text-lg mx-auto px-4 py-4">
            <ContactForm success={success === '1'} errorType={error} />
          </div>
        </div>
      </div>
    </>
  );
}
