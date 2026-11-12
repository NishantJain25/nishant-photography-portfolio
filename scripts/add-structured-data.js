// Runs after each build (npm's "postbuild" step). Replaces the placeholder
// structured data in build/index.html with your name, location and social links
// from Site settings in Sanity, so they're only ever edited in one place.
const fs = require("fs");
const path = require("path");
const { SITE_URL, querySanity } = require("./sanity");

const BUILD_DIR = process.env.BUILD_PATH
  ? path.resolve(process.env.BUILD_PATH)
  : path.join(__dirname, "..", "build");
const INDEX = path.join(BUILD_DIR, "index.html");
const STRUCTURED_DATA = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

const buildGraph = ({ name, tagline, location, socialLinks }) => {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name,
    jobTitle: tagline,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.jpg`,
  };
  if (location) {
    person.address = { "@type": "PostalAddress", addressLocality: location };
  }
  if (socialLinks?.length) person.sameAs = socialLinks;

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        name: `${name} Photography`,
        url: `${SITE_URL}/`,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
};

(async () => {
  const html = fs.readFileSync(INDEX, "utf8");
  if (!STRUCTURED_DATA.test(html)) {
    console.warn("Structured data: no ld+json block found in index.html; skipped.");
    return;
  }

  let settings;
  try {
    settings = await querySanity(
      `*[_type == "siteSettings"][0] { name, tagline, location, "socialLinks": socialLinks[].url }`
    );
    if (!settings?.name) throw new Error("Site settings aren't published yet");
  } catch (error) {
    // The placeholder in public/index.html still describes the site, just with
    // less detail, so a Sanity outage never blocks a deploy.
    console.warn(`Structured data: kept the placeholder (${error.message}).`);
    return;
  }

  // Escaping "<" stops any value from closing the script tag early.
  const json = JSON.stringify(buildGraph(settings)).replace(/</g, "\\u003c");
  fs.writeFileSync(
    INDEX,
    html.replace(STRUCTURED_DATA, `<script type="application/ld+json">${json}</script>`)
  );
  console.log(
    `Structured data: added ${settings.name}, ${settings.location || "no location"}, ` +
      `${settings.socialLinks?.length || 0} social link(s) from Sanity.`
  );
})();
