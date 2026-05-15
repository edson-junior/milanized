'use client';

import { useEffect } from 'react';

export default function CustomHTML({
  HTMLSnippet
}: {
  HTMLSnippet: { code: string };
}) {
  useEffect(() => {
    if (window?.instgrm) window.instgrm.Embeds.process();
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      dangerouslySetInnerHTML={{ __html: HTMLSnippet.code }}
    />
  );
}
