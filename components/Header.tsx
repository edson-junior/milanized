'use client';

import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from './ui/drawer';

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

  // TODO: make header sticky
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
          <ul
            className={`flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 lg:flex absolute lg:static bg-black lg:z-auto left-0 w-full lg:w-auto p-4 lg:p-0 top-[-490px] z-[-1]`}
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
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
          <DrawerTrigger
            className="text-white lg:hidden w-7 h-7"
            aria-label="open menu"
          >
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerClose>
                <X />
              </DrawerClose>
            </DrawerHeader>
            <ul className="px-4">
              {links.map(({ href, text }, index) => {
                return (
                  <li key={index} className="border-b border-gray-300">
                    <Link className="block py-3 hover:underline" href={href}>
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
