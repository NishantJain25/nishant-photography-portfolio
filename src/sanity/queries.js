const PROJECT_CARD = `
  "id": _id,
  title,
  "slug": slug.current,
  "category": category->name,
  coverImage
`;

const LISTABLE_PROJECT = `
  _type == "project" && defined(slug.current) && defined(coverImage.asset)
`;

export const PROJECTS_QUERY = `
  *[${LISTABLE_PROJECT}] | order(date desc) { ${PROJECT_CARD} }
`;

export const FEATURED_PROJECTS_QUERY = `
  *[${LISTABLE_PROJECT} && featured == true] | order(date desc) { ${PROJECT_CARD} }
`;

export const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_CARD},
    description,
    date,
    "images": coalesce(images[defined(asset)] {
      "id": _key,
      "image": @,
      "alt": alt,
      title,
      caption
    }, [])
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc) { "id": _id, name }
`;

// Photos live inside projects, so this flattens each project's gallery photos
// into one list. Newest project first; photos keep their order within a project.
// A photo is shown unless turned off: bulk uploads can leave the toggle unset.
export const GALLERY_QUERY = `
  *[_type == "project" && defined(slug.current) && defined(images)]
    | order(date desc) {
    "photos": images[defined(asset) && !(showInGallery == false)] {
      "id": ^._id + "-" + _key,
      "image": @,
      "alt": alt,
      title,
      caption,
      "category": ^.category->name,
      "date": ^.date,
      "project": { "title": ^.title, "slug": ^.slug.current }
    }
  }.photos[]
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    location,
    email,
    "socialLinks": coalesce(socialLinks[] { "id": _key, platform, url }, [])
  }
`;
