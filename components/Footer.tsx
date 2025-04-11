import { FaFacebookSquare, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import Link from 'next/link';
import { LuHeart, LuRss } from 'react-icons/lu';

export const socialLinks = [
  {
    href: 'https://www.facebook.com/MilanIzedOfficial',
    text: 'Facebook',
    icon: <FaFacebookSquare />
  },
  {
    href: 'https://www.instagram.com/milanize.me',
    text: 'Instagram',
    icon: <FaInstagram />
  },
  {
    href: 'https://www.threads.net/@milanize.me',
    text: 'Threads',
    icon: <FaThreads />
  },
  {
    href: 'https://www.pinterest.com/milanizedofficial/',
    text: 'Pinterest',
    icon: <FaPinterest />
  },
  {
    href: 'https://buymeacoffee.com/milanized',
    text: 'Buy me a Coffee',
    icon: <LuHeart />
  },
  {
    href: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/rss.xml`,
    text: 'RSS Feed',
    icon: <LuRss />
  }
];

export default function Footer() {
  return (
    <footer className="bg-black text-white relative after:block after:w-full after:h-[0.18rem] after:bg-gradient-to-r after:from-red-800 after:via-yellow-400 after:to-cyan-600 after:absolute after:bottom-full after:border-t after:border-black after:left-0">
      <div className="flex flex-col max-w-7xl mx-auto pt-10">
        <div className="flex justify-center gap-8 pb-10">
          {socialLinks.map(({ href, text, icon }) => {
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

        <div className="flex p-4 border-t justify-center border-white/30 text-sm gap-4">
          <span>© {new Date().getFullYear()} Milanized!</span>
          <Link className="hover:underline" href="/privacy-policy">
            privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
