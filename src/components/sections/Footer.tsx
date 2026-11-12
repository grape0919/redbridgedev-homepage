"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GithubLogo,
  Envelope,
  ArrowUp,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const footerLinksData = {
  ko: {
    services: [
      { name: "홈페이지 · 브랜드 사이트", href: "#services" },
      { name: "웹서비스 · MVP", href: "#services" },
      { name: "업무 시스템", href: "#services" },
      { name: "결제 · 인증 · AI 연동", href: "#services" },
    ],
    company: [
      { name: "왜 RED BRIDGE", href: "#about" },
      { name: "프로젝트 사례", href: "/portfolio/" },
      { name: "외주 개발 가이드", href: "/guides/" },
      { name: "문의하기", href: "#contact" },
    ],
  },
  en: {
    services: [
      { name: "Websites & Brand Sites", href: "#services" },
      { name: "Web Services & MVPs", href: "#services" },
      { name: "Business Systems", href: "#services" },
      { name: "Payments · Identity · AI", href: "#services" },
    ],
    company: [
      { name: "Why RED BRIDGE", href: "#about" },
      { name: "Case Studies", href: "/portfolio/" },
      { name: "Dev Guides", href: "/guides/" },
      { name: "Contact", href: "#contact" },
    ],
  },
};

const socialLinks = [
  { name: "Github", icon: GithubLogo, href: "https://github.com/grape0919" },
  { name: "Email", icon: Envelope, href: "mailto:contact@redbridgedev.ai.kr" },
];

const content = {
  ko: {
    tagline1: "기획부터 운영까지 책임지는 개발 에이전시.",
    tagline2: "홈페이지·웹서비스·MVP·업무 시스템을 만듭니다.",
    servicesTitle: "서비스",
    companyTitle: "회사",
    contactTitle: "연락처",
    emailLabel: "이메일",
    phoneLabel: "전화",
    addressLabel: "주소",
    address: "서울특별시 중구",
    privacyPolicy: "개인정보처리방침",
  },
  en: {
    tagline1: "A development agency that owns planning through operations.",
    tagline2: "Websites, web services, MVPs, and business systems.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    address: "Jung-gu, Seoul, Korea",
    privacyPolicy: "Privacy Policy",
  },
};

export default function Footer() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];
  const footerLinks = footerLinksData[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.assign(`/${href}`);
      }
    }
  };

  // 맨 위로 버튼: 충분히 내려왔을 때만, 데스크톱에서만 노출 (모바일에서는 콘텐츠를 가린다)
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className={`relative border-t ${
      theme === "dark"
        ? "bg-black border-gray-800"
        : "bg-white border-gray-200"
    }`}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-3 group mb-6"
            >
              <Image
                src={theme === "dark" ? "/logo_white.png" : "/logo_red.png"}
                alt="RED BRIDGE DEV"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <p className={`text-sm leading-relaxed mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {t.tagline1}
              <br />
              {t.tagline2}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    theme === "dark"
                      ? "bg-gray-900 text-gray-400 hover:bg-red-900/30 hover:text-red-500"
                      : "bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon weight="duotone" className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={`font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.servicesTitle}</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className={`hover:text-red-400 transition-colors text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.companyTitle}</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className={`hover:text-red-400 transition-colors text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className={`font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{t.contactTitle}</h3>
            <ul className="space-y-4 text-sm">
              <li className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                <span className="block text-gray-500 mb-1">{t.emailLabel}</span>
                <a
                  href="mailto:contact@redbridgedev.ai.kr"
                  className="hover:text-red-400 transition-colors"
                >
                  contact@redbridgedev.ai.kr
                </a>
              </li>
              <li className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                <span className="block text-gray-500 mb-1">{t.phoneLabel}</span>
                <a
                  href="tel:010-2896-5049"
                  className="hover:text-red-400 transition-colors"
                >
                  010-2896-5049
                </a>
              </li>
              <li className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                <span className="block text-gray-500 mb-1">{t.addressLabel}</span>
                {t.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm text-center sm:text-left">
              <p>© {new Date().getFullYear()} RED BRIDGE DEV {language === "ko" && "(레드 브릿지 데브)"}. All rights reserved.</p>
              <div className="text-xs mt-2 text-gray-400 space-y-0.5">
                <p>{language === "ko" ? "사업자명: 마리파더 (Mari Father) | 대표자명: 김홍교" : "Business Name: Mari Father | CEO: Hongkyo Kim"}</p>
                <p>{language === "ko" ? "사업자 번호: 494-36-01450" : "Business Registration: 494-36-01450"}</p>
                <p>{language === "ko" ? "사업자 주소: 서울시 중구 동호로10길 30" : "Address: 30, Dongho-ro 10-gil, Jung-gu, Seoul, Korea"}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="/개인정보처리방침.pdf"
                download
                className={`text-gray-500 transition-colors ${theme === "dark" ? "hover:text-gray-300" : "hover:text-gray-700"}`}
              >
                {t.privacyPolicy}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        aria-label={language === "ko" ? "맨 위로" : "Back to top"}
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-24 right-6 w-12 h-12 backdrop-blur-sm rounded-full shadow-lg hidden md:flex items-center justify-center hover:text-white hover:bg-red-600 transition-all z-40 ${
          showTop ? "" : "pointer-events-none"
        } ${
          theme === "dark"
            ? "bg-gray-800/80 text-gray-400"
            : "bg-white/80 text-gray-500 border border-gray-200"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTop ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUp weight="bold" className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
