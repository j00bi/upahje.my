/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
  // Supabase middleware configuration
  async headers() {
    return [
      {
        source: '/auth/callback',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
