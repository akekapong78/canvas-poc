import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/canvas-poc',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/canvas-poc',
  },
};

export default nextConfig;
