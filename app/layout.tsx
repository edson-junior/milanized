import type { Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
// import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import parse from 'html-react-parser';
import ContentBanner from '@/components/ContentBanner';
// TODO : add google tag manager manually through consent banner

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
      <Script id="consent-mode-setup">
        {parse(`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          if (localStorage.getItem('consentMode') === null) {
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'personalization_storage': 'denied',
              'functionality_storage': 'denied',
              'security_storage': 'denied',
            });
          } else {
            gtag('consent', 'default', JSON.parse(localStorage.getItem('consentMode')));
          }

          if (localStorage.getItem('userId') != null) {
              window.dataLayer.push({
                'user_id': localStorage.getItem('userId')
              });
          }
        `)}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-analytics">
        {parse(`(function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', '${process.env.GTM_ID}');`)}
      </Script>
      {/* End Google Tag Manager */}

      <body className={openSans.className}>
        <Providers>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <div className="flex-grow">
              <div className="max-w-7xl mx-auto px-4 py-4">{children}</div>
            </div>
            <Footer />
            <ContentBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
}
