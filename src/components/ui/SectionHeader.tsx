"use client";

import { useTheme } from "@/context/ThemeContext";

interface SectionHeaderProps {
  /** 작은 빨간 대문자 라벨 (예: OUR SERVICES) */
  eyebrow: string;
  title: string;
  /** 제목 중 빨간색으로 강조할 뒷부분 */
  highlight?: string;
  description?: string;
  className?: string;
}

/* 모든 랜딩 섹션이 공유하는 헤더 패턴 — eyebrow · 제목(+강조어) · 설명 */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  className = "",
}: SectionHeaderProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className={`text-center ${className}`}>
      <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-4xl sm:text-5xl font-bold ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-red-500">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mt-6 text-xl max-w-3xl mx-auto leading-relaxed ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
