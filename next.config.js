/** @type {import('next').NextConfig} */
const nextConfig = {
  target: "serverless",
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
