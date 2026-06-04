import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 🖼️ Gestión de Imágenes (Fidelidad Visual) */
  images: {
    dangerouslyAllowSVG: true, // Útil para logos de tapicería
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      }
    ],
  },

  /* 🔀 Regla de Oro: Proxy Dinámico para comunicación con Render/Neon */
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development';
    
    // Apuntamos al backend central que gestiona la lógica de negocio en Neon
    const backendUrl = isDev 
      ? 'http://localhost:4000/api' 
      : 'https://authcenterharco-1.onrender.com/api';

    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;