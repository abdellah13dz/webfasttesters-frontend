import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

import { SITE_URL } from "@/lib/site-url";
import { BRAND_ICONS, BRAND_OG_IMAGE_PATH } from "@/lib/brand";
import { SITE_KEYWORDS } from "@/lib/seo-keywords";
import { SEO_DEFAULT_TITLE, SEO_DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: "%s | Fast Testers",
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: "Fast Testers", url: SITE_URL }],
  creator: "Fast Testers",
  publisher: "Fast Testers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: BRAND_ICONS.favicon, sizes: "any" },
      { url: BRAND_ICONS.favicon16, sizes: "16x16", type: "image/png" },
      { url: BRAND_ICONS.favicon32, sizes: "32x32", type: "image/png" },
    ],
    apple: BRAND_ICONS.apple,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Fast Testers",
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
        width: 512,
        height: 512,
        alt: "Fast Testers - Professional App Testing Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}${BRAND_OG_IMAGE_PATH}`],
    creator: "@fasttesters",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "es": SITE_URL,
      "tr": SITE_URL,
      "ar": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  applicationName: 'Fast Testers',
  appleWebApp: {
    capable: true,
    title: 'Fast Testers',
    statusBarStyle: 'black-translucent',
  },
  category: 'developer-tools',
  classification: 'App Testing Service',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        other: {
          'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#252a38" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fast Testers" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
