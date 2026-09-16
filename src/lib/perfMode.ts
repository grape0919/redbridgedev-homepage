// 적응형 성능 모드 스토어.
// PerfWatchdog가 실측 FPS를 근거로 low 모드를 켜면,
// <html data-perf="low"> 속성(CSS용)과 이 스토어(React용)가 함께 갱신된다.
// 하드웨어 스펙 추정(hardwareConcurrency 등)과 달리 실제 프레임 기준이라
// "코어는 많은데 GPU가 약한" PC도 잡아낸다.

const listeners = new Set<() => void>();
let low = false;

const STORAGE_KEY = "perf-mode";

export function readStoredPerfLow(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "low";
  } catch {
    return false;
  }
}

export function getPerfLowSnapshot(): boolean {
  return low;
}

export function getPerfLowServerSnapshot(): boolean {
  return false;
}

export function subscribePerfMode(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function enablePerfLowMode() {
  if (low) return;
  low = true;
  document.documentElement.setAttribute("data-perf", "low");
  try {
    sessionStorage.setItem(STORAGE_KEY, "low");
  } catch {
    // 저장 실패는 무시
  }
  listeners.forEach((listener) => listener());
}
