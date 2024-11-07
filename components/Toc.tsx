'use client';

import { cn, slugify } from '@/lib/utils';
import Heading from './ui/heading';
import { useEffect } from 'react';
import css from './Toc.module.css';

export default function Toc({
  headings
}: {
  headings?: {
    text: string;
    style: string;
  }[];
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    headings?.forEach(({ text }) => {
      const target = document.getElementById(slugify(text));

      if (!target) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const tocItem = document.querySelector(
            `[data-toc-item="${slugify(text)}"]`
          );

          if (entry.isIntersecting) {
            tocItem?.classList.add(css.inView);
          } else {
            tocItem?.classList.remove(css.inView);
          }
        });
      });

      observer.observe(target);

      return () => observer.disconnect();
    });
  }, [headings]);

  return (
    <div className="hidden lg:block mb-6">
      <Heading className="block text-lg">Table of contents</Heading>

      <ol className="anim-fade-to-b mt-2 leading-tight">
        {headings?.map(({ text, style }, index) => (
          <li
            className="border-l transition-all text-sm"
            data-toc-item={slugify(text)}
            key={index}
          >
            <a
              className={cn(
                'block p-1 border-l-transparent border-l-2 hover:underline',
                style == 'h2' && 'pl-4',
                style == 'h3' && 'pl-6',
                style == 'h4' && 'pl-8',
                style == 'h5' && 'pl-10',
                style == 'h6' && 'pl-12'
              )}
              href={`#${slugify(text)}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
