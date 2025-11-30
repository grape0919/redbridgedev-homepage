import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "RED BRIDGE DEV | 웹/앱/솔루션 외주 개발",
  description:
    "RED BRIDGE DEV는 고객과 기술을 안전하고 튼튼하게 연결합니다. 대기업과 중견기업에서 쌓은 풍부한 경험을 바탕으로, 모든 프로젝트에 최고의 품질과 안정성을 보장합니다.",
  keywords: [
    "웹 개발",
    "앱 개발",
    "외주 개발",
    "솔루션 개발",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "RED BRIDGE DEV" }],
  openGraph: {
    title: "RED BRIDGE DEV | 웹/앱/솔루션 외주 개발",
    description:
      "고객과 기술을 안전하고 튼튼하게 연결합니다. 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
