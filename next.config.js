/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["play-lh.googleusercontent.com"],
  },
};

module.exports = nextConfig;
