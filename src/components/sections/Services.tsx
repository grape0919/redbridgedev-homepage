"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RbdServiceWeb,
  RbdServiceApp,
  RbdServiceBackend,
  RbdServiceDatabase,
  RbdServiceCloud,
  RbdServiceSolution,
} from "@/components/icons/rbd-icons";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import IconTile from "@/components/ui/IconTile";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";


// 실제로 만들어 운영해 본 영역만 서비스로 내건다. 각 카드는 대응하는 포트폴리오 사례로 연결된다.
const servicesData = {
  ko: [
    {
      icon: RbdServiceWeb,
      title: "홈페이지 · 브랜드 사이트",
      description:
        "회사 소개, 브랜드, 제품 카탈로그 사이트를 디자인 구현부터 운영자 관리 화면까지 만듭니다.",
      features: [
        "반응형 디자인 구현",
        "운영자용 콘텐츠 관리(CMS)",
        "검색 노출(SEO) 설정",
        "다국어 · 다크모드",
      ],
      gradient: "from-red-500 to-orange-500",
      caseSlug: "wine-importer",
      caseLabel: "와인 수입사 브랜드 사이트",
    },
    {
      icon: RbdServiceSolution,
      title: "웹서비스 · SaaS",
      description:
        "회원·결제·구독이 들어가는 웹서비스를 기획 단계부터 출시 후 운영까지 함께합니다.",
      features: [
        "회원가입 · 소셜 로그인",
        "정기결제 · 구독 관리",
        "관리자 화면 · 통계",
        "웹 + 앱 동시 서비스",
      ],
      gradient: "from-red-500 to-pink-500",
      caseSlug: "vocaro",
      caseLabel: "영어 학습 SaaS",
    },
    {
      icon: RbdServiceApp,
      title: "MVP 개발",
      description:
        "아이디어를 가장 빨리 검증할 수 있는 범위로 좁혀, 실제로 동작하는 첫 버전을 만듭니다.",
      features: [
        "핵심 기능 범위 설계",
        "웹 · 모바일 앱(Flutter)",
        "빠른 출시와 피드백 반영",
        "출시 후 확장 가능한 구조",
      ],
      gradient: "from-red-500 to-rose-500",
      caseSlug: "petblood",
      caseLabel: "AI 리포트 MVP",
    },
    {
      icon: RbdServiceDatabase,
      title: "업무 시스템",
      description:
        "예약, 대기열, 재고, 정산처럼 현장에서 손으로 하던 업무를 웹 시스템으로 바꿉니다.",
      features: [
        "현장 맞춤 업무 흐름 설계",
        "문자 · 알림 자동화",
        "관리자 대시보드",
        "자동 배포 · 백업",
      ],
      gradient: "from-red-500 to-amber-500",
      caseSlug: "hospital-queue",
      caseLabel: "병원 대기열 관리 시스템",
    },
    {
      icon: RbdServiceBackend,
      title: "결제 · 인증 · 백엔드",
      description:
        "결제, 본인인증, 검색처럼 실수가 허용되지 않는 서버 기능을 설계하고 연동합니다.",
      features: [
        "PG 결제 · 간편결제 연동",
        "휴대폰 본인인증",
        "검색 · 추천 엔진",
        "기존 시스템 API 연동",
      ],
      gradient: "from-red-500 to-violet-500",
      caseSlug: "payments",
      caseLabel: "QR 간편결제 시스템",
    },
    {
      icon: RbdServiceCloud,
      title: "AI 기능 개발",
      description:
        "챗봇, 문서 인식, 음성 대화 같은 AI 기능을 실제 서비스에 안전하게 붙입니다.",
      features: [
        "LLM 챗봇 · 상담 자동화",
        "이미지 · 문서 인식",
        "음성 인식 · 합성",
        "AI 답변 품질 검증",
      ],
      gradient: "from-red-500 to-red-700",
      caseSlug: "ai-backend",
      caseLabel: "AI 대화 서비스 백엔드",
    },
  ],
  en: [
    {
      icon: RbdServiceWeb,
      title: "Websites & Brand Sites",
      description:
        "Company, brand, and catalog sites — from design implementation to an admin the owner can run.",
      features: [
        "Responsive design build",
        "Owner-managed content (CMS)",
        "Search visibility (SEO)",
        "Multilingual · dark mode",
      ],
      gradient: "from-red-500 to-orange-500",
      caseSlug: "wine-importer",
      caseLabel: "Wine importer brand site",
    },
    {
      icon: RbdServiceSolution,
      title: "Web Services & SaaS",
      description:
        "Web services with accounts, payments, and subscriptions — from planning through post-launch operations.",
      features: [
        "Sign-up · social login",
        "Recurring billing · subscriptions",
        "Admin screens · analytics",
        "Web + app from one codebase",
      ],
      gradient: "from-red-500 to-pink-500",
      caseSlug: "vocaro",
      caseLabel: "English learning SaaS",
    },
    {
      icon: RbdServiceApp,
      title: "MVP Development",
      description:
        "We narrow your idea to the fastest testable scope and ship a first version that actually works.",
      features: [
        "Core feature scoping",
        "Web · mobile app (Flutter)",
        "Fast launch and iteration",
        "A structure that scales after launch",
      ],
      gradient: "from-red-500 to-rose-500",
      caseSlug: "petblood",
      caseLabel: "AI report MVP",
    },
    {
      icon: RbdServiceDatabase,
      title: "Business Systems",
      description:
        "Reservations, queues, inventory, settlements — we turn manual on-site work into web systems.",
      features: [
        "Workflow design for your operation",
        "SMS · notification automation",
        "Admin dashboards",
        "Automated deploys · backups",
      ],
      gradient: "from-red-500 to-amber-500",
      caseSlug: "hospital-queue",
      caseLabel: "Hospital queue system",
    },
    {
      icon: RbdServiceBackend,
      title: "Payments · Identity · Backend",
      description:
        "Payments, identity verification, search — server features where mistakes aren't an option.",
      features: [
        "Payment gateway integration",
        "Phone identity verification",
        "Search · recommendation engines",
        "API integration with existing systems",
      ],
      gradient: "from-red-500 to-violet-500",
      caseSlug: "payments",
      caseLabel: "QR payment system",
    },
    {
      icon: RbdServiceCloud,
      title: "AI Features",
      description:
        "Chatbots, document recognition, voice conversations — AI features added safely to real services.",
      features: [
        "LLM chatbots · support automation",
        "Image · document recognition",
        "Speech recognition · synthesis",
        "AI answer quality checks",
      ],
      gradient: "from-red-500 to-red-700",
      caseSlug: "ai-backend",
      caseLabel: "AI chat service backend",
    },
  ],
};

