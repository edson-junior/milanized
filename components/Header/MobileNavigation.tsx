'use client';

import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer';

import { LuMenu, LuX } from 'react-icons/lu';
import { links } from './Header';
import { useCallback, useState } from 'react';

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className="text-white lg:hidden w-7 h-7"
        aria-label="open menu"
      >
        <LuMenu size={24} />
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
            <LuX size={24} />
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
  );
}
