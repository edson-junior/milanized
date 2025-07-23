import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:pt-12">
      <Heading
        as="h1"
        className="text-3xl lg:text-5xl mb-6 lg:mb-4 lg:leading-[1.2]"
      >
        Golly Gee Wilikers!!!
      </Heading>
      <p className="text-lg max-w-4xl lg:text-2xl lg:leading-10 mb-6">
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
