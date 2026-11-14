"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion } from "framer-motion";
import { CaretDown, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { gsap } from "@/lib/gsap";
import { trackEvent } from "@/lib/analytics";
import {
  subscribePerfMode,
  getPerfLowSnapshot,
  getPerfLowServerSnapshot,
} from "@/lib/perfMode";

// 3D 와이어프레임 다리 — three.js 번들은 조건을 통과한 데스크톱에서만 내려받는다.
const Bridge3D = dynamic(() => import("@/components/three/Bridge3D"), { ssr: false });

// Desktop-only gate so mobile skips the WebGL scene (keeps LCP·배터리 부담 낮게).
const subscribeMediaQuery = () => () => {};
const getDesktopSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches;
const getServerSnapshot = () => false;

// 저사양 기기 감지 — 명백히 약한 기기(2코어·2GB 이하)이거나 모션 최소화 설정이면
// 3D 다리 대신 정적 배경(그리드·글로우)을 쓰고 스크롤 scrub 변형을 생략한다.
// 4코어·4GB급은 충분히 도는 경우가 많아 스펙으로 막지 않고,
// 실측 FPS 워치독(PerfWatchdog)이 실제로 느린 기기만 골라 저성능 모드로 전환한다.
const getLowPowerSnapshot = () => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    (navigator.hardwareConcurrency || 8) <= 2 ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};
const getLowPowerServerSnapshot = () => true;

const content = {
  ko: {
    subtitle: "Web · App · MVP Development Agency",
    tagline1: "기획부터 운영까지,",
    taglineHighlight: "끝까지 책임지는",
    tagline2: "개발 에이전시",
    description: "홈페이지와 웹서비스 개발부터 AI 업무 자동화까지, 필요한 범위를 함께 정하고 개발합니다",
    ctaPrimary: "프로젝트 문의하기",
    ctaSecondary: "포트폴리오 보기",
    scroll: "Scroll",
    stats: [
      { value: "9개", label: "구축·운영 프로젝트" },
      { value: "3개", label: "운영 중인 서비스" },
      { value: "1팀", label: "기획부터 운영까지 전담" },
      { value: "24h", label: "문의 회신" },
    ],
  },
  en: {
    subtitle: "Web · App · MVP Development Agency",
    tagline1: "From planning to operations,",
    taglineHighlight: "an agency that owns",
    tagline2: "the outcome",
    description: "From websites and web services to AI workflow automation — we scope what you need together, then build it",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Portfolio",
    scroll: "Scroll",
    stats: [
      { value: "9", label: "Projects Built & Run" },
      { value: "3", label: "Services in Production" },
      { value: "1 team", label: "Planning through Operations" },
      { value: "24h", label: "Inquiry Response" },
    ],
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useSyncExternalStore(
    subscribeMediaQuery,
    getDesktopSnapshot,
    getServerSnapshot
  );
  const lowPower = useSyncExternalStore(
    subscribeMediaQuery,
    getLowPowerSnapshot,
    getLowPowerServerSnapshot
  );
  // 실측 FPS 워치독이 켠 저성능 모드 — 스펙 추정 게이트를 통과한 약한 GPU도 잡는다
  const perfLow = useSyncExternalStore(
    subscribePerfMode,
    getPerfLowSnapshot,
    getPerfLowServerSnapshot
  );
  // 데스크톱이면 항상 다리를 보여 준다. 저사양·저성능·모션 최소화면 완성된 다리를 정지 화면으로 한 번만 그린다.
  const show3D = isDesktop;
  const animate3D = !lowPower && !perfLow;

  // 히어로가 화면 밖이면 3D 렌더 루프를 멈춘다 (아래 섹션을 스크롤할 때 프레임 확보)
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const section = containerRef.current;
    if (!show3D || !animate3D || !section) return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    io.observe(section);
    return () => io.disconnect();
  }, [show3D, animate3D]);
  const { language } = useLanguage();

  const t = content[language];

  // 마우스 글로우: setState 대신 rAF 스로틀 + 직접 스타일 갱신 —
  // mousemove마다 Hero 전체가 리렌더되는 것을 막는다.
  useEffect(() => {
    let rafId = 0;
    let pending: MouseEvent | null = null;

    const apply = () => {
      rafId = 0;
      const e = pending;
      const container = containerRef.current;
      const glow = glowRef.current;
      if (!e || !container || !glow) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      glow.style.background = `radial-gradient(circle at ${50 + x * 20}% ${
        50 + y * 20
      }%, rgba(220, 38, 38, 0.18) 0%, transparent 55%)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pending = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = containerRef.current;
      const bridge = bridgeRef.current;
      const contentEl = contentRef.current;
      const scrim = scrimRef.current;
      // 저사양 모드에서는 3D 다리가 렌더되지 않으므로 scrub 타임라인 전체가 생략된다.
      // 정지 모드(저사양·저성능)에서는 스크롤 연출도 생략한다
      if (!animate3D || !section || !bridge || !contentEl || !scrim) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        tl.to(bridge, { scale: 1.12, yPercent: 8, ease: "none" }, 0)
          .to(contentEl, { yPercent: -20, ease: "none" }, 0)
          .to(scrim, { opacity: 1.4, ease: "none" }, 0);
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [show3D, animate3D]);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background — 그리드는 항상, 3D 와이어프레임 다리는 고성능 데스크톱만 (모바일·저사양은 정적 배경) */}
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
      {show3D && (
        <div ref={bridgeRef} className="absolute inset-0 pointer-events-none" aria-hidden>
          <Bridge3D animate={animate3D} active={heroVisible} />
        </div>
      )}

      {/* Scrim — 선이 가는 다리가 묻히지 않도록 옅게, 아래쪽만 다음 섹션으로 자연스럽게 어둡힌다 */}
      <div
        ref={scrimRef}
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/30 to-black"
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.45)_0%,_transparent_45%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Mouse-tracked red glow (rAF로 직접 갱신 — React 리렌더 없음) */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.18) 0%, transparent 55%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center"
      >

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkle weight="fill" className="w-5 h-5 text-red-400" />
          <span className="text-red-400 text-sm tracking-widest uppercase font-medium [text-shadow:0_0_12px_rgba(220,38,38,0.6)]">
            {t.subtitle}
          </span>
          <Sparkle weight="fill" className="w-5 h-5 text-red-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6"
        >
          <Image
            src="/logo_white.png"
            alt="RED BRIDGE DEV"
            width={500}
            height={120}
            className="h-12 sm:h-14 md:h-16 w-auto mx-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>

        {/* 가장 큰 요소는 로고가 아니라 메시지 — 페이지의 h1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-4xl mx-auto text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.8)]"
        >
          {t.tagline1}
          <br className="hidden sm:block" />{" "}
          <span className="text-red-400">{t.taglineHighlight}</span> {t.tagline2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-gray-300 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              trackEvent("cta_click", { location: "hero", label: "contact" });
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary px-8 py-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(220, 38, 38, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              {t.ctaPrimary}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </motion.a>

          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              trackEvent("cta_click", { location: "hero", label: "portfolio" });
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.ctaSecondary}
          </motion.a>
        </motion.div>

        {/* Stats on glass */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-4xl mx-auto border border-white/15 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          {t.stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, type: "spring" }}
                className="text-3xl sm:text-4xl font-bold text-red-400 mb-2 [text-shadow:0_0_20px_rgba(220,38,38,0.5)]"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
        aria-label={language === "ko" ? "다음 섹션으로 스크롤" : "Scroll to next section"}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
          <CaretDown size={24} weight="bold" />
        </motion.div>
      </motion.button>
    </section>
  );
}
