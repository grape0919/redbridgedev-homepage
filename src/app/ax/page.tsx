import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AxChrome, AxConsultButton, AxMailLink } from "@/components/ax/chrome";
import {
  AX_URL,
  axMeta,
  hero,
  pains,
  services,
  cases,
  diagram,
  process,
  faq,
  consult,
} from "@/components/ax/content";

export const metadata: Metadata = {
  title: axMeta.title,
  description: axMeta.description,
  alternates: { canonical: AX_URL },
  openGraph: {
    title: `${axMeta.title} | RED BRIDGE DEV`,
    description: axMeta.description,
    url: AX_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${axMeta.title} | RED BRIDGE DEV`,
    description: axMeta.description,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: axMeta.title,
    serviceType: "AI 업무 자동화 · 시스템 연동",
    description: axMeta.description,
    url: AX_URL,
    areaServed: "KR",
    provider: {
      "@type": "Organization",
      name: "RED BRIDGE DEV",
      url: "https://redbridgedev.ai.kr",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI 업무 자동화 서비스",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://redbridgedev.ai.kr/" },
      { "@type": "ListItem", position: 2, name: axMeta.title, item: AX_URL },
    ],
  },
];

const card = "rounded-2xl border border-[var(--border)] bg-[var(--surface)]";
const muted = "text-[var(--text-secondary)]";

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-20 sm:mt-24 scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Dots({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-sm leading-relaxed ${muted}`}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 연결 구조도 — 이미지가 아닌 목록으로 그려 모바일(세로)·스크린리더에서도 같은 내용이 읽힌다 */
function ConnectionDiagram() {
  return (
    <figure className="mt-6 rounded-2xl border border-[var(--border)] p-4 sm:p-5">
      <ol aria-label={diagram.label} className="flex flex-col md:flex-row md:items-stretch gap-2">
        {diagram.nodes.map((node, i) => (
          <li key={node.name} className="contents">
            <div className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 text-center">
              <div className="text-sm font-bold">{node.name}</div>
              <div className="mt-1 text-xs text-[var(--text-muted)]">{node.desc}</div>
            </div>
            {i < diagram.nodes.length - 1 && (
              <div className="self-center shrink-0 text-red-500 text-lg leading-none" aria-hidden>
                <span className="md:hidden">↕</span>
                <span className="hidden md:inline">↔</span>
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption className={`mt-4 text-sm leading-relaxed ${muted}`}>{diagram.caption}</figcaption>
    </figure>
  );
}

export default function AxPage() {
  return (
    <AxChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* A. 첫 화면 */}
      <header>
        <p className="text-red-500 text-sm tracking-widest font-medium">{hero.eyebrow}</p>
        <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
          {hero.title}
        </h1>
        <p className={`mt-6 max-w-3xl text-base sm:text-lg leading-relaxed ${muted}`}>
          {hero.description}
        </p>
        <p className={`mt-4 max-w-3xl text-sm sm:text-base leading-relaxed ${muted}`}>{hero.sub}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <AxConsultButton label={hero.primary} location="ax_hero" />
          <a
            href="#cases"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-7 py-3.5 font-medium transition-colors hover:border-red-600/60 hover:text-red-500"
          >
            {hero.secondary}
          </a>
        </div>
      </header>

      {/* B. 이런 업무가 있다면 */}
      <Section title={pains.title}>
        <ul className="mt-8 grid sm:grid-cols-2 gap-4">
          {pains.items.map((item, i) => (
            <li key={item} className={`${card} p-6 flex gap-4`}>
              <span className="text-sm font-bold text-red-500 tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* C. 제공 서비스 */}
      <Section title={services.title}>
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          {services.items.map((s, i) => (
            <article key={s.title} className={`${card} p-6`}>
              <p className="text-xs font-semibold tracking-widest text-red-500">
                서비스 {i + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{s.description}</p>
              <p className="mt-6 text-xs font-semibold text-[var(--text-muted)]">제공 범위 예시</p>
              <Dots items={s.scope} />
            </article>
          ))}
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {[services.extra, services.training].map((x) => (
            <div key={x.title} className="rounded-2xl border border-[var(--border)] p-5">
              <h3 className="text-sm font-bold">{x.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{x.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 실제 경험 */}
      <Section id="cases" title={cases.title}>
        <p className={`mt-6 ${card} px-5 py-4 text-sm leading-relaxed ${muted}`}>
          {cases.disclaimer}
        </p>
        <div className="mt-6 space-y-6">
          {cases.items.map((c, i) => (
            <article key={c.title} className={`${card} p-6 sm:p-8`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-red-600/50 px-3 py-1 text-xs font-medium text-red-500">
                  {cases.badge}
                </span>
                {c.note && (
                  <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                    {c.note}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug">
                <span className="text-red-500 mr-2">사례 {i + 1}.</span>
                {c.title}
              </h3>
              <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-[6.5rem_1fr]">
                {c.rows.map((row) => (
                  <div key={row.label} className="contents">
                    <dt className="text-sm font-semibold">{row.label}</dt>
                    <dd className={`text-sm leading-relaxed ${muted}`}>{row.text}</dd>
                  </div>
                ))}
              </dl>
              {i === 0 && <ConnectionDiagram />}
            </article>
          ))}
          <article className="rounded-2xl border border-[var(--border)] p-6">
            <span className="rounded-full border border-red-600/50 px-3 py-1 text-xs font-medium text-red-500">
              {cases.badge}
            </span>
            <h3 className="mt-4 text-base font-bold">{cases.short.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{cases.short.text}</p>
          </article>
        </div>
      </Section>

      {/* 진행 방식 */}
      <Section title={process.title}>
        <ol className="mt-8 space-y-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className={`${card} p-6 flex gap-5`}>
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-sm font-bold text-red-500"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${muted}`}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section title={faq.title}>
        <dl className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faq.items.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-bold">
                <span className="text-red-500 mr-2">Q.</span>
                {f.q}
              </dt>
              <dd className={`mt-3 text-sm sm:text-[15px] leading-relaxed ${muted}`}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 문의 */}
      <Section id="consult" title={consult.title}>
        <div className={`mt-8 ${card} p-6 sm:p-10`}>
          <p className="max-w-3xl leading-relaxed">{consult.description}</p>
          <p className="mt-8 text-sm font-semibold">{consult.itemsTitle}</p>
          <Dots items={consult.items} />
          <div className="mt-8">
            <AxConsultButton label={consult.button} location="ax_consult" />
          </div>
          <p className={`mt-4 text-sm leading-relaxed ${muted}`}>{consult.hint}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            {consult.sensitive}
          </p>
          <p className="mt-4 text-sm">
            <AxMailLink>{consult.mail}</AxMailLink>
          </p>
        </div>
      </Section>
    </AxChrome>
  );
}
