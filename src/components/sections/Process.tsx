"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RbdProcessConsultation,
  RbdProcessPlanning,
  RbdProcessDesign,
  RbdProcessDevelopment,
  RbdProcessTesting,
  RbdProcessLaunch,
  RbdProcessMaintenance,
} from "@/components/icons/rbd-icons";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const processData = {
  ko: [
    {
      icon: RbdProcessConsultation,
      step: "01",
      title: "상담 & 분석",
      description: "프로젝트 목표, 요구사항, 예산을 파악하고 최적의 솔루션을 제안합니다.",
      duration: "1-2일",
    },
    {
      icon: RbdProcessPlanning,
      step: "02",
      title: "기획 & 설계",
      description: "상세 기능 명세서, 와이어프레임, 시스템 아키텍처를 설계합니다.",
      duration: "1-2주",
    },
    {
      icon: RbdProcessDesign,
      step: "03",
      title: "디자인",
      description: "브랜드 아이덴티티를 반영한 UI/UX 디자인을 제작합니다.",
      duration: "1-2주",
    },
    {
      icon: RbdProcessDevelopment,
      step: "04",
      title: "개발",
      description: "최신 기술 스택으로 안정적이고 확장 가능한 코드를 작성합니다.",
      duration: "2-8주",
    },
    {
      icon: RbdProcessTesting,
      step: "05",
      title: "테스트 & QA",
      description: "철저한 테스트를 통해 버그를 수정하고 품질을 보장합니다.",
      duration: "1-2주",
    },
    {
      icon: RbdProcessLaunch,
      step: "06",
      title: "배포 & 런칭",
      description: "최적화된 환경에서 서비스를 배포하고 모니터링을 시작합니다.",
      duration: "1-3일",
    },
    {
      icon: RbdProcessMaintenance,
      step: "07",
      title: "유지보수",
      description: "지속적인 모니터링과 업데이트로 서비스 안정성을 유지합니다.",
      duration: "지속",
    },
  ],
  en: [
    {
      icon: RbdProcessConsultation,
      step: "01",
      title: "Consultation & Analysis",
      description: "Understand project goals, requirements, and budget to propose optimal solutions.",
      duration: "1-2 days",
    },
    {
      icon: RbdProcessPlanning,
      step: "02",
      title: "Planning & Design",
      description: "Design detailed specifications, wireframes, and system architecture.",
      duration: "1-2 weeks",
    },
    {
      icon: RbdProcessDesign,
      step: "03",
      title: "Design",
      description: "Create UI/UX design reflecting brand identity.",
      duration: "1-2 weeks",
    },
    {
      icon: RbdProcessDevelopment,
      step: "04",
      title: "Development",
      description: "Write stable and scalable code with the latest technology stack.",
      duration: "2-8 weeks",
    },
    {
      icon: RbdProcessTesting,
      step: "05",
      title: "Testing & QA",
      description: "Fix bugs and ensure quality through thorough testing.",
      duration: "1-2 weeks",
    },
    {
      icon: RbdProcessLaunch,
      step: "06",
      title: "Deployment & Launch",
      description: "Deploy service in an optimized environment and start monitoring.",
      duration: "1-3 days",
    },
    {
      icon: RbdProcessMaintenance,
      step: "07",
      title: "Maintenance",
      description: "Maintain service stability with continuous monitoring and updates.",
      duration: "Ongoing",
    },
  ],
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileInView = useInView(mobileRef, { once: true, margin: "-100px" });
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

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track || !progress) return;

      const getDistance = () => track.scrollWidth - window.innerWidth + 160;

      const ctx = gsap.context(() => {
        const horizontalTween = gsap.to(track, {
          x: () => `-${getDistance()}`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.35, scale: 0.94, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                containerAnimation: horizontalTween,
                start: "left 70%",
                end: "center center",
                scrub: true,
              },
            }
          );
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [language]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient background (liquid glass refraction source) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`glass-ambient animate-drift top-[10%] left-[5%] w-[540px] h-[540px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
        <div
          className={`glass-ambient animate-drift-reverse bottom-[10%] right-[5%] w-[540px] h-[540px] ${
            theme === "dark" ? "bg-violet-600" : "bg-violet-300"
          }`}
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Desktop: pinned horizontal scrub */}
      <div className="hidden lg:flex relative h-screen w-full flex-col">
        {/* Header */}
        <div className="relative max-w-7xl mx-auto px-8 pt-24 text-center w-full">
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
            className={`mt-4 text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.description}
          </p>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 pl-[10vw] pr-[20vw] will-change-transform"
          >
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="process-step flex-shrink-0 w-[440px]"
              >
                <div className="glass-panel rounded-3xl p-8 h-[360px] flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-0.5 shadow-[0_8px_24px_rgba(220,38,38,0.35)]">
                      <div
                        className={`w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-xl ${
                          theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
                        }`}
                      >
                        <step.icon className="w-10 h-10 text-red-500/85" />
                      </div>
                    </div>
                    <span className="text-6xl font-extrabold text-red-500/20 tracking-tighter">
                      {step.step}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-500 text-xs font-bold tracking-widest">
                      STEP {step.step}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-red-500/40 to-transparent" />
                    <span
                      className={`text-xs px-3 py-1 rounded-full glass-panel ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {steps.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`h-1 rounded-full transition-all ${
                            dotIndex === index
                              ? "w-8 bg-red-500"
                              : dotIndex < index
                              ? "w-4 bg-red-500/50"
                              : `w-4 ${
                                  theme === "dark" ? "bg-white/20" : "bg-gray-300"
                                }`
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {index + 1} / {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* End CTA card */}
            <div className="process-step flex-shrink-0 w-[440px]">
              <div className="glass-panel rounded-3xl p-8 h-[360px] flex flex-col justify-center items-center text-center">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {language === "ko"
                    ? "지금 프로젝트를 시작하세요"
                    : "Start Your Project Now"}
                </h3>
                <p
                  className={`mb-8 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {language === "ko"
                    ? "체계적인 프로세스로 당신의 아이디어를 현실로"
                    : "Turn your idea into reality with a systematic process"}
                </p>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium shadow-[0_8px_32px_rgba(220,38,38,0.4)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === "ko" ? "무료 상담 받기" : "Get Free Consultation"}
                  <span>→</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative max-w-7xl mx-auto px-8 pb-10 w-full">
          <div
            className={`h-1 rounded-full overflow-hidden ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          >
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-red-500 to-red-700 origin-left scale-x-0"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs tracking-widest uppercase">
            <span
              className={theme === "dark" ? "text-gray-500" : "text-gray-400"}
            >
              {language === "ko" ? "시작" : "Start"}
            </span>
            <span
              className={theme === "dark" ? "text-gray-500" : "text-gray-400"}
            >
              {language === "ko" ? "스크롤하여 탐색" : "Scroll to explore"}
            </span>
            <span
              className={theme === "dark" ? "text-gray-500" : "text-gray-400"}
            >
              {language === "ko" ? "런칭" : "Launch"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile / tablet / reduced-motion fallback */}
      <div
        ref={mobileRef}
        className="lg:hidden relative max-w-3xl mx-auto px-4 sm:px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={mobileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <h2
            className={`mt-4 text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title} <span className="text-red-500">{t.titleHighlight}</span>
          </h2>
          <p
            className={`mt-4 text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.description}
          </p>
        </motion.div>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={mobileInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 p-0.5 flex-shrink-0">
                  <div
                    className={`w-full h-full rounded-xl flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
                    }`}
                  >
                    <step.icon className="w-7 h-7 text-red-500/85" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-500 text-xs font-bold tracking-widest">
                      STEP {step.step}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        theme === "dark"
                          ? "bg-white/10 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={mobileInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium shadow-[0_8px_32px_rgba(220,38,38,0.4)]"
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
