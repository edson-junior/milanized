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
      robots:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      alternates: {
        canonical: `${process.env.CLIENT_URL}/contact`
      },
      openGraph: {
        url: `${process.env.CLIENT_URL}/contact`,
        title: homepage.metadata?.title,
        description: homepage.metadata?.description,
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

export default function Contact() {
  return (
    <>
      <div
        className={`group block shadow-md mb-6 relative bg-[url(/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqua4h5qu%2Fproduction%2F2d2b8abbcbce0ee0c69e4ef6a411fa4d92ec9a09-2048x1152.jpg%3Fw%3D1280&w=3840&q=75)] bg-no-repeat w-full h-52 lg:h-80 bg-cover bg-center bg-blend-darken before:block before:w-full before:h-full before:absolute before:backdrop-blur-sm before:bg-black/70`}
      >
        {/* TODO:

    fix hero image on every single page, add hero image to contact
    page as well, each with it's own background image */}
        <div className="text-white flex align-middle h-full flex-col justify-center max-w-7xl mx-auto px-4 py-4 relative">
          <Heading as="h1" className="text-2xl lg:text-5xl">
            Get in touch with us!
          </Heading>
          <p className="leading-7 mb-8">{`We'll reply as soon as possible! 📨`}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ContactForm />
      </div>
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
