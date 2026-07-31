"use client";

import { ReactNode, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";

/* ---------- 포트폴리오 페이지 공용 빌딩 블록 ---------- */

export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      {children}
    </span>
  );
}

export function MetaTable({ rows }: { rows: [string, ReactNode][] }) {
  const { theme } = useTheme();
  return (
    <div
      className={`my-6 rounded-xl border overflow-hidden ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className={`border-b last:border-b-0 ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <th
                className={`w-28 sm:w-36 px-4 py-3 text-left align-top font-semibold whitespace-nowrap ${
                  theme === "dark" ? "bg-gray-900/60 text-gray-300" : "bg-gray-50 text-gray-700"
                }`}
              >
                {k}
              </th>
              <td
                className={`px-4 py-3 leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  const { theme } = useTheme();
  return (
    <div
      className={`my-6 rounded-xl border overflow-x-auto ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className={theme === "dark" ? "bg-gray-900/60" : "bg-gray-50"}>
            {head.map((h) => (
              <th
                key={h}
                className={`px-4 py-3 text-left font-semibold whitespace-nowrap ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  const { theme } = useTheme();
  return (
    <ul className="my-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          <span
            className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <h2
      className={`mt-10 mb-3 text-lg font-bold ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {children}
    </h2>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <p
      className={`text-sm sm:text-[15px] leading-relaxed ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {children}
    </p>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <strong className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>{children}</strong>
  );
}

export function Code({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <code
      className={`px-1.5 py-0.5 rounded text-[0.85em] font-mono ${
        theme === "dark" ? "bg-gray-800 text-red-300" : "bg-gray-100 text-red-700"
      }`}
    >
      {children}
    </code>
  );
}

/* ---------- 고객 친화 시각 자료 ---------- */

export interface Step {
  icon: ReactNode;
  title: string;
  desc?: string;
}

/** 좌→우(모바일: 위→아래) 단계 카드 흐름 — 시퀀스 다이어그램 대체 */
export function StepFlow({ steps }: { steps: Step[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="my-6 flex flex-col md:flex-row md:items-stretch gap-2">
      {steps.map((step, i) => (
        <div key={step.title} className="contents">
          <div
            className={`flex-1 rounded-xl border p-4 text-center ${
              dark ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="mx-auto w-11 h-11 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center">
              {step.icon}
            </div>
            <div className={`mt-1 text-[11px] font-semibold tracking-widest text-red-500`}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className={`mt-1 text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>
              {step.title}
            </div>
            {step.desc && (
              <div className={`mt-1.5 text-xs leading-relaxed ${dark ? "text-gray-500" : "text-gray-500"}`}>
                {step.desc}
              </div>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`self-center shrink-0 rotate-90 md:rotate-0 ${
                dark ? "text-gray-700" : "text-gray-300"
              }`}
              aria-hidden
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export interface Highlight {
  icon: ReactNode;
  title: string;
  desc: string;
}

/** 아이콘 + 제목 + 한 줄 설명 카드 그리드 — 상세 불릿/표 대체 */
export function HighlightGrid({ items }: { items: Highlight[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="my-6 grid sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className={`rounded-xl border p-5 ${
            dark ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-red-600/10 text-red-500 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className={`font-bold text-sm ${dark ? "text-white" : "text-gray-900"}`}>
              {item.title}
            </h3>
          </div>
          <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/** 성과 숫자 타일 */
export function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl border p-5 text-center ${
            dark ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="text-2xl font-extrabold text-red-500">{s.value}</div>
          <div className={`mt-2 text-xs leading-snug ${dark ? "text-gray-400" : "text-gray-600"}`}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 페이지 셸 (상단 바 + 배경 + 컨테이너) ---------- */

interface ShellProps {
  children: ReactNode;
  /** 상단 바 뒤로가기 목적지 (기본: 홈) */
  backHref?: string;
}

export function PortfolioShell({ children, backHref = "/" }: ShellProps) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`min-h-screen ${dark ? "bg-black" : "bg-gray-50"}`}>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          dark ? "bg-black/70 border-gray-800" : "bg-white/70 border-gray-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href={backHref} className="flex items-center gap-3 group">
            <ArrowLeft
              size={18}
              weight="bold"
              className={`transition-transform group-hover:-translate-x-1 ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Image
              src={dark ? "/logo_white.png" : "/logo_red.png"}
              alt="RED BRIDGE DEV"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              dark
                ? "bg-gray-900 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            {dark ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
          </button>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className={`glass-ambient top-[-5%] right-[-10%] w-[560px] h-[560px] ${
              dark ? "bg-red-600" : "bg-red-300"
            }`}
          />
        </div>
        {children}
      </main>
    </div>
  );
}

/* ---------- 하단 공통: 비공개 저장소 각주 + 문의 CTA ---------- */

export function PortfolioFootnote() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <FadeIn>
      <div
        className={`mt-8 rounded-xl border p-6 text-sm leading-relaxed ${
          dark
            ? "bg-gray-900/40 border-gray-800 text-gray-500"
            : "bg-white border-gray-200 text-gray-500"
        }`}
      >
        본 문서의 프로젝트는 모두 재직 중 수행한 실서비스 개발 건으로, 코드는 사내 비공개
        저장소에 있습니다. 아키텍처·수치는 보안에 문제없는 수준으로 재구성했으며, 상세 내용은
        미팅에서 설명 가능합니다.
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
        >
          프로젝트 문의하기
        </Link>
      </div>
    </FadeIn>
  );
}
