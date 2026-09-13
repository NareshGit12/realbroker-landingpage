// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { readdirSync, statSync, writeFileSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = "https://realbroker.network";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const routes: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/members", changefreq: "weekly", priority: "0.9" },
  { path: "/tools", changefreq: "monthly", priority: "0.8" },
  { path: "/certified-realbroker", changefreq: "monthly", priority: "0.7" },
  { path: "/smart-agreements", changefreq: "monthly", priority: "0.7" },
  { path: "/charter", changefreq: "monthly", priority: "0.6" },
  { path: "/charter-and-conduct", changefreq: "monthly", priority: "0.6" },
  { path: "/terms-of-use", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
];

// Static member profile pages live in public/<city>/<slug>.html
const SKIP_DIRS = new Set(["lovable-uploads"]);
const publicDir = resolve("public");

const memberEntries: SitemapEntry[] = readdirSync(publicDir)
  .filter((name) => !SKIP_DIRS.has(name) && statSync(join(publicDir, name)).isDirectory())
  .flatMap((dir) =>
    readdirSync(join(publicDir, dir))
      .filter((file) => file.endsWith(".html"))
      .map((file) => ({
        path: `/${dir}/${file}`,
        changefreq: "weekly" as const,
        priority: "0.8",
      })),
  )
  .sort((a, b) => a.path.localeCompare(b.path));

const entries = [...routes, ...memberEntries];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
