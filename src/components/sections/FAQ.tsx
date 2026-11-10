"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";


interface FAQEntry {
  question: string;
  answer: string;
  /** 답변 아래에 붙는 더 읽을거리 링크 (가이드 등) */
  link?: { href: string; label: string };
}

const faqData: Record<"ko" | "en", FAQEntry[]> = {
  ko: [
    {
      question: "어떤 프로젝트를 맡길 수 있나요?",
      answer:
        "홈페이지·브랜드 사이트, 회원·결제가 들어가는 웹서비스와 SaaS, MVP, 예약·대기열 같은 업무 시스템, 결제·본인인증·AI 기능 연동을 맡습니다. 기획이 정리되지 않은 단계여도 괜찮습니다. 디자인은 협력 디자이너와 함께 진행하거나 보유하신 시안을 그대로 구현합니다.",
      link: { href: "/portfolio/", label: "실제 프로젝트 사례 보기" },
    },
    {
      question: "개발 비용은 어떻게 산정되나요?",
      answer:
        "프로젝트의 범위, 복잡도, 개발 기간에 따라 산정합니다. 무료 상담에서 대략적인 예산 범위를 먼저 확인하실 수 있고, 요구사항을 정리한 뒤에는 산정 근거가 담긴 견적서를 드립니다.",
      link: { href: "/guides/outsourcing-cost/", label: "외주 개발 비용 가이드 읽기" },
    },
    {
      question: "개발 기간은 얼마나 걸리나요?",
      answer:
        "프로젝트 규모에 따라 2주에서 3개월 정도 소요됩니다. 상담 → 기획·설계 → 디자인 → 개발 → 테스트 → 배포 순으로 진행하며, 단계마다 진행 상황을 공유하고 피드백을 반영합니다.",
      link: { href: "/guides/mvp-development/", label: "MVP 개발 기간과 프로세스 읽기" },
    },
    {
      question: "유지보수는 어떻게 지원되나요?",
      answer:
        "프로젝트 완료 후 1~3개월의 무상 유지보수 기간을 제공합니다. 이후에는 월정액 또는 건별 유지보수 계약으로 지속적인 지원이 가능합니다. 긴급 이슈는 24시간 내 대응을 원칙으로 합니다.",
      link: { href: "/guides/maintenance-contract/", label: "유지보수 계약 가이드 읽기" },
    },
    {
      question: "어떤 기술 스택을 사용하나요?",
      answer:
        "프론트엔드는 Next.js·React(TypeScript), 백엔드는 Python(FastAPI)과 Supabase·PostgreSQL·MySQL, 모바일 앱은 Flutter를 주로 사용합니다. 프로젝트 성격과 운영 비용에 맞춰 선택하며, 이미 사용 중인 기술이 있다면 그에 맞춥니다.",
    },
    {
      question: "기존 시스템과 연동이 가능한가요?",
      answer:
        "네, 가능합니다. REST API와 웹훅으로 기존 시스템과 연동하며, 결제(PG), 휴대폰 본인인증, 문자 발송, 검색 엔진 연동을 실제 서비스에서 구축·운영한 경험이 있습니다.",
    },
    {
      question: "프로젝트 진행 중 요구사항 변경이 가능한가요?",
      answer:
        "가능합니다. 주 단위로 진행 상황을 공유하며 우선순위를 함께 조정합니다. 다만 범위가 크게 바뀌는 변경은 일정과 비용에 영향을 줄 수 있어 사전에 협의합니다.",
    },
    {
      question: "개인 개발자(프리랜서)에게 맡기는 것과 무엇이 다른가요?",
      answer:
        "기획·디자인·개발·배포·운영을 한 팀이 책임지고, 진행 과정과 산출물을 문서로 남깁니다. 담당자 한 사람의 사정에 프로젝트가 멈추지 않도록 운영 절차와 인수인계 자료까지 함께 납품합니다.",
      link: { href: "/guides/freelancer-vs-agency/", label: "프리랜서 vs 에이전시 비교 읽기" },
    },
  ],
  en: [
    {
      question: "What kinds of projects do you take on?",
      answer:
        "Websites and brand sites, web services and SaaS with accounts and payments, MVPs, business systems such as reservations and queues, and integrations for payments, identity verification, and AI features. It's fine if your plan isn't fully formed yet. For design, we work with partner designers or build from the mockups you already have.",
      link: { href: "/portfolio/", label: "See real project cases" },
    },
    {
      question: "How is the development cost calculated?",
      answer:
        "Cost depends on scope, complexity, and timeline. A free consultation gives you a rough budget range first; once requirements are organized, you receive a quote that shows how it was calculated.",
      link: { href: "/guides/outsourcing-cost/", label: "Read the cost guide (Korean)" },
    },
    {
      question: "How long does development take?",
      answer:
        "Typically two weeks to three months depending on scale. We move through consultation → planning → design → development → testing → deployment, sharing progress and applying feedback at each stage.",
      link: { href: "/guides/mvp-development/", label: "Read the MVP timeline guide (Korean)" },
    },
    {
      question: "How is maintenance supported?",
      answer:
        "We provide 1–3 months of free maintenance after completion. After that, ongoing support is available through monthly or per-case contracts. Urgent issues are answered within 24 hours.",
      link: { href: "/guides/maintenance-contract/", label: "Read the maintenance guide (Korean)" },
    },
    {
      question: "What technology stack do you use?",
      answer:
        "Mainly Next.js and React (TypeScript) on the frontend, Python (FastAPI) with Supabase, PostgreSQL, or MySQL on the backend, and Flutter for mobile apps. We choose based on the project and its running costs, and adapt to technology you already use.",
    },
    {
      question: "Is integration with existing systems possible?",
      answer:
        "Yes. We integrate through REST APIs and webhooks, and have built and operated payment gateway, phone identity verification, SMS, and search engine integrations in production services.",
    },
    {
      question: "Can requirements be changed during the project?",
      answer:
        "Yes. We share progress weekly and adjust priorities together. Changes that significantly alter the scope can affect schedule and cost, so we agree on those in advance.",
    },
    {
      question: "How is this different from hiring a freelancer?",
      answer:
        "One team owns planning, design, development, deployment, and operations, and documents the process and deliverables. We also hand over operating procedures and transition materials so the project never depends on a single person's availability.",
      link: { href: "/guides/freelancer-vs-agency/", label: "Read freelancer vs agency (Korean)" },
    },
  ],
};

