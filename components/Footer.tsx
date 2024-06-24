import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black mt-20">
      <div className="flex max-w-7xl	mx-auto p-4">
        <span className="text-white font-bold uppercase text-sm">
          © {new Date().getFullYear()} Milanized!
        </span>
        <Link
          className="ml-auto text-white hover:underline"
          href="/privacy-policy"
        >
          privacy policy
        </Link>
      </div>
    </footer>
  );
}
