
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
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
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // This is to suppress the 'Can't resolve '...' warnings for optional packages in otel.
        config.resolve.alias = {
            ...config.resolve.alias,
            '@opentelemetry/exporter-jaeger': false,
            '@opentelemetry/exporter-zipkin': false,
        };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/Logo-BP.png',
      },
    ];
  },
};

export default nextConfig;

    
