'use client';

import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const links = [
    {
      href: '/articles',
      text: 'Articles'
    },
    {
      href: '/about',
      text: 'About'
    },
    {
      href: '/contact',
      text: 'Contact'
    }
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  return (
    <header className="bg-black">
      <div className="max-w-7xl	mx-auto p-4 flex relative">
        <Link
          href="/"
          className="text-white font-bold uppercase text-lg lg:text-2xl"
        >
          Milanized!
        </Link>

        <nav className="text-white flex ml-auto">
          <button onClick={() => setOpen(!open)} className="lg:hidden w-7 h-7">
            {open ? <X /> : <MenuIcon />}
          </button>
          <ul
            className={`flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 lg:flex absolute lg:static bg-black lg:z-auto left-0 w-full lg:w-auto p-4 lg:p-0 ${open ? 'top-full z-10' : 'top-[-490px] z-[-1]'}`}
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
      </div>
    </header>
  );
}
