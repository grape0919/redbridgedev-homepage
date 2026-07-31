"use client";

import { ReactNode, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import Mermaid from "./Mermaid";
import {
  overviewChart,
  sseChart,
  reactChart,
  voiceChart,
  qrPayChart,
  hexChart,
  netCancelChart,
  identityChart,
  reindexChart,
  migrationChart,
} from "./charts";

/* ---------- 공통 빌딩 블록 ---------- */

function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      {children}
    </span>
  );
}

function MetaTable({ rows }: { rows: [string, ReactNode][] }) {
  const { theme } = useTheme();
  return (
    <div
      className={`my-6 rounded-xl border overflow-hidden ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className={`border-b last:border-b-0 ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <th
                className={`w-28 sm:w-36 px-4 py-3 text-left align-top font-semibold whitespace-nowrap ${
                  theme === "dark" ? "bg-gray-900/60 text-gray-300" : "bg-gray-50 text-gray-700"
                }`}
              >
                {k}
              </th>
              <td
                className={`px-4 py-3 leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  const { theme } = useTheme();
  return (
    <div
      className={`my-6 rounded-xl border overflow-x-auto ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className={theme === "dark" ? "bg-gray-900/60" : "bg-gray-50"}>
            {head.map((h) => (
              <th
                key={h}
                className={`px-4 py-3 text-left font-semibold whitespace-nowrap ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  const { theme } = useTheme();
  return (
    <ul className="my-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          <span
            className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <h4
      className={`mt-10 mb-3 text-lg font-bold ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {children}
    </h4>
  );
}

function Prose({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <p
      className={`text-sm sm:text-[15px] leading-relaxed ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {children}
    </p>
  );
}

function Strong({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <strong className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>{children}</strong>
  );
}

function Code({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <code
      className={`px-1.5 py-0.5 rounded text-[0.85em] font-mono ${
        theme === "dark" ? "bg-gray-800 text-red-300" : "bg-gray-100 text-red-700"
      }`}
    >
      {children}
    </code>
  );
}

interface ProjectSectionProps {
  id: string;
  num: string;
  title: string;
  tagline: string;
  children: ReactNode;
}

function ProjectSection({ id, num, title, tagline, children }: ProjectSectionProps) {
  const { theme } = useTheme();
  return (
    <FadeIn>
      <section id={id} className="scroll-mt-28 py-12">
        <div className="flex items-start gap-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-red-600/80 leading-none">
            {num}
          </span>
          <div>
            <h3
              className={`text-2xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p className="mt-2 text-red-500 font-medium text-sm sm:text-base">
              &ldquo;{tagline}&rdquo;
            </p>
          </div>
        </div>
        <div className="mt-6">{children}</div>
        <div
          className={`mt-14 border-b ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        />
      </section>
    </FadeIn>
  );
}

/* ---------- 개요 데이터 ---------- */

const summaryProjects = [
  {
    id: "ai-backend",
    num: "①",
    title: "AI 프로덕션 백엔드 풀사이클",
    oneLiner: "LLM 에이전트 → SSE 프록시 → 음성(STT/TTS)까지 AI 서비스 전 구간 구축",
    role: "백엔드 단독(76/90 커밋) + 에이전트 아키텍처 주도",
  },
  {
    id: "plly-pay",
    num: "②",
    title: "자체 간편결제 'Plly Pay' & PG 공통모듈",
    oneLiner: "오프라인 QR 결제 시스템 구축 + PG-중립 온라인 결제 게이트웨이",
    role: "최다 기여자(85/107 커밋)",
  },
  {
    id: "identity",
    num: "③",
    title: "통합 본인인증 멀티채널 전환",
    oneLiner: "KCP 본인인증을 tx_id 기반 통합 구조로 — 앱·웹·백엔드 3채널 동시 전환",
    role: "전 채널 마이그레이션 주도",
  },
  {
    id: "search",
    num: "④",
    title: "한국어 매장 검색엔진",
    oneLiner: "OpenSearch + nori 형태소 기반 지리검색 + 무중단 재색인 파이프라인",
    role: "단독 설계·구축(25/25 커밋)",
  },
  {
    id: "db-migration",
    num: "⑤",
    title: "DB 마이그레이션 플랫폼",
    oneLiner: "스키마 드리프트 문제를 조직 표준 프로세스로 해결한 내부 플랫폼",
    role: "단독 설계·구축(46/49 커밋)",
  },
];

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

/* ---------- 페이지 ---------- */

export default function EngineerPortfolio() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`min-h-screen ${dark ? "bg-black" : "bg-gray-50"}`}>
      {/* 상단 바 */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          dark ? "bg-black/70 border-gray-800" : "bg-white/70 border-gray-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft
              size={18}
              weight="bold"
              className={`transition-transform group-hover:-translate-x-1 ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Image
              src={dark ? "/logo_white.png" : "/logo_red.png"}
              alt="RED BRIDGE DEV"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              dark
                ? "bg-gray-900 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            {dark ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
          </button>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className={`glass-ambient top-[-5%] right-[-10%] w-[560px] h-[560px] ${
              dark ? "bg-red-600" : "bg-red-300"
            }`}
          />
        </div>

        {/* 헤더 */}
        <FadeIn>
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            Lead Engineer Portfolio
          </span>
          <h1
            className={`mt-4 text-4xl sm:text-5xl font-bold leading-tight ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            김홍교
            <span className={`block mt-2 text-xl sm:text-2xl font-semibold ${dark ? "text-gray-400" : "text-gray-500"}`}>
              백엔드 / 풀스택 엔지니어
            </span>
          </h1>
          <div className="mt-8 space-y-3">
            <Prose>
              AI 서비스·결제·인증·검색·데이터 인프라를 <Strong>설계부터 배포·운영까지</Strong>{" "}
              책임진 프로젝트 기록입니다.
            </Prose>
            <Prose>
              모든 프로젝트는 실서비스(PlayPlanet — 위치기반 매장 탐색·결제·리워드 플랫폼)
              프로덕션 코드이며, 사내 비공개 저장소 특성상 코드 대신{" "}
              <Strong>문제 → 설계 → 결과</Strong> 중심으로 정리했습니다.
            </Prose>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {commonStack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </FadeIn>

        {/* 한눈에 보기 */}
        <FadeIn className="mt-20">
          <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            한눈에 보기
          </h2>
          <div className="mt-8 grid gap-4">
            {summaryProjects.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group rounded-xl border p-5 transition-all ${
                  dark
                    ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                    : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-extrabold text-red-600/80">{p.num}</span>
                  <div className="min-w-0">
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
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* 전체 지도 */}
        <FadeIn className="mt-16">
          <SubTitle>담당 영역 전체 지도</SubTitle>
          <Mermaid chart={overviewChart} caption="직접 설계·구축한 백엔드/인프라 레이어와 연동 관계" />
        </FadeIn>

        <div className={`mt-16 border-b ${dark ? "border-gray-800" : "border-gray-200"}`} />

        {/* ① AI 백엔드 */}
        <ProjectSection
          id="ai-backend"
          num="①"
          title="AI 프로덕션 백엔드 풀사이클"
          tagline="LLM 데모가 아니라, 운영 가능한 AI 서비스를 만들었다"
        >
          <MetaTable
            rows={[
              ["기간", "2026.03 ~ 2026.07 (진행 중)"],
              [
                "역할",
                <>
                  AI 백엔드 서버 <Strong>단독 구축</Strong>(76/90 커밋) · 에이전트 아키텍처 전환
                  주도 · 음성 파이프라인 설계
                </>,
              ],
              [
                "스택",
                "Python 3.12, FastAPI, SQLAlchemy 2.0 async, MySQL, pgvector, OpenAI (GPT/Whisper/TTS), SSE, structlog, Sentry",
              ],
              ["구성", "AI 에이전트 서버 + 프록시/영속화 백엔드 + 음성 대화 모듈 + 테스트 콘솔(React)"],
            ]}
          />

          <SubTitle>시스템 구조 — 끊겨도 유실 없는 SSE 스트리밍</SubTitle>
          <Prose>
            모바일 앱과 AI 에이전트 사이에 <Strong>프록시 백엔드</Strong>를 두어,
            스트리밍·영속화·관측성을 한 곳에서 책임지도록 설계했습니다.
          </Prose>
          <Mermaid chart={sseChart} />
          <Bullets
            items={[
              <>
                업스트림 SSE를 <Strong>백그라운드 task + <Code>asyncio.Queue</Code></Strong>로 소비
                → 클라이언트 연결과 에이전트 응답 수명을 분리. 모바일 환경의 잦은 연결 끊김에도{" "}
                <Strong>메시지 유실 0</Strong>.
              </>,
              <>
                턴 단위 <Code>trace_id</Code> + <Code>request_id</Code> + <Code>user_id</Code>를
                contextvars로 자동 첨부하는 구조화 로깅 → <Code>ai_turn_logs</Code> 테이블에{" "}
                <Strong>TTFR(첫 응답)·TTFC(첫 청크) latency, intent, 에러</Strong>를 기록해 품질
                리그레션 추적.
              </>,
              <>
                구버전 앱이 깨지지 않도록 레거시 응답 스키마(30+ 필드)를 유지하며 신규 스키마로{" "}
                <Strong>무중단 이전</Strong>.
              </>,
            ]}
          />

          <SubTitle>AI 에이전트 — 자체 DAG에서 ReAct 툴 에이전트로</SubTitle>
          <Prose>
            프레임워크(LangGraph 등) 없이 구현된 추천 에이전트를, 서비스 중단 없이{" "}
            <Strong>Tool-calling 기반 ReAct 아키텍처로 단계적 전환</Strong>(Phase 1~4)했습니다.
          </Prose>
          <Mermaid chart={reactChart} />
          <Bullets
            items={[
              <>
                검색은 <Strong>DB-first RAG</Strong>: pgvector 임베딩 검색 → 결과 부족 시 OpenAI
                웹검색 폴백. 임베딩 빌드 배치 잡 별도 운영.
              </>,
              <>
                1차 액션의 신뢰도가 낮으면 상태를 deep-clone해 대체 라우트를 재실행하고 점수
                마진으로 우승작을 채택하는 <Strong>route-repair</Strong> 로직 구현.
              </>,
            ]}
          />

          <SubTitle>음성 대화 — STT/TTS 파이프라인</SubTitle>
          <Mermaid chart={voiceChart} />
          <Bullets
            items={[
              <>
                SSE 이벤트 프로토콜(<Code>stt_result</Code> → <Code>markdown_done</Code> →{" "}
                <Code>tts_summary</Code> …)을 직접 설계하고 Swagger로 문서화.
              </>,
              <>
                <Strong>STT 헐루시네이션</Strong>(무음 입력 시 Whisper가 임의 문장 생성) 감지
                로직과 전용 에러코드 도입 — 실전에서만 만나는 엣지케이스 대응.
              </>,
              <>
                TTS 실행 시점을 대화 저장 이후로 옮겨 실패 시에도 텍스트 대화는 보존되도록 순서
                최적화.
              </>,
            ]}
          />

          <SubTitle>성과</SubTitle>
          <Bullets
            items={[
              <>
                AI 대화 기능을 <Strong>프로덕션 앱에 출시</Strong>하고 백엔드 전
                구간(인증·스트리밍·영속화·배포)을 단독 운영
              </>,
              <>
                질문셋 기반 <Strong>LLM 응답 자동 평가(QA) 모듈</Strong> 구축 → 프롬프트/모델 변경
                시 품질 리그레션 자동 검증
              </>,
              <>
                SSE 계약을 검증하는 <Strong>React 테스트 콘솔</Strong>까지 직접 제작(27/27 커밋) —
                스트리밍 렌더링 race 이슈를 프론트 단에서 진단·해결
              </>,
            ]}
          />
        </ProjectSection>

        {/* ② Plly Pay */}
        <ProjectSection
          id="plly-pay"
          num="②"
          title="자체 간편결제 'Plly Pay' & PG 공통모듈"
          tagline="오프라인 QR 결제 시스템을 바닥부터, PG는 갈아끼울 수 있게"
        >
          <MetaTable
            rows={[
              ["기간", "2025.04 ~ 2026.06"],
              [
                "역할",
                <>
                  결제 서버 <Strong>최다 기여자</Strong>(85/107 커밋) — 온라인 PG 공통모듈 전체
                  구축, 자체 QR 결제 고도화, 운영 인프라
                </>,
              ],
              [
                "스택",
                "Python, FastAPI, SQLModel, MySQL 8.0, jpype1(Java 연동), AES-256-CBC / Fernet / PBKDF2, Alembic, Docker",
              ],
              ["아키텍처", "헥사고날 (Ports & Adapters)"],
            ]}
          />

          <SubTitle>자체 페이 — 오프라인 QR 결제 흐름</SubTitle>
          <Prose>
            고객 앱에 표시된 QR을 매장 POS가 스캔해 결제하는 <Strong>자체 간편결제 시스템</Strong>
            입니다. 구간별로 서로 다른 암호화를 적용해 종단 간 보안을 확보했습니다.
          </Prose>
          <Mermaid chart={qrPayChart} />
          <Bullets
            items={[
              <>
                <Strong>구간별 암호화 설계</Strong>: QR 토큰은 Fernet, API 페이로드는
                AES-256-CBC(랜덤 IV + PKCS7), API 시크릿은 PBKDF2-HMAC-SHA256 해싱 저장 — 용도별로
                알고리즘을 분리.
              </>,
              <>
                <Strong>Java 레거시 연동</Strong>: 결제 단말 SDK가 Java(<Code>nicepos.jar</Code>)뿐인
                제약을 jpype1로 JVM을 프로세스에 로드해 해결. NicePosClient 싱글톤으로 JVM
                생명주기 관리.
              </>,
              <>
                서명 이미지(BMP)·할부·봉사료·세금 등 <Strong>오프라인 결제 실무 요건</Strong>을 모두
                수용.
              </>,
            ]}
          />

          <SubTitle>PG 공통모듈 — 결제사를 갈아끼울 수 있는 구조</SubTitle>
          <Prose>
            온라인 결제(NICEPAY) 추가를 계기로, 특정 PG에 종속되지 않는{" "}
            <Strong>PG-중립 라우팅 구조</Strong>를 헥사고날 아키텍처로 설계했습니다.
          </Prose>
          <Mermaid chart={hexChart} />

          <SubTitle>정합성 — 망취소(Net-Cancel) 워커</SubTitle>
          <Prose>
            결제에서 가장 어려운 건 성공이 아니라 <Strong>애매하게 실패한 거래</Strong>입니다. 승인
            요청 후 응답을 못 받은 거래를 자동으로 복구하는 내장 워커를 구현했습니다.
          </Prose>
          <Mermaid chart={netCancelChart} />
          <Bullets
            items={[
              <>
                콜백이 오지 않아 PENDING에 고착되는 거래를 방어하고, 망취소 이력·큐 상태를 조회하는{" "}
                <Strong>관측 API</Strong>를 함께 제공 — 운영자가 &ldquo;지금 걸려 있는 거래&rdquo;를
                즉시 파악 가능.
              </>,
              <>
                keyset 페이지네이션 기반 결제 목록 조회, 예외 traceback 보존 + Sentry 연동, NICEPAY{" "}
                <Strong>E2E 테스트 하네스</Strong>까지 구축.
              </>,
            ]}
          />

          <SubTitle>성과</SubTitle>
          <SimpleTable
            head={["항목", "내용"]}
            rows={[
              ["자체 페이", "QR 결제 실서비스 운영 — 앱 QR 발급 ↔ 매장 POS 스캔 ↔ 승인 전 구간"],
              [
                "PG 확장성",
                <>
                  <Code>provider_port</Code> 추상화로 NicePos(오프라인) + NICEPAY(온라인) 동시 운영,
                  신규 PG 추가 시 어댑터만 구현
                </>,
              ],
              ["신뢰성", "망취소 자동화 + 멱등성 + 재시도로 결제 정합성 확보"],
              [
                "배포",
                <>
                  <Code>DEPLOY_MODE</Code> 기반 self-host Docker 패키징 + 부트스트랩 시드 + 운영
                  런북/인시던트 문서화
                </>,
              ],
            ]}
          />
        </ProjectSection>

        {/* ③ 통합 본인인증 */}
        <ProjectSection
          id="identity"
          num="③"
          title="통합 본인인증 멀티채널 전환"
          tagline="인증 한 번을 고치기 위해 앱·웹·백엔드 3개 채널을 동시에 옮기다"
        >
          <MetaTable
            rows={[
              ["기간", "2026.05 ~ 2026.07"],
              [
                "역할",
                <>
                  KCP 본인인증 V2(S2S) 전환을{" "}
                  <Strong>모바일 앱(Flutter) · 파트너 웹(Next.js) · 백엔드(FastAPI) 전 채널에서 직접 마이그레이션</Strong>
                </>,
              ],
              ["스택", "FastAPI, KCP 휴대폰본인확인 V2(S2S), JWT, Flutter, Next.js"],
            ]}
          />

          <SubTitle>문제</SubTitle>
          <Bullets
            items={[
              <>
                서비스마다 KCP를 <Strong>직연동</Strong>해 인증 로직·시크릿이 중복되고, 결과 응답에{" "}
                <Strong>CI/DI·개인정보가 평문 노출</Strong>되는 구조
              </>,
              <>
                웹은 팝업 ↔ opener 통신 방식이라 브라우저(bfcache, 제스처 컨텍스트, 팝업 차단)에
                따라 인증이 조용히 실패
              </>,
            ]}
          />

          <SubTitle>설계 — tx_id 기반 통합 인증</SubTitle>
          <Prose>
            여러 서비스가 공유하는 <Strong>통합 본인인증 서버</Strong>를 두고, 모든 채널이{" "}
            <Code>tx_id</Code> 하나로 결과를 조회하는 구조로 통일했습니다.
          </Prose>
          <Mermaid chart={identityChart} />

          <SubTitle>채널별 마이그레이션</SubTitle>
          <SimpleTable
            head={["채널", "작업 내용"]}
            rows={[
              [
                <Strong key="be">백엔드</Strong>,
                <>
                  전 가입 경로를 tx_id 기반 V3로 통일 · <Code>/result</Code> 응답에서 PII 제거 ·
                  가입 중복검사를 CI→DI 기반으로 전환(서비스 간 교차가입 허용) · 2단계 스테이징
                  테이블 설계
                </>,
              ],
              [
                <Strong key="app">모바일 앱</Strong>,
                "KCP 직연동 → tx_id 방식 전환(signup v3) · 휴대폰번호 변경 재인증 흐름",
              ],
              [
                <Strong key="web">파트너 웹</Strong>,
                <>
                  팝업 ↔ opener 통신 제거 → <Strong>단일 탭 전체 리다이렉트 + 백엔드 폴링</Strong>{" "}
                  방식 재설계 · bfcache/제스처 등 브라우저 엣지케이스 TC 표 문서화
                </>,
              ],
              [
                <Strong key="member">기존 회원</Strong>,
                <>
                  web_siteid 변경으로 인한 기존 회원 <Strong>재인증 게이트</Strong>
                  (REAUTH_REQUIRED) — 카카오 로그인 포함 전 로그인 경로 적용
                </>,
              ],
            ]}
          />

          <SubTitle>함께 수정한 보안 취약점</SubTitle>
          <SimpleTable
            head={["취약점", "조치"]}
            rows={[
              [
                "비밀번호 변경 시 휴대폰 불일치 우회 가능",
                "인증된 tx_id의 DI와 계정 소유자 대조 검증",
              ],
              [
                "휴대폰번호 변경으로 타인 명의 이전 가능",
                "기존 CI 불일치 시 차단하는 소유권 검증 추가",
              ],
              [
                "인증 결과에 CI/DI·개인정보 평문 노출",
                "응답 최소화(verified + 로그인 정보만), CI/DI 영구 비저장(단명 보관 후 폐기)",
              ],
              [
                "토큰 미제공 시 400 반환 (클라이언트 오분류)",
                "401로 정정해 인증 만료 처리 정상화",
              ],
            ]}
          />

          <SubTitle>성과</SubTitle>
          <Bullets
            items={[
              <>
                인증 로직이 <Strong>한 서버로 수렴</Strong> — 신규 서비스는 테넌트 등록만으로
                본인인증 도입 가능 (멀티테넌트: <Code>/admin/clients</Code> + 복귀 URL
                화이트리스트)
              </>,
              <>
                웹 인증 성공률 문제(팝업 통신 실패)를 폴링 구조로 원천 제거, 크로스브라우저 TC
                문서화
              </>,
              <>
                <Strong>&ldquo;한 기능을 전 스택에서 끝까지&rdquo;</Strong> — 백엔드 설계부터
                Flutter/Next.js 클라이언트 마이그레이션, 기존 회원 재인증 운영 시나리오까지 단일
                오너십으로 완료
              </>,
            ]}
          />
        </ProjectSection>

        {/* ④ 검색엔진 */}
        <ProjectSection
          id="search"
          num="④"
          title="한국어 매장 검색엔진 (OpenSearch)"
          tagline="형태소 분석부터 무중단 재색인까지, 검색 인프라를 단독 설계"
        >
          <MetaTable
            rows={[
              ["기간", "2026.07 ~ (신규 구축)"],
              [
                "역할",
                <>
                  <Strong>단독 설계·구축</Strong> (25/25 커밋)
                </>,
              ],
              ["스택", "OpenSearch 2.13, analysis-nori, Python 색인 배치, Docker Compose, MySQL"],
              ["대상", "매장 약 40만 건 — 지도 마커·검색·자동완성"],
            ]}
          />

          <SubTitle>한국어 분석 설계</SubTitle>
          <SimpleTable
            head={["구성 요소", "내용"]}
            rows={[
              [
                "형태소 분석",
                <>
                  <Code>nori_tokenizer</Code> (decompound_mixed) — 복합어 분해와 원형 동시 색인
                </>,
              ],
              ["사용자 사전", "도메인 신조어 등록 (맛집·카공·빵집 등) — 잘못된 분해 방지"],
              [
                "동의어",
                <>
                  <Code>synonym_graph</Code> 동의어 사전, <Strong>updateable</Strong> — 재색인 없이
                  동의어 갱신
                </>,
              ],
              ["자동완성", "edge_ngram 분석기"],
              [
                "지리검색",
                <>
                  <Code>geo_point</Code> — 지도 뷰포트·거리 기반 질의
                </>,
              ],
              [
                "랭킹 신호",
                <>
                  카드 혜택 스코어(<Code>max_benefit_score</Code> — 카드별 프로모션 결합 후
                  최대값), 광고/프로모션 마커 앵커
                </>,
              ],
            ]}
          />

          <SubTitle>무중단 재색인 파이프라인</SubTitle>
          <Prose>
            색인 스키마가 바뀌어도 <Strong>서비스 중단 없이</Strong> 전체 재색인이 가능하도록 alias
            원자 스왑 방식으로 설계했습니다.
          </Prose>
          <Mermaid chart={reindexChart} />
          <Bullets
            items={[
              <>
                혜택 정보는 <Strong>bulk count 1콜 + 필요한 쌍만 상세 조회(동시성 8)</Strong>로 API
                부하를 통제
              </>,
              <>
                좌표 없는 매장 제외, 법정동코드 사전 기반 <Strong>지역 토큰 라우팅</Strong> 등 검색
                품질 규칙 내장
              </>,
              <>
                배포 후 품질 회귀를 잡는 <Strong>검색 스모크 테스트</Strong> 스크립트 동봉
              </>,
              <>리포 경계 명확화: 색인·매핑은 이 저장소, 쿼리 빌더는 앱 저장소 — 역할 분리 문서화</>,
            ]}
          />

          <SubTitle>성과</SubTitle>
          <Bullets
            items={[
              <>
                지도 마커·매장 검색·자동완성을 지탱하는 검색 인프라를{" "}
                <Strong>2주 내 단독으로 0→1 구축</Strong>
              </>,
              <>
                동의어·사용자 사전을 운영 중 갱신 가능한 구조로 만들어{" "}
                <Strong>검색 품질 튜닝 사이클을 재색인에서 분리</Strong>
              </>,
            ]}
          />
        </ProjectSection>

        {/* ⑤ DB 마이그레이션 */}
        <ProjectSection
          id="db-migration"
          num="⑤"
          title="DB 마이그레이션 플랫폼"
          tagline="개인의 습관이 아니라, 조직의 프로세스로 스키마를 지킨다"
        >
          <MetaTable
            rows={[
              ["기간", "2026.07 ~"],
              [
                "역할",
                <>
                  <Strong>단독 설계·구축</Strong> (46/49 커밋) — 프로세스 설계 + CI/CD + 가이드 문서
                  3종
                </>,
              ],
              ["스택", "Alembic (raw SQL 전용), MySQL, GitHub Actions (self-hosted), Slack 경보"],
              [
                "문제",
                <>
                  여러 저장소가 각자 raw SQL을 수동 적용 → <Strong>DEV ↔ PROD 스키마 드리프트</Strong>,
                  이력 부재, 롤백 불가
                </>,
              ],
            ]}
          />

          <SubTitle>설계 원칙</SubTitle>
          <SimpleTable
            head={["원칙", "이유"]}
            rows={[
              [
                <>
                  autogenerate 금지, <Code>op.execute()</Code> raw SQL만
                </>,
                "ORM 모델이 여러 저장소에 흩어져 있어 단일 모델 기준 자동 생성이 불가능 — SQL을 정본으로",
              ],
              [
                "전역 단조 4자리 순번 + downgrade 의무",
                "적용 순서 명확화, 모든 변경의 되돌림 경로 보장",
              ],
              [
                "문장 단위 분리 + 멱등 가드",
                "MySQL DDL은 트랜잭션 롤백 불가(implicit commit) — 중간 실패 시 재실행 가능해야 함",
              ],
              [
                <>
                  대용량 ALTER <Code>[heavy]</Code> 태깅
                </>,
                "매장 40만·아이템 670만 행 테이블 COPY 유발 변경은 PROD 야간 창구에만 적용",
              ],
              [
                "append-only 유틸 스키마",
                "charset/collation 인시던트 재발 방지 규칙(utf8mb4) 명문화",
              ],
            ]}
          />

          <SubTitle>배포 파이프라인 — 검증 게이트와 승인</SubTitle>
          <Mermaid chart={migrationChart} />

          <SubTitle>성과</SubTitle>
          <Bullets
            items={[
              <>
                스키마 변경의 <Strong>유일한 통로</Strong>를 확립 — 이후 모든 팀 스키마 변경이 이
                저장소의 PR 리뷰·CI를 통과
              </>,
              <>
                <Strong>드리프트 자동 감시 + Slack 경보</Strong>로 &ldquo;몰래 벌어진
                불일치&rdquo;를 상시 탐지
              </>,
              <>
                리비전 0001~0016 직접 작성 (카테고리 정규화, EAV 속성 테이블, 이벤트 로그 테이블 등)
                + 레거시 SQL 94파일 아카이브로 과거 이력 보존
              </>,
              <>
                가이드 문서 3종 + 롤백 런북 — <Strong>사람이 바뀌어도 유지되는 프로세스</Strong>로
                정착
              </>,
            ]}
          />
        </ProjectSection>

        {/* 기술 역량 요약 */}
        <FadeIn>
          <section className="py-12">
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
                  <Strong>끝까지 오너십</Strong> — 설계 → 구현 → 테스트 → CI/CD → 배포 → 운영
                  알림·런북까지 한 사이클을 완결
                </>,
                <>
                  <Strong>정합성에 대한 집착</Strong> — 망취소 워커, 드리프트 감시, up-down-up 왕복
                  테스트처럼 &ldquo;실패하는 경로&rdquo;를 먼저 설계
                </>,
                <>
                  <Strong>무중단 전환의 반복 경험</Strong> — 에이전트 아키텍처 전환, 본인인증 V2,
                  검색 alias 스왑, 레거시 응답 호환 — 서비스를 세우지 않고 갈아끼우는 패턴에 익숙
                </>,
                <>
                  <Strong>관측 가능해야 운영 가능</Strong> — trace_id 분산 추적, 턴 단위 latency
                  로깅, Sentry 규약화를 모든 프로젝트에 기본 적용
                </>,
              ]}
            />
          </section>
        </FadeIn>

        {/* 각주 + CTA */}
        <FadeIn>
          <div
            className={`mt-8 rounded-xl border p-6 text-sm leading-relaxed ${
              dark
                ? "bg-gray-900/40 border-gray-800 text-gray-500"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            본 문서의 프로젝트는 모두 재직 중 수행한 실서비스 개발 건으로, 코드는 사내 비공개
            저장소에 있습니다. 아키텍처·수치는 보안에 문제없는 수준으로 재구성했으며, 상세 내용은
            미팅에서 설명 가능합니다.
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
            >
              프로젝트 문의하기
            </Link>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
