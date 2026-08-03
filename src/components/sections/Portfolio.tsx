"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { ArrowSquareOut, CaretRight, X } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";


const projectsData = {
  ko: [
    {
      id: 1,
      title: "글로벌 이커머스 플랫폼",
      category: "Web Development",
      description:
        "대규모 트래픽을 처리하는 글로벌 이커머스 플랫폼. 마이크로서비스 아키텍처 기반으로 설계되어 높은 확장성과 안정성을 제공합니다.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
      color: "from-red-500 to-orange-500",
      metrics: { users: "100만+", performance: "99.9%", response: "< 100ms" },
    },
    {
      id: 2,
      title: "핀테크 모바일 앱",
      category: "App Development",
      description:
        "보안이 중요한 금융 서비스를 위한 크로스 플랫폼 모바일 앱. 생체 인증, 암호화, 실시간 거래 처리 기능을 포함합니다.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      tech: ["React Native", "TypeScript", "Firebase", "Stripe"],
      color: "from-red-500 to-pink-500",
      metrics: { downloads: "50만+", rating: "4.8★", transactions: "1M+/일" },
    },
    {
      id: 3,
      title: "AI 기반 분석 대시보드",
      category: "Solution Development",
      description:
        "기업용 데이터 분석 및 시각화 플랫폼. 머신러닝 기반 예측 분석과 실시간 대시보드를 제공합니다.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["React", "Python", "TensorFlow", "D3.js", "MongoDB"],
      color: "from-red-500 to-rose-500",
      metrics: { accuracy: "95%+", dataPoints: "10억+", realtime: "실시간" },
    },
    {
      id: 4,
      title: "SaaS 프로젝트 관리 툴",
      category: "Web Development",
      description:
        "팀 협업을 위한 올인원 프로젝트 관리 SaaS 솔루션. 실시간 협업, 간트 차트, 자동화 워크플로우를 제공합니다.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      tech: ["Next.js", "GraphQL", "Prisma", "WebSocket"],
      color: "from-red-500 to-amber-500",
      metrics: { teams: "5,000+", tasks: "100만+/월", uptime: "99.99%" },
    },
    {
      id: 5,
      title: "헬스케어 IoT 플랫폼",
      category: "Solution Development",
      description:
        "의료 기기와 연동되는 헬스케어 IoT 플랫폼. 실시간 모니터링과 알림 시스템을 통해 환자 케어를 지원합니다.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      tech: ["Flutter", "Go", "InfluxDB", "MQTT", "AWS IoT"],
      color: "from-red-500 to-violet-500",
      metrics: { devices: "10,000+", latency: "< 50ms", reliability: "99.95%" },
    },
    {
      id: 6,
      title: "소셜 커머스 앱",
      category: "App Development",
      description:
        "소셜 미디어와 쇼핑을 결합한 차세대 커머스 앱. 라이브 스트리밍, 인플루언서 마케팅 기능을 포함합니다.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=600&fit=crop",
      tech: ["React Native", "Node.js", "WebRTC", "Elasticsearch"],
      color: "from-red-500 to-red-700",
      metrics: { MAU: "200만+", engagement: "45분/일", conversion: "8.5%" },
    },
  ],
  en: [
    {
      id: 1,
      title: "Global E-commerce Platform",
      category: "Web Development",
      description:
        "A global e-commerce platform handling large-scale traffic. Designed with microservices architecture for high scalability and reliability.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
      color: "from-red-500 to-orange-500",
      metrics: { users: "1M+", performance: "99.9%", response: "< 100ms" },
    },
    {
      id: 2,
      title: "Fintech Mobile App",
      category: "App Development",
      description:
        "Cross-platform mobile app for security-critical financial services. Includes biometric authentication, encryption, and real-time transaction processing.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      tech: ["React Native", "TypeScript", "Firebase", "Stripe"],
      color: "from-red-500 to-pink-500",
      metrics: { downloads: "500K+", rating: "4.8★", transactions: "1M+/day" },
    },
    {
      id: 3,
      title: "AI Analytics Dashboard",
      category: "Solution Development",
      description:
        "Enterprise data analytics and visualization platform. Provides machine learning-based predictive analytics and real-time dashboards.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["React", "Python", "TensorFlow", "D3.js", "MongoDB"],
      color: "from-red-500 to-rose-500",
      metrics: { accuracy: "95%+", dataPoints: "1B+", realtime: "Real-time" },
    },
    {
      id: 4,
      title: "SaaS Project Management Tool",
      category: "Web Development",
      description:
        "All-in-one project management SaaS solution for team collaboration. Provides real-time collaboration, Gantt charts, and automated workflows.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      tech: ["Next.js", "GraphQL", "Prisma", "WebSocket"],
      color: "from-red-500 to-amber-500",
      metrics: { teams: "5,000+", tasks: "1M+/mo", uptime: "99.99%" },
    },
    {
      id: 5,
      title: "Healthcare IoT Platform",
      category: "Solution Development",
      description:
        "Healthcare IoT platform integrated with medical devices. Supports patient care through real-time monitoring and alert systems.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      tech: ["Flutter", "Go", "InfluxDB", "MQTT", "AWS IoT"],
      color: "from-red-500 to-violet-500",
      metrics: { devices: "10,000+", latency: "< 50ms", reliability: "99.95%" },
    },
    {
      id: 6,
      title: "Social Commerce App",
      category: "App Development",
      description:
        "Next-generation commerce app combining social media and shopping. Includes live streaming and influencer marketing features.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=600&fit=crop",
      tech: ["React Native", "Node.js", "WebRTC", "Elasticsearch"],
      color: "from-red-500 to-red-700",
      metrics: { MAU: "2M+", engagement: "45min/day", conversion: "8.5%" },
    },
  ],
};

