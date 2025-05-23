import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "ik.imagekit.io",
      },
      {
        hostname: "www.jed-event.com",
      },
      {
        hostname: "i.pravatar.cc",
      },
      {
        hostname: "api.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
