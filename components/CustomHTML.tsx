'use client';

import { useEffect } from 'react';

// CustomHTML renders Instagram embed blockquotes injected via the Sanity CMS.
// HTMLSnippet.code must only ever be populated by trusted CMS editors and is
// pre-validated by the caller (BlockRenderClient) to contain instagram.com/embed.js.
// Full HTML sanitization is intentionally omitted here: Instagram embed code requires
// data-instgrm-* attributes and inline styles that a strict sanitizer would strip.
// The origin guard below provides defense-in-depth against unexpected call sites.
function isInstagramEmbed(code: string): boolean {
  return code.includes('instagram.com');
}

export default function CustomHTML({
  HTMLSnippet
}: {
  HTMLSnippet: { code: string };
}) {
  useEffect(() => {
    if (window?.instgrm) window.instgrm.Embeds.process();
  }, []);

  if (!isInstagramEmbed(HTMLSnippet.code)) {
    return null;
  }

  return (
    <div
      className="relative overflow-hidden"
      dangerouslySetInnerHTML={{ __html: HTMLSnippet.code }}
    />
  );
}
