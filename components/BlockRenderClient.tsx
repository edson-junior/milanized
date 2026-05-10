'use client';

import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
  toPlainText
} from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { TableRow } from '@sanity/table';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { slugify } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import CallOutMessage from './CallOutMessage';
import CTACollection from './CTACollection';

const GygWidget = dynamic(() => import('./GygWidget'));
const Table = dynamic(() => import('./Table'));

import Heading from './ui/heading';

export interface Table {
  rows?: TableRow[];
  title?: string;
}

export interface TableValueProps {
  table?: Table;
  caption?: string;
}

const CustomHTML = dynamic(() => import('./CustomHTML'), { ssr: false });

export const PortableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return value.caption ? (
        <figure className="-ml-4 -mr-4 lg:ml-0 lg:mr-0">
          <div className="w-full aspect-video relative mb-2 overflow-hidden lg:rounded-md">
            <Image
              fill
              sizes="(min-width: 1340px) 832px, (min-width: 1040px) calc(85.71vw - 299px), 50vw"
              loading="lazy"
              src={urlFor(value).width(1280).url()}
              alt={value.alt}
              blurDataURL={value.lqip}
              placeholder="blur"
              className="object-cover transition duration-200 ease-in-out transform hover:scale-110"
            />
          </div>
          <figcaption className="text-xs italic text-gray-600 [&>a]:text-blue-700 [&>a]:underline mb-4 place-items-start mx-4 lg:mx-0">
            {parse(value.caption)}
          </figcaption>
        </figure>
      ) : (
        <Image
          className="mb-2 object-cover transition duration-200 ease-in-out transform hover:scale-110"
          width={1280}
          height={1280}
          loading="lazy"
          src={urlFor(value).width(1280).url()}
          alt={value.alt || ''}
        />
      );
    },
    ctas: ({ value }) => {
      return <CTACollection {...value} />;
    },
    messages: ({ value }) => {
      return <CallOutMessage {...value} />;
    },
    tableRichText: ({ value }) => {
      return <Table value={value} />;
    },
    gygSnippet: ({ value }) => {
      return <GygWidget {...value} />;
    },
    customHTML: ({ value }) => {
      if (/instagram.com\/embed.js/gm.test(value.HTMLSnippet.code)) {
        return <CustomHTML {...value} suppressHydrationWarning />;
      }

      return parse(value.HTMLSnippet.code);
    }
  },

  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-col list-disc gap-2 list-outside ms-4 [&:not(:last-child)]:mb-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="flex flex-col list-decimal gap-2 list-outside ms-4 mb-6">
        {children}
      </ol>
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
            className="text-blue-700 underline hover:no-underline"
          >
            {children}
          </a>
        );
      }

      return (
        <a href={href} className="text-blue-700 underline hover:no-underline">
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/blog/${slug.current}`;
      return (
        <a href={href} className="text-blue-700 underline hover:no-underline">
          {children}
        </a>
      );
    }
  },

  block: {
    normal: ({ children }) => {
      // if (value.children[0].marks.includes('code')) {
      //   return <>{parse(value.children[0].text)}</>;
      // }

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
          className="text-lg lg:text-2xl py-0 lg:py-2 mb-2 scroll-m-20"
          id={slugify(toPlainText(value))}
        >
          {children}
        </Heading>
      );
    },
    h4: ({ value, children }) => {
      return (
        <Heading
          as="h4"
          className="text-md lg:text-xl py-0 lg:py-2 mb-2 scroll-m-20"
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
  return <PortableText value={value} components={PortableComponents} />;
}
