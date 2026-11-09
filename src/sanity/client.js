import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

// createClient throws without a project ID, which would blank the whole site.
// Staying null lets the CMS pages show a message and the rest keep working.
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-11-01", useCdn: true })
  : null;

const builder = client && createImageUrlBuilder(client);

// fit("max") stops the CDN from upscaling photos smaller than `width`.
const imageUrl = (image, width) =>
  builder.image(image).width(width).fit("max").auto("format").url();

const IMAGE_WIDTHS = [400, 640, 800, 1000, 1400, 2000, 2400];

// Props for <img> that let the browser download the smallest version that looks
// sharp. `sizes` says how wide the image displays, e.g. "(max-width: 768px) 100vw, 50vw".
// The order matters: browsers can start fetching `src` as soon as it's set, so
// `srcSet` and `sizes` have to come first.
export const responsiveImage = (image, sizes) => {
  const original = Number(imageSize(image).width);
  const widths = IMAGE_WIDTHS.filter((width) => width < original);
  if (original <= IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]) widths.push(original);

  return {
    sizes,
    srcSet: widths
      .map((width) => `${imageUrl(image, width)} ${width}w`)
      .join(", "),
    src: imageUrl(image, 1000),
  };
};

// The CDN only crops to the hotspot when given both a width and a height, so
// for images sized by CSS `object-fit: cover`, apply it with this instead.
export const hotspotPosition = ({ hotspot }) =>
  hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : undefined;

// Asset refs look like "image-<hash>-3000x2000-jpg". Passing these to <img>
// reserves space so lazy-loaded photos don't reshuffle the masonry columns.
export const imageSize = (image) => {
  const [width, height] = image.asset._ref.split("-")[2].split("x");
  return { width, height };
};
