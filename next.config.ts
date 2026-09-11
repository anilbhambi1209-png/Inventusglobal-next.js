import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.inventusglobal.com",
      },
      {
        protocol: "https",
        hostname: "inventusglobal.com",
      },
    ],
  },
};

export default nextConfig;
