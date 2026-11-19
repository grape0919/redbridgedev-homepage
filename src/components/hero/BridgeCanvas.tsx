"use client";

import { useEffect, useRef } from "react";

/* 히어로 배경의 와이어프레임 다리 — 2D 캔버스에 직접 원근 투영해서 그린다.
   three.js(WebGL)를 쓰지 않는 이유 (2026-11): 선과 점만 그리고 조작도 받지 않는데
   그 일에 압축 226KB짜리 묶음과 WebGL 초기화 끊김을 치르고 있었다. 같은 장면을 계산 몇 줄로 그린다.

   장면:
   - 카메라 (8,4,8) → 원점 주시, 세로 시야각 50도
   - 전체가 120초에 한 바퀴 회전, 그리는 동안은 약 50도 돌아 들어온다(감속)
   - 다리는 y=-1에 놓이고 살짝 좌우로 흔들린다. 주변에 떠다니는 점 200개, 바닥(y=-3) 그리드

   임팩트 연출 (2026-11, 전부 2D 캔버스 — 필터·shadowBlur 없이 겹쳐 그리기만 쓴다):
   - 펜 끝의 빛: 그려지는 선 끝에 밝은 점, 막 그려진 선은 잠깐 환하게
   - 완성 순간 다리 전체가 한 번 번쩍였다 가라앉는다
   - 다리를 건너는 불빛: 케이블·상판을 따라 흐르는 빛과 꼬리
   - 마우스 시점 반응: 포인터를 따라 살짝 돌고 기운다
   - 깊이감: 가까운 선은 밝게, 먼 선은 어둡게 + 선 주위 옅은 번짐(굵은 반투명 선을 밑에 겹침) */

const DRAW_MS = 3000;
const DRAW_DELAY_MS = 500;
const FLASH_MS = 900;
const FRAME_MS = 1000 / 30;
const LOW_FRAME_MS = 1000 / 20;
const INTRO_SWING = 0.9; // 그리는 동안 돌아 들어오는 각도(rad, 약 50도)
const FOV = (50 * Math.PI) / 180;
const NEAR = 0.1;
const CAM: [number, number, number] = [8, 4, 8];
const PARALLAX_YAW = 0.14; // 마우스 좌우 → 회전(rad)
const PARALLAX_PITCH = 0.05; // 마우스 상하 → 기울기(rad)
const PEN_TRAIL = 12; // 펜 끝 뒤로 환하게 남는 선 개수
// 깊이 구간(카메라로부터의 거리)과 구간별 밝기
const DEPTH_BINS = [10.5, 13.5];
const DEPTH_ALPHA = [1, 0.7, 0.42];

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

type V3 = [number, number, number];

