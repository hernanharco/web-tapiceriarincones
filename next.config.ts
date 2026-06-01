import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Type safety y lint en build son obligatorios en un proyecto 10/10
  // typescript: { ignoreBuildErrors: true },  // DESACTIVADO
  // eslint: { ignoreDuringBuilds: true },     // DESACTIVADO

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.INTERNAL_BACKEND_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;