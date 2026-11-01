import type { ReactNode } from "react";
import { GuideChrome } from "./chrome";

// 셸 — 포트폴리오와 동일한 헤더/토글을 공유하는 클라이언트 크롬으로 감싼다.
// 본문(children)은 서버 컴포넌트로 렌더되어 SEO용 정적 HTML에 그대로 포함된다.
export function GuideShell({ children }: { children: ReactNode }) {
  return <GuideChrome>{children}</GuideChrome>;
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
