"use client";

import { ReactNode } from "react";
import {
  ArrowCounterClockwise,
  ArrowsClockwise,
  BellRinging,
  BookOpen,
  Brain,
  Broadcast,
  Bug,
  Buildings,
  ChatCircleDots,
  CheckCircle,
  CreditCard,
  Database,
  DeviceMobile,
  FloppyDisk,
  GitPullRequest,
  IdentificationCard,
  Key,
  LockKey,
  MapPin,
  Microphone,
  QrCode,
  Receipt,
  ShieldCheck,
  Sliders,
  Stack,
  Storefront,
  Swap,
  TextAa,
} from "@phosphor-icons/react";
import { MetaTable, Prose, Strong, SubTitle, StepFlow, HighlightGrid, StatCards } from "./ui";

const iconSize = 22;

/* ---------- ① AI 프로덕션 백엔드 ---------- */

function AiBackendContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.03 ~ 2026.07 (진행 중)"],
          ["역할", "백엔드 단독 구축 · AI 아키텍처 전환 주도 · 음성 파이프라인 설계"],
          ["기술", "Python · FastAPI · MySQL · OpenAI (GPT / Whisper / TTS)"],
        ]}
      />

      <Prose>
        모바일 앱 안에서 AI와 <Strong>텍스트·음성으로 실시간 대화</Strong>하는 기능을 설계부터
        프로덕션 출시·운영까지 책임지고 구축했습니다. 화려한 데모가 아니라, 수많은 사용자가 동시에
        써도 안정적으로 동작하는 <Strong>운영 가능한 AI 서비스</Strong>를 만드는 것이 목표였습니다.
      </Prose>

      <SubTitle>서비스 흐름</SubTitle>
      <StepFlow
        steps={[
          {
            icon: <ChatCircleDots size={iconSize} weight="duotone" />,
            title: "질문 입력",
            desc: "텍스트 또는 음성으로 질문",
          },
          {
            icon: <Brain size={iconSize} weight="duotone" />,
            title: "AI 추론·검색",
            desc: "데이터 기반 추천·답변 생성",
          },
          {
            icon: <Broadcast size={iconSize} weight="duotone" />,
            title: "실시간 전달",
            desc: "답변을 끊김 없이 스트리밍",
          },
          {
            icon: <FloppyDisk size={iconSize} weight="duotone" />,
            title: "안전한 기록",
            desc: "연결이 끊겨도 대화 보존",
          },
        ]}
      />

      <SubTitle>핵심 특징</SubTitle>
      <HighlightGrid
        items={[
          {
            icon: <ShieldCheck size={iconSize} weight="duotone" />,
            title: "유실 없는 대화",
            desc: "이동 중 네트워크가 끊겨도 대화 내용이 사라지지 않도록 서버가 끝까지 응답을 받아 보관합니다.",
          },
          {
            icon: <Microphone size={iconSize} weight="duotone" />,
            title: "음성 대화",
            desc: "음성 인식(STT)과 음성 합성(TTS)을 연결해 말로 묻고 음성으로 답을 듣는 경험을 제공합니다.",
          },
          {
            icon: <ArrowsClockwise size={iconSize} weight="duotone" />,
            title: "무중단 세대 교체",
            desc: "서비스를 멈추지 않고 AI 엔진 구조를 4단계에 걸쳐 최신 아키텍처로 전환했습니다.",
          },
          {
            icon: <CheckCircle size={iconSize} weight="duotone" />,
            title: "자동 품질 검증",
            desc: "AI 답변 품질을 자동으로 평가하는 체계를 갖춰, 변경 때마다 품질 저하를 사전에 걸러냅니다.",
          },
        ]}
      />

      <SubTitle>성과</SubTitle>
      <StatCards
        stats={[
          { value: "단독", label: "백엔드 전 구간 구축·운영" },
          { value: "0건", label: "네트워크 끊김에 의한 대화 유실" },
          { value: "4단계", label: "무중단 AI 아키텍처 전환" },
          { value: "출시", label: "프로덕션 앱 정식 탑재" },
        ]}
      />
    </>
  );
}

/* ---------- ② 자체 간편결제 ---------- */

function PaymentsContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2025.04 ~ 2026.06"],
          ["역할", "결제 서버 최다 기여 — 결제 게이트웨이 구축 · QR 결제 고도화 · 운영 인프라"],
          ["기술", "Python · FastAPI · MySQL · 결제 단말/PG 연동 · 암호화(AES 등)"],
        ]}
      />

      <Prose>
        고객 앱의 QR을 매장 POS로 스캔해 결제하는 <Strong>자체 간편결제 시스템</Strong>을 바닥부터
        구축했습니다. 결제사(PG)에 종속되지 않는 구조로 설계해, 새로운 결제사가 추가되어도 서비스
        전체를 고치지 않고 <Strong>부품처럼 갈아끼울 수</Strong> 있습니다.
      </Prose>

      <SubTitle>결제 흐름</SubTitle>
      <StepFlow
        steps={[
          {
            icon: <QrCode size={iconSize} weight="duotone" />,
            title: "QR 발급",
            desc: "고객 앱에 암호화된 QR 표시",
          },
          {
            icon: <Storefront size={iconSize} weight="duotone" />,
            title: "매장 스캔",
            desc: "POS가 QR을 읽어 결제 요청",
          },
          {
            icon: <CreditCard size={iconSize} weight="duotone" />,
            title: "카드 승인",
            desc: "카드사 승인까지 안전하게 중계",
          },
          {
            icon: <Receipt size={iconSize} weight="duotone" />,
            title: "완료·기록",
            desc: "영수증 출력과 거래 기록 보관",
          },
        ]}
      />

      <SubTitle>핵심 특징</SubTitle>
      <HighlightGrid
        items={[
          {
            icon: <LockKey size={iconSize} weight="duotone" />,
            title: "구간별 암호화",
            desc: "QR·통신·비밀키 저장까지 구간마다 용도에 맞는 암호화를 적용해 종단 간 보안을 확보했습니다.",
          },
          {
            icon: <Swap size={iconSize} weight="duotone" />,
            title: "결제사 교체 가능 구조",
            desc: "오프라인·온라인 결제사를 동시에 운영하며, 신규 결제사는 어댑터 하나만 만들면 연결됩니다.",
          },
          {
            icon: <ArrowCounterClockwise size={iconSize} weight="duotone" />,
            title: "실패 거래 자동 복구",
            desc: "응답을 받지 못한 애매한 거래를 자동으로 찾아 취소·복구하는 워커로 결제 정합성을 지킵니다.",
          },
          {
            icon: <BookOpen size={iconSize} weight="duotone" />,
            title: "운영까지 문서화",
            desc: "배포 패키징, 운영 런북, 장애 대응 문서까지 갖춰 사람이 바뀌어도 운영이 이어집니다.",
          },
        ]}
      />

      <SubTitle>성과</SubTitle>
      <StatCards
        stats={[
          { value: "실서비스", label: "QR 결제 전 구간 운영" },
          { value: "2개사", label: "온·오프라인 결제사 동시 운영" },
          { value: "자동", label: "실패 거래 복구 워커 내장" },
          { value: "최다", label: "결제 서버 기여자" },
        ]}
      />
    </>
  );
}

/* ---------- ③ 통합 본인인증 ---------- */

function IdentityContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.05 ~ 2026.07"],
          ["역할", "모바일 앱 · 파트너 웹 · 백엔드 3채널 동시 마이그레이션 주도"],
          ["기술", "FastAPI · 휴대폰 본인확인(S2S) · Flutter · Next.js"],
        ]}
      />

      <Prose>
        서비스마다 제각각이던 휴대폰 본인인증을 <Strong>하나의 통합 인증 서버</Strong>로 모았습니다.
        인증 결과에 개인정보가 노출되던 구조를 걷어내고, 앱·웹·백엔드{" "}
        <Strong>3개 채널을 서비스 중단 없이 동시에 전환</Strong>했습니다.
      </Prose>

      <SubTitle>인증 흐름</SubTitle>
      <StepFlow
        steps={[
          {
            icon: <DeviceMobile size={iconSize} weight="duotone" />,
            title: "인증 요청",
            desc: "앱·웹 어디서든 동일한 방식",
          },
          {
            icon: <IdentificationCard size={iconSize} weight="duotone" />,
            title: "휴대폰 본인확인",
            desc: "인증창에서 본인 명의 확인",
          },
          {
            icon: <Key size={iconSize} weight="duotone" />,
            title: "인증표 발급",
            desc: "개인정보 대신 1회용 인증표 전달",
          },
          {
            icon: <ShieldCheck size={iconSize} weight="duotone" />,
            title: "안전한 확인",
            desc: "서버 간 통신으로만 결과 조회",
          },
        ]}
      />

      <SubTitle>핵심 특징</SubTitle>
      <HighlightGrid
        items={[
          {
            icon: <Stack size={iconSize} weight="duotone" />,
            title: "3채널 동시 전환",
            desc: "백엔드 설계부터 모바일 앱, 파트너 웹까지 전 채널을 한 사람의 오너십으로 끝까지 마이그레이션했습니다.",
          },
          {
            icon: <ShieldCheck size={iconSize} weight="duotone" />,
            title: "개인정보 보호 강화",
            desc: "인증 결과에서 개인 식별정보를 제거하고, 민감정보는 짧게 보관 후 폐기하도록 재설계했습니다.",
          },
          {
            icon: <Bug size={iconSize} weight="duotone" />,
            title: "보안 취약점 4건 수정",
            desc: "명의 도용·정보 노출로 이어질 수 있던 취약점을 전환 과정에서 함께 찾아 차단했습니다.",
          },
          {
            icon: <Buildings size={iconSize} weight="duotone" />,
            title: "신규 서비스 즉시 도입",
            desc: "새 서비스는 등록만 하면 본인인증을 바로 쓸 수 있는 멀티테넌트 구조로 만들었습니다.",
          },
        ]}
      />

      <SubTitle>성과</SubTitle>
      <StatCards
        stats={[
          { value: "3채널", label: "앱·웹·백엔드 동시 전환" },
          { value: "4건", label: "보안 취약점 발견·수정" },
          { value: "1개", label: "서버로 인증 로직 통합" },
          { value: "무중단", label: "기존 회원 재인증 운영" },
        ]}
      />
    </>
  );
}

/* ---------- ④ 검색엔진 ---------- */

function SearchContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.07 ~ (신규 구축)"],
          ["역할", "단독 설계·구축"],
          ["기술", "OpenSearch · 한국어 형태소 분석 · Python 색인 배치 · MySQL"],
        ]}
      />

      <Prose>
        매장 약 40만 건을 대상으로 지도 마커·검색·자동완성을 지탱하는{" "}
        <Strong>한국어 특화 검색 인프라</Strong>를 2주 만에 단독으로 구축했습니다. 검색 구조가
        바뀌어도 <Strong>서비스를 멈추지 않고</Strong> 전체 데이터를 다시 색인할 수 있습니다.
      </Prose>

      <SubTitle>동작 방식</SubTitle>
      <StepFlow
        steps={[
          {
            icon: <Database size={iconSize} weight="duotone" />,
            title: "매장 데이터",
            desc: "40만 매장 정보 수집·조립",
          },
          {
            icon: <TextAa size={iconSize} weight="duotone" />,
            title: "한국어 분석",
            desc: "형태소·동의어·신조어 처리",
          },
          {
            icon: <MapPin size={iconSize} weight="duotone" />,
            title: "검색·지도",
            desc: "위치 기반 검색과 자동완성",
          },
          {
            icon: <ArrowsClockwise size={iconSize} weight="duotone" />,
            title: "무중단 갱신",
            desc: "운영 중에도 색인 전체 교체",
          },
        ]}
      />

      <SubTitle>핵심 특징</SubTitle>
      <HighlightGrid
        items={[
          {
            icon: <TextAa size={iconSize} weight="duotone" />,
            title: "한국어 특화 분석",
            desc: "'맛집', '카공' 같은 신조어와 복합어를 정확히 이해하도록 사전과 동의어를 직접 설계했습니다.",
          },
          {
            icon: <MapPin size={iconSize} weight="duotone" />,
            title: "위치 기반 검색",
            desc: "지도 화면 범위와 거리 기준 검색으로 '지금 내 주변' 매장을 빠르게 찾아줍니다.",
          },
          {
            icon: <ArrowsClockwise size={iconSize} weight="duotone" />,
            title: "무중단 재색인",
            desc: "새 색인을 미리 만들어 검증한 뒤 한 번에 교체하는 방식으로, 실패해도 기존 검색에 영향이 없습니다.",
          },
          {
            icon: <Sliders size={iconSize} weight="duotone" />,
            title: "운영 중 품질 튜닝",
            desc: "동의어·사용자 사전을 재색인 없이 갱신할 수 있어 검색 품질을 빠르게 개선합니다.",
          },
        ]}
      />

      <SubTitle>성과</SubTitle>
      <StatCards
        stats={[
          { value: "40만", label: "검색 대상 매장" },
          { value: "2주", label: "0→1 단독 구축" },
          { value: "0회", label: "재색인 중 서비스 중단" },
          { value: "분리", label: "품질 튜닝과 재색인 사이클" },
        ]}
      />
    </>
  );
}

