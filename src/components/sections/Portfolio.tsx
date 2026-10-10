"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap";
import {
  ArrowRight,
  Brain,
  CaretRight,
  ClipboardText,
  MapPin,
  Notebook,
  QrCode,
  Wine,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/components/portfolio/meta";

// 메인 페이지에 노출할 대표 프로젝트 — 데이터는 /portfolio 와 동일한 meta.ts 단일 소스
const featured: {
  slug: string;
  icon: React.ComponentType<{ size?: number; weight?: "duotone" }>;
  gradient: string;
}[] = [
  { slug: "vocaro", icon: Notebook, gradient: "from-red-500 to-orange-500" },
  { slug: "payments", icon: QrCode, gradient: "from-red-500 to-pink-500" },
  { slug: "ai-backend", icon: Brain, gradient: "from-red-500 to-violet-500" },
  { slug: "hospital-queue", icon: ClipboardText, gradient: "from-red-500 to-rose-500" },
  { slug: "search", icon: MapPin, gradient: "from-red-500 to-amber-500" },
  { slug: "goldluckwine", icon: Wine, gradient: "from-red-500 to-red-700" },
];

const content = {
  ko: {
    subtitle: "Our Work",
    title: "포트폴리오",
    description: "직접 설계하고 구축해 운영까지 책임진 실제 프로젝트들입니다",
    viewMore: "자세히 보기",
    viewAll: "전체 포트폴리오 보기",
    moreProjects: "비슷한 프로젝트를 계획 중이신가요?",
    contactUs: "문의하기",
    live: "운영 중",
  },
  en: {
    subtitle: "Our Work",
    title: "Portfolio",
    description: "Real projects we designed, built, and operate in production",
    viewMore: "View Details",
    viewAll: "View Full Portfolio",
    moreProjects: "Planning a similar project?",
    contactUs: "Contact Us",
    live: "Live",
  },
};

// 운영 중 뱃지를 달 프로젝트 (period에 '운영 중'이 포함된 것과 동일하지만 명시적으로 관리)
const liveSlugs = new Set(["vocaro", "hospital-queue", "goldluckwine"]);

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxBackRef = useRef<HTMLDivElement>(null);
  const parallaxMidRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const back = parallaxBackRef.current;
      const mid = parallaxMidRef.current;
      if (!section || !back || !mid) return;

      const ctx = gsap.context(() => {
        gsap.to(back, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(mid, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Parallax layer 1 — deepest (ambient color field) */}
      <div
        ref={parallaxBackRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <div
          className={`glass-ambient animate-drift top-[5%] right-[-8%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
        <div
          className={`glass-ambient animate-drift-reverse bottom-[5%] left-[-8%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-violet-600" : "bg-violet-300"
          }`}
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* Parallax layer 2 — mid (grid pattern) */}
      <div
        ref={parallaxMidRef}
        className="absolute inset-0 grid-pattern opacity-30 will-change-transform"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <h2 className={`mt-4 text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t.title}
          </h2>
          <p className={`mt-6 text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.description}
          </p>
        </motion.div>

        {/* Featured project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((f, index) => {
            const project = projects.find((p) => p.slug === f.slug);
            if (!project) return null;
            const c = language === "ko" ? project : project.en;
            const Icon = f.icon;
            return (
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/portfolio/${f.slug}/`}
                  className={`group relative flex flex-col h-full min-h-[300px] rounded-2xl overflow-hidden border p-7 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-900/60 border-gray-800 hover:border-red-900/60"
                      : "bg-white border-gray-200 hover:border-red-300 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {/* Corner gradient accent */}
                  <div
                    aria-hidden
                    className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}
                  />

                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.gradient} text-white shadow-lg shadow-red-900/20`}
                    >
                      <Icon size={24} weight="duotone" />
                    </div>
                    {liveSlugs.has(f.slug) && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600/10 text-red-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {t.live}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`mt-5 text-xl font-bold leading-snug group-hover:text-red-500 transition-colors ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {c.oneLiner}
                  </p>
                  <p className="mt-3 text-xs font-medium text-red-500">{c.role}</p>

                  <span
                    className={`mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      theme === "dark"
                        ? "text-gray-500 group-hover:text-red-400"
                        : "text-gray-400 group-hover:text-red-500"
                    }`}
                  >
                    {t.viewMore}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all + contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Link
            href="/portfolio/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
          >
            {t.viewAll}
            <ArrowRight size={18} weight="bold" />
          </Link>
          <p className={`mt-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.moreProjects}{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors font-medium"
            >
              {t.contactUs}
              <CaretRight size={16} weight="bold" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
