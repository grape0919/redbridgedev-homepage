"use client";

import { useState, type ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PortfolioShell } from "@/components/portfolio/ui";
import ChannelTalk from "@/components/ui/ChannelTalk";
import { trackEvent } from "@/lib/analytics";

/* AX(/ax/) 페이지의 클라이언트 셸 — 서브페이지 공용 헤더·푸터를 쓰고 채널톡을 띄운다.
   본문은 한국어 전용이라 EN 모드에서는 안내 문구만 노출한다. */

const navLabels = {
  ko: [
    { href: "/ax/", label: "AI 업무 자동화" },
    { href: "/portfolio/", label: "포트폴리오" },
    { href: "/#contact", label: "문의" },
  ],
  en: [
    { href: "/ax/", label: "AI Automation" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/#contact", label: "Contact" },
  ],
};

export function AxChrome({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <PortfolioShell navLinks={navLabels[language]}>
      <ChannelTalk />
      {language === "en" && (
        <p className="mb-8 rounded-2xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          This page is currently available in Korean only.
        </p>
      )}
      {children}
    </PortfolioShell>
  );
}

/* 상담 초안 — AX 페이지에서 들어온 문의임을 머리말로 구분하고, 안내 항목을 미리 채운다.
   초기 상담에서는 민감한 자료를 받지 않는다. */
export const AX_INQUIRY_DRAFT = [
  "[AI 업무 자동화 문의]",
  "1. 반복하는 업무와 담당 부서: ",
  "2. 사용 중인 프로그램이나 데이터: ",
  "3. 현재 처리 방식과 대략적인 소요 시간: ",
  "4. 희망 일정과 예산: ",
  "",
  "※ 비밀번호, API 키, 실제 개인정보는 적지 말아 주세요.",
].join("\n");

const MAILTO = `mailto:contact@redbridgedev.ai.kr?subject=${encodeURIComponent(
  "[AI 업무 자동화 문의]"
)}&body=${encodeURIComponent(AX_INQUIRY_DRAFT)}`;

/** 채널톡을 상담 초안과 함께 연다. 채널톡은 idle 시점에 로드되므로 잠시 기다렸다가, 끝내 없으면 메일로 보낸다. */
export function AxConsultButton({
  label,
  location,
  className = "btn-primary px-7 py-3.5",
}: {
  label: string;
  location: string;
  className?: string;
}) {
  const [waiting, setWaiting] = useState(false);

  const open = () => {
    trackEvent("cta_click", { location, label: "ax_consult" });
    let tries = 0;
    const attempt = () => {
      if (window.ChannelIO) {
        window.ChannelIO("openChat", undefined, AX_INQUIRY_DRAFT);
        trackEvent("chat_open", { location });
        setWaiting(false);
      } else if (tries++ < 25) {
        setWaiting(true);
        window.setTimeout(attempt, 200);
      } else {
        setWaiting(false);
        window.location.assign(MAILTO);
      }
    };
    attempt();
  };

  return (
    <button type="button" onClick={open} disabled={waiting} className={className}>
      {label}
      <span aria-hidden>→</span>
    </button>
  );
}

export function AxMailLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={MAILTO}
      onClick={() => trackEvent("generate_lead", { method: "email", project_type: "ax" })}
      className="font-medium text-red-500 underline underline-offset-2 hover:text-red-400 transition-colors"
    >
      {children}
    </a>
  );
}
