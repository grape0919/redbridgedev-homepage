import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://redbridge.dev"),
  title: {
    default: "RED BRIDGE DEV | 웹/앱/솔루션 외주 개발",
    template: "%s | RED BRIDGE DEV",
  },
  description:
    "RED BRIDGE DEV는 고객과 기술을 안전하고 튼튼하게 연결합니다. 대기업과 중견기업에서 쌓은 풍부한 경험을 바탕으로, 웹 개발, 앱 개발, 솔루션 개발 프로젝트에 최고의 품질과 안정성을 보장합니다.",
  keywords: [
    "웹 개발",
    "앱 개발",
    "외주 개발",
    "솔루션 개발",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Flutter",
    "Node.js",
    "웹 에이전시",
    "앱 제작",
    "웹사이트 제작",
    "스타트업 개발",
    "MVP 개발",
    "web development",
    "app development",
    "outsourcing",
  ],
  authors: [{ name: "RED BRIDGE DEV", url: "https://redbridge.dev" }],
  creator: "RED BRIDGE DEV",
  publisher: "RED BRIDGE DEV",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "RED BRIDGE DEV | 웹/앱/솔루션 외주 개발",
    description:
      "고객과 기술을 안전하고 튼튼하게 연결합니다. 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    url: "https://redbridge.dev",
    siteName: "RED BRIDGE DEV",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RED BRIDGE DEV - 웹/앱/솔루션 외주 개발",
      },
    ],
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RED BRIDGE DEV | 웹/앱/솔루션 외주 개발",
    description:
      "고객과 기술을 안전하고 튼튼하게 연결합니다. 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    images: ["/og-image.png"],
    creator: "@redbridgedev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
    // yandex: "yandex-verification-code",
    // yahoo: "yahoo-verification-code",
  },
  alternates: {
    canonical: "https://redbridge.dev",
    languages: {
      "ko-KR": "https://redbridge.dev",
      "en-US": "https://redbridge.dev/en",
    },
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RED BRIDGE DEV",
  alternateName: "레드브릿지데브",
  url: "https://redbridge.dev",
  logo: "https://redbridge.dev/logo_red.png",
  description:
    "고객과 기술을 안전하고 튼튼하게 연결하는 웹/앱/솔루션 개발 전문 회사",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-2-1234-5678",
    contactType: "customer service",
    email: "contact@redbridge.dev",
    availableLanguage: ["Korean", "English"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seoul",
    addressRegion: "Gangnam",
    addressCountry: "KR",
  },
  sameAs: [
    "https://github.com/redbridgedev",
    "https://linkedin.com/company/redbridgedev",
  ],
  service: [
    {
      "@type": "Service",
      name: "웹 개발",
      description: "React, Next.js 기반의 반응형 웹 애플리케이션 개발",
    },
    {
      "@type": "Service",
      name: "앱 개발",
      description: "React Native, Flutter 기반의 크로스 플랫폼 모바일 앱 개발",
    },
    {
      "@type": "Service",
      name: "솔루션 개발",
      description: "기업 맞춤형 소프트웨어 솔루션 및 자동화 시스템 개발",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased noise-overlay`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
