/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "172.20.110.55",
      },
      {
        protocol: "http",
        hostname: "172.20.110.45",
      },
      {
        protocol: "http",
        hostname: "172.20.110.60",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/login",
        destination: "http://172.20.110.45:3001/login",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
