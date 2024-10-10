import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../../styles/globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: 'light'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${openSans.className} bg-black`}>
        <NextTopLoader color="red" showSpinner={false} />
        <Suspense>
          <Header />
        </Suspense>
        <div className="flex-grow bg-white pb-20">{children}</div>
        <Footer />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </html>
  );
}
