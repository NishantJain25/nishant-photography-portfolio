// Writes public/sitemap.xml before each build, listing the fixed pages plus every
// published project in Sanity. Runs automatically as npm's "prebuild" step.
const fs = require("fs");
const path = require("path");
const { SITE_URL, querySanity } = require("./sanity");

const OUTPUT = path.join(__dirname, "..", "public", "sitemap.xml");
const STATIC_PAGES = ["/", "/gallery", "/projects"];

const entry = (pagePath, lastModified) =>
  [
    "  <url>",
    `    <loc>${SITE_URL}${pagePath}</loc>`,
    lastModified ? `    <lastmod>${lastModified.slice(0, 10)}</lastmod>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");

(async () => {
  let projects = [];
  try {
    projects = await querySanity(
      `*[_type == "project" && defined(slug.current) && defined(coverImage.asset)]
        | order(date desc) { "slug": slug.current, _updatedAt }`
    );
  } catch (error) {
    // A missing sitemap entry is better than a failed deploy.
    console.warn(`Sitemap: couldn't load projects (${error.message}); listing fixed pages only.`);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...STATIC_PAGES.map((page) => entry(page)),
    ...projects.map((p) => entry(`/projects/${encodeURIComponent(p.slug)}`, p._updatedAt)),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT, xml);
  console.log(`Sitemap: wrote ${STATIC_PAGES.length + projects.length} URLs for ${SITE_URL}`);
})();