/** 다리 선분(점 2개가 선 하나, 그려지는 순서대로), 꼭짓점, 불빛이 흐를 경로 */
function buildBridge() {
  const points: V3[] = [];
  const indices: number[] = [];
  const paths: V3[][] = [];

  const deckLength = 12;
  const deckWidth = 3;
  const deckSegments = 20;

  const deckLeft: V3[] = [];
  const deckRight: V3[] = [];
  for (let i = 0; i <= deckSegments; i++) {
    const x = (i / deckSegments) * deckLength - deckLength / 2;
    const curve = Math.sin((i / deckSegments) * Math.PI) * 0.3;
    const l: V3 = [x, curve, -deckWidth / 2];
    const r: V3 = [x, curve, deckWidth / 2];
    points.push(l, r);
    deckLeft.push(l);
    deckRight.push(r);
    if (i < deckSegments) {
      const b = i * 2;
      indices.push(b, b + 1);
      if (i > 0) indices.push(b - 2, b, b - 1, b + 1);
    }
  }
  paths.push(deckLeft, deckRight);

  const towerHeight = 4;
  const baseOffset = points.length;
  [-deckLength / 3, deckLength / 3].forEach((towerX, towerIdx) => {
    const t = baseOffset + towerIdx * 8;
    const curve = Math.sin(((towerX + deckLength / 2) / deckLength) * Math.PI) * 0.3;
    const legs = [
      [-0.3, -deckWidth / 2 + 0.3],
      [0.3, -deckWidth / 2 + 0.3],
      [-0.3, deckWidth / 2 - 0.3],
      [0.3, deckWidth / 2 - 0.3],
    ];
    legs.forEach(([dx, dz]) => points.push([towerX + dx, curve, dz]));
    legs.forEach(([dx, dz]) => points.push([towerX + dx * 0.3, towerHeight + curve, dz * 0.3]));
    for (let i = 0; i < 4; i++) indices.push(t + i, t + 4 + i);
    indices.push(t, t + 1, t + 2, t + 3, t, t + 2, t + 1, t + 3);
    indices.push(t + 4, t + 5, t + 6, t + 7, t + 4, t + 6, t + 5, t + 7);
    indices.push(t, t + 5, t + 1, t + 4, t + 2, t + 7, t + 3, t + 6);
  });

  const cableBase = points.length;
  const cableSegments = 15;
  const mainCableHeight = towerHeight + 0.5;
  const cableY = (t: number) => mainCableHeight - 4 * mainCableHeight * 0.6 * (t - 0.5) * (t - 0.5);
  [-deckWidth / 2 + 0.3, deckWidth / 2 - 0.3].forEach((z, cableIdx) => {
    const start = cableBase + cableIdx * (cableSegments + 1);
    const cable: V3[] = [];
    for (let i = 0; i <= cableSegments; i++) {
      const t = i / cableSegments;
      const p: V3 = [t * deckLength - deckLength / 2, cableY(t) + Math.sin(t * Math.PI) * 0.15, z];
      points.push(p);
      cable.push(p);
      if (i > 0) indices.push(start + i - 1, start + i);
    }
    paths.push(cable);
  });

  const hangerBase = points.length;
  const hangerCount = 10;
  [-deckWidth / 2 + 0.3, deckWidth / 2 - 0.3].forEach((z, sideIdx) => {
    for (let i = 1; i < hangerCount; i++) {
      const t = i / hangerCount;
      const x = t * deckLength - deckLength / 2;
      const deckCurve = Math.sin(t * Math.PI) * 0.3;
      const idx = hangerBase + sideIdx * (hangerCount - 1) * 2 + (i - 1) * 2;
      points.push([x, cableY(t) + deckCurve * 0.5, z], [x, deckCurve, z]);
      indices.push(idx, idx + 1);
    }
  });

  return { lines: indices.map((i) => points[i]), vertices: points, paths };
}

/** 바닥 그리드 선분 (30×30칸, y=-3) */
function buildGrid(): V3[] {
  const g: V3[] = [];
  for (let i = -15; i <= 15; i++) {
    g.push([i, -3, -15], [i, -3, 15], [-15, -3, i], [15, -3, i]);
  }
  return g;
}

/** 떠다니는 점 — 회전 궤도상 카메라(반경 약 11.3, 높이 4) 근처는 화면에 큰 네모로 보여서 피한다 */
function buildFloating(): V3[] {
  const a: V3[] = [];
  for (let i = 0; i < 200; i++) {
    let p: V3 = [0, 0, 0];
    for (let tries = 0; tries < 20; tries++) {
      p = [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30];
      if (Math.abs(Math.hypot(p[0], p[2]) - 11.3) > 3 || Math.abs(p[1] - 4) > 3) break;
    }
    a.push(p);
  }
  return a;
}

/** 다리를 건너는 불빛 — 경로(0·1 상판, 2·3 케이블), 속도(초당 경로 비율), 시작 위치, 방향 */
const PULSES = [
  { path: 2, speed: 0.11, offset: 0.0, dir: 1 },
  { path: 3, speed: 0.09, offset: 0.55, dir: -1 },
  { path: 0, speed: 0.16, offset: 0.2, dir: 1 },
  { path: 1, speed: 0.14, offset: 0.7, dir: -1 },
  { path: 0, speed: 0.19, offset: 0.62, dir: 1 },
  { path: 1, speed: 0.17, offset: 0.1, dir: -1 },
];
const PULSE_TRAIL = 7;

// 카메라 기저 (원점을 바라봄, 위쪽 = +y)
const camBasis = (() => {
  const len = Math.hypot(...CAM);
  const f: V3 = [-CAM[0] / len, -CAM[1] / len, -CAM[2] / len];
  // right = f × up(0,1,0)
  let r: V3 = [-f[2], 0, f[0]];
  const rl = Math.hypot(...r);
  r = [r[0] / rl, 0, r[2] / rl];
  // up = r × f
  const u: V3 = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
  return { f, r, u };
})();

