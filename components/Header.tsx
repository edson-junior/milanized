'use client';

import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
            className={`flex flex-col lg:flex-row lg:items-center gap-2 lg:flex absolute lg:static bg-black lg:z-auto left-0 w-full lg:w-auto p-4 lg:p-0 ${open ? 'top-full z-10' : 'top-[-490px] z-[-1]'}`}
          >
            <li>
              <Link
                className="block py-2 lg:p-0 hover:underline"
                href="/articles"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link className="block py-2 lg:p-0 hover:underline" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 lg:p-0 hover:underline"
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
