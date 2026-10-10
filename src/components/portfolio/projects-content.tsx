"use client";

import { ReactNode } from "react";
import {
  AndroidLogo,
  Article,
  ArrowCounterClockwise,
  ArrowsClockwise,
  BellRinging,
  BookOpen,
  Brain,
  Broadcast,
  Bug,
  Buildings,
  Camera,
  ChartLineUp,
  ChatCircleDots,
  ChatText,
  CheckCircle,
  ClipboardText,
  Clock,
  CreditCard,
  Database,
  DeviceMobile,
  Drop,
  FilePdf,
  FloppyDisk,
  GitPullRequest,
  IdentificationCard,
  Key,
  Lightning,
  LockKey,
  MagnifyingGlass,
  MapPin,
  Microphone,
  Notebook,
  PaintBrush,
  PencilSimple,
  QrCode,
  Receipt,
  Robot,
  Scales,
  ShieldCheck,
  Sliders,
  Sparkle,
  Stack,
  Storefront,
  Swap,
  TextAa,
  Timer,
  Wine,
} from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";
import { MetaTable, Prose, Strong, SubTitle, StepFlow, HighlightGrid, StatCards } from "./ui";

const iconSize = 22;
const icon = (I: React.ComponentType<{ size?: number; weight?: "duotone" }>) => (
  <I size={iconSize} weight="duotone" />
);

/* ---------- 구조: 아이콘은 공유, 문구만 ko/en ---------- */

interface Texts {
  metaRows: [string, ReactNode][];
  intro: ReactNode;
  flowTitle: string;
  steps: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
}

interface ProjectDef {
  stepIcons: ReactNode[];
  featureIcons: ReactNode[];
  copy: { ko: Texts; en: Texts };
}

const sectionTitles = {
  ko: { features: "핵심 특징", results: "성과" },
  en: { features: "Highlights", results: "Results" },
};

function link(href: string, label: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-500 hover:text-red-400 transition-colors font-medium"
    >
      {label} ↗
    </a>
  );
}

/* ---------- 프로젝트 정의 ---------- */

