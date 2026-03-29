import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@repo/design-tokens", "@repo/ui"],
};

export default nextConfig;
