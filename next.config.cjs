/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  }
};

module.exports = nextConfig;