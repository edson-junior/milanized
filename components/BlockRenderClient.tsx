'use client';

import {
  PortableText,
  PortableTextComponents,
  PortableTextProps
} from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client from '@/client';
import Image from 'next/image';
import { TypedObject } from '@portabletext/types';
import parse from 'html-react-parser';
import Heading from './ui/heading';

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return value.caption ? (
        <figure>
          <Image
            className="mb-2"
            width="800"
            height="800"
            src={urlFor(value).width(800).url()}
            alt={value.alt}
          />
          <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 hover:[&>a]:underline mb-4">
            {parse(value.caption)}
          </figcaption>
        </figure>
      ) : (
        <Image
          className="mb-2"
          width="800"
          height="800"
          src={urlFor(value).width(800).url()}
          alt={value.alt}
        />
      );
    },
    callToAction: ({ value, isInline }) => {
      return isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      );
    }
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside">{children}</ul>
    )
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-700 hover:underline"
        >
          {children}
        </a>
      );
    }
  },

  block: {
    normal: ({ children, value }) => {
      if (value.children[0].marks.includes('code')) {
        return <>{parse(value.children[0].text)}</>;
      }

      if (value.children[0].text === '') {
        return <br />;
      }

      return <p className="leading-7">{children}</p>;
    },
    h1: ({ children }) => {
      return (
        <Heading as="h1" className="text-2xl lg:text-5xl">
          {children}
        </Heading>
      );
    },
    h2: ({ children }) => {
      return (
        <Heading as="h2" className="text-xl lg:text-4xl py-0 lg:py-2">
          {children}
        </Heading>
      );
    },
    h3: ({ children }) => {
      return (
        <Heading as="h3" className="text-lg lg:text-2xl py-0 lg:py-2">
          {children}
        </Heading>
      );
    }
  }
};

export default function BlockRendererClient({
  value
}: PortableTextProps<TypedObject>) {
  return <PortableText value={value} components={components} />;
}
