import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            // The website picks each icon by platform: a new option here also
            // needs an entry in src/constants/socialIcons.js.
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["Instagram", "Threads", "GitHub"] },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
