'use client';

import Link from 'next/link';
import { LuMenu, LuX } from 'react-icons/lu';
import { links } from './links';

const mobileLinks = [
  { href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`, text: 'Home' },
  ...links
];

interface Props {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function MobileNavigation({ open, onToggle, onClose }: Props) {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="text-white w-7 h-7 flex items-center justify-center"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={onToggle}
      >
        {open ? (
          <LuX size={24} aria-hidden="true" />
        ) : (
          <LuMenu size={24} aria-hidden="true" />
        )}
      </button>

      <div className="absolute overflow-hidden top-full left-0 w-full z-40">
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          inert={!open}
          className={`bg-white shadow-md transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 border-b border-black/10' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col py-2">
            {mobileLinks.map(({ href, text }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-4 py-4 text-md font-semibold text-jet-black hover:bg-black/5 transition-colors"
                  onClick={onClose}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
