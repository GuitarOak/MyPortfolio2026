import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the user's home directory
  // was causing Next.js to misdetect the monorepo root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
