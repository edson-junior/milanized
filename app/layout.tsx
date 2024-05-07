import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Milanized!',
  description:
    'Milanized is an English-language website for internationals in Italy. Visit us for news, culture, history, and hotspots.'
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
          <Header />
          <div>
            <div className="max-w-7xl mx-auto px-4 py-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
