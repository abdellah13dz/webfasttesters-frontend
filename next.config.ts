import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
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
