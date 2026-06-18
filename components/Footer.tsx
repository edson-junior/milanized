import Link from 'next/link';
import { socialLinks } from '@/lib/social-links';
import { Button } from './ui/button';
import Heading from './ui/heading';

export default function Footer() {
  return (
    <footer className="bg-jet-black text-white relative after:block after:w-full after:h-[0.18rem] after:bg-gradient-to-r after:from-red-800 after:via-yellow-400 after:to-cyan-600 after:absolute after:bottom-full after:border-t after:border-black after:left-0">
      <div className="flex flex-col max-w-7xl mx-auto pt-10">
        <div className="text-center px-4 mb-8 mx-auto">
          <Heading as="h2" className="text-lg/7 mb-2">
            Sign up to the newsletter
          </Heading>
          <p className="text-sm mb-8">
            Stay up-to-date with our latest travel blogs, tips, itineraries and
            much more!
          </p>
          <Button asChild variant="secondary" className="w-52">
            <a href="https://milanized.substack.com/subscribe" target="_blank">
              Subscribe
            </a>
          </Button>
        </div>

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
            Privacy Policy
          </Link>
          <Link className="hover:underline" href="/disclaimer">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
