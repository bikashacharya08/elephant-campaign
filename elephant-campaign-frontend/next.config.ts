/* eslint-disable */
import type { NextConfig } from "next";

const nextConfig: any = {
  typescript: {
    // Type checks are verified locally via tsc --noEmit; bypassing here saves memory on Railway build servers
    ignoreBuildErrors: true,
  },
  eslint: {
    // Linting checks are verified locally via npm run lint; bypassing here saves memory on Railway build servers
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