const content = {
  ko: {
    subtitle: "Our Services",
    title: "무엇을",
    titleHighlight: "만드나요",
    description: "홈페이지부터 결제·AI가 들어간 서비스까지 — 직접 만들어 운영해 본 영역만 말합니다",
    relatedCase: "관련 사례",
    ctaQuestion: "어떤 방식이 맞을지 아직 모르겠다면, 상황부터 들려주세요",
    ctaButton: "무료 상담 받기",
  },
  en: {
    subtitle: "Our Services",
    title: "What We",
    titleHighlight: "Build",
    description: "From websites to services with payments and AI — only what we've built and run ourselves",
    relatedCase: "Case study",
    ctaQuestion: "Not sure which fits? Tell us your situation first",
    ctaButton: "Get Free Consultation",
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];
  const services = servicesData[language];

  return (
    <section
      id="services"
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      {/* Ambient color field for liquid glass refraction */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`glass-ambient animate-drift top-[-10%] right-[-5%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-400"
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

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-panel h-full p-8 rounded-3xl overflow-hidden">
                {/* Specular highlight on hover */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}
                />

                {/* Icon */}
                <div className="relative">
                  <IconTile gradient={service.gradient} size="lg" className="mb-6">
                    <service.icon className="w-10 h-10" />
                  </IconTile>

                  {/* Title & Description */}
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mb-6 leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-3 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* 관련 포트폴리오 사례 */}
                  <Link
                    href={`/portfolio/${service.caseSlug}/`}
                    onClick={() =>
                      trackEvent("select_content", {
                        content_type: "service_case",
                        item_id: service.caseSlug,
                      })
                    }
                    className={`mt-7 pt-5 flex items-center justify-between gap-3 border-t text-sm transition-colors hover:text-red-500 ${
                      theme === "dark"
                        ? "border-white/10 text-gray-400"
                        : "border-gray-900/10 text-gray-600"
                    }`}
                  >
                    <span>
                      <span className="text-red-500 font-medium">{t.relatedCase}</span>
                      <span className="mx-2 opacity-40">·</span>
                      {service.caseLabel}
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.ctaQuestion}
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.ctaButton}
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
