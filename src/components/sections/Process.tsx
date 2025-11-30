"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const processData = {
  ko: [
    {
      icon: MessageSquare,
      step: "01",
      title: "상담 & 분석",
      description: "프로젝트 목표, 요구사항, 예산을 파악하고 최적의 솔루션을 제안합니다.",
      duration: "1-2일",
    },
    {
      icon: FileText,
      step: "02",
      title: "기획 & 설계",
      description: "상세 기능 명세서, 와이어프레임, 시스템 아키텍처를 설계합니다.",
      duration: "1-2주",
    },
    {
      icon: Palette,
      step: "03",
      title: "디자인",
      description: "브랜드 아이덴티티를 반영한 UI/UX 디자인을 제작합니다.",
      duration: "1-2주",
    },
    {
      icon: Code,
      step: "04",
      title: "개발",
      description: "최신 기술 스택으로 안정적이고 확장 가능한 코드를 작성합니다.",
      duration: "2-8주",
    },
    {
      icon: TestTube,
      step: "05",
      title: "테스트 & QA",
      description: "철저한 테스트를 통해 버그를 수정하고 품질을 보장합니다.",
      duration: "1-2주",
    },
    {
      icon: Rocket,
      step: "06",
      title: "배포 & 런칭",
      description: "최적화된 환경에서 서비스를 배포하고 모니터링을 시작합니다.",
      duration: "1-3일",
    },
    {
      icon: Headphones,
      step: "07",
      title: "유지보수",
      description: "지속적인 모니터링과 업데이트로 서비스 안정성을 유지합니다.",
      duration: "지속",
    },
  ],
  en: [
    {
      icon: MessageSquare,
      step: "01",
      title: "Consultation & Analysis",
      description: "Understand project goals, requirements, and budget to propose optimal solutions.",
      duration: "1-2 days",
    },
    {
      icon: FileText,
      step: "02",
      title: "Planning & Design",
      description: "Design detailed specifications, wireframes, and system architecture.",
      duration: "1-2 weeks",
    },
    {
      icon: Palette,
      step: "03",
      title: "Design",
      description: "Create UI/UX design reflecting brand identity.",
      duration: "1-2 weeks",
    },
    {
      icon: Code,
      step: "04",
      title: "Development",
      description: "Write stable and scalable code with the latest technology stack.",
      duration: "2-8 weeks",
    },
    {
      icon: TestTube,
      step: "05",
      title: "Testing & QA",
      description: "Fix bugs and ensure quality through thorough testing.",
      duration: "1-2 weeks",
    },
    {
      icon: Rocket,
      step: "06",
      title: "Deployment & Launch",
      description: "Deploy service in an optimized environment and start monitoring.",
      duration: "1-3 days",
    },
    {
      icon: Headphones,
      step: "07",
      title: "Maintenance",
      description: "Maintain service stability with continuous monitoring and updates.",
      duration: "Ongoing",
    },
  ],
};

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const steps = processData[language];

  const content = {
    ko: {
      subtitle: "Our Process",
      title: "개발",
      titleHighlight: "프로세스",
      description: "체계적인 프로세스로 성공적인 프로젝트를 완성합니다",
    },
    en: {
      subtitle: "Our Process",
      title: "Development",
      titleHighlight: "Process",
      description: "We complete successful projects with a systematic process",
    },
  };

  const t = content[language];

  return (
    <section
      id="process"
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
            theme === "dark" ? "bg-red-900/5" : "bg-red-50/50"
          }`}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className={`mt-4 text-4xl sm:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t.title} <span className="text-red-500">{t.titleHighlight}</span>
          </h2>
          <p className={`mt-6 text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          />

          {/* Process steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:flex lg:items-center ${
                    isEven ? "lg:justify-end" : ""
                  } lg:mb-16`}
                >
                  {/* Content card */}
                  <div
                    className={`relative lg:w-[calc(50%-40px)] ${
                      isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl border transition-all duration-300 group hover:border-red-900/50 ${
                        theme === "dark"
                          ? "bg-gray-900/50 border-gray-800"
                          : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            theme === "dark"
                              ? "bg-red-900/30 group-hover:bg-red-900/50"
                              : "bg-red-100 group-hover:bg-red-200"
                          } transition-colors`}
                        >
                          <step.icon className="w-7 h-7 text-red-500" />
                        </div>

                        <div className="flex-1">
                          {/* Step number & Duration */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-500 text-sm font-bold">
                              STEP {step.step}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                theme === "dark"
                                  ? "bg-gray-800 text-gray-400"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {step.duration}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-xl font-bold mb-2 ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-sm leading-relaxed ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 hidden lg:block ${
                      theme === "dark"
                        ? "bg-red-500 border-black"
                        : "bg-red-500 border-white"
                    }`}
                    style={{ top: "50%" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === "ko" ? "프로젝트 시작하기" : "Start a Project"}
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
