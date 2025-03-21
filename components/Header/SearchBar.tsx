'use client';

import { FaSearch } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { useRef, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchString = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        className="block text-white mr-2 lg:mr-4 hover:bg-transparent hover:text-white"
        aria-label="search"
        onClick={() => setOpen(!open)}
      >
        <FaSearch size={16} />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-28 lg:top-32">
          <DialogHeader className="text-left">
            <DialogTitle>Search</DialogTitle>
            <DialogDescription hidden>
              Please enter your search on the form bellow
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (
                searchString?.current?.value === '' ||
                searchString?.current?.value.trim() === ''
              ) {
                return;
              }

              router.push(`/search?query=${searchString.current?.value}`);
              setOpen(false);
            }}
            className="flex gap-2"
          >
            <Input
              ref={searchString}
              type="text"
              placeholder="What are you looking for?"
            />
            <Button type="submit" aria-label="search">
              <FaSearch />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
