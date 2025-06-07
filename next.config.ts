import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cmdxd98sb0x3yprd.mangadex.network",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
