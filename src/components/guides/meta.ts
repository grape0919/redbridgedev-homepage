// 가이드(콘텐츠 마케팅) 목록/메타데이터 — 서버 컴포넌트에서 사용하므로 JSX 없이 순수 데이터만 둔다.

export interface GuideMeta {
  slug: string;
  title: string;
  /** 검색 결과에 노출되는 설명 (meta description) */
  seoDescription: string;
  /** 목록 카드에 보여줄 한 줄 요약 */
  oneLiner: string;
  /** 최초 발행일 (ISO) — JSON-LD datePublished */
  published: string;
  readingMinutes: number;
}

export const guides: GuideMeta[] = [
  {
    slug: "outsourcing-cost",
    title: "외주 개발 비용, 어떻게 산정될까? — 웹·앱 개발 비용 가이드",
    seoDescription:
      "홈페이지·웹 서비스·모바일 앱 외주 개발 비용의 산정 구조를 설명합니다. 인력 등급과 투입 기간(맨먼스) 개념, 유형별 대략적인 비용 범위, 견적을 줄이는 현실적인 방법까지 정리했습니다.",
    oneLiner: "맨먼스 개념부터 유형별 비용 범위, 견적 아끼는 법까지",
    published: "2026-08-17",
    readingMinutes: 7,
  },
  {
    slug: "mvp-development",
    title: "MVP 개발 기간과 프로세스 총정리 — 아이디어에서 출시까지",
    seoDescription:
      "MVP(최소 기능 제품) 개발은 얼마나 걸릴까요? 기획·디자인·개발·출시 각 단계별 소요 기간과 산출물, 기간을 단축하는 방법, MVP 범위를 정하는 기준을 외주 개발사 관점에서 정리했습니다.",
    oneLiner: "단계별 소요 기간과 산출물, 범위를 정하는 기준",
    published: "2026-08-17",
    readingMinutes: 6,
  },
  {
    slug: "agency-checklist",
    title: "외주 개발 업체 선정 체크리스트 10가지",
    seoDescription:
      "외주 개발 업체를 고를 때 확인해야 할 10가지 체크리스트입니다. 포트폴리오 검증법, 계약서 필수 조항, 유지보수 조건, 소스코드 소유권까지 — 실패하지 않는 개발사 선정 기준을 정리했습니다.",
    oneLiner: "포트폴리오 검증부터 소스코드 소유권까지",
    published: "2026-08-17",
    readingMinutes: 6,
  },
  {
    slug: "freelancer-vs-agency",
    title: "프리랜서 vs 에이전시 vs 인하우스 — 개발, 누구에게 맡겨야 할까",
    seoDescription:
      "외주 개발을 프리랜서에게 맡길지, 개발 에이전시에 맡길지, 직접 채용할지 고민될 때 보는 비교 가이드입니다. 각 방식의 강점과 위험, 프로젝트 유형별로 맞는 선택 기준을 정리했습니다.",
    oneLiner: "세 가지 방식의 강점·위험과 프로젝트 유형별 선택 기준",
    published: "2026-11-11",
    readingMinutes: 6,
  },
  {
    slug: "maintenance-contract",
    title: "유지보수 계약 가이드 — 출시 후 비용과 범위 정하는 법",
    seoDescription:
      "홈페이지·웹서비스·앱 출시 후 유지보수 계약을 어떻게 맺어야 할까요? 하자보수와 유지보수의 차이, 월정액·건별·시간제 계약 방식 비교, 계약서에 꼭 넣어야 할 항목을 정리했습니다.",
    oneLiner: "하자보수와의 차이, 계약 방식 비교, 계약서 필수 항목",
    published: "2026-11-11",
    readingMinutes: 6,
  },
  {
    slug: "project-brief",
    title: "견적 요청 전에 정리할 7가지 — 프로젝트 브리프 작성법",
    seoDescription:
      "개발 견적을 요청하기 전에 무엇을 정리해야 정확한 견적을 받을 수 있을까요? 목적, 사용자, 핵심 기능, 참고 서비스, 일정과 예산까지 — 한 장짜리 프로젝트 브리프 작성법과 템플릿을 제공합니다.",
    oneLiner: "정확한 견적을 받기 위한 한 장짜리 브리프와 템플릿",
    published: "2026-11-11",
    readingMinutes: 5,
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}
