'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SiteNavigationElement, WithContext } from 'schema-dts';
import DesktopNavigation from './DesktopNavigation';
import { links } from './links';
import MobileNavigation from './MobileNavigation';
import SearchBar from './SearchBar';

const jsonLd: WithContext<SiteNavigationElement> = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: [...links.map((item) => item.text)],
  url: [
    ...links.flatMap((item) =>
      item.href ? [item.href] : (item.children?.map((c) => c.href) ?? [])
    )
  ]
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
    if (inputRef.current) inputRef.current.value = '';
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = inputRef.current?.value.trim();

    if (!value) {
      return;
    }

    router.push(`/search?query=${encodeURIComponent(value)}`);
    setSearchOpen(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <header className="bg-jet-black sticky w-full top-0 z-10">
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

        <div className="flex ml-auto">
          <SearchBar
            open={searchOpen}
            onToggle={() => {
              setSearchOpen((isOpen) => !isOpen);
              setMobileOpen(false);
            }}
          />
          <DesktopNavigation />
        </div>
        <MobileNavigation
          open={mobileOpen}
          onToggle={() => {
            setMobileOpen((isOpen) => !isOpen);
            setSearchOpen(false);
          }}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Slide-down search panel */}
      <div className="absolute overflow-hidden top-full left-0 w-full">
        <div
          aria-hidden={!searchOpen}
          inert={!searchOpen}
          className={`bg-white shadow-md transition-all duration-300 ease-in-out ${
            searchOpen ? 'max-h-20 border-b border-black/10' : 'max-h-0'
          }`}
        >
          <form
            role="search"
            onSubmit={handleSubmit}
            className="max-w-7xl mx-auto px-4 py-4 md:py-5 flex items-center gap-3"
          >
            <label htmlFor="search-input-header" className="sr-only">
              Search articles
            </label>
            <input
              ref={inputRef}
              id="search-input-header"
              type="text"
              name="s"
              placeholder="Search articles…"
              autoComplete="off"
              className="flex-1 bg-transparent border-b border-black/20 text-black text-sm placeholder-black/40 outline-none focus:border-black pb-1 transition-colors"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="text-black/50 hover:text-black transition-colors text-sm shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
