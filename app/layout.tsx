import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: 'system'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  locale: string;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={openSans.className}>
        <Providers>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <div className="flex-grow">
              <div className="max-w-7xl mx-auto px-4 py-4">{children}</div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
