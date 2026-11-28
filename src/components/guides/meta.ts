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
{ slug: "ax-weekly-report-baseline", title: "AX 전환, 주간 보고서의 숫자가 서로 다르면 무엇부터 맞출까요?", seoDescription: "영업팀은 주문일, 운영팀은 출고일을 기준으로 주간 실적을 냅니다. 금요일 주문이 월요일에 출고되면 두 표가 달라집니다. AI로 보고서를 요약해도 이 차이는 그대로 남습니다.", oneLiner: "영업팀은 주문일, 운영팀은 출고일을 기준으로 주간 실적을 냅니다. 금요일 주문이 월요일에 출고되면 두 표가 달라집니다. AI로 보고서를 요약해도 이 차이는 그대로 남습니다.", published: "2026-11-28", readingMinutes: 3 },
{ slug: "ai-outsourcing-usage-cost", title: "AI 외주사 견적 비교, 월 사용량이 바뀌면 얼마가 달라질까요?", seoDescription: "AI 외주사 견적을 비교할 때는 첫 달에 지불할 금액과 그다음 달부터 드는 비용을 나눠 보세요. 문서 요약 도구를 예로 들면 개발과 배포는 한 번 맡길 수 있지만, 문서를 처리할 때마다 모델 사용료가 생길 수 있습니다. 어느 계정에서 누구에게 청구되는지도 계약 전에 확인할 항목입니다.", oneLiner: "AI 외주사 견적을 비교할 때는 첫 달에 지불할 금액과 그다음 달부터 드는 비용을 나눠 보세요. 문서 요약 도구를 예로 들면 개발과 배포는 한 번 맡길 수 있지만, 문서를 처리할 때마다 모델 사용료가 생길 수 있습니다. 어느 계정에서 누구에게 청구되는지도 계약 전에 확인할 항목입니다.", published: "2026-11-22", readingMinutes: 3 },
{ slug: "business-system-migration", title: "엑셀에서 업무 시스템으로 전환할 때, 기존 자료와 진행 중인 업무는 어떻게 옮길까요?", seoDescription: "업무 시스템 전환에 필요한 이전 대상 정리, 시험 이전, 결과 대조, 담당자 확인과 운영 전환 기준을 설명합니다.", oneLiner: "업무 시스템 전환에 필요한 이전 대상 정리, 시험 이전, 결과 대조, 담당자 확인과 운영 전환 기준을 설명합니다.", published: "2026-11-14", readingMinutes: 4 },
{ slug: "subscription-service-operations", title: "정기결제 서비스 개발, 갱신 실패와 이용 상태를 어떻게 연결할까요?", seoDescription: "정기결제 서비스에서 갱신 성공·실패, 고객 안내, 재시도, 이용 유예와 해지 후 종료 시점을 정하는 방법을 설명합니다.", oneLiner: "정기결제 서비스에서 갱신 성공·실패, 고객 안내, 재시도, 이용 유예와 해지 후 종료 시점을 정하는 방법을 설명합니다.", published: "2026-11-14", readingMinutes: 4 },
{ slug: "partner-settlement-system", title: "파트너 정산 시스템 구축, 계산부터 확정·명세서까지 연결하려면", seoDescription: "파트너별 수수료 규칙과 조정 내역을 관리하고 거래 집계, 예외 검토, 정산 확정, 명세서 생성까지 연결하는 구축 범위입니다.", oneLiner: "파트너별 수수료 규칙과 조정 내역을 관리하고 거래 집계, 예외 검토, 정산 확정, 명세서 생성까지 연결하는 구축 범위입니다.", published: "2026-11-14", readingMinutes: 4 },
{ slug: "b2b-order-portal", title: "거래처 주문 포털 개발, 접수와 진행 상태를 한곳에서 관리하려면", seoDescription: "전화·메일·엑셀 주문을 거래처 포털로 옮길 때 접수, 운영자 확인, 상태 조회와 거래처별 접근 범위를 정리합니다.", oneLiner: "전화·메일·엑셀 주문을 거래처 포털로 옮길 때 접수, 운영자 확인, 상태 조회와 거래처별 접근 범위를 정리합니다.", published: "2026-11-14", readingMinutes: 4 },
{slug: "ax-adoption-and-operations", "title": "AX 도구를 만든 뒤, 누가 어떻게 운영하나요?", "seoDescription": "AX 도구를 실제 업무에 정착시키기 위한 사용 안내, 오류 접수, 변경 관리, 사용료와 운영 역할의 협의 항목을 정리합니다.", "oneLiner": "AX 도구를 실제 업무에 정착시키기 위한 사용 안내, 오류 접수, 변경 관리, 사용료와 운영 역할의 협의 항목을 정리합니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "ax-first-workflow-pilot", "title": "AX 전환, 첫 업무 하나는 어떻게 고를까요?", "seoDescription": "반복 빈도, 데이터 접근, 결과 확인 방법을 기준으로 첫 AX 업무를 고르고 담당자 검토 시간을 포함해 시범 적용 효과를 비교하는 방법입니다.", "oneLiner": "반복 빈도, 데이터 접근, 결과 확인 방법을 기준으로 첫 AX 업무를 고르고 담당자 검토 시간을 포함해 시범 적용 효과를 비교하는 방법입니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "ai-service-backend-integration", "title": "AI 시연은 됐는데, 실제 서비스 연결은 어디까지 해야 할까요?", "seoDescription": "AI 응답 전달과 저장을 분리한 백엔드 개발 경험을 바탕으로, 앱·웹서비스 연동과 운영 범위를 정할 때 확인할 항목을 소개합니다.", "oneLiner": "AI 응답 전달과 저장을 분리한 백엔드 개발 경험을 바탕으로, 앱·웹서비스 연동과 운영 범위를 정할 때 확인할 항목을 소개합니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "ai-document-review-workflow", "title": "문서 검토, AI에게 어디까지 맡겨도 될까요?", "seoDescription": "문서의 계산·필수 항목 검증과 내용 요약을 나누고, 원문 근거와 담당자 확인을 연결하는 업무 자동화 범위를 살펴봅니다.", "oneLiner": "문서의 계산·필수 항목 검증과 내용 요약을 나누고, 원문 근거와 담당자 확인을 연결하는 업무 자동화 범위를 살펴봅니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "ai-work-data-access", "title": "데이터가 필요할 때마다 개발팀에 요청하고 있나요?", "seoDescription": "DB·GA4를 AI 도구에 연결한 재직 중 경험을 바탕으로, 담당자가 직접 데이터를 확인하는 업무 흐름과 도입 전 검토 항목을 소개합니다.", "oneLiner": "DB·GA4를 AI 도구에 연결한 재직 중 경험을 바탕으로, 담당자가 직접 데이터를 확인하는 업무 흐름과 도입 전 검토 항목을 소개합니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "ax-start-with-workflow", "title": "AI를 도입했는데, 업무는 왜 그대로일까요?", "seoDescription": "AX 전환을 도구 도입에서 실제 업무 변화로 이어가려면 데이터 연결, 담당자 확인, 결과 반영까지 함께 정해야 합니다. 첫 검토 항목을 소개합니다.", "oneLiner": "AX 전환을 도구 도입에서 실제 업무 변화로 이어가려면 데이터 연결, 담당자 확인, 결과 반영까지 함께 정해야 합니다. 첫 검토 항목을 소개합니다.", "published": "2026-11-14", "readingMinutes": 4},
{slug: "erp-order-integration", title: "ERP는 그대로 쓰면서 반복 입력만 줄일 수 있을까요?", seoDescription: "주문 정보를 ERP와 출고 관리에 연결할 때 원본 기준, 전달 항목, 실패 확인과 중복 재전달 방지 범위를 정리합니다.", oneLiner: "주문 정보를 ERP와 출고 관리에 연결할 때 원본 기준, 전달 항목, 실패 확인과 중복 재전달 방지 범위를 정리합니다.", published: "2026-11-13", readingMinutes: 4},
{slug: "external-data-management", title: "외부 데이터 수집 시스템, 모으는 기능 다음에는 무엇이 필요할까요?", seoDescription: "외부 자료의 출처와 이용 조건을 확인하고 수집·중복 정리·검색·갱신 실패 점검까지 연결하는 프로젝트 범위를 설명합니다.", oneLiner: "외부 자료의 출처와 이용 조건을 확인하고 수집·중복 정리·검색·갱신 실패 점검까지 연결하는 프로젝트 범위를 설명합니다.", published: "2026-11-13", readingMinutes: 4},
{slug: "business-dashboard-decisions", title: "매출 대시보드 구축, 대표와 실무자가 같은 화면을 봐야 할까요?", seoDescription: "매출 추이를 보는 경영자와 처리할 주문을 찾는 운영자의 목적을 나누고, 공통 집계 기준과 상세 목록 연결을 설계하는 방법입니다.", oneLiner: "매출 추이를 보는 경영자와 처리할 주문을 찾는 운영자의 목적을 나누고, 공통 집계 기준과 상세 목록 연결을 설계하는 방법입니다.", published: "2026-11-12", readingMinutes: 4},
{slug: "payment-order-integration", title: "결제 연동 개발, 주문·취소·환불까지 어디를 연결해야 할까요?", seoDescription: "결제창 연결 이후 필요한 주문 상태 반영, 결과 재확인, 중복 처리 방지, 취소·환불 확인 범위를 정리합니다.", oneLiner: "결제창 연결 이후 필요한 주문 상태 반영, 결과 재확인, 중복 처리 방지, 취소·환불 확인 범위를 정리합니다.", published: "2026-11-12", readingMinutes: 4},
{slug: "existing-settlement-improvement", title: "정산 시스템이 있는데도 엑셀로 다시 계산한다면, 어디부터 개선할까요?", seoDescription: "기존 정산 시스템 밖에 남은 추가 수수료와 예외 계산을 파악하고, 검토·확정·결과 전달까지 연결하는 개선 범위를 설명합니다.", oneLiner: "기존 정산 시스템 밖에 남은 추가 수수료와 예외 계산을 파악하고, 검토·확정·결과 전달까지 연결하는 개선 범위를 설명합니다.", published: "2026-11-11", readingMinutes: 4},
{slug: "excel-order-consolidation", title: "엑셀 업무 자동화, 매일 취합하는 주문서부터 시스템으로 바꾸려면", seoDescription: "거래처별 주문 파일을 모으는 업무를 시스템으로 옮길 때 필요한 파일 형식, 중복 기준, 예외 검토와 첫 개발 범위를 정리합니다.", oneLiner: "거래처별 주문 파일을 모으는 업무를 시스템으로 옮길 때 필요한 파일 형식, 중복 기준, 예외 검토와 첫 개발 범위를 정리합니다.", published: "2026-11-11", readingMinutes: 4},
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
