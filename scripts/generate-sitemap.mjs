// 빌드 전(prebuild)에 public/sitemap.xml을 생성한다.
// lastmod는 각 라우트에 대응하는 소스 경로의 마지막 git 커밋 날짜에서 가져온다.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://redbridgedev.ai.kr";

function lastCommitDate(paths) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${paths.join(" ")}`, {
      cwd: root,
      encoding: "utf8",
    }).trim();
    if (out) return out;
  } catch {
    // git이 없거나 히스토리가 없으면 오늘 날짜로 대체
  }
  return new Date().toISOString().slice(0, 10);
}

function slugsFrom(metaPath) {
  const src = readFileSync(resolve(root, metaPath), "utf8");
  const found = [...src.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s, i, a) => a.indexOf(s) === i);
  if (found.length === 0) {
    throw new Error(`${metaPath}에서 slug을 찾지 못했습니다`);
  }
  return found;
}

const slugs = slugsFrom("src/components/portfolio/meta.ts");
const guideSlugs = slugsFrom("src/components/guides/meta.ts");

const portfolioSources = [
  "src/app/portfolio",
  "src/components/portfolio",
];

const guideSources = ["src/app/guides", "src/components/guides"];

const urls = [
  {
    loc: `${BASE}/`,
    lastmod: lastCommitDate(["src/app/page.tsx", "src/app/layout.tsx", "src/components/sections"]),
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    loc: `${BASE}/portfolio/`,
    lastmod: lastCommitDate(portfolioSources),
    changefreq: "monthly",
    priority: "0.8",
  },
  ...slugs.map((slug) => ({
    loc: `${BASE}/portfolio/${slug}/`,
    lastmod: lastCommitDate(portfolioSources),
    changefreq: "monthly",
    priority: "0.7",
  })),
  {
    loc: `${BASE}/guides/`,
    lastmod: lastCommitDate(guideSources),
    changefreq: "monthly",
    priority: "0.8",
  },
  ...guideSlugs.map((slug) => ({
    loc: `${BASE}/guides/${slug}/`,
    lastmod: lastCommitDate(guideSources),
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml 생성 완료 — URL ${urls.length}개`);
