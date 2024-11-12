'use client';

import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
  toPlainText
} from '@portabletext/react';
import Image from 'next/image';
import { TypedObject } from '@portabletext/types';
import parse from 'html-react-parser';
import Heading from './ui/heading';
import { urlFor } from '@/sanity/lib/image';
import { LuLightbulb } from 'react-icons/lu';
import { slugify } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return value.caption ? (
        <figure>
          <div className="w-full h-52 lg:h-[28rem] relative mb-2 overflow-hidden">
            <Image
              fill
              sizes="(min-width: 1340px) 832px, (min-width: 1040px) calc(85.71vw - 299px), calc(100vw - 32px)"
              loading="lazy"
              src={urlFor(value).width(1280).url()}
              alt={value.alt}
              className="object-cover transition duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
          <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 [&>a]:underline mb-4 place-items-start">
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
        <div
          className={`border-0 border-l-4 border-spacing-2 ${props.value.messageType === 'success' ? 'border-green-700 bg-green-50' : 'border-blue-700 bg-blue-50'} p-4 mb-6 [&>p:not(:last-child)]:mb-6`}
        >
          {!props.value.title ? null : props.value.title.toLowerCase() ===
            'protip' ? (
            <Heading
              as="strong"
              className="flex items-center text-lg lg:text-xl gap-1 mb-2"
            >
              <LuLightbulb />
              <span>{props.value.title}</span>
            </Heading>
          ) : (
            <Heading
              as="strong"
              className="flex items-center text-lg lg:text-xl gap-1 mb-2"
            >
              <InfoIcon />
              <span>{props.value.title}</span>
            </Heading>
          )}
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
      const { blank, href } = value;

      if (blank) {
        return (
          <a
            href={href}
            target="_blank" // read https://css-tricks.com/use-target_blank/
            rel="noreferrer noopener"
            className="text-blue-700 underline"
          >
            {children}
          </a>
        );
      }

      return (
        <a href={href} className="text-blue-700 underline">
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/blog/${slug.current}`;
      return (
        <a href={href} className="text-blue-700 underline">
          {children}
        </a>
      );
    }
    // TODO: test this `code` mark
    // code: ({ text }) => {
    //   return <div>{parse(text)}</div>;
    // }
  },

  block: {
    normal: ({ children }) => {
      return <p className="leading-7 [&:not(:last-child)]:mb-6">{children}</p>;
    },
    h1: ({ children }) => {
      return (
        <Heading as="h1" className="text-2xl lg:text-5xl">
          {children}
        </Heading>
      );
    },
    h2: ({ value, children }) => {
      return (
        <Heading
          as="h2"
          className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
          id={slugify(toPlainText(value))}
        >
          {children}
        </Heading>
      );
    },
    h3: ({ value, children }) => {
      return (
        <Heading
          as="h3"
          className="text-lg lg:text-2xl py-0 lg:py-2 scroll-m-20"
          id={slugify(toPlainText(value))}
        >
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
