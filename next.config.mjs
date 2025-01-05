/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3001",
      },
      {
        hostname: "localhost",
        port: "5001",
      },
    ],
  },
};

export default nextConfig;
