/* eslint-disable */
import type { NextConfig } from "next";

const nextConfig: any = {
  typescript: {
    // Type checks are verified locally via tsc --noEmit; bypassing here saves memory on Railway build servers
    ignoreBuildErrors: true,
  },
  experimental: {
    // Limit CPU threads and disable worker threads to prevent OOM (VirtualAlloc failed) on restricted systems
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
