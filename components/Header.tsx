import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-7xl	mx-auto p-4 flex">
        <Link href="/" className="text-white font-bold uppercase text-2xl">
          Milanized!
        </Link>

        <nav className="text-white flex mx-4">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="group flex flex-row relative">
              Life in Italy
              <ul className="hidden group-hover:block absolute left-0 top-full bg-black p-6 min-w-60">
                <li>
                  <Link href="/essential-tips-for-moving-to-italy-things-to-know-before-moving">
                    Moving to Italy
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="text-white self-end ml-auto">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
