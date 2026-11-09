"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

interface IconTileProps {
  children: ReactNode;
  /** Tailwind gradient 클래스 (기본: 브랜드 레드) */
  gradient?: string;
  size?: "md" | "lg";
  className?: string;
}

/* 카드 공용 아이콘 타일 — 그라데이션 테두리 + 반투명 내부. 모든 섹션 카드가 같은 규격을 쓴다. */
export default function IconTile({
  children,
  gradient = "from-red-500 to-red-700",
  size = "md",
  className = "",
}: IconTileProps) {
  const { theme } = useTheme();
  const dim = size === "lg" ? "w-16 h-16" : "w-14 h-14";
  return (
    <div
      className={`${dim} rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shadow-[0_6px_20px_rgba(220,38,38,0.3)] ${className}`}
    >
      <div
        className={`w-full h-full rounded-2xl flex items-center justify-center text-red-500/85 ${
          theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
