import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/components/guides/meta";
import { guideContent } from "@/components/guides/content";
import { GuideShell } from "@/components/guides/ui";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `https://redbridgedev.ai.kr/guides/${guide.slug}/`;
  return {
    title: guide.title,
    description: guide.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${guide.title} | RED BRIDGE DEV`,
      description: guide.seoDescription,
      url,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const Content = guideContent[slug];
  if (!guide || !Content) notFound();

  const url = `https://redbridgedev.ai.kr/guides/${guide.slug}/`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.seoDescription,
      datePublished: guide.published,
      inLanguage: "ko",
      mainEntityOfPage: url,
      author: {
        "@type": "Organization",
        name: "RED BRIDGE DEV",
        url: "https://redbridgedev.ai.kr",
      },
      publisher: {
        "@type": "Organization",
        name: "RED BRIDGE DEV",
        logo: {
          "@type": "ImageObject",
          url: "https://redbridgedev.ai.kr/logo_red.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://redbridgedev.ai.kr/" },
        { "@type": "ListItem", position: 2, name: "가이드", item: "https://redbridgedev.ai.kr/guides/" },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
  ];

  const others = guides.filter((g) => g.slug !== slug);

  return (
    <GuideShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-8 text-sm">
        <Link href="/guides/" className="text-[var(--text-muted)] transition-colors hover:text-red-500">
          가이드
        </Link>
        <span className="text-[var(--text-muted)]"> / </span>
        <span className="text-[var(--text-secondary)]">{guide.title}</span>
      </nav>
      <article>
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug">{guide.title}</h1>
        <p className="mt-3 mb-10 text-xs text-[var(--text-muted)]">
          {guide.published} · 약 {guide.readingMinutes}분 · RED BRIDGE DEV
        </p>
        <Content />
      </article>
      <aside className="mt-14 border-t border-[var(--border)] pt-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)]">함께 읽기</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {others.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}/`} className="text-red-500 hover:text-red-400 transition-colors">
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </GuideShell>
  );
}