const categoriesData = {
  ko: ["전체", "Web Development", "App Development", "Solution Development"],
  en: ["All", "Web Development", "App Development", "Solution Development"],
};

const content = {
  ko: {
    subtitle: "Our Work",
    title: "포트폴리오",
    description: "다양한 산업 분야에서 진행한 프로젝트들입니다",
    viewMore: "자세히 보기",
    moreProjects: "더 많은 프로젝트가 궁금하신가요?",
    contactUs: "문의하기",
    techStack: "기술 스택",
    similarProject: "비슷한 프로젝트 문의",
    leadPortfolio: "엔지니어링 포트폴리오 보기",
  },
  en: {
    subtitle: "Our Work",
    title: "Portfolio",
    description: "Projects we've completed across various industries",
    viewMore: "View Details",
    moreProjects: "Want to see more projects?",
    contactUs: "Contact Us",
    techStack: "Tech Stack",
    similarProject: "Inquire About Similar Project",
    leadPortfolio: "View Engineering Portfolio",
  },
};

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxBackRef = useRef<HTMLDivElement>(null);
  const parallaxMidRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData.ko[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = content[language];
  const projects = projectsData[language];
  const categories = categoriesData[language];

  const filteredProjects =
    activeCategory === 0
      ? projects
      : projects.filter((p) => p.category === categoriesData.en[activeCategory]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const back = parallaxBackRef.current;
      const mid = parallaxMidRef.current;
      if (!section || !back || !mid) return;

      const ctx = gsap.context(() => {
        gsap.to(back, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(mid, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Parallax layer 1 — deepest (ambient color field) */}
      <div
        ref={parallaxBackRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <div
          className={`glass-ambient animate-drift top-[5%] right-[-8%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-red-600" : "bg-red-300"
          }`}
        />
        <div
          className={`glass-ambient animate-drift-reverse bottom-[5%] left-[-8%] w-[640px] h-[640px] ${
            theme === "dark" ? "bg-violet-600" : "bg-violet-300"
          }`}
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* Parallax layer 2 — mid (grid pattern) */}
      <div
        ref={parallaxMidRef}
        className="absolute inset-0 grid-pattern opacity-30 will-change-transform"
      />

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
            {t.title}
          </h2>
          <p className={`mt-6 text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.description}
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === index
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : theme === "dark"
                  ? "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800"
                  : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative h-[400px] rounded-2xl overflow-hidden border transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:border-red-900/50"
                    : "bg-white border-gray-200 hover:border-red-300 shadow-sm hover:shadow-lg"
                }`}>
                  {/* Project image */}
                  <div className="absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-red-400 text-sm font-medium mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-500 border border-gray-700">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 20,
                      }}
                      className="flex items-center gap-2 text-red-400 text-sm font-medium"
                    >
                      {t.viewMore}
                      <ArrowSquareOut size={16} weight="duotone" />
                    </motion.div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{t.moreProjects}</p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            {t.contactUs}
            <CaretRight size={20} weight="bold" />
          </motion.a>
          <div className="mt-6">
            <Link
              href="/portfolio/"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all hover:border-red-500 hover:text-red-500 ${
                theme === "dark"
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {t.leadPortfolio}
              <CaretRight size={16} weight="bold" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label={language === "ko" ? "닫기" : "Close"}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <X size={24} weight="bold" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-[300px]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-20`}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-red-400 text-sm font-medium">
                    {selectedProject.category}
                  </span>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="text-center p-3 bg-black/30 rounded-lg"
                      >
                        <div className="text-xl font-bold text-red-500">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">
                      {t.techStack}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex gap-4">
                    <motion.a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProject(null);
                        setTimeout(() => {
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white text-center font-medium hover:from-red-500 hover:to-red-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t.similarProject}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
