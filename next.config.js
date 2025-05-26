/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
