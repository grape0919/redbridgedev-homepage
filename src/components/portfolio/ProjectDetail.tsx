"use client";

import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "./meta";
import { projectContent } from "./projects-content";
import { projectVisuals } from "./visuals";
import { FadeIn, PortfolioShell, PortfolioFootnote } from "./ui";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const Content = projectContent[slug];
  if (!project || !Content) return null;

  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <PortfolioShell backHref="/portfolio/">
      <FadeIn>
        <nav className="text-sm mb-8">
          <Link
            href="/portfolio/"
            className={`transition-colors hover:text-red-500 ${
              dark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            포트폴리오
          </Link>
          <span className={dark ? "text-gray-700" : "text-gray-300"}> / </span>
          <span className={dark ? "text-gray-300" : "text-gray-600"}>{project.title}</span>
        </nav>

        <div className="flex items-start gap-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-red-600/80 leading-none">
            {project.num}
          </span>
          <div>
            <h1
              className={`text-2xl sm:text-4xl font-bold ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {project.title}
            </h1>
            <p className="mt-3 text-red-500 font-medium text-sm sm:text-base">
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>
        </div>
      </FadeIn>

      {(() => {
        const Visual = projectVisuals[slug];
        return Visual ? (
          <FadeIn className="mt-8">
            <Visual />
          </FadeIn>
        ) : null;
      })()}

      <FadeIn className="mt-8">
        <Content />
      </FadeIn>

      {/* 이전/다음 프로젝트 */}
      <FadeIn className="mt-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}/`}
              className={`group rounded-xl border p-5 transition-all ${
                dark
                  ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  dark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <CaretLeft size={12} weight="bold" /> 이전 프로젝트
              </span>
              <p
                className={`mt-2 text-sm font-bold group-hover:text-red-500 transition-colors ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                {prev.num} {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/portfolio/${next.slug}/`}
              className={`group rounded-xl border p-5 text-right transition-all ${
                dark
                  ? "bg-gray-900/40 border-gray-800 hover:border-red-900/60"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  dark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                다음 프로젝트 <CaretRight size={12} weight="bold" />
              </span>
              <p
                className={`mt-2 text-sm font-bold group-hover:text-red-500 transition-colors ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                {next.num} {next.title}
              </p>
            </Link>
          )}
        </div>
      </FadeIn>

      <PortfolioFootnote confidential={project.group === "production"} />
    </PortfolioShell>
  );
}
