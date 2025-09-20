// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Remove turbo root config to fix the error
// };

// module.exports = nextConfig;
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;