import type { NextConfig } from "next";

const isMobileExport = process.env.NEXT_PUBLIC_IS_MOBILE_APP === "true";

const nextConfig: NextConfig = {
  ...(isMobileExport
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
