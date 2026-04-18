"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  DeviceMobile,
  HardDrives,
  Database,
  Cloud,
  Gear,
} from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const servicesData = {
  ko: [
    {
      icon: Globe,
      title: "웹 개발",
      description:
        "반응형 웹 애플리케이션, SPA, PWA 등 최신 웹 기술을 활용한 맞춤형 웹 솔루션을 제공합니다.",
      features: [
        "반응형 웹 디자인",
        "Progressive Web App",
        "SEO 최적화",
        "고성능 웹 애플리케이션",
      ],
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: DeviceMobile,
      title: "앱 개발",
      description:
        "iOS와 Android를 위한 네이티브 및 크로스 플랫폼 모바일 앱을 개발합니다.",
      features: [
        "React Native / Flutter",
        "iOS & Android 네이티브",
        "앱스토어 배포",
        "푸시 알림 시스템",
      ],
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: HardDrives,
      title: "백엔드 개발",
      description:
        "확장 가능하고 안정적인 서버 아키텍처와 API를 설계하고 구축합니다.",
      features: [
        "RESTful API 설계",
        "마이크로서비스 아키텍처",
        "실시간 데이터 처리",
        "보안 및 인증 시스템",
      ],
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Database,
      title: "데이터베이스 설계",
      description:
        "효율적인 데이터 모델링과 최적화된 데이터베이스 설계를 제공합니다.",
      features: [
        "데이터베이스 설계",
        "성능 최적화",
        "데이터 마이그레이션",
        "백업 및 복구 전략",
      ],
      gradient: "from-red-500 to-amber-500",
    },
    {
      icon: Cloud,
      title: "클라우드 인프라",
      description:
        "AWS, GCP, Azure 등 클라우드 환경에서의 인프라 구축 및 운영을 지원합니다.",
      features: [
        "클라우드 아키텍처 설계",
        "CI/CD 파이프라인",
        "컨테이너 오케스트레이션",
        "모니터링 및 로깅",
      ],
      gradient: "from-red-500 to-violet-500",
    },
    {
      icon: Gear,
      title: "솔루션 개발",
      description:
        "기업 맞춤형 소프트웨어 솔루션 및 자동화 시스템을 개발합니다.",
      features: [
        "ERP/CRM 커스터마이징",
        "업무 자동화 솔루션",
        "레거시 시스템 현대화",
        "API 통합 서비스",
      ],
      gradient: "from-red-500 to-red-700",
    },
  ],
  en: [
    {
      icon: Globe,
      title: "Web Development",
      description:
        "We provide custom web solutions using the latest web technologies including responsive web applications, SPAs, and PWAs.",
      features: [
        "Responsive Web Design",
        "Progressive Web App",
        "SEO Optimization",
        "High-Performance Web Apps",
      ],
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: DeviceMobile,
      title: "App Development",
      description:
        "We develop native and cross-platform mobile apps for iOS and Android.",
      features: [
        "React Native / Flutter",
        "iOS & Android Native",
        "App Store Deployment",
        "Push Notification System",
      ],
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: HardDrives,
      title: "Backend Development",
      description:
        "We design and build scalable and reliable server architectures and APIs.",
      features: [
        "RESTful API Design",
        "Microservices Architecture",
        "Real-time Data Processing",
        "Security & Authentication",
      ],
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Database,
      title: "Database Design",
      description:
        "We provide efficient data modeling and optimized database design.",
      features: [
        "Database Design",
        "Performance Optimization",
        "Data Migration",
        "Backup & Recovery Strategy",
      ],
      gradient: "from-red-500 to-amber-500",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "We support infrastructure deployment and operation on AWS, GCP, Azure and more.",
      features: [
        "Cloud Architecture Design",
        "CI/CD Pipeline",
        "Container Orchestration",
        "Monitoring & Logging",
      ],
      gradient: "from-red-500 to-violet-500",
    },
    {
      icon: Gear,
      title: "Solution Development",
      description:
        "We develop custom enterprise software solutions and automation systems.",
      features: [
        "ERP/CRM Customization",
        "Workflow Automation",
        "Legacy System Modernization",
        "API Integration Services",
      ],
      gradient: "from-red-500 to-red-700",
    },
  ],
};

const content = {
  ko: {
    subtitle: "Our Services",
    title: "서비스",
    titleHighlight: "영역",
    description: "웹, 앱, 백엔드부터 클라우드 인프라까지, 전 영역에 걸친 개발 서비스를 제공합니다",
    ctaQuestion: "프로젝트에 필요한 서비스가 궁금하신가요?",
    ctaButton: "무료 상담 받기",
  },
  en: {
    subtitle: "Our Services",
    title: "Service",
    titleHighlight: "Areas",
    description: "We provide development services across all areas from web, apps, backend to cloud infrastructure",
    ctaQuestion: "Curious about the services you need for your project?",
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
        theme === "dark"
          ? "bg-gradient-to-b from-black via-gray-950 to-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Ambient color field for liquid glass refraction */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`glass-ambient animate-drift top-[-10%] right-[-5%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-400"
          }`}
        />
        <div
          className={`glass-ambient animate-drift-reverse bottom-[-10%] left-[-5%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-orange-600" : "bg-amber-300"
          }`}
        />
        <div
          className={`glass-ambient animate-drift top-[30%] left-[20%] w-[480px] h-[480px] ${
            theme === "dark" ? "bg-violet-600" : "bg-violet-300"
          }`}
          style={{ animationDelay: "-6s" }}
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
            className={`mt-6 text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.description}
          </p>
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
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 shadow-lg`}
                  >
                    <div
                      className={`w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-xl ${
                        theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
                      }`}
                    >
                      <service.icon weight="duotone" className="w-8 h-8 text-red-500" />
                    </div>
                  </div>

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
