import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const links = [
  {
    href: 'https://www.facebook.com/MilanIzedOfficial',
    text: 'Facebook',
    icon: <FaFacebookSquare />
  },
  {
    href: 'https://www.instagram.com/milanize.me',
    text: 'Instagram',
    icon: <FaInstagram />
  }
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="flex max-w-7xl mx-auto p-4">
        <span className="font-bold uppercase text-sm mr-auto">
          © {new Date().getFullYear()} Milanized!
        </span>
        <div className="flex ml-auto gap-4">
          {links.map(({ href, text, icon }) => {
            return (
              <Link
                className="text-2xl"
                key={text}
                href={href}
                target="_blank"
                aria-label={text}
              >
                {icon}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto py-6 px-4 border-t border-white">
        <span className="mr-auto">{`Made with ❤️ in Milan`}</span>
        <Link className="ml-auto underline" href="/privacy-policy">
          privacy policy
        </Link>
      </div>
    </footer>
  );
}
