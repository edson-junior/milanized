import Link from 'next/link';
import { SiteNavigationElement, WithContext } from 'schema-dts';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import SearchBar from './SearchBar';

export const links = [
  {
    href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog`,
    text: 'Articles'
  },
  {
    href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/about`,
    text: 'About'
  },
  {
    href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/contact`,
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
          <SearchBar />
          <DesktopNavigation />
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
