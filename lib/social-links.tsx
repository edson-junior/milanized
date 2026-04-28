import { FaFacebookSquare, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
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
