/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    turbo: {
      root: path.resolve(__dirname),
    },
  },
};
module.exports = nextConfig;
