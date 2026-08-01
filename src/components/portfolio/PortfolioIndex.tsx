"use client";

import Link from "next/link";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "./meta";
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

const commonStack = [
  "Python 3.12",
  "FastAPI",
  "SQLAlchemy 2.0 (완전 비동기)",
  "MySQL",
  "OpenSearch",
  "Docker",
  "GitHub Actions (self-hosted)",
  "Sentry / structlog",
];

export default function PortfolioIndex() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <PortfolioShell>
      {/* 헤더 */}
      <FadeIn>
        <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
          Engineering Portfolio
        </span>
        <h1
          className={`mt-4 text-4xl sm:text-5xl font-bold leading-tight ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          RED BRIDGE
          <span
            className={`block mt-2 text-xl sm:text-2xl font-semibold ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            백엔드 / 풀스택 엔지니어링 기록
          </span>
        </h1>
        <div className="mt-8 space-y-3">
          <Prose>
            AI 서비스·결제·인증·검색·데이터 인프라를 <Strong>설계부터 배포·운영까지</Strong> 책임진
            프로젝트 기록입니다.
          </Prose>
          <Prose>
            기업 실서비스에서 담당한 프로젝트와, RED BRIDGE가 직접 기획해 운영하는 자체 서비스를
            함께 정리했습니다. 비공개 저장소 프로젝트는 코드 대신{" "}
            <Strong>문제 → 설계 → 결과</Strong> 중심으로 소개합니다.
          </Prose>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {commonStack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </FadeIn>

      {/* 기업 실서비스 프로젝트 */}
      <FadeIn className="mt-20">
        <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
          기업 실서비스 프로젝트
        </h2>
        <p className={`mt-3 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
          위치기반 매장 탐색·결제·리워드 플랫폼의 백엔드를 재직 중 담당한 기록입니다.
        </p>
        <div className="mt-8 grid gap-4">
          {projects.filter((p) => p.group === "production").map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}/`}
              className={`group rounded-xl border p-5 transition-all ${
                dark
                  ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-extrabold text-red-600/80">{p.num}</span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-bold group-hover:text-red-500 transition-colors ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className={`mt-1 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    {p.oneLiner}
                  </p>
                  <p className="mt-2 text-xs font-medium text-red-500">{p.role}</p>
                </div>
                <span
                  className={`self-center inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-red-500 ${
                    dark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  자세히
                  <CaretRight size={14} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* 담당 영역 지도 — 레이어 카드 */}
      <FadeIn className="mt-16">
        <SubTitle>담당 영역 한눈에 보기</SubTitle>
        <div
          className={`rounded-xl border p-5 sm:p-6 space-y-3 ${
            dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          {[
            {
              label: "사용자 접점",
              items: ["모바일 앱", "매장 POS", "파트너 웹"],
              note: "고객·매장·파트너가 쓰는 화면",
            },
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
            {
              label: "외부 연동",
              items: ["AI(OpenAI)", "결제사(PG)", "본인인증사"],
              note: "검증된 외부 서비스와 연결",
            },
          ].map((layer, i, arr) => (
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

      {/* RED BRIDGE 자체 프로젝트 */}
      <FadeIn className="mt-20">
        <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
          RED BRIDGE 자체 프로젝트
        </h2>
        <p className={`mt-3 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
          직접 기획하고 개발해 운영까지 책임지는 자체 서비스와 고객 프로젝트입니다.
        </p>
        <div className="mt-8 grid gap-4">
          {projects.filter((p) => p.group === "redbridge").map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}/`}
              className={`group rounded-xl border p-5 transition-all ${
                dark
                  ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-extrabold text-red-600/80">{p.num}</span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-bold group-hover:text-red-500 transition-colors ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className={`mt-1 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    {p.oneLiner}
                  </p>
                  <p className="mt-2 text-xs font-medium text-red-500">{p.role}</p>
                </div>
                <span
                  className={`self-center inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-red-500 ${
                    dark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  자세히
                  <CaretRight size={14} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* 기술 역량 요약 */}
      <FadeIn>
        <section className="mt-16">
          <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            기술 역량 요약
          </h2>
          <SimpleTable
            head={["영역", "기술 · 경험"]}
            rows={[
              [
                <Strong key="be">백엔드</Strong>,
                "Python 3.12 · FastAPI · SQLAlchemy 2.0 완전 비동기(aiomysql/asyncmy) · Pydantic · Alembic · 도메인 모듈/DDD/헥사고날 아키텍처",
              ],
              [
                <Strong key="ai">AI 엔지니어링</Strong>,
                "LLM 에이전트 설계(자체 DAG → ReAct 전환) · RAG(pgvector) · SSE 스트리밍 · Whisper STT/TTS · 프롬프트 설계 · LLM 응답 자동 평가(QA)",
              ],
              [
                <Strong key="pay">결제 · 인증</Strong>,
                "PG 연동(NICEPAY/NicePos/KCP) · 망취소·멱등성·정합성 · QR 간편결제 · 통합 본인인증(tx_id/S2S) · 보안 취약점 수정 · AES/Fernet/PBKDF2",
              ],
              [
                <Strong key="search">검색 · 데이터</Strong>,
                "OpenSearch(nori 형태소·동의어·geo) · 무중단 재색인 · DB 마이그레이션 거버넌스 · 이벤트 스키마 레지스트리",
              ],
              [
                <Strong key="devops">DevOps</Strong>,
                "GitHub Actions(self-hosted runner) · Docker/Compose · 배포 검증 게이트 · Sentry/structlog 관측성 · Slack 운영 알림 · 모바일 스토어 CD 재구축",
              ],
              [
                <Strong key="fe">프론트엔드</Strong>,
                "Flutter(모바일·Windows 데스크톱) · Next.js/React · SSE 클라이언트 · three.js",
              ],
            ]}
          />

          <SubTitle>일하는 방식</SubTitle>
          <Bullets
            items={[
              <>
                <Strong>끝까지 오너십</Strong> — 설계 → 구현 → 테스트 → CI/CD → 배포 → 운영 알림·런북까지
                한 사이클을 완결
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
        </section>
      </FadeIn>

      <PortfolioFootnote />
    </PortfolioShell>
  );
}
