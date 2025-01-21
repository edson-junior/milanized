'use client';

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from '@/components/ui/button';
import { GoogleTagManager } from '@next/third-parties/google';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer';

const opts = {
  maxAge: 60 * 60 * 24 * 365 * 1000,
  expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)
};

export default function ConsentBanner() {
  const [open, setOpen] = useState(true);
  const [cookies, setCookie] = useCookies(['consentCookie']);

  const handleAcceptCookies = () => {
    setCookie('consentCookie', true, opts);
    setOpen(false);
  };

  const handleRejectCookies = () => {
    setCookie('consentCookie', false, opts);
    setOpen(false);
  };

  return (
    <>
      <Drawer open={open} modal={false} onOpenChange={setOpen}>
        <DrawerContent
          className="[&>button]:hidden [&>.rounded-full.bg-muted]:hidden lg:max-w-[368px] lg:mb-8 lg:ml-4 bg-transparent rounded-none"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <div className="lg:rounded-md border-t lg:border border-gray-300 bg-white shadow-md">
            <DrawerHeader className="text-left">
              <DrawerTitle hidden>We use cookies!</DrawerTitle>
              <DrawerDescription className="text-gray-600">
                This website uses cookies to enhance the user experience.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2 flex-col-reverse lg:flex-row gap-4 lg:flex-wrap">
              <Button
                className="lg:flex-auto"
                variant="outline"
                onClick={handleRejectCookies}
              >
                Deny
              </Button>
              <Button className="lg:flex-auto" onClick={handleAcceptCookies}>
                Accept
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      {cookies.consentCookie && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </>
  );
}
