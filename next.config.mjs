/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['react-icons']
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
  }
};

export default nextConfig;
