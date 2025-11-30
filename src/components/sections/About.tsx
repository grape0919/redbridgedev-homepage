"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Users, Target, Code, Layers } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "안정성",
    description:
      "대기업과 중견기업에서 쌓은 풍부한 경험을 바탕으로, 모든 프로젝트에 최고의 품질과 안정성을 보장합니다.",
  },
  {
    icon: Zap,
    title: "확장성",
    description:
      "단순히 코드를 작성하는 것이 아니라, 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
  },
  {
    icon: Users,
    title: "협업",
    description:
      "'다리'라는 이름처럼 고객과 기술을 안전하고 튼튼하게 연결합니다. 소통을 최우선으로 생각합니다.",
  },
  {
    icon: Target,
    title: "목표 지향",
    description:
      "고객의 비즈니스 목표를 깊이 이해하고, 그 목표 달성을 위한 최적의 기술 솔루션을 제안합니다.",
  },
  {
    icon: Code,
    title: "기술 전문성",
    description:
      "최신 기술 트렌드를 지속적으로 학습하고 적용하여, 항상 최선의 기술적 선택을 제공합니다.",
  },
  {
    icon: Layers,
    title: "체계적 프로세스",
    description:
      "체계적인 개발 프로세스와 철저한 품질 관리로 프로젝트의 성공을 보장합니다.",
  },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "GraphQL", category: "API" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl" />
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
            About Us
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            우리의 <span className="text-red-500">개발 철학</span>
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            RED BRIDGE DEV는 &apos;다리&apos;라는 이름처럼 고객과 기술을 안전하고 튼튼하게
            연결합니다. 우리는 단순히 코드를 작성하는 것이 아니라, 지속 가능하고
            확장 가능한 솔루션을 구축합니다.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-2xl border border-gray-800 hover:border-red-900/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-red-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-900/50 transition-colors">
                  <value.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <span className="text-red-500 text-sm tracking-widest uppercase font-medium">
            Tech Stack
          </span>
          <h3 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-12">
            기술 스택
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 hover:border-red-700 hover:text-white hover:bg-red-900/20 transition-all cursor-default"
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
