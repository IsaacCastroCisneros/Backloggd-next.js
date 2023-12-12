/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["https://images.igdb.com/"],
  },
};

module.exports = nextConfig
