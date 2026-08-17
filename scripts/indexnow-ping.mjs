// 배포 후 실행: sitemap.xml의 모든 URL을 IndexNow(Bing·Naver 등)에 제출한다.
// 사용법: node scripts/indexnow-ping.mjs
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "redbridgedev.ai.kr";
const KEY = "471a22e57ed3ff0e46184e078291da9f";

const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow 제출: URL ${urlList.length}개 → HTTP ${res.status}`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
