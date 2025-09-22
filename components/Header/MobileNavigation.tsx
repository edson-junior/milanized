'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { socialLinks } from '../Footer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { links } from './Header';

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const mobileLinks = [
    {
      href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
      text: 'Home'
    },
    ...links
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="text-white lg:hidden w-7 h-7"
        aria-label="open menu"
      >
        <LuMenu size={24} />
      </DialogTrigger>
      <DialogContent className="bg-black/30 backdrop-blur-sm border-0 h-full w-full p-0 max-w-full [&>button]:hidden">
        <DialogTitle className="hidden">Menu</DialogTitle>
        <DialogDescription className="hidden">
          Navigation menu
        </DialogDescription>
        <DialogHeader className="h-14 flex justify-between items-end p-4">
          <DialogClose className="text-white">
            <LuX size={24} />
          </DialogClose>
        </DialogHeader>
        <div className="overflow-auto">
          <ul className="px-4 mx-auto">
            {mobileLinks.map(({ href, text }, index) => {
              return (
                <li key={index}>
                  <Link
                    className="text-lg text-white text-center font-bold uppercase block lg:text-2xl py-6 hover:underline [text-shadow:_0px_1px_1px_black] lg:[text-shadow:_0px_2px_2px_black]"
                    href={href}
                    onClick={closeMobileMenu}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <DialogFooter className="sm:justify-center">
          <div className="flex justify-center text-lg lg:justify-start items-center pb-8 gap-8 mt-4">
            {socialLinks.map(({ href, text, icon }) => {
              return (
                <Link
                  className="text-2xl text-white"
                  key={text}
                  href={href}
                  target="_blank"
                  aria-label={text}
                >
                  {icon}
                </Link>
              );
            })}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
