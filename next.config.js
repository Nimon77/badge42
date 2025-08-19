/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lodash-es"],
  },
  env: {
    base_url: "https://badge.nimon.fr",
    github_repo: "https://github.com/Nimon77/badge42",
  },
  output: "standalone",
  images: {
    domains: ["cdn.intra.42.fr"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
