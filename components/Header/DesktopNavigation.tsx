import Link from 'next/link';
import { links } from './links';

export default function DesktopNavigation() {
  return (
    <nav className="text-white hidden lg:flex" aria-label="Main navigation">
      <ul className="flex items-center gap-8">
        {links.map(({ href, text }) => (
          <li key={href}>
            <Link className="block py-2 hover:underline" href={href!}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
