'use client';

import Image from 'next/image';
import { Heading, Text, UnorderedList } from '@chakra-ui/react';
import parse from 'html-react-parser';

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
              title={image.alternativeText || ''}
            />
          );
        },
        heading: ({ level, children }) => {
          switch (level) {
            case 1:
              return (
                <Heading as="h1" size="2xl" py="3">
                  {children}
                </Heading>
              );
            case 2:
              return (
                <Heading as="h2" size="xl" py="2">
                  {children}
                </Heading>
              );

            case 3:
              return (
                <Heading as="h3" size="md" py="2">
                  {children}
                </Heading>
              );
          }
        },
        paragraph: ({ children }) => {
          return <Text>{children}</Text>;
        },
        list: ({ format, children }) => {
          if (format === 'unordered') {
            return <UnorderedList>{children}</UnorderedList>;
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
