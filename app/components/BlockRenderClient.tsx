'use client';

import Image from 'next/image';

import {
  BlocksRenderer,
  type BlocksContent
} from '@strapi/blocks-react-renderer';

interface BlockRendererProps {
  readonly content: BlocksContent;
}

export default function BlockRendererClient({ content }: BlockRendererProps) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ''}
            />
          );
        }
      }}
    />
  );
}
