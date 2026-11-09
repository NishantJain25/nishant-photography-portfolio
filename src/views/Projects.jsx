import React from "react";
import {
  IMAGE_GRID_SIZES,
  ImageGridWrapper,
  PageContainer,
  SectionContainer,
  StatusMessage,
} from "../components/StyledComponents";
import PageHeader from "../components/PageHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSite from "../context/siteContext";
import { imageSize, responsiveImage } from "../sanity/client";
import { PROJECTS_QUERY } from "../sanity/queries";
import useSanityQuery from "../sanity/useSanityQuery";

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 1s var(--transition-cubic-bezier);
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--color-neutral-700);
`;

const ProjectTitle = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-neutral-50);
  transition: 0.5s all var(--transition-cubic-bezier);
  margin: 0;
`;
const ProjectCategory = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-neutral-400);
  margin: 0;
`;

const ProjectDetails = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-4);
`;

const ProjectCard = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid;
  overflow: hidden;
  border: 0.75px solid var(--color-neutral-700);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  cursor: pointer;
  &:hover {
    ${Image} {
      transform: scale(1.1);
    }
    ${ProjectTitle} {
      color: var(--color-neutral-400);
    }
  }
`;

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const navigate = useNavigate();
  const { data, loading, error } = useSanityQuery(PROJECTS_QUERY);

  const { categories } = useSite();
  const projectCategories = ["All", ...categories];

  const projects = React.useMemo(() => data ?? [], [data]);

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <PageContainer data-scroll-section id="page-container">
      <SectionContainer id="section-container" justify="flex-start">
        <PageHeader
          title="Projects"
          itemCount={projects.length}
          categories={projectCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        {loading && <StatusMessage>Loading projects...</StatusMessage>}
        {error && <StatusMessage>Couldn't load the projects.</StatusMessage>}
        {data && filteredProjects.length === 0 && (
          <StatusMessage>No projects here yet.</StatusMessage>
        )}
        <ImageGridWrapper>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <ImageContainer>
                <Image
                  alt={project.coverImage.alt || project.title}
                  loading="lazy"
                  {...imageSize(project.coverImage)}
                  {...responsiveImage(project.coverImage, IMAGE_GRID_SIZES)}
                />
              </ImageContainer>
              <ProjectDetails>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectCategory>{project.category}</ProjectCategory>
              </ProjectDetails>
            </ProjectCard>
          ))}
        </ImageGridWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default Projects;
