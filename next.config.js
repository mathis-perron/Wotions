/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['localhost', '127.0.0.1', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
