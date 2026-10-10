"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ShieldCheck, MapPin, ChatText, DeviceMobile, Globe, HardDrives } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

/* 일러스트 내부 문구 ko/en */
const visualCopy = {
  ko: {
    aiQ: "{v.aiQ}",
    aiA1: "지금 위치에서 도보 5분 거리에 ",
    aiA2: "카페 3곳",
    aiA3: "을 찾았어요. 첫 번째는…",
    aiBadge: "{v.aiBadge}",
    payQr: "고객 앱 QR",
    payOk: "승인 완료",
    payPos: "매장 POS · 영수증 출력",
    idnChannels: ["모바일 앱", "파트너 웹", "백엔드"],
    idnServer: "통합 본인인증 서버",
    idnNote: "개인정보는 밖으로 나가지 않음",
    searchQ: "강남 파스타 맛집",
    searchT: "0.05초",
    searchBadge: "매장 40만 곳 검색",
    migSteps: ["변경 요청", "자동 검증", "수동 승인", "운영 반영"],
    migBadges: ["백업 완료", "롤백 경로 확보", "불일치 감시 중"],
    vocaTitle: "Voca Test — 3회차",
    vocaCount: "20문항",
    vocaAnswer: "풍부한",
    vocaProgress: "학습 진행률 65%",
    qAhead: "내 앞 대기",
    qCount: "3명",
    qEta: "예상 대기 약 15분",
    qRefresh: "1분마다 자동 갱신",
    qSms: "문자 알림",
    qSmsBody: "곧 호출됩니다. 대기실로 와주세요. (약 10분 전)",
    wineTitle: "내추럴 와인 카탈로그",
    wineLine1: "타입 · 품종 · 생산자로 찾고,",
    wineLine2: "운영자가 직접 채워가는 사이트",
    petName: "🐾 초코 (말티즈 · 4살)",
    petReport: "혈액검사 리포트",
    petRows: ["ALT (간수치)", "BUN (신장)", "GLU (혈당)"],
    petOk: "참고치 안",
    petFlag: "참고치 위 · 확인 필요",
    petNote: "혈당이 참고치보다 높게 측정됐어요. 판정은 AI가 아닌 검증된 규칙으로만 수행합니다.",
  },
  en: {
    aiQ: "Recommend a quiet cafe nearby",
    aiA1: "I found ",
    aiA2: "3 cafes",
    aiA3: " within a 5-minute walk. The first one is…",
    aiBadge: "Conversations survive disconnects",
    payQr: "Customer app QR",
    payOk: "Approved",
    payPos: "Store POS · receipt printed",
    idnChannels: ["Mobile App", "Partner Web", "Backend"],
    idnServer: "Unified Identity Server",
    idnNote: "Personal data never leaves",
    searchQ: "best pasta near Gangnam",
    searchT: "0.05s",
    searchBadge: "Searching 400K stores",
    migSteps: ["Request", "Auto-Verify", "Approval", "Rollout"],
    migBadges: ["Backup done", "Rollback ready", "Drift watch on"],
    vocaTitle: "Voca Test — Round 3",
    vocaCount: "20 items",
    vocaAnswer: "abundant",
    vocaProgress: "Study progress 65%",
    qAhead: "Ahead of me",
    qCount: "3",
    qEta: "About 15 min wait",
    qRefresh: "Auto-refreshes every minute",
    qSms: "SMS Alert",
    qSmsBody: "You're up soon — please come to the waiting room. (~10 min)",
    wineTitle: "Natural Wine Catalog",
    wineLine1: "Browse by type, grape, and producer —",
    wineLine2: "a site the owner curates directly",
    petName: "🐾 Choco (Maltese · 4y)",
    petReport: "Blood Test Report",
    petRows: ["ALT (liver)", "BUN (kidney)", "GLU (glucose)"],
    petOk: "In range",
    petFlag: "Above range · check",
    petNote: "Glucose measured above the reference range. Verdicts come only from validated rules — never from AI.",
  },
};
function useVisualCopy() {
  const { language } = useLanguage();
  return visualCopy[language];
}

