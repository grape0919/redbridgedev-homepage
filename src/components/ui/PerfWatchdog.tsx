"use client";

import { useEffect } from "react";
import { enablePerfLowMode, readStoredPerfLow } from "@/lib/perfMode";

// 실측 FPS 워치독.
// 페이지 로딩이 끝나고 워밍업 시간이 지난 뒤부터 60초 동안 1초 윈도우로 프레임을 세고,
// 연속 3개 윈도우가 임계치(42fps) 아래면 저성능 모드를 켠다.
// - 로딩 직후(하이드레이션·폰트·채널톡·영상 디코딩 시작)는 평범한 PC도 잠깐 프레임이 떨어진다.
//   이 구간을 재면 정상 기기에서도 영상이 꺼지므로 판정에서 뺀다.
// - 탭이 백그라운드인 윈도우는 rAF가 멈추므로 판정에서 제외한다.
const FPS_THRESHOLD = 42;
const CONSECUTIVE_WINDOWS = 3;
const WARMUP_MS = 2_000;
const OBSERVE_MS = 60_000;

export default function PerfWatchdog() {
  useEffect(() => {
    if (readStoredPerfLow()) {
      enablePerfLowMode();
      return;
    }

    let rafId = 0;
    let warmupTimer = 0;
    let frames = 0;
    let windowStart = 0;
    let observeStart = 0;
    let badWindows = 0;
    let stopped = false;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(warmupTimer);
      window.removeEventListener("load", onLoad);
    };

    const tick = (now: number) => {
      if (stopped) return;
      frames++;
      const elapsed = now - windowStart;
      if (elapsed >= 1000) {
        // 백그라운드 탭에서 돌아온 직후처럼 비정상적으로 긴 윈도우는 버린다
        const validWindow = elapsed < 1500 && !document.hidden;
        const fps = (frames / elapsed) * 1000;
        if (validWindow) {
          if (fps < FPS_THRESHOLD) {
            badWindows++;
            if (badWindows >= CONSECUTIVE_WINDOWS) {
              enablePerfLowMode();
              stop();
              return;
            }
          } else {
            badWindows = 0;
          }
        }
        frames = 0;
        windowStart = now;
      }
      if (now - observeStart >= OBSERVE_MS) {
        stop();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const startObserving = () => {
      if (stopped) return;
      windowStart = observeStart = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    function onLoad() {
      warmupTimer = window.setTimeout(startObserving, WARMUP_MS);
    }

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return stop;
  }, []);

  return null;
}
