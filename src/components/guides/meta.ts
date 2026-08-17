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
];

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}
