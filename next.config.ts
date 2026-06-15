import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./node_modules/bootstrap/scss', './node_modules'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "caribclimatestrorage.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "*.openai.azure.com",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "carib-climate-foundry-resource.cognitiveservices.azure.com",
      },
    ],
  },
};

export default nextConfig;
