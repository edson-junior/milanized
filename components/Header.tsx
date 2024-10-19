'use client';

import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer';
import { SiteNavigationElement, WithContext } from 'schema-dts';
import ReadingBar from './ReadingBar';

const links = [
  {
    href: '/blog',
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

const jsonLd: WithContext<SiteNavigationElement> = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: [...links.map((item) => item.text)],
  url: [...links.map((item) => item.href)]
};

export default function Header() {
  // TODO: make header sticky
  const [open, setOpen] = useState(false);
  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header className="bg-black sticky w-full top-0 z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl	items-center h-14 lg:h-16 self-center mx-auto px-4 flex relative">
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
            <DrawerTitle className="hidden">Menu</DrawerTitle>
            <DrawerDescription className="hidden">
              Navigation menu
            </DrawerDescription>
            <DrawerHeader className="bg-black h-14 flex mb-4">
              <Link
                href="/"
                className="text-white font-bold uppercase text-lg lg:text-2xl"
                onClick={closeMobileMenu}
              >
                Milanized!
              </Link>
              <DrawerClose className="text-white ml-auto">
                <X />
              </DrawerClose>
            </DrawerHeader>
            <ul className="px-4">
              {links.map(({ href, text }, index) => {
                return (
                  <li key={index} className="border-b border-gray-100">
                    <Link
                      className="text-sm font-semibold block py-2 hover:underline"
                      href={href}
                      onClick={closeMobileMenu}
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
      <ReadingBar />
    </header>
  );
}
