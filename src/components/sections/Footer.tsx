"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  services: [
    { name: "웹 개발", href: "#services" },
    { name: "앱 개발", href: "#services" },
    { name: "솔루션 개발", href: "#services" },
    { name: "기술 컨설팅", href: "#contact" },
  ],
  company: [
    { name: "회사 소개", href: "#about" },
    { name: "포트폴리오", href: "#portfolio" },
    { name: "문의하기", href: "#contact" },
  ],
  social: [
    { name: "Github", icon: Github, href: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Email", icon: Mail, href: "mailto:contact@redbridge.dev" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-black border-t border-gray-800">
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
                src="/logo_white.png"
                alt="RED BRIDGE DEV"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              고객과 기술을 안전하고 튼튼하게 연결합니다.
              <br />
              지속 가능하고 확장 가능한 솔루션을 구축합니다.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-900/30 hover:text-red-500 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">서비스</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6">회사</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-6">연락처</h3>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400">
                <span className="block text-gray-500 mb-1">이메일</span>
                <a
                  href="mailto:contact@redbridge.dev"
                  className="hover:text-red-400 transition-colors"
                >
                  contact@redbridge.dev
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-gray-500 mb-1">전화</span>
                <a
                  href="tel:02-1234-5678"
                  className="hover:text-red-400 transition-colors"
                >
                  02-1234-5678
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-gray-500 mb-1">주소</span>
                서울특별시 강남구
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RED BRIDGE DEV. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
