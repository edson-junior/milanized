import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-7xl	mx-auto p-4 flex justify-between">
        <Link href="/" className="text-white font-bold uppercase text-2xl">
          Milanized!
        </Link>
        <div className="float-left text-white">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
