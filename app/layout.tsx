import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import { GoogleTagManager } from '@next/third-parties/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: 'light'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${openSans.className} bg-black`}>
        <Providers>
          <Header />
          <div className="flex-grow bg-white pb-20">{children}</div>
          <Footer />
        </Providers>
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </html>
  );
}
