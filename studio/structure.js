// Site settings opens one fixed document ID instead of a list, which is what
// keeps it to a single document (see also the rules in sanity.config.js).
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("category")
        .title("Categories")
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
