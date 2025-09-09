/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/app",
        destination: "https://chattest.ajuda-digital.com",
        permanent: true,
      },
      {
        source: "/chat",
        destination: "https://chattest.ajuda-digital.com",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
