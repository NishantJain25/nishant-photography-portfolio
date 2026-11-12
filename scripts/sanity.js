// Shared by the build scripts: the site's address and a way to query Sanity.
const fs = require("fs");
const path = require("path");

// On Netlify, URL is the site's main address (a custom domain once you add one).
const SITE_URL = (
  process.env.URL || "https://nishantjainphotography.netlify.app"
).replace(/\/$/, "");

// Locally the Sanity settings live in .env.local, which only the React build reads.
const readEnvFile = () => {
  try {
    const text = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8");
    return Object.fromEntries(
      text
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([\w.]+)\s*=\s*(.*?)\s*$/))
        .filter(Boolean)
        .map(([, key, value]) => [key, value])
    );
  } catch {
    return {};
  }
};

// Runs a GROQ query against published content. Throws if Sanity can't be reached.
const querySanity = async (query) => {
  const env = { ...readEnvFile(), ...process.env };
  const projectId = env.REACT_APP_SANITY_PROJECT_ID;
  const dataset = env.REACT_APP_SANITY_DATASET || "production";
  if (!projectId) throw new Error("REACT_APP_SANITY_PROJECT_ID is not set");

  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v2026-11-01/data/query/${dataset}`
  );
  url.searchParams.set("query", query);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity responded ${response.status}`);
  return (await response.json()).result;
};

module.exports = { SITE_URL, querySanity };
