import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Hero from '../Hero';
import { Button } from '../ui/button';
import Heading from '../ui/heading';

export default function SocialsBanner() {
  return (
    <Hero
      mainTitle={
        <Heading as="h2" className="text-2xl lg:text-5xl">
          Connect with us
        </Heading>
      }
      subtitle="and stay up to date with our latest content"
      className="[&>div]:items-center h-80 lg:h-96 lg:bg-bottom"
      bgImage="/images/gae-aulenti-landscape.jpg"
      placeholder="data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAgAAAABwIAxAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggXAQAAFAuAJ0BKggCxQA+7XCwVCmmKiMh0LuBQB2JZ27eUy9K/riv/anQUy+dxSv/WQ+n/7n/IAZxB/tv3jsW4of7b9z3/DfmJ+YnxvOlgDsPwQXBM7ucrc0D5CAamkuOVhArVW0Z4csR20DLvomv0XxRPFFbRyfYmireyybIIDoPzrHTg6bdIoc/6gZ7l9ltnVNQtIjBRsSTXptnovpJOv4Uv8f/wfvwWmJJbI0XNfZAy+KJ4onhljoKp2dLk3iucr7JtRXwiOwkr4oniieKK1x2GF+eitfZMm8VNf5qOxL/5bcna5VE/qH1/rWbaQAAsML83v84aptXDRjExLaKv5DFUyzK/S+z9L7P0vtXetXw1YiWzEHW254rGwL1dfaQkkJG3DUbcFBeflL6zNz6X2fpfZggBhSspWJX6RpIwqR/Mj3h9Sh3Mp2krEflL7Oby7bh0gQOZu4DHvdJ9Tkbq3to0wE8RXZrwKQjaieKL/e7c+i4iKDOCuPT9M25FQAA/uFLf8UPsI+a0x/rjnDiJr0pdati0UqRa13R4KxJMmKXPXMFAx9/vfB4KfPfeUU+u2j3TWgEXvayVzAe/uZX3kCKqCot26gBktMrX630xUhiJgOWhNk8igJQTzJ81Jnu432UnyZOYdwCDd6m5AzFzDEB0Kbkx3gClMCmVlhghTelW3FZwoOwpmhLyJIVTcEq1wBuMI027p3CxfkCbBGMS5vFwtVojN35aGcwYRNbBL5YBRsmg41Kv4sqw2SodiQRl+ZhlwDBWsVYIdselXnRa6LUC6b4hiXOWo5g7fYcjz9NlILt7yCANa3NHJNoZ8khJqR7f6ps+MkzQ9nMvxAHa297vWOlXF+TBxT7iYBOlRX0l/z21pEk3KTm2opbpg7TXqdrw3C3/p6a4fmgNKFPyjxCTbv0pvOzD0UInCuP6/mwygA3OcE+m+nYpo4eE25x2fc5NTpryOIehSMiOlo1VS2VqgV22wrL581iIg6LE10Uj0/Ks66fJhwhOk+kvLB+IQWg5dIz4ZldoYJ0mNVdHkENH3k8RXHIWVlIoEs8FLvNKhlbNETgxzbKKtIURujcqcVZmzz6t6Xvvj31nqct8y32qD+g41zTpwcawicdH0qskjxJBDCBxS6RAfb+NfURnfZY0jpusYnWkz1bpzCIalkMem4MR1TWAe5TpW9sskU0qmPqNtDHegZI1fXGnGPUabB0MFLYu3uDlSDM/CSFLwIyC1B/7agJteWA4bVWKWTYdhklLGehI1HJCSVqTJUnCbOcV7h8seBbeOqE2o2L7perFO6kfT+HkzaXalpnurpYvam2TX/QIbhocY9sqDavV19RIQ0mjJu6sU2PI9hFbcll8qQNr4mOvAm8Y//YuaAvK15SsM+6GChw28FrPbgvFD7LFLLmAs3hMGDwo7z3gr+PZvyYHIRFbxC+BuiiQLvVQit0Mk18oOjQ7kQ4bVKPEysISYVcexLRdAdM02QAAA=="
    >
      <div className="flex gap-4">
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
    </Hero>
  );
}
