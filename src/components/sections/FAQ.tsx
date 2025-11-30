"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const faqData = {
  ko: [
    {
      question: "프로젝트 진행 과정은 어떻게 되나요?",
      answer:
        "프로젝트는 기획 → 디자인 → 개발 → 테스트 → 배포 → 유지보수의 단계로 진행됩니다. 각 단계마다 고객과 긴밀하게 소통하며 피드백을 반영합니다. 프로젝트 규모에 따라 2주에서 3개월 정도 소요됩니다.",
    },
    {
      question: "개발 비용은 어떻게 산정되나요?",
      answer:
        "프로젝트의 범위, 복잡도, 개발 기간에 따라 비용이 산정됩니다. 초기 상담을 통해 요구사항을 파악한 후 상세한 견적서를 제공해 드립니다. 무료 상담을 통해 대략적인 예산 범위를 먼저 확인하실 수 있습니다.",
    },
    {
      question: "유지보수는 어떻게 지원되나요?",
      answer:
        "프로젝트 완료 후 1~3개월의 무상 유지보수 기간을 제공합니다. 이후에는 월정액 또는 건별 유지보수 계약을 통해 지속적인 지원이 가능합니다. 긴급 이슈 발생 시 24시간 내 대응을 원칙으로 합니다.",
    },
    {
      question: "어떤 기술 스택을 사용하나요?",
      answer:
        "프론트엔드는 React, Next.js, Vue.js를, 백엔드는 Node.js, Python(FastAPI), Go를 주로 사용합니다. 모바일 앱은 React Native, Flutter로 크로스 플랫폼 개발을 지원합니다. 클라우드는 AWS, GCP 환경을 지원합니다.",
    },
    {
      question: "기존 시스템과 연동이 가능한가요?",
      answer:
        "네, 가능합니다. REST API, GraphQL, 웹훅 등 다양한 방식으로 기존 시스템과의 연동을 지원합니다. ERP, CRM, 결제 시스템 등 다양한 외부 서비스와의 통합 경험이 풍부합니다.",
    },
    {
      question: "프로젝트 진행 중 요구사항 변경이 가능한가요?",
      answer:
        "애자일 방법론을 적용하여 유연하게 요구사항 변경에 대응합니다. 다만, 큰 범위의 변경은 일정과 비용에 영향을 줄 수 있으므로 사전 협의가 필요합니다. 스프린트 단위로 진행 상황을 공유하며 조율합니다.",
    },
  ],
  en: [
    {
      question: "What is the project development process?",
      answer:
        "Projects proceed through Planning → Design → Development → Testing → Deployment → Maintenance stages. We communicate closely with clients at each stage and incorporate feedback. Depending on the project scope, it takes 2 weeks to 3 months.",
    },
    {
      question: "How is the development cost calculated?",
      answer:
        "Costs are calculated based on project scope, complexity, and development period. After understanding your requirements through initial consultation, we provide a detailed quote. You can first check the approximate budget range through a free consultation.",
    },
    {
      question: "How is maintenance supported?",
      answer:
        "We provide 1-3 months of free maintenance after project completion. Afterwards, continuous support is available through monthly or per-case maintenance contracts. We respond to urgent issues within 24 hours.",
    },
    {
      question: "What technology stack do you use?",
      answer:
        "For frontend, we primarily use React, Next.js, and Vue.js. For backend, we use Node.js, Python(FastAPI), and Go. For mobile apps, we support cross-platform development with React Native and Flutter. We support AWS and GCP cloud environments.",
    },
    {
      question: "Is integration with existing systems possible?",
      answer:
        "Yes, it is possible. We support integration with existing systems through REST API, GraphQL, webhooks, and more. We have extensive experience integrating with various external services including ERP, CRM, and payment systems.",
    },
    {
      question: "Can requirements be changed during the project?",
      answer:
        "We apply agile methodology to flexibly respond to requirement changes. However, large-scale changes may affect schedule and cost, so prior consultation is required. We share progress and coordinate on a sprint basis.",
    },
  ],
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  theme: string;
}

function FAQItem({ question, answer, isOpen, onToggle, index, theme }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
    >
      <button
        onClick={onToggle}
        className={`w-full py-6 flex items-center justify-between text-left group ${
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
              ? "bg-red-500 text-white"
              : theme === "dark"
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`pb-6 leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {answer}
            </p>
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
        theme === "dark"
          ? "bg-gradient-to-b from-gray-950 to-black"
          : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-3xl ${
            theme === "dark" ? "bg-red-900/5" : "bg-red-100/30"
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

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`rounded-2xl border ${
            theme === "dark"
              ? "bg-gray-900/30 border-gray-800"
              : "bg-white border-gray-200 shadow-sm"
          } p-2`}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
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
