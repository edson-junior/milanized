/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      }
    ]
  },
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
    localeDetection: false
  }
};

export default nextConfig;
