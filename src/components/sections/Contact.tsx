"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { openChannelTalk } from "@/components/ui/ChannelTalk";

const contactInfoData = {
  ko: [
    {
      icon: Mail,
      label: "이메일",
      value: "contact@redbridgedev.ai.kr",
      href: "mailto:contact@redbridgedev.ai.kr",
    },
    {
      icon: Phone,
      label: "전화",
      value: "010-2896-5049",
      href: "tel:010-2896-5049",
    },
    {
      icon: MapPin,
      label: "주소",
      value: "서울특별시 중구",
      href: "#",
    },
  ],
  en: [
    {
      icon: Mail,
      label: "Email",
      value: "contact@redbridgedev.ai.kr",
      href: "mailto:contact@redbridgedev.ai.kr",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+82-10-2896-5049",
      href: "tel:010-2896-5049",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Jung-gu, Seoul, Korea",
      href: "#",
    },
  ],
};

const content = {
  ko: {
    subtitle: "Contact Us",
    title: "프로젝트",
    titleHighlight: "문의",
    description: "새로운 프로젝트를 시작하고 싶으시다면 언제든 연락주세요",
    contactTitle: "연락처",
    quickContact: "빠른 연락",
    kakaoButton: "카카오톡 채널 문의",
    chatButton: "실시간 채팅 시작",
    businessHours: "운영 시간",
    weekdays: "평일",
    lunchTime: "점심시간",
    urgentNotice: "* 긴급 문의는 카카오톡 채널로 연락주세요",
    form: {
      name: "이름",
      email: "이메일",
      company: "회사명",
      companyPlaceholder: "회사명 (선택사항)",
      projectType: "프로젝트 유형",
      budget: "예상 예산",
      message: "프로젝트 설명",
      messagePlaceholder: "프로젝트에 대해 자세히 알려주세요. (기능, 일정, 특별 요구사항 등)",
      namePlaceholder: "홍길동",
      selectPlaceholder: "선택해주세요",
      projectTypes: {
        web: "웹 개발",
        app: "앱 개발",
        solution: "솔루션 개발",
        consulting: "기술 컨설팅",
        other: "기타",
      },
      budgets: {
        under1000: "1,000만원 미만",
        "1000-3000": "1,000만원 - 3,000만원",
        "3000-5000": "3,000만원 - 5,000만원",
        "5000-1억": "5,000만원 - 1억원",
        over1억: "1억원 이상",
        미정: "미정",
      },
    },
    submit: {
      idle: "문의하기",
      loading: "전송 중...",
      success: "전송 완료!",
      error: "오류 발생. 다시 시도해주세요.",
    },
    chat: {
      title: "RED BRIDGE DEV",
      responseTime: "보통 몇 분 내 응답",
      placeholder: "메시지를 입력하세요...",
      initialMessage: "안녕하세요! RED BRIDGE DEV입니다. 프로젝트 문의나 궁금한 점이 있으시면 말씀해 주세요!",
      botResponses: [
        "감사합니다! 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.",
        "네, 해당 내용 확인했습니다. 구체적인 프로젝트 일정이나 예산이 있으시다면 알려주세요!",
        "좋은 질문이네요! 해당 기술에 대해서는 풍부한 경험이 있습니다. 더 자세한 상담을 원하시면 이메일이나 전화로 연락 부탁드립니다.",
        "프로젝트 규모에 따라 다르지만, 일반적으로 2-4주 내에 시작 가능합니다.",
      ],
    },
  },
  en: {
    subtitle: "Contact Us",
    title: "Project",
    titleHighlight: "Inquiry",
    description: "Contact us anytime if you want to start a new project",
    contactTitle: "Contact",
    quickContact: "Quick Contact",
    kakaoButton: "KakaoTalk Channel",
    chatButton: "Start Live Chat",
    businessHours: "Business Hours",
    weekdays: "Weekdays",
    lunchTime: "Lunch Break",
    urgentNotice: "* For urgent inquiries, please contact via KakaoTalk",
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      companyPlaceholder: "Company Name (Optional)",
      projectType: "Project Type",
      budget: "Estimated Budget",
      message: "Project Description",
      messagePlaceholder: "Tell us about your project in detail. (Features, timeline, special requirements, etc.)",
      namePlaceholder: "John Doe",
      selectPlaceholder: "Please select",
      projectTypes: {
        web: "Web Development",
        app: "App Development",
        solution: "Solution Development",
        consulting: "Technical Consulting",
        other: "Other",
      },
      budgets: {
        under1000: "Under $10K",
        "1000-3000": "$10K - $30K",
        "3000-5000": "$30K - $50K",
        "5000-1억": "$50K - $100K",
        over1억: "Over $100K",
        미정: "TBD",
      },
    },
    submit: {
      idle: "Send Inquiry",
      loading: "Sending...",
      success: "Sent Successfully!",
      error: "Error occurred. Please try again.",
    },
    chat: {
      title: "RED BRIDGE DEV",
      responseTime: "Usually responds in a few minutes",
      placeholder: "Type a message...",
      initialMessage: "Hello! This is RED BRIDGE DEV. Feel free to ask about your project or any questions!",
      botResponses: [
        "Thank you! Our team will review and get back to you shortly.",
        "Got it! If you have specific project timeline or budget in mind, please let us know!",
        "Great question! We have extensive experience with that technology. For a detailed consultation, please contact us via email or phone.",
        "Depending on the project scope, we can typically start within 2-4 weeks.",
      ],
    },
  },
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];
  const contactInfo = contactInfoData[language];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    // 프로젝트 유형 한글/영문 변환
    const projectTypeLabel = formData.projectType
      ? t.form.projectTypes[formData.projectType as keyof typeof t.form.projectTypes]
      : "";

    // 예산 한글/영문 변환
    const budgetLabel = formData.budget
      ? t.form.budgets[formData.budget as keyof typeof t.form.budgets]
      : language === "ko" ? "미정" : "TBD";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: projectTypeLabel,
          budget: budgetLabel,
          message: formData.message,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFormStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          message: "",
        });
        setFormStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");

      // Reset error status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  return (
    <section id="contact" className={`relative py-32 overflow-hidden ${
      theme === "dark"
        ? "bg-gradient-to-b from-black to-gray-950"
        : "bg-gradient-to-b from-gray-50 to-white"
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
          theme === "dark" ? "bg-red-900/10" : "bg-red-100/50"
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
          theme === "dark" ? "bg-red-800/10" : "bg-red-50/50"
        }`} />
      </div>

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
            {t.title} <span className="text-red-500">{t.titleHighlight}</span>
          </h2>
          <p className={`mt-6 text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.contactTitle}</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      theme === "dark"
                        ? "bg-red-900/30 group-hover:bg-red-900/50"
                        : "bg-red-100 group-hover:bg-red-200"
                    }`}>
                      <info.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className={`group-hover:text-red-400 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick contact buttons */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.quickContact}</h3>
              <div className="flex flex-col gap-4">
                <motion.button
                  onClick={openChannelTalk}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.chatButton}
                </motion.button>
              </div>
            </div>

            {/* Business hours */}
            <div className={`p-6 rounded-2xl border ${
              theme === "dark"
                ? "bg-gray-900/50 border-gray-800"
                : "bg-white border-gray-200 shadow-sm"
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {t.businessHours}
              </h4>
              <div className={`space-y-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <p>
                  <span className="text-gray-500">{t.weekdays}:</span> 09:00 - 18:00
                </p>
                <p>
                  <span className="text-gray-500">{t.lunchTime}:</span> 12:00 - 13:00
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  {t.urgentNotice}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t.form.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors ${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder={t.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t.form.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors ${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t.form.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors ${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder={t.form.companyPlaceholder}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t.form.projectType} *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors ${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800 text-white"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.selectPlaceholder}
                    </option>
                    <option value="web" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.projectTypes.web}
                    </option>
                    <option value="app" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.projectTypes.app}
                    </option>
                    <option value="solution" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.projectTypes.solution}
                    </option>
                    <option value="consulting" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.projectTypes.consulting}
                    </option>
                    <option value="other" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                      {t.form.projectTypes.other}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {t.form.budget}
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-900/50 border border-gray-800 text-white"
                      : "bg-white border border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.selectPlaceholder}
                  </option>
                  <option value="under1000" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets.under1000}
                  </option>
                  <option value="1000-3000" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets["1000-3000"]}
                  </option>
                  <option value="3000-5000" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets["3000-5000"]}
                  </option>
                  <option value="5000-1억" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets["5000-1억"]}
                  </option>
                  <option value="over1억" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets.over1억}
                  </option>
                  <option value="미정" className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                    {t.form.budgets.미정}
                  </option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {t.form.message} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none ${
                    theme === "dark"
                      ? "bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder={t.form.messagePlaceholder}
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus === "loading" || formStatus === "success"}
                className={`w-full py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  formStatus === "success"
                    ? "bg-green-600"
                    : formStatus === "error"
                    ? "bg-red-600"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
                }`}
                whileHover={
                  formStatus === "idle" ? { scale: 1.02 } : {}
                }
                whileTap={formStatus === "idle" ? { scale: 0.98 } : {}}
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.submit.loading}
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.submit.success}
                  </>
                ) : formStatus === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {t.submit.error}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.submit.idle}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
