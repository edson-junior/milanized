import Heading from '@/components/ui/heading';
import Image from 'next/image';
import { Slug } from '@/sanity.types';
import BlockRendererClient from '@/components/BlockRenderClient';
import { getAuthor } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface AuthorProps {
  params: { slug: Slug };
}

export default async function Author({ params }: AuthorProps) {
  const author = await getAuthor(params.slug);

  if (!author) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Heading as="h1" className="text-2xl lg:text-5xl">
          {author.name}
        </Heading>
        {author.image && (
          <Image
            className="mb-2"
            width={100}
            height={100}
            priority
            src={urlFor(author.image).width(200).url()}
            alt={author.name || ''}
          />
        )}
        {author.bio && <BlockRendererClient value={author.bio} />}
        {/* TODO: render list of blogposts published by this author */}
      </div>
    </>
  );
}
