import type { Viewport } from 'next';
import { Catamaran, Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';
import Footer from './../components/Footer';
import Header from './../components/Header/Header';

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
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: 0 0% 100%;
                --foreground: 222.2 84% 4.9%;
                --border: 214.3 31.8% 91.4%;
                --input: 214.3 31.8% 91.4%;
                --ring: 222.2 84% 4.9%;
                --radius: 0.5rem;
              }
              html {
                line-height: 1.5;
                -webkit-text-size-adjust: 100%;
              }
              @media (min-width: 1024px) {
                html { scroll-behavior: smooth; }
              }
              *, *::before, *::after { box-sizing: border-box; margin: 0; }
              body {
                background-color: #F8F8F7;
                color: hsl(222.2 84% 4.9%);
                font-family: ui-sans-serif, system-ui, sans-serif;
                -webkit-font-smoothing: antialiased;
              }
              /* Sticky header */
              header {
                background-color: #161618;
                position: sticky;
                top: 0;
                width: 100%;
                z-index: 10;
              }
              /* Header inner container */
              header > div {
                display: flex;
                align-items: center;
                position: relative;
                height: 3.5rem;
                max-width: 80rem;
                margin-left: auto;
                margin-right: auto;
                padding-left: 1rem;
                padding-right: 1rem;
              }
              @media (min-width: 1024px) {
                header > div { height: 4rem; }
              }
              /* Logo */
              header > div > a:first-child {
                color: #fff;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 1.125rem;
                line-height: 1.75rem;
                text-decoration: none;
              }
              @media (min-width: 1024px) {
                header > div > a:first-child { font-size: 1.5rem; line-height: 2rem; }
              }
              /* Hero section (HomeHero only — renders <section> as direct sibling of <header>) */
              header + section > div {
                max-width: 80rem;
                margin-left: auto;
                margin-right: auto;
                padding: 4rem 1rem;
              }
              @media (min-width: 1024px) {
                header + section > div { padding-top: 8rem; padding-bottom: 8rem; }
              }
              /* H1 */
              h1 {
                font-weight: 900;
                font-size: 1.875rem;
                line-height: 1.2;
                display: inline-block;
                margin-bottom: 1.5rem;
              }
              @media (min-width: 1024px) {
                h1 { font-size: 3rem; margin-bottom: 1rem; }
              }
      `
          }}
        />
      </head>
      <body
        className={`${openSans.variable} ${catamaran.variable} font-sans bg-soft-white`}
      >
        <NextTopLoader color="#b91c1c" showSpinner={false} />
        <Header />

        {children}
        <Footer />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />
      )}
    </html>
  );
}
