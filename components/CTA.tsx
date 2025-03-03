import Link from 'next/link';
import { ComponentProps } from 'react';

interface Link {
  _type: string;
  internal?: Internal | null;
  external?: string;
  blank?: boolean;
  label: string;
  type: string;
}

interface Internal {
  metadata: Metadata;
}

interface Metadata {
  slug: string;
}

interface CTAProps extends ComponentProps<'a'> {
  link: Link;
}

export default function CTA({ link, className, children, ...rest }: CTAProps) {
  const props = {
    className,
    children,
    ...rest
  };

  if (link?.type === 'internal' && link.internal) {
    return (
      <Link
        href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${link.internal.metadata.slug}`}
        {...props}
      />
    );
  }

  if (link?.type === 'external' && link.external) {
    if (link.blank) {
      return (
        <a
          href={link.external}
          {...props}
          target="_blank" // read https://css-tricks.com/use-target_blank/
          rel="noreferrer noopener"
        >
          {children}
        </a>
      );
    }

    return (
      <a href={link.external} {...props}>
        {children}
      </a>
    );
  }

  return null;
}
