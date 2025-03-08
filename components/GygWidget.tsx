'use client';

import parse from 'html-react-parser';
import Heading from './ui/heading';
import Script from 'next/script';

interface GygWidgetProps {
  markDefs: null;
  snippet: Snippet;
  title: string;
  _key: string;
  _type: string;
}

interface Snippet {
  code: string;
  _type: string;
  language: string;
}

export default function GygWidget({ title, snippet }: GygWidgetProps) {
  return (
    <>
      <Heading
        as="h2"
        className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
      >
        {title}
      </Heading>

      <div className="-mx-3 mb-8">{parse(snippet.code)}</div>

      <Script defer src="https://widgets.tiqets.com/loader.js"></Script>
    </>
  );
}
