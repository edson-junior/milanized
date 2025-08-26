import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { ComponentProps, ReactNode } from 'react';
import Heading from './ui/heading';

type HeroProps = ComponentProps<'div'> &
  Partial<{
    mainTitle: string | ReactNode;
    subtitle?: string | ReactNode;
    bgImage?: string;
    placeholder?: string;
  }>;

export default function Hero({
  className,
  children,
  mainTitle,
  subtitle,
  bgImage = '/images/duomo-di-milano-by-night.jpeg',
  placeholder
}: HeroProps) {
  return (
    <div
      className={cn(
        'group block shadow-md mb-6 relative bg-no-repeat w-full py-8 lg:py-16 bg-[#212121]',
        className
      )}
    >
      <div className="text-white flex align-middle h-full flex-col justify-center max-w-7xl mx-auto px-4 py-4 relative">
        {typeof mainTitle === 'string' ? (
          <Heading
            as="h1"
            className="text-3xl lg:text-5xl [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black] mb-2 lg:mb-4"
          >
            {mainTitle}
          </Heading>
        ) : (
          mainTitle
        )}

        {typeof subtitle === 'string' ? (
          <p className="leading-7 mb-8 lg:text-lg [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black]">
            {subtitle}
          </p>
        ) : (
          subtitle
        )}
        {children}
      </div>
    </div>
  );
}