/* 각 프로젝트 상세 상단의 히어로 비주얼 — 서비스 장면을 그린 목업형 일러스트 */

function Frame({ children, label }: { children: ReactNode; label: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <figure
      aria-label={label}
      className={`relative rounded-2xl border overflow-hidden ${
        dark
          ? "bg-gradient-to-br from-gray-950 via-black to-red-950/30 border-gray-800"
          : "bg-gradient-to-br from-white via-gray-50 to-red-50 border-gray-200"
      }`}
    >
      <div className="relative px-6 py-8 sm:px-10 sm:py-10 flex items-center justify-center min-h-[240px]">
        {children}
      </div>
    </figure>
  );
}

/* ---------- ① AI 채팅 스트리밍 ---------- */

function AiBackendVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  const reduce = useReducedMotion();
  return (
    <Frame label="AI 실시간 대화 화면 일러스트">
      <div className="w-full max-w-sm space-y-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-red-600 text-white text-sm shadow-lg shadow-red-900/20">
            {v.aiQ}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-start"
        >
          <div
            className={`px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[85%] border ${
              dark ? "bg-gray-900 border-gray-800 text-gray-300" : "bg-white border-gray-200 text-gray-700 shadow-sm"
            }`}
          >
            <span>{v.aiA1}</span>
            <span className="text-red-500 font-medium">{v.aiA2}</span>
            <span>{v.aiA3}</span>
            {!reduce && (
              <motion.span
                aria-hidden
                className="inline-block w-2 h-4 ml-0.5 align-middle bg-red-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-2"
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
              dark ? "bg-gray-900/80 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            <ShieldCheck size={14} weight="duotone" className="text-red-500" />
            {v.aiBadge}
          </span>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ② QR 결제 장면 ---------- */

function PaymentsVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  const reduce = useReducedMotion();
  // 정적 의사 QR 패턴 (7x7)
  const qr = [
    1,1,1,0,1,1,1, 1,0,1,1,0,0,1, 1,1,0,1,1,0,1, 0,1,1,0,1,1,0,
    1,0,1,1,0,1,1, 1,1,0,0,1,0,1, 1,0,1,1,0,1,1,
  ];
  return (
    <Frame label="QR 결제 장면 일러스트">
      <div className="flex items-center gap-6 sm:gap-10">
        {/* 폰 + QR */}
        <div
          className={`relative w-28 sm:w-32 rounded-2xl border-2 p-3 ${
            dark ? "border-gray-700 bg-gray-950" : "border-gray-300 bg-white shadow-md"
          }`}
        >
          <div className={`mx-auto mb-2 h-1 w-8 rounded-full ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
          <div className="relative grid grid-cols-7 gap-[3px] p-1.5 rounded-lg bg-white border border-gray-200">
            {qr.map((v, i) => (
              <div key={i} className={`aspect-square rounded-[1px] ${v ? "bg-gray-900" : "bg-white"}`} />
            ))}
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute left-1 right-1 h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                animate={{ top: ["8%", "88%", "8%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <p className={`mt-2 text-center text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {v.payQr}
          </p>
        </div>

        {/* 스캔 연결선 */}
        <div className="flex flex-col items-center gap-1" aria-hidden>
          {!reduce ? (
            <motion.div
              className="flex gap-1"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ opacity: 1 - i * 0.3 }} />
              ))}
            </motion.div>
          ) : (
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ opacity: 1 - i * 0.3 }} />
              ))}
            </div>
          )}
        </div>

        {/* POS 승인 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className={`rounded-xl border p-4 text-center ${
            dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-md"
          }`}
        >
          <CheckCircle size={36} weight="fill" className="mx-auto text-red-500" />
          <p className={`mt-2 text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{v.payOk}</p>
          <p className={`text-[11px] mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{v.payPos}</p>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ③ 3채널 → 통합 인증 ---------- */

function IdentityVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  const reduce = useReducedMotion();
  const channelIcons = [DeviceMobile, Globe, HardDrives];
  const channels = channelIcons.map((icon, i) => ({ icon, label: v.idnChannels[i] }));
  return (
    <Frame label="3개 채널이 하나의 인증 서버로 수렴하는 일러스트">
      <div className="w-full max-w-md">
        <div className="flex justify-between px-2">
          {channels.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                  dark ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500 shadow-sm"
                }`}
              >
                <c.icon size={22} weight="duotone" />
              </div>
              <span className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{c.label}</span>
            </div>
          ))}
        </div>
        {/* 수렴 라인 */}
        <svg viewBox="0 0 400 80" className="w-full h-16 mt-1" aria-hidden>
          {[60, 200, 340].map((x) => (
            <path
              key={x}
              d={`M ${x} 6 C ${x} 45, 200 35, 200 74`}
              fill="none"
              stroke={dark ? "#3f3f46" : "#d4d4d8"}
              strokeWidth="2"
            />
          ))}
          {!reduce &&
            [60, 200, 340].map((x, i) => (
              <motion.circle
                key={x}
                r="4"
                fill="#ef4444"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                style={{ offsetPath: `path('M ${x} 6 C ${x} 45, 200 35, 200 74')` }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
            ))}
        </svg>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/30">
              <ShieldCheck size={30} weight="duotone" className="text-white" />
            </div>
            <span className={`text-xs font-bold ${dark ? "text-white" : "text-gray-900"}`}>{v.idnServer}</span>
            <span className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{v.idnNote}</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- ④ 지도 검색 ---------- */

function SearchVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  const pins = [
    { left: "22%", top: "38%", d: 0.3 },
    { left: "55%", top: "26%", d: 0.5 },
    { left: "72%", top: "55%", d: 0.7 },
    { left: "38%", top: "62%", d: 0.9 },
  ];
  return (
    <Frame label="지도 기반 매장 검색 일러스트">
      <div className="w-full max-w-md">
        {/* 검색바 */}
        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm ${
            dark ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700 shadow-sm"
          }`}
        >
          <span className="text-red-500">🔍</span>
          <span>{v.searchQ}</span>
          <span className={`ml-auto text-[11px] ${dark ? "text-gray-600" : "text-gray-400"}`}>{v.searchT}</span>
        </div>
        {/* 지도 */}
        <div
          className={`relative mt-3 h-36 rounded-xl overflow-hidden border ${
            dark ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
          }`}
        >
          <svg className="absolute inset-0 w-full h-full" aria-hidden>
            {[20, 45, 70, 95].map((y) => (
              <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke={dark ? "#27272a" : "#e4e4e7"} strokeWidth="6" />
            ))}
            {[15, 42, 68, 88].map((x) => (
              <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke={dark ? "#27272a" : "#e4e4e7"} strokeWidth="6" />
            ))}
          </svg>
          {pins.map((p) => (
            <motion.div
              key={p.left}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: p.left, top: p.top }}
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: p.d, type: "spring", stiffness: 300, damping: 15 }}
            >
              <MapPin size={26} weight="fill" className="text-red-500 drop-shadow-md" />
            </motion.div>
          ))}
          <div
            className={`absolute bottom-2 right-2 px-2.5 py-1 rounded-full text-[11px] border ${
              dark ? "bg-black/70 border-gray-800 text-gray-300" : "bg-white/90 border-gray-200 text-gray-600"
            }`}
          >
            {v.searchBadge}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- ⑤ 배포 게이트 진행 ---------- */

function DbMigrationVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  const steps = v.migSteps;
  return (
    <Frame label="검증 게이트를 통과하는 배포 파이프라인 일러스트">
      <div className="w-full max-w-md">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 * i, type: "spring", stiffness: 260 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 ${
                    i === steps.length - 1
                      ? "bg-gradient-to-br from-red-600 to-red-700 border-red-500 text-white shadow-lg shadow-red-900/30"
                      : dark
                      ? "bg-gray-900 border-red-900/60 text-red-500"
                      : "bg-white border-red-300 text-red-500 shadow-sm"
                  }`}
                >
                  <CheckCircle size={22} weight={i === steps.length - 1 ? "fill" : "duotone"} />
                </motion.div>
                <span className={`text-[11px] whitespace-nowrap ${dark ? "text-gray-400" : "text-gray-500"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 * i + 0.15, duration: 0.3 }}
                  className={`h-0.5 flex-1 mx-1.5 -mt-5 origin-left ${dark ? "bg-red-900/60" : "bg-red-300"}`}
                />
              )}
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex justify-center gap-2"
        >
          {v.migBadges.map((b) => (
            <span
              key={b}
              className={`px-2.5 py-1 rounded-full text-[11px] border ${
                dark ? "bg-gray-900/80 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              ✓ {b}
            </span>
          ))}
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ⑥ 시험지 목업 ---------- */

function VocaroVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  return (
    <Frame label="영어 단어 시험지 목업 일러스트">
      <div className="relative">
        {/* 뒤 페이지들 */}
        <div
          aria-hidden
          className={`absolute -right-3 -top-3 w-52 sm:w-60 h-full rounded-lg border rotate-3 ${
            dark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
          }`}
        />
        {/* 시험지 */}
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true }}
          className="relative w-52 sm:w-60 rounded-lg bg-white border border-gray-200 shadow-xl p-4"
        >
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-xs font-bold text-gray-900">{v.vocaTitle}</span>
            <span className="text-[10px] text-red-500 font-bold">{v.vocaCount}</span>
          </div>
          {[
            ["1. abundant", v.vocaAnswer],
            ["2. deliberate", "____"],
            ["3. inevitable", "____"],
          ].map(([q, a], i) => (
            <div key={q} className="flex items-center justify-between mt-2.5">
              <span className="text-[11px] text-gray-700">{q}</span>
              <span className={`text-[11px] ${i === 0 ? "text-red-500 font-medium" : "text-gray-300"}`}>{a}</span>
            </div>
          ))}
          <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "65%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          <p className="mt-1 text-[10px] text-gray-400">{v.vocaProgress}</p>
        </motion.div>
        {/* 포맷 칩 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="absolute -bottom-3 -left-6 flex gap-1.5"
        >
          {["PDF", "Excel", "Word"].map((f) => (
            <span
              key={f}
              className={`px-2 py-1 rounded-md text-[10px] font-bold border shadow-sm ${
                dark ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {f}
            </span>
          ))}
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ⑦ 대기 순번 티켓 ---------- */

function HospitalQueueVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  return (
    <Frame label="병원 대기 순번 화면 목업 일러스트">
      <div className="flex items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`w-44 rounded-2xl border-2 p-4 text-center ${
            dark ? "bg-gray-950 border-gray-700" : "bg-white border-gray-300 shadow-lg"
          }`}
        >
          <p className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{v.qAhead}</p>
          <p className="text-4xl font-extrabold text-red-500 leading-tight">{v.qCount}</p>
          <p className={`mt-1 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{v.qEta}</p>
          <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: "10%" }}
              whileInView={{ width: "62%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
            />
          </div>
          <p className={`mt-2 text-[10px] ${dark ? "text-gray-600" : "text-gray-400"}`}>{v.qRefresh}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={`max-w-[180px] px-4 py-3 rounded-2xl rounded-bl-sm border text-xs leading-relaxed ${
            dark ? "bg-gray-900 border-gray-800 text-gray-300" : "bg-white border-gray-200 text-gray-600 shadow-md"
          }`}
        >
          <span className="inline-flex items-center gap-1 text-red-500 font-bold">
            <ChatText size={14} weight="duotone" /> {v.qSms}
          </span>
          <br />
          {v.qSmsBody}
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ⑧ 와인 ---------- */

function GoldluckwineVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  return (
    <Frame label="와인 보틀과 글라스 일러스트">
      <div className="flex items-end gap-8">
        {/* 보틀 */}
        <motion.svg
          width="60"
          height="170"
          viewBox="0 0 60 170"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          aria-hidden
        >
          <path
            d="M26 4 h8 v34 c0 6 10 10 10 22 v96 a8 8 0 0 1 -8 8 H24 a8 8 0 0 1 -8 -8 V60 c0 -12 10 -16 10 -22 Z"
            fill={dark ? "#18181b" : "#3f3f46"}
            stroke={dark ? "#3f3f46" : "#27272a"}
            strokeWidth="1.5"
          />
          <rect x="18" y="92" width="24" height="42" rx="2" fill={dark ? "#fafafa" : "#ffffff"} stroke="#d4d4d8" />
          <text x="30" y="109" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b91c1c">
            GOLD LUCK
          </text>
          <text x="30" y="119" textAnchor="middle" fontSize="5.5" fill="#71717a">
            Chenin Blanc
          </text>
          <rect x="25" y="2" width="10" height="10" rx="1.5" fill="#b91c1c" />
        </motion.svg>
        {/* 글라스 */}
        <motion.svg
          width="70"
          height="150"
          viewBox="0 0 70 150"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          aria-hidden
        >
          <path
            d="M10 8 h50 c0 34 -10 50 -25 54 v70 h18 v6 H17 v-6 h18 V62 C20 58 10 42 10 8 Z"
            fill="none"
            stroke={dark ? "#52525b" : "#a1a1aa"}
            strokeWidth="2"
          />
          <motion.path
            d="M13 26 h44 c-2 18 -9 30 -22 33 c-13 -3 -20 -15 -22 -33 Z"
            fill="#b91c1c"
            fillOpacity={dark ? 0.85 : 0.8}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ transformOrigin: "35px 59px" }}
          />
        </motion.svg>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className={`self-center text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}
        >
          <p className={`font-bold text-sm mb-1 ${dark ? "text-white" : "text-gray-900"}`}>{v.wineTitle}</p>
          <p>{v.wineLine1}</p>
          <p>{v.wineLine2}</p>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ---------- ⑨ 혈액검사 리포트 ---------- */

function PetbloodVisual() {
  const { theme } = useTheme();
  const v = useVisualCopy();
  const dark = theme === "dark";
  // 참고치 범위 내 마커 위치 (%)
  const rowDefs = [
    { pos: 42, flag: false },
    { pos: 55, flag: false },
    { pos: 88, flag: true },
  ];
  const rows = rowDefs.map((r, i) => ({ ...r, name: v.petRows[i] }));
  return (
    <Frame label="반려동물 혈액검사 리포트 목업 일러스트">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`w-full max-w-sm rounded-xl border p-5 ${
          dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200 shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{v.petName}</span>
          <span className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{v.petReport}</span>
        </div>
        <div className="mt-4 space-y-3.5">
          {rows.map((r, i) => (
            <div key={r.name}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className={dark ? "text-gray-400" : "text-gray-500"}>{r.name}</span>
                <span className={r.flag ? "text-red-500 font-bold" : dark ? "text-gray-500" : "text-gray-400"}>
                  {r.flag ? v.petFlag : v.petOk}
                </span>
              </div>
              <div className={`relative h-2 rounded-full ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                {/* 참고치 구간 */}
                <div
                  className={`absolute inset-y-0 left-[25%] right-[25%] rounded-full ${
                    dark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
                <motion.div
                  className={`absolute -top-[3px] w-3.5 h-3.5 rounded-full border-2 ${
                    r.flag ? "bg-red-500 border-red-300" : dark ? "bg-gray-300 border-gray-500" : "bg-white border-gray-400"
                  } shadow`}
                  initial={{ left: "0%" }}
                  whileInView={{ left: `${r.pos}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.7, type: "spring", stiffness: 120 }}
                  style={{ transform: "translateX(-50%)" }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-[11px] leading-relaxed ${dark ? "text-gray-500" : "text-gray-400"}`}>
          {v.petNote}
        </p>
      </motion.div>
    </Frame>
  );
}

export const projectVisuals: Record<string, () => ReactNode> = {
  "ai-backend": AiBackendVisual,
  payments: PaymentsVisual,
  identity: IdentityVisual,
  search: SearchVisual,
  "db-migration": DbMigrationVisual,
  vocaro: VocaroVisual,
  "hospital-queue": HospitalQueueVisual,
  goldluckwine: GoldluckwineVisual,
  petblood: PetbloodVisual,
};
