"use client";

import { useEffect, useRef } from "react";

/* 히어로 배경의 와이어프레임 다리 — 2D 캔버스에 직접 원근 투영해서 그린다.
   three.js(WebGL)를 쓰지 않는 이유 (2026-11): 선과 점만 그리고 조작도 받지 않는데
   그 일에 압축 226KB짜리 묶음과 WebGL 초기화 끊김을 치르고 있었다. 같은 장면을 계산 몇 줄로 그린다.

   장면(옛 Bridge3D와 동일한 수치):
   - 카메라 (8,4,8) → 원점 주시, 세로 시야각 50도
   - 전체가 120초에 한 바퀴 회전, 그리는 동안은 약 50도 돌아 들어온다(감속)
   - 다리는 y=-1에 놓이고 살짝 좌우로 흔들린다. 주변에 떠다니는 점 200개, 바닥(y=-3) 그리드 */

const DRAW_MS = 3000;
const DRAW_DELAY_MS = 500;
const FRAME_MS = 1000 / 30;
const LOW_FRAME_MS = 1000 / 20;
const INTRO_SWING = 0.9; // 그리는 동안 돌아 들어오는 각도(rad, 약 50도)
const FOV = (50 * Math.PI) / 180;
const NEAR = 0.1;
const CAM: [number, number, number] = [8, 4, 8];

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

type V3 = [number, number, number];

/** 다리 선분(점 2개가 선 하나, 그려지는 순서대로)과 꼭짓점 */
function buildBridge() {
  const points: V3[] = [];
  const indices: number[] = [];

  const deckLength = 12;
  const deckWidth = 3;
  const deckSegments = 20;

  for (let i = 0; i <= deckSegments; i++) {
    const x = (i / deckSegments) * deckLength - deckLength / 2;
    const curve = Math.sin((i / deckSegments) * Math.PI) * 0.3;
    points.push([x, curve, -deckWidth / 2], [x, curve, deckWidth / 2]);
    if (i < deckSegments) {
      const b = i * 2;
      indices.push(b, b + 1);
      if (i > 0) indices.push(b - 2, b, b - 1, b + 1);
    }
  }

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
    for (let i = 0; i <= cableSegments; i++) {
      const t = i / cableSegments;
      points.push([t * deckLength - deckLength / 2, cableY(t) + Math.sin(t * Math.PI) * 0.15, z]);
      if (i > 0) indices.push(start + i - 1, start + i);
    }
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

  return { lines: indices.map((i) => points[i]), vertices: points };
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

/** 월드 좌표 → 카메라 좌표 (x 오른쪽, y 위, z 앞쪽 깊이) */
function toCamera(x: number, y: number, z: number, out: Float32Array, o: number) {
  const dx = x - CAM[0], dy = y - CAM[1], dz = z - CAM[2];
  const { f, r, u } = camBasis;
  out[o] = dx * r[0] + dy * r[1] + dz * r[2];
  out[o + 1] = dx * u[0] + dy * u[1] + dz * u[2];
  out[o + 2] = dx * f[0] + dy * f[1] + dz * f[2];
}

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

    /** 선분 묶음을 한 경로로 그린다. 카메라 앞면(NEAR)에서 잘라 뒤로 넘어간 부분은 버린다. */
    const strokeSegments = (cam: Float32Array, count: number) => {
      const cx = width / 2, cy = height / 2;
      ctx.beginPath();
      for (let i = 0; i + 1 < count; i += 2) {
        let ax = cam[i * 3], ay = cam[i * 3 + 1], az = cam[i * 3 + 2];
        let bx = cam[i * 3 + 3], by = cam[i * 3 + 4], bz = cam[i * 3 + 5];
        if (az < NEAR && bz < NEAR) continue;
        if (az < NEAR) {
          const t = (NEAR - az) / (bz - az);
          ax += (bx - ax) * t; ay += (by - ay) * t; az = NEAR;
        } else if (bz < NEAR) {
          const t = (NEAR - bz) / (az - bz);
          bx += (ax - bx) * t; by += (ay - by) * t; bz = NEAR;
        }
        ctx.moveTo(cx + (ax * focal) / az, cy - (ay * focal) / az);
        ctx.lineTo(cx + (bx * focal) / bz, cy - (by * focal) / bz);
      }
      ctx.stroke();
    };

    /** 점 묶음을 한 번에 채운다. 크기는 깊이에 반비례 (three.js PointsMaterial sizeAttenuation과 같은 식) */
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

    let startMs: number | null = null;
    function draw(now: number) {
      if (startMs === null) startMs = now;
      const t = (now - startMs) / 1000;
      const progress = Math.min(Math.max((now - startMs - DRAW_DELAY_MS) / DRAW_MS, 0), 1);

      // 전체 회전: 그리는 동안 INTRO_SWING만큼 돌아 들어오고, 이후 120초에 한 바퀴
      const rootA = (t * Math.PI * 2) / 120 - (1 - easeOutCubic(progress)) * INTRO_SWING;
      const rc = Math.cos(rootA), rs = Math.sin(rootA);
      // 다리 흔들림
      const wobble = Math.sin(t * 0.2) * 0.1;
      const wc = Math.cos(wobble), ws = Math.sin(wobble);
      // 떠다니는 점 무리 회전 (three.js Euler XYZ: Rx · Ry · v)
      const fy = t * 0.02, fx = t * 0.01;
      const fyc = Math.cos(fy), fys = Math.sin(fy), fxc = Math.cos(fx), fxs = Math.sin(fx);

      const placeBridge = (p: V3, out: Float32Array, o: number) => {
        // 다리 그룹: y축 흔들림 → y -1 이동 → 전체 회전
        const x1 = p[0] * wc + p[2] * ws, z1 = -p[0] * ws + p[2] * wc, y1 = p[1] - 1;
        toCamera(x1 * rc + z1 * rs, y1, -x1 * rs + z1 * rc, out, o);
      };
      bridge.lines.forEach((p, i) => placeBridge(p, lineCam, i * 3));
      bridge.vertices.forEach((p, i) => placeBridge(p, vertCam, i * 3));
      grid.forEach((p, i) => toCamera(p[0] * rc + p[2] * rs, p[1], -p[0] * rs + p[2] * rc, gridCam, i * 3));
      floating.forEach((p, i) => {
        const x1 = p[0] * fyc + p[2] * fys, z1 = -p[0] * fys + p[2] * fyc; // Ry
        const y2 = p[1] * fxc - z1 * fxs, z2 = p[1] * fxs + z1 * fxc; // Rx
        toCamera(x1 * rc + z2 * rs, y2, -x1 * rs + z2 * rc, floatCam, i * 3);
      });

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      ctx.strokeStyle = "#1a1a1a";
      strokeSegments(gridCam, grid.length);

      ctx.fillStyle = "rgba(220, 38, 38, 0.4)";
      fillPoints(floatCam, floating.length, 0.05);

      const visibleLines = Math.floor((bridge.lines.length / 2) * progress) * 2;
      ctx.strokeStyle = "rgba(220, 38, 38, 0.9)";
      strokeSegments(lineCam, visibleLines);

      ctx.fillStyle = "rgba(255, 107, 107, 0.8)";
      fillPoints(vertCam, Math.floor(bridge.vertices.length * progress), 0.08);
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
      document.removeEventListener("visibilitychange", wake);
      wakeRef.current = () => {};
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
