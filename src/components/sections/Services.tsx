"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Server, Database, Cloud, Cog } from "lucide-react";

const services = [
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
    icon: Smartphone,
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
    icon: Server,
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
    icon: Cog,
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
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-red-800/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            Our Services
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            서비스 <span className="text-red-500">영역</span>
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            웹, 앱, 백엔드부터 클라우드 인프라까지, 전 영역에 걸친 개발 서비스를 제공합니다
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
              <div className="h-full p-8 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-red-900/50 transition-all duration-500 overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}
                  >
                    <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-red-500" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
          <p className="text-gray-400 mb-6">
            프로젝트에 필요한 서비스가 궁금하신가요?
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-medium hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            무료 상담 받기
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
