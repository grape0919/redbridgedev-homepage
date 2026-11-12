"use client";

import Link from "next/link";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { projects, ProjectMeta } from "./meta";
import {
  FadeIn,
  Chip,
  SimpleTable,
  Bullets,
  SubTitle,
  Prose,
  Strong,
  PortfolioShell,
  PortfolioFootnote,
} from "./ui";

const content = {
  ko: {
    eyebrow: "Case Studies",
    heroTitle: "RED BRIDGE DEV",
    heroSub: "프로젝트 사례",
    intro1kicker: "기획부터 배포·운영까지",
    commonStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Flutter",
      "Python · FastAPI",
      "PostgreSQL · MySQL",
      "Supabase",
      "Docker · GitHub Actions",
    ],
    productionTitle: "엔터프라이즈 기술 사례",
    productionDesc:
      "RED BRIDGE DEV의 핵심 엔지니어가 위치기반 매장 탐색·결제·리워드 플랫폼에서 설계·구축한 프로젝트입니다. 결제·인증·검색·AI처럼 난도가 높은 영역을 실서비스에서 다뤄 본 역량을 보여 드립니다.",
    redbridgeTitle: "고객 프로젝트 · 자체 서비스",
    redbridgeDesc: "고객의 의뢰로 만들었거나, 직접 기획해 지금 운영하고 있는 서비스입니다.",
    detail: "자세히",
    mapTitle: "엔터프라이즈 플랫폼에서 맡은 영역",
    layers: [
      { label: "사용자 접점", items: ["모바일 앱", "매장 POS", "파트너 웹"], note: "고객·매장·파트너가 쓰는 화면" },
      {
        label: "직접 설계·구축한 백엔드",
        items: ["AI 대화", "간편결제", "본인인증", "검색", "앱 메인 API"],
        note: "이 포트폴리오의 핵심 영역",
        accent: true,
      },
      {
        label: "데이터 · 인프라",
        items: ["데이터베이스", "검색 인덱스", "DB 변경 관리 플랫폼"],
        note: "안전한 데이터 운영의 기반",
      },
      { label: "외부 연동", items: ["AI(OpenAI)", "결제사(PG)", "본인인증사"], note: "검증된 외부 서비스와 연결" },
    ],
    skillsTitle: "기술 역량 요약",
    skillsHead: ["영역", "기술 · 경험"],
    skills: [
      ["백엔드", "Python 3.12 · FastAPI · SQLAlchemy 2.0 완전 비동기(aiomysql/asyncmy) · Pydantic · Alembic · 도메인 모듈/DDD/헥사고날 아키텍처"],
      ["AI 엔지니어링", "LLM 에이전트 설계(자체 DAG → ReAct 전환) · RAG(pgvector) · SSE 스트리밍 · Whisper STT/TTS · 프롬프트 설계 · LLM 응답 자동 평가(QA)"],
      ["결제 · 인증", "PG 연동(NICEPAY/NicePos/KCP) · 망취소·멱등성·정합성 · QR 간편결제 · 통합 본인인증(tx_id/S2S) · 보안 취약점 수정 · AES/Fernet/PBKDF2"],
      ["검색 · 데이터", "OpenSearch(nori 형태소·동의어·geo) · 무중단 재색인 · DB 마이그레이션 거버넌스 · 이벤트 스키마 레지스트리"],
      ["DevOps", "GitHub Actions(self-hosted runner) · Docker/Compose · 배포 검증 게이트 · Sentry/structlog 관측성 · Slack 운영 알림 · 모바일 스토어 CD 재구축"],
      ["프론트엔드", "Flutter(모바일·Windows 데스크톱) · Next.js/React · SSE 클라이언트 · three.js"],
    ],
    workTitle: "일하는 방식",
  },
  en: {
    eyebrow: "Case Studies",
    heroTitle: "RED BRIDGE DEV",
    heroSub: "Project Case Studies",
    intro1kicker: "from planning to deployment and operations",
    commonStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Flutter",
      "Python · FastAPI",
      "PostgreSQL · MySQL",
      "Supabase",
      "Docker · GitHub Actions",
    ],
    productionTitle: "Enterprise Engineering Cases",
    productionDesc:
      "Projects designed and built by RED BRIDGE DEV's lead engineer on a location-based store discovery, payments, and rewards platform — showing hands-on depth in payments, identity, search, and AI at production scale.",
    redbridgeTitle: "Client Projects · In-House Services",
    redbridgeDesc: "Built for clients, or designed by us and running in production today.",
    detail: "Details",
    mapTitle: "Scope on the Enterprise Platform",
    layers: [
      { label: "User Touchpoints", items: ["Mobile App", "Store POS", "Partner Web"], note: "Screens used by customers, stores, and partners" },
      {
        label: "Backend We Designed & Built",
        items: ["AI Chat", "QR Payments", "Identity Verification", "Search", "Main App API"],
        note: "The core of this portfolio",
        accent: true,
      },
      {
        label: "Data · Infrastructure",
        items: ["Databases", "Search Index", "DB Change Management"],
        note: "The foundation of safe data operations",
      },
      { label: "External Integrations", items: ["AI (OpenAI)", "Payment Gateways", "Identity Providers"], note: "Connected to proven external services" },
    ],
    skillsTitle: "Technical Skills",
    skillsHead: ["Area", "Skills · Experience"],
    skills: [
      ["Backend", "Python 3.12 · FastAPI · SQLAlchemy 2.0 fully async (aiomysql/asyncmy) · Pydantic · Alembic · domain modules / DDD / hexagonal architecture"],
      ["AI Engineering", "LLM agent design (custom DAG → ReAct migration) · RAG (pgvector) · SSE streaming · Whisper STT/TTS · prompt design · automated LLM answer QA"],
      ["Payments · Identity", "PG integrations (NICEPAY/NicePos/KCP) · net-cancel, idempotency, consistency · QR payments · unified identity verification (tx_id/S2S) · security fixes · AES/Fernet/PBKDF2"],
      ["Search · Data", "OpenSearch (Korean morphology, synonyms, geo) · zero-downtime reindexing · DB migration governance · event schema registry"],
      ["DevOps", "GitHub Actions (self-hosted runners) · Docker/Compose · deploy verification gates · Sentry/structlog observability · Slack ops alerts · mobile store CD rebuild"],
      ["Frontend", "Flutter (mobile · Windows desktop) · Next.js/React · SSE clients · three.js"],
    ],
    workTitle: "How We Work",
  },
};

