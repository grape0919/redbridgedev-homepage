"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* 히어로 배경의 3D 와이어프레임 다리.
   성능 원칙 (저사양 PC 스크롤 끊김 대응, 2026-11):
   - 도형은 한 번만 만든다. "그려지는" 연출은 setDrawRange로 보이는 범위만 늘린다
     (React state로 매 프레임 지오메트리를 다시 만들지 않는다).
   - 렌더는 frameloop="demand" + 30fps 티커.
   - "회전하면서 그려지는" 연출은 기기 성능과 관계없이 항상 재생한다 (사이트 주인 요청 — 브랜드 인상의 핵심).
     그리는 동안 다리가 약 50도 돌아 들어오고, 다 그린 뒤에는 천천히 계속 회전한다.
     느린 기기(lowFps)는 20fps로 그린다. 히어로가 화면 밖이면(active=false) 렌더를 멈춘다.
   - OrbitControls·조명 없음 (선·점 재질은 조명을 쓰지 않는다). 회전은 그룹을 직접 돌린다. */

const DRAW_MS = 3000;
const DRAW_DELAY_MS = 500;
const FRAME_MS = 1000 / 30;
const LOW_FRAME_MS = 1000 / 20;
/** 그리는 동안 돌아 들어오는 각도 (rad, 약 50도) */
const INTRO_SWING = 0.9;
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/** 다리 선분 좌표 (lineSegments용 — 2개 점이 선 하나) 와 정점 좌표 */
function buildBridge() {
  const points: THREE.Vector3[] = [];
  const indices: number[] = [];

  const deckLength = 12;
  const deckWidth = 3;
  const deckHeight = 0;
  const deckSegments = 20;

  for (let i = 0; i <= deckSegments; i++) {
    const x = (i / deckSegments) * deckLength - deckLength / 2;
    const curve = Math.sin((i / deckSegments) * Math.PI) * 0.3;
    points.push(new THREE.Vector3(x, deckHeight + curve, -deckWidth / 2));
    points.push(new THREE.Vector3(x, deckHeight + curve, deckWidth / 2));
    if (i < deckSegments) {
      const baseIdx = i * 2;
      indices.push(baseIdx, baseIdx + 1);
      if (i > 0) {
        indices.push(baseIdx - 2, baseIdx);
        indices.push(baseIdx - 1, baseIdx + 1);
      }
    }
  }

  const towerPositions = [-deckLength / 3, deckLength / 3];
  const towerHeight = 4;
  const baseOffset = points.length;
  towerPositions.forEach((towerX, towerIdx) => {
    const towerBase = baseOffset + towerIdx * 8;
    const curve = Math.sin(((towerX + deckLength / 2) / deckLength) * Math.PI) * 0.3;
    const legPositions = [
      [-0.3, -deckWidth / 2 + 0.3],
      [0.3, -deckWidth / 2 + 0.3],
      [-0.3, deckWidth / 2 - 0.3],
      [0.3, deckWidth / 2 - 0.3],
    ];
    legPositions.forEach(([dx, dz]) => points.push(new THREE.Vector3(towerX + dx, deckHeight + curve, dz)));
    legPositions.forEach(([dx, dz]) =>
      points.push(new THREE.Vector3(towerX + dx * 0.3, towerHeight + curve, dz * 0.3))
    );
    for (let i = 0; i < 4; i++) indices.push(towerBase + i, towerBase + 4 + i);
    indices.push(towerBase, towerBase + 1, towerBase + 2, towerBase + 3);
    indices.push(towerBase, towerBase + 2, towerBase + 1, towerBase + 3);
    indices.push(towerBase + 4, towerBase + 5, towerBase + 6, towerBase + 7);
    indices.push(towerBase + 4, towerBase + 6, towerBase + 5, towerBase + 7);
    indices.push(towerBase, towerBase + 5, towerBase + 1, towerBase + 4);
    indices.push(towerBase + 2, towerBase + 7, towerBase + 3, towerBase + 6);
  });

  const cableBase = points.length;
  const cableSegments = 15;
  const mainCableHeight = towerHeight + 0.5;
  const cableY = (t: number) => mainCableHeight - 4 * mainCableHeight * 0.6 * (t - 0.5) * (t - 0.5);
  [-deckWidth / 2 + 0.3, deckWidth / 2 - 0.3].forEach((z, cableIdx) => {
    const cableStart = cableBase + cableIdx * (cableSegments + 1);
    for (let i = 0; i <= cableSegments; i++) {
      const t = i / cableSegments;
      const x = t * deckLength - deckLength / 2;
      points.push(new THREE.Vector3(x, cableY(t) + Math.sin(t * Math.PI) * 0.15, z));
      if (i > 0) indices.push(cableStart + i - 1, cableStart + i);
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
      points.push(new THREE.Vector3(x, cableY(t) + deckCurve * 0.5, z));
      points.push(new THREE.Vector3(x, deckHeight + deckCurve, z));
      indices.push(idx, idx + 1);
    }
  });

  const linePositions = new Float32Array(indices.length * 3);
  indices.forEach((pi, i) => {
    const p = points[pi];
    linePositions.set([p.x, p.y, p.z], i * 3);
  });
  const vertexPositions = new Float32Array(points.length * 3);
  points.forEach((p, i) => vertexPositions.set([p.x, p.y, p.z], i * 3));
  return { linePositions, vertexPositions };
}

