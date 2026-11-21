"use client";

import { useEffect } from "react";

/* 스크롤하는 동안 호버를 잠시 끈다.
   휠 스크롤 중에도 마우스는 화면 위에 있어서, 그 아래로 지나가는 카드·링크마다
   호버(카드 떠오름·빛 번짐·글자색 전환)가 켜졌다 꺼지며 매 프레임 다시 그려졌다.
   실측(2026-11, 라이브): 스크롤 평균 38fps → 호버 차단 시 50fps, p95 프레임 50ms → 33ms.
   스크롤이 멈추고 150ms 뒤 다시 켠다 — 호버 효과 자체는 그대로다. */
const IDLE_MS = 150;

export default function ScrollHoverGuard() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    let on = false;
    const onScroll = () => {
      if (!on) {
        on = true;
        root.setAttribute("data-scrolling", "");
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        on = false;
        root.removeAttribute("data-scrolling");
      }, IDLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      root.removeAttribute("data-scrolling");
    };
  }, []);
  return null;
}
