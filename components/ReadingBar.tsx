'use client';

import { useParams, usePathname } from 'next/navigation';

function ReadingBar() {
  const currentRoute = usePathname();
  const params = useParams<{ slug: string }>();

  if (currentRoute.includes('blog') && params?.slug !== undefined) {
    return (
      <div className="absolute top-full w-screen bg-red-300">
        <div
          className="h-1 bg-red-700 w-full origin-[0_50%] animate-[scaleProgress_auto_linear]"
          style={{
            animationTimeline: 'scroll()'
          }}
        />
      </div>
    );
  }

  return null;
}

export default ReadingBar;
