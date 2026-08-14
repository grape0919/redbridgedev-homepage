"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 외부 스토어: 서버는 항상 "dark"로 본문을 렌더하고(SEO를 위해 children을 감추지 않는다),
// 클라이언트는 hydration 후 저장된 테마로 전환된다. 첫 페인트 전 data-theme 적용은
// layout.tsx의 인라인 스크립트가 담당한다.
const listeners = new Set<() => void>();
let cachedTheme: Theme | null = null;

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function getSnapshot(): Theme {
  if (cachedTheme === null) cachedTheme = readStoredTheme();
  return cachedTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function applyTheme(theme: Theme) {
  cachedTheme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // 저장 실패는 무시 (프라이빗 모드 등)
  }
  document.documentElement.setAttribute("data-theme", theme);
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
