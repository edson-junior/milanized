import Link from 'next/link';
import { links } from './links';

export default function DesktopNavigation() {
  return (
    <nav className="text-white hidden lg:flex" aria-label="Main navigation">
      <ul
        className={`flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 lg:flex absolute lg:static lg:z-auto left-0 w-full lg:w-auto p-4 lg:p-0 top-[-490px] z-[-1]`}
      >
        {links.map(({ href, text }) => {
          return (
            <li key={href}>
              <Link className="block py-2 hover:underline" href={href}>
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