interface FAQItemProps {
  question: string;
  answer: string;
  link?: { href: string; label: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  theme: string;
}

function FAQItem({ question, answer, link, isOpen, onToggle, index, theme }: FAQItemProps) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-b last:border-b-0 ${
        theme === "dark" ? "border-white/10" : "border-gray-900/10"
      }`}
    >
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`w-full py-6 px-2 flex items-center justify-between text-left group ${
          theme === "dark" ? "hover:text-red-400" : "hover:text-red-500"
        } transition-colors`}
      >
        <span className={`text-lg font-medium pr-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isOpen
              ? "bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              : theme === "dark"
              ? "bg-white/10 text-gray-300 border border-white/10"
              : "bg-gray-900/5 text-gray-600 border border-gray-900/10"
          }`}
        >
          {isOpen ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-2">
              <p className={`leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {answer}
              </p>
              {link && (
                <Link
                  href={link.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                >
                  {link.label}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const faqs = faqData[language];

  const content = {
    ko: {
      subtitle: "FAQ",
      title: "자주 묻는",
      titleHighlight: "질문",
      description: "프로젝트 진행에 대해 궁금하신 점을 확인하세요",
      moreQuestions: "더 궁금한 점이 있으신가요?",
      contactUs: "문의하기",
    },
    en: {
      subtitle: "FAQ",
      title: "Frequently Asked",
      titleHighlight: "Questions",
      description: "Find answers to common questions about our projects",
      moreQuestions: "Have more questions?",
      contactUs: "Contact Us",
    },
  };

  const t = content[language];

  return (
    <section
      id="faq"
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      {/* Ambient liquid-glass refraction source */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`glass-ambient animate-drift top-[15%] right-[-5%] w-[540px] h-[540px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionHeader
            eyebrow={t.subtitle}
            title={t.title}
            highlight={t.titleHighlight}
            description={t.description}
          />
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel rounded-3xl p-4 sm:p-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              link={faq.link}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
              theme={theme}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.moreQuestions}
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            {t.contactUs}
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
