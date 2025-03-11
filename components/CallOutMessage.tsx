import React from 'react';
import Heading from './ui/heading';
import { PortableText } from '@portabletext/react';
import { PortableTextTypes } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { PortableComponents } from './BlockRenderClient';

interface CallOutMessageProps {
  title?: string;
  text?: PortableTextTypes;
  messageType: string;
  children?: React.ReactNode;
}

export default function CallOutMessage({
  title,
  text,
  messageType,
  children
}: CallOutMessageProps) {
  const success = `${messageType === 'success' && 'border-green-700 bg-green-50'}`;

  if (!text && !children) {
    throw new Error('you need either a `text` or a `children` parameter.');
  }

  return (
    <div
      className={cn(
        `border-0 border-l-4 border-spacing-2 relative p-4 mb-6 [&>p:not(:last-child)]:mb-6 border-blue-700 bg-blue-50`,
        success
      )}
    >
      {title && (
        <Heading
          as="strong"
          className="flex items-center text-lg lg:text-xl gap-1 mb-2"
        >
          <span>{title}</span>
        </Heading>
      )}
      {children && !text && children}
      {text && !children && (
        <PortableText value={text} components={PortableComponents} />
      )}
    </div>
  );
}
