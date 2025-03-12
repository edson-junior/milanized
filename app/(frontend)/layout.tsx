import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../../styles/globals.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';
// import ConsentBanner from '@/components/ConsentBanner';
import { cookies } from 'next/headers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: 'light'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies();
  const consentCookie = cookieStore.get('consentCookie');

  return (
    <html lang="en-GB" className="lg:scroll-smooth" suppressHydrationWarning>
      <body className={`${openSans.className} bg-black`}>
        <NextTopLoader color="#b91c1c" showSpinner={false} />
        <Header />

        <div className="flex-grow bg-white pb-20">
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
        <Footer />
        {/* {process.env.NODE_ENV === 'production' && !consentCookie?.name && (
          <ConsentBanner />
        )} */}
      </body>
      {process.env.NODE_ENV === 'production' &&
        consentCookie?.value === 'true' && (
          <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
        )}
    </html>
  );
}
