// 프로젝트 목록/메타데이터 — 서버 컴포넌트(generateMetadata 등)에서도 사용하므로 JSX 없이 순수 데이터만 둔다.
// SEO 메타(title/seoDescription)는 사이트 기본 언어인 한국어를 유지하고,
// 화면 표기는 LanguageContext에 따라 ko/en 필드를 선택한다.

export interface ProjectCopy {
  title: string;
  tagline: string;
  oneLiner: string;
  role: string;
  period: string;
}

export interface ProjectMeta extends ProjectCopy {
  slug: string;
  num: string;
  seoDescription: string;
  /** production: 기업 재직 중 실서비스(비공개 저장소) / redbridge: RED BRIDGE 자체 기획·운영 프로젝트 */
  group: "production" | "redbridge";
  en: ProjectCopy;
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
    group: "production",
    en: {
      title: "Full-Cycle AI Production Backend",
      tagline: "Not an LLM demo — an AI service built to be operated",
      oneLiner: "Built the entire AI service stack: LLM agent → SSE proxy → voice (STT/TTS)",
      role: "Sole backend engineer (76/90 commits) + led agent architecture",
      period: "Mar 2026 – Jul 2026 (ongoing)",
    },
  },
  {
    slug: "payments",
    num: "②",
    title: "자체 간편결제 & PG 공통모듈",
    tagline: "오프라인 QR 결제 시스템을 바닥부터, PG는 갈아끼울 수 있게",
    oneLiner: "오프라인 QR 결제 시스템 구축 + PG-중립 온라인 결제 게이트웨이",
    role: "최다 기여자(85/107 커밋)",
    period: "2025.04 ~ 2026.06",
    seoDescription:
      "QR 간편결제 시스템과 헥사고날 아키텍처 기반 PG-중립 결제 게이트웨이, 망취소 워커로 결제 정합성까지 확보한 결제 서버 구축 프로젝트입니다.",
    group: "production",
    en: {
      title: "In-House QR Payments & PG Gateway",
      tagline: "An offline QR payment system from scratch — with swappable payment providers",
      oneLiner: "Built an offline QR payment system + provider-neutral online payment gateway",
      role: "Top contributor (85/107 commits)",
      period: "Apr 2025 – Jun 2026",
    },
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
    group: "production",
    en: {
      title: "Unified Identity Verification Migration",
      tagline: "Migrating app, web, and backend at once — to fix identity verification for good",
      oneLiner: "Unified phone identity verification behind one server — migrated 3 channels simultaneously",
      role: "Led migration across all channels",
      period: "May 2026 – Jul 2026",
    },
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
    group: "production",
    en: {
      title: "Korean Store Search Engine (OpenSearch)",
      tagline: "Search infrastructure designed solo — from morphological analysis to zero-downtime reindexing",
      oneLiner: "OpenSearch + Korean morphological analysis, geo search, zero-downtime reindex pipeline",
      role: "Designed & built solo (25/25 commits)",
      period: "Jul 2026 – (new build)",
    },
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
    group: "production",
    en: {
      title: "Database Migration Platform",
      tagline: "Protecting schemas with an organizational process, not personal habits",
      oneLiner: "An internal platform that turned schema drift into a standardized change process",
      role: "Designed & built solo (46/49 commits)",
      period: "Jul 2026 –",
    },
  },
  {
    slug: "vocaro",
    num: "⑥",
    title: "영어 학습 SaaS 'Vocaro'",
    tagline: "기획부터 결제·마케팅까지, 1인이 운영하는 진짜 SaaS",
    oneLiner: "AI 문제 생성 → 시험지 출력·온라인 학습 → 구독 결제까지 갖춘 영어 학습 플랫폼",
    role: "단독 기획·개발·운영 (e-vocaro.com)",
    period: "2025.12 ~ 운영 중",
    seoDescription:
      "단어장에서 AI로 예문·문제를 만들어 시험지(PDF/Excel/Word)로 출력하고 온라인 학습까지 제공하는 영어 학습 SaaS. 구독 결제, 안드로이드 앱, SEO 자동화까지 1인이 구축·운영합니다.",
    group: "redbridge",
    en: {
      title: "English Learning SaaS 'Vocaro'",
      tagline: "A real SaaS run by one person — from product design to payments and marketing",
      oneLiner: "AI question generation → printable tests & online study → subscription billing",
      role: "Solo: product, development, operations (e-vocaro.com)",
      period: "Dec 2025 – in production",
    },
  },
  {
    slug: "hospital-queue",
    num: "⑦",
    title: "병원 대기열 관리 시스템",
    tagline: "접수부터 호출까지, 기다림을 예측 가능하게",
    oneLiner: "담당의별 실시간 대기열 + 예상 대기시간 + 문자 자동 알림 — 정형외과에서 실제 운영 중",
    role: "단독 개발 — 기획·개발·배포·운영",
    period: "2025.08 ~ 운영 중",
    seoDescription:
      "정형외과 의원의 접수·대기·호출을 담당의별 대기열로 관리하고, 환자에게 개인 링크·QR과 문자로 실시간 대기 현황을 알려주는 웹 시스템. 실측 데이터 기반 대기시간 자동 보정까지 갖췄습니다.",
    group: "redbridge",
    en: {
      title: "Hospital Queue Management System",
      tagline: "From check-in to call-up — making the wait predictable",
      oneLiner: "Per-doctor live queues + estimated wait times + automated SMS — running at an orthopedic clinic",
      role: "Solo: product, development, deployment, operations",
      period: "Aug 2025 – in production",
    },
  },
  {
    slug: "goldluckwine",
    num: "⑧",
    title: "와인 수입사 브랜드 사이트 & CMS",
    tagline: "정적 사이트를 운영자가 직접 가꾸는 사이트로",
    oneLiner: "내추럴 와인 수입사 공식 사이트 + 와인 카탈로그 + 운영자 셀프 관리 CMS",
    role: "단독 개발 (goldluckwine.com)",
    period: "2024.03 ~ 운영 중 (2026.07 전면 리뉴얼)",
    seoDescription:
      "내추럴 와인 수입사의 공식 브랜드 사이트와 와인 카탈로그. 운영자가 개발자 없이 직접 와인·와이너리를 등록하는 CMS와 SEO·성능 최적화를 갖춰 운영 중입니다.",
    group: "redbridge",
    en: {
      title: "Wine Importer Brand Site & CMS",
      tagline: "Turning a static site into one the owner curates themselves",
      oneLiner: "Official site for a natural wine importer + catalog + self-service CMS",
      role: "Solo development (goldluckwine.com)",
      period: "Mar 2024 – in production (full redesign Jul 2026)",
    },
  },
  {
    slug: "petblood",
    num: "⑨",
    title: "반려동물 혈액검사 AI 리포트",
    tagline: "AI가 틀려도, 잘못된 판정은 나가지 않게",
    oneLiner: "검사지 사진 → AI 수치 추출 → 규칙 기반 판정 → 보호자용 쉬운 리포트 (MVP)",
    role: "단독 기획·설계·개발",
    period: "2026.07 ~ (MVP 개발 중)",
    seoDescription:
      "반려동물 혈액검사지를 사진으로 올리면 AI가 수치를 추출하고, 판정은 규칙 기반으로만 수행해 보호자가 이해할 수 있는 한국어 리포트를 만드는 서비스 MVP입니다.",
    group: "redbridge",
    en: {
      title: "Pet Blood-Test AI Report",
      tagline: "Even when AI is wrong, a wrong verdict never ships",
      oneLiner: "Photo of a lab sheet → AI extraction → rule-based verdicts → owner-friendly report (MVP)",
      role: "Solo: product, architecture, development",
      period: "Jul 2026 – (MVP in progress)",
    },
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
