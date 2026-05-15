import Script from 'next/script';
import Heading from './ui/heading';

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
  const isTiqets = /tiqets/gm.test(snippet.code);

  return (
    <>
      <Heading
        as="h2"
        className="text-xl lg:text-4xl py-0 lg:py-2 mb-2 scroll-m-20"
      >
        {title}
      </Heading>

      <div
        className={isTiqets ? '-mx-3 mb-8' : ''}
        dangerouslySetInnerHTML={{ __html: snippet.code }}
      />

      {isTiqets ? (
        <Script defer src="https://widgets.tiqets.com/loader.js" />
      ) : (
        <Script
          async
          defer
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          data-gyg-partner-id="JHFFJXC"
        />
      )}
    </>
  );
}
