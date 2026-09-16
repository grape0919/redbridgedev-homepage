"use client";

import { useEffect } from "react";
import { enablePerfLowMode, readStoredPerfLow } from "@/lib/perfMode";

// 실측 FPS 워치독.
// 접속 직후 60초 동안 1초 윈도우로 프레임을 세고,
// 연속 2개 윈도우가 임계치(42fps) 아래면 저성능 모드를 켠다.
// 탭이 백그라운드인 윈도우는 rAF가 멈추므로 판정에서 제외한다.
const FPS_THRESHOLD = 42;
const CONSECUTIVE_WINDOWS = 2;
const OBSERVE_MS = 60_000;

export default function PerfWatchdog() {
  useEffect(() => {
    if (readStoredPerfLow()) {
      enablePerfLowMode();
      return;
    }

    let rafId = 0;
    let frames = 0;
    let windowStart = performance.now();
    let badWindows = 0;
    const observeStart = windowStart;
    let stopped = false;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(rafId);
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

    rafId = requestAnimationFrame(tick);
    return stop;
  }, []);

  return null;
}
