'use client';

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { GoogleTagManager } from '@next/third-parties/google';
import { useMediaQuery } from '@/hooks/use-media-query';
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
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleAcceptCookies = () => {
    setCookie('consentCookie', true, opts);
    setOpen(false);
  };

  const handleRejectCookies = () => {
    setCookie('consentCookie', false, opts);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="[&>button]:hidden"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader className="text-left">
              <DialogTitle>We use cookies!</DialogTitle>
              <DialogDescription>
                This website uses cookies to enhance the user experience.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2 gap-4">
              <Button variant="outline" onClick={handleRejectCookies}>
                Deny
              </Button>
              <Button onClick={handleAcceptCookies}>Accept Cookies</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {cookies.consentCookie && (
          <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
        )}
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          className="[&>button]:hidden [&>.rounded-full.bg-muted]:hidden rounded-none"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <DrawerHeader className="text-left">
            <DrawerTitle>We use cookies!</DrawerTitle>
            <DrawerDescription>
              This website uses cookies to enhance the user experience.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2 gap-4">
            <Button variant="outline" onClick={handleRejectCookies}>
              Deny
            </Button>
            <Button onClick={handleAcceptCookies}>Accept Cookies</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {cookies.consentCookie && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </>
  );
}
