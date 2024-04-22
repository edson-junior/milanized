import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-7xl	mx-auto p-4">
        <Link href="/">
          <span className="text-white font-bold uppercase text-2xl">
            Milanized!
          </span>
        </Link>
      </div>
    </header>
  );
}
