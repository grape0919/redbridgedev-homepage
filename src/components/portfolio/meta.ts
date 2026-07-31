// 프로젝트 목록/메타데이터 — 서버 컴포넌트(generateMetadata 등)에서도 사용하므로 JSX 없이 순수 데이터만 둔다.

export interface ProjectMeta {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  oneLiner: string;
  role: string;
  period: string;
  seoDescription: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "ai-backend",
    num: "①",
    title: "AI 프로덕션 백엔드 풀사이클",
    tagline: "LLM 데모가 아니라, 운영 가능한 AI 서비스를 만들었다",
    oneLiner: "LLM 에이전트 → SSE 프록시 → 음성(STT/TTS)까지 AI 서비스 전 구간 구축",
    role: "백엔드 단독(76/90 커밋) + 에이전트 아키텍처 주도",
    period: "2026.03 ~ 2026.07 (진행 중)",
    seoDescription:
      "FastAPI 기반 SSE 프록시, ReAct 툴 에이전트 전환, Whisper STT/TTS 음성 파이프라인까지 — 운영 가능한 AI 서비스 백엔드를 단독 구축한 프로젝트 기록입니다.",
  },
  {
    slug: "plly-pay",
    num: "②",
    title: "자체 간편결제 'Plly Pay' & PG 공통모듈",
    tagline: "오프라인 QR 결제 시스템을 바닥부터, PG는 갈아끼울 수 있게",
    oneLiner: "오프라인 QR 결제 시스템 구축 + PG-중립 온라인 결제 게이트웨이",
    role: "최다 기여자(85/107 커밋)",
    period: "2025.04 ~ 2026.06",
    seoDescription:
      "QR 간편결제 시스템과 헥사고날 아키텍처 기반 PG-중립 결제 게이트웨이, 망취소 워커로 결제 정합성까지 확보한 결제 서버 구축 프로젝트입니다.",
  },
  {
    slug: "identity",
    num: "③",
    title: "통합 본인인증 멀티채널 전환",
    tagline: "인증 한 번을 고치기 위해 앱·웹·백엔드 3개 채널을 동시에 옮기다",
    oneLiner: "KCP 본인인증을 tx_id 기반 통합 구조로 — 앱·웹·백엔드 3채널 동시 전환",
    role: "전 채널 마이그레이션 주도",
    period: "2026.05 ~ 2026.07",
    seoDescription:
      "KCP 본인인증 V2(S2S)를 tx_id 기반 통합 인증 서버로 전환 — Flutter 앱, Next.js 웹, FastAPI 백엔드 3채널을 동시 마이그레이션하고 보안 취약점을 함께 수정했습니다.",
  },
  {
    slug: "search",
    num: "④",
    title: "한국어 매장 검색엔진 (OpenSearch)",
    tagline: "형태소 분석부터 무중단 재색인까지, 검색 인프라를 단독 설계",
    oneLiner: "OpenSearch + nori 형태소 기반 지리검색 + 무중단 재색인 파이프라인",
    role: "단독 설계·구축(25/25 커밋)",
    period: "2026.07 ~ (신규 구축)",
    seoDescription:
      "OpenSearch + nori 형태소 분석으로 매장 40만 건의 검색·자동완성·지리검색을 지탱하는 인프라를 alias 원자 스왑 기반 무중단 재색인 구조로 단독 구축했습니다.",
  },
  {
    slug: "db-migration",
    num: "⑤",
    title: "DB 마이그레이션 플랫폼",
    tagline: "개인의 습관이 아니라, 조직의 프로세스로 스키마를 지킨다",
    oneLiner: "스키마 드리프트 문제를 조직 표준 프로세스로 해결한 내부 플랫폼",
    role: "단독 설계·구축(46/49 커밋)",
    period: "2026.07 ~",
    seoDescription:
      "Alembic raw SQL 전용 마이그레이션, up-down-up 왕복 CI, 드리프트 자동 감시와 PROD 승인 게이트까지 — 스키마 변경의 유일한 통로를 확립한 내부 플랫폼입니다.",
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
