import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PerfWatchdog from "@/components/ui/PerfWatchdog";
import ChannelTalk from "@/components/ui/ChannelTalk";
import { LanguageProvider } from "@/context/LanguageContext";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

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
  metadataBase: new URL("https://redbridgedev.ai.kr"),
  title: {
    default: "RED BRIDGE DEV | 홈페이지·웹서비스·MVP 개발 에이전시",
    template: "%s | RED BRIDGE DEV",
  },
  description:
    "RED BRIDGE DEV는 홈페이지·웹서비스·MVP·업무 시스템을 기획부터 배포·운영까지 한 팀이 책임지는 개발 에이전시입니다. 결제·인증·AI 연동까지, 지금 운영 중인 서비스로 증명합니다.",
  keywords: [
    "웹 개발",
    "앱 개발",
    "외주 개발",
    "솔루션 개발",
    "개발 에이전시",
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
    "FastAPI",
    "웹 에이전시",
    "앱 제작",
    "웹사이트 제작",
    "스타트업 개발",
    "MVP 개발",
    "web development",
    "app development",
    "outsourcing",
    "레드브릿지",
    "개발 외주",
    "홈페이지 제작",
    "AI 업무 자동화",
    "업무 자동화",
    "MCP 연동",
  ],
  authors: [{ name: "RED BRIDGE DEV", url: "https://redbridgedev.ai.kr" }],
  creator: "RED BRIDGE DEV",
  publisher: "마리파더 (Mari Father)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "RED BRIDGE DEV | 홈페이지·웹서비스·MVP 개발 에이전시",
    description:
      "기획부터 배포·운영까지 한 팀이 책임지는 개발 에이전시. 운영 중인 서비스로 증명합니다.",
    url: "https://redbridgedev.ai.kr",
    siteName: "RED BRIDGE DEV",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RED BRIDGE DEV - 홈페이지·웹서비스·MVP 개발 에이전시",
      },
    ],
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RED BRIDGE DEV | 홈페이지·웹서비스·MVP 개발 에이전시",
    description:
      "기획부터 배포·운영까지 한 팀이 책임지는 개발 에이전시. 운영 중인 서비스로 증명합니다.",
    images: ["/og-image.png"],
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
    // Google Search Console: DNS TXT record 방식으로 인증 완료 (meta 태그 불필요)
    other: {
      "naver-site-verification": "729940fb4ad85f837a18692f85177c4588519e37",
    },
  },
  alternates: {
    canonical: "https://redbridgedev.ai.kr",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RED BRIDGE DEV",
  alternateName: "레드브릿지데브",
  legalName: "마리파더 (Mari Father)",
  url: "https://redbridgedev.ai.kr",
  logo: "https://redbridgedev.ai.kr/logo_red.png",
  description:
    "홈페이지·웹서비스·MVP·업무 시스템을 기획부터 운영까지 책임지는 개발 에이전시",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-2896-5049",
    contactType: "customer service",
    email: "contact@redbridgedev.ai.kr",
    availableLanguage: ["Korean", "English"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seoul",
    addressRegion: "Jung-gu",
    addressCountry: "KR",
  },
  sameAs: ["https://github.com/grape0919"],
  service: [
    {
      "@type": "Service",
      name: "홈페이지·브랜드 사이트 제작",
      description: "운영자가 직접 관리하는 CMS와 SEO를 갖춘 브랜드 사이트 제작",
    },
    {
      "@type": "Service",
      name: "웹서비스·SaaS·MVP 개발",
      description: "Next.js·FastAPI·Flutter 기반 웹서비스와 MVP를 기획부터 출시·운영까지",
    },
    {
      "@type": "Service",
      name: "업무 시스템·결제·인증 연동",
      description: "예약·대기열 같은 업무 시스템, 결제·본인인증, 검색 등 서버 기능 개발과 연동",
    },
    {
      "@type": "Service",
      name: "AI 업무 자동화·시스템 연동",
      description: "사내 DB·GA4와 AI 연결, 반복 업무 자동화, 기존 서비스 AI 기능 연동",
      url: "https://redbridgedev.ai.kr/ax/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* 첫 페인트 전에 저장된 테마/언어를 적용 (FOUC 방지) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}var l=localStorage.getItem('language');if(l==='en'||(!l&&navigator.language&&!navigator.language.toLowerCase().startsWith('ko'))){document.documentElement.lang='en';}}catch(e){}})();",
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Hero LCP 후보 사전 로드 */}
        <link
          rel="preload"
          as="image"
          href="/hero-poster.jpg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/logo_white.png"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="antialiased noise-overlay"
      >
        {/* SVG filters for Liquid Glass refraction (iOS 26 style) */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <defs>
            {/* Soft lens-like refraction — smooth displacement, not noise */}
            <filter
              id="glass-distort"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.006 0.008"
                numOctaves="1"
                seed="3"
                result="turbulence"
              />
              <feGaussianBlur
                in="turbulence"
                stdDeviation="2"
                result="softMap"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale="110"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="0.5" />
            </filter>

            {/* Stronger refraction for large glass surfaces (Hero stats, FAQ) */}
            <filter
              id="glass-distort-strong"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.004 0.006"
                numOctaves="1"
                seed="11"
                result="turbulence"
              />
              <feGaussianBlur
                in="turbulence"
                stdDeviation="3"
                result="softMap"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale="160"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        <PerfWatchdog />
        {/* 채널톡은 사이트 전체에서 한 번만 띄운다 (페이지별로 띄우면 화면 전환 시 종료된 채 다시 켜지지 않는다) */}
        <ChannelTalk />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        {/* AdSense - 지연 로드로 TBT 감소 */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1754856977895556"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