export default function PortfolioIndex() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const dark = theme === "dark";
  const t = content[language];

  const copyOf = (p: ProjectMeta) => (language === "ko" ? p : p.en);

  const renderCards = (group: ProjectMeta["group"]) => (
    <div className="mt-8 grid gap-4">
      {projects
        .filter((p) => p.group === group)
        .map((p) => {
          const c = copyOf(p);
          return (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}/`}
              className={`group rounded-2xl border p-5 transition-all ${
                dark
                  ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-extrabold text-red-600/80">{p.num}</span>
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block mb-1.5 text-[11px] font-medium tracking-wide ${
                      dark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {c.industry}
                  </span>
                  <h3
                    className={`font-bold group-hover:text-red-500 transition-colors ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`mt-1 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    {c.oneLiner}
                  </p>
                  <p className="mt-2 text-xs font-medium text-red-500">{c.role}</p>
                </div>
                <span
                  className={`self-center inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-red-500 ${
                    dark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {t.detail}
                  <CaretRight size={14} weight="bold" />
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );

  return (
    <PortfolioShell>
      {/* 헤더 */}
      <FadeIn>
        <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
          {t.eyebrow}
        </span>
        <h1
          className={`mt-4 text-4xl sm:text-5xl font-bold leading-tight ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {t.heroTitle}
          <span
            className={`block mt-2 text-xl sm:text-2xl font-semibold ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t.heroSub}
          </span>
        </h1>
        <div className="mt-8 space-y-3">
          {language === "ko" ? (
            <>
              <Prose>
                홈페이지, 웹서비스, MVP, 업무 시스템까지 — RED BRIDGE DEV가{" "}
                <Strong>{t.intro1kicker}</Strong> 책임진 프로젝트 사례입니다.
              </Prose>
              <Prose>
                고객 프로젝트와 자체 서비스, 그리고 핵심 엔지니어가 기업 실서비스에서 수행한 기술
                사례를 함께 정리했습니다. 각 사례는 <Strong>문제 → 설계 → 결과</Strong> 순서로
                소개합니다.
              </Prose>
            </>
          ) : (
            <>
              <Prose>
                Websites, web services, MVPs, and business systems — projects RED BRIDGE DEV owned{" "}
                <Strong>{t.intro1kicker}</Strong>.
              </Prose>
              <Prose>
                Client projects and in-house services sit alongside engineering cases our lead
                engineer delivered on an enterprise platform. Each case follows{" "}
                <Strong>problem → design → results</Strong>.
              </Prose>
            </>
          )}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {t.commonStack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </FadeIn>

      {/* 고객 프로젝트 · 자체 서비스 */}
      <FadeIn className="mt-20">
        <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
          {t.redbridgeTitle}
        </h2>
        <p className={`mt-3 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
          {t.redbridgeDesc}
        </p>
        {renderCards("redbridge")}
      </FadeIn>

      {/* 엔터프라이즈 기술 사례 */}
      <FadeIn className="mt-20">
        <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
          {t.productionTitle}
        </h2>
        <p className={`mt-3 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
          {t.productionDesc}
        </p>
        {renderCards("production")}
      </FadeIn>

      {/* 담당 영역 지도 — 레이어 카드 */}
      <FadeIn className="mt-16">
        <SubTitle>{t.mapTitle}</SubTitle>
        <div
          className={`rounded-2xl border p-5 sm:p-6 space-y-3 ${
            dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          {t.layers.map((layer, i, arr) => (
            <div key={layer.label}>
              <div
                className={`rounded-lg border p-4 ${
                  layer.accent
                    ? dark
                      ? "border-red-900/60 bg-red-950/20"
                      : "border-red-200 bg-red-50"
                    : dark
                    ? "border-gray-800 bg-gray-900/40"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`text-sm font-bold ${
                      layer.accent ? "text-red-500" : dark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {layer.label}
                  </span>
                  <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    {layer.note}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        layer.accent
                          ? dark
                            ? "bg-gray-900 border-red-900/50 text-gray-200"
                            : "bg-white border-red-200 text-gray-700"
                          : dark
                          ? "bg-gray-900 border-gray-800 text-gray-400"
                          : "bg-white border-gray-200 text-gray-500"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex justify-center py-1 ${dark ? "text-gray-700" : "text-gray-300"}`}>
                  <CaretDown size={16} weight="bold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 기술 역량 요약 */}
      <FadeIn>
        <section className="mt-20">
          <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            {t.skillsTitle}
          </h2>
          <SimpleTable
            head={t.skillsHead}
            rows={t.skills.map(([area, desc]) => [<Strong key={area}>{area}</Strong>, desc])}
          />

          <SubTitle>{t.workTitle}</SubTitle>
          {language === "ko" ? (
            <Bullets
              items={[
                <>
                  <Strong>끝까지 오너십</Strong> — 설계 → 구현 → 테스트 → CI/CD → 배포 → 운영
                  알림·런북까지 한 사이클을 완결
                </>,
                <>
                  <Strong>정합성에 대한 집착</Strong> — 망취소 워커, 드리프트 감시, up-down-up 왕복
                  테스트처럼 &ldquo;실패하는 경로&rdquo;를 먼저 설계
                </>,
                <>
                  <Strong>무중단 전환의 반복 경험</Strong> — 에이전트 아키텍처 전환, 본인인증 V2, 검색
                  alias 스왑, 레거시 응답 호환 — 서비스를 세우지 않고 갈아끼우는 패턴에 익숙
                </>,
                <>
                  <Strong>관측 가능해야 운영 가능</Strong> — trace_id 분산 추적, 턴 단위 latency 로깅,
                  Sentry 규약화를 모든 프로젝트에 기본 적용
                </>,
              ]}
            />
          ) : (
            <Bullets
              items={[
                <>
                  <Strong>Ownership to the end</Strong> — closing the full loop: design →
                  implementation → tests → CI/CD → deployment → ops alerts and runbooks
                </>,
                <>
                  <Strong>Obsessed with consistency</Strong> — designing the failure paths first:
                  net-cancel workers, drift monitoring, up-down-up round-trip tests
                </>,
                <>
                  <Strong>Zero-downtime migrations, repeatedly</Strong> — agent architecture swaps,
                  identity V2, search alias swaps, legacy response compatibility — replacing parts
                  without stopping the service
                </>,
                <>
                  <Strong>Observable, therefore operable</Strong> — trace_id distributed tracing,
                  per-turn latency logging, and Sentry conventions baked into every project
                </>,
              ]}
            />
          )}
        </section>
      </FadeIn>

      <PortfolioFootnote />
    </PortfolioShell>
  );
}
