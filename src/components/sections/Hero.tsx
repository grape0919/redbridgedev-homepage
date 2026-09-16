"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { motion } from "framer-motion";
import { CaretDown, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { gsap } from "@/lib/gsap";
import {
  subscribePerfMode,
  getPerfLowSnapshot,
  getPerfLowServerSnapshot,
} from "@/lib/perfMode";

// Desktop-only gate so mobile skips the 1.7MB video (keeps LCP low on small screens).
const subscribeMediaQuery = () => () => {};
const getDesktopSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches;
const getServerSnapshot = () => false;

// 저사양 기기 감지 — 코어 수·메모리가 적거나 모션 최소화 설정이면
// 비디오 대신 포스터 이미지를 쓰고 스크롤 scrub 변형을 생략한다.
const getLowPowerSnapshot = () => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    (navigator.hardwareConcurrency || 8) <= 4 ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};
const getLowPowerServerSnapshot = () => true;

const content = {
  ko: {
    subtitle: "Web / App / Solution Development",
    tagline1: "고객과 기술을",
    taglineHighlight: "안전하고 튼튼하게",
    tagline2: "연결합니다",
    description: "지속 가능하고 확장 가능한 솔루션을 구축하는 개발 파트너",
    ctaPrimary: "프로젝트 시작하기",
    ctaSecondary: "포트폴리오 보기",
    scroll: "Scroll",
    stats: [
      { value: "10+", label: "경력" },
      { value: "50+", label: "프로젝트" },
      { value: "100%", label: "고객 만족도" },
      { value: "24/7", label: "지원 가능" },
    ],
  },
  en: {
    subtitle: "Web / App / Solution Development",
    tagline1: "Connecting customers and technology",
    taglineHighlight: "safely and securely",
    tagline2: "",
    description: "A development partner building sustainable and scalable solutions",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Portfolio",
    scroll: "Scroll",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "50+", label: "Projects Completed" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  const showVideo = isDesktop && !lowPower && !perfLow;
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const video = videoRef.current;
    if (video && prefersReducedMotion) {
      video.pause();
    }
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = containerRef.current;
      const video = videoRef.current;
      const contentEl = contentRef.current;
      const scrim = scrimRef.current;
      // 저사양 모드에서는 video가 렌더되지 않으므로 scrub 타임라인 전체가 생략된다.
      if (!section || !video || !contentEl || !scrim) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        tl.to(video, { scale: 1.12, yPercent: 8, ease: "none" }, 0)
          .to(contentEl, { yPercent: -20, ease: "none" }, 0)
          .to(scrim, { opacity: 1.4, ease: "none" }, 0);
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [showVideo]);

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
      {/* Background — 고성능 데스크톱만 비디오, 모바일·저사양은 포스터 이미지 (LCP·프레임 확보) */}
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Cinematic_Tech_Brand_Hero_Video.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Cinematic scrim — darkens edges, keeps center slightly clearer */}
      <div
        ref={scrimRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_80%)]" />

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
        {/* SEO: primary H1 for search engines (visually replaced by logo + tagline below) */}
        <h1 className="sr-only">
          {language === "ko"
            ? "RED BRIDGE DEV — 웹 · 앱 · 솔루션 외주 개발"
            : "RED BRIDGE DEV — Web / App / Solution Outsourcing Development"}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkle weight="fill" className="w-5 h-5 text-red-400" />
          <span className="text-red-400 text-sm tracking-widest uppercase font-medium drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]">
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
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto mx-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl sm:text-2xl mb-4 max-w-3xl mx-auto text-gray-100 drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
        >
          {t.tagline1}{" "}
          <span className="text-red-400 font-medium">{t.taglineHighlight}</span>{" "}
          {t.tagline2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg mb-12 max-w-2xl mx-auto text-gray-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
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
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all shadow-[0_8px_32px_rgba(220,38,38,0.4)]"
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
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full font-medium text-white border border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
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
                className="text-3xl sm:text-4xl font-bold text-red-400 mb-2 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"
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