// 떠다니는 배경 입자 — 모듈 로드 시 한 번만 생성.
// 회전 궤도상 카메라(원점에서 반경 약 11.3) 근처에 생긴 입자는 화면에 큰 네모로 보이므로 그 띠를 피한다.
const floatingPositions = (() => {
  const a = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    let x = 0, y = 0, z = 0;
    for (let tries = 0; tries < 20; tries++) {
      x = (Math.random() - 0.5) * 30;
      y = (Math.random() - 0.5) * 20;
      z = (Math.random() - 0.5) * 30;
      const r = Math.hypot(x, z);
      if (Math.abs(r - 11.3) > 3 || Math.abs(y - 4) > 3) break;
    }
    a.set([x, y, z], i * 3);
  }
  return a;
})();

function Scene() {
  const root = useRef<THREE.Group>(null);
  const bridge = useRef<THREE.Group>(null);
  const floating = useRef<THREE.Points>(null);
  const start = useRef<number | null>(null);

  const { lines, vertices, floatGeo, lineCount, vertexCount } = useMemo(() => {
    const { linePositions, vertexPositions } = buildBridge();
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const vertices = new THREE.BufferGeometry();
    vertices.setAttribute("position", new THREE.BufferAttribute(vertexPositions, 3));
    const floatGeo = new THREE.BufferGeometry();
    floatGeo.setAttribute("position", new THREE.BufferAttribute(floatingPositions, 3));
    return {
      lines,
      vertices,
      floatGeo,
      lineCount: linePositions.length / 3,
      vertexCount: vertexPositions.length / 3,
    };
  }, []);

  useEffect(
    () => () => {
      lines.dispose();
      vertices.dispose();
      floatGeo.dispose();
    },
    [lines, vertices, floatGeo]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    // 그려지는 진행도 (모든 데스크톱에서 재생)
    const progress = Math.min(Math.max((t - start.current) * 1000 - DRAW_DELAY_MS, 0) / DRAW_MS, 1);
    const visibleLines = Math.floor((lineCount / 2) * progress) * 2;
    lines.setDrawRange(0, visibleLines);
    vertices.setDrawRange(0, Math.min(vertexCount, Math.floor(vertexCount * progress)));

    // 회전: 그리는 동안 INTRO_SWING만큼 돌아 들어오고(감속), 이후 120초에 한 바퀴(옛 OrbitControls autoRotate 0.5)
    const swing = (1 - easeOutCubic(progress)) * INTRO_SWING;
    if (root.current) root.current.rotation.y = (t * Math.PI * 2) / 120 - swing;
    if (bridge.current) bridge.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    if (floating.current) {
      floating.current.rotation.y = t * 0.02;
      floating.current.rotation.x = t * 0.01;
    }
  });

  return (
    <group ref={root}>
      <group ref={bridge} position={[0, -1, 0]}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color="#dc2626" transparent opacity={0.9} />
        </lineSegments>
        <points geometry={vertices}>
          <pointsMaterial color="#ff6b6b" size={0.08} transparent opacity={0.8} />
        </points>
      </group>
      <points ref={floating} geometry={floatGeo}>
        <pointsMaterial color="#dc2626" size={0.05} transparent opacity={0.4} sizeAttenuation />
      </points>
      <gridHelper args={[30, 30, "#1a1a1a", "#1a1a1a"]} position={[0, -3, 0]} />
    </group>
  );
}

/** demand 모드에서 정해진 fps로 다시 그리게 한다. running=false면 멈춘다. */
function Ticker({ running, frameMs }: { running: boolean; frameMs: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!running) {
      invalidate(); // 정지 시점의 화면(또는 정지 모드의 완성된 다리)을 한 번 그린다
      return;
    }
    const id = window.setInterval(() => invalidate(), frameMs);
    return () => window.clearInterval(id);
  }, [running, frameMs, invalidate]);
  return null;
}

/**
 * @param lowFps 느린 기기 — 20fps로 그린다
 * @param active 화면에 보이는지 (false면 렌더를 멈춤)
 */
export default function Bridge3D({ lowFps = false, active = true }: { lowFps?: boolean; active?: boolean }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={1}
      camera={{ position: [8, 4, 8], fov: 50 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <Scene />
      <Ticker running={active} frameMs={lowFps ? LOW_FRAME_MS : FRAME_MS} />
    </Canvas>
  );
}
