import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/components/guides/meta";
import { GuideShell } from "@/components/guides/ui";

export const metadata: Metadata = {
  title: "외주 개발 가이드",
  description:
    "외주 개발 비용 산정, MVP 개발 기간과 프로세스, 개발 업체 선정 체크리스트 — 프로젝트를 준비하는 분들을 위한 실전 가이드 모음입니다.",
  alternates: { canonical: "https://redbridgedev.ai.kr/guides/" },
  openGraph: {
    title: "외주 개발 가이드 | RED BRIDGE DEV",
    description:
      "외주 개발 비용, MVP 개발 기간, 업체 선정 체크리스트 — 프로젝트를 준비하는 분들을 위한 실전 가이드.",
    url: "https://redbridgedev.ai.kr/guides/",
  },
};

export default function GuidesPage() {
  return (
    <GuideShell>
      <h1 className="text-3xl sm:text-4xl font-bold">외주 개발 가이드</h1>
      <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
        외주 개발을 준비하는 분들이 가장 많이 묻는 질문들에 대한 답을 정리했습니다.
        견적을 받기 전에 읽어두면 시간과 비용을 아낄 수 있습니다.
      </p>
      <div className="mt-10 space-y-5">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-red-600/60"
          >
            <h2 className="text-lg font-semibold">{g.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{g.oneLiner}</p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              {g.published} · 약 {g.readingMinutes}분
            </p>
          </Link>
        ))}
      </div>
    </GuideShell>
  );
}
