'use client';

import { useEffect } from 'react';
import { slugify } from '@/lib/utils';
import css from './Toc.module.css';

export default function TocHighlighter({
  headings
}: {
  headings: { text: string }[];
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const observers: IntersectionObserver[] = [];

    headings.forEach(({ text }) => {
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
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headings]);

  return null;
}
