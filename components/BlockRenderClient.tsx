'use client';

import parse from 'html-react-parser';

import {
  BlocksRenderer,
  type BlocksContent
} from '@strapi/blocks-react-renderer';
import Heading from './ui/heading';
import CldImage from './CldImage';

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
          return image.caption ? (
            <figure>
              <CldImage
                className="mb-2"
                width={image.width}
                height={image.height}
                src={image.url}
                alt={image.alternativeText || ''}
                title={image.name || ''}
              />
              <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 hover:[&>a]:underline mb-4">
                {parse(image.caption)}
              </figcaption>
            </figure>
          ) : (
            <CldImage
              width={image.width}
              height={image.height}
              src={image.url}
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
          return (
            <p className="leading-7 [&:not(:first-child)]:mt-3">{children}</p>
          );
        },
        list: ({ format, children }) => {
          if (format === 'unordered') {
            return <ul className="list-disc list-inside">{children}</ul>;
          }
        },
        link: ({ children, url }) => {
          return (
            <a href={url} className="text-blue-700 hover:underline">
              {children}
            </a>
          );
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
