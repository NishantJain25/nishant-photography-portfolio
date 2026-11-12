import React from "react";
import {
  PageContainer,
  SectionContainer,
  StatusMessage,
} from "../components/StyledComponents";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ImageGrid from "../components/ImageGrid";
import useSite from "../context/siteContext";
import useSanityQuery from "../sanity/useSanityQuery";
import { GALLERY_QUERY } from "../sanity/queries";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const { data, loading, error } = useSanityQuery(GALLERY_QUERY);
  const { categories: siteCategories } = useSite();
  const categories = ["All", ...siteCategories];

  const images = React.useMemo(() => data ?? [], [data]);
  const filteredImages = React.useMemo(
    () =>
      selectedCategory === "All"
        ? images
        : images.filter((image) => image.category === selectedCategory),
    [selectedCategory, images]
  );

  return (
    <>
      <PageContainer data-scroll-section id="page-container">
        <SectionContainer id="section-container" justify="flex-start">
          <Seo
            title="Gallery | Nishant Jain Photography"
            description="Browse portrait, event, product and interior photography by Nishant Jain, a photographer based in Mumbai."
          />
          <PageHeader
            title="Gallery"
            itemCount={images.length}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          {loading && <StatusMessage>Loading photos...</StatusMessage>}
          {error && <StatusMessage>Couldn't load the gallery.</StatusMessage>}
          {data && filteredImages.length === 0 && (
            <StatusMessage>No photos here yet.</StatusMessage>
          )}
          <ImageGrid images={filteredImages} />
        </SectionContainer>
      </PageContainer>
    </>
  );
};

export default Gallery;
