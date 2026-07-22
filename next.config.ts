import type { NextConfig } from "next";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://webapi.fasttesters.com"
).replace(/\/$/, "");

/** Proxied to Render — excludes `/api/analytics` and `/api/meta/*` (handled on Vercel). */
const BACKEND_API_PREFIXES = [
  "articles",
  "reviews",
  "pricing",
  "contact",
  "feedback",
  "submissions",
  "newsletter",
  "pages",
  "faq",
  "changelog",
  "status",
  "site-settings",
  "translations",
  "admin",
] as const;

function backendApiRewrites() {
  const rules: { source: string; destination: string }[] = [];
  for (const prefix of BACKEND_API_PREFIXES) {
    rules.push({
      source: `/api/${prefix}`,
      destination: `${API_BASE}/api/${prefix}`,
    });
    rules.push({
      source: `/api/${prefix}/:path*`,
      destination: `${API_BASE}/api/${prefix}/:path*`,
    });
  }
  return rules;
}

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "recharts",
      "date-fns",
    ],
  },
  async rewrites() {
    return [
      ...backendApiRewrites(),
      {
        source: "/uploads/:path*",
        destination: `${API_BASE}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://app.fasttesters.com/login',
        permanent: false,
      },
      {
        source: '/signup',
        destination: 'https://app.fasttesters.com/',
        permanent: false,
      },
      {
        source: '/forgot-password',
        destination: 'https://app.fasttesters.com/login',
        permanent: false,
      },
      {
        source: '/how-to-find-beta-testers-for-android-apps',
        destination: '/blog/how-to-find-beta-testers-for-android-apps',
        permanent: true,
      },
      {
        source: '/google-play-closed-testing',
        destination: '/blog/google-play-closed-testing',
        permanent: true,
      },
      {
        source: '/app-rejected-google-play',
        destination: '/blog/app-rejected-google-play',
        permanent: true,
      },
      {
        source: '/multi-language-app-testing',
        destination: '/blog/multi-language-app-testing',
        permanent: true,
      },
      {
        source: '/guides/publish-app-google-play',
        destination: '/blog/publish-app-google-play',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
