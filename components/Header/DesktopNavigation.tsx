import Link from 'next/link';
import { links } from './Header';

export default function DesktopNavigation() {
  return (
    <nav className="text-white hidden lg:flex">
      <ul
        className={`flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 lg:flex absolute lg:static lg:z-auto left-0 w-full lg:w-auto p-4 lg:p-0 top-[-490px] z-[-1]`}
      >
        {links.map(({ href, text }, index) => {
          return (
            <li key={index}>
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