/* ---------- ⑤ DB 마이그레이션 ---------- */

function DbMigrationContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.07 ~"],
          ["역할", "단독 설계·구축 — 프로세스 + CI/CD + 가이드 문서"],
          ["기술", "Alembic · MySQL · GitHub Actions · Slack 알림"],
        ]}
      />

      <Prose>
        팀마다 제각각 DB를 수정하다 생기던 <Strong>환경 간 불일치와 이력 부재</Strong> 문제를, 모든
        스키마 변경이 <Strong>검증과 승인을 거쳐 한 통로로만</Strong> 흐르도록 만든 내부 플랫폼으로
        해결했습니다. 개인의 습관이 아니라 조직의 프로세스로 데이터를 지킵니다.
      </Prose>

      <SubTitle>변경 절차</SubTitle>
      <StepFlow
        steps={[
          {
            icon: <GitPullRequest size={iconSize} weight="duotone" />,
            title: "변경 요청",
            desc: "모든 변경은 PR로 제출",
          },
          {
            icon: <CheckCircle size={iconSize} weight="duotone" />,
            title: "자동 검증",
            desc: "적용·되돌림을 미리 왕복 테스트",
          },
          {
            icon: <BellRinging size={iconSize} weight="duotone" />,
            title: "개발 적용·감시",
            desc: "불일치가 생기면 즉시 알림",
          },
          {
            icon: <ShieldCheck size={iconSize} weight="duotone" />,
            title: "승인 후 운영 반영",
            desc: "백업과 롤백 경로 확보 후 적용",
          },
        ]}
      />

      <SubTitle>핵심 특징</SubTitle>
      <HighlightGrid
        items={[
          {
            icon: <ArrowsClockwise size={iconSize} weight="duotone" />,
            title: "되돌림까지 검증",
            desc: "모든 변경은 적용→되돌림→재적용을 통과해야 하므로, 언제든 안전하게 롤백할 수 있습니다.",
          },
          {
            icon: <BellRinging size={iconSize} weight="duotone" />,
            title: "불일치 자동 감시",
            desc: "개발·운영 DB가 몰래 어긋나면 자동으로 감지해 Slack으로 알립니다.",
          },
          {
            icon: <ShieldCheck size={iconSize} weight="duotone" />,
            title: "운영 반영 안전장치",
            desc: "운영 DB에는 수동 승인과 전체 백업을 거친 뒤에만 적용되고, 실패 시 롤백 절차가 준비되어 있습니다.",
          },
          {
            icon: <BookOpen size={iconSize} weight="duotone" />,
            title: "프로세스로 정착",
            desc: "가이드 문서와 롤백 런북을 갖춰, 담당자가 바뀌어도 유지되는 표준 절차로 자리잡았습니다.",
          },
        ]}
      />

      <SubTitle>성과</SubTitle>
      <StatCards
        stats={[
          { value: "1개", label: "스키마 변경의 유일한 통로" },
          { value: "16개", label: "직접 작성한 리비전" },
          { value: "94개", label: "레거시 SQL 파일 정리·보존" },
          { value: "상시", label: "불일치 자동 감시·경보" },
        ]}
      />
    </>
  );
}

export const projectContent: Record<string, () => ReactNode> = {
  "ai-backend": AiBackendContent,
  payments: PaymentsContent,
  identity: IdentityContent,
  search: SearchContent,
  "db-migration": DbMigrationContent,
};
