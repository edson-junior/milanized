'use client';

import {
  PortableText,
  PortableTextComponents,
  PortableTextProps
} from '@portabletext/react';
import Image from 'next/image';
import { TypedObject } from '@portabletext/types';
import parse from 'html-react-parser';
import Heading from './ui/heading';
import { urlFor } from '@/sanity/lib/image';
import { LuLightbulb } from 'react-icons/lu';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return value.caption ? (
        <figure>
          <div className="w-full h-52 lg:h-[28rem] relative mb-2 overflow-hidden">
            <Image
              fill
              sizes="100vw"
              loading="lazy"
              src={urlFor(value).width(1280).url()}
              alt={value.alt}
              className="object-cover transition duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
          <figcaption className="flex gap-2 text-xs italic text-gray-600 [&>a]:text-blue-700 [&>a]:underline mb-4 place-items-start">
            {parse(value.caption)}
          </figcaption>
        </figure>
      ) : (
        <Image
          className="mb-2"
          width={800}
          height={800}
          loading="lazy"
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
    },
    messages: (props) => {
      return (
        <div className="border-0 border-l-4 border-spacing-2 border-green-700 bg-green-50 p-6 mb-6 [&>p:not(:last-child)]:mb-6">
          <Heading as="strong" className="flex text-lg lg:text-xl gap-2 mb-2">
            <LuLightbulb />
            <span>{props.value.title}</span>
          </Heading>
          <PortableText value={props.value.text} />
        </div>
      );
    }
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ms-4 mb-6">{children}</ul>
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
        return <div>{parse(value.children[0].text)}</div>;
      }

      return <p className="leading-7 [&:not(:last-child)]:mb-6">{children}</p>;
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
        <Heading as="h2" className="text-xl lg:text-4xl py-0 lg:py-2 mb-2">
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
