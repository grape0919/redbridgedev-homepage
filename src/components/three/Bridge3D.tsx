"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Particles({ points, visibleCount }: { points: THREE.Vector3[]; visibleCount: number }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(
      points.slice(0, visibleCount).flatMap((p) => [p.x, p.y, p.z])
    );
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [points, visibleCount]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#ff6b6b" size={0.08} transparent opacity={0.8} />
    </points>
  );
}

function WireframeBridge({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const bridgeGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const indices: number[] = [];

    // Bridge deck (main platform)
    const deckLength = 12;
    const deckWidth = 3;
    const deckHeight = 0;
    const deckSegments = 20;

    // Create deck grid
    for (let i = 0; i <= deckSegments; i++) {
      const x = (i / deckSegments) * deckLength - deckLength / 2;
      // Add curve to deck
      const curve = Math.sin((i / deckSegments) * Math.PI) * 0.3;

      // Top deck lines (longitudinal)
      points.push(new THREE.Vector3(x, deckHeight + curve, -deckWidth / 2));
      points.push(new THREE.Vector3(x, deckHeight + curve, deckWidth / 2));

      if (i < deckSegments) {
        const baseIdx = i * 2;
        // Cross beams
        indices.push(baseIdx, baseIdx + 1);
        // Longitudinal connections
        if (i > 0) {
          indices.push(baseIdx - 2, baseIdx);
          indices.push(baseIdx - 1, baseIdx + 1);
        }
      }
    }

    // Tower positions
    const towerPositions = [-deckLength / 3, deckLength / 3];
    const towerHeight = 4;
    const baseOffset = points.length;

    // Create towers
    towerPositions.forEach((towerX, towerIdx) => {
      const towerBase = baseOffset + towerIdx * 8;
      const curve =
        Math.sin(((towerX + deckLength / 2) / deckLength) * Math.PI) * 0.3;

      // Tower legs (4 corners)
      const legPositions = [
        [-0.3, -deckWidth / 2 + 0.3],
        [0.3, -deckWidth / 2 + 0.3],
        [-0.3, deckWidth / 2 - 0.3],
        [0.3, deckWidth / 2 - 0.3],
      ];

      // Bottom points of tower
      legPositions.forEach(([dx, dz]) => {
        points.push(new THREE.Vector3(towerX + dx, deckHeight + curve, dz));
      });

      // Top points of tower (converging)
      legPositions.forEach(([dx, dz]) => {
        points.push(
          new THREE.Vector3(towerX + dx * 0.3, towerHeight + curve, dz * 0.3)
        );
      });

      // Vertical tower lines
      for (let i = 0; i < 4; i++) {
        indices.push(towerBase + i, towerBase + 4 + i);
      }

      // Tower horizontal braces (bottom)
      indices.push(towerBase, towerBase + 1);
      indices.push(towerBase + 2, towerBase + 3);
      indices.push(towerBase, towerBase + 2);
      indices.push(towerBase + 1, towerBase + 3);

      // Tower horizontal braces (top)
      indices.push(towerBase + 4, towerBase + 5);
      indices.push(towerBase + 6, towerBase + 7);
      indices.push(towerBase + 4, towerBase + 6);
      indices.push(towerBase + 5, towerBase + 7);

      // Diagonal braces
      indices.push(towerBase, towerBase + 5);
      indices.push(towerBase + 1, towerBase + 4);
      indices.push(towerBase + 2, towerBase + 7);
      indices.push(towerBase + 3, towerBase + 6);
    });

    // Suspension cables
    const cableBase = points.length;
    const cableSegments = 15;
    const mainCableHeight = towerHeight + 0.5;

    // Create main suspension cables (2 on each side)
    [-deckWidth / 2 + 0.3, deckWidth / 2 - 0.3].forEach((z, cableIdx) => {
      const cableStart = cableBase + cableIdx * (cableSegments + 1);

      for (let i = 0; i <= cableSegments; i++) {
        const t = i / cableSegments;
        const x = t * deckLength - deckLength / 2;

        // Parabolic curve for main cable
        const cableY =
          mainCableHeight - 4 * mainCableHeight * 0.6 * (t - 0.5) * (t - 0.5);
        const deckCurve = Math.sin(t * Math.PI) * 0.3;

        points.push(new THREE.Vector3(x, cableY + deckCurve * 0.5, z));

        if (i > 0) {
          indices.push(cableStart + i - 1, cableStart + i);
        }
      }
    });

    // Vertical hangers from cables to deck
    const hangerBase = points.length;
    const hangerCount = 10;

    [-deckWidth / 2 + 0.3, deckWidth / 2 - 0.3].forEach((z, sideIdx) => {
      for (let i = 1; i < hangerCount; i++) {
        const t = i / hangerCount;
        const x = t * deckLength - deckLength / 2;

        const cableY =
          mainCableHeight - 4 * mainCableHeight * 0.6 * (t - 0.5) * (t - 0.5);
        const deckCurve = Math.sin(t * Math.PI) * 0.3;

        const hangerTop = new THREE.Vector3(x, cableY + deckCurve * 0.5, z);
        const hangerBottom = new THREE.Vector3(x, deckHeight + deckCurve, z);

        const idx = hangerBase + sideIdx * (hangerCount - 1) * 2 + (i - 1) * 2;
        points.push(hangerTop);
        points.push(hangerBottom);
        indices.push(idx, idx + 1);
      }
    });

    return { points, indices };
  }, []);


  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Calculate visible line count based on progress
  const totalLines = bridgeGeometry.indices.length / 2;
  const visibleLines = Math.floor(totalLines * progress);

  // Create partial geometry based on progress
  const partialGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < visibleLines * 2 && i < bridgeGeometry.indices.length; i++) {
      const idx = bridgeGeometry.indices[i];
      const point = bridgeGeometry.points[idx];
      positions.push(point.x, point.y, point.z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    return geometry;
  }, [visibleLines, bridgeGeometry]);

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main wireframe */}
      <lineSegments geometry={partialGeometry}>
        <lineBasicMaterial color="#dc2626" linewidth={2} transparent opacity={0.9} />
      </lineSegments>

      {/* Glow effect */}
      <lineSegments geometry={partialGeometry}>
        <lineBasicMaterial color="#ef4444" linewidth={1} transparent opacity={0.3} />
      </lineSegments>

      {/* Particles at vertices */}
      <Particles points={bridgeGeometry.points} visibleCount={visibleLines} />
    </group>
  );
}

// Pre-generate particle positions outside component to avoid impure function calls
const generateParticlePositions = () => {
  const positions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return positions;
};
const particlePositions = generateParticlePositions();

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color="#dc2626"
        size={0.05}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#dc2626" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ef4444" intensity={0.5} />

      <WireframeBridge progress={progress} />
      <FloatingParticles />

      {/* Grid helper */}
      <gridHelper
        args={[30, 30, "#1a1a1a", "#1a1a1a"]}
        position={[0, -3, 0]}
      />
    </>
  );
}

export default function Bridge3D() {
  const [progress, setProgress] = useState(0);
  const isClient = typeof window !== "undefined";

  useEffect(() => {

    // Animate the bridge drawing
    const duration = 3000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      animate();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Canvas
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
