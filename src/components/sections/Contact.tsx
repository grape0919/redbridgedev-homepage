"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

// 카카오톡 채널 아이콘 (SVG)
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 3c-5.08 0-9.19 3.34-9.19 7.47 0 2.63 1.73 4.94 4.34 6.27-.14.48-.89 3.08-.93 3.33 0 0-.02.08.04.11.06.03.12.02.12.02.16-.02 1.87-1.22 2.73-1.79.94.14 1.92.21 2.89.21 5.08 0 9.19-3.34 9.19-7.47S17.08 3 12 3z" />
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: "이메일",
    value: "contact@redbridge.dev",
    href: "mailto:contact@redbridge.dev",
  },
  {
    icon: Phone,
    label: "전화",
    value: "02-1234-5678",
    href: "tel:02-1234-5678",
  },
  {
    icon: MapPin,
    label: "주소",
    value: "서울특별시 강남구",
    href: "#",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      text: "안녕하세요! RED BRIDGE DEV입니다. 프로젝트 문의나 궁금한 점이 있으시면 말씀해 주세요!",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, you would send this to your backend
    console.log("Form submitted:", formData);
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
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      text: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "감사합니다! 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.",
        "네, 해당 내용 확인했습니다. 구체적인 프로젝트 일정이나 예산이 있으시다면 알려주세요!",
        "좋은 질문이네요! 해당 기술에 대해서는 풍부한 경험이 있습니다. 더 자세한 상담을 원하시면 이메일이나 전화로 연락 부탁드립니다.",
        "프로젝트 규모에 따라 다르지만, 일반적으로 2-4주 내에 시작 가능합니다.",
      ];

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const openKakaoChannel = () => {
    // 카카오톡 채널 URL - 실제 채널 ID로 교체 필요
    window.open("https://pf.kakao.com/_xxxxxC", "_blank");
  };

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-black to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-3xl" />
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
            Contact Us
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            프로젝트 <span className="text-red-500">문의</span>
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            새로운 프로젝트를 시작하고 싶으시다면 언제든 연락주세요
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
              <h3 className="text-2xl font-bold text-white mb-6">연락처</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-red-900/30 rounded-xl flex items-center justify-center group-hover:bg-red-900/50 transition-colors">
                      <info.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="text-white group-hover:text-red-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick contact buttons */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">빠른 연락</h3>
              <div className="flex flex-col gap-4">
                <motion.button
                  onClick={openKakaoChannel}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#FEE500] rounded-xl text-black font-medium hover:bg-[#FDD800] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <KakaoIcon />
                  카카오톡 채널 문의
                </motion.button>

                <motion.button
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  실시간 채팅 시작
                </motion.button>
              </div>
            </div>

            {/* Business hours */}
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-4">
                운영 시간
              </h4>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-gray-500">평일:</span> 09:00 - 18:00
                </p>
                <p>
                  <span className="text-gray-500">점심시간:</span> 12:00 - 13:00
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  * 긴급 문의는 카카오톡 채널로 연락주세요
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="회사명 (선택사항)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    프로젝트 유형 *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  >
                    <option value="" className="bg-gray-900">
                      선택해주세요
                    </option>
                    <option value="web" className="bg-gray-900">
                      웹 개발
                    </option>
                    <option value="app" className="bg-gray-900">
                      앱 개발
                    </option>
                    <option value="solution" className="bg-gray-900">
                      솔루션 개발
                    </option>
                    <option value="consulting" className="bg-gray-900">
                      기술 컨설팅
                    </option>
                    <option value="other" className="bg-gray-900">
                      기타
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  예상 예산
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">
                    선택해주세요
                  </option>
                  <option value="under1000" className="bg-gray-900">
                    1,000만원 미만
                  </option>
                  <option value="1000-3000" className="bg-gray-900">
                    1,000만원 - 3,000만원
                  </option>
                  <option value="3000-5000" className="bg-gray-900">
                    3,000만원 - 5,000만원
                  </option>
                  <option value="5000-1억" className="bg-gray-900">
                    5,000만원 - 1억원
                  </option>
                  <option value="over1억" className="bg-gray-900">
                    1억원 이상
                  </option>
                  <option value="미정" className="bg-gray-900">
                    미정
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  프로젝트 설명 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                  placeholder="프로젝트에 대해 자세히 알려주세요. (기능, 일정, 특별 요구사항 등)"
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
                    전송 중...
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    전송 완료!
                  </>
                ) : formStatus === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    오류 발생. 다시 시도해주세요.
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    문의하기
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Chat widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-600 to-red-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">RED BRIDGE DEV</h4>
                  <p className="text-xs text-white/70">보통 몇 분 내 응답</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-red-600 text-white rounded-br-md"
                        : "bg-gray-800 text-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user"
                          ? "text-white/50"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleChatSubmit}
              className="p-4 border-t border-gray-800"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating chat button (when chat is closed) */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg shadow-red-900/30 flex items-center justify-center z-50 hover:from-red-500 hover:to-red-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
