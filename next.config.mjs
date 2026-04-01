const nextConfig = {
  // Include content/blog MDX files in Vercel serverless bundle.
  // Node File Trace cannot detect dynamically-read fs paths at build time.
  outputFileTracingIncludes: {
    '/blog': ['./content/blog/**/*.mdx'],
    '/blog/[slug]': ['./content/blog/**/*.mdx'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.basehub.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/api/files/**",
      },
      {
        protocol: "https",
        hostname: "*.trycloudflare.com",
        pathname: "/api/files/**",
      },
    ],
  },
}

export default nextConfig
