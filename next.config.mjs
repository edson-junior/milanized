import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
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
      },
      {
        protocol: 'https',
        hostname: 'widgets.tiqets.com',
        port: ''
      }
    ]
  },
  async redirects() {
    return [
      {
        source:
          '/blog/essential-tips-for-moving-to-italy-things-to-know-before-moving',
        destination: '/blog/how-to-move-to-italy',
        permanent: true
      },
      {
        source: '/blog/the-pros-and-cons-of-having-a-car-in-milan',
        destination: '/blog/driving-in-milan',
        permanent: true
      },
      {
        source: '/blog/discovering-italy-10-unforgettable-day-trips-from-milan',
        destination: '/blog/day-trips-from-milan',
        permanent: true
      },
      {
        source: '/author/milanized-crew',
        destination: '/author/milanized',
        permanent: true
      },
      {
        source:
          '/blog/escape-the-city-10-incredible-city-escape-destinations-to-explore-from-milan',
        destination: '/blog/best-trips-from-milan',
        permanent: true
      }
    ];
  }
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'milanized',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});
