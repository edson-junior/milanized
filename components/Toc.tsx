import { cn, slugify } from '@/lib/utils';
import TocHighlighter from './TocHighlighter';
import Heading from './ui/heading';

export default function Toc({
  headings
}: {
  headings?: {
    text: string;
    style: string;
  }[];
}) {
  return (
    <nav className="hidden lg:block mb-6">
      <Heading as="h2" className="block text-lg">
        In this article
      </Heading>

      <ul className="anim-fade-to-b mt-2 leading-tight">
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
      </ul>

      {headings && <TocHighlighter headings={headings} />}
    </nav>
  );
}
