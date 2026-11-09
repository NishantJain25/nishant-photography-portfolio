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
import { hotspotPosition, imageUrl } from "../sanity/client";
import { PROJECT_QUERY } from "../sanity/queries";
import useSanityQuery from "../sanity/useSanityQuery";

const CoverImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  overflow: hidden;
  border-bottom: 1px solid var(--color-neutral-700);
  border-top: ${({ isBody }) => isBody && `1px solid var(--color-neutral-700)`};
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ gap }) => gap && `var(--spacing-${gap})`};
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
    return <StatusPage>Project not found</StatusPage>;
  }

  const { coverImage, images } = project;
  // The layout has slots for these, but a project can have any number of photos.
  const sideImage = images[2] ?? images[1] ?? images[0];
  const bodyImage = images[0];

  return (
    <>
      <CoverImageContainer className="cover-img">
        <img
          src={imageUrl(coverImage, 2400)}
          alt={coverImage.alt || project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: hotspotPosition(coverImage),
            filter: "brightness(0.75)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontSize: "var(--font-size-6xl)",
            fontWeight: "var(--font-weight-regular)",
            letterSpacing: "var(--letter-spacing-tight)",
          }}
        >
          {project.title}
        </div>
      </CoverImageContainer>
      <PageContainer style={{ borderTop: "none", borderBottom: "none" }}>
        <SectionContainer>
          <Grid gap={4}>
            <div
              style={{ fontSize: "var(--font-size-3xl)", gridColumn: "1 / 4" }}
            >
              {project.description}
            </div>

            {sideImage && (
              <div
                style={{
                  fontSize: "var(--font-size-3xl)",
                  gridColumn: "5 / 7",
                  gridRow: "1 / 4",
                }}
              >
                <img
                  src={imageUrl(sideImage.image, 1000)}
                  alt={sideImage.alt || sideImage.caption || ""}
                  style={{ border: "1px solid var(--color-neutral-700)" }}
                />
              </div>
            )}
            <div
              style={{
                gridColumn: "1 / 4",
                gridRow: "3/4",
              }}
            >
              <InfoGrid
                rows={[
                  { label: "Category", value: project.category },
                  {
                    label: "Date",
                    value: project.date && formatDate(project.date),
                  },
                ]}
              />
            </div>
          </Grid>
        </SectionContainer>
      </PageContainer>

      {bodyImage && (
        <>
          <CoverImageContainer isBody className="cover-img">
            <img
              src={imageUrl(bodyImage.image, 2400)}
              alt={bodyImage.alt || bodyImage.caption || ""}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: hotspotPosition(bodyImage.image),
              }}
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
