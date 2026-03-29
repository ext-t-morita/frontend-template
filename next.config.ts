import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/design-tokens", "@repo/ui"],
};

export default nextConfig;
