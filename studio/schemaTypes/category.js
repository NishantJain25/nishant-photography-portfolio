import { defineField, defineType } from "sanity";

const isUniqueName = async (name, context) => {
  if (!name) return true;
  const id = context.document._id.replace(/^drafts\./, "");
  const duplicates = await context
    .getClient({ apiVersion: "2026-11-01" })
    .fetch(
      `count(*[_type == "category" && name == $name && !(_id in [$id, $draftId])])`,
      { name, id, draftId: `drafts.${id}` }
    );
  return duplicates === 0 || "A category with this name already exists.";
};

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required().custom(isUniqueName),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first in filters and tags.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", order: "order" },
    prepare: ({ title, order }) => ({ title, subtitle: `Order: ${order ?? "-"}` }),
  },
});
