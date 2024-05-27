import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const openSans = Open_Sans({ subsets: ['latin'] });

// TODO: make the following metadata variables dynamic

const title = 'Milanized!';
const description =
  'Milanized is an English-language website for internationals in Italy. Visit us for news, culture, history, and hotspots.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}`
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="min-h-screen flex flex-col justify-between">
          <Header />
          <div className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 py-4">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
