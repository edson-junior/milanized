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

// snippet.code must only ever be populated by vetted widget embed codes from
// GetYourGuide or Tiqets via the Sanity CMS. CMS write access must be restricted
// to trusted editors. No user-supplied content should reach this component.
const ALLOWED_WIDGET_ORIGINS = ['getyourguide.com', 'tiqets.com'];

function isAllowedWidgetCode(code: string): boolean {
  return ALLOWED_WIDGET_ORIGINS.some((origin) => code.includes(origin));
}

export default function GygWidget({ title, snippet }: GygWidgetProps) {
  const isTiqets = /tiqets/.test(snippet.code);

  if (!isAllowedWidgetCode(snippet.code)) {
    return null;
  }

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
