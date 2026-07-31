"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface MermaidProps {
  chart: string;
  caption?: string;
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const rawId = useId();
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = `mmd${rawId.replace(/[^a-zA-Z0-9]/g, "")}${theme}`;

    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "neutral",
        themeVariables: {
          fontFamily: "var(--font-geist-sans), ui-sans-serif, sans-serif",
        },
        flowchart: { curve: "basis" },
        sequence: { useMaxWidth: true },
      });
      try {
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered);
          setFailed(false);
        }
      } catch {
        if (!cancelled) {
          setSvg(null);
          setFailed(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, theme, rawId]);

  return (
    <figure
      className={`my-6 rounded-xl border p-4 overflow-x-auto ${
        theme === "dark"
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {svg ? (
        <div
          className="mermaid-diagram flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : failed ? (
        <pre
          className={`text-xs leading-relaxed whitespace-pre overflow-x-auto ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          {chart}
        </pre>
      ) : (
        <div
          className={`h-40 flex items-center justify-center text-sm ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          다이어그램 로딩 중…
        </div>
      )}
      {caption && (
        <figcaption
          className={`mt-3 text-center text-xs ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
