'use client';

import { useRouter } from 'nextjs-toploader/app';
import { useRef, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Input } from '../ui/input';

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
        <LuSearch size={16} />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-28 lg:top-32">
          <DialogHeader className="text-left">
            <DialogTitle>Search</DialogTitle>
            <DialogDescription className="sr-only">
              Please enter your search on the form below
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
              aria-label="Search query"
            />
            <Button type="submit" aria-label="search">
              <LuSearch />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
