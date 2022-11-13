/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
