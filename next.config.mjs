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
      }
    ];
  }
};

export default nextConfig;
