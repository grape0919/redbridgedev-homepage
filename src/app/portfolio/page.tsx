import type { Metadata } from "next";
import PortfolioIndex from "@/components/portfolio/PortfolioIndex";
import { projects } from "@/components/portfolio/meta";

export const metadata: Metadata = {
  title: "RED BRIDGE 엔지니어링 포트폴리오",
  description:
    "AI 서비스·결제·인증·검색·데이터 인프라를 설계부터 배포·운영까지 책임진 RED BRIDGE DEV의 실서비스 프로젝트 기록입니다.",
  alternates: {
    canonical: "https://redbridgedev.ai.kr/portfolio/",
  },
  openGraph: {
    title: "RED BRIDGE 엔지니어링 포트폴리오 | RED BRIDGE DEV",
    description:
      "AI 백엔드, 간편결제, 통합 본인인증, 검색엔진, DB 마이그레이션 — 실서비스 프로덕션 프로젝트 기록",
    url: "https://redbridgedev.ai.kr/portfolio/",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://redbridgedev.ai.kr/" },
      { "@type": "ListItem", position: 2, name: "포트폴리오", item: "https://redbridgedev.ai.kr/portfolio/" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RED BRIDGE 엔지니어링 포트폴리오",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.oneLiner,
      url: `https://redbridgedev.ai.kr/portfolio/${p.slug}/`,
    })),
  },
];

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioIndex />
    </>
  );
}
