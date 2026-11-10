// GA4 연동.
// 측정 ID(G-XXXXXXXXXX)를 아래 상수에 넣으면 layout이 gtag 스크립트를 로드하고
// trackEvent가 동작한다. 비어 있으면 스크립트도 로드되지 않고 모든 호출이 no-op이다.
export const GA_MEASUREMENT_ID: string = "";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * 전환·행동 이벤트 기록. 사용 중인 이벤트:
 * - generate_lead   문의 폼 제출 (method: channel_talk | email)
 * - chat_open       실시간 채팅 열기 (location)
 * - cta_click       주요 CTA 클릭 (location, label)
 * - select_content  포트폴리오·가이드 카드 클릭 (content_type, item_id)
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
