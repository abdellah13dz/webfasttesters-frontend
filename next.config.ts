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

/** Security + caching headers for SEO trust signals and CWV. */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "webapi.fasttesters.com" },
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/logo/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
        source: "/login",
        destination: "https://app.fasttesters.com/login",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "https://app.fasttesters.com/",
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: "https://app.fasttesters.com/login",
        permanent: false,
      },
      {
        source: "/how-to-find-beta-testers-for-android-apps",
        destination: "/blog/how-to-find-beta-testers-for-android-apps",
        permanent: true,
      },
      {
        source: "/google-play-closed-testing",
        destination: "/blog/google-play-closed-testing",
        permanent: true,
      },
      {
        source: "/closed-testing",
        destination: "/blog/google-play-closed-testing",
        permanent: true,
      },
      {
        source: "/app-rejected-google-play",
        destination: "/blog/app-rejected-google-play",
        permanent: true,
      },
      {
        source: "/multi-language-app-testing",
        destination: "/blog/multi-language-app-testing",
        permanent: true,
      },
      {
        source: "/guides/publish-app-google-play",
        destination: "/blog/publish-app-google-play",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
