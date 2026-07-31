import type { Metadata } from "next";
import EngineerPortfolio from "@/components/portfolio/EngineerPortfolio";

export const metadata: Metadata = {
  title: "김홍교 — 백엔드/풀스택 엔지니어 포트폴리오",
  description:
    "AI 서비스·결제·인증·검색·데이터 인프라를 설계부터 배포·운영까지 책임진 RED BRIDGE DEV 대표 엔지니어의 실서비스 프로젝트 기록입니다.",
  alternates: {
    canonical: "https://redbridgedev.ai.kr/portfolio/",
  },
  openGraph: {
    title: "김홍교 — 백엔드/풀스택 엔지니어 포트폴리오 | RED BRIDGE DEV",
    description:
      "AI 백엔드, 간편결제, 통합 본인인증, 검색엔진, DB 마이그레이션 — 실서비스 프로덕션 프로젝트 기록",
    url: "https://redbridgedev.ai.kr/portfolio/",
  },
};

export default function PortfolioPage() {
  return <EngineerPortfolio />;
}
