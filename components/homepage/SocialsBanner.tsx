import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Hero from '../Hero';
import { Button } from '../ui/button';
import Heading from '../ui/heading';

export default function SocialsBanner() {
  return (
    <div className="text-center bg-zinc-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] border border-t-zinc-400 border-b-zinc-400 flex align-middle flex-col justify-center h-80 lg:h-96">
      <Heading as="h2" className="text-2xl lg:text-5xl">
        Connect with us
      </Heading>
      <p>and stay up to date with our latest content</p>
      <div className="flex gap-4 max-w-7xl mx-auto px-4 py-4">
        <Button
          asChild
          className="bg-rose-600 hover:bg-rose-700 lg:text-lg lg:px-8 lg:py-6"
        >
          <Link href="https://www.instagram.com/milanize.me" target="_blank">
            <FaInstagram /> Instagram
          </Link>
        </Button>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 lg:text-lg lg:px-8 lg:py-6"
        >
          <Link
            href="https://www.facebook.com/MilanIzedOfficial"
            target="_blank"
          >
            <FaFacebookSquare /> Facebook
          </Link>
        </Button>
      </div>
    </div>
  );
}
