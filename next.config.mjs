/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: true }];
  },
  // Supabase middleware configuration
  async headers() {
    // The marketplace routes are kept but retired from the content site: they
    // are unlinked and must not be indexed or followed. `robots.txt` disallows
    // them too; the header is what actually reaches engines that ignore robots.
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    const retired = [
      '/jobs/:path*',
      '/talent/:path*',
      '/categories/:path*',
      '/portfolio/:path*',
      '/pay/:path*',
      '/payment/:path*',
      '/ai/:path*',
      '/onboarding/:path*',
      '/dashboard/:path*',
      '/auth/:path*',
    ].map((source) => ({ source, headers: noindex }));
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
      ...retired,
    ];
  },
};

export default nextConfig;
