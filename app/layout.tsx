import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
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
