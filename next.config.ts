import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.DIRECTUS_CMS_URL || '',
        pathname: '/assets/**',
      },
    ],
  },
}

export default nextConfig
