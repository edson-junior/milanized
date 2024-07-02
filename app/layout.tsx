import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import { GoogleTagManager } from '@next/third-parties/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: 'system'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${openSans.className} bg-black`}>
        <Providers>
          <Header />
          <div className="flex-grow bg-white pb-20">{children}</div>
          <Footer />
          {/* ${process.env.NEXT_PUBLIC_GTM_ID} */}
          {/* <ConsentBanner /> */}
          <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
        </Providers>
      </body>
    </html>
  );
}
