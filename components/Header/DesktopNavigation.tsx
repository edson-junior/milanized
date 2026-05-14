'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { links, travelTipsGroups } from './links';

export default function DesktopNavigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  }

  return (
    <nav className="text-white hidden lg:flex" aria-label="Main navigation">
      <ul className="flex items-center gap-8">
        {links.map(({ href, text, children }) => {
          if (children) {
            return (
              <li
                key={text}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className="flex items-center gap-1 py-2 hover:underline"
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  {text}
                  <svg
                    className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white text-jet-black shadow-xl rounded-md border border-black/10 p-6 grid grid-cols-3 gap-6 z-50"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    {travelTipsGroups.map((group) => (
                      <div key={group.heading}>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          {group.heading}
                        </p>
                        <ul className="space-y-1">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm hover:text-red-700 hover:underline transition-colors"
                              >
                                {link.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={href}>
              <Link className="block py-2 hover:underline" href={href!}>
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
