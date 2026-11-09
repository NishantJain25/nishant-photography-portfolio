import React from "react";
import { useNavigate } from "react-router-dom";
import { Section, SectionContainer, SectionTitle } from "./StyledComponents";
import { styled } from "styled-components";
import Button from "./Button";
import { hotspotPosition, responsiveImage } from "../sanity/client";
import { FEATURED_PROJECTS_QUERY } from "../sanity/queries";
import useSanityQuery from "../sanity/useSanityQuery";

// How wide each card displays, matching the grid's breakpoints below.
const WIDE_CARD_SIZES = "(max-width: 1024px) 100vw, 50vw";
const SMALL_CARD_SIZES =
  "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw";

// The grid's shape: one slot per featured project shown, in date order.
const SLOTS = [
  { rowSpan: 2, colSpan: 2, delay: 0.6, sizes: WIDE_CARD_SIZES },
  { rowSpan: 1, colSpan: 2, delay: 0.4, sizes: WIDE_CARD_SIZES },
  { rowSpan: 1, colSpan: 1, delay: 0.3, sizes: SMALL_CARD_SIZES },
  { rowSpan: 1, colSpan: 1, delay: 0.7, sizes: SMALL_CARD_SIZES },
];

// The cards fill exactly one screen on large displays. Elsewhere that would make
// them too small, so the section grows and the cards set their own height.
const STACKED = "(max-width: 1024px), (max-height: 600px)";

const WorksSection = styled(Section)`
  height: var(--screen-height);

  @media ${STACKED} {
    height: auto;
  }
`;

const ProjectsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 8px;
  flex: 1;
  min-height: 0;

  @media ${STACKED} {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: clamp(220px, 36vw, 380px);
  }

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: 70vw;
  }
`;

const ProjectImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s var(--transition-cubic-bezier);
`;

// The gradient fades up from the bottom so the title reads on bright photos.
const ProjectTitle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--spacing-12) var(--spacing-4) var(--spacing-4);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  text-align: left;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  transition: color 0.5s var(--transition-cubic-bezier);
`;

const ProjectCard = styled.div`
  grid-row: span ${({ $rowSpan }) => $rowSpan};
  grid-column: span ${({ $colSpan }) => $colSpan};
  min-height: 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid var(--color-neutral-700);
  color: var(--color-neutral-50);
  cursor: pointer;
  opacity: 0;
  transform: scale(0.9);
  animation: fadeInScale 1s var(--transition-cubic-bezier) forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  @media ${STACKED} {
    grid-row: auto;
  }

  @media (max-width: 600px) {
    grid-column: auto;
  }

  &:hover {
    ${ProjectImage} {
      transform: scale(1.1);
    }
    ${ProjectTitle} {
      color: var(--color-neutral-400);
    }
  }

  @keyframes fadeInScale {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const GallerySection = () => {
  const navigate = useNavigate();
  const { data } = useSanityQuery(FEATURED_PROJECTS_QUERY);
  const projects = (data ?? []).slice(0, SLOTS.length);

  // Nothing is featured yet (or Sanity is unreachable): skip the empty heading.
  if (projects.length === 0) return null;

  return (
    <WorksSection data-scroll-section>
      <SectionContainer>
        <SectionTitle data-scroll>Selected Works</SectionTitle>
        <ProjectsGrid>
          {projects.map((project, index) => {
            const { rowSpan, colSpan, delay, sizes } = SLOTS[index];
            return (
              <ProjectCard
                key={project.id}
                $rowSpan={rowSpan}
                $colSpan={colSpan}
                $delay={delay}
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <ProjectImage
                  alt={project.coverImage.alt || project.title}
                  loading="lazy"
                  style={{ objectPosition: hotspotPosition(project.coverImage) }}
                  {...responsiveImage(project.coverImage, sizes)}
                />
                <ProjectTitle>{project.title}</ProjectTitle>
              </ProjectCard>
            );
          })}
        </ProjectsGrid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button text="View All" onClick={() => navigate("/projects")} />
        </div>
      </SectionContainer>
    </WorksSection>
  );
};

export default GallerySection;
