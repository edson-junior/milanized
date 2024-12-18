import Link from 'next/link';
import { ComponentProps } from 'react';

interface Link {
  _key: string;
  _type: string;
  internal: string;
  external: string;
  blank: boolean;
  label: string;
  type: string;
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
    return <Link href={link.internal} {...props} />;
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
