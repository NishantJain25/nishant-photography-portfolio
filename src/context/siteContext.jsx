import React, { createContext, useContext, useMemo } from "react";
import { CATEGORIES_QUERY, SITE_SETTINGS_QUERY } from "../sanity/queries";
import useSanityQuery from "../sanity/useSanityQuery";

const SiteContext = createContext({ settings: null, categories: [] });

// Settings and categories are needed across pages, so fetch them once here.
export const SiteProvider = ({ children }) => {
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY);
  const { data: categories } = useSanityQuery(CATEGORIES_QUERY);

  const value = useMemo(
    () => ({
      settings,
      categories: (categories ?? []).map((category) => category.name),
    }),
    [settings, categories]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export default function useSite() {
  return useContext(SiteContext);
}
