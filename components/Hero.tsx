import React, { ComponentProps, ReactNode } from 'react';
import Heading from './ui/heading';
import { cn } from '@/lib/utils';

type HeroProps = ComponentProps<'div'> &
  Partial<{
    mainTitle: string | ReactNode;
    subtitle?: string;
    bgImage?: string;
  }>;

export default function Hero({
  className,
  children,
  mainTitle,
  subtitle,
  bgImage = '/images/duomo-di-milano-by-night.jpeg'
}: HeroProps) {
  return (
    <div
      className={cn(
        'group block shadow-md mb-6 relative bg-no-repeat w-full h-52 lg:h-80 bg-cover bg-center bg-blend-darken before:block before:w-full before:h-full before:absolute before:bg-black/70',
        className
      )}
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="text-white flex align-middle h-full flex-col justify-center max-w-7xl mx-auto px-4 py-4 relative">
        {typeof mainTitle === 'string' && (
          <Heading as="h1" className="text-2xl lg:text-5xl">
            {mainTitle}
          </Heading>
        )}

        {typeof mainTitle !== 'string' && mainTitle}
        {subtitle && <p className="leading-7 mb-8">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
