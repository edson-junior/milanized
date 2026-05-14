'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';
import { links, travelTipsGroups } from './links';

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
  const [tipsOpen, setTipsOpen] = useState(false);

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
            open
              ? 'max-h-[80vh] overflow-y-auto border-b border-black/10'
              : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col py-2">
            {mobileLinks.map(({ href, text, children }) => {
              if (children) {
                return (
                  <li key={text}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-4 text-md font-semibold text-jet-black hover:bg-black/5 transition-colors"
                      onClick={() => setTipsOpen((o) => !o)}
                      aria-expanded={tipsOpen}
                    >
                      {text}
                      <LuChevronDown
                        className={`w-4 h-4 transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {tipsOpen && (
                      <ul className="bg-gray-50 border-t border-black/5">
                        {travelTipsGroups.map((group) => (
                          <li key={group.heading}>
                            <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                              {group.heading}
                            </p>
                            <ul>
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block px-8 py-2 text-sm text-jet-black hover:bg-black/5 transition-colors"
                                    onClick={onClose}
                                  >
                                    {link.text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={href}>
                  <Link
                    href={href!}
                    className="block px-4 py-4 text-md font-semibold text-jet-black hover:bg-black/5 transition-colors"
                    onClick={onClose}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
