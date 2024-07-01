import type { Metadata } from 'next';
import Heading from '@/components/ui/heading';
import { Page } from '@/sanity.types';
import client from '@/client';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata() {
  const homepage = await getPage();

  if (homepage) {
    const metaData: Metadata = {
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      alternates: {
        canonical: `${process.env.CLIENT_URL}/contact`
      }
    };

    return metaData;
  }

  return {};
}

export default function Contact() {
  return (
    <>
      <Heading as="h1" className="text-2xl lg:text-5xl">
        Get in touch with us!
      </Heading>
      <p className="leading-7 mb-8">{`We'll reply as soon as possible`}</p>
      <ContactForm />
    </>
  );
}

async function getPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'contact'][0] {
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
