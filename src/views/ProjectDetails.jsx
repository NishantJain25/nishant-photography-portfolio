import React from "react";
import { useParams } from "react-router-dom";
import {
  PageContainer,
  SectionContainer,
  SectionTitle,
  StatusMessage,
} from "../components/StyledComponents";
import styled from "styled-components";
import ImageGrid from "../components/ImageGrid";
import InfoGrid from "../components/InfoGrid";
import { formatDate } from "../util/formatDate";
import Seo from "../components/Seo";
import {
  hotspotPosition,
  responsiveImage,
  shareImageUrl,
} from "../sanity/client";
import { PROJECT_QUERY } from "../sanity/queries";
import useSanityQuery from "../sanity/useSanityQuery";

// How wide these photos display, matching the layouts below.
const COVER_SIZES = "100vw";
const SIDE_IMAGE_SIZES = "(max-width: 768px) 100vw, 33vw";

const CoverImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: var(--screen-height);
  background-color: aliceblue;
  overflow: hidden;
  border-bottom: 1px solid var(--color-neutral-700);
  border-top: ${({ isBody }) => isBody && `1px solid var(--color-neutral-700)`};

  /* A full-screen photo in the middle of the page is too much scrolling on phones. */
  @media (max-width: 768px) {
    height: ${({ isBody }) => (isBody ? "70vw" : "var(--screen-height)")};
  }
`;

const CoverTitle = styled.h1`
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 var(--spacing-4);
  text-align: center;
  font-size: var(--font-size-6xl);
  line-height: 1.1;
  font-weight: var(--font-weight-normal);
  letter-spacing: var(--letter-spacing-tight);
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-4);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--spacing-6);
  }
`;

const DescriptionCell = styled.div`
  grid-column: 1 / 4;
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-snug);

  @media (max-width: 768px) {
    grid-column: auto;
  }
`;

const InfoCell = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / 4;

  @media (max-width: 768px) {
    grid-column: auto;
    grid-row: auto;
  }
`;

const SideImageCell = styled.div`
  grid-column: 5 / 7;
  grid-row: 1 / 4;

  img {
    width: 100%;
    border: 1px solid var(--color-neutral-700);
  }

  /* On phones it follows the details rather than splitting them up. */
  @media (max-width: 768px) {
    grid-column: auto;
    grid-row: auto;
    order: 1;
  }
`;

const StatusPage = ({ children }) => (
  <PageContainer>
    <SectionContainer align="center">
      <StatusMessage>{children}</StatusMessage>
    </SectionContainer>
  </PageContainer>
);

const ProjectDetails = () => {
  const { slug } = useParams();
  const {
    data: project,
    loading,
    error,
  } = useSanityQuery(PROJECT_QUERY, { slug });

  if (loading) {
    return <StatusPage>Loading project...</StatusPage>;
  }

  if (error) {
    return <StatusPage>Couldn't load this project.</StatusPage>;
  }

  if (!project) {
    return (
      <>
        <Seo title="Project not found | Nishant Jain Photography" noindex />
        <StatusPage>Project not found</StatusPage>
      </>
    );
  }

  const { coverImage, images } = project;
  // The layout has slots for these, but a project can have any number of photos.
  const sideImage = images[2] ?? images[1] ?? images[0];
  const bodyImage = images[0];

  return (
    <>
      <Seo
        title={`${project.title} – ${project.category} Photography | Nishant Jain`}
        description={
          project.description ||
          `${project.category} photography project "${project.title}" by Mumbai-based photographer Nishant Jain.`
        }
        image={shareImageUrl(coverImage)}
        type="article"
      />
      <CoverImageContainer className="cover-img">
        <img
          alt={coverImage.alt || project.title}
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: hotspotPosition(coverImage),
            filter: "brightness(0.75)",
          }}
          {...responsiveImage(coverImage, COVER_SIZES)}
        />
        <CoverTitle>{project.title}</CoverTitle>
      </CoverImageContainer>
      <PageContainer style={{ borderTop: "none", borderBottom: "none" }}>
        <SectionContainer>
          <Grid>
            <DescriptionCell>{project.description}</DescriptionCell>

            {sideImage && (
              <SideImageCell>
                <img
                  alt={sideImage.alt || sideImage.caption || ""}
                  {...responsiveImage(sideImage.image, SIDE_IMAGE_SIZES)}
                />
              </SideImageCell>
            )}
            <InfoCell>
              <InfoGrid
                rows={[
                  { label: "Category", value: project.category },
                  {
                    label: "Date",
                    value: project.date && formatDate(project.date),
                  },
                ]}
              />
            </InfoCell>
          </Grid>
        </SectionContainer>
      </PageContainer>

      {bodyImage && (
        <>
          <CoverImageContainer isBody className="cover-img">
            <img
              alt={bodyImage.alt || bodyImage.caption || ""}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: hotspotPosition(bodyImage.image),
              }}
              {...responsiveImage(bodyImage.image, COVER_SIZES)}
            />
          </CoverImageContainer>
          <PageContainer style={{ borderTop: "none" }}>
            <SectionContainer>
              <SectionTitle>All Photos</SectionTitle>
              <ImageGrid images={images} />
            </SectionContainer>
          </PageContainer>
        </>
      )}
    </>
  );
};

export default ProjectDetails;
