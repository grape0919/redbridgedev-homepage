// 배포 전 랜딩 정합성 점검 — 섹션 순서와 내비게이션 앵커가 설계와 일치하는지 확인한다.
// 라이브에 main과 다른 섹션 순서가 배포됐던 사고의 재발 방지용. 불일치 시 빌드를 중단한다.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EXPECTED_ORDER = ["Hero", "Services", "Portfolio", "Process", "About", "FAQ", "Contact"];

const page = readFileSync("src/app/page.tsx", "utf8");
const mainBlock = page.slice(page.indexOf("<main"), page.indexOf("</main>"));
const CHROME = new Set(["Navigation", "Footer"]); // 섹션이 아닌 공통 크롬은 순서 비교에서 제외
const actual = [...mainBlock.matchAll(/<([A-Z][A-Za-z]+)\s*\/>/g)]
  .map((m) => m[1])
  .filter((name) => !CHROME.has(name));

const errors = [];
if (actual.join(",") !== EXPECTED_ORDER.join(",")) {
  errors.push(`섹션 순서 불일치\n  기대: ${EXPECTED_ORDER.join(" → ")}\n  실제: ${actual.join(" → ")}`);
}

// 내비 앵커(#id)가 실제 섹션 id로 존재하는지
const nav = readFileSync("src/components/ui/Navigation.tsx", "utf8");
const anchors = [...new Set([...nav.matchAll(/href:\s*"#([a-z-]+)"/g)].map((m) => m[1]))];
const sectionsDir = "src/components/sections";
const sectionIds = new Set();
for (const f of readdirSync(sectionsDir)) {
  const src = readFileSync(join(sectionsDir, f), "utf8");
  for (const m of src.matchAll(/id="([a-z-]+)"/g)) sectionIds.add(m[1]);
}
for (const a of anchors) {
  if (!sectionIds.has(a)) errors.push(`내비 앵커 #${a} 에 해당하는 섹션 id가 없음`);
}

if (errors.length) {
  console.error("\n[check-landing] 랜딩 정합성 점검 실패:\n- " + errors.join("\n- ") + "\n");
  process.exit(1);
}
console.log(`[check-landing] OK — 섹션 ${actual.length}개 순서 일치, 내비 앵커 ${anchors.length}개 유효`);