const defs: Record<string, ProjectDef> = {
  "ai-backend": {
    stepIcons: [icon(ChatCircleDots), icon(Brain), icon(Broadcast), icon(FloppyDisk)],
    featureIcons: [icon(ShieldCheck), icon(Microphone), icon(ArrowsClockwise), icon(CheckCircle)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2026.03 ~ 2026.07 (진행 중)"],
          ["역할", "백엔드 단독 구축 · AI 아키텍처 전환 주도 · 음성 파이프라인 설계"],
          ["기술", "Python · FastAPI · MySQL · OpenAI (GPT / Whisper / TTS)"],
        ],
        intro: (
          <>
            모바일 앱 안에서 AI와 <Strong>텍스트·음성으로 실시간 대화</Strong>하는 기능을 설계부터
            프로덕션 출시·운영까지 책임지고 구축했습니다. 화려한 데모가 아니라, 수많은 사용자가
            동시에 써도 안정적으로 동작하는 <Strong>운영 가능한 AI 서비스</Strong>를 만드는 것이
            목표였습니다.
          </>
        ),
        flowTitle: "서비스 흐름",
        steps: [
          { title: "질문 입력", desc: "텍스트 또는 음성으로 질문" },
          { title: "AI 추론·검색", desc: "데이터 기반 추천·답변 생성" },
          { title: "실시간 전달", desc: "답변을 끊김 없이 스트리밍" },
          { title: "안전한 기록", desc: "연결이 끊겨도 대화 보존" },
        ],
        features: [
          {
            title: "유실 없는 대화",
            desc: "이동 중 네트워크가 끊겨도 대화 내용이 사라지지 않도록 서버가 끝까지 응답을 받아 보관합니다.",
          },
          {
            title: "음성 대화",
            desc: "음성 인식(STT)과 음성 합성(TTS)을 연결해 말로 묻고 음성으로 답을 듣는 경험을 제공합니다.",
          },
          {
            title: "무중단 세대 교체",
            desc: "서비스를 멈추지 않고 AI 엔진 구조를 4단계에 걸쳐 최신 아키텍처로 전환했습니다.",
          },
          {
            title: "자동 품질 검증",
            desc: "AI 답변 품질을 자동으로 평가하는 체계를 갖춰, 변경 때마다 품질 저하를 사전에 걸러냅니다.",
          },
        ],
        stats: [
          { value: "단독", label: "백엔드 전 구간 구축·운영" },
          { value: "0건", label: "네트워크 끊김에 의한 대화 유실" },
          { value: "4단계", label: "무중단 AI 아키텍처 전환" },
          { value: "출시", label: "프로덕션 앱 정식 탑재" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Mar 2026 – Jul 2026 (ongoing)"],
          ["Role", "Sole backend engineer · led AI architecture migration · designed voice pipeline"],
          ["Stack", "Python · FastAPI · MySQL · OpenAI (GPT / Whisper / TTS)"],
        ],
        intro: (
          <>
            We built an in-app feature for <Strong>real-time text and voice conversations with
            AI</Strong>, owning it from design through production launch and operations. The goal
            was not a flashy demo but an <Strong>operable AI service</Strong> that stays stable
            with many concurrent users.
          </>
        ),
        flowTitle: "Service Flow",
        steps: [
          { title: "Ask", desc: "Questions by text or voice" },
          { title: "AI Reasoning", desc: "Data-grounded answers & recommendations" },
          { title: "Live Streaming", desc: "Answers stream without interruption" },
          { title: "Safe Records", desc: "Conversations survive disconnects" },
        ],
        features: [
          {
            title: "No Lost Conversations",
            desc: "Even if the network drops mid-ride, the server keeps consuming the answer to the end and stores it.",
          },
          {
            title: "Voice Conversations",
            desc: "Speech recognition (STT) and synthesis (TTS) are chained so users can ask aloud and hear the answer.",
          },
          {
            title: "Zero-Downtime Engine Swap",
            desc: "Migrated the AI engine to a modern architecture in four phases without stopping the service.",
          },
          {
            title: "Automated Quality Checks",
            desc: "An automated evaluation suite catches answer-quality regressions before every prompt or model change ships.",
          },
        ],
        stats: [
          { value: "Solo", label: "Built & operated the entire backend" },
          { value: "0", label: "Conversations lost to disconnects" },
          { value: "4 phases", label: "Zero-downtime architecture migration" },
          { value: "Live", label: "Shipped in the production app" },
        ],
      },
    },
  },

  payments: {
    stepIcons: [icon(QrCode), icon(Storefront), icon(CreditCard), icon(Receipt)],
    featureIcons: [icon(LockKey), icon(Swap), icon(ArrowCounterClockwise), icon(BookOpen)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2025.04 ~ 2026.06"],
          ["역할", "결제 서버 최다 기여 — 결제 게이트웨이 구축 · QR 결제 고도화 · 운영 인프라"],
          ["기술", "Python · FastAPI · MySQL · 결제 단말/PG 연동 · 암호화(AES 등)"],
        ],
        intro: (
          <>
            고객 앱의 QR을 매장 POS로 스캔해 결제하는 <Strong>자체 간편결제 시스템</Strong>을
            바닥부터 구축했습니다. 결제사(PG)에 종속되지 않는 구조로 설계해, 새로운 결제사가
            추가되어도 서비스 전체를 고치지 않고 <Strong>부품처럼 갈아끼울 수</Strong> 있습니다.
          </>
        ),
        flowTitle: "결제 흐름",
        steps: [
          { title: "QR 발급", desc: "고객 앱에 암호화된 QR 표시" },
          { title: "매장 스캔", desc: "POS가 QR을 읽어 결제 요청" },
          { title: "카드 승인", desc: "카드사 승인까지 안전하게 중계" },
          { title: "완료·기록", desc: "영수증 출력과 거래 기록 보관" },
        ],
        features: [
          {
            title: "구간별 암호화",
            desc: "QR·통신·비밀키 저장까지 구간마다 용도에 맞는 암호화를 적용해 종단 간 보안을 확보했습니다.",
          },
          {
            title: "결제사 교체 가능 구조",
            desc: "오프라인·온라인 결제사를 동시에 운영하며, 신규 결제사는 어댑터 하나만 만들면 연결됩니다.",
          },
          {
            title: "실패 거래 자동 복구",
            desc: "응답을 받지 못한 애매한 거래를 자동으로 찾아 취소·복구하는 워커로 결제 정합성을 지킵니다.",
          },
          {
            title: "운영까지 문서화",
            desc: "배포 패키징, 운영 런북, 장애 대응 문서까지 갖춰 사람이 바뀌어도 운영이 이어집니다.",
          },
        ],
        stats: [
          { value: "실서비스", label: "QR 결제 전 구간 운영" },
          { value: "2개사", label: "온·오프라인 결제사 동시 운영" },
          { value: "자동", label: "실패 거래 복구 워커 내장" },
          { value: "최다", label: "결제 서버 기여자" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Apr 2025 – Jun 2026"],
          ["Role", "Top contributor — built the payment gateway, matured QR payments, ops infra"],
          ["Stack", "Python · FastAPI · MySQL · POS terminal/PG integrations · encryption (AES, etc.)"],
        ],
        intro: (
          <>
            We built an <Strong>in-house QR payment system</Strong> from scratch: customers show a
            QR in the app and store POS terminals scan it to pay. The design is
            provider-neutral — adding a new payment gateway means{" "}
            <Strong>swapping in a part</Strong>, not rewriting the service.
          </>
        ),
        flowTitle: "Payment Flow",
        steps: [
          { title: "Issue QR", desc: "Encrypted QR shown in the app" },
          { title: "Store Scan", desc: "POS reads the QR and requests payment" },
          { title: "Card Approval", desc: "Relayed safely through to the card network" },
          { title: "Done & Recorded", desc: "Receipt printed, transaction stored" },
        ],
        features: [
          {
            title: "Per-Segment Encryption",
            desc: "QR tokens, API payloads, and stored secrets each get purpose-fit encryption for end-to-end security.",
          },
          {
            title: "Swappable Providers",
            desc: "Offline and online gateways run side by side; a new provider only needs one adapter.",
          },
          {
            title: "Auto-Recovery of Failed Payments",
            desc: "A built-in worker finds transactions stuck without a response and cancels or recovers them automatically.",
          },
          {
            title: "Documented Operations",
            desc: "Deployment packaging, runbooks, and incident docs keep operations alive through personnel changes.",
          },
        ],
        stats: [
          { value: "Live", label: "End-to-end QR payments in production" },
          { value: "2", label: "Payment providers running in parallel" },
          { value: "Auto", label: "Failed-payment recovery worker" },
          { value: "Top", label: "Contributor on the payment server" },
        ],
      },
    },
  },

  identity: {
    stepIcons: [icon(DeviceMobile), icon(IdentificationCard), icon(Key), icon(ShieldCheck)],
    featureIcons: [icon(Stack), icon(ShieldCheck), icon(Bug), icon(Buildings)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2026.05 ~ 2026.07"],
          ["역할", "모바일 앱 · 파트너 웹 · 백엔드 3채널 동시 마이그레이션 주도"],
          ["기술", "FastAPI · 휴대폰 본인확인(S2S) · Flutter · Next.js"],
        ],
        intro: (
          <>
            서비스마다 제각각이던 휴대폰 본인인증을 <Strong>하나의 통합 인증 서버</Strong>로
            모았습니다. 인증 결과에 개인정보가 노출되던 구조를 걷어내고, 앱·웹·백엔드{" "}
            <Strong>3개 채널을 서비스 중단 없이 동시에 전환</Strong>했습니다.
          </>
        ),
        flowTitle: "인증 흐름",
        steps: [
          { title: "인증 요청", desc: "앱·웹 어디서든 동일한 방식" },
          { title: "휴대폰 본인확인", desc: "인증창에서 본인 명의 확인" },
          { title: "인증표 발급", desc: "개인정보 대신 1회용 인증표 전달" },
          { title: "안전한 확인", desc: "서버 간 통신으로만 결과 조회" },
        ],
        features: [
          {
            title: "3채널 동시 전환",
            desc: "백엔드 설계부터 모바일 앱, 파트너 웹까지 전 채널을 한 사람의 오너십으로 끝까지 마이그레이션했습니다.",
          },
          {
            title: "개인정보 보호 강화",
            desc: "인증 결과에서 개인 식별정보를 제거하고, 민감정보는 짧게 보관 후 폐기하도록 재설계했습니다.",
          },
          {
            title: "보안 취약점 4건 수정",
            desc: "명의 도용·정보 노출로 이어질 수 있던 취약점을 전환 과정에서 함께 찾아 차단했습니다.",
          },
          {
            title: "신규 서비스 즉시 도입",
            desc: "새 서비스는 등록만 하면 본인인증을 바로 쓸 수 있는 멀티테넌트 구조로 만들었습니다.",
          },
        ],
        stats: [
          { value: "3채널", label: "앱·웹·백엔드 동시 전환" },
          { value: "4건", label: "보안 취약점 발견·수정" },
          { value: "1개", label: "서버로 인증 로직 통합" },
          { value: "무중단", label: "기존 회원 재인증 운영" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "May 2026 – Jul 2026"],
          ["Role", "Led the simultaneous migration of mobile app, partner web, and backend"],
          ["Stack", "FastAPI · phone identity verification (S2S) · Flutter · Next.js"],
        ],
        intro: (
          <>
            Phone identity verification used to be wired separately into each service. We
            consolidated it into <Strong>one unified verification server</Strong>, removed
            personal data from verification responses, and migrated{" "}
            <Strong>app, web, and backend simultaneously with zero downtime</Strong>.
          </>
        ),
        flowTitle: "Verification Flow",
        steps: [
          { title: "Request", desc: "Same flow on app and web" },
          { title: "Phone Verification", desc: "Identity confirmed in the carrier window" },
          { title: "One-Time Ticket", desc: "A single-use ticket replaces personal data" },
          { title: "Secure Lookup", desc: "Results fetched only server-to-server" },
        ],
        features: [
          {
            title: "3 Channels at Once",
            desc: "From backend design to the Flutter app and Next.js partner web — one owner carried the migration across every channel.",
          },
          {
            title: "Stronger Privacy",
            desc: "Personally identifiable data was removed from responses; sensitive values are held briefly and destroyed.",
          },
          {
            title: "4 Security Fixes",
            desc: "Vulnerabilities that could enable identity takeover or data exposure were found and closed during the migration.",
          },
          {
            title: "Instant Onboarding",
            desc: "A multi-tenant design lets any new service adopt identity verification just by registering.",
          },
        ],
        stats: [
          { value: "3", label: "Channels migrated together" },
          { value: "4", label: "Security vulnerabilities fixed" },
          { value: "1", label: "Server now owns all verification" },
          { value: "Zero", label: "Downtime during re-verification" },
        ],
      },
    },
  },

  search: {
    stepIcons: [icon(Database), icon(TextAa), icon(MapPin), icon(ArrowsClockwise)],
    featureIcons: [icon(TextAa), icon(MapPin), icon(ArrowsClockwise), icon(Sliders)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2026.07 ~ (신규 구축)"],
          ["역할", "단독 설계·구축"],
          ["기술", "OpenSearch · 한국어 형태소 분석 · Python 색인 배치 · MySQL"],
        ],
        intro: (
          <>
            매장 약 40만 건을 대상으로 지도 마커·검색·자동완성을 지탱하는{" "}
            <Strong>한국어 특화 검색 인프라</Strong>를 2주 만에 단독으로 구축했습니다. 검색 구조가
            바뀌어도 <Strong>서비스를 멈추지 않고</Strong> 전체 데이터를 다시 색인할 수 있습니다.
          </>
        ),
        flowTitle: "동작 방식",
        steps: [
          { title: "매장 데이터", desc: "40만 매장 정보 수집·조립" },
          { title: "한국어 분석", desc: "형태소·동의어·신조어 처리" },
          { title: "검색·지도", desc: "위치 기반 검색과 자동완성" },
          { title: "무중단 갱신", desc: "운영 중에도 색인 전체 교체" },
        ],
        features: [
          {
            title: "한국어 특화 분석",
            desc: "'맛집', '카공' 같은 신조어와 복합어를 정확히 이해하도록 사전과 동의어를 직접 설계했습니다.",
          },
          {
            title: "위치 기반 검색",
            desc: "지도 화면 범위와 거리 기준 검색으로 '지금 내 주변' 매장을 빠르게 찾아줍니다.",
          },
          {
            title: "무중단 재색인",
            desc: "새 색인을 미리 만들어 검증한 뒤 한 번에 교체하는 방식으로, 실패해도 기존 검색에 영향이 없습니다.",
          },
          {
            title: "운영 중 품질 튜닝",
            desc: "동의어·사용자 사전을 재색인 없이 갱신할 수 있어 검색 품질을 빠르게 개선합니다.",
          },
        ],
        stats: [
          { value: "40만", label: "검색 대상 매장" },
          { value: "2주", label: "0→1 단독 구축" },
          { value: "0회", label: "재색인 중 서비스 중단" },
          { value: "분리", label: "품질 튜닝과 재색인 사이클" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Jul 2026 – (new build)"],
          ["Role", "Designed & built solo"],
          ["Stack", "OpenSearch · Korean morphological analysis · Python indexing batch · MySQL"],
        ],
        intro: (
          <>
            In two weeks, one engineer built the <Strong>Korean-specialized search
            infrastructure</Strong> behind map markers, search, and autocomplete for roughly
            400,000 stores. When the index schema changes, the whole dataset can be reindexed{" "}
            <Strong>without stopping the service</Strong>.
          </>
        ),
        flowTitle: "How It Works",
        steps: [
          { title: "Store Data", desc: "400K store records assembled" },
          { title: "Korean Analysis", desc: "Morphology, synonyms, neologisms" },
          { title: "Search & Map", desc: "Geo search and autocomplete" },
          { title: "Live Refresh", desc: "Full reindex while serving traffic" },
        ],
        features: [
          {
            title: "Korean-Specialized Analysis",
            desc: "Custom dictionaries and synonyms teach the engine compound words and slang so queries parse correctly.",
          },
          {
            title: "Location-Aware Search",
            desc: "Viewport and distance-based queries surface 'what's around me right now' instantly.",
          },
          {
            title: "Zero-Downtime Reindexing",
            desc: "A new index is built and validated first, then swapped atomically — failures never touch live search.",
          },
          {
            title: "Tuning Without Reindex",
            desc: "Synonyms and user dictionaries update in place, so search quality iterates quickly.",
          },
        ],
        stats: [
          { value: "400K", label: "Stores searchable" },
          { value: "2 wks", label: "Zero-to-one, built solo" },
          { value: "0", label: "Outages during reindexing" },
          { value: "Split", label: "Tuning decoupled from reindex" },
        ],
      },
    },
  },

  "db-migration": {
    stepIcons: [icon(GitPullRequest), icon(CheckCircle), icon(BellRinging), icon(ShieldCheck)],
    featureIcons: [icon(ArrowsClockwise), icon(BellRinging), icon(ShieldCheck), icon(BookOpen)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2026.07 ~"],
          ["역할", "단독 설계·구축 — 프로세스 + CI/CD + 가이드 문서"],
          ["기술", "Alembic · MySQL · GitHub Actions · Slack 알림"],
        ],
        intro: (
          <>
            팀마다 제각각 DB를 수정하다 생기던 <Strong>환경 간 불일치와 이력 부재</Strong> 문제를,
            모든 스키마 변경이 <Strong>검증과 승인을 거쳐 한 통로로만</Strong> 흐르도록 만든 내부
            플랫폼으로 해결했습니다. 개인의 습관이 아니라 조직의 프로세스로 데이터를 지킵니다.
          </>
        ),
        flowTitle: "변경 절차",
        steps: [
          { title: "변경 요청", desc: "모든 변경은 PR로 제출" },
          { title: "자동 검증", desc: "적용·되돌림을 미리 왕복 테스트" },
          { title: "개발 적용·감시", desc: "불일치가 생기면 즉시 알림" },
          { title: "승인 후 운영 반영", desc: "백업과 롤백 경로 확보 후 적용" },
        ],
        features: [
          {
            title: "되돌림까지 검증",
            desc: "모든 변경은 적용→되돌림→재적용을 통과해야 하므로, 언제든 안전하게 롤백할 수 있습니다.",
          },
          {
            title: "불일치 자동 감시",
            desc: "개발·운영 DB가 몰래 어긋나면 자동으로 감지해 Slack으로 알립니다.",
          },
          {
            title: "운영 반영 안전장치",
            desc: "운영 DB에는 수동 승인과 전체 백업을 거친 뒤에만 적용되고, 실패 시 롤백 절차가 준비되어 있습니다.",
          },
          {
            title: "프로세스로 정착",
            desc: "가이드 문서와 롤백 런북을 갖춰, 담당자가 바뀌어도 유지되는 표준 절차로 자리잡았습니다.",
          },
        ],
        stats: [
          { value: "1개", label: "스키마 변경의 유일한 통로" },
          { value: "16개", label: "직접 작성한 리비전" },
          { value: "94개", label: "레거시 SQL 파일 정리·보존" },
          { value: "상시", label: "불일치 자동 감시·경보" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Jul 2026 –"],
          ["Role", "Designed & built solo — process + CI/CD + guides"],
          ["Stack", "Alembic · MySQL · GitHub Actions · Slack alerts"],
        ],
        intro: (
          <>
            Teams editing databases independently caused <Strong>environment drift and missing
            history</Strong>. This internal platform routes every schema change through{" "}
            <Strong>one verified, approved pipeline</Strong> — protecting data with an
            organizational process instead of personal habits.
          </>
        ),
        flowTitle: "Change Process",
        steps: [
          { title: "Request", desc: "Every change arrives as a PR" },
          { title: "Auto-Verify", desc: "Apply→revert→apply tested in advance" },
          { title: "Dev Apply & Watch", desc: "Any drift triggers an instant alert" },
          { title: "Approved Rollout", desc: "Backups and rollback paths come first" },
        ],
        features: [
          {
            title: "Reversibility Proven",
            desc: "Every change must pass apply → revert → re-apply, so rollback is always a safe option.",
          },
          {
            title: "Automatic Drift Watch",
            desc: "If dev and prod schemas quietly diverge, the platform detects it and alerts Slack.",
          },
          {
            title: "Production Safeguards",
            desc: "Prod changes run only after manual approval and a full backup, with a rollback runbook on standby.",
          },
          {
            title: "A Lasting Process",
            desc: "Guides and runbooks make it a standard procedure that survives team changes.",
          },
        ],
        stats: [
          { value: "1", label: "Single path for schema changes" },
          { value: "16", label: "Revisions authored" },
          { value: "94", label: "Legacy SQL files archived" },
          { value: "24/7", label: "Drift monitoring & alerts" },
        ],
      },
    },
  },

  vocaro: {
    stepIcons: [icon(Notebook), icon(Sparkle), icon(FilePdf), icon(ChartLineUp)],
    featureIcons: [icon(CreditCard), icon(Robot), icon(AndroidLogo), icon(MagnifyingGlass)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2025.12 ~ 운영 중"],
          ["역할", "단독 기획·개발·운영 — 제품 기획부터 결제·마케팅 자동화까지"],
          ["기술", "Next.js · React · Supabase · TossPayments · OpenAI"],
          ["서비스", link("https://e-vocaro.com", "e-vocaro.com")],
        ],
        intro: (
          <>
            선생님이 단어장을 만들면 AI가 예문과 문제를 생성해 <Strong>시험지(PDF·Excel·Word)로
            출력</Strong>하고, 학생은 같은 단어장으로 온라인 학습을 하는 영어 학습 플랫폼입니다.
            구독 결제, 안드로이드 앱, 검색 유입 자동화까지 갖춰{" "}
            <Strong>실제 매출이 발생하는 서비스</Strong>로 운영하고 있습니다.
          </>
        ),
        flowTitle: "서비스 흐름",
        steps: [
          { title: "단어장 만들기", desc: "텍스트·엑셀로 간편 등록" },
          { title: "AI 문제 생성", desc: "예문·문제를 자동으로 생성" },
          { title: "시험지 출력", desc: "PDF·Excel·Word 3종 지원" },
          { title: "온라인 학습", desc: "채점·숙달도 추적까지" },
        ],
        features: [
          {
            title: "구독·결제 실가동",
            desc: "정기결제, 무료체험 전환, 자동갱신, 환불까지 — 결제 전 과정을 직접 구현해 운영합니다.",
          },
          {
            title: "AI 학습 기능",
            desc: "예문 자동 생성, 사진에서 단어 추출, 지문 빈칸 학습 등 AI 기능을 사용량 기반으로 제공합니다.",
          },
          {
            title: "웹 + 안드로이드 앱",
            desc: "웹을 배포하면 앱도 함께 업데이트되는 구조로, 하나의 코드로 두 채널을 운영합니다.",
          },
          {
            title: "검색 유입 자동화",
            desc: "AI로 학습 콘텐츠 페이지를 자동 생성·검수하는 SEO 파이프라인으로 방문자를 늘립니다.",
          },
        ],
        stats: [
          { value: "1인", label: "기획→개발→운영 전체" },
          { value: "운영 중", label: "구독 결제 실가동" },
          { value: "3종", label: "시험지 출력 포맷" },
          { value: "웹+앱", label: "동시 서비스 채널" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Dec 2025 – in production"],
          ["Role", "Solo: product, development, operations — through billing and marketing automation"],
          ["Stack", "Next.js · React · Supabase · TossPayments · OpenAI"],
          ["Service", link("https://e-vocaro.com", "e-vocaro.com")],
        ],
        intro: (
          <>
            Teachers build word lists, AI generates example sentences and questions, and the
            platform prints <Strong>tests as PDF, Excel, or Word</Strong> — while students study
            the same lists online. With subscriptions, an Android app, and SEO automation, it runs
            as a <Strong>revenue-generating service</Strong>.
          </>
        ),
        flowTitle: "Service Flow",
        steps: [
          { title: "Build Word Lists", desc: "Quick entry via text or Excel" },
          { title: "AI Questions", desc: "Sentences & questions auto-generated" },
          { title: "Print Tests", desc: "PDF, Excel, and Word output" },
          { title: "Study Online", desc: "Grading and mastery tracking" },
        ],
        features: [
          {
            title: "Billing in Production",
            desc: "Recurring payments, trial conversion, auto-renewal, and refunds — the full billing lifecycle, built and operated in-house.",
          },
          {
            title: "AI Study Features",
            desc: "Auto example sentences, photo-to-words extraction, and passage cloze drills, metered by a credit system.",
          },
          {
            title: "Web + Android App",
            desc: "Deploying the web updates the app too — one codebase serving both channels.",
          },
          {
            title: "SEO Automation",
            desc: "An AI pipeline generates and quality-gates learning-content pages that grow organic traffic.",
          },
        ],
        stats: [
          { value: "1 person", label: "Product to operations" },
          { value: "Live", label: "Subscriptions in production" },
          { value: "3", label: "Test output formats" },
          { value: "Web+App", label: "Channels from one codebase" },
        ],
      },
    },
  },

  "hospital-queue": {
    stepIcons: [icon(ClipboardText), icon(DeviceMobile), icon(ChatText), icon(Timer)],
    featureIcons: [icon(Clock), icon(ChartLineUp), icon(ChatText), icon(ShieldCheck)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2025.08 ~ 운영 중"],
          ["역할", "단독 개발 — 기획·개발·배포·운영"],
          ["기술", "Next.js · PostgreSQL · Docker · SMS 연동"],
          ["고객", "정형외과 의원 (실서비스 운영 중)"],
        ],
        intro: (
          <>
            병원 접수부터 호출까지를 <Strong>담당의별 대기열</Strong>로 관리하는 시스템입니다.
            환자는 앱 설치나 로그인 없이 문자로 받은 <Strong>개인 링크·QR</Strong>로 자기 순번과
            예상 대기시간을 실시간 확인하고, 순서가 다가오면 문자로 자동 안내를 받습니다.
          </>
        ),
        flowTitle: "이용 흐름",
        steps: [
          { title: "접수", desc: "직원이 진료항목과 담당의 지정" },
          { title: "실시간 확인", desc: "개인 링크·QR로 순번·대기시간" },
          { title: "호출 임박 문자", desc: "10분 전 자동 알림" },
          { title: "진료·자동 정리", desc: "영업 종료 후 대기열 자동 초기화" },
        ],
        features: [
          {
            title: "살아있는 예상 대기시간",
            desc: "진료 시작·완료 때마다 전체 대기열을 재계산해, 화면의 대기시간이 실제 진행에 맞춰 줄어듭니다.",
          },
          {
            title: "실측 기반 자동 보정",
            desc: "실제 진료 소요시간을 통계로 집계해 항목별 예상 시간을 자동으로 정확하게 다듬습니다.",
          },
          {
            title: "문자 비용까지 설계",
            desc: "중복 발송을 막고, 조건이 겹치면 문자 한 통으로 합쳐 보내 병원의 문자 비용을 아낍니다.",
          },
          {
            title: "안정 운영 체계",
            desc: "자동 배포, 상태 점검, 매일 백업까지 — 작은 시스템에도 운영 안전장치를 갖췄습니다.",
          },
        ],
        stats: [
          { value: "실운영", label: "병원 현장에서 사용 중" },
          { value: "무설치", label: "링크·QR만으로 환자 접근" },
          { value: "10분 전", label: "호출 임박 자동 문자" },
          { value: "매일", label: "자동 백업·상태 점검" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Aug 2025 – in production"],
          ["Role", "Solo: product, development, deployment, operations"],
          ["Stack", "Next.js · PostgreSQL · Docker · SMS integration"],
          ["Client", "An orthopedic clinic (live in production)"],
        ],
        intro: (
          <>
            A system that manages the journey from check-in to call-up as{" "}
            <Strong>per-doctor queues</Strong>. Patients need no app or login — a{" "}
            <Strong>personal link or QR</Strong> sent by SMS shows their place in line and
            estimated wait in real time, with an automatic text as their turn approaches.
          </>
        ),
        flowTitle: "Patient Journey",
        steps: [
          { title: "Check-In", desc: "Staff assign treatments and a doctor" },
          { title: "Live Status", desc: "Personal link/QR shows queue & ETA" },
          { title: "Call-Up SMS", desc: "Automatic text 10 minutes ahead" },
          { title: "Visit & Reset", desc: "Queues clear after closing hours" },
        ],
        features: [
          {
            title: "A Living Wait Estimate",
            desc: "Every treatment start or finish recalculates the whole queue, so on-screen ETAs shrink with real progress.",
          },
          {
            title: "Self-Correcting Durations",
            desc: "Actual treatment times are aggregated to automatically refine per-treatment estimates.",
          },
          {
            title: "SMS Costs Considered",
            desc: "Duplicate sends are blocked, and overlapping notices merge into one message to save the clinic money.",
          },
          {
            title: "Stable Operations",
            desc: "Automated deploys, health checks, and daily backups — real safeguards even for a small system.",
          },
        ],
        stats: [
          { value: "Live", label: "In daily use at the clinic" },
          { value: "No app", label: "Patients join via link/QR" },
          { value: "10 min", label: "Advance call-up SMS" },
          { value: "Daily", label: "Backups & health checks" },
        ],
      },
    },
  },

  goldluckwine: {
    stepIcons: [icon(PaintBrush), icon(Wine), icon(PencilSimple), icon(MagnifyingGlass)],
    featureIcons: [icon(PencilSimple), icon(Lightning), icon(MagnifyingGlass), icon(ShieldCheck)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2024.03 ~ 운영 중 (2026.07 전면 리뉴얼)"],
          ["역할", "단독 개발 — 디자인 시안 구현 · CMS 구축 · SEO/성능 개선"],
          ["기술", "React · TypeScript · Supabase · Vercel"],
          ["서비스", link("https://goldluckwine.com", "goldluckwine.com")],
        ],
        intro: (
          <>
            내추럴 와인 수입사의 <Strong>공식 브랜드 사이트이자 와인 카탈로그</Strong>입니다.
            디자이너 시안을 그대로 구현한 랜딩과 함께, 개발자 없이도 수입사 담당자가{" "}
            <Strong>직접 와인·와이너리를 등록·수정</Strong>할 수 있는 관리자 화면을 내장해 운영
            부담을 없앴습니다.
          </>
        ),
        flowTitle: "구성",
        steps: [
          { title: "브랜드 랜딩", desc: "디자이너 시안 그대로 구현" },
          { title: "와인 카탈로그", desc: "타입·품종·생산자 필터 검색" },
          { title: "관리자 CMS", desc: "운영자가 직접 등록·수정" },
          { title: "검색 노출", desc: "SEO·사이트맵 자동화" },
        ],
        features: [
          {
            title: "운영자 셀프 관리",
            desc: "와인 등록·이미지 업로드·홈 노출 설정까지 — 콘텐츠 수정에 개발자 개입이 필요 없습니다.",
          },
          {
            title: "성능 최적화",
            desc: "이미지 경량화(WebP)와 관리자 화면 분리 로딩으로 방문자 화면을 가볍고 빠르게 유지합니다.",
          },
          {
            title: "SEO 구조화",
            desc: "페이지별 메타데이터, 구조화 데이터, 와인 상세까지 포함하는 자동 사이트맵을 갖췄습니다.",
          },
          {
            title: "서버 없는 보안 설계",
            desc: "별도 서버 없이도 열람은 누구나, 수정은 인증된 운영자만 가능하도록 데이터 권한을 분리했습니다.",
          },
        ],
        stats: [
          { value: "운영 중", label: "goldluckwine.com 라이브" },
          { value: "3주", label: "전면 리뉴얼 완료" },
          { value: "셀프", label: "운영자 직접 콘텐츠 관리" },
          { value: "자동", label: "사이트맵·검색엔진 등록" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Mar 2024 – in production (full redesign Jul 2026)"],
          ["Role", "Solo development — pixel-faithful design build · CMS · SEO/performance"],
          ["Stack", "React · TypeScript · Supabase · Vercel"],
          ["Service", link("https://goldluckwine.com", "goldluckwine.com")],
        ],
        intro: (
          <>
            The <Strong>official brand site and wine catalog</Strong> of a natural wine importer.
            Beyond a landing page built faithfully to the designer&apos;s mockups, a built-in admin
            lets the importer&apos;s staff <Strong>add and edit wines and wineries
            themselves</Strong> — no developer needed for content.
          </>
        ),
        flowTitle: "What's Inside",
        steps: [
          { title: "Brand Landing", desc: "Built true to the design mockups" },
          { title: "Wine Catalog", desc: "Filter by type, grape, and producer" },
          { title: "Admin CMS", desc: "Owners add and edit directly" },
          { title: "Search Presence", desc: "SEO and sitemap automation" },
        ],
        features: [
          {
            title: "Self-Service Content",
            desc: "Adding wines, uploading images, featuring items on home — all without developer involvement.",
          },
          {
            title: "Performance Tuned",
            desc: "WebP images and a code-split admin keep the visitor-facing site light and fast.",
          },
          {
            title: "Structured SEO",
            desc: "Per-page metadata, structured data, and an auto-generated sitemap covering wine detail pages.",
          },
          {
            title: "Serverless Security Model",
            desc: "Row-level permissions let anyone read but only authenticated staff write — with no server to maintain.",
          },
        ],
        stats: [
          { value: "Live", label: "goldluckwine.com in production" },
          { value: "3 wks", label: "Full redesign delivered" },
          { value: "Self", label: "Owner-managed content" },
          { value: "Auto", label: "Sitemap & search registration" },
        ],
      },
    },
  },

  petblood: {
    stepIcons: [icon(Camera), icon(Robot), icon(CheckCircle), icon(Article)],
    featureIcons: [icon(ShieldCheck), icon(Scales), icon(Drop), icon(DeviceMobile)],
    copy: {
      ko: {
        metaRows: [
          ["기간", "2026.07 ~ (MVP 개발 중)"],
          ["역할", "단독 기획·설계·개발 — 사업 기획서부터 제품 명세·구현까지"],
          ["기술", "Python · Flutter · 멀티모달 AI(Claude/GPT/Gemini) · OCR"],
        ],
        intro: (
          <>
            동물병원에서 받은 혈액검사지는 수치와 영문 약어뿐이라 보호자가 읽을 수 없습니다.
            검사지를 사진으로 올리면 AI가 수치를 추출하고, <Strong>판정은 AI가 아닌 검증된
            규칙</Strong>으로만 수행해 보호자가 이해할 수 있는 한국어 리포트로 바꿔주는
            서비스입니다.
          </>
        ),
        flowTitle: "동작 방식",
        steps: [
          { title: "검사지 촬영", desc: "사진·PDF 업로드" },
          { title: "AI 수치 추출", desc: "이중 추출 교차검증" },
          { title: "규칙 기반 판정", desc: "AI 오류가 판정에 못 끼어듦" },
          { title: "쉬운 리포트", desc: "시계열 추이까지 한국어로" },
        ],
        features: [
          {
            title: "AI 오류 원천 차단",
            desc: "판정은 검증된 규칙 엔진만 수행하고 AI는 문장 다듬기만 담당 — 틀린 해석이 나갈 경로 자체를 없앴습니다.",
          },
          {
            title: "규제 준수를 코드로",
            desc: "진단·투약 표현을 자동 차단하고, 수의사 감수 완료 전에는 판정을 내보내지 않는 게이트를 두었습니다.",
          },
          {
            title: "검사항목 사전 구축",
            desc: "42개 검사항목과 211개 동의어, 종별 참고치를 사전으로 정리해 다양한 검사지 양식을 소화합니다.",
          },
          {
            title: "앱·웹 동시 개발",
            desc: "하나의 Flutter 코드로 모바일과 웹을 함께 만들고, 촬영 화질 판정으로 재촬영을 안내합니다.",
          },
        ],
        stats: [
          { value: "395개", label: "자동 테스트로 검증" },
          { value: "42항목", label: "검사항목·참고치 사전" },
          { value: "4종", label: "교체 가능한 AI 엔진" },
          { value: "MVP", label: "종단 파이프라인 완성" },
        ],
      },
      en: {
        metaRows: [
          ["Period", "Jul 2026 – (MVP in progress)"],
          ["Role", "Solo: business plan, product spec, architecture, implementation"],
          ["Stack", "Python · Flutter · multimodal AI (Claude/GPT/Gemini) · OCR"],
        ],
        intro: (
          <>
            Veterinary blood test sheets are just numbers and abbreviations — unreadable for pet
            owners. Upload a photo and AI extracts the values, but{" "}
            <Strong>verdicts come only from validated rules, never from AI</Strong> — producing a
            report owners can actually understand.
          </>
        ),
        flowTitle: "How It Works",
        steps: [
          { title: "Snap the Sheet", desc: "Photo or PDF upload" },
          { title: "AI Extraction", desc: "Dual extraction, cross-checked" },
          { title: "Rule-Based Verdicts", desc: "AI errors can't reach verdicts" },
          { title: "Friendly Report", desc: "Plain language, with trends" },
        ],
        features: [
          {
            title: "AI Hallucinations Walled Off",
            desc: "Only the rules engine issues verdicts; AI merely polishes sentences — there is no path for a wrong interpretation to ship.",
          },
          {
            title: "Compliance as Code",
            desc: "Diagnosis and medication wording is auto-blocked, and verdicts stay gated until veterinarian review completes.",
          },
          {
            title: "A Lab-Item Dictionary",
            desc: "42 test items, 211 synonyms, and per-species reference ranges absorb the variety of lab sheet formats.",
          },
          {
            title: "App & Web Together",
            desc: "One Flutter codebase ships mobile and web, with image-quality checks that prompt a retake.",
          },
        ],
        stats: [
          { value: "395", label: "Automated tests passing" },
          { value: "42", label: "Lab items in the dictionary" },
          { value: "4", label: "Swappable AI engines" },
          { value: "MVP", label: "End-to-end pipeline complete" },
        ],
      },
    },
  },
};

/* ---------- 공용 렌더러 ---------- */

function ProjectBody({ def }: { def: ProjectDef }) {
  const { language } = useLanguage();
  const t = def.copy[language];
  const st = sectionTitles[language];

  return (
    <>
      <MetaTable rows={t.metaRows} />
      <Prose>{t.intro}</Prose>

      <SubTitle>{t.flowTitle}</SubTitle>
      <StepFlow
        steps={t.steps.map((s, i) => ({ icon: def.stepIcons[i], ...s }))}
      />

      <SubTitle>{st.features}</SubTitle>
      <HighlightGrid
        items={t.features.map((f, i) => ({ icon: def.featureIcons[i], ...f }))}
      />

      <SubTitle>{st.results}</SubTitle>
      <StatCards stats={t.stats} />
    </>
  );
}

export const projectContent: Record<string, () => ReactNode> = Object.fromEntries(
  Object.entries(defs).map(([slug, def]) => [
    slug,
    function Content() {
      return <ProjectBody def={def} />;
    },
  ])
);
