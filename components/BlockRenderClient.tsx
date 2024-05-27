'use client';

import Image from 'next/image';
import parse from 'html-react-parser';

import {
  BlocksRenderer,
  type BlocksContent
} from '@strapi/blocks-react-renderer';
import Heading from './ui/heading';

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
              title={image.alternativeText || ''}
            />
          );
        },
        heading: ({ level, children }) => {
          switch (level) {
            case 1:
              return (
                <Heading as="h1" className="text-5xl">
                  {children}
                </Heading>
              );
            case 2:
              return (
                <Heading as="h2" className="text-4xl py-2">
                  {children}
                </Heading>
              );

            case 3:
              return (
                <Heading as="h3" className="text-2xl py-2">
                  {children}
                </Heading>
              );
          }
        },
        paragraph: ({ children }) => {
          return <p>{children}</p>;
        },
        list: ({ format, children }) => {
          if (format === 'unordered') {
            return <ul className="list-disc list-inside">{children}</ul>;
          }
        },
        code: (props) => {
          if (props?.plainText) {
            return <>{parse(props.plainText)}</>;
          }
        }
      }}
    />
  );
}
