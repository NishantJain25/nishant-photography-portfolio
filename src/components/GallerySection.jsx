import React from "react";
import { Section, SectionContainer, SectionTitle } from "./StyledComponents";
import { styled } from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Image = styled.div`
  width: 400px;
  height: 300px;
  background-color: grey;
  display: inline-block;
  margin: 8px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const ProjectsListContainer = styled.div`
  width: 100%;
  height: fit-content;
  overflow-x: hidden;
  white-space: nowrap;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const GallerySection = () => {
  return (
    <Section data-scroll-section>
      <SectionContainer>
        <SectionTitle data-scroll>Works</SectionTitle>
        <ProjectsListContainer>
          <Image />
          <Image />
          <Image />
          <Image />
        </ProjectsListContainer>
        <ButtonsContainer>
          <FaArrowLeft size={24} />
          <FaArrowRight size={24} />
        </ButtonsContainer>
      </SectionContainer>
    </Section>
  );
};

export default GallerySection;
