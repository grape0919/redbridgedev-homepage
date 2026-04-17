"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const Bridge3D = dynamic(() => import("../three/Bridge3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

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

const subscribe3DCapability = () => () => {};
const get3DCapabilitySnapshot = () => {
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency < 4;
  return !isSmallScreen && !prefersReducedMotion && !lowCores;
};
const get3DCapabilityServerSnapshot = () => false;

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const enable3D = useSyncExternalStore(
    subscribe3DCapability,
    get3DCapabilitySnapshot,
    get3DCapabilityServerSnapshot
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(220, 38, 38, ${theme === "dark" ? "0.15" : "0.1"}) 0%, transparent 50%)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${
            theme === "dark" ? "to-black" : "to-white"
          }`}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* 3D Bridge (desktop only) */}
      {enable3D && (
        <div className="absolute inset-0 z-0">
          <Bridge3D />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-red-500" />
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <Sparkles className="w-5 h-5 text-red-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6"
        >
          <Image
            src={theme === "dark" ? "/logo_white.png" : "/logo_red.png"}
            alt="RED BRIDGE DEV"
            width={500}
            height={120}
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto mx-auto"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={`text-xl sm:text-2xl mb-4 max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t.tagline1}{" "}
          <span className="text-red-500 font-medium">{t.taglineHighlight}</span>{" "}
          {t.tagline2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className={`text-lg mb-12 max-w-2xl mx-auto ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
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
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30 group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(220, 38, 38, 0.4)",
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
            className={`px-8 py-4 border rounded-full font-medium transition-all ${
              theme === "dark"
                ? "border-red-900/50 text-white hover:bg-red-900/20 hover:border-red-700"
                : "border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.ctaSecondary}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {t.stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, type: "spring" }}
                className="text-3xl sm:text-4xl font-bold text-red-500 mb-2"
              >
                {stat.value}
              </motion.div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {stat.label}
              </div>
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
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hover:text-red-500 transition-colors cursor-pointer ${
          theme === "dark" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}
