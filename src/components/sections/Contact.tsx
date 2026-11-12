"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Envelope,
  Phone,
  MapPin,
  ChatCircle,
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";

import { openChannelTalk, openChannelTalkWithMessage } from "@/components/ui/ChannelTalk";
import { trackEvent } from "@/lib/analytics";

const contactInfoData = {
  ko: [
    {
      icon: Envelope,
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
      href: "",
    },
  ],
  en: [
    {
      icon: Envelope,
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
      href: "",
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
    urgentNotice: "* 긴급 문의는 실시간 채팅을 이용해주세요",
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
        web: "홈페이지 · 브랜드 사이트",
        app: "웹서비스 · 앱 · MVP",
        solution: "업무 시스템",
        consulting: "결제 · 인증 · AI 연동",
        other: "기타 / 아직 잘 모르겠어요",
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
      idle: "문의 보내기",
      loading: "전송 중...",
      success: "채팅창에서 전송 버튼을 눌러주세요",
      error: "오류 발생. 다시 시도해주세요.",
      sentHint: "작성하신 내용이 실시간 채팅창에 입력되었습니다. 전송 버튼만 누르면 접수됩니다.",
      emailInstead: "채팅창이 열리지 않나요? 이메일로 보내기",
      consent: "문의를 보내면 상담 목적의 개인정보(이름·이메일·회사명) 수집·이용에 동의하는 것으로 봅니다.",
      consentLink: "개인정보처리방침",
      editAgain: "내용 수정하기",
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
    urgentNotice: "* For urgent inquiries, please use live chat",
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
        web: "Website · Brand Site",
        app: "Web Service · App · MVP",
        solution: "Business System",
        consulting: "Payments · Identity · AI",
        other: "Other / Not sure yet",
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
      success: "Press send in the chat window",
      error: "Error occurred. Please try again.",
      sentHint: "Your inquiry has been filled into the live chat. Just press send to submit it.",
      emailInstead: "Chat didn't open? Send by email instead",
      consent: "By sending an inquiry you agree to the collection and use of your name, email, and company for consultation purposes.",
      consentLink: "Privacy Policy",
      editAgain: "Edit inquiry",
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

  // 정적 사이트라 자체 메일 서버가 없다. 문의는 실제로 응대하는 채널(채널톡)로 보낸다:
  // 작성 내용을 채팅 입력창에 채워 열고, 방문자가 전송을 누르면 접수된다. 이메일은 대안 경로.
  const buildInquiry = () => {
    const projectTypeLabel = formData.projectType
      ? t.form.projectTypes[formData.projectType as keyof typeof t.form.projectTypes]
      : "-";
    const budgetLabel = formData.budget
      ? t.form.budgets[formData.budget as keyof typeof t.form.budgets]
      : language === "ko"
      ? "미정"
      : "TBD";
    const lines =
      language === "ko"
        ? [
            "[프로젝트 문의]",
            `이름: ${formData.name}`,
            `이메일: ${formData.email}`,
            `회사명: ${formData.company || "-"}`,
            `프로젝트 유형: ${projectTypeLabel}`,
            `예상 예산: ${budgetLabel}`,
            "",
            formData.message,
          ]
        : [
            "[Project Inquiry]",
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Company: ${formData.company || "-"}`,
            `Project type: ${projectTypeLabel}`,
            `Budget: ${budgetLabel}`,
            "",
            formData.message,
          ];
    return { text: lines.join("\n"), projectTypeLabel, budgetLabel };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { text, projectTypeLabel, budgetLabel } = buildInquiry();
    openChannelTalkWithMessage(text);
    trackEvent("generate_lead", {
      method: "channel_talk",
      project_type: projectTypeLabel,
      budget: budgetLabel,
    });
    setFormStatus("success");
  };

  const mailtoHref = () => {
    const { text, projectTypeLabel } = buildInquiry();
    const subject =
      language === "ko"
        ? `[프로젝트 문의] ${formData.name} — ${projectTypeLabel}`
        : `[Project Inquiry] ${formData.name} — ${projectTypeLabel}`;
    return `mailto:contact@redbridgedev.ai.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className={`relative py-32 overflow-hidden ${
      theme === "dark" ? "bg-black" : "bg-gray-50"
    }`}>
      {/* Ambient liquid-glass refraction source */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`glass-ambient animate-drift top-[5%] left-[10%] w-[560px] h-[560px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className={`text-xl font-bold mb-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.contactTitle}</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  // 주소처럼 연결할 곳이 없는 항목은 링크 대신 일반 카드로 렌더
                  <a
                    key={info.label}
                    {...(info.href ? { href: info.href } : { role: "presentation" })}
                    className="glass-panel flex items-center gap-4 group p-4 rounded-2xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 p-0.5 shadow-[0_4px_16px_rgba(220,38,38,0.3)] flex-shrink-0">
                      <div
                        className={`w-full h-full rounded-xl flex items-center justify-center ${
                          theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
                        }`}
                      >
                        <info.icon weight="duotone" className="w-5 h-5 text-red-500" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        {info.label}
                      </p>
                      <p className={`group-hover:text-red-400 transition-colors font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
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
                  onClick={() => {
                    trackEvent("chat_open", { location: "contact_quick" });
                    openChannelTalk();
                  }}
                  className="btn-primary w-full py-4 gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChatCircle weight="duotone" className="w-5 h-5" />
                  {t.chatButton}
                </motion.button>
              </div>
            </div>

            {/* Business hours */}
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {t.businessHours}
              </h4>
              <div className={`space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <p>
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{t.weekdays}:</span> 09:00 - 18:00
                </p>
                <p>
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{t.lunchTime}:</span> 12:00 - 13:00
                </p>
                <p className={`text-sm mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
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
            <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
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
                    className={`glass-input ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                    className={`glass-input ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                    className={`glass-input ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                    className={`glass-input ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                  className={`glass-input ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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
                  className={`glass-input resize-none ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  placeholder={t.form.messagePlaceholder}
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus === "loading" || formStatus === "success"}
                aria-live="polite"
                className={`w-full py-4 rounded-full text-white font-medium flex items-center justify-center gap-2 transition-all ${
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
                    <CircleNotch weight="bold" className="w-5 h-5 animate-spin" />
                    {t.submit.loading}
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle weight="duotone" className="w-5 h-5" />
                    {t.submit.success}
                  </>
                ) : formStatus === "error" ? (
                  <>
                    <WarningCircle weight="duotone" className="w-5 h-5" />
                    {t.submit.error}
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt weight="fill" className="w-5 h-5" />
                    {t.submit.idle}
                  </>
                )}
              </motion.button>

              {formStatus === "success" && (
                <div
                  role="status"
                  className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  <p>{t.submit.sentHint}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <a
                      href={mailtoHref()}
                      onClick={() => trackEvent("generate_lead", { method: "email" })}
                      className="text-red-500 hover:text-red-400 underline underline-offset-2"
                    >
                      {t.submit.emailInstead}
                    </a>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className={`underline underline-offset-2 ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      {t.submit.editAgain}
                    </button>
                  </p>
                </div>
              )}

              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                {t.submit.consent}{" "}
                <a
                  href="/개인정보처리방침.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-red-500"
                >
                  {t.submit.consentLink}
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
