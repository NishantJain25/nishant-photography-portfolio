import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Nishant Photography",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Hide site settings from "create new" so a second one can't be made.
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== "siteSettings"),
  },
  document: {
    // No delete, duplicate or unpublish: the website depends on this document.
    actions: (actions, { schemaType }) =>
      schemaType === "siteSettings"
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
});
