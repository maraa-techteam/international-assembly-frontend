import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.DIRECTUS_CMS_URL || '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/id/**',
      },
    ],
  },
}

export default nextConfig