/**
 * @param lowFps 느린 기기 — 20fps로 그린다
 * @param active 화면에 보이는지 (false면 그리기를 멈춘다)
 */
export default function BridgeCanvas({ lowFps = false, active = true }: { lowFps?: boolean; active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lowFpsRef = useRef(lowFps);
  const activeRef = useRef(active);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    lowFpsRef.current = lowFps;
    activeRef.current = active;
    if (active) wakeRef.current();
  }, [lowFps, active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx: CanvasRenderingContext2D = context;

    const bridge = buildBridge();
    const grid = buildGrid();
    const floating = buildFloating();
    const lineCam = new Float32Array(bridge.lines.length * 3);
    const vertCam = new Float32Array(bridge.vertices.length * 3);
    const gridCam = new Float32Array(grid.length * 3);
    const floatCam = new Float32Array(floating.length * 3);
    const tmp = new Float32Array(3);

    let width = 0, height = 0, focal = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = height / 2 / Math.tan(FOV / 2);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    // 마우스 시점 반응 — 목표값만 기록하고, 그릴 때 부드럽게 따라간다
    let targetX = 0, targetY = 0, lookX = 0, lookY = 0;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // 프레임마다 갱신되는 시점 값 (toCam이 참조)
    let pitchC = 1, pitchS = 0;

    /** 월드 좌표 → 카메라 좌표 (x 오른쪽, y 위, z 앞쪽 깊이). 마우스 기울기(pitch) 포함 */
    const toCam = (x: number, y: number, z: number, out: Float32Array, o: number) => {
      const dx = x - CAM[0], dy = y - CAM[1], dz = z - CAM[2];
      const { f, r, u } = camBasis;
      const cx = dx * r[0] + dy * r[1] + dz * r[2];
      const cy = dx * u[0] + dy * u[1] + dz * u[2];
      const cz = dx * f[0] + dy * f[1] + dz * f[2];
      out[o] = cx;
      out[o + 1] = cy * pitchC - cz * pitchS;
      out[o + 2] = cy * pitchS + cz * pitchC;
    };

    /** 선분 하나를 경로에 추가한다. 카메라 앞면(NEAR)에서 잘라 뒤로 넘어간 부분은 버린다. */
    const addSegment = (path: Path2D | CanvasRenderingContext2D, cam: Float32Array, i: number) => {
      let ax = cam[i * 3], ay = cam[i * 3 + 1], az = cam[i * 3 + 2];
      let bx = cam[i * 3 + 3], by = cam[i * 3 + 4], bz = cam[i * 3 + 5];
      if (az < NEAR && bz < NEAR) return;
      if (az < NEAR) {
        const t = (NEAR - az) / (bz - az);
        ax += (bx - ax) * t; ay += (by - ay) * t; az = NEAR;
      } else if (bz < NEAR) {
        const t = (NEAR - bz) / (az - bz);
        bx += (ax - bx) * t; by += (ay - by) * t; bz = NEAR;
      }
      const cx = width / 2, cy = height / 2;
      path.moveTo(cx + (ax * focal) / az, cy - (ay * focal) / az);
      path.lineTo(cx + (bx * focal) / bz, cy - (by * focal) / bz);
    };

    /** 점 묶음을 한 번에 채운다. 크기는 깊이에 반비례 */
    const fillPoints = (cam: Float32Array, count: number, size: number) => {
      const cx = width / 2, cy = height / 2;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const z = cam[i * 3 + 2];
        if (z < NEAR) continue;
        const s = Math.min((size * height) / 2 / z, 24);
        if (s < 0.3) continue;
        ctx.rect(cx + (cam[i * 3] * focal) / z - s / 2, cy - (cam[i * 3 + 1] * focal) / z - s / 2, s, s);
      }
      ctx.fill();
    };

    /** 부드러운 빛 점 (방사형 그라데이션 — 필터 없음) */
    const glowDot = (x: number, y: number, radius: number, r: number, g: number, b: number, alpha: number) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    let startMs: number | null = null;
    function draw(now: number) {
      if (startMs === null) startMs = now;
      const elapsed = now - startMs;
      const t = elapsed / 1000;
      const progress = Math.min(Math.max((elapsed - DRAW_DELAY_MS) / DRAW_MS, 0), 1);
      const sinceDone = elapsed - DRAW_DELAY_MS - DRAW_MS; // 다 그린 뒤 지난 시간(ms)

      // 마우스 시점: 목표를 부드럽게 따라간다
      lookX += (targetX - lookX) * 0.08;
      lookY += (targetY - lookY) * 0.08;
      const pitch = lookY * PARALLAX_PITCH;
      pitchC = Math.cos(pitch);
      pitchS = Math.sin(pitch);

      // 전체 회전: 그리는 동안 INTRO_SWING만큼 돌아 들어오고, 이후 120초에 한 바퀴 + 마우스 좌우
      const rootA = (t * Math.PI * 2) / 120 - (1 - easeOutCubic(progress)) * INTRO_SWING + lookX * PARALLAX_YAW;
      const rc = Math.cos(rootA), rs = Math.sin(rootA);
      // 다리 흔들림
      const wobble = Math.sin(t * 0.2) * 0.1;
      const wc = Math.cos(wobble), ws = Math.sin(wobble);
      // 떠다니는 점 무리 회전 (Rx · Ry · v)
      const fy = t * 0.02, fx = t * 0.01;
      const fyc = Math.cos(fy), fys = Math.sin(fy), fxc = Math.cos(fx), fxs = Math.sin(fx);

      const placeBridge = (x: number, y: number, z: number, out: Float32Array, o: number) => {
        // 다리 그룹: y축 흔들림 → y -1 이동 → 전체 회전
        const x1 = x * wc + z * ws, z1 = -x * ws + z * wc;
        toCam(x1 * rc + z1 * rs, y - 1, -x1 * rs + z1 * rc, out, o);
      };
      bridge.lines.forEach((p, i) => placeBridge(p[0], p[1], p[2], lineCam, i * 3));
      bridge.vertices.forEach((p, i) => placeBridge(p[0], p[1], p[2], vertCam, i * 3));
      grid.forEach((p, i) => toCam(p[0] * rc + p[2] * rs, p[1], -p[0] * rs + p[2] * rc, gridCam, i * 3));
      floating.forEach((p, i) => {
        const x1 = p[0] * fyc + p[2] * fys, z1 = -p[0] * fys + p[2] * fyc; // Ry
        const y2 = p[1] * fxc - z1 * fxs, z2 = p[1] * fxs + z1 * fxc; // Rx
        toCam(x1 * rc + z2 * rs, y2, -x1 * rs + z2 * rc, floatCam, i * 3);
      });

      const cx = width / 2, cy = height / 2;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      // 바닥 그리드
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#1a1a1a";
      ctx.beginPath();
      for (let i = 0; i + 1 < grid.length; i += 2) addSegment(ctx, gridCam, i);
      ctx.stroke();

      // 떠다니는 점
      ctx.fillStyle = "rgba(220, 38, 38, 0.4)";
      fillPoints(floatCam, floating.length, 0.05);

      // 다리 선 — 깊이 구간별로 묶어 가까운 선은 밝게, 먼 선은 어둡게.
      // 각 구간은 굵은 반투명 선(번짐)을 먼저 깔고 그 위에 가는 선을 그린다.
      const visibleLines = Math.floor((bridge.lines.length / 2) * progress) * 2;
      const bins = [new Path2D(), new Path2D(), new Path2D()];
      for (let i = 0; i + 1 < visibleLines; i += 2) {
        const z = (lineCam[i * 3 + 2] + lineCam[i * 3 + 5]) / 2;
        addSegment(bins[z < DEPTH_BINS[0] ? 0 : z < DEPTH_BINS[1] ? 1 : 2], lineCam, i);
      }
      // 완성 순간의 번쩍임: 0.9초 동안 밝아졌다 가라앉는다
      const flash = sinceDone >= 0 && sinceDone < FLASH_MS ? Math.pow(1 - sinceDone / FLASH_MS, 2) : 0;
      for (let b = 2; b >= 0; b--) {
        const a = DEPTH_ALPHA[b];
        ctx.lineWidth = 5;
        ctx.strokeStyle = `rgba(239, 68, 68, ${(0.1 + flash * 0.22) * a})`;
        ctx.stroke(bins[b]);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(${220 + flash * 35}, ${38 + flash * 150}, ${38 + flash * 150}, ${0.92 * a})`;
        ctx.stroke(bins[b]);
      }

      // 꼭짓점
      ctx.fillStyle = "rgba(255, 107, 107, 0.8)";
      fillPoints(vertCam, Math.floor(bridge.vertices.length * progress), 0.08);

      // 펜 끝의 빛: 막 그려진 선들을 환하게, 선 끝에는 밝은 점
      if (progress > 0 && progress < 1 && visibleLines >= 2) {
        const from = Math.max(0, visibleLines - PEN_TRAIL * 2);
        for (let i = from; i + 1 < visibleLines; i += 2) {
          const k = (i - from) / (visibleLines - from); // 0(오래됨) → 1(방금)
          ctx.lineWidth = 1.2 + k * 1.6;
          ctx.strokeStyle = `rgba(255, ${190 + k * 50}, ${180 + k * 50}, ${0.15 + k * 0.8})`;
          ctx.beginPath();
          addSegment(ctx, lineCam, i);
          ctx.stroke();
        }
        const h = (visibleLines - 1) * 3;
        const hz = lineCam[h + 2];
        if (hz > NEAR) {
          const hx = cx + (lineCam[h] * focal) / hz, hy = cy - (lineCam[h + 1] * focal) / hz;
          glowDot(hx, hy, 26, 255, 120, 110, 0.55);
          glowDot(hx, hy, 7, 255, 245, 240, 1);
        }
      }

      // 다리를 건너는 불빛: 완성 후 1초에 걸쳐 나타나 케이블·상판을 따라 흐른다
      if (sinceDone > 0) {
        const fade = Math.min(sinceDone / 1000, 1);
        for (const pulse of PULSES) {
          const path = bridge.paths[pulse.path];
          const segs = path.length - 1;
          for (let k = PULSE_TRAIL - 1; k >= 0; k--) {
            let u = (t * pulse.speed + pulse.offset - k * 0.011) % 1;
            if (u < 0) u += 1;
            if (pulse.dir < 0) u = 1 - u;
            const f = u * segs;
            const i0 = Math.min(Math.floor(f), segs - 1);
            const w = f - i0;
            const a = path[i0], bpt = path[i0 + 1];
            placeBridge(a[0] + (bpt[0] - a[0]) * w, a[1] + (bpt[1] - a[1]) * w, a[2] + (bpt[2] - a[2]) * w, tmp, 0);
            const z = tmp[2];
            if (z < NEAR) continue;
            const px = cx + (tmp[0] * focal) / z, py = cy - (tmp[1] * focal) / z;
            const depth = z < DEPTH_BINS[0] ? 1 : z < DEPTH_BINS[1] ? 0.8 : 0.6;
            // 양 끝에서 부드럽게 사라졌다 나타난다
            const edge = Math.min(u, 1 - u) * 8;
            const alpha = fade * depth * Math.min(edge, 1);
            if (k === 0) {
              glowDot(px, py, 28, 255, 110, 100, 0.6 * alpha);
              glowDot(px, py, 7, 255, 240, 235, alpha);
            } else {
              const s = (1 - k / PULSE_TRAIL) * 3.2;
              ctx.fillStyle = `rgba(255, 150, 140, ${(1 - k / PULSE_TRAIL) * 0.7 * alpha})`;
              ctx.beginPath();
              ctx.arc(px, py, s, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    }

    // 프레임 제한 루프 — 화면 밖(active=false)이거나 탭이 숨겨지면 멈추고, 돌아오면 이어서 그린다
    let rafId = 0;
    let last = 0;
    let running = false;
    const loop = (now: number) => {
      if (!activeRef.current || document.hidden) {
        running = false;
        return;
      }
      if (now - last >= (lowFpsRef.current ? LOW_FRAME_MS : FRAME_MS) - 1) {
        last = now;
        draw(now);
      }
      rafId = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (running || !activeRef.current || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    wakeRef.current = wake;
    document.addEventListener("visibilitychange", wake);
    wake();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", wake);
      wakeRef.current = () => {};
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
