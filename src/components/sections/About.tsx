"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/gsap";
import {
  RbdValueStability,
  RbdValueScalability,
  RbdValueCollaboration,
} from "@/components/icons/rbd-icons";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import IconTile from "@/components/ui/IconTile";



const valuesData = {
  ko: [
    {
      icon: RbdValueStability,
      title: "끝까지 책임지는 오너십",
      description:
        "설계부터 배포·운영 알림·런북까지 한 팀이 한 사이클을 완결합니다. 납품하고 사라지지 않습니다.",
    },
    {
      icon: RbdValueScalability,
      title: "운영 중인 서비스로 증명",
      description:
        "결제·인증·검색·AI를 실서비스에서 직접 운영해 봤습니다. 포트폴리오는 데모가 아니라 지금 돌아가는 서비스입니다.",
    },
    {
      icon: RbdValueCollaboration,
      title: "실패하는 경로부터 설계",
      description:
        "망취소, 드리프트 감시, 롤백 런북처럼 '잘못됐을 때'를 먼저 설계합니다. 서비스를 세우지 않고 갈아끼우는 데 익숙합니다.",
    },
  ],
  en: [
    {
      icon: RbdValueStability,
      title: "Ownership to the End",
      description:
        "One team closes the full loop — design, deployment, ops alerts, runbooks. We don't deliver and disappear.",
    },
    {
      icon: RbdValueScalability,
      title: "Proven in Production",
      description:
        "Payments, identity, search, and AI — we've run them in live services. Our portfolio isn't demos; it's services running today.",
    },
    {
      icon: RbdValueCollaboration,
      title: "Failure Paths Designed First",
      description:
        "Net-cancel workers, drift monitoring, rollback runbooks — we design for when things go wrong, and swap parts without stopping the service.",
    },
  ],
};

// 포트폴리오에서 실제로 사용한 스택만 — 과장 없이
const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Supabase", category: "Backend" },
  { name: "OpenSearch", category: "Search" },
  { name: "Docker", category: "DevOps" },
  { name: "GitHub Actions", category: "DevOps" },
];

const content = {
  ko: {
    subtitle: "Why RED BRIDGE",
    title: "왜",
    titleHighlight: "RED BRIDGE인가",
    description:
      "외주는 결국 '누가 끝까지 책임지느냐'의 문제입니다. 설계부터 배포·운영까지 한 팀이 책임지고, 지금 운영 중인 실제 서비스로 증명합니다.",
    techSubtitle: "Tech Stack",
    techTitle: "기술 스택",
  },
  en: {
    subtitle: "Why RED BRIDGE",
    title: "Why",
    titleHighlight: "RED BRIDGE",
    description:
      "Outsourcing comes down to who owns the outcome. One team owns design through deployment and operations — proven by services running in production today.",
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
          <SectionHeader
            eyebrow={t.subtitle}
            title={t.title}
            highlight={t.titleHighlight}
            description={t.description}
          />
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
                <IconTile className="mb-6">
                  <value.icon className="w-8 h-8" />
                </IconTile>
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
