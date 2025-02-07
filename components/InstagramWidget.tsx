'use client';

import { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

export default function InstagramWidget(props: { value: { url: string } }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    return () => setIsClient(false);
  }, []);

  return (
    <>
      {isClient ? (
        <div>
          <InstagramEmbed url={props.value.url} />
        </div>
      ) : null}
    </>
  );
}
