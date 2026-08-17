import Link from "next/link";
import type { ReactNode } from "react";

// 서버 컴포넌트 셸 — 테마는 globals.css의 CSS 변수(data-theme)로 자동 대응한다.
export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight hover:text-red-500 transition-colors">
            RED BRIDGE <span className="text-red-600">DEV</span>
          </Link>
          <nav className="text-sm flex gap-5">
            <Link href="/guides/" className="text-[var(--text-secondary)] hover:text-red-500 transition-colors">
              가이드
            </Link>
            <Link href="/portfolio/" className="text-[var(--text-secondary)] hover:text-red-500 transition-colors">
              포트폴리오
            </Link>
            <Link href="/#contact" className="text-[var(--text-secondary)] hover:text-red-500 transition-colors">
              문의
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
      <footer className="border-t border-[var(--border)] mt-16">
        <div className="mx-auto max-w-3xl px-6 py-10 text-center">
          <p className="text-lg font-semibold">
            프로젝트를 구상 중이신가요?
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            RED BRIDGE DEV가 견적 산정부터 출시까지 함께합니다.
          </p>
          <Link
            href="/#contact"
            className="mt-5 inline-block rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
          >
            무료 상담 문의하기
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 mb-4 text-xl sm:text-2xl font-bold">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[var(--foreground)]">{children}</strong>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-4 list-disc pl-5 space-y-2 leading-relaxed text-[var(--text-secondary)] marker:text-red-500">
      {children}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
      {children}
    </div>
  );
}

/** 표 형태의 요약 카드 — 모바일에서 자체 스크롤 */
export function InfoTable({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="bg-[var(--surface)] text-left">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[var(--border)]">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-[var(--text-secondary)]">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
