"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Lightning,
  Users,
  Target,
  Code,
  StackSimple,
} from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const valuesData = {
  ko: [
    {
      icon: ShieldCheck,
      title: "안정성",
      description:
        "대기업과 중견기업에서 쌓은 풍부한 경험을 바탕으로, 모든 프로젝트에 최고의 품질과 안정성을 보장합니다.",
    },
    {
      icon: Lightning,
      title: "확장성",
      description:
        "트래픽 증가와 기능 추가에 유연하게 대응하는 아키텍처 설계로, 서비스 성장 단계마다 흔들림 없이 확장합니다.",
    },
    {
      icon: Users,
      title: "협업",
      description:
        "'다리'라는 이름처럼 고객과 기술을 안전하고 튼튼하게 연결합니다. 소통을 최우선으로 생각합니다.",
    },
    {
      icon: Target,
      title: "목표 지향",
      description:
        "고객의 비즈니스 목표를 깊이 이해하고, 그 목표 달성을 위한 최적의 기술 솔루션을 제안합니다.",
    },
    {
      icon: Code,
      title: "기술 전문성",
      description:
        "최신 기술 트렌드를 지속적으로 학습하고 적용하여, 항상 최선의 기술적 선택을 제공합니다.",
    },
    {
      icon: StackSimple,
      title: "체계적 프로세스",
      description:
        "체계적인 개발 프로세스와 철저한 품질 관리로 프로젝트의 성공을 보장합니다.",
    },
  ],
  en: [
    {
      icon: ShieldCheck,
      title: "Stability",
      description:
        "Based on extensive experience with large and mid-sized companies, we guarantee the highest quality and stability in every project.",
    },
    {
      icon: Lightning,
      title: "Scalability",
      description:
        "Architectures designed to handle traffic growth and new features gracefully, so your service scales without friction.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Like our name 'bridge', we safely connect customers and technology. Communication is our top priority.",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description:
        "We deeply understand our clients' business goals and propose optimal technology solutions to achieve them.",
    },
    {
      icon: Code,
      title: "Technical Expertise",
      description:
        "We continuously learn and apply the latest technology trends to always provide the best technical choices.",
    },
    {
      icon: StackSimple,
      title: "Systematic Process",
      description:
        "We ensure project success through a systematic development process and thorough quality management.",
    },
  ],
};

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "GraphQL", category: "API" },
];

const content = {
  ko: {
    subtitle: "About Us",
    title: "우리의",
    titleHighlight: "개발 철학",
    description:
      "RED BRIDGE DEV(레드 브릿지 데브)는 '다리'라는 이름처럼 고객과 기술을 안전하고 튼튼하게 연결합니다. 우리는 단순히 코드를 작성하는 것이 아니라, 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    techSubtitle: "Tech Stack",
    techTitle: "기술 스택",
  },
  en: {
    subtitle: "About Us",
    title: "Our",
    titleHighlight: "Development Philosophy",
    description:
      "RED BRIDGE DEV, as the name 'bridge' suggests, safely and securely connects customers and technology. We don't just write code, we build sustainable and scalable solutions.",
    techSubtitle: "Tech Stack",
    techTitle: "Technology Stack",
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];
  const values = valuesData[language];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const grid = valuesGridRef.current;
      if (!grid) return;

      const ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".value-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 80, rotationX: 8, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: 0.8,
                },
              }
            );
          });
      }, grid);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [language]);

  return (
    <section
      id="about"
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Ambient liquid-glass refraction source */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`glass-ambient animate-drift top-[5%] left-[10%] w-[520px] h-[520px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
        <div
          className={`glass-ambient animate-drift-reverse bottom-[5%] right-[10%] w-[520px] h-[520px] ${
            theme === "dark" ? "bg-orange-600" : "bg-amber-300"
          }`}
          style={{ animationDelay: "-7s" }}
        />
        <div
          className={`glass-ambient animate-drift top-[50%] right-[35%] w-[380px] h-[380px] ${
            theme === "dark" ? "bg-violet-600" : "bg-violet-300"
          }`}
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <h2
            className={`mt-4 text-4xl sm:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title} <span className="text-red-500">{t.titleHighlight}</span>
          </h2>
          <p
            className={`mt-6 text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.description}
          </p>
        </motion.div>

        {/* Values grid */}
        <div
          ref={valuesGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
          style={{ perspective: "1200px" }}
        >
          {values.map((value) => (
            <div
              key={value.title}
              className="value-card glass-panel group relative p-8 rounded-3xl overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-0.5 mb-6 shadow-[0_6px_20px_rgba(220,38,38,0.3)]">
                  <div
                    className={`w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-xl ${
                      theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
                    }`}
                  >
                    <value.icon weight="duotone" className="w-6 h-6 text-red-500" />
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            {t.techSubtitle}
          </span>
          <h3
            className={`mt-4 text-3xl sm:text-4xl font-bold mb-12 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t.techTitle}
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`glass-panel px-6 py-3 rounded-full cursor-default ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
