import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-7xl	mx-auto p-4 flex">
        <Link
          href="/"
          className="text-white font-bold uppercase text-lg lg:text-2xl"
        >
          Milanized!
        </Link>

        <nav className="text-white flex ml-auto">
          <ul className="flex items-center gap-2">
            <li>
              <Link className="hover:underline" href="/articles">
                Articles
              </Link>
            </li>
            {/* <li className="group flex flex-row relative">
              Life in Italy
              <ul className="hidden group-hover:block absolute left-0 top-full bg-black p-6 min-w-60">
                <li>
                  <Link href="/essential-tips-for-moving-to-italy-things-to-know-before-moving">
                    Moving to Italy
                  </Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link className="hover:underline" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* darkmode is being postponed in favor of expediting the launch of the website */}
        {/* <div className="text-white self-end ml-auto">
          <ThemeSwitch />
        </div> */}
      </div>
    </header>
  );
}
