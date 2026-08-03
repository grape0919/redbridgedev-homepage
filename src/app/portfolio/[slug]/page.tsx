import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import { projects, getProject } from "@/components/portfolio/meta";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `https://redbridgedev.ai.kr/portfolio/${project.slug}/`;
  return {
    title: `${project.title} — RED BRIDGE 엔지니어링 포트폴리오`,
    description: project.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | RED BRIDGE DEV`,
      description: project.seoDescription,
      url,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
