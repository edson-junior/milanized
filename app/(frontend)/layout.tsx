import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import { Catamaran } from 'next/font/google';
import '../../styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--open-sans' });
const catamaran = Catamaran({ subsets: ['latin'], variable: '--catamaran' });

export const viewport: Viewport = {
  themeColor: 'light'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" className="lg:scroll-smooth" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${catamaran.variable} font-sans bg-black`}
      >
        <NextTopLoader color="#b91c1c" showSpinner={false} />
        <Header />

        <div className="flex-grow bg-white pb-20">
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
        <Footer />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </html>
  );
}
