import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  // Убрали output: 'export', теперь это полноценное приложение
  images: {
    formats: ["image/avif", "image/webp"],
    // Если будешь использовать картинки с внешних сайтов, их нужно добавить сюда:
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },
};

export default nextConfig;
