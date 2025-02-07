import { ComponentProps, ReactNode } from 'react';
import Heading from './ui/heading';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type HeroProps = ComponentProps<'div'> &
  Partial<{
    mainTitle: string | ReactNode;
    subtitle?: string;
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
        'group block shadow-md mb-6 relative bg-no-repeat w-full h-52 lg:h-80 bg-gray-600',
        className
      )}
    >
      <Image
        src={bgImage}
        fill
        priority
        alt="background image"
        sizes="(min-width: 680px) 100vw, (min-width: 520px) calc(30vw + 462px), (min-width: 400px) 684px, calc(-148.75vw + 1233px)"
        className="object-cover brightness-[0.30]"
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={placeholder}
      />

      <div className="text-white text-center flex align-middle h-full flex-col justify-center max-w-7xl mx-auto px-4 py-4 relative">
        {typeof mainTitle === 'string' && (
          <Heading
            as="h1"
            className="text-3xl lg:text-5xl [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black] mb-2 lg:mb-4"
          >
            {mainTitle}
          </Heading>
        )}

        {typeof mainTitle !== 'string' && mainTitle}
        {subtitle && (
          <p className="leading-7 mb-8 lg:text-lg [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
