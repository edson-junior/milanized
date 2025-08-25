import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Metadata } from 'next';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

export const metadata: Metadata = {
  title: "Womp, womp... coun't find what you're looking for!",
  description:
    "The page you're looking for is either deleted, moved, or never existed in the first place... :(",
  robots:
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  openGraph: {
    title: "Womp, womp... coun't find what you're looking for!",
    description:
      "The page you're looking for is either deleted, moved, or never existed in the first place... :(",
    type: 'website',
    images: {
      url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
      secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
      alt: '404',
      width: 360,
      height: 360,
      type: 'image'
    }
  }
};

export default function NotFound() {
  return (
    <div className="max-w-7xl text-center mx-auto p-4 lg:pt-12">
      <Heading
        as="h1"
        className="text-3xl lg:text-5xl mb-6 lg:mb-4 lg:leading-[1.2]"
      >
        Golly Gee Wilikers!!!
      </Heading>
      <p className="text-lg lg:text-2xl lg:leading-10 mb-6">
        Couldn't find the page you're looking for! :(
      </p>
      <Button asChild>
        <Link href="/">
          Go to Homepage <LuArrowRight />
        </Link>
      </Button>
    </div>
  );
}
