"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PortfolioShell } from "@/components/portfolio/ui";
import type { ReactNode } from "react";

/* 가이드 페이지의 클라이언트 셸 — 포트폴리오와 동일한 헤더(로고·KO/EN·테마 토글)를 공유한다.
   가이드 본문은 한국어 전용 콘텐츠이므로, EN 모드에서는 안내 문구만 노출한다. */

const navLabels = {
  ko: [
    { href: "/guides/", label: "가이드" },
    { href: "/portfolio/", label: "포트폴리오" },
    { href: "/#contact", label: "문의" },
  ],
  en: [
    { href: "/guides/", label: "Guides" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/#contact", label: "Contact" },
  ],
};

export function GuideChrome({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <PortfolioShell navLinks={navLabels[language]}>
      <div className="max-w-3xl mx-auto">
        {language === "en" && (
          <p className="mb-8 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            These guides are currently available in Korean only.
          </p>
        )}
        {children}
      </div>
      <GuideFooterCta />
    </PortfolioShell>
  );
}

function GuideFooterCta() {
  const { language } = useLanguage();
  const t =
    language === "ko"
      ? {
          title: "프로젝트를 구상 중이신가요?",
          sub: "RED BRIDGE DEV가 견적 산정부터 출시까지 함께합니다.",
          cta: "무료 상담 문의하기",
        }
      : {
          title: "Planning a project?",
          sub: "RED BRIDGE DEV supports you from estimation to launch.",
          cta: "Get a Free Consultation",
        };
  return (
    <div className="max-w-3xl mx-auto mt-20 border-t border-gray-800/60 pt-10 pb-4 text-center">
      <p className="text-lg font-semibold text-[var(--foreground)]">{t.title}</p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{t.sub}</p>
      <Link
        href="/#contact"
        className="btn-primary mt-5 px-6 py-2.5 text-sm"
      >
        {t.cta}
      </Link>
    </div>
  );
}
