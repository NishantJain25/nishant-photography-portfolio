import { defineArrayMember, defineField, defineType } from "sanity";

const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describes the photo for screen readers and search engines.",
  validation: (rule) => rule.required(),
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The project's URL, e.g. /projects/rahil-mehta",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      description: "When it was shot. Projects are listed newest first.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: 'Highlights this project, such as under "Selected Works".',
      initialValue: false,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Drag to reorder. Drop several files at once to bulk upload.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            altField,
            defineField({ name: "title", type: "string" }),
            defineField({ name: "caption", type: "text", rows: 2 }),
            defineField({
              name: "showInGallery",
              title: "Show in gallery",
              type: "boolean",
              description: "On unless you turn it off.",
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category.name", media: "coverImage" },
  },
});
